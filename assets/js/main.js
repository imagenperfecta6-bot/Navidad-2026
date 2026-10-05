/* ==========================================================================
   CATÁLOGO NAVIDAD / FIN DE AÑO — Imagen Perfecta Sie7e
   Lógica del sitio (estático, sin build). Datos: assets/js/products.js
   ========================================================================== */
const CONFIG = {
  // Correo en copia (cc) de toda solicitud de cotización, además del asesor elegido.
  quoteEmail: "mercadeo@ip7.com.co",
};

/* >>> PENDIENTE — faltan los correos <<<
   Lista de asesores para el desplegable "Tu asesor" del formulario de
   cotización (mismo patrón que el catálogo automotriz): al elegir uno, la
   solicitud se dirige por correo directo a esa persona (con copia a
   CONFIG.quoteEmail). Nombres reales ya confirmados por el usuario
   (2026-09-18); el correo de cada uno todavía no — mientras `email` esté
   vacío, ese asesor cae al correo general (ver `toEmail` en el submit del
   formulario) para que el desplegable ya funcione sin romperse. En cuanto
   el usuario los comparta, solo hay que rellenar cada "email": "" de abajo. */
const ADVISORS = [
  { id: "yanira-silva", name: "Yanira Silva", email: "" },
  { id: "elizabeth-leon", name: "Elizabeth León", email: "" },
  { id: "sevastian-veloza", name: "Sevastian Veloza", email: "" },
  { id: "daniel-alvarez", name: "Daniel Alvarez", email: "" },
  { id: "margarita-salinas", name: "Margarita Salinas", email: "" },
  { id: "carlos-salinas", name: "Carlos Salinas", email: "" },
  { id: "sneyther-linares", name: "Sneyther Linares", email: "" },
  { id: "servicio-cliente", name: "Servicio al Cliente", email: "" },
];

// Cantidad mínima por defecto si un producto/kit no trae su propio minQty.
const DEFAULT_MIN_QTY = 5;

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------------------
     SPLASH DE ENTRADA — cortina que se abre sola al cargar la página.
     Se puede saltar tocando/haciendo click en cualquier parte. Con
     prefers-reduced-motion se quita de inmediato, sin animación.
     --------------------------------------------------------------------- */
  (function initSplash() {
    const splash = document.getElementById("splash");
    const sleigh = document.getElementById("splashSleigh");
    if (!splash) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hidden = false;
    function hideSplash() {
      if (hidden) return;
      hidden = true;
      document.body.classList.remove("splash-active");
      if (reduceMotion) {
        splash.classList.add("is-hidden");
        return;
      }
      splash.classList.add("is-leaving");
      setTimeout(() => splash.classList.add("is-hidden"), 500);
    }
    if (reduceMotion) {
      hideSplash();
      return;
    }
    // El trineo (Santa + reno) cruza de izquierda a derecha; en cuanto
    // termina su animación (`sleighFly`, sin loop) se dispara la apertura
    // de la cortina de inmediato — sin espera adicional. El setTimeout es
    // solo un respaldo por si `animationend` no llegara a disparar en
    // algún navegador.
    if (sleigh) sleigh.addEventListener("animationend", hideSplash);
    const fallback = setTimeout(hideSplash, 4600);
    splash.addEventListener("click", () => {
      clearTimeout(fallback);
      hideSplash();
    });
  })();

  /* ---------------------------------------------------------------------
     ESTADO: selección (persistida en localStorage)
     --------------------------------------------------------------------- */
  const CART_KEY = "ip7_navidad_cart";
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  // El carrito puede tener productos Y kits: se busca en ambos arreglos.
  const ALL_ITEMS = [].concat(
    typeof PRODUCTS !== "undefined" ? PRODUCTS : [],
    typeof KITS !== "undefined" ? KITS : [],
    typeof KITS_ARMADOS !== "undefined" ? KITS_ARMADOS : []
  );
  function itemById(id) {
    return ALL_ITEMS.find((p) => p.id === id);
  }
  function minQtyOf(item) {
    return item && item.minQty ? item.minQty : DEFAULT_MIN_QTY;
  }
  function cartCount() {
    return Object.keys(cart).length;
  }
  function formatPrice(v) {
    return "$" + v.toLocaleString("es-CO");
  }
  function thumbFor(item) {
    if (item.images && item.images.length) return item.images[0];
    if (item.photo) return item.photo;
    if (item.reveal) return item.reveal.after || item.reveal.before;
    return "";
  }

  // Elige el precio unitario según la escala de cantidad. Interpreta el
  // límite superior de cada tramo a partir del texto de `qty` ("10 a 50",
  // "101 o más", etc.), así funciona igual para productos y para kits aunque
  // usen rangos distintos.
  function tierUpperBound(qtyStr, isLast) {
    if (isLast || /m[aá]s|more/i.test(qtyStr)) return Infinity;
    const nums = (String(qtyStr).match(/\d+/g) || []).map(Number);
    return nums.length ? Math.max.apply(null, nums) : Infinity;
  }
  function unitPriceFor(item, qty) {
    if (!item || !item.priceTiers || !item.priceTiers.length) return null;
    const tiers = item.priceTiers;
    for (let i = 0; i < tiers.length; i++) {
      if (qty <= tierUpperBound(tiers[i].qty, i === tiers.length - 1)) return tiers[i].price;
    }
    return tiers[tiers.length - 1].price;
  }

  /* ---------------------------------------------------------------------
     NIEVE — lienzo animado a pantalla completa. Siempre encendida (sin
     botón para el usuario); se omite solo con prefers-reduced-motion.
     --------------------------------------------------------------------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const snowOn = !reduceMotion;

  (function initSnow() {
    const canvas = document.getElementById("snow");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, flakes = [], raf = null;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const target = Math.min(140, Math.round((w * h) / 16000));
      flakes = [];
      for (let i = 0; i < target; i++) {
        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2.6 + 0.8,
          spd: Math.random() * 0.9 + 0.35,
          drift: Math.random() * 0.8 - 0.4,
          sway: Math.random() * Math.PI * 2,
          swaySpd: Math.random() * 0.015 + 0.005,
        });
      }
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.shadowColor = "rgba(180,20,31,0.18)";
      ctx.shadowBlur = 2;
      for (const f of flakes) {
        f.sway += f.swaySpd;
        f.y += f.spd;
        f.x += f.drift + Math.sin(f.sway) * 0.6;
        if (f.y > h + 6) { f.y = -6; f.x = Math.random() * w; }
        if (f.x > w + 6) f.x = -6;
        if (f.x < -6) f.x = w + 6;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (raf) return;
      resize();
      frame();
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
      ctx.clearRect(0, 0, w, h);
    }

    window.addEventListener("resize", () => { if (raf) resize(); });

    if (snowOn) start();
  })();

  /* ---------------------------------------------------------------------
     SLIDER "ANTES / DESPUÉS" (kits)
     --------------------------------------------------------------------- */
  function initReveal(el) {
    const range = el.querySelector(".reveal-range");
    if (!range) return;
    const apply = () => el.style.setProperty("--reveal-pos", range.value + "%");
    apply();
    const onMove = () => { apply(); el.classList.add("is-touched"); };
    // Teclado / lectores de pantalla: el <input range> sigue funcionando.
    range.addEventListener("input", onMove);
    range.addEventListener("change", onMove);

    // Mouse y táctil: arrastre propio con pointer events. El <input range>
    // invisible no dejaba arrastrar bien en el celular (competía con el scroll
    // vertical); con `touch-action: pan-y` el gesto horizontal llega aquí y el
    // vertical sigue desplazando la página.
    let dragging = false;
    const setFromX = (clientX) => {
      const r = el.getBoundingClientRect();
      range.value = Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100));
      onMove();
    };
    el.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      try { el.setPointerCapture(e.pointerId); } catch (_) {}
      if (e.pointerType === "mouse") setFromX(e.clientX);
    });
    el.addEventListener("pointermove", (e) => { if (dragging) setFromX(e.clientX); });
    const stop = () => { dragging = false; };
    el.addEventListener("pointerup", stop);
    el.addEventListener("pointercancel", stop);
  }

  /* ---------------------------------------------------------------------
     RENDER: cantidad + precio + botón agregar (compartido card/kit)
     --------------------------------------------------------------------- */
  function wireQtyAndAdd(node, item) {
    const qtyInput = node.querySelector(".qty-input");
    const minusBtn = node.querySelector(".qty-minus");
    const plusBtn = node.querySelector(".qty-plus");
    const minQty = minQtyOf(item);

    function clampQty(v) {
      v = parseInt(v, 10);
      if (isNaN(v) || v < minQty) v = minQty;
      if (v > 50000) v = 50000;
      return v;
    }
    qtyInput.min = minQty;
    qtyInput.value = minQty;
    minusBtn.addEventListener("click", () => {
      const next = clampQty(qtyInput.value) - 1;
      qtyInput.value = next < minQty ? minQty : next;
    });
    plusBtn.addEventListener("click", () => {
      qtyInput.value = clampQty(qtyInput.value) + 1;
    });
    qtyInput.addEventListener("change", () => {
      qtyInput.value = clampQty(qtyInput.value);
    });

    const presetsWrap = node.querySelector(".qty-presets");
    presetsWrap.innerHTML = "";
    [1, 2, 5, 10].forEach((mult) => {
      const qty = Math.min(minQty * mult, 50000);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = qty.toLocaleString("es-CO");
      btn.addEventListener("click", () => { qtyInput.value = clampQty(qty); });
      presetsWrap.appendChild(btn);
    });

    const addBtn = node.querySelector(".card-add");
    if (item.kit) addBtn.textContent = "Agregar a mi kit";
    addBtn.addEventListener("click", () => {
      const qty = clampQty(qtyInput.value);
      cart[item.id] = qty;
      saveCart();
      renderCartUI();
      addBtn.textContent = "✓ Agregado";
      addBtn.classList.add("is-added");
      showToast(`${item.name} agregado${item.kit ? " a tu kit" : ""} (${qty.toLocaleString("es-CO")} und.)`);
      setTimeout(() => {
        addBtn.textContent = item.kit ? "Agregar a mi kit" : "Agregar a mi selección";
        addBtn.classList.remove("is-added");
      }, 1800);
    });
  }

  function renderPriceInto(priceEl, item) {
    if (item.priceTiers && item.priceTiers.length) {
      priceEl.innerHTML = "";
      const list = document.createElement("ul");
      list.className = "price-tiers";
      item.priceTiers.forEach((tier) => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="tier-qty">${tier.qty} und.</span><span class="tier-price">${formatPrice(tier.price)}</span>`;
        list.appendChild(li);
      });
      priceEl.appendChild(list);
    } else {
      priceEl.textContent = "Cotización especial";
      priceEl.classList.add("is-quote");
    }
  }

  /* ---------------------------------------------------------------------
     RENDER: KITS
     --------------------------------------------------------------------- */
  const kitTemplate = document.getElementById("kitTemplate");
  const revealTemplate = document.getElementById("revealTemplate");

  function renderKitsInto(gridEl, items) {
    if (!gridEl || !kitTemplate || !items) return;
    gridEl.innerHTML = "";
    items.forEach((kit) => {
      const node = kitTemplate.content.cloneNode(true);
      const article = node.querySelector(".kit-card");
      article.dataset.id = kit.id;

      const media = node.querySelector(".kit-media");
      let reveal = null;
      if (kit.photo) {
        // Foto normal (sin slider) — el caso de las anchetas de mercado.
        // Si además trae `video`, se arma un mini carrusel foto→video (mismo
        // patrón visual que la galería de productos: flechas + puntos).
        const slides = [{ type: "img", src: kit.photo }];
        if (kit.video) slides.push({ type: "video", src: kit.video });

        const stage = document.createElement("div");
        stage.className = "kit-media-stage";
        media.appendChild(stage);
        let activeIndex = 0;

        function renderSlide() {
          stage.innerHTML = "";
          const slide = slides[activeIndex];
          const el = document.createElement(slide.type === "video" ? "video" : "img");
          el.className = "kit-photo";
          el.src = slide.src;
          if (slide.type === "video") {
            el.controls = true;
            // Arranca solo al llegar a esta diapositiva (silenciado, si no el
            // navegador bloquea el autoplay) y se detiene al terminar.
            el.muted = true;
            el.loop = false;
            el.playsInline = true;
            el.preload = "auto";
            el.autoplay = true;
          } else {
            el.loading = "lazy";
            el.alt = kit.name;
          }
          stage.appendChild(el);
          if (slide.type === "video") el.play().catch(() => {});
          media.querySelectorAll(".gallery-dots button").forEach((d, i) => d.classList.toggle("is-active", i === activeIndex));
        }

        if (slides.length > 1) {
          media.classList.add("has-gallery");
          const prevBtn = document.createElement("button");
          prevBtn.type = "button";
          prevBtn.className = "gallery-arrow gallery-prev";
          prevBtn.setAttribute("aria-label", "Anterior");
          prevBtn.textContent = "‹";
          const nextBtn = document.createElement("button");
          nextBtn.type = "button";
          nextBtn.className = "gallery-arrow gallery-next";
          nextBtn.setAttribute("aria-label", "Siguiente");
          nextBtn.textContent = "›";
          const dotsWrap = document.createElement("div");
          dotsWrap.className = "gallery-dots";
          slides.forEach((_, i) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.setAttribute("aria-label", `Ver foto ${i + 1}`);
            dot.addEventListener("click", (e) => { e.stopPropagation(); activeIndex = i; renderSlide(); });
            dotsWrap.appendChild(dot);
          });
          prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            activeIndex = (activeIndex - 1 + slides.length) % slides.length;
            renderSlide();
          });
          nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            activeIndex = (activeIndex + 1) % slides.length;
            renderSlide();
          });
          media.appendChild(prevBtn);
          media.appendChild(nextBtn);
          media.appendChild(dotsWrap);
        }
        renderSlide();
      } else if (kit.reveal && revealTemplate) {
        const revealNode = revealTemplate.content.cloneNode(true);
        reveal = revealNode.querySelector(".reveal");
        const beforeImg = revealNode.querySelector(".reveal-before");
        const afterImg = revealNode.querySelector(".reveal-after");
        const r = kit.reveal;
        beforeImg.src = r.before || "";
        afterImg.src = r.after || r.before || "";
        beforeImg.alt = `${kit.name} — presentación`;
        afterImg.alt = `${kit.name} — contenido`;
        revealNode.querySelector(".reveal-label-before").textContent = r.beforeLabel || "Antes";
        revealNode.querySelector(".reveal-label-after").textContent = r.afterLabel || "Después";
        media.appendChild(revealNode);
      }

      node.querySelector(".kit-title").textContent = kit.name;
      node.querySelector(".kit-code").textContent = kit.code;
      node.querySelector(".kit-desc").textContent = kit.description;

      const contentsList = node.querySelector(".kit-contents-list");
      (kit.contents || []).forEach((c) => {
        const li = document.createElement("li");
        li.textContent = c;
        contentsList.appendChild(li);
      });

      renderPriceInto(node.querySelector(".kit-price"), kit);
      wireQtyAndAdd(node, kit);

      gridEl.appendChild(node);
      if (reveal) initReveal(reveal);
    });
    observeCards();
  }

  function renderKits() {
    renderKitsInto(document.getElementById("kitsGrid"), typeof KITS !== "undefined" ? KITS : []);
    renderKitsInto(document.getElementById("kitsArmadosGrid"), typeof KITS_ARMADOS !== "undefined" ? KITS_ARMADOS : []);
  }

  /* ---------------------------------------------------------------------
     RENDER: CATÁLOGO DE PRODUCTOS
     --------------------------------------------------------------------- */
  const catalogSections = document.getElementById("catalogSections");
  const cardTemplate = document.getElementById("cardTemplate");
  const filterPillsWrap = document.getElementById("categorias");

  function renderCategoryPills() {
    if (!filterPillsWrap) return;
    CATEGORIES.forEach((cat) => {
      if (!PRODUCTS.some((p) => p.category === cat.slug)) return;
      const btn = document.createElement("button");
      btn.className = "pill";
      btn.type = "button";
      btn.dataset.filter = cat.slug;
      btn.textContent = cat.label;
      filterPillsWrap.appendChild(btn);
    });
  }

  function buildCard(product) {
    const node = cardTemplate.content.cloneNode(true);
    const article = node.querySelector(".card");
    article.dataset.id = product.id;
    article.dataset.category = product.category;
    article.dataset.search = (product.name + " " + product.description + " " + product.code).toLowerCase();

    const images = product.images && product.images.length ? product.images : [product.image];
    const media = node.querySelector(".card-media");
    const img = media.querySelector("img");
    const prevBtn = media.querySelector(".gallery-prev");
    const nextBtn = media.querySelector(".gallery-next");
    const dotsWrap = media.querySelector(".gallery-dots");
    let activeIndex = 0;

    img.alt = product.name;
    img.onerror = () => {
      const stage = img.dataset.fallbackStage || "0";
      if (stage === "0") {
        img.dataset.fallbackStage = "1";
        media.classList.add("is-reference");
        img.src = `assets/img/productos/_ref/${product.category}.svg`;
      } else {
        media.classList.remove("is-reference");
        media.classList.add("is-placeholder");
        img.style.display = "none";
        media.querySelector(".placeholder-icon")?.remove();
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("viewBox", "0 0 24 24");
        icon.setAttribute("fill", "none");
        icon.classList.add("placeholder-icon");
        icon.innerHTML = '<path d="M4 16.5V7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5Z" stroke="currentColor" stroke-width="1.4"/><circle cx="9" cy="10.5" r="1.6" stroke="currentColor" stroke-width="1.4"/><path d="m6 16 4-4 3 3 2.5-2.5L20 16" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>';
        media.appendChild(icon);
      }
    };

    function renderImage() {
      media.classList.remove("is-reference", "is-placeholder");
      media.querySelector(".placeholder-icon")?.remove();
      img.style.display = "";
      img.dataset.fallbackStage = "0";
      img.src = images[activeIndex];
      dotsWrap.querySelectorAll("button").forEach((d, i) => d.classList.toggle("is-active", i === activeIndex));
    }

    if (images.length > 1) {
      media.classList.add("has-gallery");
      images.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `Ver foto ${i + 1}`);
        dot.addEventListener("click", (e) => { e.stopPropagation(); activeIndex = i; renderImage(); });
        dotsWrap.appendChild(dot);
      });
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        activeIndex = (activeIndex - 1 + images.length) % images.length;
        renderImage();
      });
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        activeIndex = (activeIndex + 1) % images.length;
        renderImage();
      });
    } else {
      prevBtn.remove();
      nextBtn.remove();
    }

    renderImage();

    node.querySelector(".card-code").textContent = product.code;
    node.querySelector(".card-title").textContent = product.name;
    node.querySelector(".card-desc").textContent = product.description;

    const featuresEl = node.querySelector(".card-features");
    (product.features || []).forEach((f) => {
      const li = document.createElement("li");
      li.textContent = f;
      featuresEl.appendChild(li);
    });

    renderPriceInto(node.querySelector(".card-price"), product);
    wireQtyAndAdd(node, product);

    return node;
  }

  function renderCatalog() {
    catalogSections.innerHTML = "";
    // Una sola cuadrícula: primero todo lo que es un Set (categoría Sets o
    // nombre que empieza por "Set", en el orden de products.js) y después el
    // resto agrupado por categoría (orden de CATEGORIES), cada una A–Z.
    const isSet = (p) => p.category === "sets" || /^set\b/i.test(p.name);
    const sets = PRODUCTS.filter(isSet);
    const byName = (a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" });
    const rest = [];
    CATEGORIES.forEach((cat) => {
      rest.push(...PRODUCTS.filter((p) => !isSet(p) && p.category === cat.slug).sort(byName));
    });

    const section = document.createElement("section");
    section.className = "category-block";
    section.id = "cat-todos";
    section.innerHTML = `<div class="grid"></div>`;
    const grid = section.querySelector(".grid");
    sets.concat(rest).forEach((p) => grid.appendChild(buildCard(p)));
    catalogSections.appendChild(section);
    observeCards();
  }

  /* ---------------------------------------------------------------------
     FILTROS + BÚSQUEDA
     --------------------------------------------------------------------- */
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  let activeFilter = "todos";
  let filterPills = [];

  function normalize(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function applyFilters() {
    const query = normalize(searchInput.value.trim());
    let visibleCount = 0;

    document.querySelectorAll("#catalogSections .category-block").forEach((section) => {
      let sectionVisible = 0;
      section.querySelectorAll(".card").forEach((card) => {
        const matchesCategory = activeFilter === "todos" || card.dataset.category === activeFilter;
        const matchesQuery = !query || normalize(card.dataset.search).includes(query);
        const show = matchesCategory && matchesQuery;
        card.style.display = show ? "" : "none";
        if (show) sectionVisible++;
      });
      section.style.display = sectionVisible ? "" : "none";
      visibleCount += sectionVisible;
    });

    noResults.hidden = visibleCount !== 0;
  }

  function wireFilterPills() {
    // Solo las pastillas con data-filter son filtros reales del catálogo.
    filterPills = document.querySelectorAll(".pill[data-filter]");
    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        filterPills.forEach((p) => p.classList.remove("is-active"));
        pill.classList.add("is-active");
        activeFilter = pill.dataset.filter;
        applyFilters();
        if (activeFilter !== "todos") {
          const target = document.getElementById("cat-" + activeFilter);
          if (target) setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
        }
      });
    });

    // Pastillas "de acceso rápido" que no filtran nada, solo navegan
    // (ej. "Kits", que todavía no tiene productos individuales propios).
    document.querySelectorAll(".pill[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = document.getElementById(btn.dataset.goto);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  searchInput.addEventListener("input", applyFilters);
  document.getElementById("clearFilters").addEventListener("click", () => {
    searchInput.value = "";
    filterPills.forEach((p) => p.classList.remove("is-active"));
    document.querySelector('.pill[data-filter="todos"]').classList.add("is-active");
    activeFilter = "todos";
    applyFilters();
  });

  /* ---------------------------------------------------------------------
     SELECCIÓN — UI (chip, fab, barra móvil, drawer)
     --------------------------------------------------------------------- */
  const cartChipText = document.getElementById("cartChipText");
  const cartFabCount = document.getElementById("cartFabCount");
  const mobileCartBadge = document.getElementById("mobileCartBadge");
  const drawerList = document.getElementById("drawerList");
  const drawerEmpty = document.getElementById("drawerEmpty");
  const drawerTotal = document.getElementById("drawerTotal");
  const drawerTotalValue = document.getElementById("drawerTotalValue");

  function renderCartUI() {
    const count = cartCount();
    cartChipText.textContent = `Cotizar (${count})`;
    cartFabCount.textContent = count;
    mobileCartBadge.textContent = count;
    mobileCartBadge.hidden = count === 0;

    drawerList.innerHTML = "";
    const ids = Object.keys(cart);
    drawerEmpty.style.display = ids.length ? "none" : "block";

    let grandTotal = 0;
    let hasQuoteOnlyItem = false;

    ids.forEach((id) => {
      const item = itemById(id);
      if (!item) return;
      const itemMinQty = minQtyOf(item);
      const qty = cart[id];
      const unitPrice = unitPriceFor(item, qty);
      let priceHtml;
      if (unitPrice != null) {
        const lineTotal = unitPrice * qty;
        grandTotal += lineTotal;
        priceHtml = `<span>${formatPrice(unitPrice)} c/u</span><strong>${formatPrice(lineTotal)}</strong>`;
      } else {
        hasQuoteOnlyItem = true;
        priceHtml = `<span class="is-quote">Cotización especial</span>`;
      }
      const li = document.createElement("li");
      li.className = "drawer-item";
      li.innerHTML = `
        <img src="${thumbFor(item)}" alt="${item.name}" onerror="this.style.visibility='hidden'">
        <div class="drawer-item-info">
          <h5>${item.name}</h5>
          <span>${item.code}</span>
          <div class="drawer-item-controls">
            <input type="number" min="${itemMinQty}" max="50000" value="${qty}" data-id="${id}">
            <button type="button" class="drawer-item-remove" data-id="${id}">Quitar</button>
          </div>
          <div class="drawer-item-price">${priceHtml}</div>
        </div>
      `;
      drawerList.appendChild(li);
    });

    drawerTotal.hidden = ids.length === 0 || grandTotal === 0;
    drawerTotalValue.textContent = formatPrice(grandTotal) + (hasQuoteOnlyItem ? " +" : "");

    drawerList.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", () => {
        const itemMinQty = minQtyOf(itemById(input.dataset.id));
        let v = parseInt(input.value, 10);
        if (isNaN(v) || v < itemMinQty) v = itemMinQty;
        if (v > 50000) v = 50000;
        input.value = v;
        cart[input.dataset.id] = v;
        saveCart();
        renderCartUI();
      });
    });
    drawerList.querySelectorAll(".drawer-item-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        delete cart[btn.dataset.id];
        saveCart();
        renderCartUI();
      });
    });
  }

  /* ---------------------------------------------------------------------
     PANEL "COTIZAR": un solo panel con la selección y el formulario
     --------------------------------------------------------------------- */
  const backdrop = document.getElementById("backdrop");
  const cartDrawer = document.getElementById("cartDrawer");

  function openPanel(panel) {
    backdrop.classList.add("is-visible");
    panel.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeAllPanels() {
    backdrop.classList.remove("is-visible");
    cartDrawer.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".js-open-drawer, .js-open-quote").forEach((el) =>
    el.addEventListener("click", (e) => { e.preventDefault(); openPanel(cartDrawer); })
  );
  document.querySelectorAll(".js-close-panels").forEach((el) =>
    el.addEventListener("click", () => closeAllPanels())
  );
  backdrop.addEventListener("click", closeAllPanels);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAllPanels(); });

  /* ---------------------------------------------------------------------
     ENVÍO DE LA COTIZACIÓN
     --------------------------------------------------------------------- */

  function buildQuotePayload(formData) {
    let grandTotal = 0;
    let hasQuoteOnlyItem = false;
    const productos = Object.keys(cart)
      .map((id) => {
        const p = itemById(id);
        if (!p) return null;
        const cantidad = cart[id];
        const unitPrice = unitPriceFor(p, cantidad);
        if (unitPrice != null) grandTotal += unitPrice * cantidad;
        else hasQuoteOnlyItem = true;
        return { nombre: p.name, codigo: p.code, cantidad, unitPrice, kit: !!p.kit };
      })
      .filter(Boolean);

    const lineasProductos = productos
      .map((p) => {
        const precioTxt = p.unitPrice != null
          ? `${formatPrice(p.unitPrice)} c/u — total ${formatPrice(p.unitPrice * p.cantidad)}`
          : "cotización especial";
        return `• ${p.nombre}${p.kit ? " [para kit]" : ""} (${p.codigo}) —${p.cantidad.toLocaleString("es-CO")} und. — ${precioTxt}`;
      })
      .join("\n");

    const totalTxt = grandTotal > 0
      ? formatPrice(grandTotal) + (hasQuoteOnlyItem ? " + ítems de cotización especial" : "")
      : "A confirmar por el ejecutivo";

    const advisor = advisorById(formData.asesor);

    const mensaje =
      `Solicitud de cotización — Catálogo Navidad / Fin de Año\n\n` +
      `Asesor: ${advisor ? advisor.name : "-"}\n` +
      `Nombre: ${formData.nombre}\n` +
      `Empresa: ${formData.empresa}\n` +
      `Correo: ${formData.correo}\n` +
      `Teléfono: ${formData.telefono}\n\n` +
      `Selección:\n${lineasProductos || "(sin productos seleccionados)"}\n\n` +
      `Valor total estimado: ${totalTxt}\n` +
      `(No incluye fletes ni costos adicionales. Incluye 1 logo, 1 tinta, 1 marca. El armado de kits se cotiza aparte. Sujeto a inventario y vigencia de temporada.)\n\n` +
      `Comentarios: ${formData.comentarios || "-"}`;

    return { ...formData, productos, mensaje, advisor };
  }

  // Desplegable "Tu asesor" — se llena desde ADVISORS (arriba del archivo).
  const asesorSelect = document.getElementById("asesorSelect");
  if (asesorSelect) {
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = "Selecciona tu asesor";
    asesorSelect.appendChild(placeholder);
    ADVISORS.forEach((a) => {
      const opt = document.createElement("option");
      opt.value = a.id;
      opt.textContent = a.name;
      asesorSelect.appendChild(opt);
    });
  }
  function advisorById(id) {
    return ADVISORS.find((a) => a.id === id);
  }

  function getFormData() {
    const fd = new FormData(document.getElementById("quoteForm"));
    return {
      nombre: fd.get("nombre") || "",
      empresa: fd.get("empresa") || "",
      correo: fd.get("correo") || "",
      telefono: fd.get("telefono") || "",
      asesor: fd.get("asesor") || "",
      comentarios: fd.get("comentarios") || "",
    };
  }

  function validateForm() {
    const form = document.getElementById("quoteForm");
    if (!form.reportValidity()) return false;
    if (cartCount() === 0) {
      showToast("Selecciona al menos un producto antes de enviar tu solicitud.");
      return false;
    }
    return true;
  }

  document.getElementById("quoteForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const payload = buildQuotePayload(getFormData());
    // Mientras no tengamos el correo real de ese asesor, cae al correo general.
    const toEmail = (payload.advisor && payload.advisor.email) || CONFIG.quoteEmail;
    const subject = encodeURIComponent("Solicitud de cotización — Catálogo Navidad / Fin de Año");
    const body = encodeURIComponent(payload.mensaje);
    window.location.href = `mailto:${toEmail}?cc=${CONFIG.quoteEmail}&subject=${subject}&body=${body}`;
    showToast(`Abriendo tu cliente de correo para enviar la solicitud a ${payload.advisor ? payload.advisor.name : "tu asesor"}…`);
  });

  document.getElementById("copyRequestBtn").addEventListener("click", async () => {
    if (!validateForm()) return;
    const payload = buildQuotePayload(getFormData());
    try {
      await navigator.clipboard.writeText(payload.mensaje);
      showToast("Solicitud copiada. Puedes pegarla donde prefieras enviarla.");
    } catch (e) {
      showToast("No se pudo copiar automáticamente. Selecciona el texto manualmente.");
    }
  });

  /* ---------------------------------------------------------------------
     TOAST
     --------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
  }

  /* ---------------------------------------------------------------------
     NAV MÓVIL
     --------------------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    hamburger.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });
  navLinks.querySelectorAll("[data-close]").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      hamburger.classList.remove("is-open");
    })
  );

  /* ---------------------------------------------------------------------
     SCROLL REVEAL
     --------------------------------------------------------------------- */
  let cardObserver;
  function observeCards() {
    const items = document.querySelectorAll(".card:not(.in-view), .kit-card:not(.in-view)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((c) => c.classList.add("in-view"));
      return;
    }
    if (!cardObserver) {
      cardObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              cardObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
    }
    items.forEach((c) => cardObserver.observe(c));
  }

  /* ---------------------------------------------------------------------
     INIT
     --------------------------------------------------------------------- */
  renderCategoryPills();
  wireFilterPills();
  renderKits();
  renderCatalog();
  renderCartUI();
  applyFilters();

  // Vista previa del slider antes/después en la sección "Kits" (próximamente).
  const kitsPreviewReveal = document.getElementById("kitsPreviewReveal");
  if (kitsPreviewReveal) initReveal(kitsPreviewReveal);
});
