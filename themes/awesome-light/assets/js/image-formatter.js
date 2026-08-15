(function () {
  const W = 2572;
  const BG = '#393939';
  const FG = '#ffffff';

  const canvas = document.getElementById('imf-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = W;
  canvas.height = 1048; // default (recomputed by computeLayout)

  const titleEl = document.getElementById('imf-title');
  const iconEl = document.getElementById('imf-icon');
  const descEl = document.getElementById('imf-desc');
  const showHeaderBtn = document.getElementById('imf-show-header');
  let showHeader = true;
  function setShowHeader(val) {
    showHeader = val;
    showHeaderBtn.textContent = val ? 'Visible' : 'Hidden';
    showHeaderBtn.classList.toggle('is-hidden', !val);
  }
  const showTitleEl = document.getElementById('imf-show-title');
  const showIconEl = document.getElementById('imf-show-icon');
  const showDescEl = document.getElementById('imf-show-desc');
  const uploadEl = document.getElementById('imf-upload');
  const chipsEl = document.getElementById('imf-chips');
  const dimsEl = document.getElementById('imf-dims');
  const imfEl = document.querySelector('.imf');

  let images = []; // {el, name, caption}
  let layout = []; // {x, y, w, h} - parallel to images[], computed
  let dragIndex = null;
  let hoverIndex = null;
  let scale = 1;

  // -- Scale -----------------------------------------------------
  // Exports stay full resolution. Only on-screen css shrinks
  function updateScale() {
    const imfStyle = getComputedStyle(imfEl);
    const paddingX = parseFloat(imfStyle.paddingLeft) + parseFloat(imfStyle.paddingRight);
    const availW = imfEl.clientWidth - paddingX - 4;

    const belowCanvas = Array.from(imfEl.querySelectorAll('.imf-hint, .imf-footer'))
      .reduce((sum, el) => sum + el.offsetHeight, 0);
    const availH = window.innerHeight - canvas.getBoundingClientRect().top - belowCanvas - 16;

    scale = Math.min(1, availW / W, Math.max(availH, 100) / canvas.height);
    canvas.style.width = (W * scale) + 'px';
    canvas.style.height = (canvas.height * scale) + 'px';
  }

  window.addEventListener('resize', () => { updateScale(); render(); });

  // -- Render ----------------------------------------------------
  function render() {
    dimsEl.textContent = W + '×' + canvas.height;
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, canvas.height);
    if (showHeader) drawHeader();
    for (let i = 0; i < images.length; i++) {
      if (layout[i]) drawImageFrame(images[i], layout[i]);
    }
    if (hoverIndex !== null && layout[hoverIndex]) drawHighlight(layout[hoverIndex]);
  }

  function drawHighlight(pos) {
    const pad = 14;
    ctx.save();
    ctx.strokeStyle = FG;
    ctx.lineWidth = 8;
    ctx.strokeRect(pos.x - pad - 4, pos.y - pad - 4, pos.w + pad * 2 + 8, pos.h + pad * 2 + 8);
    ctx.restore();
  }

  function drawHeader() {
    const title = titleEl.value;
    const iconText = iconEl.value;
    const desc = descEl.value.trim();
    const showTitle = showTitleEl.checked;
    const showIcon = showIconEl.checked;
    const showDesc = showDescEl.checked && desc;
    const iconSz = 100;
    const titleSz = 56;
    const gap = 30;
    const headerY = 55;

    ctx.font = `400 ${titleSz}px "Akkurat", system-ui, sans-serif`;
    const tw = showTitle ? ctx.measureText(title).width : 0;
    const rowW = (showIcon ? iconSz : 0) + (showIcon && showTitle ? gap : 0) + tw;
    const startX = Math.round((W - rowW) / 2);

    if (showIcon) {
      // Icon box
      ctx.fillStyle = '#000000';
      ctx.fillRect(startX, headerY, iconSz, iconSz);

      // Icon letter
      ctx.fillStyle = FG;
      ctx.font = `400 ${titleSz}px "Akkurat", system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(iconText, startX + iconSz / 2, headerY + iconSz / 2);
    }

    if (showTitle) {
      const titleX = startX + (showIcon ? iconSz + gap : 0);
      ctx.fillStyle = FG;
      ctx.font = `400 ${titleSz}px "Akkurat", system-ui, sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(title, titleX, headerY + iconSz / 2);
    }

    if (showDesc) {
      const descY = (showIcon || showTitle) ? headerY + iconSz + 22 : headerY;
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.font = `400 36px "Akkurat", system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(desc, W / 2, descY);
    }
  }

  function drawImageFrame(img, pos) {
    const pad = 14;

    ctx.drawImage(img.el, pos.x, pos.y, pos.w, pos.h);

    if (img.caption) {
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.font = `400 28px "Akkurat", system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(img.caption, pos.x + pos.w / 2, pos.y + pos.h + pad + 14);
    }
  }

  // -- Compute layout (canvas height is derived from content) ----
  function computeLayout() {
    layout = [];
    if (!images.length) { canvas.height = 1048; return; }

    const PAD_X = 64;
    const MARGIN = 55;  // equal top/bottom margin (= headerY)
    const FRAME_PAD = 14;
    const iconTitleVisible = showHeader && (showTitleEl.checked || showIconEl.checked);
    const descVisible = showHeader && showDescEl.checked && descEl.value.trim();
    const PAD_TOP = iconTitleVisible
      ? (descVisible ? 270 : 210)
      : (descVisible ? 130 : MARGIN + FRAME_PAD);
    const GAP_X = 64;
    const GAP_Y = 56;
    const CAPTION_H = FRAME_PAD + 14 + 28; // space a caption adds below image bottom
    const CAPTION_GAP = CAPTION_H;
    const PER_ROW = Math.max(1, parseInt(document.getElementById('imf-per-row').value) || 4);

    const availW = W - PAD_X * 2;
    const numRows = Math.ceil(images.length / PER_ROW);

    const rows = [];
    for (let r = 0; r < numRows; r++) {
      rows.push(images.slice(r * PER_ROW, r * PER_ROW + PER_ROW));
    }

    // imgH: fit row 1 to full available width, capped so canvas stays reasonable
    const MAX_IMG_H = 1048 - PAD_TOP - MARGIN;
    const row1Aspect = rows[0].reduce((s, img) => s + img.el.naturalWidth / img.el.naturalHeight, 0);
    const imgH = Math.min(MAX_IMG_H, (availW - GAP_X * (rows[0].length - 1)) / row1Aspect);

    // Row Y positions - extra gap after rows with captions
    const rowYs = [PAD_TOP];
    for (let r = 1; r < numRows; r++) {
      const prevHasCaptions = rows[r - 1].some(img => img.caption);
      rowYs.push(rowYs[r - 1] + imgH + GAP_Y + (prevHasCaptions ? CAPTION_GAP : 0));
    }

    // Canvas height = bottom of last row's content + MARGIN
    const lastHasCaptions = rows[numRows - 1].some(img => img.caption);
    const contentBottom = rowYs[numRows - 1] + imgH + FRAME_PAD + (lastHasCaptions ? (14 + 28) : 0);
    canvas.height = Math.round(contentBottom + MARGIN);

    rows.forEach((rowImgs, r) => {
      const widths = rowImgs.map(img => imgH * img.el.naturalWidth / img.el.naturalHeight);
      const rowW = widths.reduce((a, b) => a + b, 0) + GAP_X * (rowImgs.length - 1);
      let x = (W - rowW) / 2;

      rowImgs.forEach((_, c) => {
        layout.push({
          x: Math.round(x),
          y: Math.round(rowYs[r]),
          w: Math.round(widths[c]),
          h: Math.round(imgH),
        });
        x += widths[c] + GAP_X;
      });
    });
  }

  // -- IndexedDB persistence -------------------------------------
  const DB = (() => {
    let _db;

    const open = () => new Promise((res, rej) => {
      if (_db) return res(_db);
      const r = indexedDB.open('imf', 1);
      r.onupgradeneeded = e => e.target.result.createObjectStore('kv');
      r.onsuccess = e => {
        _db = e.target.result;
        res(_db);
      };
      r.onerror = rej;
    });

    return {
      get: async key => {
        const d = await open();
        return new Promise((res, rej) => {
          const r = d.transaction('kv').objectStore('kv').get(key);
          r.onsuccess = () => res(r.result);
          r.onerror = rej;
        });
      },
      set: async (key, val) => {
        const d = await open();
        return new Promise((res, rej) => {
          const r = d.transaction('kv', 'readwrite').objectStore('kv').put(val, key);
          r.onsuccess = () => res();
          r.onerror = rej;
        });
      },
    };
  })();

  let saveTimer;
  function scheduleSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveState, 400);
  }

  async function saveState() {
    await DB.set('text', {
      title: titleEl.value,
      icon: iconEl.value,
      desc: descEl.value,
      perRow: document.getElementById('imf-per-row').value,
      showHeader: showHeader,
      showTitle: showTitleEl.checked,
      showIcon: showIconEl.checked,
      showDesc: showDescEl.checked,
    });
    await DB.set('images', images.map(i => ({ name: i.name, caption: i.caption, dataURL: i.dataURL })));
  }

  async function restoreState() {
    const text = await DB.get('text');
    if (text) {
      titleEl.value = text.title ?? 'My App';
      iconEl.value = text.icon ?? 'A';
      descEl.value = text.desc ?? '';
      document.getElementById('imf-per-row').value = text.perRow ?? 4;
      setShowHeader(text.showHeader ?? true);
      showTitleEl.checked = text.showTitle ?? true;
      showIconEl.checked = text.showIcon ?? true;
      showDescEl.checked = text.showDesc ?? true;
    }
    const saved = await DB.get('images');
    if (saved && saved.length) {
      let pending = saved.length;
      saved.forEach(s => {
        const el = new Image();
        el.onload = () => {
          images.push({ el, name: s.name, caption: s.caption, dataURL: s.dataURL });
          if (--pending === 0) reflow();
        };
        el.src = s.dataURL;
      });
    }
  }

  // -- Load files (shared by upload, drop, paste) ---------------
  function loadFiles(files) {
    const imgFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    let pending = imgFiles.length;
    if (!pending) return;

    imgFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const dataURL = e.target.result;
        const el = new Image();
        el.onload = () => {
          images.push({ el, name: file.name, caption: '', dataURL });
          if (--pending === 0) { reflow(); saveState(); }
        };
        el.src = dataURL;
      };
      reader.readAsDataURL(file);
    });
  }

  function reflow() { computeLayout(); updateScale(); updateChips(); render(); }

  // -- Upload ----------------------------------------------------
  uploadEl.addEventListener('change', () => {
    loadFiles(uploadEl.files);
    uploadEl.value = '';
  });

  // -- Drag and drop ---------------------------------------------
  canvas.addEventListener('dragover', e => {
    e.preventDefault();
    canvas.classList.add('imf-drop-active');
  });

  canvas.addEventListener('dragleave', () => canvas.classList.remove('imf-drop-active'));

  canvas.addEventListener('drop', e => {
    e.preventDefault();
    canvas.classList.remove('imf-drop-active');
    loadFiles(e.dataTransfer.files);
  });

  // -- Paste -----------------------------------------------------
  document.addEventListener('paste', e => {
    const items = Array.from(e.clipboardData.items).filter(i => i.kind === 'file' && i.type.startsWith('image/'));
    if (!items.length) return;
    loadFiles(items.map(i => i.getAsFile()));
  });

  function updateChips() {
    chipsEl.innerHTML = '';
    images.forEach((img, i) => {
      const chip = document.createElement('div');
      chip.className = 'imf-chip';
      chip.innerHTML =
        `<span class="imf-chip-name" title="${img.name}">${img.name}</span>` +
        `<div class="sidebar-search"><input type="text" class="sidebar-search-input" placeholder="caption" value="${img.caption}" data-i="${i}" /></div>` +
        `<button class="imf-chip-del" data-i="${i}" aria-label="Remove">×</button>`;
      chip.addEventListener('mouseenter', () => { hoverIndex = i; render(); });
      chip.addEventListener('mouseleave', () => { hoverIndex = null; render(); });
      chipsEl.appendChild(chip);
    });

    chipsEl.querySelectorAll('input[type="text"]').forEach(input => {
      input.addEventListener('input', () => {
        images[+input.dataset.i].caption = input.value;
        computeLayout(); updateScale();
        render();
        scheduleSave();
      });
    });

    chipsEl.querySelectorAll('.imf-chip-del').forEach(btn => {
      btn.addEventListener('click', () => {
        images.splice(+btn.dataset.i, 1);
        reflow(); saveState();
      });
    });
  }

  // -- Drag to reorder -------------------------------------------
  function toCanvas(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale };
  }

  function hitTest(x, y) {
    for (let i = 0; i < layout.length; i++) {
      const l = layout[i];
      if (x >= l.x && x <= l.x + l.w && y >= l.y && y <= l.y + l.h) return i;
    }
    return -1;
  }

  canvas.addEventListener('mousedown', e => {
    const { x, y } = toCanvas(e);
    const i = hitTest(x, y);
    if (i < 0) return;
    dragIndex = i;
    canvas.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (dragIndex === null) {
      const { x, y } = toCanvas(e);
      canvas.style.cursor = hitTest(x, y) >= 0 ? 'grab' : 'default';
      return;
    }
    const { x, y } = toCanvas(e);
    const hoverI = hitTest(x, y);
    if (hoverI >= 0 && hoverI !== dragIndex) {
      const img = images.splice(dragIndex, 1)[0];
      images.splice(hoverI, 0, img);
      dragIndex = hoverI;
      computeLayout(); updateScale();
      updateChips();
      render();
      scheduleSave();
    }
  });

  window.addEventListener('mouseup', () => { dragIndex = null; canvas.style.cursor = 'default'; });

  // -- Export ----------------------------------------------------
  document.getElementById('imf-export').addEventListener('click', () => {
    render();
    const a = document.createElement('a');
    a.download = (titleEl.value.trim() || 'banner').replace(/\s+/g, '-').toLowerCase() + '.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });

  // -- Controls --------------------------------------------------
  [titleEl, iconEl].forEach(el => el.addEventListener('input', () => { render(); scheduleSave(); }));
  descEl.addEventListener('input', () => { computeLayout(); updateScale(); render(); scheduleSave(); });
  document.getElementById('imf-per-row').addEventListener('input', () => { computeLayout(); updateScale(); render(); scheduleSave(); });
  showHeaderBtn.addEventListener('click', () => {
    const val = !showHeader;
    setShowHeader(val);
    showTitleEl.checked = val;
    showIconEl.checked = val;
    showDescEl.checked = val;
    computeLayout(); updateScale(); render(); scheduleSave();
  });
  [showTitleEl, showIconEl, showDescEl].forEach(el => el.addEventListener('change', () => {
    if (el.checked && !showHeader) {
      setShowHeader(true);
    } else if (!el.checked && showHeader && !showTitleEl.checked && !showIconEl.checked && !showDescEl.checked) {
      setShowHeader(false);
    }
    computeLayout(); updateScale(); render(); scheduleSave();
  }));

  // -- Init ------------------------------------------------------
  document.fonts.ready.then(() => {
    updateScale();
    render();
    restoreState();
  });
})();
