const body = document.body;
const sitePhone = (body.dataset.phone || "79260899019").replace(/\D/g, "");
const whatsappLoadingText = "Переход в чат...";

const prefersReducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const prefersReduced = prefersReducedQuery.matches;
const saveData = Boolean(navigator.connection && navigator.connection.saveData);
const lowDeviceMemory = Number.isFinite(navigator.deviceMemory) && navigator.deviceMemory <= 4;
const lowCpuCores = Number.isFinite(navigator.hardwareConcurrency) && navigator.hardwareConcurrency <= 4;
const lowPowerEffects = lowDeviceMemory || lowCpuCores;
const reducedEffects = prefersReduced || saveData;
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

if (reducedEffects) body.classList.add("reduced-effects");
if (lowPowerEffects) body.classList.add("low-power-effects");

const menuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

const closeMobileMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", "false");
  mobileMenu.classList.add("hidden");
  mobileMenu.setAttribute("aria-hidden", "true");
  body.classList.remove("menu-open");
};

const openMobileMenu = () => {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", "true");
  mobileMenu.classList.remove("hidden");
  mobileMenu.setAttribute("aria-hidden", "false");
  body.classList.add("menu-open");
};

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", (event) => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    if (!isOpen) return;
    const isInsideMenu = event.target.closest("#mobile-menu");
    const isToggle = event.target.closest("#mobile-menu-toggle");
    if (!isInsideMenu && !isToggle) closeMobileMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });
}

window.addEventListener("load", () => {
  const loaderLine = document.getElementById("loader-progress");
  if (loaderLine) loaderLine.style.width = "100%";
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
    }, 650);
  }
  initLivingStatus();
  initProtocolBuilder();
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorCircle = document.querySelector(".cursor-circle");
const spotlight = document.getElementById("spotlight");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let circleX = mouseX;
let circleY = mouseY;
let cursorAnimating = false;
let lastMoveTime = 0;

const animateCursor = () => {
  if (!cursorAnimating) return;
  const speed = 0.16;
  circleX += (mouseX - circleX) * speed;
  circleY += (mouseY - circleY) * speed;
  if (cursorCircle) {
    cursorCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0) translate(-50%, -50%)`;
  }
  if (Date.now() - lastMoveTime > 1200) {
    cursorAnimating = false;
    return;
  }
  requestAnimationFrame(animateCursor);
};

if (!reducedEffects && hasFinePointer && cursorDot && cursorCircle && spotlight) {
  spotlight.style.setProperty("--x", `${mouseX}px`);
  spotlight.style.setProperty("--y", `${mouseY}px`);
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    lastMoveTime = Date.now();
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    spotlight.style.setProperty("--x", `${mouseX}px`);
    spotlight.style.setProperty("--y", `${mouseY}px`);
    if (!cursorAnimating) {
      cursorAnimating = true;
      requestAnimationFrame(animateCursor);
    }
  });
}

document.querySelectorAll(".interactive-el").forEach((el) => {
  el.addEventListener("mouseenter", () => body.classList.add("hovering"));
  el.addEventListener("mouseleave", () => body.classList.remove("hovering"));
});

const revealElements = Array.from(document.querySelectorAll(".reveal-on-scroll"));
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
      });
    },
    { threshold: lowPowerEffects ? 0.06 : 0.12 }
  );
  revealElements.forEach((el, index) => {
    if (el.dataset.revealDelay && !lowPowerEffects) {
      el.style.transitionDelay = el.dataset.revealDelay;
    } else if (!lowPowerEffects) {
      const staggerSlot = index % 4;
      el.style.transitionDelay = `${staggerSlot * 60}ms`;
    }
    observer.observe(el);
  });
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

const scanLine = document.getElementById("scan-line");
const scannerSection = document.getElementById("scanner") || document.getElementById("scanner-section");
if (scanLine && scannerSection && "IntersectionObserver" in window) {
  const scanObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !reducedEffects) {
          scanLine.classList.add("animate-scan");
        } else {
          scanLine.classList.remove("animate-scan");
        }
      });
    },
    { threshold: 0.22 }
  );
  scanObserver.observe(scannerSection);
} else if (scanLine && !reducedEffects) {
  scanLine.classList.add("animate-scan");
}

document.querySelectorAll(".btn-vibrate").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (navigator.vibrate) navigator.vibrate(15);
  });
});

document.addEventListener("click", (event) => {
  if (reducedEffects) return;
  const target = event.target.closest(".ripple-container");
  if (!target) return;
  const circle = document.createElement("span");
  const diameter = Math.max(target.clientWidth, target.clientHeight);
  const radius = diameter / 2;
  const rect = target.getBoundingClientRect();
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.classList.add("ripple");
  const existingRipple = target.querySelector(".ripple");
  if (existingRipple) existingRipple.remove();
  target.appendChild(circle);
});

document.addEventListener("click", (event) => {
  const target = event.target.closest(".whatsapp-link");
  if (!target) return;
  event.preventDefault();
  const originalText = target.innerText;
  const originalWidth = target.offsetWidth;
  target.style.width = `${originalWidth}px`;
  target.style.justifyContent = "center";
  target.style.textAlign = "center";
  target.innerText = whatsappLoadingText;
  target.classList.add("animate-pulse");
  setTimeout(() => {
    window.location.href = target.href;
    setTimeout(() => {
      target.innerText = originalText;
      target.style.width = "";
      target.style.justifyContent = "";
      target.style.textAlign = "";
      target.classList.remove("animate-pulse");
    }, 900);
  }, 550);
});

const zoneData = {
  head: {
    title: "Перегрузка головы",
    med: "Ментальное напряжение",
    desc: "Если мысли не отпускают даже в тишине, телу нужен мягкий сброс нагрузки. Начнем с расслабления шейно-воротниковой зоны и мягкой стабилизации дыхания.",
    msg: "Здравствуйте! Беспокоит ментальная перегрузка и тяжесть в голове. Хочу подобрать сеанс."
  },
  neck: {
    title: "Напряжение шеи",
    med: "Мышечный зажим",
    desc: "Скованность в шее часто накапливается из-за статической нагрузки и стресса. Поможет аккуратная проработка шеи и плечевого пояса с комфортным давлением.",
    msg: "Здравствуйте! Беспокоит шея и верх спины. Хочу записаться на сеанс."
  },
  shoulders: {
    title: "Плечевой щит",
    med: "Переутомление плечевого пояса",
    desc: "Когда плечи постоянно «вверх», уходит свобода дыхания и появляется фоновая усталость. Сеанс вернет подвижность и снизит общую напряженность.",
    msg: "Здравствуйте! Чувствую сильный зажим в плечах. Хочу обсудить формат сеанса."
  },
  back: {
    title: "Спина просит разгрузку",
    med: "Переутомление спины/поясницы",
    desc: "Зажим в спине и пояснице влияет на осанку, сон и энергию. В протокол включим мягкую глубинную проработку с акцентом на комфорт и восстановление.",
    msg: "Здравствуйте! Беспокоит спина и поясница, хочу подобрать индивидуальный сеанс."
  },
  legs: {
    title: "Тяжесть в ногах",
    med: "Усталость и застой",
    desc: "Если к вечеру появляется ощущение тяжести, хорошо работает дренажный и восстанавливающий формат. Помогу вернуть легкость движению.",
    msg: "Здравствуйте! Есть тяжесть в ногах, хочу записаться на восстанавливающий сеанс."
  }
};

const protocolZoneMap = {
  head: "head-neck",
  neck: "head-neck",
  shoulders: "back-shoulders",
  back: "back-shoulders",
  legs: "legs"
};

let currentZoneMsg = "";
let typeTimer;

const zonePopup = document.getElementById("zone-popup");
const scannerContainer = document.getElementById("scanner-container");
const zoneTitle = document.getElementById("zone-title");
const zoneMed = document.getElementById("zone-med");
const zoneDesc = document.getElementById("zone-desc");
const zoneCta = document.getElementById("zone-cta");
const zoneClose = document.getElementById("zone-close");

const typeText = (target, text) => {
  clearTimeout(typeTimer);
  target.innerText = "";
  if (reducedEffects) {
    target.innerText = text;
    return;
  }
  let charIndex = 0;
  const step = () => {
    target.innerText += text.charAt(charIndex);
    charIndex += 1;
    if (charIndex < text.length) {
      typeTimer = setTimeout(step, 14);
    }
  };
  step();
};

const activePoints = Array.from(document.querySelectorAll(".active-point"));
const zoneShortcuts = Array.from(document.querySelectorAll("[data-zone-shortcut]"));
let lastZoneTrigger = null;

const setActiveZoneState = (zone) => {
  activePoints.forEach((point) => {
    const isActive = point.dataset.point === zone;
    point.classList.toggle("selected", isActive);
    point.setAttribute("aria-pressed", String(isActive));
  });

  zoneShortcuts.forEach((shortcut) => {
    const isActive = shortcut.dataset.zoneShortcut === zone;
    shortcut.classList.toggle("is-active", isActive);
    shortcut.setAttribute("aria-pressed", String(isActive));
  });
};

const showZoneInfo = (zone, triggerElement) => {
  if (!zonePopup || !zoneTitle || !zoneMed || !zoneDesc || !zoneCta) return;
  const openedZone = zonePopup.dataset.active || "";
  if (zonePopup.classList.contains("open") && openedZone === zone) {
    hideZoneInfo();
    return;
  }
  const data = zoneData[zone];
  if (!data) return;
  if (navigator.vibrate) navigator.vibrate(10);
  setActiveZoneState(zone);
  lastZoneTrigger = triggerElement || document.activeElement;

  currentZoneMsg = data.msg;
  zoneTitle.innerText = data.title;
  zoneMed.innerText = data.med;
  typeText(zoneDesc, data.desc);

  zonePopup.dataset.active = zone;
  zonePopup.classList.add("open");
  zonePopup.setAttribute("aria-hidden", "false");
  if (scannerContainer) scannerContainer.dataset.activeZone = zone;
  requestAnimationFrame(() => {
    if (zoneClose) zoneClose.focus();
  });

  const protocolValue = protocolZoneMap[zone];
  if (protocolValue) {
    const chip = document.querySelector(`[data-protocol-group="zone"] .protocol-chip[data-value="${protocolValue}"]`);
    if (chip) chip.click();
  }
};

const hideZoneInfo = () => {
  if (!zonePopup) return;
  clearTimeout(typeTimer);
  zonePopup.classList.remove("open");
  zonePopup.dataset.active = "";
  zonePopup.setAttribute("aria-hidden", "true");
  if (scannerContainer) scannerContainer.dataset.activeZone = "";
  setActiveZoneState("");
  if (lastZoneTrigger && typeof lastZoneTrigger.focus === "function") {
    lastZoneTrigger.focus();
  }
  lastZoneTrigger = null;
};

const bookZone = () => {
  if (!zoneCta) return;
  if (navigator.vibrate) navigator.vibrate(18);
  const originalText = zoneCta.innerText;
  zoneCta.innerText = whatsappLoadingText;
  const text = encodeURIComponent(currentZoneMsg || "Здравствуйте! Хочу записаться на массаж.");
  setTimeout(() => {
    window.location.href = `https://wa.me/${sitePhone}?text=${text}`;
    setTimeout(() => {
      zoneCta.innerText = originalText;
    }, 900);
  }, 550);
};

activePoints.forEach((point) => {
  const zone = point.getAttribute("data-point");
  point.setAttribute("aria-pressed", "false");
  point.setAttribute("aria-controls", "zone-popup");
  point.addEventListener("click", () => showZoneInfo(zone, point));
  point.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showZoneInfo(zone, point);
    }
  });
});

zoneShortcuts.forEach((button) => {
  const zone = button.getAttribute("data-zone-shortcut");
  button.setAttribute("aria-pressed", "false");
  button.setAttribute("aria-controls", "zone-popup");
  button.addEventListener("click", () => {
    showZoneInfo(zone, button);
  });
});

if (zoneCta) zoneCta.addEventListener("click", bookZone);
if (zoneClose) zoneClose.addEventListener("click", hideZoneInfo);

document.addEventListener("click", (event) => {
  if (!zonePopup || !zonePopup.classList.contains("open")) return;
  const isPopup = event.target.closest("#zone-popup");
  const isPoint = event.target.closest(".active-point");
  const isShortcut = event.target.closest("[data-zone-shortcut]");
  if (!isPopup && !isPoint && !isShortcut) hideZoneInfo();
});

document.addEventListener("keydown", (event) => {
  if (!zonePopup || !zonePopup.classList.contains("open")) return;
  if (event.key === "Escape") {
    event.preventDefault();
    hideZoneInfo();
    return;
  }
  if (event.key !== "Tab") return;
  const focusable = Array.from(
    zonePopup.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')
  ).filter((node) => !node.hasAttribute("disabled"));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const current = document.activeElement;
  if (event.shiftKey && current === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && current === last) {
    event.preventDefault();
    first.focus();
  }
});

const ritualButtons = Array.from(document.querySelectorAll(".step-btn[data-step]"));
const ritualPanels = Array.from(document.querySelectorAll('[id^="ritual-step-"]'));
const ritualProgress = document.getElementById("ritual-progress");
const ritualPrev = document.getElementById("ritual-prev");
const ritualNext = document.getElementById("ritual-next");
let currentRitualStep = 1;

const updateRitualStep = (step, focusButton = false) => {
  if (!ritualButtons.length || !ritualPanels.length) return;
  const total = ritualButtons.length;
  const clampedStep = Math.min(Math.max(step, 1), total);
  currentRitualStep = clampedStep;

  ritualButtons.forEach((button) => {
    const buttonStep = Number(button.dataset.step);
    const isActive = buttonStep === clampedStep;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    if (isActive && focusButton) button.focus();
  });

  ritualPanels.forEach((panel) => {
    const panelStep = Number(panel.id.replace("ritual-step-", ""));
    const isActive = panelStep === clampedStep;
    panel.classList.toggle("is-active", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });

  if (ritualProgress) {
    ritualProgress.style.width = `${(clampedStep / total) * 100}%`;
  }
};

if (ritualButtons.length) {
  const activeButton = ritualButtons.find((button) => button.classList.contains("active"));
  const startStep = activeButton ? Number(activeButton.dataset.step) : 1;
  updateRitualStep(startStep);

  ritualButtons.forEach((button) => {
    const step = Number(button.dataset.step);
    button.addEventListener("click", () => updateRitualStep(step));
    button.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        updateRitualStep(currentRitualStep + 1, true);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        updateRitualStep(currentRitualStep - 1, true);
      }
    });
  });

  if (ritualPrev) {
    ritualPrev.addEventListener("click", () => updateRitualStep(currentRitualStep - 1));
  }
  if (ritualNext) {
    ritualNext.addEventListener("click", () => updateRitualStep(currentRitualStep + 1));
  }

  if (!reducedEffects) {
    const ritualSection = document.getElementById("ritual");
    let ritualAutoTimer;
    const startAuto = () => {
      if (ritualAutoTimer) return;
      ritualAutoTimer = setInterval(() => {
        const nextStep = currentRitualStep >= ritualButtons.length ? 1 : currentRitualStep + 1;
        updateRitualStep(nextStep);
      }, 5200);
    };
    const stopAuto = () => {
      clearInterval(ritualAutoTimer);
      ritualAutoTimer = null;
    };

    if (ritualSection && "IntersectionObserver" in window) {
      const ritualObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startAuto();
            } else {
              stopAuto();
            }
          });
        },
        { threshold: 0.4 }
      );
      ritualObserver.observe(ritualSection);
    }
  }
}

const protocolState = {};
let protocolInitialized = false;

function initProtocolBuilder() {
  if (protocolInitialized) return;
  const groups = Array.from(document.querySelectorAll("[data-protocol-group]"));
  const output = document.getElementById("protocol-output");
  const note = document.getElementById("protocol-note");
  const cta = document.getElementById("protocol-cta");
  if (!groups.length || !output || !note || !cta) return;

  const applyChipState = (groupName, chip) => {
    const group = chip.closest("[data-protocol-group]");
    if (!group) return;
    group.querySelectorAll(".protocol-chip").forEach((candidate) => {
      const isActive = candidate === chip;
      candidate.classList.toggle("is-active", isActive);
      candidate.setAttribute("aria-pressed", String(isActive));
    });
    protocolState[groupName] = {
      value: chip.dataset.value || "",
      label: chip.dataset.label || chip.innerText.trim()
    };
    renderProtocol();
  };

  const renderProtocol = () => {
    const goal = protocolState.goal?.label || "Восстановление";
    const zone = protocolState.zone?.label || "Спина и плечевой пояс";
    const tempo = protocolState.tempo?.label || "Мягкая интенсивность";
    const duration = protocolState.duration?.label || "60 минут";

    output.innerText = `${goal} · ${zone} · ${tempo} · ${duration}.`;
    note.innerText = "Перед стартом уточним самочувствие, цели и пожелания. После подтверждаем финальный протокол.";

    const message = encodeURIComponent(
      `Здравствуйте! Хочу записаться.\nМой запрос: ${goal}, ${zone}, интенсивность: ${tempo}, длительность: ${duration}.`
    );
    cta.href = `https://wa.me/${sitePhone}?text=${message}`;
  };

  groups.forEach((group) => {
    const groupName = group.dataset.protocolGroup;
    const chips = Array.from(group.querySelectorAll(".protocol-chip"));
    chips.forEach((chip) => {
      chip.setAttribute("aria-pressed", "false");
      chip.addEventListener("click", () => applyChipState(groupName, chip));
      chip.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          applyChipState(groupName, chip);
        }
      });
    });

    const initial = chips.find((chip) => chip.classList.contains("is-active")) || chips[0];
    if (initial) applyChipState(groupName, initial);
  });

  protocolInitialized = true;
}

function initLivingStatus() {
  const statusContainer = document.getElementById("status-container");
  const typingContainer = document.getElementById("typing-container");
  if (!statusContainer || !typingContainer) return;

  const showTyping = () => {
    statusContainer.style.opacity = "0";
    statusContainer.style.transform = "translateY(-10px)";
    setTimeout(() => {
      typingContainer.style.opacity = "1";
      typingContainer.style.transform = "translateY(-50%)";
    }, 200);
    setTimeout(showOnline, 2300 + Math.random() * 1200);
  };

  const showOnline = () => {
    typingContainer.style.opacity = "0";
    typingContainer.style.transform = "translateY(10px) translateY(-50%)";
    setTimeout(() => {
      statusContainer.style.opacity = "1";
      statusContainer.style.transform = "translateY(0)";
    }, 200);
  };

  setInterval(() => {
    if (Math.random() > 0.35) showTyping();
  }, 9500);
}

document.querySelectorAll("[data-analytics]").forEach((el) => {
  el.addEventListener("click", () => {
    // Intentionally silent by default.
  });
});
