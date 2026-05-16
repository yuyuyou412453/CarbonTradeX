(() => {
  const searchInput = document.getElementById("trackSearchInput");
  const exchangeBody = document.getElementById("exchangeBody");
  const rangeButtons = [...document.querySelectorAll(".range-btn")];
  const tabButtons = [...document.querySelectorAll(".coin-tab")];
  const metaContainer = document.getElementById("trackTabContent");
  const buyButton = document.getElementById("buyCitcoinBtn");
  const shareButton = document.getElementById("shareBtn");
  const emptyTip = document.getElementById("searchEmpty");
  const routeButtons = [...document.querySelectorAll("[data-route]")];
  const newsCards = [...document.querySelectorAll(".news-card")];

  if (!exchangeBody) return;

  const tabMeta = {
    overview: [
      ["Website", "CarbonTradeX.com", "index.html"],
      ["Community", "邮箱：1720249798@qq.com"],
      ["Contract", "0x2170d088...bd959933f8"],
    ],
    history: [
      ["Website", "历史数据已同步至 CarbonTradeX.com"],
      ["Community", "近7天成交高峰：周三 13:30"],
      ["Contract", "链上地址：0x2170d088...bd959933f8"],
    ],
    project: [
      ["Website", "碳资产治理与交易基础设施"],
      ["Community", "服务企业：25+，覆盖多行业"],
      ["Contract", "项目审计状态：已通过"],
    ],
    news: [
      ["Website", "政策动态：国家双碳部署持续推进"],
      ["Community", "市场快讯：交易活跃度上升"],
      ["Contract", "媒体报道：绿色金融协同加速"],
    ],
    forum: [
      ["Website", "论坛热帖：碳市场价格趋势分析"],
      ["Community", "社群议题：企业减排成本优化"],
      ["Contract", "技术讨论：可信链路记录与核验"],
    ],
    analysis: [
      ["Website", "分析模型：交易深度 + 波动率"],
      ["Community", "数据源：平台链上与业务侧汇聚"],
      ["Contract", "当前策略：稳健模式"],
    ],
  };

  const rangeData = {
    "1D": {
      price: "¥1,120.21",
      sub: "0.05591 CTC",
      marketCap: "¥3420.6",
      volume: "¥2288.4T",
      factor: 0.992,
    },
    "1M": {
      price: "¥1,129.77",
      sub: "0.05612 CTC",
      marketCap: "¥3472.1",
      volume: "¥2396.2T",
      factor: 0.998,
    },
    "6M": {
      price: "¥1,131.40",
      sub: "0.05624 CTC",
      marketCap: "¥3489.2",
      volume: "¥2457.3T",
      factor: 1.001,
    },
    "1Y": {
      price: "¥1,133.36",
      sub: "0.05631 CTC",
      marketCap: "¥3497.4",
      volume: "¥2488.8T",
      factor: 1.003,
    },
    YTD: {
      price: "¥1,133.80",
      sub: "0.05634 CTC",
      marketCap: "¥3499.5",
      volume: "¥2496.2T",
      factor: 1.004,
    },
    All: {
      price: "¥1,134.86",
      sub: "0.05637 CTC",
      marketCap: "¥3500.0",
      volume: "¥2502.3T",
      factor: 1,
    },
  };

  const exchangeRows = [
    {
      name: "Binance",
      icon: "assets/images/dashboard/exchange-binance.png",
      price: 1132.4,
      volume: "9.29%",
    },
    {
      name: "kucoin",
      icon: "assets/images/dashboard/exchange-kucoin.png",
      price: 1132.4,
      volume: "3.81%",
    },
    {
      name: "CoinBase",
      icon: "assets/images/dashboard/exchange-coinbase.png",
      price: 1132.4,
      volume: "2.40%",
    },
    {
      name: "FTX",
      icon: "assets/images/dashboard/exchange-ftx.png",
      price: 1132.4,
      volume: "9.29%",
    },
  ];

  const toCurrency = (value) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const setMetaRows = (tabKey) => {
    const rows = tabMeta[tabKey] || tabMeta.overview;
    metaContainer.innerHTML = rows
      .map(([key, value, href]) => {
        if (href) {
          return `
            <div class="coin-meta-item">
              <span class="meta-key">${key}</span>
              <a class="meta-value" href="${href}">${value}</a>
            </div>`;
        }

        return `
          <div class="coin-meta-item">
            <span class="meta-key">${key}</span>
            <span class="meta-value">${value}</span>
          </div>`;
      })
      .join("");
  };

  let activeRange = "All";

  const renderExchangeRows = () => {
    const keyword = String(searchInput?.value || "")
      .trim()
      .toLowerCase();
    const factor = rangeData[activeRange]?.factor || 1;

    const filtered = exchangeRows.filter((row) => {
      return !keyword || row.name.toLowerCase().includes(keyword);
    });

    exchangeBody.innerHTML = filtered
      .map((row) => {
        const nextPrice = row.price * factor;
        return `
          <tr data-search="${row.name.toLowerCase()}">
            <td><img src="${row.icon}" alt="${row.name}" /></td>
            <td>${row.name}</td>
            <td>${toCurrency(nextPrice)}</td>
            <td>${row.volume}</td>
          </tr>`;
      })
      .join("");

    return filtered.length;
  };

  const filterNewsCards = () => {
    const keyword = String(searchInput?.value || "")
      .trim()
      .toLowerCase();

    let visible = 0;
    newsCards.forEach((card) => {
      const text = String(card.dataset.search || "").toLowerCase();
      const matched = !keyword || text.includes(keyword);
      card.hidden = !matched;
      if (matched) visible += 1;
    });
    return visible;
  };

  const updateRangePanel = (rangeKey) => {
    const data = rangeData[rangeKey] || rangeData.All;
    activeRange = rangeKey;

    document.getElementById("priceValue").textContent = data.price;
    document.getElementById("priceSub").textContent = data.sub;
    document.getElementById("marketValue").textContent = data.marketCap;
    document.getElementById("volume24h").textContent = data.volume;

    rangeButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.range === rangeKey);
    });

    const exchangeCount = renderExchangeRows();
    const newsCount = filterNewsCards();
    emptyTip.hidden = exchangeCount + newsCount > 0;
  };

  const showToast = (text) => {
    const old = document.getElementById("trackToast");
    if (old) old.remove();

    const toast = document.createElement("p");
    toast.id = "trackToast";
    toast.textContent = text;
    toast.style.position = "fixed";
    toast.style.right = "22px";
    toast.style.bottom = "22px";
    toast.style.margin = "0";
    toast.style.padding = "10px 14px";
    toast.style.background = "rgba(7,16,28,0.94)";
    toast.style.border = "1px solid rgba(106,128,163,0.55)";
    toast.style.color = "#def4e8";
    toast.style.borderRadius = "10px";
    toast.style.zIndex = "99";
    toast.style.fontSize = "14px";
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 1500);
  };

  const addToCart = () => {
    const storageKey = "marketCartItems";
    const exists = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const item = {
      id: "CTC-TRACK-001",
      name: "碳排放权",
      price: 1134.86,
      stock: 1,
      image: "assets/images/cart/carbon-rights.png",
      source: "dashboard",
    };

    exists.unshift(item);
    localStorage.setItem(storageKey, JSON.stringify(exists.slice(0, 30)));
    showToast("已加入购物车，可在购物车页面查看。");
  };

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.tab || "overview";
      tabButtons.forEach((tab) => tab.classList.toggle("active", tab === button));
      setMetaRows(key);
    });
  });

  rangeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      updateRangePanel(button.dataset.range || "All");
    });
  });

  routeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const route = button.dataset.route;
      if (route) window.location.href = route;
    });
  });

  buyButton?.addEventListener("click", addToCart);

  shareButton?.addEventListener("click", async () => {
    const text = "Carbon X 足迹追踪页面";
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      showToast("页面链接已复制。");
    } catch {
      showToast("复制失败，请手动复制地址栏链接。");
    }
  });

  searchInput?.addEventListener("input", () => {
    const exchangeCount = renderExchangeRows();
    const newsCount = filterNewsCards();
    emptyTip.hidden = exchangeCount + newsCount > 0;
  });

  document.querySelectorAll(".fav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      button.textContent = button.classList.contains("active") ? "♥" : "♡";
    });
  });

  setMetaRows("overview");
  updateRangePanel("All");
})();
