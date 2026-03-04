import { PROTOCOL_ZONE_MAP, ZONE_DATA } from "@features/scanner/model/zones.config.js";
import { buildWhatsAppLink } from "@features/messenger/lib/wa-link-builder.js";
import { createTypingEngine } from "@features/scanner/lib/typing-engine.js";
import { emitAnalyticsEvent } from "@shared/analytics/emit-event.js";
import { getMatchMedia, getRuntimeEnv, now } from "@shared/lib/runtime-env.js";
import { getI18n, resolveLocale } from "@shared/i18n/index.js";

const { win, doc, nav, hist, loc } = getRuntimeEnv();
const i18n = getI18n(resolveLocale());
const scannerCopy = i18n && i18n.scanner ? i18n.scanner : {};
const raf = (cb) =>
  win && typeof win.requestAnimationFrame === "function"
    ? win.requestAnimationFrame(cb)
    : setTimeout(() => cb(now()), 16);
const caf = (id) => {
  if (win && typeof win.cancelAnimationFrame === "function") {
    win.cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
};

const DEFAULT_ZONE_DATA = ZONE_DATA;
const DEFAULT_PROTOCOL_MAP = PROTOCOL_ZONE_MAP;

const DEFAULT_CTA_MESSAGE =
  scannerCopy.defaultCtaMessage || "Здравствуйте! Хочу записаться на массаж.";
const DEFAULT_CTA_LABEL =
  scannerCopy.ctaPrimaryLabel || scannerCopy.ctaLabel || "Открыть чат";

const getPhoneDigits = (value) => String(value || "").replace(/\D/g, "");
const normalizeZoneId = (value) => String(value || "").trim().toLowerCase();
const DEFAULT_HASH_PREFIX = "zone-";
const getMetrikaId = () => {
  const raw = doc && doc.body && doc.body.dataset ? doc.body.dataset.metrika : "";
  const id = Number(raw || 0);
  return Number.isFinite(id) ? id : 0;
};
const emitScannerEvent = (name, detail = {}) =>
  emitAnalyticsEvent(name, detail, getMetrikaId(), {
    legacyChannel: "scanner-event",
  });
const getTriggerSource = (trigger) => {
  if (!trigger || !(trigger instanceof Element)) return "unknown";
  if (trigger.classList.contains("active-point")) return "point";
  if (trigger.hasAttribute("data-zone-shortcut")) return "shortcut";
  if (trigger.hasAttribute("data-point")) return "point";
  return "trigger";
};
const buildImageSet = (src) => {
  const match = src.match(/\.(jpe?g|png)$/i);
  if (!match) return `url("${src}")`;
  const ext = match[0];
  const base = src.slice(0, -ext.length);
  const fallbackType = ext.toLowerCase() === ".png" ? "image/png" : "image/jpeg";
  return `image-set(url("${base}.avif") type("image/avif"), url("${base}.webp") type("image/webp"), url("${src}") type("${fallbackType}"))`;
};
const readData = (node, key) => {
  if (!node) return "";
  if (node.dataset && node.dataset[key]) return node.dataset[key];
  const dashed = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  if (typeof node.getAttribute === "function") return node.getAttribute(`data-${dashed}`) || "";
  return "";
};
const getZoneFromTrigger = (node) => readData(node, "point") || readData(node, "zoneShortcut");

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
    options.root ||
    (doc ? doc.getElementById("scanner") || doc.getElementById("scanner-section") : null);
  if (!root) return null;

  const zoneData = options.zoneData || DEFAULT_ZONE_DATA;
  const protocolMap = options.protocolZoneMap || DEFAULT_PROTOCOL_MAP;
  const reducedEffects =
    typeof options.reducedEffects === "boolean"
      ? options.reducedEffects
      : getMatchMedia("(prefers-reduced-motion: reduce)").matches;
  const hashPrefix = typeof options.hashPrefix === "string" ? options.hashPrefix : DEFAULT_HASH_PREFIX;
  const syncHash = options.syncHash !== false;
  const phoneDigits =
    options.phoneDigits ||
    getPhoneDigits((doc && doc.body && doc.body.dataset && doc.body.dataset.phone) || "79260899019");
  const whatsappLoadingText =
    options.whatsappLoadingText ||
    scannerCopy.ctaLoading ||
    (i18n && i18n.global && i18n.global.whatsappLoadingText) ||
    "Переход в чат...";

  const elements = resolveElements(root);
  if (!elements) return null;

  const state = {
    isOpen: false,
    activeZone: null,
    lastTrigger: null,
    currentMsg: "",
    hashSnapshot: "",
    ctaPending: false,
    funnel: {
      startedAt: 0,
      openedZones: 0,
      switchedZones: 0,
      source: "",
      ctaClicked: false,
    },
  };
  let ctaLaunchTimeout = 0;
  let ctaResetTimeout = 0;
  let stateResetTimeout = 0;

  const setScannerState = (nextState = "", ttl = 0) => {
    if (!elements.container) return;
    if (stateResetTimeout) {
      clearTimeout(stateResetTimeout);
      stateResetTimeout = 0;
    }
    if (!nextState) {
      delete elements.container.dataset.scannerState;
      return;
    }
    elements.container.dataset.scannerState = nextState;
    if (ttl > 0) {
      stateResetTimeout = setTimeout(() => {
        if (elements.container.dataset.scannerState === nextState) {
          delete elements.container.dataset.scannerState;
        }
      }, ttl);
    }
  };

  const clearCtaTimers = () => {
    if (ctaLaunchTimeout) {
      clearTimeout(ctaLaunchTimeout);
      ctaLaunchTimeout = 0;
    }
    if (ctaResetTimeout) {
      clearTimeout(ctaResetTimeout);
      ctaResetTimeout = 0;
    }
  };

  const getCtaBaseLabel = () =>
    (elements.cta && elements.cta.dataset ? elements.cta.dataset.baseLabel || "" : "") || DEFAULT_CTA_LABEL;

  const setCtaPending = (value) => {
    if (!elements.cta) return;
    state.ctaPending = Boolean(value);
    elements.cta.disabled = state.ctaPending;
    elements.cta.setAttribute("aria-busy", state.ctaPending ? "true" : "false");
    if (elements.cta.dataset) elements.cta.dataset.pending = state.ctaPending ? "true" : "false";
  };

  const applyCtaBaseLabel = () => {
    if (!elements.cta) return;
    const nextLabel = getCtaBaseLabel();
    if (elements.cta.dataset) elements.cta.dataset.baseLabel = nextLabel;
    if (!state.ctaPending) {
      elements.cta.innerText = nextLabel;
      elements.cta.setAttribute("aria-label", nextLabel);
    }
  };

  const resetFunnel = () => {
    state.funnel.startedAt = 0;
    state.funnel.openedZones = 0;
    state.funnel.switchedZones = 0;
    state.funnel.source = "";
    state.funnel.ctaClicked = false;
  };

  const ensureFunnelStarted = (zone, source) => {
    if (state.funnel.startedAt) return;
    state.funnel.startedAt = now();
    state.funnel.openedZones = 1;
    state.funnel.source = source || "unknown";
    emitScannerEvent("scanner_funnel_start", {
      zone,
      source: source || "unknown",
    });
  };

  const trackZoneSwitch = (fromZone, toZone, source) => {
    if (!fromZone || !toZone || fromZone === toZone) return;
    if (!state.funnel.startedAt) ensureFunnelStarted(toZone, source);
    state.funnel.openedZones += 1;
    state.funnel.switchedZones += 1;
    emitScannerEvent("scanner_zone_switch", {
      from: fromZone,
      to: toZone,
      source: source || "unknown",
    });
  };

  const trackFunnelAbandon = (zone, reason) => {
    if (!state.funnel.startedAt || state.funnel.ctaClicked) {
      resetFunnel();
      return;
    }
    const durationMs = Math.max(0, now() - state.funnel.startedAt);
    emitScannerEvent("scanner_funnel_abandon", {
      zone: zone || "",
      reason: reason || "dismiss",
      duration_ms: durationMs,
      opened_zones: state.funnel.openedZones,
      switched_zones: state.funnel.switchedZones,
      source: state.funnel.source || "unknown",
    });
    resetFunnel();
  };

  const trackFunnelComplete = (zone, protocol, clickDelayMs) => {
    if (!state.funnel.startedAt) return;
    const durationMs = Math.max(0, now() - state.funnel.startedAt);
    emitScannerEvent("scanner_cta_open", {
      zone: zone || "",
      protocol: protocol || "",
      open_delay_ms: Math.max(0, Number(clickDelayMs) || 0),
    });
    emitScannerEvent("scanner_funnel_complete", {
      zone: zone || "",
      protocol: protocol || "",
      duration_ms: durationMs,
      opened_zones: state.funnel.openedZones,
      switched_zones: state.funnel.switchedZones,
      source: state.funnel.source || "unknown",
    });
    resetFunnel();
  };

  let documentHandlersActive = false;
  const focusWithGuard = (node) => {
    if (!node || typeof node.focus !== "function") return;
    const scrollX = win ? win.scrollX || win.pageXOffset || 0 : 0;
    const scrollY = win ? win.scrollY || win.pageYOffset || 0 : 0;
    try {
      node.focus({ preventScroll: true });
    } catch {
      node.focus();
    }
    raf(() => {
      if (!win) return;
      const deltaX = Math.abs((win.scrollX || 0) - scrollX);
      const deltaY = Math.abs((win.scrollY || 0) - scrollY);
      if (deltaX > 1 || deltaY > 1) win.scrollTo(scrollX, scrollY);
    });
    setTimeout(() => {
      if (!win) return;
      const deltaX = Math.abs((win.scrollX || 0) - scrollX);
      const deltaY = Math.abs((win.scrollY || 0) - scrollY);
      if (deltaX > 1 || deltaY > 1) win.scrollTo(scrollX, scrollY);
    }, 120);
  };

  const getZoneFromHash = (hashValue) => {
    if (!hashValue || !hashValue.startsWith("#")) return "";
    const raw = hashValue.slice(1);
    if (!raw.startsWith(hashPrefix)) return "";
    const zoneId = normalizeZoneId(raw.slice(hashPrefix.length));
    return zoneData[zoneId] ? zoneId : "";
  };

  const getHashSnapshot = () => {
    const currentHash = loc && loc.hash ? loc.hash : "";
    return currentHash.startsWith(`#${hashPrefix}`) ? "" : currentHash;
  };

  const setHash = (hashValue) => {
    if (!syncHash) return;
    if (!loc) return;
    const base = `${loc.pathname}${loc.search}`;
    const nextHash = hashValue || "";
    const nextUrl = nextHash ? `${base}${nextHash}` : base;
    if (loc.href.endsWith(nextHash) && nextHash) return;
    if (hist && typeof hist.replaceState === "function") {
      hist.replaceState(null, "", nextUrl);
    }
  };

  const setActiveState = (zone) => {
    elements.points.forEach((point) => {
      const isActive = readData(point, "point") === zone;
      point.classList.toggle("selected", isActive);
      point.setAttribute("aria-pressed", String(isActive));
    });
    elements.shortcuts.forEach((shortcut) => {
      const isActive = readData(shortcut, "zoneShortcut") === zone;
      shortcut.classList.toggle("is-active", isActive);
      shortcut.setAttribute("aria-pressed", String(isActive));
    });
    elements.container.dataset.activeZone = zone || "";
  };

  const typingEngine = createTypingEngine({
    target: elements.desc,
    raf,
    caf,
    now,
    reducedEffects,
  });

  const getTypingDuration = (text) => {
    if (reducedEffects) return 0;
    const length = String(text || "").length;
    if (!length) return 0;
    return Math.min(2600, Math.max(700, length * 18));
  };

  const syncPopupState = (open) => {
    elements.popup.dataset.open = open ? "true" : "false";
    elements.popup.classList.toggle("open", open);
    elements.popup.setAttribute("aria-hidden", open ? "false" : "true");
  };

  const resolveOpenContext = (zoneId, options = {}) => {
    const normalizedZone = normalizeZoneId(zoneId);
    const data = zoneData[normalizedZone];
    if (!data) return null;

    return {
      normalizedZone,
      data,
      trigger: options.trigger || null,
      focusClose: Boolean(options.focus),
      skipHash: Boolean(options.skipHash),
      source: options.source || getTriggerSource(options.trigger),
      previousZone: state.isOpen ? state.activeZone : "",
    };
  };

  const applyZoneImage = (data) => {
    if (data.image) {
      elements.popup.style.setProperty("--zone-image-fallback", `url("${data.image}")`);
      elements.popup.style.setProperty("--zone-image", buildImageSet(data.image));
    } else {
      elements.popup.style.removeProperty("--zone-image-fallback");
      elements.popup.style.removeProperty("--zone-image");
    }
  };

  const applyZoneOpenState = (context) => {
    ensureFunnelStarted(context.normalizedZone, context.source);
    if (context.previousZone && context.previousZone !== context.normalizedZone) {
      trackZoneSwitch(context.previousZone, context.normalizedZone, context.source);
    }

    if (nav && nav.vibrate) nav.vibrate(10);
    state.isOpen = true;
    state.activeZone = context.normalizedZone;
    state.lastTrigger = context.trigger || (doc ? doc.activeElement : null);
    state.currentMsg = context.data.msg || "";
    if (!context.skipHash) {
      state.hashSnapshot = getHashSnapshot();
      setHash(`#${hashPrefix}${context.normalizedZone}`);
    }
  };

  const applyZoneContent = (context) => {
    elements.popup.dataset.active = context.normalizedZone;
    elements.title.innerText = context.data.title;
    elements.med.innerText = context.data.med;
    typingEngine.start(context.data.desc);
    const typingDuration = getTypingDuration(context.data.desc);
    if (typingDuration) {
      setScannerState("typing", typingDuration);
    }
    applyZoneImage(context.data);
  };

  const finalizeZoneOpen = (context) => {
    syncPopupState(true);
    setActiveState(context.normalizedZone);
    applyCtaBaseLabel();
    enableDocumentHandlers();

    if (context.focusClose && elements.close) {
      raf(() => {
        focusWithGuard(elements.close);
      });
    }
  };

  const syncProtocolChip = (context) => {
    const protocolValue = protocolMap[context.normalizedZone];
    if (!protocolValue) return "";
    const chip = doc
      ? doc.querySelector(
        `[data-protocol-group="zone"] .protocol-chip[data-value="${protocolValue}"]`
      )
      : null;
    if (chip) {
      // Keep popup open: trigger chip handler without bubbling to document click listener.
      chip.dispatchEvent(new MouseEvent("click", { bubbles: false, cancelable: true }));
    }
    return protocolValue;
  };

  const emitZoneOpenEvent = (context, protocolValue) => {
    emitScannerEvent("scanner_zone_open", {
      zone: context.normalizedZone,
      source: context.source,
      protocol: protocolValue || "",
    });
  };

  const openZone = (zoneId, options = {}) => {
    const context = resolveOpenContext(zoneId, options);
    if (!context) return false;

    applyZoneOpenState(context);
    applyZoneContent(context);
    finalizeZoneOpen(context);
    const protocolValue = syncProtocolChip(context);
    emitZoneOpenEvent(context, protocolValue);
    return true;
  };

  const closeZone = (options = {}) => {
    typingEngine.stop();
    if (!state.isOpen) return;
    const closingZone = state.activeZone;
    state.isOpen = false;
    state.activeZone = null;
    state.currentMsg = "";
    const skipHash = Boolean(options.skipHash);

    elements.popup.dataset.active = "";
    elements.popup.style.removeProperty("--zone-image-fallback");
    elements.popup.style.removeProperty("--zone-image");
    syncPopupState(false);
    setScannerState("");
    clearCtaTimers();
    setCtaPending(false);
    applyCtaBaseLabel();
    setActiveState("");
    disableDocumentHandlers();

    if (state.lastTrigger) {
      focusWithGuard(state.lastTrigger);
    }
    state.lastTrigger = null;
    if (!skipHash) {
      setHash(state.hashSnapshot);
      state.hashSnapshot = "";
    }
    trackFunnelAbandon(closingZone, options.reason || "dismiss");
    emitScannerEvent("scanner_zone_close", {
      zone: closingZone || "",
      source: options.reason || "dismiss",
    });
  };

  const toggleZone = (zoneId, trigger, focusClose = false) => {
    const normalizedZone = normalizeZoneId(zoneId);
    if (state.isOpen && state.activeZone === normalizedZone) {
      closeZone({ reason: "toggle" });
      return false;
    }
    return openZone(normalizedZone, { trigger, focus: focusClose, source: getTriggerSource(trigger) });
  };

  const onTriggerClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const trigger = event.currentTarget;
    if (!(trigger instanceof Element)) return;
    const zoneId = getZoneFromTrigger(trigger);
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
    const zoneId = getZoneFromTrigger(trigger);
    if (!zoneId) return;
    toggleZone(zoneId, trigger, true);
  };

  const onDocumentClick = (event) => {
    if (!state.isOpen) return;
    const target = event.target;
    if (elements.popup.contains(target)) return;
    const trigger = target.closest(".active-point,[data-zone-shortcut]");
    if (trigger && root.contains(trigger)) return;
    closeZone({ reason: "outside" });
  };

  const handleEscapeKey = (event) => {
    if (event.key !== "Escape") return false;
    event.preventDefault();
    closeZone({ reason: "escape" });
    return true;
  };

  const getFocusTrapTargets = () => {
    const activeElement = doc ? doc.activeElement : null;
    if (!elements.popup.contains(activeElement)) return null;
    const focusable = getFocusable(elements.popup);
    if (!focusable.length) return null;
    return {
      active: activeElement,
      first: focusable[0],
      last: focusable[focusable.length - 1],
    };
  };

  const trapPopupFocus = (event) => {
    if (event.key !== "Tab") return;
    const targets = getFocusTrapTargets();
    if (!targets) return;
    if (event.shiftKey && targets.active === targets.first) {
      event.preventDefault();
      targets.last.focus();
    } else if (!event.shiftKey && targets.active === targets.last) {
      event.preventDefault();
      targets.first.focus();
    }
  };

  const onDocumentKeydown = (event) => {
    if (!state.isOpen) return;
    if (handleEscapeKey(event)) return;
    trapPopupFocus(event);
  };

  const enableDocumentHandlers = () => {
    if (documentHandlersActive) return;
    doc.addEventListener("click", onDocumentClick);
    doc.addEventListener("keydown", onDocumentKeydown);
    documentHandlersActive = true;
  };

  const disableDocumentHandlers = () => {
    if (!documentHandlersActive) return;
    doc.removeEventListener("click", onDocumentClick);
    doc.removeEventListener("keydown", onDocumentKeydown);
    documentHandlersActive = false;
  };

  const getActiveProtocolLabel = () => {
    const protocolChip = doc
      ? doc.querySelector('[data-protocol-group="zone"] .protocol-chip.is-active')
      : null;
    return (protocolChip && (protocolChip.dataset.label || protocolChip.textContent) ? (protocolChip.dataset.label || protocolChip.textContent) : "").trim();
  };

  const resolveZoneLabel = (zone) =>
    zone.title || zone.med || state.activeZone || scannerCopy.zoneFallbackLabel || "Зона";

  const buildScannerMessage = (zone, zoneLabel, protocolLabel) => {
    const baseMsg = state.currentMsg || zone.msg || DEFAULT_CTA_MESSAGE;
    const zonePrefix = scannerCopy.zoneLabelPrefix || "Зона";
    const protocolPrefix = scannerCopy.protocolLabelPrefix || "Протокол";
    const lines = [baseMsg, `${zonePrefix}: ${zoneLabel}.`];
    if (protocolLabel) lines.push(`${protocolPrefix}: ${protocolLabel}.`);
    lines.push(scannerCopy.intentLine || "Интент: подбор сеанса по зоне.");
    lines.push("", scannerCopy.sourceLine || "Источник: Scanner: Zone CTA");
    lines.push(scannerCopy.utmLine || "utm_source=site&utm_medium=whatsapp&utm_campaign=scanner-zone");
    return lines.join("\n");
  };

  const emitCtaPending = (zone, stage) => {
    emitScannerEvent("scanner_cta_pending", {
      zone: zone || "",
      stage,
    });
  };

  const onCtaClick = () => {
    if (!elements.cta) return;
    if (!state.isOpen || !state.activeZone) {
      setScannerState("error", 1200);
      return;
    }
    if (state.ctaPending) {
      setScannerState("error", 900);
      return;
    }
    clearCtaTimers();
    setCtaPending(true);
    if (nav && nav.vibrate) nav.vibrate(18);
    const originalText = getCtaBaseLabel();
    elements.cta.innerText = whatsappLoadingText;
    const activeZone = state.activeZone || "";
    const data = zoneData[activeZone] || {};
    const protocolLabel = getActiveProtocolLabel();
    const zoneLabel = resolveZoneLabel(data);
    const message = buildScannerMessage(data, zoneLabel, protocolLabel);

    emitScannerEvent("scanner_cta_click", {
      zone: activeZone,
      protocol: protocolLabel,
    });
    emitCtaPending(activeZone, "start");
    state.funnel.ctaClicked = true;
    const ctaClickTs = now();

    ctaLaunchTimeout = setTimeout(() => {
      const url = buildWhatsAppLink(phoneDigits, message);
      let opened = false;
      if (win && typeof win.open === "function") {
        const handle = win.open(url, "_blank", "noopener,noreferrer");
        opened = Boolean(handle);
      }
      if (opened) {
        setScannerState("success", 1400);
      } else {
        setScannerState("error", 1400);
      }
      trackFunnelComplete(activeZone, protocolLabel, now() - ctaClickTs);
      ctaResetTimeout = setTimeout(() => {
        setCtaPending(false);
        elements.cta.innerText = originalText;
        elements.cta.setAttribute("aria-label", originalText);
        emitCtaPending(activeZone, "reset");
      }, 900);
    }, 420);
  };

  const onCloseClick = (event) => {
    event.preventDefault();
    closeZone({ reason: "close_button" });
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
  applyCtaBaseLabel();

  if (elements.close) elements.close.addEventListener("click", onCloseClick);
  if (elements.cta) elements.cta.addEventListener("click", onCtaClick);

  const onHashChange = () => {
    if (!syncHash) return;
    const zoneFromHash = getZoneFromHash(loc ? loc.hash : "");
    if (zoneFromHash) {
      if (state.activeZone !== zoneFromHash) {
        openZone(zoneFromHash, { trigger: null, focus: false, skipHash: true, source: "hash" });
      }
      return;
    }
    if (state.isOpen) closeZone({ skipHash: true, reason: "hash" });
  };

  if (syncHash) {
    if (win) win.addEventListener("hashchange", onHashChange);
    const initialZone = getZoneFromHash(loc ? loc.hash : "");
    if (initialZone) {
      openZone(initialZone, { trigger: null, focus: false, skipHash: true, source: "hash" });
    }
  }

  const destroy = () => {
    clearCtaTimers();
    setCtaPending(false);
    resetFunnel();
    disableDocumentHandlers();
    elements.points.forEach((point) => {
      point.removeEventListener("click", onTriggerClick);
      point.removeEventListener("keydown", onTriggerKeydown);
    });
    elements.shortcuts.forEach((button) => {
      button.removeEventListener("click", onTriggerClick);
      button.removeEventListener("keydown", onTriggerKeydown);
    });
    if (elements.close) elements.close.removeEventListener("click", onCloseClick);
    if (elements.cta) elements.cta.removeEventListener("click", onCtaClick);
    if (syncHash && win) win.removeEventListener("hashchange", onHashChange);
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

