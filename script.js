// ============================================
// GHD INFRA - Main JavaScript File
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  // GSAP CONFIGURATION
  // ============================================
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ============================================
  // MOBILE MENU TOGGLE FUNCTIONALITY
  // ============================================
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = mobileMenuToggle.querySelector("i");

  // Toggle mobile menu on button click
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");

    // Toggle icon between bars and times (X)
    if (mobileMenu.classList.contains("hidden")) {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    } else {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times");
    }
  });

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars");
    });
  });

  // ============================================
  // NAVBAR SCROLL EFFECT (GSAP)
  // ============================================
  const navbar = document.querySelector("nav");

  // Add scroll effect to navbar
  ScrollTrigger.create({
    start: "top -50",
    end: 99999,
    toggleClass: { className: "scrolled", targets: navbar },
    onEnter: () => {
      gsap.to(navbar, {
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
      });
    },
    onLeaveBack: () => {
      gsap.to(navbar, {
        backgroundColor: "rgba(255, 255, 255, 1)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
      });
    },
  });

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");

      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Use GSAP for smooth scroll
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetElement,
              offsetY: 80, // Account for navbar height
            },
            ease: "power3.inOut",
          });
        }
      }
    });
  });

  // ============================================
  // SWIPER.JS INITIALIZATION - PROJECTS SLIDER
  // ============================================
  const projectsSwiper = new Swiper(".projectsSwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    breakpoints: {
      // Mobile (>= 640px)
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      // Tablet (>= 768px)
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // Laptop/Desktop (>= 1024px)
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    // Autoplay configuration
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });

  // ============================================
  // FAQ CARDS FUNCTIONALITY
  // ============================================
  const faqButtons = document.querySelectorAll(".faq-button");

  faqButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.closest(".faq-item");
      const faqContent = faqItem.querySelector(".faq-content");
      const faqIcon = button.querySelector(".faq-icon i");
      const isOpen = !faqContent.classList.contains("hidden");

      // Close all other FAQ items
      faqButtons.forEach((otherButton) => {
        const otherFaqItem = otherButton.closest(".faq-item");
        const otherFaqContent = otherFaqItem.querySelector(".faq-content");
        const otherFaqIcon = otherButton.querySelector(".faq-icon i");

        if (otherFaqItem !== faqItem) {
          otherFaqContent.classList.add("hidden");
          otherFaqIcon.classList.remove("fa-minus");
          otherFaqIcon.classList.add("fa-plus");
        }
      });

      // Toggle current FAQ item
      if (isOpen) {
        // Close
        faqContent.classList.add("hidden");
        faqIcon.classList.remove("fa-minus");
        faqIcon.classList.add("fa-plus");
      } else {
        // Open
        faqContent.classList.remove("hidden");
        faqIcon.classList.remove("fa-plus");
        faqIcon.classList.add("fa-minus");
      }
    });
  });

  // ============================================
  // CONSOLE LOG - REMOVE IN PRODUCTION
  // ============================================
  console.log("🚀 GHD Infra - Website Loaded Successfully!");
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle window resize with debounce
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
  }, 250);
});

