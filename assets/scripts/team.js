(() => {
  const data = [
    {
      name: "李珂",
      role: "算法负责人",
      text: "我们把原来分散在不同系统里的碳排数据统一到一条可信链上，审计效率提升 60% 以上。",
      avatar: "assets/images/avatar-1.png",
    },
    {
      name: "赵明",
      role: "解决方案总监",
      text: "企业在平台上可以同时完成核算、分析与交易协同，真正做到“一次接入，持续增值”。",
      avatar: "assets/images/avatar-2.png",
    },
    {
      name: "周宁",
      role: "城市项目经理",
      text: "对监管单位而言，最重要的是可追溯性。现在每一项指标都能回到原始证据。",
      avatar: "assets/images/avatar-3.png",
    },
  ];

  let idx = 0;
  let timer = null;

  const avatar = document.getElementById("quoteAvatar");
  const text = document.getElementById("quoteText");
  const meta = document.getElementById("quoteMeta");
  const prev = document.getElementById("quotePrev");
  const next = document.getElementById("quoteNext");
  const wrap = document.getElementById("quoteWrap");

  if (!avatar || !text || !meta) return;

  function render() {
    const item = data[idx];
    avatar.src = item.avatar;
    avatar.alt = item.name;
    text.textContent = `“${item.text}”`;
    meta.textContent = `${item.name} · ${item.role}`;
  }

  function move(step) {
    idx = (idx + step + data.length) % data.length;
    render();
  }

  function start() {
    stop();
    timer = window.setInterval(() => move(1), 4600);
  }

  function stop() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  prev?.addEventListener("click", () => {
    move(-1);
    start();
  });
  next?.addEventListener("click", () => {
    move(1);
    start();
  });
  wrap?.addEventListener("mouseenter", stop);
  wrap?.addEventListener("mouseleave", start);

  render();
  start();
})();
