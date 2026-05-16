(() => {
  const quoteText = document.getElementById("homeQuoteText");
  const quotePrev = document.getElementById("homeQuotePrev");
  const quoteNext = document.getElementById("homeQuoteNext");
  const quoteWrap = document.getElementById("homeTestimonial");

  const quoteItems = [
    {
      text: "平台让我们的碳数据从采集、校验到上链都有清晰闭环，审计效率显著提升。",
    },
    {
      text: "跨部门协同最难的是数据可信，这套系统把证据链和业务链打通了。",
    },
    {
      text: "不仅能看排放趋势，还能基于建议快速制定减排动作，落地速度更快。",
    },
  ];

  let quoteIndex = 0;
  let quoteTimer = null;

  function renderQuote() {
    if (!quoteText) return;
    const item = quoteItems[quoteIndex];
    quoteText.textContent = `“${item.text}”`;
  }

  function moveQuote(step) {
    quoteIndex = (quoteIndex + step + quoteItems.length) % quoteItems.length;
    renderQuote();
  }

  function stopQuoteAuto() {
    if (!quoteTimer) return;
    window.clearInterval(quoteTimer);
    quoteTimer = null;
  }

  function startQuoteAuto() {
    stopQuoteAuto();
    quoteTimer = window.setInterval(() => moveQuote(1), 4800);
  }

  if (quoteText) {
    renderQuote();
    startQuoteAuto();

    quotePrev?.addEventListener("click", () => {
      moveQuote(-1);
      startQuoteAuto();
    });

    quoteNext?.addEventListener("click", () => {
      moveQuote(1);
      startQuoteAuto();
    });

    quoteWrap?.addEventListener("mouseenter", stopQuoteAuto);
    quoteWrap?.addEventListener("mouseleave", startQuoteAuto);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopQuoteAuto();
      else startQuoteAuto();
    });
  }

  const subscribeForm = document.getElementById("homeSubscribeForm");
  const subscribeEmail = document.getElementById("homeSubscribeEmail");
  const subscribeStatus = document.getElementById("homeSubscribeStatus");

  subscribeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!subscribeEmail || !subscribeStatus) return;

    const value = subscribeEmail.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!value) {
      subscribeStatus.textContent = "请输入邮箱地址。";
      subscribeStatus.style.color = "#ff8a9d";
      return;
    }

    if (!isValid) {
      subscribeStatus.textContent = "邮箱格式不正确，请重新输入。";
      subscribeStatus.style.color = "#ff8a9d";
      return;
    }

    subscribeStatus.textContent = "订阅成功，我们会把最新动态发送到你的邮箱。";
    subscribeStatus.style.color = "#7fffd9";
    subscribeForm.reset();
  });
})();
