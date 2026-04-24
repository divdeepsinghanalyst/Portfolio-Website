const cursorDot = document.querySelector("#cursorDot");
const cursorRing = document.querySelector("#cursorRing");
let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

if (cursorDot && cursorRing && matchMedia("(pointer: fine)").matches) {
  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.classList.add("visible");
    cursorRing.classList.add("visible");
  });

  function moveCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(moveCursor);
  }

  moveCursor();

  document.querySelectorAll("a, button, .project-card, .project-feature, .skill-card, .cert-card").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursorDot.style.width = "18px";
      cursorDot.style.height = "18px";
      cursorRing.style.width = "50px";
      cursorRing.style.height = "50px";
    });

    element.addEventListener("mouseleave", () => {
      cursorDot.style.width = "10px";
      cursorDot.style.height = "10px";
      cursorRing.style.width = "34px";
      cursorRing.style.height = "34px";
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => entry.target.classList.add("on"), index * 70);
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.07 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("on"));
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 90) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const firstName = String(data.get("firstName") || "").trim();
    const lastName = String(data.get("lastName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "Portfolio inquiry").trim();
    const message = String(data.get("message") || "").trim();
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const mailSubject = encodeURIComponent(subject || `Portfolio inquiry from ${fullName}`);
    const mailBody = encodeURIComponent(`${message}\n\nFrom: ${fullName}\nEmail: ${email}`);

    formStatus.textContent = "Opening your email app with the message ready.";
    window.location.href = `mailto:divdeepsingh4@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  });
}
