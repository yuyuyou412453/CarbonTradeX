(() => {
  const logos = [
    { name: "生态合作方 A", image: "assets/images/partner-1.png", desc: "绿色电力协同调度伙伴" },
    { name: "生态合作方 B", image: "assets/images/partner-2.png", desc: "工业节能改造技术伙伴" },
    { name: "生态合作方 C", image: "assets/images/partner-3.png", desc: "城市碳治理数据伙伴" },
    { name: "生态合作方 D", image: "assets/images/partner-4.png", desc: "绿色金融评估伙伴" },
  ];

  let idx = 0;
  const img = document.getElementById("partnerShowImage");
  const title = document.getElementById("partnerShowTitle");
  const desc = document.getElementById("partnerShowDesc");
  const prev = document.getElementById("partnerPrev");
  const next = document.getElementById("partnerNext");

  if (!img || !title || !desc) return;

  function render() {
    const item = logos[idx];
    img.src = item.image;
    img.alt = item.name;
    title.textContent = item.name;
    desc.textContent = item.desc;
  }

  prev?.addEventListener("click", () => {
    idx = (idx - 1 + logos.length) % logos.length;
    render();
  });

  next?.addEventListener("click", () => {
    idx = (idx + 1) % logos.length;
    render();
  });

  render();
})();
