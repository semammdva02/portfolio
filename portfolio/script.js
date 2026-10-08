/* =========================================================
   SƏMA MƏMMƏDOVA — PORTFOLIO JS
========================================================= */

(function () {

  "use strict";


  /* ================= ELEMENTS ================= */

  const html = document.documentElement;

  const themeToggle =
    document.getElementById("themeToggle");

  const menuToggle =
    document.getElementById("menuToggle");

  const navLinks =
    document.getElementById("navLinks");

  const navItems =
    document.querySelectorAll(".nav-links a");

  const revealElements =
    document.querySelectorAll(".reveal");


  /* ================= THEME ================= */

  const savedTheme =
    localStorage.getItem("portfolio-theme");

  if (savedTheme) {

    html.setAttribute(
      "data-theme",
      savedTheme
    );

  }


  function updateThemeIcon() {

    if (!themeToggle) return;

    const currentTheme =
      html.getAttribute("data-theme");

    themeToggle.textContent =
      currentTheme === "dark"
        ? "☀"
        : "☾";

  }


  updateThemeIcon();


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      function () {

        const currentTheme =
          html.getAttribute("data-theme");

        const newTheme =
          currentTheme === "dark"
            ? "light"
            : "dark";

        html.setAttribute(
          "data-theme",
          newTheme
        );

        localStorage.setItem(
          "portfolio-theme",
          newTheme
        );

        updateThemeIcon();

      }
    );

  }


  /* ================= MOBILE MENU ================= */

  if (menuToggle && navLinks) {

    menuToggle.addEventListener(
      "click",
      function () {

        navLinks.classList.toggle("open");

      }
    );


    navItems.forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          navLinks.classList.remove(
            "open"
          );

        }
      );

    });

  }


  /* ================= REVEAL ANIMATION ================= */

  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        function (entries, observer) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                observer.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach(
      function (element) {

        observer.observe(element);

      }
    );

  } else {

    revealElements.forEach(
      function (element) {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* ================= ACTIVE NAV ================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                const id =
                  entry.target.getAttribute(
                    "id"
                  );


                navItems.forEach(
                  function (link) {

                    link.classList.remove(
                      "active"
                    );

                    if (
                      link.getAttribute(
                        "href"
                      ) === "#" + id
                    ) {

                      link.classList.add(
                        "active"
                      );

                    }

                  }
                );

              }

            }
          );

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach(
      function (section) {

        sectionObserver.observe(
          section
        );

      }
    );

  }


  /* ================= KEYBOARD ESC ================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape"
      ) {

        if (navLinks) {

          navLinks.classList.remove(
            "open"
          );

        }

      }

    }
  );


  /* ================= CLOSE MENU OUTSIDE ================= */

  document.addEventListener(
    "click",
    function (event) {

      if (
        !navLinks ||
        !menuToggle
      ) {
        return;
      }


      const clickedInsideMenu =
        navLinks.contains(
          event.target
        );

      const clickedToggle =
        menuToggle.contains(
          event.target
        );


      if (
        !clickedInsideMenu &&
        !clickedToggle
      ) {

        navLinks.classList.remove(
          "open"
        );

      }

    }
  );


})();