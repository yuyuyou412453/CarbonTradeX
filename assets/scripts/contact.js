(() => {
  const state = {
    mode: "signup",
    step: "auth",
    channel: "email",
  };

  const stepNodes = [...document.querySelectorAll(".auth-step")];
  const authTitle = document.getElementById("authTitle");
  const authSubtitle = document.getElementById("authSubtitle");
  const authSceneText = document.getElementById("authSceneText");
  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");
  const forgotBtn = document.getElementById("forgotBtn");
  const backToAuthBtn = document.getElementById("backToAuthBtn");
  const authForm = document.getElementById("authForm");
  const forgotForm = document.getElementById("forgotForm");
  const codeForm = document.getElementById("codeForm");
  const authStatus = document.getElementById("authStatus");
  const methodSystemBtn = document.getElementById("methodSystemBtn");
  const methodEmailBtn = document.getElementById("methodEmailBtn");
  const methodContinueBtn = document.getElementById("methodContinueBtn");
  const methodCards = [...document.querySelectorAll(".method-card")];
  const codeInputs = [...document.querySelectorAll(".code-input")];
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");
  const forgotEmail = document.getElementById("forgotEmail");

  const modeCopy = {
    signup: {
      title: "建立你的账户",
      subtitle: "设置账户只需不到 1 分钟。",
    },
    login: {
      title: "欢迎回来",
      subtitle: "请输入您的电子邮件和密码",
    },
  };

  const sceneCopy = {
    auth_signup: `<span class="scene-keyword">Trade</span><br />anything anywhere with Whale.io!`,
    auth_login: `CarbonTradeX, Trade anything<br />anywhere with CarbonTradeX !`,
    forgot: `CarbonTradeX, Recover password<br />and continue trading.`,
    method: `CarbonTradeX, Verify identity<br />before market access.`,
    code: `CarbonTradeX, Enter your 4-digit code<br />to continue safely.`,
  };

  const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());

  const setStatus = (text, type = "") => {
    if (!authStatus) return;
    authStatus.textContent = text || "";
    authStatus.className = `auth-status${type ? ` ${type}` : ""}`;
  };

  const renderSceneCopy = () => {
    if (!authSceneText) return;
    const key = state.step === "auth" ? `auth_${state.mode}` : state.step;
    authSceneText.innerHTML = sceneCopy[key] || sceneCopy.auth_signup;
  };

  const setStep = (step) => {
    state.step = step;
    stepNodes.forEach((node) => {
      node.classList.toggle("hidden", node.dataset.step !== step);
    });
    renderSceneCopy();
    setStatus("");
  };

  const setMode = (mode) => {
    state.mode = mode;
    const copy = modeCopy[mode];
    if (authTitle) authTitle.textContent = copy.title;
    if (authSubtitle) authSubtitle.textContent = copy.subtitle;
    tabLogin?.classList.toggle("active", mode === "login");
    tabSignup?.classList.toggle("active", mode === "signup");
    renderSceneCopy();
  };

  const setChannel = (channel) => {
    state.channel = channel;
    methodCards.forEach((card) => card.classList.toggle("active", card.dataset.channel === channel));
    methodSystemBtn?.classList.toggle("active", channel === "sms");
    methodEmailBtn?.classList.toggle("active", channel === "email");
  };

  const validateAuth = () => {
    const email = authEmail?.value ?? "";
    const password = authPassword?.value ?? "";
    if (!isEmailValid(email)) {
      setStatus("请输入正确的邮箱地址。", "error");
      authEmail?.focus();
      return false;
    }
    if (String(password).trim().length < 6) {
      setStatus("密码长度至少 6 位。", "error");
      authPassword?.focus();
      return false;
    }
    return true;
  };

  const validateForgot = () => {
    const email = forgotEmail?.value ?? "";
    if (!isEmailValid(email)) {
      setStatus("请输入正确的邮箱地址。", "error");
      forgotEmail?.focus();
      return false;
    }
    return true;
  };

  const validateCode = () => {
    const code = codeInputs.map((input) => input.value.trim()).join("");
    if (!/^\d{4}$/.test(code)) {
      setStatus("请输入 4 位数字验证码。", "error");
      codeInputs[0]?.focus();
      return false;
    }
    return true;
  };

  const bindCodeInputFlow = () => {
    codeInputs.forEach((input, idx) => {
      input.addEventListener("input", () => {
        input.value = input.value.replace(/\D/g, "").slice(0, 1);
        if (input.value && idx < codeInputs.length - 1) {
          codeInputs[idx + 1].focus();
        }
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && !input.value && idx > 0) {
          codeInputs[idx - 1].focus();
        }
      });
    });
  };

  const openForgotStep = () => {
    setMode("login");
    setStep("forgot");
  };

  const bindEvents = () => {
    tabLogin?.addEventListener("click", () => {
      setMode("login");
      setStep("auth");
    });

    tabSignup?.addEventListener("click", () => {
      setMode("signup");
      setStep("auth");
    });

    forgotBtn?.addEventListener("click", openForgotStep);
    backToAuthBtn?.addEventListener("click", () => setStep("auth"));

    authForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateAuth()) return;
      setStep("method");
      setStatus(state.mode === "signup" ? "注册信息已提交，请完成验证。" : "登录信息已提交，请完成验证。", "success");
    });

    forgotForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateForgot()) return;
      setStep("code");
      setStatus("验证码已发送，请查收邮箱。", "success");
      codeInputs[0]?.focus();
    });

    methodSystemBtn?.addEventListener("click", () => setChannel("sms"));
    methodEmailBtn?.addEventListener("click", () => setChannel("email"));

    methodCards.forEach((card) => {
      card.addEventListener("click", () => setChannel(card.dataset.channel || "email"));
    });

    methodContinueBtn?.addEventListener("click", () => {
      setStep("code");
      setStatus(
        state.channel === "email" ? "验证码已发送到邮箱。请输入 4 位数字。"
                                  : "验证码已发送到短信。请输入 4 位数字。",
        "success"
      );
      codeInputs[0]?.focus();
    });

    codeForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!validateCode()) return;
      setStatus("验证成功，正在进入系统。", "success");
    });
  };

  const initFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = (params.get("step") || "").toLowerCase();
    const fromHash = (window.location.hash || "").replace("#", "").toLowerCase();
    const step = fromQuery || fromHash;
    if (step === "forgot") {
      openForgotStep();
    } else if (step === "method" || step === "code" || step === "auth") {
      if (step === "auth") setMode("signup");
      setStep(step);
    }
  };

  setMode("signup");
  setStep("auth");
  setChannel("email");
  bindCodeInputFlow();
  bindEvents();
  initFromUrl();
})();
