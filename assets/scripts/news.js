(() => {
  const videoItems = [
    {
      id: "video-1",
      title: "全国温室气体自愿减排交易市场首批核证自愿减排量（CCER）完成登记",
      image: "assets/images/news/video-1.png",
      time: "2025-03-12 12:43",
      views: 3500,
      comments: 82,
      heat: 94,
      action: "播放",
      summary:
        "全国温室气体自愿减排交易市场首批核证自愿减排量完成登记，标志着全国自愿碳市场进入实质运行阶段。",
    },
    {
      id: "video-2",
      title: "全国人大代表林建华：充分发挥中碳登作用 支持金融机构参与碳排放权交易市场",
      image: "assets/images/news/video-2.png",
      time: "2025-03-11 10:18",
      views: 3500,
      comments: 66,
      heat: 89,
      action: "播放",
      summary:
        "代表建议推动中碳登与金融机构深度协同，进一步提升碳资产配置与市场流动性。",
    },
    {
      id: "video-3",
      title: "多家券商获批参与碳排放权交易",
      image: "assets/images/news/video-3.png",
      time: "2025-03-10 19:02",
      views: 3500,
      comments: 57,
      heat: 92,
      action: "播放",
      summary:
        "多家券商新增获批参与碳排放权交易，市场参与主体持续扩容。",
    },
    {
      id: "video-4",
      title: "碳中和ETF易方达：3月10日融资买入26.47万元，融资融券余额735.06万元",
      image: "assets/images/news/video-4.png",
      time: "2025-03-09 18:36",
      views: 3500,
      comments: 109,
      heat: 97,
      action: "(•) Live",
      summary:
        "碳中和ETF相关融资数据更新，市场对绿色主题资产关注持续增强。",
    },
  ];

  const articleItems = [
    {
      id: "news-1",
      title: "减碳为企业增收7900万元！青岛已有25家企业进入全国碳市场",
      image: "assets/images/news/news-1.png",
      timeLabel: "7个月前",
      time: "2024-11-22 09:30",
      comments: 52,
      heat: 96,
      summary: "青岛碳市场参与企业持续增加，减排收益正在转化为企业经营增益。",
    },
    {
      id: "news-2",
      title: "聚焦碳交易：2025年政府工作报告“双碳”部署",
      image: "assets/images/news/news-2.png",
      timeLabel: "七个月前",
      time: "2024-11-20 10:00",
      comments: 48,
      heat: 91,
      summary: "报告强调“双碳”推进节奏，提出持续完善碳市场和绿色金融机制。",
    },
    {
      id: "news-3",
      title: "吉林碳谷：3月10日融资买入801.93万元，融资融券余额3624.83万元",
      image: "assets/images/news/news-3.png",
      timeLabel: "七个月前",
      time: "2024-11-18 14:20",
      comments: 41,
      heat: 88,
      summary: "融资数据体现市场对碳材料与绿色制造相关标的的关注度提升。",
    },
    {
      id: "news-4",
      title: "发展绿色低碳经济，“双碳”背景下的“人”“产”竞速",
      image: "assets/images/news/news-4.png",
      timeLabel: "七个月前",
      time: "2024-11-15 08:45",
      comments: 67,
      heat: 93,
      summary: "绿色低碳发展进入提速期，人才、产业和资本正加速向低碳赛道聚集。",
    },
    {
      id: "news-5",
      title: "荣盛石化：公司从德荣化工采购部分产品包括碳四、精碳五等",
      image: "assets/images/news/news-5.png",
      timeLabel: "7个月前",
      time: "2024-11-13 16:12",
      comments: 35,
      heat: 82,
      summary: "化工企业原料结构调整持续推进，产业链协同与低碳替代需求同步增长。",
    },
    {
      id: "news-6",
      title: "气候变化对农业的影响：农民寻找解决方案",
      image: "assets/images/news/news-6.png",
      timeLabel: "七个月前",
      time: "2024-11-10 11:38",
      comments: 54,
      heat: 90,
      summary: "农业领域正通过数字化管理、节水灌溉和低碳技术应对气候风险。",
    },
    {
      id: "news-7",
      title: "每经热评 | AI成全国两会热议焦点 “智能向善”亟需政企协同发力",
      image: "assets/images/news/news-7.png",
      timeLabel: "七个月前",
      time: "2024-11-08 09:50",
      comments: 73,
      heat: 95,
      summary: "AI与绿色发展深度交叉，政策治理与企业实践需要同步完善。",
    },
    {
      id: "news-8",
      title: "AI日报 | 蒸发15万亿！美股七巨头至暗时刻已到？美银称看好中国和欧股长期表现",
      image: "assets/images/news/news-8.png",
      timeLabel: "七个月前",
      time: "2024-11-06 13:22",
      comments: 61,
      heat: 87,
      summary: "全球市场波动加剧，机构更关注中长期配置与绿色资产价值。",
    },
  ];

  const topSearchInput = document.getElementById("topSearchInput");
  const contentSearchInput = document.getElementById("contentSearchInput");
  const videoGrid = document.getElementById("videoGrid");
  const articleGrid = document.getElementById("articleGrid");
  const emptyState = document.getElementById("newsEmpty");
  const sortChips = [...document.querySelectorAll(".sort-chip")];
  const routeButtons = [...document.querySelectorAll("[data-route]")];

  const modal = document.getElementById("newsModal");
  const modalImage = document.getElementById("newsModalImage");
  const modalTitle = document.getElementById("newsModalTitle");
  const modalMeta = document.getElementById("newsModalMeta");
  const modalBody = document.getElementById("newsModalBody");
  const closeModalBtn = document.getElementById("closeNewsModalBtn");

  let currentSort = "all";
  let keyword = "";

  const normalize = (value) => String(value || "").trim().toLowerCase();

  const compareBySort = (a, b) => {
    if (currentSort === "latest") {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
    if (currentSort === "comment") {
      return b.comments - a.comments;
    }
    if (currentSort === "hot") {
      return b.heat - a.heat;
    }
    return 0;
  };

  const filterByKeyword = (item) => {
    if (!keyword) return true;
    const matchedText = `${item.title} ${item.summary}`.toLowerCase();
    return matchedText.includes(keyword);
  };

  const getVideos = () => [...videoItems].filter(filterByKeyword).sort(compareBySort);

  const getArticles = () => [...articleItems].filter(filterByKeyword).sort(compareBySort);

  const renderVideos = (list) => {
    videoGrid.innerHTML = list
      .map(
        (item) => `
        <article class="video-card" data-kind="video" data-id="${item.id}">
          <div class="video-media">
            <img src="${item.image}" alt="${item.title}" />
            <img class="video-play-icon" src="assets/images/news/play-icon.png" alt="" />
          </div>
          <h3 class="video-title">${item.title}</h3>
          <div class="video-actions">
            <button type="button" class="play-btn ${item.action.includes("Live") ? "live" : ""}" data-kind="video" data-id="${item.id}">${item.action}</button>
            <p class="watchers">${(item.views / 1000).toFixed(1)}K <span>Watching</span></p>
          </div>
        </article>`
      )
      .join("");
  };

  const renderArticles = (list) => {
    articleGrid.innerHTML = list
      .map(
        (item) => `
        <article class="article-card" data-kind="article" data-id="${item.id}">
          <div class="article-meta">
            <img src="assets/images/cart/avatar.png" alt="碳小链" />
            <strong>碳小链</strong>
            <span class="verify">✔</span>
            <span class="time">${item.timeLabel}</span>
          </div>
          <div class="article-media">
            <img src="${item.image}" alt="${item.title}" />
          </div>
          <h3 class="article-title">${item.title}</h3>
          <div class="article-actions">
            <button type="button" class="fav-btn" aria-label="收藏">♡</button>
            <button type="button" class="read-btn" data-kind="article" data-id="${item.id}">阅读 <span>→</span></button>
          </div>
        </article>`
      )
      .join("");
  };

  const openModal = (item, kind) => {
    if (!item) return;
    modalImage.src = item.image;
    modalImage.alt = item.title;
    modalTitle.textContent = item.title;
    modalMeta.textContent = `${kind === "video" ? "视频" : "资讯"} · ${item.time}`;
    modalBody.textContent = item.summary;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
  };

  const render = () => {
    const videos = getVideos();
    const articles = getArticles();

    renderVideos(videos);
    renderArticles(articles);

    const hasData = videos.length > 0 || articles.length > 0;
    emptyState.hidden = hasData;
  };

  const syncSearch = (from, to) => {
    const nextValue = from.value;
    if (to.value !== nextValue) {
      to.value = nextValue;
    }
    keyword = normalize(nextValue);
    render();
  };

  topSearchInput?.addEventListener("input", () => syncSearch(topSearchInput, contentSearchInput));
  contentSearchInput?.addEventListener("input", () => syncSearch(contentSearchInput, topSearchInput));

  sortChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      currentSort = chip.dataset.sort || "all";
      sortChips.forEach((item) => item.classList.toggle("active", item === chip));
      render();
    });
  });

  routeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const route = button.dataset.route;
      if (route) window.location.href = route;
    });
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const favBtn = target.closest(".fav-btn");
    if (favBtn) {
      favBtn.classList.toggle("active");
      favBtn.textContent = favBtn.classList.contains("active") ? "♥" : "♡";
      return;
    }

    const actionBtn = target.closest("[data-kind][data-id]");
    if (!actionBtn) return;

    const kind = actionBtn.getAttribute("data-kind");
    const id = actionBtn.getAttribute("data-id");
    const source = kind === "video" ? videoItems : articleItems;
    const item = source.find((row) => row.id === id);

    openModal(item, kind || "article");
  });

  closeModalBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.hasAttribute("data-close-modal")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });

  render();
})();
