document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    let idx = 0;

    setInterval(() => {
        slides[idx].classList.remove("active");
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add("active");
    }, 3000); // change every 3 seconds
});

// Enhanced Cursor Effect
const cursor = document.querySelector(".cursor");

if (cursor) {
  let mouseX = 0;
  let mouseY = 0;

  // Track mouse position and check if over marquee, iam-wrapper, or navbar
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
    
    // Check if cursor is over marquee-container, iam-wrapper, or navbar
    try {
      const elementUnderCursor = document.elementFromPoint(mouseX, mouseY);
      if (elementUnderCursor && elementUnderCursor.closest && (elementUnderCursor.closest(".marquee-container") || elementUnderCursor.closest(".iam-wrapper") || elementUnderCursor.closest(".navbar"))) {
        cursor.classList.add("hidden");
      } else {
        // Remove hidden class and restart animation
        if (cursor.classList.contains("hidden")) {
          cursor.classList.remove("hidden");
          // Restart animation by removing and re-adding the class
          cursor.style.animation = "none";
          setTimeout(() => {
            cursor.style.animation = "cursorGrow 2s ease-out forwards";
          }, 10);
        }
      }
    } catch (err) {
      // ignore errors
    }
    
    // Create trail effect
    createTrail(mouseX, mouseY);
  });

  // Create trail particles and ripple effect
  function createTrail(x, y) {
    // Don't create effects when pointer is over the navbar or iam-wrapper
    try {
      const topEl = document.elementFromPoint(x, y);
      if (topEl && topEl.closest && (topEl.closest('.navbar') || topEl.closest('.iam-wrapper'))) return;
    } catch (err) {
      // ignore and continue if elementFromPoint fails
    }

    if (Math.random() < 0.3) { // 30% chance to create trail
      const trail = document.createElement("div");
      trail.className = "cursor-trail";
      trail.style.left = x + "px";
      trail.style.top = y + "px";
      document.body.appendChild(trail);
      
      // Remove trail after animation
      setTimeout(() => trail.remove(), 500);
    }
    
    // Create ripple effect
    if (Math.random() < 0.15) { // 15% chance to create ripple
      const ripple = document.createElement("div");
      ripple.className = "cursor-ripple";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      document.body.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => ripple.remove(), 600);
    }
  }

  // Remove animation class after it completes (1.5s) to prevent further animation interference
  setTimeout(() => {
    cursor.classList.remove('cursorAnimating');
  }, 1600);

  // Hide cursor when leaving window
  document.addEventListener("mouseleave", () => {
    cursor.style.display = "none";
  });

  document.addEventListener("mouseenter", () => {
    cursor.style.display = "block";
  });
}

window.addEventListener("load", () => {
  document.querySelector(".navbar").classList.add("visible");
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".carousel-slide");
    let idx = 0;

    // Carousel rotation
    setInterval(() => {
        slides[idx].classList.remove("active");
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add("active");
    }, 3000);

    // Navbar hide on scroll
    let lastScroll = 0;
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScroll && currentScroll > 50) {
            // Scrolling down -> hide navbar
            navbar.style.transform = "translateY(-100%)";
            navbar.style.transition = "transform 0.3s ease-in-out";
        } else {
            // Scrolling up -> show navbar
            navbar.style.transform = "translateY(0)";
        }

        lastScroll = currentScroll <= 0 ? 0 : currentScroll; // for mobile bounce
    });
});
window.addEventListener("load", () => {
  document.querySelector(".iam-wrapper").classList.add("visible");
});

const marqueeContainer = document.querySelector(".marquee-container");

function handleMarqueeFade() {
  const triggerPoint = window.innerHeight * 0.8; // fade in when 80% visible
  const containerTop = marqueeContainer.getBoundingClientRect().top;

  if (containerTop < triggerPoint && containerTop > -marqueeContainer.offsetHeight) {
    marqueeContainer.classList.add("visible");
  } else {
    marqueeContainer.classList.remove("visible");
  }
}

// Run on scroll and page load
window.addEventListener("scroll", handleMarqueeFade);
window.addEventListener("load", handleMarqueeFade);

let lastScrollY = window.scrollY;
let speeds = {
  marquee1: 35,
  marquee2: 28,
  marquee3: 22,
  marquee4: 16
};

function updateMarqueeSpeed() {
  const scrollDelta = window.scrollY - lastScrollY;
  const scrollFactor = Math.min(Math.abs(scrollDelta) * 0.5, 50);

  for (let i = 1; i <= 4; i++) {
    const row = document.querySelector(`#marquee${i} .marquee-inner`);
    row.style.animationDuration = `${Math.max(5, speeds[`marquee${i}`] - scrollFactor)}s`;
  }

  lastScrollY = window.scrollY;
}

let scrollTimeout;
window.addEventListener('scroll', () => {
  updateMarqueeSpeed();
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    for (let i = 1; i <= 4; i++) {
      const row = document.querySelector(`#marquee${i} .marquee-inner`);
      row.style.animationDuration = `${speeds[`marquee${i}`]}s`;
    }
  }, 100);
});
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".tabs_let-content");
const videos = gsap.utils.toArray(".tabs_video");

let total = sections.length;

// Animate sections based on scroll progress
ScrollTrigger.create({
  trigger: ".tabs_height",
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    let progress = self.progress; 
    let index = Math.floor(progress * total);

    sections.forEach((sec, i) => {
      sec.classList.toggle("is-1", i === index);
    });

    videos.forEach((vid, i) => {
      vid.classList.toggle("is-1", i === index);
    });
  }
});
gsap.to(".a", {
  x: 400,
  rotation: 360,
  duration: 3
});