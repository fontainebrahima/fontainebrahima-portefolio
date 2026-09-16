// Animations d'apparition au scroll (GSAP + ScrollTrigger)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
      gsap.registerPlugin(ScrollTrigger);

      // Titres de section : fondu + léger glissement, ease "premium"
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 34 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      });

      // Groupes de cartes (compétences, projets, blog, timeline) : cascade avec léger effet d'échelle
      gsap.utils.toArray('.reveal-group').forEach((group) => {
        const items = group.querySelectorAll(':scope > *');
        gsap.fromTo(items,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: group, start: 'top 85%', toggleActions: 'play none none reverse' }
          }
        );
      });

      // Barres de niveau des compétences : remplissage progressif au scroll
      gsap.utils.toArray('#competences .skill-bar-fill').forEach((bar) => {
        gsap.to(bar, {
          width: bar.dataset.level + '%',
          duration: 1.3,
          ease: 'power2.out',
          scrollTrigger: { trigger: bar, start: 'top 92%', toggleActions: 'play none none reverse' }
        });
      });

      // Le terminal flottant du hero : légère entrée en profondeur au chargement
      gsap.fromTo('#hero-terminal',
        { opacity: 0, y: 24, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.3,
          onComplete: () => {
            gsap.to('#hero-terminal', {
              y: '+=14', duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1
            });
          }
        }
      );

      gsap.fromTo('#hero-terminal-2',
        { opacity: 0, y: -20, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', delay: 0.55,
          onComplete: () => {
            gsap.to('#hero-terminal-2', {
              y: '-=12', duration: 3.1, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.15
            });
          }
        }
      );
    } else {
      // Pas de GSAP dispo, ou préférence "réduire les animations" : on affiche tout directement
      document.querySelectorAll('.reveal, .reveal-group > *').forEach((el) => { el.style.opacity = 1; });
      document.querySelectorAll('#competences .skill-bar-fill').forEach((bar) => { bar.style.width = bar.dataset.level + '%'; });
    }

    // Popup de résumé au clic sur une compétence
    const skillsData = {
      php: {
        name: 'PHP', category: 'Backend', level: 90, icon: 'ri-php-line',
        desc: "Langage serveur sur lequel repose toute ma stack backend. Je l'utilise au quotidien pour la logique métier, le traitement des données et la construction d'API robustes."
      },
      laravel: {
        name: 'Laravel', category: 'Backend', level: 92, icon: 'ri-code-box-line',
        desc: "Mon framework PHP principal : routing, Eloquent ORM, queues, notifications, Observers... C'est la base de tous mes projets récents, dont RestauCI."
      },
      livewire: {
        name: 'Livewire', category: 'Backend', level: 85, icon: 'ri-flashlight-line',
        desc: "Permet de construire des interfaces réactives directement en Blade, sans écrire d'API séparée. Idéal pour les back-offices et les formulaires dynamiques."
      },
      tailwind: {
        name: 'Tailwind CSS', category: 'Frontend', level: 88, icon: 'ri-tailwind-css-line',
        desc: "Framework CSS utility-first que j'utilise pour construire des interfaces sur mesure rapidement, sans sortir du HTML/Blade — c'est ce qui a servi à construire ce portfolio."
      },
      javascript: {
        name: 'JavaScript', category: 'Frontend', level: 78, icon: 'ri-javascript-line',
        desc: "Le langage du navigateur : interactions, animations, appels API. Je l'utilise en complément de Livewire pour les comportements plus fins côté client."
      },
      bootstrap: {
        name: 'Bootstrap', category: 'Frontend', level: 82, icon: 'ri-bootstrap-line',
        desc: "Framework CSS basé sur des composants prêts à l'emploi. Pratique pour prototyper vite ou reprendre des projets existants qui l'utilisent déjà."
      },
      react: {
        name: 'React', category: 'Frontend', level: 72, icon: 'ri-reactjs-line',
        desc: "Bibliothèque JS pour construire des interfaces basées sur des composants. Je l'utilise quand un projet a besoin d'une interface plus riche qu'un rendu Blade classique."
      },
      git: {
        name: 'Git', category: 'Outils', level: 85, icon: 'ri-git-branch-line',
        desc: "Système de contrôle de version que j'utilise sur chaque projet : branches, commits conventionnels, résolution de conflits — le socle de mon flux de travail."
      },
      github: {
        name: 'GitHub', category: 'Outils', level: 85, icon: 'ri-github-line',
        desc: "Hébergement de mes dépôts, Pull Requests, et déploiement. C'est aussi là que je documente et partage mes projets, dont RestauCI."
      },
      gitlab: {
        name: 'GitLab', category: 'Outils', level: 85, icon: 'ri-gitlab-line',
        desc: "Plateforme de gestion de code, de collaboration et d'automatisation CI/CD."
      }
    };

    const skillModal = document.getElementById('skill-modal');
    const skillModalPanel = document.getElementById('skill-modal-panel');

    function openSkillModal(key) {
      const data = skillsData[key];
      if (!data) return;

      document.getElementById('skill-modal-title').textContent = data.name;
      document.getElementById('skill-modal-category').textContent = data.category;
      document.getElementById('skill-modal-level').textContent = data.level + '%';
      document.getElementById('skill-modal-desc').textContent = data.desc;
      document.getElementById('skill-modal-icon').innerHTML = '<i class="' + data.icon + '"></i>';
      document.getElementById('skill-modal-bar').style.width = data.level + '%';
      document.getElementById('skill-modal-file').textContent = key + '.md';

      skillModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeSkillModal() {
      skillModal.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.skill-row').forEach((btn) => {
      btn.addEventListener('click', () => openSkillModal(btn.dataset.skill));
    });

    document.getElementById('skill-modal-close').addEventListener('click', closeSkillModal);
    document.getElementById('skill-modal-backdrop').addEventListener('click', closeSkillModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && skillModal.classList.contains('is-open')) closeSkillModal();
    });
