(() => {
  "use strict";

  /* ---------------------------------------------------------------- */
  /* Theme toggle                                                     */
  /* ---------------------------------------------------------------- */
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ---------------------------------------------------------------- */
  /* About modal                                                      */
  /* ---------------------------------------------------------------- */
  const aboutToggle = document.getElementById("about-toggle");
  const aboutOverlay = document.getElementById("about-overlay");
  const aboutClose = document.getElementById("about-close");
  const aboutMobileClose = document.getElementById("about-mobile-close");
  if (aboutToggle && aboutOverlay) {
    const openAbout = () => {
      aboutOverlay.classList.add("open");
      aboutOverlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    const closeAbout = () => {
      aboutOverlay.classList.remove("open");
      aboutOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    aboutToggle.addEventListener("click", openAbout);
    if (aboutClose) aboutClose.addEventListener("click", closeAbout);
    if (aboutMobileClose) aboutMobileClose.addEventListener("click", closeAbout);
    aboutOverlay.addEventListener("click", (e) => {
      if (e.target === aboutOverlay) closeAbout();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && aboutOverlay.classList.contains("open")) closeAbout();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Mobile sidebar toggle                                            */
  /* ---------------------------------------------------------------- */
  const sidebar = document.getElementById("sidebar");
  const mobileToggle = document.getElementById("sidebar-mobile-toggle");
  const mobileToggleLabel = mobileToggle ? mobileToggle.querySelector(".sidebar-mobile-toggle-label") : null;

  const setMobileToggleLabel = (isOpen) => {
    if (mobileToggleLabel) mobileToggleLabel.textContent = isOpen ? "Hide Options" : "Show Options";
  };

  if (sidebar && mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      mobileToggle.classList.toggle("open");
      setMobileToggleLabel(sidebar.classList.contains("open"));
    });
  }

  /* ---------------------------------------------------------------- */
  /* Grid: category filter + search                                   */
  /* ---------------------------------------------------------------- */
  const grid = document.getElementById("app-grid");
  if (!grid) return;

  let cards = Array.from(grid.querySelectorAll(".app-card"));
  const emptyMsg = document.getElementById("app-grid-empty");
  const catButtons = Array.from(document.querySelectorAll("#sidebar-categories .sidebar-cat"));
  const stackButtons = Array.from(document.querySelectorAll("#stack-bar .sidebar-cat"));
  const badgeButtons = Array.from(document.querySelectorAll("#badge-bar .sidebar-cat"));
  const searchInput = document.getElementById("app-search");
  const resetBtn = document.getElementById("sidebar-reset");
  const countEl = document.getElementById("sidebar-count");
  const statusEl = document.querySelector(".sidebar-status");

  /* ---------------------------------------------------------------- */
  /* View toggle: grid / list                                          */
  /* ---------------------------------------------------------------- */
  const viewBtns = Array.from(document.querySelectorAll("#view-bar .sidebar-view-btn"));
  const viewKey = "awesome-light-view";

  const applyView = (view) => {
    grid.classList.toggle("app-grid--list", view === "list");
    viewBtns.forEach((b) => {
      b.classList.toggle("sidebar-view-btn--active", b.dataset.view === view);
    });
  };

  const savedView = localStorage.getItem(viewKey) || "grid";
  applyView(savedView);

  viewBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      localStorage.setItem(viewKey, view);
      applyView(view);
    });
  });

  /* ---------------------------------------------------------------- */
  /* Sort: a-z / newest                                                */
  /* ---------------------------------------------------------------- */
  const sortBtns = Array.from(document.querySelectorAll("#sort-bar .sidebar-view-btn"));
  const sortKey = "awesome-light-sort";

  const applySort = (sortMode) => {
    cards = cards.slice().sort((a, b) => {
      if (sortMode === "date") {
        return (b.dataset.date || "").localeCompare(a.dataset.date || "");
      }
      if (sortMode === "updated") {
        return (b.dataset.updated || "").localeCompare(a.dataset.updated || "");
      }
      return (a.dataset.title || "").localeCompare(b.dataset.title || "", undefined, { sensitivity: "base" });
    });
    cards.forEach((card) => grid.appendChild(card));
    sortBtns.forEach((b) => {
      b.classList.toggle("sidebar-view-btn--active", b.dataset.sort === sortMode);
    });
  };

  const savedSort = localStorage.getItem(sortKey) || "title";
  applySort(savedSort);

  sortBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sortMode = btn.dataset.sort;
      localStorage.setItem(sortKey, sortMode);
      applySort(sortMode);
    });
  });

  let activeCategory = "";
  let activeStack = "";
  let activeBadge = "";
  let activeQuery = "";

  const applyFilters = () => {
    let visible = 0;
    cards.forEach((card) => {
      const matchesCategory = !activeCategory || (card.dataset.category || "").toLowerCase() === activeCategory;
      const matchesStack = !activeStack || card.dataset.lightSdk === activeStack;
      const matchesBadge = !activeBadge ||
        (activeBadge === "approved" && card.dataset.lightApproved === "true") ||
        (activeBadge === "pick" && card.dataset.editorPick === "true");
      const matchesQuery = !activeQuery || (card.dataset.search || "").indexOf(activeQuery) !== -1;
      const show = matchesCategory && matchesStack && matchesBadge && matchesQuery;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    if (emptyMsg) emptyMsg.hidden = visible !== 0;
    const hasActiveFilter = !!(activeCategory || activeStack || activeBadge || activeQuery);
    if (countEl) countEl.textContent = `showing ${visible} of ${cards.length}`;
    if (statusEl) statusEl.classList.toggle("sidebar-status--active", hasActiveFilter);
  };

  // Wires up a button-group filter (category, stack): clicking a button
  // marks it active, updates state via onChange, and re-filters. Returns a
  // `select(value)` function so other UI (e.g. the modal's category link)
  // can trigger the same selection without simulating a click.
  const createFilterGroup = (buttons, datasetKey, onChange) => {
    const select = (value) => {
      const val = value || "";
      buttons.forEach((b) => {
        b.classList.toggle("sidebar-cat--active", (b.dataset[datasetKey] || "") === val);
      });
      onChange(val);
      applyFilters();
    };
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => select(btn.dataset[datasetKey] || ""));
    });
    return select;
  };

  const selectCategory = createFilterGroup(catButtons, "category", (v) => { activeCategory = v; });
  const selectStack = createFilterGroup(stackButtons, "stack", (v) => { activeStack = v; });
  const selectBadge = createFilterGroup(badgeButtons, "badge", (v) => { activeBadge = v; });
  const filterSelectors = { category: selectCategory, stack: selectStack, badge: selectBadge };

  const searchClear = document.getElementById("sidebar-search-clear");
  if (searchInput) {
    const runSearch = () => {
      activeQuery = searchInput.value.trim().toLowerCase();
      if (searchClear) searchClear.hidden = !activeQuery;
      applyFilters();
    };
    searchInput.addEventListener("input", runSearch);
    if (searchClear) {
      searchClear.addEventListener("click", () => {
        searchInput.value = "";
        runSearch();
        searchInput.focus();
      });
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      selectCategory("");
      selectStack("");
      selectBadge("");
      if (searchInput) searchInput.value = "";
      activeQuery = "";
      if (searchClear) searchClear.hidden = true;
      applyFilters();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Modal                                                             */
  /* ---------------------------------------------------------------- */
  const overlay = document.getElementById("modal-overlay");
  const modalMedia = document.getElementById("modal-media");
  const modalTitle = document.getElementById("modal-title");
  const modalAuthor = document.getElementById("modal-author");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = document.getElementById("modal-close");
  const prevBtn = document.getElementById("modal-prev");
  const nextBtn = document.getElementById("modal-next");
  const mobileCloseBtn = document.getElementById("modal-mobile-close");
  const mobilePrevBtn = document.getElementById("modal-mobile-prev");
  const mobileNextBtn = document.getElementById("modal-mobile-next");

  const homePath = window.location.pathname;
  let currentIndex = -1;

  const mediaFor = (card) => {
    const images = (card.dataset.images || "").split("|").filter(Boolean);
    const videos = (card.dataset.videos || "").split("|").filter(Boolean);

    const html = images.map((entry) => {
      const [src, width, height] = entry.split(",");
      return `<img src="${src}" width="${width}" height="${height}" style="aspect-ratio:${width}/${height}" class="modal-media-item">`;
    }).join("") +
      videos.map((src) => `<video src="${src}" class="modal-media-item" controls playsinline></video>`).join("");

    return html ? `<div class="modal-media-row">${html}</div>` : "";
  };

  const escapeHtml = (str) => {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  };

  const titleStar = (card) => {
    if (card.dataset.lightApproved === "true") {
      return '<span class="app-card-star app-card-star--filled" title="Light Approved">&#9733;</span>';
    }
    if (card.dataset.editorPick === "true") {
      return '<span class="app-card-star app-card-star--hollow" title="Editor\'s Pick">&#9734;</span>';
    }
    return "";
  };

  const preloadCard = (card) => {
    if (!card) return;
    (card.dataset.images || "").split("|").filter(Boolean).forEach((entry) => {
      const src = entry.split(",")[0];
      if (src) new Image().src = src;
    });
  };

  const preloadNeighbors = (i) => {
    if (i < 0) return;
    preloadCard(cards[step(i, -1)]);
    preloadCard(cards[step(i, 1)]);
  };

  const revealOnLoad = () => {
    modalMedia.querySelectorAll(".modal-media-item").forEach((el) => {
      const loadedEvent = el.tagName === "VIDEO" ? "loadeddata" : "load";
      if (el.complete || el.readyState >= 2) {
        // if already cached (e.g. preloaded neighbor) - show instantly
        el.style.transition = "none";
        el.classList.add("is-loaded");
        el.offsetHeight;
        el.style.transition = "";
      } else {
        el.addEventListener(loadedEvent, () => el.classList.add("is-loaded"), { once: true });
        el.addEventListener("error", () => el.classList.add("is-loaded"), { once: true });
      }
    });
  };

  const openModal = (card) => {
    modalMedia.innerHTML = mediaFor(card);
    revealOnLoad();
    modalTitle.innerHTML = titleStar(card) + (card.dataset.title ? escapeHtml(card.dataset.title) : "");

    if (card.dataset.author) {
      const author = escapeHtml(card.dataset.author);
      modalAuthor.innerHTML = card.dataset.authorUrl
        ? `<a href="${card.dataset.authorUrl}" target="_blank" rel="noopener">${author}</a>`
        : author;
      modalAuthor.hidden = false;
    } else {
      modalAuthor.innerHTML = "";
      modalAuthor.hidden = true;
    }

    const tmpl = document.getElementById(card.dataset.contentId);
    modalContent.innerHTML = tmpl ? tmpl.innerHTML : "";

    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const step = (from, dir) => {
    const visibleCards = cards.filter((c) => c.style.display !== "none");
    if (!visibleCards.length) return from;
    let pos = visibleCards.indexOf(cards[from]);
    if (pos === -1) pos = 0;
    const nextPos = ((pos + dir) % visibleCards.length + visibleCards.length) % visibleCards.length;
    return cards.indexOf(visibleCards[nextPos]);
  };

  const openAt = (i, replaceOnly) => {
    if (i < 0 || i >= cards.length) return;
    currentIndex = i;
    const card = cards[i];
    openModal(card);
    preloadNeighbors(i);
    const url = card.dataset.permalink;
    if (replaceOnly) {
      history.replaceState({ modal: true }, "", url);
    } else {
      history.pushState({ modal: true }, "", url);
    }
  };

  const closeToHome = () => {
    closeModal();
    history.pushState(null, "", homePath);
  };

  modalContent.addEventListener("click", (e) => {
    const link = e.target.closest(".modal-filter-link");
    if (!link) return;
    e.preventDefault();
    const select = filterSelectors[link.dataset.filterType];
    if (!select) return;
    select(link.dataset.filterValue || "");
    closeToHome();
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => openAt(cards.indexOf(card)));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openAt(cards.indexOf(card)); }
    });
  });

  const goPrev = () => { if (currentIndex !== -1) openAt(step(currentIndex, -1)); };
  const goNext = () => { if (currentIndex !== -1) openAt(step(currentIndex, 1)); };

  if (closeBtn) closeBtn.addEventListener("click", closeToHome);
  if (prevBtn) prevBtn.addEventListener("click", goPrev);
  if (nextBtn) nextBtn.addEventListener("click", goNext);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeToHome);
  if (mobilePrevBtn) mobilePrevBtn.addEventListener("click", goPrev);
  if (mobileNextBtn) mobileNextBtn.addEventListener("click", goNext);

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeToHome();
    });
    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") closeToHome();
      if (e.key === "ArrowLeft") prevBtn && prevBtn.click();
      if (e.key === "ArrowRight") nextBtn && nextBtn.click();
    });
  }

  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.modal) {
      const found = cards.findIndex((c) => c.dataset.permalink === window.location.pathname);
      if (found !== -1) { currentIndex = found; openModal(cards[found]); preloadNeighbors(found); }
    } else {
      closeModal();
    }
  });

  // Deep link on load: either a direct /apps/<slug>/ visit that redirected
  // here with a stored path, or the URL already points at an app.
  (() => {
    const stored = sessionStorage.getItem("openModal");
    const path = stored || window.location.pathname;
    if (stored) sessionStorage.removeItem("openModal");
    if (path === homePath || path === "/") return;
    const found = cards.findIndex((c) => c.dataset.permalink === path);
    if (found !== -1) {
      currentIndex = found;
      if (stored) history.replaceState({ modal: true }, "", path);
      openModal(cards[found]);
      preloadNeighbors(found);
    }
  })();
})();
