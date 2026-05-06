const contactForm = document.getElementById("contactForm");
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Message sent! Thank you for reaching out.");
    contactForm.reset();
  });
}

const prevTestimonial = document.getElementById("prevTestimonial");
const nextTestimonial = document.getElementById("nextTestimonial");
const testimonialText = document.getElementById("testimonialText");
const testimonialName = document.getElementById("testimonialName");
const testimonialRole = document.getElementById("testimonialRole");
const testimonialAvatar = document.getElementById("testimonialAvatar");
const testimonialDots = document.querySelectorAll(".slider-dots span");

if (
  prevTestimonial &&
  nextTestimonial &&
  testimonialText &&
  testimonialName &&
  testimonialAvatar &&
  testimonialDots.length
) {
  const testimonials = [
    {
      text: "Saya merupakan siswa Informatika dengan fokus pada pengembangan Front-End, Back-End, dan Artificial Intelligence. Saya berkomitmen untuk membangun solusi digital yang tidak hanya menarik secara visual, tetapi juga optimal dari sisi performa dan fungsionalitas. Saya selalu tertantang untuk terus belajar, berinovasi, dan memberikan hasil terbaik dalam setiap proyek yang saya kerjakan.",
      name: "Fattah Rafif Syauqi",
      role: "Project Manager, Darulang",
      avatarImage: "assets/image/foto.jpg",
    },
    {
      text: "Saya pernah menjalani program magang di CV. OTW Computer Gusaha dengan fokus pada pengembangan Sistem Keuangan ODIGI berbasis Laravel. Selama magang, saya aktif dalam proses pengembangan fitur, debugging, peningkatan keamanan, serta optimalisasi sistem. Pengalaman ini tidak hanya memperkuat kemampuan teknis saya dalam pengembangan web, tetapi juga melatih saya untuk bekerja secara profesional dalam lingkungan proyek nyata.",
      name: "Fattah Rafif Syauqi",
      role: "Product Designer, Nexora",
      avatarImage: "assets/image/foto.jpg",
    },
    {
      text: "Saya terlibat dalam penelitian pengembangan sistem AI untuk diagnosis retinopati diabetik berbasis citra retina. Proyek ini menggunakan teknik deep learning untuk klasifikasi dan deteksi tingkat keparahan penyakit. Dari penelitian ini, saya mendapatkan pengalaman dalam data preprocessing, pengembangan model, serta evaluasi performa model pada kasus medis nyata.",
      name: "Fattah Rafif Syauqi",
      role: "Frontend Lead, Karya Digital",
      avatarImage: "assets/image/foto.jpg",
    },
  ];

  let currentIndex = 0;

  const renderTestimonial = () => {
    const current = testimonials[currentIndex];
    testimonialText.textContent = current.text;
    testimonialName.textContent = current.name;
    if (testimonialRole) {
      testimonialRole.textContent = current.role;
    }
    if (testimonialAvatar.tagName === "IMG") {
      testimonialAvatar.src = current.avatarImage;
      testimonialAvatar.alt = current.name;
    } else {
      testimonialAvatar.textContent = current.name.slice(0, 2).toUpperCase();
    }

    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  };

  prevTestimonial.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
  });

  nextTestimonial.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonial();
  });

  renderTestimonial();
}

const projectModal = document.getElementById("projectModal");
const closeProjectModal = document.getElementById("closeProjectModal");
const projectModalImage = document.getElementById("projectModalImage");
const projectModalTitle = document.getElementById("projectModalTitle");
const prevProjectImage = document.getElementById("prevProjectImage");
const nextProjectImage = document.getElementById("nextProjectImage");
const openProjectButtons = document.querySelectorAll(".open-project-modal");

if (
  projectModal &&
  closeProjectModal &&
  projectModalImage &&
  projectModalTitle &&
  prevProjectImage &&
  nextProjectImage &&
  openProjectButtons.length
) {
  const placeholderImage = (title) => {
    const label = encodeURIComponent(title);
    return (
      `data:image/svg+xml;utf8,` +
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 700'>` +
      `<defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>` +
      `<stop offset='0%' stop-color='%230b1229'/><stop offset='100%' stop-color='%231e3a8a'/></linearGradient></defs>` +
      `<rect width='1200' height='700' fill='url(%23g)'/>` +
      `<rect x='80' y='80' width='1040' height='540' rx='24' fill='none' stroke='%2394a3b8' stroke-opacity='0.35'/>` +
      `<text x='600' y='360' text-anchor='middle' fill='%23e2e8f0' font-size='54' font-family='Segoe UI, Arial'>${label}</text>` +
      `</svg>`
    );
  };

  let activeProjectTitle = "Project Preview";
  let activeGallery = [placeholderImage(activeProjectTitle)];
  let activeGalleryIndex = 0;

  const renderSlide = () => {
    projectModalTitle.textContent = activeProjectTitle;
    projectModalImage.src = activeGallery[activeGalleryIndex];
    projectModalImage.alt = `Preview ${activeProjectTitle}`;

    const hideNav = activeGallery.length <= 1;
    prevProjectImage.style.visibility = hideNav ? "hidden" : "visible";
    nextProjectImage.style.visibility = hideNav ? "hidden" : "visible";
  };

  const moveSlide = (step) => {
    if (activeGallery.length <= 1) {
      return;
    }
    activeGalleryIndex =
      (activeGalleryIndex + step + activeGallery.length) % activeGallery.length;
    renderSlide();
  };

  const openModal = (button) => {
    const title = button.dataset.projectTitle || "Project Preview";
    const rawImages = button.dataset.projectImages || "";
    const parsedImages = rawImages
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);

    activeProjectTitle = title;
    activeGallery = parsedImages.length
      ? parsedImages
      : [placeholderImage(title)];
    activeGalleryIndex = 0;
    renderSlide();
    projectModal.classList.add("open");
    projectModal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    projectModal.classList.remove("open");
    projectModal.setAttribute("aria-hidden", "true");
  };

  openProjectButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal(button);
    });
  });

  prevProjectImage.addEventListener("click", () => moveSlide(-1));
  nextProjectImage.addEventListener("click", () => moveSlide(1));
  closeProjectModal.addEventListener("click", closeModal);

  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!projectModal.classList.contains("open")) {
      return;
    }

    if (event.key === "Escape") {
      closeModal();
    }

    if (event.key === "ArrowLeft") {
      moveSlide(-1);
    }

    if (event.key === "ArrowRight") {
      moveSlide(1);
    }
  });
}
