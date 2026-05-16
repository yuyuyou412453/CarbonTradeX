(() => {
  const products = [
    { id: "P-1001", name: "铝合金钢管", seller: "碳小链", category: "建材", chain: "CTC", price: 804, hot: 95, image: "assets/images/market/product-aluminum-pipes.png", avatar: "assets/images/market/avatar-coin-a.png", countdown: true },
    { id: "P-1002", name: "不锈钢卷材", seller: "碳小链", category: "建材", chain: "BTC", price: 846, hot: 89, image: "assets/images/market/product-steel-rolls.png", avatar: "assets/images/market/avatar-profile.png" },
    { id: "P-1003", name: "原木", seller: "碳小链", category: "建材", chain: "MATIC", price: 690, hot: 87, image: "assets/images/market/product-timber.png", avatar: "assets/images/market/avatar-coin-c.png" },
    { id: "P-1004", name: "碳排放权", seller: "碳小链", category: "化工", chain: "CTC", price: 860, hot: 93, image: "assets/images/market/product-carbon-rights.png", avatar: "assets/images/market/avatar-coin-a.png" },
    { id: "P-1005", name: "煤炭", seller: "碳小链", category: "建材", chain: "BTC", price: 582, hot: 79, image: "assets/images/market/product-coal.png", avatar: "assets/images/market/avatar-profile.png" },
    { id: "P-1006", name: "碳交易咨询服务", seller: "碳小链", category: "生物制药", chain: "MATIC", price: 773, hot: 81, image: "assets/images/market/product-pharma-line.png", avatar: "assets/images/market/avatar-coin-c.png" },
    { id: "P-1007", name: "林地碳汇权益", seller: "碳小链", category: "建材", chain: "CTC", price: 836, hot: 86, image: "assets/images/market/product-forest.png", avatar: "assets/images/market/avatar-coin-a.png" },
    { id: "P-1008", name: "工业煤料", seller: "碳小链", category: "化工", chain: "BTC", price: 635, hot: 78, image: "assets/images/market/product-factory.png", avatar: "assets/images/market/avatar-profile.png" },
    { id: "P-1009", name: "足迹追踪工具包", seller: "碳小链", category: "化工", chain: "CTC", price: 528, hot: 92, image: "assets/images/market/product-aluminum-pipes.png", avatar: "assets/images/market/avatar-coin-c.png" },
    { id: "P-1010", name: "铝卷", seller: "碳小链", category: "建材", chain: "CTC", price: 688, hot: 66, image: "assets/images/market/product-steel-rolls.png", avatar: "assets/images/market/avatar-coin-a.png" },
    { id: "P-1011", name: "药品灌装线", seller: "碳小链", category: "生物制药", chain: "MATIC", price: 742, hot: 83, image: "assets/images/market/product-pharma-line.png", avatar: "assets/images/market/avatar-coin-c.png" },
    { id: "P-1012", name: "工业木料", seller: "碳小链", category: "建材", chain: "BTC", price: 578, hot: 74, image: "assets/images/market/product-timber.png", avatar: "assets/images/market/avatar-profile.png" },
  ];

  const state = {
    search: "",
    sort: "all",
    category: "all",
    chain: "all",
    page: 1,
    pageSize: 9,
    favorites: new Set(),
  };

  const dom = {
    productGrid: document.getElementById("marketProductGrid"),
    pager: document.getElementById("marketPager"),
    globalSearch: document.getElementById("marketGlobalSearch"),
    inlineSearch: document.getElementById("marketInlineSearch"),
    sideSearch: document.getElementById("marketSideSearch"),
    sortChips: [...document.querySelectorAll(".sort-chip[data-sort]")],
    categoryButtons: [...document.querySelectorAll(".category-list button[data-category]")],
    chainButtons: [...document.querySelectorAll(".chain-list button[data-chain]")],
    followButtons: [...document.querySelectorAll(".follow-btn")],
    toast: document.getElementById("marketToast"),
  };

  let toastTimer = null;

  const showToast = (message) => {
    if (!dom.toast) return;
    dom.toast.textContent = message;
    dom.toast.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toast.classList.remove("show");
    }, 1600);
  };

  const syncSearchInputs = (value, source) => {
    if (source !== "global" && dom.globalSearch && dom.globalSearch.value !== value) dom.globalSearch.value = value;
    if (source !== "inline" && dom.inlineSearch && dom.inlineSearch.value !== value) dom.inlineSearch.value = value;
    if (source !== "side" && dom.sideSearch && dom.sideSearch.value !== value) dom.sideSearch.value = value;
  };

  const getFiltered = () => {
    const key = state.search.trim().toLowerCase();
    let list = [...products];

    if (key) {
      list = list.filter((item) => `${item.name} ${item.id} ${item.category}`.toLowerCase().includes(key));
    }

    if (state.category !== "all") list = list.filter((item) => item.category === state.category);
    if (state.chain !== "all") list = list.filter((item) => item.chain === state.chain);

    if (state.sort === "low") list.sort((a, b) => a.price - b.price);
    if (state.sort === "high") list.sort((a, b) => b.price - a.price);
    if (state.sort === "hot") list.sort((a, b) => b.hot - a.hot);

    return list;
  };

  const getTotalPages = (total) => Math.max(1, Math.ceil(total / state.pageSize));

  const renderPager = (totalCount) => {
    if (!dom.pager) return;

    const totalPages = getTotalPages(totalCount);
    if (state.page > totalPages) state.page = totalPages;

    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) pages.push(i);

    const uiPages = pages.length <= 4 ? pages : [1, 2, "...", totalPages];

    dom.pager.innerHTML = uiPages
      .map((page) => {
        if (page === "...") return `<button type="button" disabled>...</button>`;
        const active = page === state.page ? "active" : "";
        return `<button type="button" class="${active}" data-page="${page}">${page}</button>`;
      })
      .join("");
  };

  const renderProducts = () => {
    if (!dom.productGrid) return;

    const filtered = getFiltered();
    const totalPages = getTotalPages(filtered.length);
    if (state.page > totalPages) state.page = totalPages;

    const start = (state.page - 1) * state.pageSize;
    const paged = filtered.slice(start, start + state.pageSize);

    if (!paged.length) {
      dom.productGrid.innerHTML = `<article class="product-empty">没有符合条件的商品，请调整筛选条件。</article>`;
      renderPager(filtered.length);
      return;
    }

    dom.productGrid.innerHTML = paged
      .map((item) => {
        const fav = state.favorites.has(item.id) ? "active" : "";
        return `
          <article class="product-card">
            <div class="product-image-wrap">
              <img class="product-image" src="${item.image}" alt="${item.name}" />
              <img class="price-badge" src="assets/images/market/coin-badge.png" alt="价格标签" />
              ${item.countdown ? '<img class="time-badge" src="assets/images/market/time-badge.png" alt="倒计时" />' : ""}
              <img class="corner-avatar" src="${item.avatar}" alt="" />
            </div>
            <p class="seller-line">${item.seller} <span>✔</span></p>
            <h3 class="product-title">${item.name}</h3>
            <div class="product-actions">
              <button class="fav-btn ${fav}" type="button" data-action="fav" data-id="${item.id}">♡</button>
              <button class="buy-btn" type="button" data-action="buy" data-id="${item.id}">购买</button>
            </div>
          </article>
        `;
      })
      .join("");

    renderPager(filtered.length);
  };

  const setSort = (sort) => {
    state.sort = sort;
    state.page = 1;
    dom.sortChips.forEach((chip) => chip.classList.toggle("active", chip.dataset.sort === sort));
    renderProducts();
  };

  const setCategory = (category) => {
    state.category = category;
    state.page = 1;
    dom.categoryButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.category === category));
    renderProducts();
  };

  const setChain = (chain) => {
    state.chain = chain;
    state.page = 1;
    dom.chainButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.chain === chain));
    renderProducts();
  };

  const setSearch = (value, source) => {
    state.search = value;
    state.page = 1;
    syncSearchInputs(value, source);
    renderProducts();
  };

  const addToCart = (productId) => {
    const item = products.find((p) => p.id === productId);
    if (!item) return;

    const raw = localStorage.getItem("marketCartItems");
    let list = [];
    if (raw) {
      try {
        list = JSON.parse(raw);
      } catch {
        list = [];
      }
    }

    list.push({ id: item.id, name: item.name, price: item.price, at: Date.now() });
    localStorage.setItem("marketCartItems", JSON.stringify(list));
    showToast(`已将 ${item.name} 加入购物车`);
  };

  const bindEvents = () => {
    dom.globalSearch?.addEventListener("input", (event) => setSearch(event.target.value, "global"));
    dom.inlineSearch?.addEventListener("input", (event) => setSearch(event.target.value, "inline"));
    dom.sideSearch?.addEventListener("input", (event) => setSearch(event.target.value, "side"));

    dom.sortChips.forEach((chip) => {
      chip.addEventListener("click", () => setSort(chip.dataset.sort || "all"));
    });

    dom.categoryButtons.forEach((btn) => {
      btn.addEventListener("click", () => setCategory(btn.dataset.category || "all"));
    });

    dom.chainButtons.forEach((btn) => {
      btn.addEventListener("click", () => setChain(btn.dataset.chain || "all"));
    });

    dom.followButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const active = btn.classList.toggle("active");
        btn.textContent = active ? "Following" : "Follow";
      });
    });

    dom.productGrid?.addEventListener("click", (event) => {
      const target = event.target.closest("[data-action]");
      if (!target) return;

      const action = target.dataset.action;
      const id = target.dataset.id;
      if (!id) return;

      if (action === "fav") {
        if (state.favorites.has(id)) state.favorites.delete(id);
        else state.favorites.add(id);
        renderProducts();
      }

      if (action === "buy") addToCart(id);
    });

    dom.pager?.addEventListener("click", (event) => {
      const target = event.target.closest("[data-page]");
      if (!target) return;
      const page = Number(target.dataset.page);
      if (!Number.isFinite(page) || page < 1) return;
      state.page = page;
      renderProducts();
    });
  };

  bindEvents();
  renderProducts();
})();
