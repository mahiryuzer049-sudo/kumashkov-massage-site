const DEFAULT_ZONE_DATA = {
  head: {
    title: "Перегрузка головы",
    med: "Ментальное напряжение",
    image: "/assets/images/scanner/zone-head.jpg",
    desc:
      "Если мысли не отпускают даже в тишине, телу нужен мягкий сброс нагрузки. Начнем с расслабления шейно-воротниковой зоны и мягкой стабилизации дыхания.",
    msg: "Здравствуйте! Беспокоит ментальная перегрузка и тяжесть в голове. Хочу подобрать сеанс.",
  },
  neck: {
    title: "Напряжение шеи",
    med: "Мышечный зажим",
    image: "/assets/images/scanner/zone-neck.jpg",
    desc:
      "Скованность в шее часто накапливается из-за статической нагрузки и стресса. Поможет аккуратная проработка шеи и плечевого пояса с комфортным давлением.",
    msg: "Здравствуйте! Беспокоит шея и верх спины. Хочу записаться на сеанс.",
  },
  shoulders: {
    title: "Плечевой щит",
    med: "Переутомление плечевого пояса",
    image: "/assets/images/scanner/zone-shoulders.jpg",
    desc:
      "Когда плечи постоянно «вверх», уходит свобода дыхания и появляется фоновая усталость. Сеанс вернет подвижность и снизит общую напряженность.",
    msg: "Здравствуйте! Чувствую сильный зажим в плечах. Хочу обсудить формат сеанса.",
  },
  back: {
    title: "Спина просит разгрузку",
    med: "Переутомление спины/поясницы",
    image: "/assets/images/scanner/zone-back.jpg",
    desc:
      "Зажим в спине и пояснице влияет на осанку, сон и энергию. В протокол включим мягкую глубинную проработку с акцентом на комфорт и восстановление.",
    msg: "Здравствуйте! Беспокоит спина и поясница, хочу подобрать индивидуальный сеанс.",
  },
  legs: {
    title: "Тяжесть в ногах",
    med: "Усталость и застой",
    image: "/assets/images/scanner/zone-legs.jpg",
    desc:
      "Если к вечеру появляется ощущение тяжести, хорошо работает дренажный и восстанавливающий формат. Помогу вернуть легкость движению.",
    msg: "Здравствуйте! Есть тяжесть в ногах, хочу записаться на восстанавливающий сеанс.",
  },
};

const DEFAULT_PROTOCOL_MAP = {
  head: "head-neck",
  neck: "head-neck",
  shoulders: "back-shoulders",
  back: "back-shoulders",
  legs: "legs",
};

const getPhoneDigits = (value) => String(value || "").replace(/\D/g, "");

const getFocusable = (root) =>
  Array.from(root.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(
    (node) => !node.hasAttribute("disabled")
  );

const resolveElements = (root) => {
  const popup = root.querySelector("#zone-popup");
  const title = root.querySelector("#zone-title");
  const med = root.querySelector("#zone-med");
  const desc = root.querySelector("#zone-desc");
  const cta = root.querySelector("#zone-cta");
  const close = root.querySelector("#zone-close");
  const container = root.querySelector("#scanner-container");
  const points = Array.from(root.querySelectorAll(".active-point"));
  const shortcuts = Array.from(root.querySelectorAll("[data-zone-shortcut]"));

  if (!popup || !title || !med || !desc || !container) return null;

  return { popup, title, med, desc, cta, close, container, points, shortcuts };
};

export const initScannerV4 = (options = {}) => {
  const root =
    options.root || document.getElementById("scanner") || document.getElementById("scanner-section");
  if (!root) return null;
  const zoneData = options.zoneData || DEFAULT_ZONE_DATA;
  const protocolMap = options.protocolZoneMap || DEFAULT_PROTOCOL_MAP;
  const reducedEffects =
    typeof options.reducedEffects === "boolean"
      ? options.reducedEffects
      : window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const phoneDigits =
    options.phoneDigits ||
    getPhoneDigits(document.body.dataset.phone || "79260899019");
  const whatsappLoadingText = options.whatsappLoadingText || "Переход в чат...";

  const elements = resolveElements(root);
  if (!elements) return null;

  const state = {
    isOpen: false,
    activeZone: null,
    lastTrigger: null,
    typeTimer: null,
    currentMsg: "",
  };

  let documentHandlersActive = false;

  const setActiveState = (zone) => {
    elements.points.forEach((point) => {
      const isActive = point.dataset.point === zone;
      point.classList.toggle("selected", isActive);
      point.setAttribute("aria-pressed", String(isActive));
    });
    elements.shortcuts.forEach((shortcut) => {
      const isActive = shortcut.dataset.zoneShortcut === zone;
      shortcut.classList.toggle("is-active", isActive);
      shortcut.setAttribute("aria-pressed", String(isActive));
    });
    elements.container.dataset.activeZone = zone || "";
  };

  const typeText = (text) => {
    clearTimeout(state.typeTimer);
    elements.desc.innerText = "";
    if (reducedEffects) {
      elements.desc.innerText = text;
      return;
    }
    let idx = 0;
    const step = () => {
      elements.desc.innerText += text.charAt(idx);
      idx += 1;
      if (idx < text.length) {
        state.typeTimer = setTimeout(step, 14);
      }
    };
    step();
  };

  const syncPopupState = (open) => {
    elements.popup.dataset.open = open ? "true" : "false";
    elements.popup.classList.toggle("open", open);
    elements.popup.setAttribute("aria-hidden", open ? "false" : "true");
  };

  const openZone = (zoneId, options = {}) => {
    const data = zoneData[zoneId];
    if (!data) return false;
    const trigger = options.trigger || null;
    const focusClose = Boolean(options.focus);

    if (navigator.vibrate) navigator.vibrate(10);
    state.isOpen = true;
    state.activeZone = zoneId;
    state.lastTrigger = trigger || document.activeElement;
    state.currentMsg = data.msg || "";

    elements.popup.dataset.active = zoneId;
    elements.title.innerText = data.title;
    elements.med.innerText = data.med;
    typeText(data.desc);
    if (data.image) {
      elements.popup.style.setProperty("--zone-image", `url("${data.image}")`);
    } else {
      elements.popup.style.removeProperty("--zone-image");
    }

    syncPopupState(true);
    setActiveState(zoneId);
    enableDocumentHandlers();

    if (focusClose && elements.close && typeof elements.close.focus === "function") {
      requestAnimationFrame(() => {
        try {
          elements.close.focus({ preventScroll: true });
        } catch {
          elements.close.focus();
        }
      });
    }

    const protocolValue = protocolMap[zoneId];
    if (protocolValue) {
      const chip = document.querySelector(
        `[data-protocol-group="zone"] .protocol-chip[data-value="${protocolValue}"]`
      );
      if (chip) chip.click();
    }

    return true;
  };

  const closeZone = () => {
    if (!state.isOpen) return;
    clearTimeout(state.typeTimer);
    state.isOpen = false;
    state.activeZone = null;
    state.currentMsg = "";

    elements.popup.dataset.active = "";
    elements.popup.style.removeProperty("--zone-image");
    syncPopupState(false);
    setActiveState("");
    disableDocumentHandlers();

    if (state.lastTrigger && typeof state.lastTrigger.focus === "function") {
      try {
        state.lastTrigger.focus({ preventScroll: true });
      } catch {
        state.lastTrigger.focus();
      }
    }
    state.lastTrigger = null;
  };

  const toggleZone = (zoneId, trigger, focusClose = false) => {
    if (state.isOpen && state.activeZone === zoneId) {
      closeZone();
      return false;
    }
    return openZone(zoneId, { trigger, focus: focusClose });
  };

  const onTriggerClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const trigger = event.currentTarget;
    if (!(trigger instanceof Element)) return;
    const zoneId = trigger.dataset.point || trigger.dataset.zoneShortcut;
    if (!zoneId) return;
    toggleZone(zoneId, trigger, false);
  };

  const onTriggerKeydown = (event) => {
    const isActivator = event.key === "Enter" || event.key === " ";
    if (!isActivator) return;
    event.preventDefault();
    event.stopPropagation();
    const trigger = event.currentTarget;
    if (!(trigger instanceof Element)) return;
    const zoneId = trigger.dataset.point || trigger.dataset.zoneShortcut;
    if (!zoneId) return;
    toggleZone(zoneId, trigger, true);
  };

  const onDocumentClick = (event) => {
    if (!state.isOpen) return;
    const target = event.target;
    if (elements.popup.contains(target)) return;
    const trigger = target.closest(".active-point,[data-zone-shortcut]");
    if (trigger && root.contains(trigger)) return;
    closeZone();
  };

  const onDocumentKeydown = (event) => {
    if (!state.isOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeZone();
      return;
    }
    if (event.key !== "Tab") return;
    if (!elements.popup.contains(document.activeElement)) return;
    const focusable = getFocusable(elements.popup);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const enableDocumentHandlers = () => {
    if (documentHandlersActive) return;
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);
    documentHandlersActive = true;
  };

  const disableDocumentHandlers = () => {
    if (!documentHandlersActive) return;
    document.removeEventListener("click", onDocumentClick);
    document.removeEventListener("keydown", onDocumentKeydown);
    documentHandlersActive = false;
  };

  const onCtaClick = () => {
    if (!elements.cta) return;
    if (navigator.vibrate) navigator.vibrate(18);
    const originalText = elements.cta.innerText;
    elements.cta.innerText = whatsappLoadingText;
    const msg =
      state.currentMsg || zoneData[state.activeZone]?.msg || "Здравствуйте! Хочу записаться на массаж.";
    const text = encodeURIComponent(msg);
    setTimeout(() => {
      window.location.href = `https://wa.me/${phoneDigits}?text=${text}`;
      setTimeout(() => {
        elements.cta.innerText = originalText;
      }, 900);
    }, 550);
  };

  elements.points.forEach((point) => {
    point.setAttribute("aria-pressed", "false");
    point.setAttribute("aria-controls", "zone-popup");
    point.addEventListener("click", onTriggerClick);
    point.addEventListener("keydown", onTriggerKeydown);
  });
  elements.shortcuts.forEach((button) => {
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-controls", "zone-popup");
    button.addEventListener("click", onTriggerClick);
    button.addEventListener("keydown", onTriggerKeydown);
  });

  elements.popup.dataset.active = "";
  syncPopupState(false);

  if (elements.close) elements.close.addEventListener("click", closeZone);
  if (elements.cta) elements.cta.addEventListener("click", onCtaClick);

  const destroy = () => {
    disableDocumentHandlers();
    elements.points.forEach((point) => {
      point.removeEventListener("click", onTriggerClick);
      point.removeEventListener("keydown", onTriggerKeydown);
    });
    elements.shortcuts.forEach((button) => {
      button.removeEventListener("click", onTriggerClick);
      button.removeEventListener("keydown", onTriggerKeydown);
    });
    if (elements.close) elements.close.removeEventListener("click", closeZone);
    if (elements.cta) elements.cta.removeEventListener("click", onCtaClick);
  };

  const debug = () => ({
    popup: Boolean(elements.popup),
    title: Boolean(elements.title),
    med: Boolean(elements.med),
    desc: Boolean(elements.desc),
    cta: Boolean(elements.cta),
    points: elements.points.length,
    shortcuts: elements.shortcuts.length,
    popupOpen: Boolean(elements.popup.classList.contains("open")),
    active: elements.popup.dataset.active || "",
  });

  return {
    openZone,
    closeZone,
    destroy,
    debug,
  };
};
