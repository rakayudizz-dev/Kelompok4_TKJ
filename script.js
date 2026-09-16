/* ==========================================
   CYBERTHREAT WEBSITE
   INTERACTION SCRIPT
========================================== */


/* ================= PAGE NAVIGATION ================= */

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");


function showPage(pageName) {

  pages.forEach(page => {
    page.classList.remove("active");
  });

  const target = document.getElementById(pageName);

  if (target) {
    target.classList.add("active");
  }

  navButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageName
    );
  });

  navMenu.classList.remove("show");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  history.replaceState(null, "", "#" + pageName);
}


/* NAV BUTTON */

navButtons.forEach(button => {

  button.addEventListener("click", () => {

    const pageName = button.dataset.page;

    showPage(pageName);

  });

});


/* INTERNAL BUTTON */

document.querySelectorAll("[data-go]").forEach(button => {

  button.addEventListener("click", () => {

    showPage(button.dataset.go);

  });

});


/* ================= MOBILE MENU ================= */

menuToggle.addEventListener("click", () => {

  navMenu.classList.toggle("show");

});


/* ================= ACCORDION ================= */

document.querySelectorAll(".read-btn").forEach(button => {

  button.dataset.original = button.textContent;

  button.addEventListener("click", () => {

    const card = button.closest(".threat-card");

    const isOpen = card.classList.toggle("open");

    if (isOpen) {
      button.textContent = "Tutup ↑";
    } else {
      button.textContent = button.dataset.original;
    }

  });

});


/* ================= SEARCH ================= */

const searchInput = document.getElementById("threatSearch");
const threatCards = document.querySelectorAll(".threat-card");
const noResult = document.getElementById("noResult");


searchInput.addEventListener("input", () => {

  const keyword = searchInput.value
    .toLowerCase()
    .trim();

  let found = 0;

  threatCards.forEach(card => {

    const searchableText = (
      card.dataset.name +
      " " +
      card.innerText
    ).toLowerCase();

    const matched = searchableText.includes(keyword);

    card.style.display = matched ? "" : "none";

    if (matched) {
      found++;
    }

  });

  noResult.style.display =
    found === 0 ? "block" : "none";

});


/* ================= BACK TO TOP ================= */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

  if (window.scrollY > 500) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }

});


topBtn.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});


/* ================= HASH NAVIGATION ================= */

function loadHash() {

  const hash = window.location.hash.replace("#", "");

  const validPages = [
    "home",
    "threats",
    "trends",
    "cases",
    "defense"
  ];

  if (validPages.includes(hash)) {
    showPage(hash);
  } else {
    showPage("home");
  }

}


window.addEventListener("load", loadHash);


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    showPage("home");

  }

});


/* ================= CARD ANIMATION ================= */

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });

  },
  {
    threshold: 0.08
  }
);


document
  .querySelectorAll(
    ".info-card, .threat-card, .stat-card, .case-card, .defense-card, .trend-item"
  )
  .forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(15px)";
    card.style.transition =
      "opacity .5s ease, transform .5s ease, border-color .3s";

    observer.observe(card);

  });