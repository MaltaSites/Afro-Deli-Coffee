(function() {
  "use strict";

  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const modal = document.getElementById("reservation-modal");
  const openModalBtn = document.getElementById("open-reservation");
  const closeModalBtn = document.querySelector(".modal-close");
  const form = document.getElementById("reservation-form");
  const sendWhatsappBtn = document.getElementById("send-whatsapp");
  const sendEmailBtn = document.getElementById("send-email");

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    const isDark = body.getAttribute("data-theme") === "dark";
    body.setAttribute("data-theme", isDark ? "light" : "dark");
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
  });

  // Smooth scrolling for internal links
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Reservation modal
  function openModal() {
    modal.classList.add("show");
  }

  function closeModal() {
    modal.classList.remove("show");
  }

  openModalBtn.addEventListener("click", openModal);
  closeModalBtn.addEventListener("click", closeModal);

  // Close modal on click outside
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Pre‑fill WhatsApp and Email
  function buildReservationMessage(data) {
    const parts = [];
    parts.push("Reservation Request\n");
    parts.push("Full Name: " + (data.fullname || ""));
    parts.push("Date: " + (data.date || ""));
    parts.push("Time: " + (data.time || ""));
    parts.push("Guests: " + (data.guests || ""));
    if (data.notes && data.notes.trim()) {
      parts.push("Notes: " + data.notes);
    }
    return encodeURIComponent(parts.join("\n"));
  }

  sendWhatsappBtn.addEventListener("click", () => {
    const formData = new FormData(form);
    const data = {};
    for (let [key, val] of formData.entries()) {
      data[key] = val;
    }

    const phone = "+35677772988";
    const message = buildReservationMessage(data);
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, "_blank", "noopener,noreferrer");
  });

  sendEmailBtn.addEventListener("click", () => {
    const formData = new FormData(form);
    const data = {};
    for (let [key, val] of formData.entries()) {
      data[key] = val;
    }

    const to = "afrodeliandcoffee@gmail.com";
    const subject = encodeURIComponent("Reservation Request");
    const body = buildReservationMessage(data);
    const url = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = url;
  });
})();