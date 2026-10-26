(() => {
  "use strict";

  const state = {
    current: "0",
    previous: "",
    operator: null,
    reset: false,
    justEvaluated: false,
  };

  const I18N = {
    en: {
      title: "Calculator",
      clear: "Clear",
      lang: "Lang",
    },
    ar: {
      title: "calculatrice",
      clear: "effacer",
      lang: "اللغة",
    },
  };

  let lang = (localStorage.getItem("calc-lang") === "ar" || navigator.language.startsWith("ar")) ? "ar" : "en";
  const body = document.body;
  const titleEl = document.getElementById("title");
  const langBtn = document.getElementById("langBtn");
  const clearBtn = document.getElementById("clearBtn");
  const currentEl = document.getElementById("current");
  const historyEl = document.getElementById("history");

  function setLang(l) {
    lang = l;
    localStorage.setItem("calc-lang", lang);
    body.classList.toggle("rtl", lang === "ar");
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    titleEl.textContent = I18N[lang].title;
    clearBtn.setAttribute("title", I18N[lang].clear);
    langBtn.setAttribute("title", I18N[lang].lang);
    updateDisplay();
  }

  function fmt(n) {
    if (!isFinite(n)) return "Error";
    let s = String(n);
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
    if (s.length > 14) {
      s = n.toPrecision(12).replace(/\.?0+$/, "");
    }
    return s;
  }

  function updateDisplay() {
    currentEl.textContent = fmt(state.current);
    historyEl.textContent = state.previous + (state.operator ? " " + state.operator : "");
  }

  function inputNumber(d) {
    if (state.reset || state.justEvaluated) {
      state.current = d;
      state.reset = false;
      state.justEvaluated = false;
      return;
    }
    if (state.current === "0") state.current = d;
    else if (state.current.length < 14) state.current += d;
  }

  function inputDot() {
    if (state.reset) { state.current = "0."; state.reset = false; return; }
    if (state.justEvaluated) { state.current = "0."; state.justEvaluated = false; return; }
    if (!state.current.includes(".")) state.current += ".";
  }

  function toggleSign() {
    if (state.current === "0" || state.current === "Error") return;
    state.current = state.current.startsWith("-") ? state.current.slice(1) : "-" + state.current;
  }

  function inputPercent() {
    const v = parseFloat(state.current);
    if (isFinite(v)) {
      state.current = fmt(v / 100);
      state.reset = true;
    }
  }

  function chooseOp(op) {
    if (state.justEvaluated) {
      state.previous = state.current;
      state.justEvaluated = false;
    }
    if (state.operator && !state.reset) {
      compute();
    } else {
      state.previous = state.current;
    }
    state.operator = op;
    state.reset = true;
  }

  function compute() {
    const a = parseFloat(state.previous);
    const b = parseFloat(state.current);
    if (!isFinite(a) || !isFinite(b) || !state.operator) return;
    let r;
    switch (state.operator) {
      case "+": r = a + b; break;
      case "-": r = a - b; break;
      case "×": r = a * b; break;
      case "÷": r = b === 0 ? NaN : a / b; break;
      default: return;
    }
    if (!isFinite(r)) {
      state.current = "Error";
      state.previous = "";
      state.operator = null;
      state.reset = true;
      currentEl.classList.add("shake");
      setTimeout(() => currentEl.classList.remove("shake"), 300);
    } else {
      state.current = fmt(r);
      state.previous = state.current;
      state.operator = null;
      state.reset = true;
      state.justEvaluated = true;
    }
    updateDisplay();
  }

  function doEquals() {
    if (!state.operator) return;
    compute();
  }

  function clearAll() {
    state.current = "0";
    state.previous = "";
    state.operator = null;
    state.reset = false;
    state.justEvaluated = false;
  }

  function handleKey(el) {
    const num = el.dataset.num;
    const op = el.dataset.op;
    const action = el.dataset.action;
    if (num !== undefined) inputNumber(num);
    else if (op !== undefined) chooseOp(op);
    else if (action === "dot") inputDot();
    else if (action === "sign") toggleSign();
    else if (action === "percent") inputPercent();
    else if (action === "equals") doEquals();
    else if (action === "clear") clearAll();
    updateDisplay();
  }

  document.getElementById("pad").addEventListener("click", (e) => {
    const key = e.target.closest(".key");
    if (!key) return;
    handleKey(key);
  });

  document.addEventListener("keydown", (e) => {
    const k = e.key;
    if (k >= "0" && k <= "9") handleKey({ dataset: { num: k } });
    else if (k === ".") handleKey({ dataset: { action: "dot" } });
    else if (k === "+" || k === "-") handleKey({ dataset: { op: k === "+" ? "+" : "-" } });
    else if (k === "*") handleKey({ dataset: { op: "×" } });
    else if (k === "/") { e.preventDefault(); handleKey({ dataset: { op: "÷" } }); }
    else if (k === "Enter" || k === "=") { e.preventDefault(); handleKey({ dataset: { action: "equals" } }); }
    else if (k === "Escape" || k === "Delete" || k === "Backspace") handleKey({ dataset: { action: "clear" } });
    else if (k === "%") handleKey({ dataset: { action: "percent" } });
  });

  langBtn.addEventListener("click", () => setLang(lang === "en" ? "ar" : "en"));
  clearBtn.addEventListener("click", () => { clearAll(); updateDisplay(); });

  setLang(lang);
  updateDisplay();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();