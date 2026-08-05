/* ==========================================================================
   OPALIS AI SUITE - APPLICATION CONTROLLER & STANDALONE PWA INSTALLER
   ========================================================================== */

// Initial Seed Data with all user-provided Gemini Gems & Opal links
const INITIAL_APPS = [
  {
    id: "gem-storybook",
    title: "Gemini Storybook Architect",
    url: "https://gemini.google.com/u/4/gem/storybook",
    platform: "gemini",
    category: "Creative Writing",
    icon: "📚",
    desc: "Master Storyteller & Interactive Narrative Gem. Craft immersive story outlines, character arches, fantasy worldbuilding, and children's storybooks with visual prompts.",
    tags: ["Storytelling", "Fiction", "Worldbuilding", "Children"],
    featured: true,
    promptPreset: "Write an engaging opening chapter for a futuristic sci-fi adventure story set in a bio-luminescent floating city."
  },
  {
    id: "gem-code-architect",
    title: "Pro Code Architect & AI Engineer",
    url: "https://gemini.google.com/gem/1XRKdXdJP9YYB21qmKeSYhQz-lmzQ3xBe?usp=sharing",
    platform: "gemini",
    category: "Coding & Tech",
    icon: "⚡",
    desc: "Senior Software Architect Gem specializing in full-stack clean code, system architecture, refactoring, performance optimization, and algorithm design.",
    tags: ["Coding", "Architecture", "Refactoring", "Clean Code"],
    featured: true,
    promptPreset: "Review this software architecture for scalability bottlenecks and propose a high-performance refactoring strategy."
  },
  {
    id: "gem-visual-designer",
    title: "Visual Designer & Brand Strategist",
    url: "https://gemini.google.com/gem/19veOobYMjIUUBLuo2VCVYA7Od37sITJ5?usp=sharing",
    platform: "gemini",
    category: "Design & UX",
    icon: "🎨",
    desc: "Expert Design Director Gem for crafting UI/UX color palettes, design systems, modern typography, brand identities, and high-converting visual concepts.",
    tags: ["UI/UX", "Branding", "Design System", "Typography"],
    featured: true,
    promptPreset: "Create a luxury dark glassmorphism design system color palette and layout guidelines for a premium AI SaaS application."
  },
  {
    id: "gem-growth-copywriter",
    title: "Copywriter & Growth Marketer",
    url: "https://gemini.google.com/gem/1-DbrGjCG6Agry9s-sYz2a7x_XpIgT9nn?usp=sharing",
    platform: "gemini",
    category: "Marketing",
    icon: "🚀",
    desc: "High-converting marketing strategist Gem. Writes viral social media posts, persuasive landing page copy, email sequences, and SEO content.",
    tags: ["Copywriting", "Marketing", "SEO", "Growth"],
    featured: false,
    promptPreset: "Draft 5 punchy headline variations for a new AI product launch targeting tech innovators and indie hackers."
  },
  {
    id: "gem-research-synthesizer",
    title: "Research Analyst & Synthesizer",
    url: "https://gemini.google.com/gem/1z2JhVpQV_y9srJURWAzWNwx0y5iKJk6p?usp=sharing",
    platform: "gemini",
    category: "Research",
    icon: "🧠",
    desc: "Deep-dive research analyst Gem. Synthesizes complex documents, comparative market analysis, academic literature, and data summaries.",
    tags: ["Research", "Analysis", "Data", "Synthesis"],
    featured: false,
    promptPreset: "Synthesize the top key takeaways and strategic opportunities from recent AI technological breakthroughs."
  },
  {
    id: "opal-smart-automation",
    title: "Google Opal Smart Automation Agent",
    url: "https://opal.google/app/12hLUYnDluYi2hn_3mct5fAmZY5nTi4Ig",
    platform: "opal",
    category: "Automation",
    icon: "💎",
    desc: "Google Opal App designed for intelligent task automation, workflow chaining, multi-step execution, and data transformation.",
    tags: ["Opal", "Automation", "Workflow", "Task"],
    featured: true,
    promptPreset: "Automate daily summary reports and organize workflow notifications into categorized digests."
  },
  {
    id: "opal-mini-workflow",
    title: "Google Opal Workflow Engine",
    url: "https://opal.google/app/1NRg05e8tUX6kDo0MnYaVpl5uYd4i5Hoe",
    platform: "opal",
    category: "Productivity",
    icon: "🔮",
    desc: "Google Opal Mini App for rapid productivity workflows, quick notes expansion, micro-task orchestration, and interactive tools.",
    tags: ["Opal", "Productivity", "Workflow", "Tools"],
    featured: true,
    promptPreset: "Run a quick multi-step synthesis on project goals and highlight pending action items."
  },
  {
    id: "gem-shared-creative",
    title: "Gemini Creative Studio Session",
    url: "https://gemini.google.com/share/232c412c0d01",
    platform: "share",
    category: "Creative Writing",
    icon: "✨",
    desc: "Curated Gemini Shared Chat Session featuring advanced creative ideation, prompt engineering patterns, and solution generation.",
    tags: ["Shared Session", "Ideation", "Prompts"],
    featured: false,
    promptPreset: "Brainstorm 10 creative product features that leverage multimodal generative AI."
  },
  {
    id: "google-share-workflow",
    title: "Google Share Workflow Matrix",
    url: "https://share.google/BCNJnKfEv6iQhixOW",
    platform: "share",
    category: "Productivity",
    icon: "🌐",
    desc: "Shared Google AI Workflow session showcasing collaborative prompt chains and cross-functional team productivity templates.",
    tags: ["Google Share", "Workflow", "Collaboration"],
    featured: false,
    promptPreset: "Structure a collaborative project plan with milestone deadlines and task assignments."
  },
  {
    id: "gco-gemini-ui",
    title: "Gemini UX & Creative Brief Share",
    url: "https://g.co/gemini/share/fc5f194f8b6a",
    platform: "share",
    category: "Design & UX",
    icon: "📐",
    desc: "Shared Gemini Prompt session focused on UI layout design briefs, accessibility standards, and modern web application structure.",
    tags: ["g.co Share", "UX Design", "Brief"],
    featured: false,
    promptPreset: "Generate a comprehensive UX audit checklist for a mobile progressive web app."
  },
  {
    id: "gem-assistant-architect",
    title: "Gemini Pro Assistant Architect",
    url: "https://gemini.google.com/share/430a2b6f3df6",
    platform: "share",
    category: "Coding & Tech",
    icon: "🛠️",
    desc: "Shared Gemini session containing master system prompts for creating custom AI persona agents and specialized domain experts.",
    tags: ["Persona", "System Prompt", "AI Agent"],
    featured: false,
    promptPreset: "Build a custom persona instruction set for an expert cybersecurity consultant."
  }
];

// App State Management
class OpalisApp {
  constructor() {
    this.apps = this.loadApps();
    this.favorites = this.loadFavorites();
    this.launchMode = localStorage.getItem('opalis_launch_mode') || 'app'; // 'app' (APK Direct Intent) or 'web'
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.selectedAppForPlayground = null;
    this.deferredPrompt = null;

    this.initElements();
    this.initEventListeners();
    this.registerServiceWorker();
    this.renderApps();
    this.updateStats();
    this.updateLaunchModeUI();
  }

  loadApps() {
    const saved = localStorage.getItem('opalis_custom_apps');
    if (saved) {
      try {
        const custom = JSON.parse(saved);
        return [...INITIAL_APPS, ...custom];
      } catch (e) {
        console.error('Failed to parse saved custom apps', e);
      }
    }
    return INITIAL_APPS;
  }

  saveCustomApps(customApps) {
    localStorage.setItem('opalis_custom_apps', JSON.stringify(customApps));
  }

  loadFavorites() {
    const saved = localStorage.getItem('opalis_favorites');
    return saved ? JSON.parse(saved) : ['gem-storybook', 'gem-code-architect', 'opal-smart-automation'];
  }

  saveFavorites() {
    localStorage.setItem('opalis_favorites', JSON.stringify(this.favorites));
  }

  initElements() {
    this.gridEl = document.getElementById('appsGrid');
    this.searchInput = document.getElementById('searchInput');
    this.filterPills = document.querySelectorAll('.pill-btn');
    this.statTotalEl = document.getElementById('statTotal');
    this.statGemsEl = document.getElementById('statGems');
    this.statOpalEl = document.getElementById('statOpal');
    this.statFavsEl = document.getElementById('statFavs');

    // Modals
    this.playgroundModal = document.getElementById('playgroundModal');
    this.addModal = document.getElementById('addModal');
    this.installGuideModal = document.getElementById('installGuideModal');
    this.pwaToast = document.getElementById('pwaToast');
    this.toastMsg = document.getElementById('toastMsg');
    this.launchModeBtn = document.getElementById('launchModeBtn');
  }

  initEventListeners() {
    // Search & Filter
    this.searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase().trim();
      this.renderApps();
    });

    this.filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.dataset.filter;
        this.playSound(440, 'sine', 0.05);
        this.renderApps();
      });
    });

    // Install Guide Modal Trigger
    const installGuideBtn = document.getElementById('installGuideBtn');
    if (installGuideBtn) {
      installGuideBtn.addEventListener('click', () => {
        this.installGuideModal.classList.add('active');
        this.playSound(500, 'sine', 0.08);
      });
    }

    const triggerNativeInstallBtn = document.getElementById('triggerNativeInstallBtn');
    if (triggerNativeInstallBtn) {
      triggerNativeInstallBtn.addEventListener('click', () => {
        this.triggerNativeInstall();
      });
    }

    // Launch Mode Switcher (APK App Direct vs Web Browser)
    if (this.launchModeBtn) {
      this.launchModeBtn.addEventListener('click', () => {
        this.launchMode = this.launchMode === 'app' ? 'web' : 'app';
        localStorage.setItem('opalis_launch_mode', this.launchMode);
        this.updateLaunchModeUI();
        this.renderApps();
        const modeLabel = this.launchMode === 'app' ? 'APK App Gemini Direct 📱' : 'Web Browser 🌐';
        this.showToast(`Mode Peluncuran: ${modeLabel}`);
        this.playSound(640, 'triangle', 0.08);
      });
    }

    // Theme Toggle
    document.getElementById('themeToggleBtn').addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const target = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', target);
      this.showToast(`Switched to ${target} mode`);
      this.playSound(520, 'triangle', 0.08);
    });

    // Modal Close Triggers
    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => this.closeModals());
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeModals();
      });
    });

    // Add New Gem / Opal Form
    document.getElementById('openAddBtn').addEventListener('click', () => {
      this.addModal.classList.add('active');
      this.playSound(480, 'sine', 0.08);
    });

    document.getElementById('addAppForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAddNewApp();
    });

    // Prompt Copy & Launch in Playground
    document.getElementById('copyPromptBtn').addEventListener('click', () => {
      const text = document.getElementById('playgroundTextarea').value;
      navigator.clipboard.writeText(text);
      this.showToast('Prompt copied to clipboard!');
      this.playSound(880, 'sine', 0.1);
    });

    document.getElementById('launchDirectBtn').addEventListener('click', () => {
      if (this.selectedAppForPlayground) {
        const targetUrl = this.getDeepLinkUrl(this.selectedAppForPlayground.url, this.selectedAppForPlayground.platform);
        window.location.href = targetUrl;
      }
    });

    // PWA Install Event Listener
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.pwaToast.classList.add('active');
    });

    document.getElementById('installPwaBtn').addEventListener('click', () => {
      this.triggerNativeInstall();
    });

    document.getElementById('closePwaToast').addEventListener('click', () => {
      this.pwaToast.classList.remove('active');
    });
  }

  triggerNativeInstall() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          this.showToast('Terima kasih telah memasang Opalis AI!');
        }
        this.deferredPrompt = null;
        this.pwaToast.classList.remove('active');
        this.installGuideModal.classList.remove('active');
      });
    } else {
      // Show guide message if browser didn't emit beforeinstallprompt (e.g. non-HTTPS IP or already installed)
      this.showToast('Gunakan Menu Browser: "Tambahkan ke Layar Utama" / "Add to Home Screen"');
    }
  }

  updateLaunchModeUI() {
    if (!this.launchModeBtn) return;
    if (this.launchMode === 'app') {
      this.launchModeBtn.innerHTML = `
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
        <span>Mode APK Gemini</span>
      `;
      this.launchModeBtn.style.borderColor = 'rgba(6, 182, 212, 0.6)';
    } else {
      this.launchModeBtn.innerHTML = `
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
        <span>Mode Web Browser</span>
      `;
      this.launchModeBtn.style.borderColor = 'var(--glass-border)';
    }
  }

  getDeepLinkUrl(url, platform) {
    if (this.launchMode === 'app') {
      const cleanUrl = url.replace(/^https?:\/\//, '');
      const encodedFallback = encodeURIComponent(url);

      if (platform === 'gemini' || platform === 'share') {
        return `intent://${cleanUrl}#Intent;scheme=https;package=com.google.android.apps.bard;S.browser_fallback_url=${encodedFallback};end`;
      } else if (platform === 'opal') {
        return `intent://${cleanUrl}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;S.browser_fallback_url=${encodedFallback};end`;
      }
    }
    return url;
  }

  toggleFavorite(id) {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter(favId => favId !== id);
      this.showToast('Dihapus dari Favorit');
    } else {
      this.favorites.push(id);
      this.showToast('Ditambahkan ke Favorit ❤️');
      this.playSound(600, 'sine', 0.1);
    }
    this.saveFavorites();
    this.renderApps();
    this.updateStats();
  }

  openPlayground(app) {
    this.selectedAppForPlayground = app;
    document.getElementById('playgroundTitle').innerText = `${app.title} Playground`;
    document.getElementById('playgroundIcon').innerText = app.icon;
    document.getElementById('playgroundTextarea').value = app.promptPreset || '';
    this.playgroundModal.classList.add('active');
    this.playSound(550, 'sine', 0.08);
  }

  closeModals() {
    this.playgroundModal.classList.remove('active');
    this.addModal.classList.remove('active');
    this.installGuideModal.classList.remove('active');
  }

  handleAddNewApp() {
    const title = document.getElementById('newTitle').value.trim();
    const url = document.getElementById('newUrl').value.trim();
    const platform = document.getElementById('newPlatform').value;
    const category = document.getElementById('newCategory').value;
    const icon = document.getElementById('newIcon').value || '🔮';
    const desc = document.getElementById('newDesc').value.trim();

    if (!title || !url) return;

    const newApp = {
      id: 'custom-' + Date.now(),
      title,
      url,
      platform,
      category,
      icon,
      desc: desc || 'Custom user added Gemini Gem or Opal link.',
      tags: ['Custom', category],
      featured: true,
      promptPreset: `Use ${title} for advanced task execution.`
    };

    const saved = localStorage.getItem('opalis_custom_apps');
    const custom = saved ? JSON.parse(saved) : [];
    custom.push(newApp);
    this.saveCustomApps(custom);

    this.apps.push(newApp);
    this.closeModals();
    this.renderApps();
    this.updateStats();
    this.showToast('Gem / Opal App Baru Berhasil Ditambahkan!');
    this.playSound(750, 'triangle', 0.1);
  }

  getFilteredApps() {
    return this.apps.filter(app => {
      // Category / Platform Filter
      if (this.activeFilter === 'gemini' && app.platform !== 'gemini') return false;
      if (this.activeFilter === 'opal' && app.platform !== 'opal') return false;
      if (this.activeFilter === 'favorites' && !this.favorites.includes(app.id)) return false;

      // Search Query
      if (this.searchQuery) {
        const titleMatch = app.title.toLowerCase().includes(this.searchQuery);
        const descMatch = app.desc.toLowerCase().includes(this.searchQuery);
        const tagMatch = app.tags.some(t => t.toLowerCase().includes(this.searchQuery));
        return titleMatch || descMatch || tagMatch;
      }
      return true;
    });
  }

  renderApps() {
    const filtered = this.getFilteredApps();
    this.gridEl.innerHTML = '';

    if (filtered.length === 0) {
      this.gridEl.innerHTML = `
        <div class="empty-state">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3>Tidak ada Gem atau Opal App ditemukan</h3>
          <p style="color: var(--text-muted); margin-top: 0.5rem;">Coba sesuaikan kata kunci pencarian atau filter kategori.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(app => {
      const isFav = this.favorites.includes(app.id);
      const card = document.createElement('div');
      card.className = 'app-card';

      let platformBadgeClass = 'badge-gemini';
      let platformLabel = 'Gemini Gem';
      if (app.platform === 'opal') {
        platformBadgeClass = 'badge-opal';
        platformLabel = 'Opal App';
      } else if (app.platform === 'share') {
        platformBadgeClass = 'badge-share';
        platformLabel = 'Shared Link';
      }

      const tagsHtml = app.tags.map(t => `<span class="tag-chip">${t}</span>`).join('');
      const targetLaunchUrl = this.getDeepLinkUrl(app.url, app.platform);

      card.innerHTML = `
        <div>
          <div class="card-header">
            <div class="card-icon">${app.icon}</div>
            <div class="card-actions">
              <span class="platform-badge ${platformBadgeClass}">${platformLabel}</span>
              <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${app.id}" title="Favorit">
                ${isFav ? '❤️' : '🤍'}
              </button>
            </div>
          </div>
          <h3 class="card-title">${app.title}</h3>
          <p class="card-desc">${app.desc}</p>
          <div class="card-tags">${tagsHtml}</div>
        </div>
        <div class="card-footer">
          <a href="${targetLaunchUrl}" class="btn-launch" title="Buka langsung di APK Gemini / App">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            <span>Buka APK Gemini</span>
          </a>
          <button class="btn-playground" data-id="${app.id}" title="Open Prompt Playground">
            <span>Playground</span>
          </button>
        </div>
      `;

      // Event Handlers for Card
      card.querySelector('.fav-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleFavorite(app.id);
      });

      card.querySelector('.btn-playground').addEventListener('click', () => {
        this.openPlayground(app);
      });

      this.gridEl.appendChild(card);
    });
  }

  updateStats() {
    this.statTotalEl.innerText = this.apps.length;
    this.statGemsEl.innerText = this.apps.filter(a => a.platform === 'gemini').length;
    this.statOpalEl.innerText = this.apps.filter(a => a.platform === 'opal').length;
    this.statFavsEl.innerText = this.favorites.length;
  }

  showToast(msg) {
    this.toastMsg.innerText = msg;
    this.toastMsg.classList.add('show');
    setTimeout(() => {
      this.toastMsg.classList.remove('show');
    }, 2800);
  }

  playSound(freq = 440, type = 'sine', duration = 0.1) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context restricted before user gesture
    }
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('[PWA] Service Worker registered:', reg.scope))
          .catch(err => console.error('[PWA] Service Worker registration failed:', err));
      });
    }
  }
}

// Initialize application on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new OpalisApp();
});
