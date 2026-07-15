(function () {
  "use strict";

  /* ---------------------------------------------------------------- */
  /* Theme toggle                                                     */
  /* ---------------------------------------------------------------- */
  var themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "dark";
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ---------------------------------------------------------------- */
  /* About modal                                                      */
  /* ---------------------------------------------------------------- */
  var aboutToggle = document.getElementById("about-toggle");
  var aboutOverlay = document.getElementById("about-overlay");
  var aboutClose = document.getElementById("about-close");
  if (aboutToggle && aboutOverlay) {
    function openAbout() {
      aboutOverlay.classList.add("open");
      aboutOverlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function closeAbout() {
      aboutOverlay.classList.remove("open");
      aboutOverlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
    aboutToggle.addEventListener("click", openAbout);
    if (aboutClose) aboutClose.addEventListener("click", closeAbout);
    aboutOverlay.addEventListener("click", function (e) {
      if (e.target === aboutOverlay) closeAbout();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && aboutOverlay.classList.contains("open")) closeAbout();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Mobile sidebar toggle                                            */
  /* ---------------------------------------------------------------- */
  var sidebar = document.getElementById("sidebar");
  var mobileToggle = document.getElementById("sidebar-mobile-toggle");
  if (sidebar && mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      sidebar.classList.toggle("open");
      mobileToggle.classList.toggle("open");
    });
  }

  /* ---------------------------------------------------------------- */
  /* Grid: category filter + search                                   */
  /* ---------------------------------------------------------------- */
  var grid = document.getElementById("app-grid");
  if (!grid) return;

  var cards = Array.from(grid.querySelectorAll(".app-card"));
  var emptyMsg = document.getElementById("app-grid-empty");
  var catButtons = Array.from(document.querySelectorAll("#sidebar-categories .sidebar-cat"));
  var stackButtons = Array.from(document.querySelectorAll("#stack-bar .sidebar-cat"));
  var searchInput = document.getElementById("app-search");

  /* ---------------------------------------------------------------- */
  /* View toggle: grid / list                                          */
  /* ---------------------------------------------------------------- */
  var viewBtns = Array.from(document.querySelectorAll("#view-bar .sidebar-view-btn"));
  var viewKey = "awesome-light-view";

  function applyView(view) {
    grid.classList.toggle("app-grid--list", view === "list");
    viewBtns.forEach(function (b) {
      b.classList.toggle("sidebar-view-btn--active", b.dataset.view === view);
    });
  }

  var savedView = localStorage.getItem(viewKey) || "grid";
  applyView(savedView);

  viewBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var view = btn.dataset.view;
      localStorage.setItem(viewKey, view);
      applyView(view);
    });
  });

  /* ---------------------------------------------------------------- */
  /* Sort: a-z / newest                                                */
  /* ---------------------------------------------------------------- */
  var sortBtns = Array.from(document.querySelectorAll("#sort-bar .sidebar-view-btn"));
  var sortKey = "awesome-light-sort";

  function applySort(sortMode) {
    cards = cards.slice().sort(function (a, b) {
      if (sortMode === "date") {
        return (b.dataset.date || "").localeCompare(a.dataset.date || "");
      }
      return (a.dataset.title || "").localeCompare(b.dataset.title || "", undefined, { sensitivity: "base" });
    });
    cards.forEach(function (card) { grid.appendChild(card); });
    sortBtns.forEach(function (b) {
      b.classList.toggle("sidebar-view-btn--active", b.dataset.sort === sortMode);
    });
  }

  var savedSort = localStorage.getItem(sortKey) || "title";
  applySort(savedSort);

  sortBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sortMode = btn.dataset.sort;
      localStorage.setItem(sortKey, sortMode);
      applySort(sortMode);
    });
  });

  var activeCategory = "";
  var activeStack = "";
  var activeQuery = "";

  function applyFilters() {
    var visible = 0;
    cards.forEach(function (card) {
      var matchesCategory = !activeCategory || (card.dataset.category || "").toLowerCase() === activeCategory;
      var matchesStack = !activeStack || card.dataset.lightSdk === activeStack;
      var matchesQuery = !activeQuery || (card.dataset.search || "").indexOf(activeQuery) !== -1;
      var show = matchesCategory && matchesStack && matchesQuery;
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    if (emptyMsg) emptyMsg.hidden = visible !== 0;
  }

  function closeMobileSidebar() {
    if (sidebar && sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      if (mobileToggle) mobileToggle.classList.remove("open");
    }
  }

  // Wires up a button-group filter (category, stack): clicking a button
  // marks it active, updates state via onChange, and re-filters. Returns a
  // `select(value)` function so other UI (e.g. the modal's category link)
  // can trigger the same selection without simulating a click.
  function createFilterGroup(buttons, datasetKey, onChange) {
    function select(value) {
      var val = value || "";
      buttons.forEach(function (b) {
        b.classList.toggle("sidebar-cat--active", (b.dataset[datasetKey] || "") === val);
      });
      onChange(val);
      applyFilters();
      closeMobileSidebar();
    }
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () { select(btn.dataset[datasetKey] || ""); });
    });
    return select;
  }

  var selectCategory = createFilterGroup(catButtons, "category", function (v) { activeCategory = v; });
  createFilterGroup(stackButtons, "stack", function (v) { activeStack = v; });

  var searchClear = document.getElementById("sidebar-search-clear");
  if (searchInput) {
    function runSearch() {
      activeQuery = searchInput.value.trim().toLowerCase();
      if (searchClear) searchClear.hidden = !activeQuery;
      applyFilters();
    }
    searchInput.addEventListener("input", runSearch);
    if (searchClear) {
      searchClear.addEventListener("click", function () {
        searchInput.value = "";
        runSearch();
        searchInput.focus();
      });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Modal                                                             */
  /* ---------------------------------------------------------------- */
  var overlay = document.getElementById("modal-overlay");
  var modalMedia = document.getElementById("modal-media");
  var modalTitle = document.getElementById("modal-title");
  var modalContent = document.getElementById("modal-content");
  var closeBtn = document.getElementById("modal-close");
  var prevBtn = document.getElementById("modal-prev");
  var nextBtn = document.getElementById("modal-next");

  var homePath = window.location.pathname;
  var currentIndex = -1;

  function mediaFor(card) {
    var images = (card.dataset.images || "").split("|").filter(Boolean);
    var videos = (card.dataset.videos || "").split("|").filter(Boolean);

    var html = images.map(function (src) {
      return '<img src="' + src + '" class="modal-media-item">';
    }).join("") + videos.map(function (src) {
      return '<video src="' + src + '" class="modal-media-item" controls playsinline></video>';
    }).join("");

    return html ? '<div class="modal-media-row">' + html + '</div>' : "";
  }

  function open(card) {
    modalMedia.innerHTML = mediaFor(card);
    modalTitle.textContent = card.dataset.title || "";

    var tmpl = document.getElementById(card.dataset.contentId);
    modalContent.innerHTML = tmpl ? tmpl.innerHTML : "";

    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function step(from, dir) {
    var visibleCards = cards.filter(function (c) { return c.style.display !== "none"; });
    if (!visibleCards.length) return from;
    var pos = visibleCards.indexOf(cards[from]);
    if (pos === -1) pos = 0;
    var nextPos = ((pos + dir) % visibleCards.length + visibleCards.length) % visibleCards.length;
    return cards.indexOf(visibleCards[nextPos]);
  }

  function openAt(i, replaceOnly) {
    if (i < 0 || i >= cards.length) return;
    currentIndex = i;
    var card = cards[i];
    open(card);
    var url = card.dataset.permalink;
    if (replaceOnly) {
      history.replaceState({ modal: true }, "", url);
    } else {
      history.pushState({ modal: true }, "", url);
    }
  }

  function closeToHome() {
    close();
    history.pushState(null, "", homePath);
  }

  modalContent.addEventListener("click", function (e) {
    var link = e.target.closest(".modal-category-link");
    if (!link) return;
    e.preventDefault();
    selectCategory(link.dataset.category || "");
    closeToHome();
  });

  cards.forEach(function (card) {
    card.addEventListener("click", function () { openAt(cards.indexOf(card)); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openAt(cards.indexOf(card)); }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeToHome);
  if (prevBtn) prevBtn.addEventListener("click", function () {
    if (currentIndex !== -1) openAt(step(currentIndex, -1));
  });
  if (nextBtn) nextBtn.addEventListener("click", function () {
    if (currentIndex !== -1) openAt(step(currentIndex, 1));
  });

  if (overlay) {
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeToHome();
    });
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") closeToHome();
      if (e.key === "ArrowLeft") prevBtn && prevBtn.click();
      if (e.key === "ArrowRight") nextBtn && nextBtn.click();
    });
  }

  window.addEventListener("popstate", function (e) {
    if (e.state && e.state.modal) {
      var found = cards.findIndex(function (c) { return c.dataset.permalink === window.location.pathname; });
      if (found !== -1) { currentIndex = found; open(cards[found]); }
    } else {
      close();
    }
  });

  // Deep link on load: either a direct /apps/<slug>/ visit that redirected
  // here with a stored path, or the URL already points at an app.
  (function () {
    var stored = sessionStorage.getItem("openModal");
    var path = stored || window.location.pathname;
    if (stored) sessionStorage.removeItem("openModal");
    if (path === homePath || path === "/") return;
    var found = cards.findIndex(function (c) { return c.dataset.permalink === path; });
    if (found !== -1) {
      currentIndex = found;
      if (stored) history.replaceState({ modal: true }, "", path);
      open(cards[found]);
    }
  })();
})();
