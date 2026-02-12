const body = document.body;

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const saveData = navigator.connection && navigator.connection.saveData;
if (prefersReduced || saveData) {
  body.classList.add("reduced-effects");
}

const menuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.classList.toggle("hidden", isOpen);
    mobileMenu.setAttribute("aria-hidden", String(isOpen));
    body.classList.toggle("menu-open", !isOpen);
  });
}

const revealElements = document.querySelectorAll(".reveal-on-scroll");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

document.querySelectorAll(".ripple-container").forEach((button) => {
  button.addEventListener("click", (event) => {
    const circle = document.createElement("span");
    circle.classList.add("ripple");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${event.clientX - rect.left - size / 2}px`;
    circle.style.top = `${event.clientY - rect.top - size / 2}px`;
    button.appendChild(circle);
    circle.addEventListener("animationend", () => circle.remove());
  });
});

const cursorDot = document.querySelector(".cursor-dot");
const cursorCircle = document.querySelector(".cursor-circle");
if (cursorDot && cursorCircle && !body.classList.contains("reduced-effects")) {
  let idleTimeout;
  const setIdle = () => {
    cursorDot.style.opacity = "0";
    cursorCircle.style.opacity = "0";
  };
  const clearIdle = () => {
    cursorDot.style.opacity = "1";
    cursorCircle.style.opacity = "1";
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(setIdle, 1200);
  };
  document.addEventListener("mousemove", (event) => {
    clearIdle();
    cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    cursorCircle.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  });
}

const scannerTitle = document.getElementById("scanner-title");
const scannerDescription = document.getElementById("scanner-description");
const scannerCta = document.getElementById("scanner-cta");
const scannerData = {
  head: {
    title: "Шум в голове",
    description: "Церебральный спазм. Чувствуете, как мысли не дают покоя даже в тишине? Тяжесть в висках — это сигнал о перегрузке. Позвольте мне вернуть вам ясность.",
    cta: "Павел, чувствую сильное ментальное напряжение, нужна перезагрузка."
  },
  shoulders: {
    title: "Груз на плечах",
    description: "Гипертонус трапеции. Здесь скапливается всё, что вы несете на себе. Плечи стремятся к ушам, защищаясь от мира. Мы мягко опустим этот груз.",
    cta: "Павел, шея и плечи \"каменные\", хочу легкости."
  },
  chest: {
    title: "Эмоциональный щит",
    description: "Миофасциальный зажим. Когда мы сдерживаем эмоции, \"камень\" ложится именно сюда. Это ваша броня. Я помогу растопить этот лед.",
    cta: "Павел, чувствую зажимы в лопатках и плечах."
  },
  lowerback: {
    title: "Потеря опоры",
    description: "Люмбалгия / Спазм. Поясница — это ваш центр безопасности. Если здесь холодно или тянет — значит, телу не хватает чувства защищенности.",
    cta: "Павел, беспокоит поясница, не хватает ощущения опоры."
  },
  legs: {
    title: "Земное притяжение",
    description: "Лимфостаз / Отеки. Ощущение, что к ногам привязали гири. Усталость от статики мешает летать. Лимфодренаж вернет легкость.",
    cta: "Павел, тяжесть в ногах, нужен лимфодренаж."
  }
};

document.querySelectorAll(".active-point").forEach((point) => {
  const activate = () => {
    document.querySelectorAll(".active-point").forEach((el) => el.classList.remove("selected"));
    point.classList.add("selected");
    const key = point.getAttribute("data-point");
    const data = scannerData[key];
    if (data && scannerTitle && scannerDescription && scannerCta) {
      scannerTitle.textContent = data.title;
      scannerDescription.textContent = data.description;
      scannerCta.href = `https://wa.me/79260899019?text=${encodeURIComponent(data.cta)}`;
    }
  };
  point.addEventListener("click", activate);
  point.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activate();
    }
  });
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  preloader.style.opacity = "0";
  setTimeout(() => preloader.remove(), 600);
});
