(() => {
  const tableBody = document.getElementById("rankTableBody");
  const pager = document.getElementById("rankPager");
  const searchInput = document.getElementById("rankSearchInput");
  const emptyTip = document.getElementById("rankEmpty");
  const routeButtons = [...document.querySelectorAll("[data-route]")];
  const sortableHeaders = [...document.querySelectorAll(".rank-table th[data-sort]")];

  if (!tableBody || !pager) return;

  const avatarList = [
    "assets/images/rank/avatar-1.png",
    "assets/images/rank/avatar-2.png",
    "assets/images/rank/avatar-3.png",
    "assets/images/rank/avatar-4.png",
    "assets/images/rank/avatar-5.png",
    "assets/images/rank/avatar-6.png",
  ];

  const state = {
    page: 2,
    pageSize: 6,
    keyword: "",
    sortKey: "rank",
    sortDir: "asc",
  };

  const rows = Array.from({ length: 24 }, (_, idx) => {
    const rank = idx + 1;
    const monthNegative = rank % 2 === 0 || rank % 5 === 0;
    const yearNegative = rank % 7 === 0;

    return {
      rank,
      user: "碳小链",
      avatar: avatarList[idx % avatarList.length],
      asset: 10450,
      year: yearNegative ? -3.36 : 3.36,
      quarter: 3.36,
      month: monthNegative ? -3.36 : 3.36,
      market: 4945,
      cost: 4945,
      total: 10.3,
      item: "item",
    };
  });

  const toPlain = (value) => String(value).toLowerCase();

  const toCurrency = (value) => value.toLocaleString("en-US");

  const toTotal = (value) => `${value.toFixed(1)}k`;

  const toRatePill = (value) => {
    const cls = value >= 0 ? "up" : "down";
    const arrow = value >= 0 ? "▲" : "▼";
    return `<span class="rate-pill ${cls}">${arrow}${Math.abs(value).toFixed(2)}%</span>`;
  };

  const applyFilter = (list) => {
    const keyword = state.keyword.trim().toLowerCase();
    if (!keyword) return list;

    return list.filter((row) => {
      return toPlain(row.user).includes(keyword) || toPlain(row.item).includes(keyword) || toPlain(row.rank).includes(keyword);
    });
  };

  const applySort = (list) => {
    const dir = state.sortDir === "asc" ? 1 : -1;
    return [...list].sort((a, b) => {
      const key = state.sortKey;
      const av = a[key];
      const bv = b[key];
      if (typeof av === "string" || typeof bv === "string") {
        return String(av).localeCompare(String(bv), "zh-CN") * dir;
      }
      return (av - bv) * dir;
    });
  };

  const pageCount = (total) => Math.max(1, Math.ceil(total / state.pageSize));

  const clampPage = (total) => {
    const totalPage = pageCount(total);
    if (state.page > totalPage) state.page = totalPage;
    if (state.page < 1) state.page = 1;
  };

  const renderRows = (data) => {
    if (!data.length) {
      tableBody.innerHTML = "";
      return;
    }

    tableBody.innerHTML = data
      .map((row) => {
        return `
        <tr>
          <td class="rank-cell">${row.rank}.</td>
          <td class="user-cell">
            <div class="user-wrap">
              <img src="${row.avatar}" alt="${row.user}" />
              <strong>${row.user}<b>✔</b></strong>
            </div>
          </td>
          <td class="value-cell">${toCurrency(row.asset)}</td>
          <td>${toRatePill(row.year)}</td>
          <td>${toRatePill(row.quarter)}</td>
          <td>${toRatePill(row.month)}</td>
          <td class="value-cell">${toCurrency(row.market)}</td>
          <td class="value-cell">${toCurrency(row.cost)}</td>
          <td class="value-cell">${toTotal(row.total)}</td>
        </tr>`;
      })
      .join("");
  };

  const buildPager = (totalPages) => {
    pager.innerHTML = "";

    const addButton = (label, page, isActive = false) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = String(label);
      if (isActive) btn.classList.add("active");
      btn.addEventListener("click", () => {
        state.page = page;
        render();
      });
      pager.appendChild(btn);
    };

    if (totalPages <= 4) {
      addButton(1, 1, state.page === 1);
      if (totalPages > 1) addButton(2, 2, state.page === 2);
      if (totalPages > 2) addButton(3, 3, state.page === 3);
      if (totalPages > 3) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        pager.appendChild(dots);
        addButton(4, 4, state.page === 4);
      }
      return;
    }

    addButton(1, 1, state.page === 1);
    addButton(2, 2, state.page === 2);
    addButton(3, 3, state.page === 3);
    const dots = document.createElement("span");
    dots.textContent = "...";
    pager.appendChild(dots);
    addButton(totalPages, totalPages, state.page === totalPages);
  };

  const render = () => {
    const filtered = applyFilter(rows);
    const sorted = applySort(filtered);
    clampPage(sorted.length);

    const start = (state.page - 1) * state.pageSize;
    const current = sorted.slice(start, start + state.pageSize);

    renderRows(current);
    buildPager(pageCount(sorted.length));

    const isEmpty = current.length === 0;
    emptyTip.hidden = !isEmpty;
  };

  sortableHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const key = header.dataset.sort;
      if (!key) return;

      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDir = "asc";
      }

      render();
    });
  });

  searchInput?.addEventListener("input", (event) => {
    state.keyword = event.target.value;
    state.page = 1;
    render();
  });

  routeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const route = button.dataset.route;
      if (route) window.location.href = route;
    });
  });

  render();
})();
