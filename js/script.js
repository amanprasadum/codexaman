
    (function () {
      var els = document.querySelectorAll("[data-ws-count]");
      if (!els.length || !("IntersectionObserver" in window)) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      function run(el) {
        var target = parseInt(el.getAttribute("data-target"), 10) || 0;
        var duration = 1600, start = null;
        function step(t) {
          if (start === null) start = t;
          var p = Math.min((t - start) / duration, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        }
        el.textContent = "0";
        requestAnimationFrame(step);
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
      }, { threshold: 0.6 });
      els.forEach(function (el) { io.observe(el); });
    })();
  


    // ===== SCROLL FADE IN =====
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {if (e.isIntersecting) e.target.classList.add('visible');});
    }, {threshold: 0.08});
    document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

    // ===== NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, {passive: true});

    // ===== MOBILE MENU =====
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.style.display === 'block';
      mobileMenu.style.display = isOpen ? 'none' : 'block';
    });
    function closeMobileMenu() {mobileMenu.style.display = 'none';}

    // ===== TYPEWRITER (fixed width so layout never shifts) =====
    (function () {
      const phrases = [
        'your business.', 'startups in Kolkata.', 'global clients.',
        'web platforms.', 'e-commerce stores.', 'MERN stack apps.',
        'Flutter apps.', 'WordPress sites.', 'landing pages.',
      ];
      const el = document.getElementById('typewriter');
      if (!el) return;
      const typewriterLine = el.closest('.typewriter-line');
      function lockTypewriterWidth() {
        const temp = document.createElement('span');
        temp.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-size:inherit;font-weight:inherit;font-family:inherit;';
        document.body.appendChild(temp);
        let maxW = 0;
        phrases.forEach(p => {temp.textContent = 'for ' + p; maxW = Math.max(maxW, temp.offsetWidth);});
        document.body.removeChild(temp);
        typewriterLine.style.minWidth = maxW + 'px';
        typewriterLine.style.display = 'inline-block';
      }
      lockTypewriterWidth();
      window.addEventListener('resize', lockTypewriterWidth);
      let pi = 0, ci = 0, deleting = false;
      function type() {
        const phrase = phrases[pi];
        if (!deleting) {
          el.textContent = phrase.slice(0, ++ci);
          if (ci === phrase.length) {deleting = true; return setTimeout(type, 1800);}
        } else {
          el.textContent = phrase.slice(0, --ci);
          if (ci === 0) {deleting = false; pi = (pi + 1) % phrases.length; return setTimeout(type, 300);}
        }
        setTimeout(type, deleting ? 40 : 65);
      }
      setTimeout(type, 1200);
    })();

    // ===== TECH SHOWCASE TABS =====
    (function () {
      const list = document.getElementById('techTabList');
      if (!list) return;
      const img = document.getElementById('techFeatureImg');
      const title = document.getElementById('techFeatureTitle');
      const desc = document.getElementById('techFeatureDesc');
      const data = {
        wordpress: {
          title: 'WordPress & WooCommerce',
          desc: "Our team builds content-managed sites on WordPress with Elementor, and full online stores with WooCommerce — Razorpay, Stripe and PayPal ready. Your team can update pages, prices and products without touching code.",
          img: 'images/wordpress.png'
        },
        react: {
          title: 'React & React Native',
          desc: "For dashboards, SaaS products and dynamic web apps our developers reach for React — and React Native when the same product needs to live on Android and iOS from one codebase.",
          img: 'images/react.png'
        },
        laravel: {
          title: 'Laravel & PHP',
          desc: "Laravel powers the backends our team builds for CRMs, ERPs and custom admin panels — clean REST APIs, solid authentication, and a codebase your next developer can actually read.",
          img: 'images/laravel.png'
        },
        flutter: {
          title: 'Flutter Apps',
          desc: "One Flutter codebase, shipped natively to Android and iOS. Ideal for startups who need to launch on both app stores fast without doubling the development cost.",
          img: 'images/flutter.png'
        },
        mern: {
          title: 'MERN Stack',
          desc: "MongoDB, Express, React and Node — our go-to stack for full-stack SaaS platforms that need real-time data, authentication and a dashboard, built end to end in JavaScript.",
          img: 'images/mern.png'
        },
        firebase: {
          title: 'Firebase & Supabase',
          desc: "For apps that need real-time sync, authentication and storage without managing your own servers, our team wires up Firebase or Supabase — fast to build, easy to scale.",
          img: 'images/firebase.png'
        },
        shopify: {
          title: 'Shopify Stores',
          desc: "For product-based businesses our team sets up Shopify storefronts with custom themes, product catalogues and payment gateways — ready to sell from day one.",
          img: 'images/shopify.png'
        },
        htmlcss: {
          title: 'HTML, CSS & Bootstrap',
          desc: "For simple business sites and landing pages that need to load fast and stay easy to edit, our team hand-codes clean HTML, CSS and Bootstrap — no unnecessary frameworks, just a fast, reliable website.",
          img: 'images/html.png'
        }
      };
      function setActive(tab) {
        list.querySelectorAll('.tech-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const d = data[tab.dataset.tech];
        if (!d) return;
        title.textContent = d.title;
        desc.textContent = d.desc;
        img.src = d.img;
        img.alt = d.title;
      }
      list.querySelectorAll('.tech-tab').forEach(tab => {
        tab.addEventListener('mouseenter', () => setActive(tab));
        tab.addEventListener('click', () => setActive(tab));
      });
    })();

    // ===== HERO ENQUIRY FORM (Web3Forms) =====
    const heroForm = document.getElementById('heroForm');
    if (heroForm) {
      const heroBtn = heroForm.querySelector('button[type="submit"]');
      heroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(heroForm);
        formData.append("access_key", "cf185d87-1b86-4377-88d6-6ff2e0fce031");
        const originalText = heroBtn.textContent;
        heroBtn.textContent = "Sending...";
        heroBtn.disabled = true;
        try {
          const response = await fetch("https://api.web3forms.com/submit", {method: "POST", body: formData});
          const data = await response.json();
          if (response.ok) {
            alert("Thanks! Your enquiry has been sent — our team will reply within 24 hours.");
            heroForm.reset();
          } else {
            alert("Error: " + data.message);
          }
        } catch (error) {
          alert("Something went wrong. Please try again.");
        } finally {
          heroBtn.textContent = originalText;
          heroBtn.disabled = false;
        }
      });
    }

    // ===== QUICK QUOTE MODAL FORM (Web3Forms) =====
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
      const quoteBtn = quoteForm.querySelector('button[type="submit"]');
      quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(quoteForm);
        formData.append("access_key", "cf185d87-1b86-4377-88d6-6ff2e0fce031");
        formData.append("subject", "New Quick Quote Request — codexaman.in");
        const originalText = quoteBtn.textContent;
        quoteBtn.textContent = "Sending...";
        quoteBtn.disabled = true;
        try {
          const response = await fetch("https://api.web3forms.com/submit", {method: "POST", body: formData});
          const data = await response.json();
          if (response.ok) {
            alert("Thanks! Your quote request has been sent — our team will reply within 24 hours.");
            quoteForm.reset();
            const quoteModalEl = document.getElementById('quoteModal');
            const quoteModalInstance = bootstrap.Modal.getInstance(quoteModalEl);
            if (quoteModalInstance) quoteModalInstance.hide();
          } else {
            alert("Error: " + data.message);
          }
        } catch (error) {
          alert("Something went wrong. Please try again.");
        } finally {
          quoteBtn.textContent = originalText;
          quoteBtn.disabled = false;
        }
      });
    }
  