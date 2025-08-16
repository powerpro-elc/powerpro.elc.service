document.querySelector("body > div.boxed_wrapper > div")
// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
       
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

document.getElementById("chat-button").addEventListener("click", function() {
  var popup = document.getElementById("chat-popup");
  if (popup.style.display === "block") {
    popup.style.display = "none";
  } else {
    popup.style.display = "block";
  }
});

/*<!-- The Popup Form -->*/

function openForm() {
  document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}
function openForm() {
      document.getElementById("popupForm").style.display = "block";
    }

    function closeForm() {
      document.getElementById("popupForm").style.display = "none";
    }

    window.onload = function () {
      setTimeout(function () {
        document.getElementById("popupForm").style.display = "block";
      }, 2000);
    };

    document.getElementById("quoteForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      fetch("YOUR_GOOGLE_SCRIPT_URL", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.text())
        .then((data) => {
          alert("Quote sent successfully!");
          closeForm();
          document.getElementById("quoteForm").reset();
        })
        .catch((err) => {
          alert("Error sending quote.");
          console.error(err);
        });
    });
  
// Auto show popup after 2 seconds
window.onload = function () {
  setTimeout(function () {
    document.getElementById("popupForm").style.display = "block";
  }, 2000);
};

// Close popup
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// Submit form to Google Sheets
document.getElementById("quoteForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch("YOUR_GOOGLE_SCRIPT_URL", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    alert("Quote sent successfully!");
    closeForm();
    document.getElementById("quoteForm").reset();
  })
  .catch(err => {
    alert("Error sending quote.");
    console.error(err);
  });
});

// Show popup automatically after 2 seconds
window.onload = function () {
  setTimeout(function () {
    document.getElementById("popupForm").style.display = "block";
  }, 2000); // 2 seconds delay
};

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// Form submission
document.getElementById("quoteForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);

  fetch("YOUR_GOOGLE_SCRIPT_URL", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(data => {
    alert("Quote sent successfully!");
    closeForm();
    document.getElementById("quoteForm").reset();
  })
  .catch(err => {
    alert("Error sending quote.");
    console.error(err);
  });
});
function closePopup() {
  const popup = document.getElementById("popupForm");
  popup.style.animation = "popupFadeOut 0.3s ease-in-out";
  setTimeout(() => popup.style.display = "none", 300);
}
