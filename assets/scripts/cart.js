(() => {
  const state = {
    keyword: "",
    page: 1,
    pageSize: 5,
    selectedIds: new Set(),
    products: [
      { id: "098134NN", name: "煤炭", price: 400.98, stock: 234, image: "assets/images/cart/coal-a.png" },
      { id: "088134NT", name: "碳排放权", price: 550.75, stock: 570, image: "assets/images/cart/carbon-rights.png" },
      { id: "038134CT", name: "碳排放咨询权", price: 210.98, stock: 89, image: "assets/images/cart/consult-rights.png" },
      { id: "058134NK", name: "煤炭", price: 149.99, stock: 989, image: "assets/images/cart/coal-b.png" },
      { id: "078134WD", name: "原木", price: 276.99, stock: 876, image: "assets/images/cart/timber.png" },
    ],
  };

  const dom = {
    rows: document.getElementById("productRows"),
    toolbarSearchInput: document.getElementById("toolbarSearchInput"),
    cardSearchInput: document.getElementById("cardSearchInput"),
    addProductBtn: document.getElementById("addProductBtn"),
    resultsSummary: document.getElementById("resultsSummary"),
    pagerPrev: document.getElementById("pagerPrev"),
    pagerNext: document.getElementById("pagerNext"),
    pagerPages: document.getElementById("pagerPages"),
    addModal: document.getElementById("addModal"),
    closeModalBtn: document.getElementById("closeModalBtn"),
    cancelModalBtn: document.getElementById("cancelModalBtn"),
    addProductForm: document.getElementById("addProductForm"),
    modalBackdrop: document.querySelector("[data-close-modal]"),
  };

  const fallbackImage = "assets/images/cart/coal-a.png";

  const formatPrice = (value) => {
    const price = Number(value);
    if (!Number.isFinite(price)) return "¥ 0.00";
    return `¥ ${price.toFixed(2)}`;
  };

  const norm = (text) => String(text ?? "").trim().toLowerCase();

  const getFilteredProducts = () => {
    if (!state.keyword) return state.products;
    const key = norm(state.keyword);
    return state.products.filter((product) => norm(product.name).includes(key) || norm(product.id).includes(key));
  };

  const getPageCount = (total) => Math.max(1, Math.ceil(total / state.pageSize));

  const clampPage = (total) => {
    const count = getPageCount(total);
    if (state.page > count) state.page = count;
    if (state.page < 1) state.page = 1;
  };

  const getPagedProducts = (list) => {
    const start = (state.page - 1) * state.pageSize;
    return list.slice(start, start + state.pageSize);
  };

  const createPageButton = (label, page, isCurrent = false) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(label);
    if (isCurrent) button.classList.add("current");
    button.addEventListener("click", () => {
      state.page = page;
      render();
    });
    return button;
  };

  const renderPager = (totalCount) => {
    const totalPages = getPageCount(totalCount);
    dom.pagerPages.innerHTML = "";

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page += 1) {
        dom.pagerPages.appendChild(createPageButton(page, page, page === state.page));
      }
    } else {
      const pageSet = new Set([1, totalPages, state.page - 1, state.page, state.page + 1]);
      const pages = [...pageSet].filter((item) => item >= 1 && item <= totalPages).sort((a, b) => a - b);
      let previous = 0;

      pages.forEach((page) => {
        if (previous && page - previous > 1) {
          const ellipsis = document.createElement("button");
          ellipsis.type = "button";
          ellipsis.textContent = "...";
          ellipsis.disabled = true;
          dom.pagerPages.appendChild(ellipsis);
        }
        dom.pagerPages.appendChild(createPageButton(page, page, page === state.page));
        previous = page;
      });
    }

    dom.pagerPrev.disabled = state.page <= 1;
    dom.pagerNext.disabled = state.page >= totalPages;
  };

  const createRowHTML = (product) => {
    const selected = state.selectedIds.has(product.id);
    const imageSrc = product.image || fallbackImage;

    return `
      <article class="table-row ${selected ? "active" : ""}" data-id="${product.id}">
        <button class="check-col ${selected ? "checked" : ""}" type="button" data-role="select" data-id="${product.id}" aria-label="选择商品"></button>
        <div class="name-col">
          <img src="${imageSrc}" alt="${product.name}" loading="lazy" onerror="this.src='${fallbackImage}'" />
          <div>
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
          </div>
        </div>
        <strong>${formatPrice(product.price)}</strong>
        <strong>${product.stock}</strong>
      </article>
    `;
  };

  const renderRows = (pagedProducts) => {
    if (!pagedProducts.length) {
      dom.rows.innerHTML = `
        <article class="table-row empty-row">
          <p>没有匹配的商品，请试试其他关键词。</p>
        </article>
      `;
      return;
    }

    dom.rows.innerHTML = pagedProducts.map(createRowHTML).join("");
  };

  const renderSummary = (filteredCount) => {
    const selected = state.selectedIds.size;
    dom.resultsSummary.textContent = `显示结果：${filteredCount} 条，已选择 ${selected} 项`;
  };

  const render = () => {
    const filtered = getFilteredProducts();
    clampPage(filtered.length);
    const paged = getPagedProducts(filtered);

    renderRows(paged);
    renderPager(filtered.length);
    renderSummary(filtered.length);
  };

  const syncSearchInputs = (value, source = "toolbar") => {
    if (source !== "toolbar" && dom.toolbarSearchInput.value !== value) dom.toolbarSearchInput.value = value;
    if (source !== "card" && dom.cardSearchInput.value !== value) dom.cardSearchInput.value = value;
  };

  const onSearchInput = (value, source) => {
    state.keyword = value.trim();
    state.page = 1;
    syncSearchInputs(value, source);
    render();
  };

  const openModal = () => {
    dom.addModal.hidden = false;
    requestAnimationFrame(() => dom.addModal.classList.add("open"));
    dom.addProductForm.elements.name.focus();
  };

  const closeModal = () => {
    dom.addModal.classList.remove("open");
    setTimeout(() => {
      dom.addModal.hidden = true;
      dom.addProductForm.reset();
    }, 160);
  };

  const generateId = (baseId) => {
    const raw = (baseId || "").trim().toUpperCase();
    if (!raw) return `CX${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    if (!state.products.some((item) => item.id === raw)) return raw;
    return `${raw}-${Date.now().toString().slice(-4)}`;
  };

  const addProductFromForm = (form) => {
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const customId = String(formData.get("id") ?? "").trim();
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const image = String(formData.get("image") ?? "").trim() || fallbackImage;

    if (!name || !Number.isFinite(price) || !Number.isFinite(stock)) return;

    const item = {
      id: generateId(customId),
      name,
      price: Math.max(0, price),
      stock: Math.max(0, Math.floor(stock)),
      image,
    };

    state.products.unshift(item);
    state.keyword = "";
    state.page = 1;
    syncSearchInputs("", "none");
    closeModal();
    render();
  };

  const bindEvents = () => {
    dom.toolbarSearchInput.addEventListener("input", (event) => onSearchInput(event.target.value, "toolbar"));
    dom.cardSearchInput.addEventListener("input", (event) => onSearchInput(event.target.value, "card"));

    dom.rows.addEventListener("click", (event) => {
      const target = event.target.closest("[data-role='select']");
      if (!target) return;

      const productId = target.dataset.id;
      if (!productId) return;

      if (state.selectedIds.has(productId)) state.selectedIds.delete(productId);
      else state.selectedIds.add(productId);

      render();
    });

    dom.pagerPrev.addEventListener("click", () => {
      state.page -= 1;
      render();
    });

    dom.pagerNext.addEventListener("click", () => {
      state.page += 1;
      render();
    });

    dom.addProductBtn.addEventListener("click", openModal);
    dom.closeModalBtn.addEventListener("click", closeModal);
    dom.cancelModalBtn.addEventListener("click", closeModal);
    dom.modalBackdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !dom.addModal.hidden) closeModal();
    });

    dom.addProductForm.addEventListener("submit", (event) => {
      event.preventDefault();
      addProductFromForm(event.currentTarget);
    });
  };

  bindEvents();
  render();
})();
