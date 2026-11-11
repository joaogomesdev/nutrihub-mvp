const CONFIG = {
  KEYS: {
    USERS: 'nutrihub_users_db',
    ACTIVE_SESSION: 'nutrihub_active_session',
    PREFILL: 'nutrihub_prefill_meal'
  },
  PATHS: {
    LOGIN: '../HTML/index.html',
    CADASTRO: '../HTML/cadastro.html',
    QUESTIONARIO: '../HTML/quest.html',
    HOME: '../HTML/home.html',
    HISTORICO: '../HTML/hist.html',
    PLANO: '../HTML/plano.html',
    METAS: '../HTML/metas.html',
    PROGRESSO: '../HTML/progresso.html',
    CONFIGURACOES: '../HTML/config.html',
    PERFIL: '../HTML/perfil.html',
    REGISTRO: '../HTML/registro.html'
  },
  PUBLIC_PAGES: ['index.html', 'cadastro.html'],
  WATER_DEFAULT_GOAL_ML: 2000,
  WATER_MAX_ML: 5000,
  DAILY_MEALS_TARGET: 4
};

const UI = {
  showToast(message, type = 'info') {
    let container = document.getElementById('nutrihub-toast-container');

    if (!container) {
      container = document.createElement('div');
      container.id = 'nutrihub-toast-container';

      Object.assign(container.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      });

      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.textContent = message;

    const bgColor =
      type === 'error' ? '#EF4444' :
      type === 'success' ? '#16A36A' : '#087B50';

    Object.assign(toast.style, {
      backgroundColor: bgColor,
      color: '#FFFFFF',
      padding: '12px 20px',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      opacity: '0',
      transform: 'translateY(-10px)',
      transition: 'all 0.3s ease',
      fontFamily: "'Inter', sans-serif"
    });

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  injectPlanStyles() {
    if (document.getElementById('nutrihub-plan-fx')) return;

    const style = document.createElement('style');
    style.id = 'nutrihub-plan-fx';
    style.textContent = `
      #plan-banner {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 24px;
        background: linear-gradient(135deg, #E8F7EF 0%, #FFFFFF 75%);
        border: 1px solid #CDE9DB;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }

      #plan-banner .nhpl-banner-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 24px;
        flex-wrap: wrap;
      }

      #plan-banner .nhpl-banner-main { flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 8px; }

      #plan-banner .nhpl-tag {
        width: fit-content;
        padding: 4px 12px;
        border-radius: 20px;
        background: #E8F7EF;
        color: #087B50;
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      #plan-banner .nhpl-banner-title { margin: 0; font-size: 1.4rem; font-weight: 700; color: #1C2923; letter-spacing: -0.01em; }
      #plan-banner .nhpl-banner-desc { margin: 0; font-size: 0.92rem; color: #55635B; line-height: 1.5; max-width: 720px; }

      #plan-banner .nhpl-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 6px; }

      #plan-banner .nhpl-chip {
        padding: 5px 12px;
        border-radius: 999px;
        background: #ffffff;
        border: 1px solid #DCEBE3;
        font-size: 0.78rem;
        font-weight: 600;
        color: #33433B;
      }

      #plan-banner .nhpl-banner-side { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; max-width: 280px; }

      .nhpl-btn-outline {
        padding: 10px 16px;
        border: 1px solid #BFE6D2;
        border-radius: 10px;
        background: #ffffff;
        color: #087B50;
        font: inherit;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .nhpl-btn-outline:hover { background: #E8F7EF; transform: translateY(-1px); }

      #plan-banner .nhpl-basis { font-size: 0.75rem; color: #718078; text-align: right; line-height: 1.4; }
      #plan-banner .nhpl-basis a { color: #087B50; font-weight: 600; }

      #plan-banner .nhpl-why { padding-top: 16px; border-top: 1px solid #DCEBE3; }
      #plan-banner .nhpl-why-title { margin: 0 0 10px; font-size: 0.95rem; font-weight: 700; color: #1C2923; }

      #plan-banner .nhpl-why-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 8px 24px;
      }

      #plan-banner .nhpl-why-list li {
        position: relative;
        padding-left: 22px;
        font-size: 0.86rem;
        line-height: 1.45;
        color: #44544B;
      }

      #plan-banner .nhpl-why-list li::before {
        content: '✓';
        position: absolute;
        left: 0;
        top: 0;
        color: #16A36A;
        font-weight: 700;
      }

      #meals-grid .nhpl-meal {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-width: 0;
        padding: 20px;
        background: #ffffff;
        border: 1px solid #E1EAE4;
        border-left: 4px solid #16A36A;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      #meals-grid .nhpl-meal:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 26px -12px rgba(22, 163, 106, 0.3);
      }

      #meals-grid .nhpl-slot-cafe { border-left-color: #E8A317; }
      #meals-grid .nhpl-slot-lanche1,
      #meals-grid .nhpl-slot-lanche2 { border-left-color: #F0701F; }
      #meals-grid .nhpl-slot-jantar { border-left-color: #5B63D3; }
      #meals-grid .nhpl-slot-ceia { border-left-color: #8A5CD0; }

      #meals-grid .nhpl-meal-head { display: flex; align-items: center; gap: 12px; }

      #meals-grid .nhpl-meal-icon {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        border-radius: 14px;
        background: #E8F7EF;
        font-size: 1.4rem;
      }

      #meals-grid .nhpl-slot-cafe .nhpl-meal-icon { background: #FFF4DC; }
      #meals-grid .nhpl-slot-lanche1 .nhpl-meal-icon,
      #meals-grid .nhpl-slot-lanche2 .nhpl-meal-icon { background: #FFEBDD; }
      #meals-grid .nhpl-slot-jantar .nhpl-meal-icon { background: #EAEBFB; }
      #meals-grid .nhpl-slot-ceia .nhpl-meal-icon { background: #F1E9FB; }

      #meals-grid .nhpl-meal-titles { flex: 1; min-width: 0; display: flex; flex-direction: column; }

      #meals-grid .nhpl-meal-slot {
        font-size: 0.74rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #087B50;
      }

      #meals-grid .nhpl-meal-name { margin: 2px 0 0; font-size: 1rem; font-weight: 700; line-height: 1.3; color: #1C2923; }

      #meals-grid .nhpl-kcal {
        flex: 0 0 auto;
        padding: 4px 12px;
        border-radius: 999px;
        background: #FFF1E3;
        color: #C2610C;
        font-size: 0.8rem;
        font-weight: 700;
        white-space: nowrap;
      }

      #meals-grid .nhpl-items {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #F7FAF8;
        border: 1px solid #E1EAE4;
        border-radius: 12px;
      }

      #meals-grid .nhpl-items li {
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding: 9px 14px;
        font-size: 0.86rem;
      }

      #meals-grid .nhpl-items li + li { border-top: 1px solid #E1EAE4; }
      #meals-grid .nhpl-item-name { flex: 1; min-width: 0; font-weight: 600; color: #1C2923; }
      #meals-grid .nhpl-item-qty { font-size: 0.8rem; color: #718078; text-align: right; }
      #meals-grid .nhpl-item-kcal { min-width: 58px; font-size: 0.76rem; font-weight: 700; color: #087B50; text-align: right; white-space: nowrap; }

      #meals-grid .nhpl-macros { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: 0.8rem; color: #718078; }
      #meals-grid .nhpl-macros strong { color: #1C2923; }

      #meals-grid .nhpl-meal-foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: auto;
      }

      #meals-grid .nhpl-prep { font-size: 0.78rem; font-weight: 600; color: #718078; }

      #meals-grid .nhpl-btn {
        padding: 8px 14px;
        border: 0;
        border-radius: 8px;
        background: #16A36A;
        color: #ffffff;
        font: inherit;
        font-size: 0.82rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }

      #meals-grid .nhpl-btn:hover { background: #087B50; }

      #plan-extras { display: flex; flex-direction: column; gap: 24px; }

      #plan-extras .nhpl-extras-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr));
        gap: 16px;
      }

      #plan-extras .nhpl-card {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-width: 0;
        padding: 22px;
        background: #ffffff;
        border: 1px solid #E1EAE4;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }

      #plan-extras .nhpl-card-title { margin: 0; font-size: 1.05rem; font-weight: 700; color: #1C2923; }
      #plan-extras .nhpl-card-sub { margin: -8px 0 0; font-size: 0.82rem; color: #718078; }
      #plan-extras .nhpl-muted { color: #718078; font-size: 0.88rem; }

      #plan-extras .nhpl-rows { display: flex; flex-direction: column; gap: 12px; }

      #plan-extras .nhpl-row {
        display: grid;
        grid-template-columns: minmax(90px, 110px) 1fr auto;
        align-items: center;
        gap: 12px;
        font-size: 0.86rem;
      }

      #plan-extras .nhpl-row-name { font-weight: 600; color: #1C2923; }
      #plan-extras .nhpl-row-value { font-weight: 700; color: #55635B; white-space: nowrap; font-size: 0.82rem; }
      #plan-extras .nhpl-meter { height: 10px; overflow: hidden; background: #EEF3F0; border-radius: 999px; }
      #plan-extras .nhpl-meter span { display: block; height: 100%; border-radius: 999px; background: #16A36A; }

      #plan-extras .nhpl-water {
        margin: 4px 0 0;
        padding: 10px 14px;
        background: #E7F3FC;
        border-radius: 10px;
        font-size: 0.85rem;
        color: #1F6DA8;
      }

      #plan-extras .nhpl-tips { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }

      #plan-extras .nhpl-tips li {
        position: relative;
        padding-left: 24px;
        font-size: 0.86rem;
        line-height: 1.5;
        color: #44544B;
      }

      #plan-extras .nhpl-tips li::before { content: '💡'; position: absolute; left: 0; top: 0; font-size: 0.85rem; }

      #plan-extras .nhpl-shop-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
      }

      #plan-extras .nhpl-shop-group h4 {
        margin: 0 0 8px;
        padding-bottom: 6px;
        border-bottom: 2px solid #E8F7EF;
        font-size: 0.82rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: #087B50;
      }

      #plan-extras .nhpl-shop-group ul { list-style: none; margin: 0; padding: 0; }

      #plan-extras .nhpl-shop-group li {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        padding: 6px 0;
        border-bottom: 1px dashed #EEF3F0;
        font-size: 0.85rem;
        color: #44544B;
      }

      #plan-extras .nhpl-shop-group li strong { color: #1C2923; white-space: nowrap; }
      #plan-extras .nhpl-disclaimer { margin: 0; font-size: 0.78rem; line-height: 1.5; color: #8A9A92; text-align: center; }

      .nhpl-empty-cta { margin-top: 16px; display: inline-block; text-decoration: none; }

      @media (max-width: 560px) {
        #plan-banner { padding: 16px; }
        #plan-banner .nhpl-banner-side { align-items: stretch; max-width: none; width: 100%; }
        #plan-banner .nhpl-basis { text-align: left; }
        #plan-extras .nhpl-row { grid-template-columns: 90px 1fr auto; }
        #meals-grid .nhpl-items li { flex-wrap: wrap; }
      }

      @media (prefers-reduced-motion: reduce) {
        #meals-grid .nhpl-meal,
        .nhpl-btn-outline { transition: none; }
      }
    `;

    document.head.appendChild(style);
  },

  injectProgressStyles() {
    if (document.getElementById('nutrihub-progress-fx')) return;

    const style = document.createElement('style');
    style.id = 'nutrihub-progress-fx';
    style.textContent = `
      #progress-dashboard {
        display: flex;
        flex-direction: column;
        gap: 24px;
        margin-top: 8px;
        color: #1C2923;
        font-family: inherit;
      }

      #progress-dashboard * { box-sizing: border-box; }

      #progress-dashboard .nhp-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 16px;
        flex-wrap: wrap;
      }

      #progress-dashboard .nhp-title { margin: 0; font-size: 1.25rem; font-weight: 700; }
      #progress-dashboard .nhp-sub { margin: 2px 0 0; font-size: 0.9rem; color: #718078; }

      #progress-dashboard .nhp-pills {
        display: flex;
        gap: 2px;
        padding: 3px;
        background: #E1EAE4;
        border-radius: 10px;
      }

      #progress-dashboard .nhp-pill {
        border: 0;
        background: none;
        padding: 7px 14px;
        border-radius: 8px;
        font: inherit;
        font-size: 0.82rem;
        font-weight: 600;
        color: #718078;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      #progress-dashboard .nhp-pill:hover { color: #1C2923; }

      #progress-dashboard .nhp-pill.is-active {
        background: #ffffff;
        color: #087B50;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      }

      #progress-dashboard .nhp-kpis {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 16px;
      }

      #progress-dashboard .nhp-kpi {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 18px;
        background: #ffffff;
        border: 1px solid #E1EAE4;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      #progress-dashboard .nhp-kpi:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 26px -12px rgba(22, 163, 106, 0.3);
      }

      #progress-dashboard .nhp-kpi-icon {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 14px;
        background: #E8F7EF;
        font-size: 1.4rem;
      }

      #progress-dashboard .nhp-kpi-data { min-width: 0; display: flex; flex-direction: column; }
      #progress-dashboard .nhp-kpi-value { font-size: 1.5rem; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
      #progress-dashboard .nhp-kpi-label { font-size: 0.82rem; color: #55635B; font-weight: 600; }
      #progress-dashboard .nhp-kpi-hint { margin-top: 2px; font-size: 0.75rem; color: #8A9A92; }

      #progress-dashboard .nhp-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(420px, 100%), 1fr));
        gap: 16px;
      }

      #progress-dashboard .nhp-card {
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 0;
        padding: 22px;
        background: #ffffff;
        border: 1px solid #E1EAE4;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }

      #progress-dashboard .nhp-card-title { margin: 0; font-size: 1rem; font-weight: 700; }
      #progress-dashboard .nhp-card-sub { margin: 2px 0 0; font-size: 0.82rem; color: #718078; }

      #progress-dashboard .nhp-bars {
        display: flex;
        align-items: stretch;
        gap: 6px;
        height: 190px;
      }

      #progress-dashboard .nhp-col {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }

      #progress-dashboard .nhp-val {
        min-height: 14px;
        font-size: 0.68rem;
        font-weight: 700;
        color: #55635B;
        white-space: nowrap;
      }

      #progress-dashboard .nhp-track {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: flex-end;
        background: #F1F5F3;
        border-radius: 8px;
        overflow: hidden;
      }

      #progress-dashboard .nhp-fill {
        width: 100%;
        border-radius: 8px 8px 0 0;
        transition: height 0.4s ease;
      }

      #progress-dashboard .nhp-fill.is-kcal { background: linear-gradient(to top, #16A36A, #5FD3A0); }
      #progress-dashboard .nhp-fill.is-water { background: linear-gradient(to top, #2B8FD9, #7CC4F2); }

      #progress-dashboard .nhp-label {
        min-height: 14px;
        font-size: 0.7rem;
        color: #718078;
        white-space: nowrap;
        text-transform: capitalize;
      }

      #progress-dashboard .nhp-row {
        display: grid;
        grid-template-columns: minmax(110px, 150px) 1fr auto;
        align-items: center;
        gap: 12px;
        font-size: 0.88rem;
      }

      #progress-dashboard .nhp-row-name { font-weight: 600; }
      #progress-dashboard .nhp-row-value { font-weight: 700; color: #55635B; white-space: nowrap; }

      #progress-dashboard .nhp-meter {
        height: 10px;
        overflow: hidden;
        background: #EEF3F0;
        border-radius: 999px;
      }

      #progress-dashboard .nhp-meter > span {
        display: block;
        height: 100%;
        border-radius: 999px;
        background: #16A36A;
        transition: width 0.4s ease;
      }

      #progress-dashboard .nhp-list { display: flex; flex-direction: column; }

      #progress-dashboard .nhp-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 0;
        border-top: 1px solid #EEF3F0;
        font-size: 0.88rem;
      }

      #progress-dashboard .nhp-item:first-child { border-top: 0; padding-top: 0; }

      #progress-dashboard .nhp-rank {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #E8F7EF;
        color: #087B50;
        font-size: 0.8rem;
        font-weight: 700;
      }

      #progress-dashboard .nhp-item-main { flex: 1; min-width: 0; font-weight: 600; word-break: break-word; }
      #progress-dashboard .nhp-item-meta { font-size: 0.8rem; color: #718078; white-space: nowrap; }
      #progress-dashboard .nhp-hl { justify-content: space-between; }
      #progress-dashboard .nhp-hl span:first-child { color: #718078; }
      #progress-dashboard .nhp-hl strong { text-align: right; }

      #progress-dashboard .nhp-goal { display: flex; flex-direction: column; gap: 6px; padding: 10px 0; border-top: 1px solid #EEF3F0; }
      #progress-dashboard .nhp-goal:first-child { border-top: 0; padding-top: 0; }

      #progress-dashboard .nhp-goal-top {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        font-size: 0.88rem;
      }

      #progress-dashboard .nhp-goal-top span:last-child { color: #718078; white-space: nowrap; }

      #progress-dashboard .nhp-empty {
        padding: 28px 16px;
        text-align: center;
        font-size: 0.9rem;
        color: #718078;
      }

      #progress-dashboard .nhp-empty a { color: #087B50; font-weight: 600; }

      #progress-dashboard .nhp-hero-empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 56px 24px;
        text-align: center;
        background: #ffffff;
        border: 1px dashed #BFE6D2;
        border-radius: 16px;
      }

      #progress-dashboard .nhp-hero-empty h3 { margin: 0; font-size: 1.2rem; }
      #progress-dashboard .nhp-hero-empty p { margin: 0; max-width: 440px; color: #718078; }

      #progress-dashboard .nhp-cta {
        display: inline-flex;
        margin-top: 8px;
        padding: 12px 22px;
        border-radius: 12px;
        background: #16A36A;
        color: #ffffff;
        font-weight: 600;
        text-decoration: none;
      }

      #progress-dashboard .nhp-cta:hover { background: #087B50; }

      @media (max-width: 1100px) {
        #progress-dashboard .nhp-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      }

      @media (max-width: 640px) {
        #progress-dashboard .nhp-kpis { grid-template-columns: 1fr; }
        #progress-dashboard .nhp-row { grid-template-columns: 100px 1fr auto; }
        #progress-dashboard .nhp-card { padding: 16px; }
      }

      @media (prefers-reduced-motion: reduce) {
        #progress-dashboard * { transition: none !important; }
      }
    `;

    document.head.appendChild(style);
  },

  injectFormStyles() {
    if (document.getElementById('nutrihub-form-fx')) return;

    const style = document.createElement('style');
    style.id = 'nutrihub-form-fx';
    style.textContent = `
      .nh-terms-error {
        outline: 2px solid #EF4444;
        outline-offset: 4px;
        border-radius: 8px;
        background: rgba(239, 68, 68, 0.07);
      }
    `;

    document.head.appendChild(style);
  },

  injectHomeMealStyles() {
    if (document.getElementById('nutrihub-home-meals-fx')) return;

    const style = document.createElement('style');
    style.id = 'nutrihub-home-meals-fx';
    style.textContent = `
      #home-today-meals-list[hidden] { display: none !important; }

      #home-today-meals-list {
        display: block;
        margin-top: 4px;
      }

      #home-today-meals-list .meal-day-group {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(340px, 100%), 1fr));
        gap: 16px;
      }

      #home-today-meals-list .meal-card {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        min-width: 0;
        margin: 0;
        padding: 16px 18px;
        background: #ffffff;
        border: 1px solid #E1EAE4;
        border-left: 4px solid #16A36A;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      #home-today-meals-list .meal-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 14px 26px -12px rgba(22, 163, 106, 0.3);
      }

      #home-today-meals-list .meal-card-icon {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46px;
        height: 46px;
        border-radius: 14px;
        background: #E8F7EF;
        font-size: 1.4rem;
        line-height: 1;
      }

      #home-today-meals-list .meal-card-body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      #home-today-meals-list .meal-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
      }

      #home-today-meals-list .meal-card-title {
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.3;
        color: #1C2923;
        word-break: break-word;
      }

      #home-today-meals-list .meal-card-title::first-letter { text-transform: uppercase; }

      #home-today-meals-list .meal-card-time {
        flex: 0 0 auto;
        padding: 2px 10px;
        border-radius: 999px;
        background: #F7FAF8;
        border: 1px solid #E1EAE4;
        font-size: 0.78rem;
        font-weight: 700;
        color: #718078;
        font-variant-numeric: tabular-nums;
      }

      #home-today-meals-list .meal-card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }

      #home-today-meals-list .meal-card-type,
      #home-today-meals-list .meal-card-local,
      #home-today-meals-list .meal-card-water,
      #home-today-meals-list .meal-card-kcal {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin: 0;
        padding: 3px 10px;
        border-radius: 999px;
        font-size: 0.78rem;
        font-weight: 600;
        line-height: 1.5;
      }

      #home-today-meals-list .meal-card-type { background: #E8F7EF; color: #087B50; }
      #home-today-meals-list .meal-card-local { background: #F1F4F2; color: #55635B; }
      #home-today-meals-list .meal-card-water { background: #E7F3FC; color: #2B8FD9; }
      #home-today-meals-list .meal-card-kcal { background: #FFF1E3; color: #C2610C; }

      #home-today-meals-list .meal-card-foods {
        list-style: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background: #F7FAF8;
        border: 1px solid #E1EAE4;
        border-radius: 12px;
        font-size: 0.85rem;
      }

      #home-today-meals-list .meal-card-foods li {
        display: flex;
        align-items: baseline;
        gap: 10px;
        padding: 8px 12px;
      }

      #home-today-meals-list .meal-card-foods li + li { border-top: 1px solid #E1EAE4; }

      #home-today-meals-list .meal-food-name {
        flex: 1;
        min-width: 0;
        font-weight: 600;
        color: #1C2923;
        word-break: break-word;
      }

      #home-today-meals-list .meal-food-portion { font-size: 0.8rem; color: #718078; }

      #home-today-meals-list .meal-food-kcal {
        font-size: 0.78rem;
        font-weight: 700;
        color: #087B50;
        white-space: nowrap;
      }

      #home-today-meals-list .meal-card-desc {
        margin: 0;
        padding-left: 10px;
        border-left: 2px solid #E1EAE4;
        font-size: 0.85rem;
        font-style: italic;
        color: #718078;
      }

      #home-today-meals-list .meal-type-cafe { border-left-color: #E8A317; }
      #home-today-meals-list .meal-type-cafe .meal-card-icon { background: #FFF4DC; }
      #home-today-meals-list .meal-type-lanche { border-left-color: #F0701F; }
      #home-today-meals-list .meal-type-lanche .meal-card-icon { background: #FFEBDD; }
      #home-today-meals-list .meal-type-jantar { border-left-color: #5B63D3; }
      #home-today-meals-list .meal-type-jantar .meal-card-icon { background: #EAEBFB; }
      #home-today-meals-list .meal-type-ceia { border-left-color: #8A5CD0; }
      #home-today-meals-list .meal-type-ceia .meal-card-icon { background: #F1E9FB; }
      #home-today-meals-list .meal-type-hidratacao { border-left-color: #2B8FD9; }
      #home-today-meals-list .meal-type-hidratacao .meal-card-icon { background: #E7F3FC; }
      #home-today-meals-list .meal-type-outro { border-left-color: #9AA8A0; }
      #home-today-meals-list .meal-type-outro .meal-card-icon { background: #EEF2EF; }

      @media (prefers-reduced-motion: reduce) {
        #home-today-meals-list .meal-card { transition: none; }
      }
    `;

    document.head.appendChild(style);
  },

  injectFoodStyles() {
    if (document.getElementById('nutrihub-food-fx')) return;

    const style = document.createElement('style');
    style.id = 'nutrihub-food-fx';
    style.textContent = `
      :where(.foods-list) { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }

      :where(.food-item) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        background: #ffffff;
        border: 1px solid #dbe7e1;
        border-left: 4px solid #16A36A;
        border-radius: 12px;
        animation: nhFoodIn 0.25s ease-out;
      }

      :where(.food-item.is-editing) { background: #fff8e6; border-color: #f0c05a; }
      :where(.food-item-info) { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      :where(.food-item-name) { font-weight: 600; color: #12261d; word-break: break-word; }
      :where(.food-item-meta) { font-size: 0.85rem; color: #5b6b63; }
      :where(.food-item-actions) { display: flex; gap: 8px; flex: 0 0 auto; }

      :where(.btn-food-edit, .btn-food-remove) {
        border: 1px solid #dbe7e1;
        background: #f7fbf9;
        color: #087B50;
        padding: 6px 10px;
        border-radius: 8px;
        font: inherit;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
      }

      :where(.btn-food-remove) { color: #d33b3b; }
      :where(.btn-food-edit:hover) { background: #e8f7ef; }
      :where(.btn-food-remove:hover) { background: #fdeaea; }

      :where(.foods-total) {
        margin: 12px 0 0;
        padding: 10px 14px;
        background: #e8f7ef;
        color: #087B50;
        border-radius: 10px;
        font-weight: 700;
      }

      :where(.meal-card-foods) { margin: 6px 0 0; padding-left: 18px; font-size: 0.85rem; color: #33433b; }
      :where(.meal-card-kcal, .meal-card-local) { display: inline-block; margin: 6px 10px 0 0; font-size: 0.8rem; color: #5b6b63; }

      @keyframes nhFoodIn {
        from { opacity: 0; transform: translateY(-6px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @media (prefers-reduced-motion: reduce) { .food-item { animation: none !important; } }
    `;

    document.head.appendChild(style);
  },

  injectWaterEffects() {
    this.injectFoodStyles();

    if (document.getElementById('nutrihub-water-fx')) return;

    const style = document.createElement('style');
    style.id = 'nutrihub-water-fx';
    style.textContent = `
      .modal-overlay[hidden],
      .welcome-modal-overlay[hidden] { display: none !important; }

      :where(.modal-overlay, .welcome-modal-overlay) {
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background: rgba(15, 32, 25, 0.55);
        backdrop-filter: blur(3px);
        overflow-y: auto;
        box-sizing: border-box;
      }

      :where(.modal-card, .welcome-modal) {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        background: #ffffff;
        border-radius: 20px;
        padding: 28px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
        font-family: 'Inter', sans-serif;
      }

      :where(.modal-card) { max-width: 440px; }
      :where(.welcome-modal) { max-width: 520px; padding: 32px; }

      :where(.modal-header) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
      }

      :where(.modal-title-group) { display: flex; align-items: center; gap: 10px; }
      :where(.modal-title) { margin: 0; font-size: 1.15rem; font-weight: 700; color: #12261d; }
      :where(.modal-water-icon) { font-size: 1.6rem; }
      :where(.water-modal-description) { margin: 0 0 16px; color: #5b6b63; font-size: 0.9rem; }

      :where(.btn-close-modal, .welcome-modal-close) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 34px;
        height: 34px;
        border: 0;
        border-radius: 10px;
        background: #f1f5f3;
        color: #4a5a52;
        font-size: 1.4rem;
        line-height: 1;
        cursor: pointer;
      }

      :where(.welcome-modal-close) { position: absolute; top: 14px; right: 14px; }

      :where(.water-quick-buttons) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 18px;
      }

      :where(.btn-water-quick) {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 12px 6px;
        border: 2px solid #dbe7e1;
        border-radius: 14px;
        background: #f7fbf9;
        color: #12261d;
        font: inherit;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      :where(.btn-water-quick span) { font-size: 0.75rem; color: #6b7c74; }
      :where(.btn-water-quick:hover) { border-color: #16A36A; transform: translateY(-2px); }
      :where(.btn-water-quick.selected) { border-color: #16A36A; background: #e8f7ef; }

      :where(.water-input-wrap) { display: flex; align-items: center; gap: 8px; }
      :where(.water-input-wrap .form-input) {
        flex: 1;
        padding: 12px 14px;
        border: 2px solid #dbe7e1;
        border-radius: 12px;
        font: inherit;
      }

      :where(.modal-actions) { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }

      :where(.modal-actions .btn-primary, .modal-actions .btn-secondary,
             .welcome-btn-primary, .welcome-btn-secondary) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 11px 18px;
        border-radius: 12px;
        font: inherit;
        font-weight: 600;
        text-decoration: none;
        cursor: pointer;
        border: 2px solid transparent;
      }

      :where(.modal-actions .btn-primary, .welcome-btn-primary) { background: #16A36A; color: #fff; }
      :where(.modal-actions .btn-secondary, .welcome-btn-secondary) {
        background: #fff; color: #087B50; border-color: #cfe5db;
      }

      :where(.welcome-modal-badge) { margin-bottom: 14px; }
      :where(.welcome-modal-title) { margin: 0 0 10px; font-size: 1.4rem; color: #12261d; }
      :where(.welcome-modal-text, .welcome-modal-tip) { color: #4a5a52; line-height: 1.55; }
      :where(.welcome-modal-features) { list-style: none; margin: 16px 0; padding: 0; display: grid; gap: 12px; }
      :where(.welcome-modal-features li) { display: flex; gap: 10px; align-items: flex-start; color: #33433b; }
      :where(.welcome-feature-icon) {
        flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center;
        width: 32px; height: 32px; border-radius: 10px; background: #e8f7ef;
      }
      :where(.welcome-modal-actions) { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 18px; }

      #water-modal:not([hidden]),
      #welcome-modal:not([hidden]) {
        display: flex;
        align-items: center;
        justify-content: center;
        animation: nhFadeIn 0.2s ease-out;
      }

      #water-modal:not([hidden]) .water-modal-card {
        animation: nhPopIn 0.28s cubic-bezier(0.2, 0.9, 0.3, 1.2);
      }

      .btn-water-header,
      .water-summary-action {
        position: relative;
        cursor: pointer;
      }

      .btn-water-header::after,
      .water-summary-action::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        box-shadow: 0 0 0 0 rgba(22, 163, 106, 0.45);
        animation: nhWaterPulse 2.6s ease-out infinite;
      }

      .btn-water-header:hover::after,
      .water-summary-action:hover::after { animation: none; }

      @keyframes nhWaterPulse {
        0%   { box-shadow: 0 0 0 0 rgba(22, 163, 106, 0.45); }
        70%  { box-shadow: 0 0 0 12px rgba(22, 163, 106, 0); }
        100% { box-shadow: 0 0 0 0 rgba(22, 163, 106, 0); }
      }

      @keyframes nhFadeIn { from { opacity: 0; } to { opacity: 1; } }

      @keyframes nhPopIn {
        from { opacity: 0; transform: translateY(14px) scale(0.94); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }

      @media (prefers-reduced-motion: reduce) {
        .btn-water-header::after,
        .water-summary-action::after,
        #water-modal:not([hidden]),
        #water-modal:not([hidden]) .water-modal-card { animation: none !important; }
      }
    `;

    document.head.appendChild(style);
  }
};

const Utils = {
  generateUUID() {
    return 'user_' + Date.now().toString(36) + '_' +
      Math.random().toString(36).substring(2, 11);
  },

  sanitizeHTML(str) {
    if (str === null || str === undefined || str === '') return '';

    const temp = document.createElement('div');
    temp.textContent = String(str);

    return temp.innerHTML;
  },

  escapeAttr(str) {
    return String(str === null || str === undefined ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },

  normalize(str) {
    return String(str || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  },

  getCurrentPage() {
    const last = window.location.pathname.split('/').pop().toLowerCase();
    return last === '' ? 'index.html' : last;
  },

  toISO(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${y}-${m}-${day}`;
  },

  todayISO() {
    return this.toISO(new Date());
  },

  parseLocalDate(dateStr) {
    return new Date(dateStr + 'T00:00:00');
  },

  formatDateBR(dateStr) {
    if (!dateStr) return '—';

    const parts = String(dateStr).split('-');
    if (parts.length !== 3) return String(dateStr);

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  },

  formatDateLong(dateStr) {
    if (!dateStr) return '—';

    const date = this.parseLocalDate(dateStr);

    const dateFormatted = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    const weekdayCapitalized =
      weekday.charAt(0).toUpperCase() + weekday.slice(1);

    return `${dateFormatted} — ${weekdayCapitalized}`;
  },

  getInitials(name) {
    if (!name) return 'NH';

    const parts = name.trim().split(' ').filter(Boolean);

    if (parts.length === 0) return 'NH';

    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  },

  pick(ids) {
    const list = Array.isArray(ids) ? ids : [ids];

    for (let i = 0; i < list.length; i++) {
      const el = document.getElementById(list[i]);
      if (el) return el;
    }

    return null;
  },

  toggle(el, show) {
    if (!el) return;

    el.hidden = !show;
    el.style.display = show ? '' : 'none';
  },

  formatMl(ml) {
    const value = Math.round(Number(ml) || 0);

    if (value >= 1000) {
      return `${(value / 1000).toLocaleString('pt-BR', {
        maximumFractionDigits: 2
      })} L`;
    }

    return `${value} ml`;
  },

  formatMlShort(ml) {
    const value = Number(ml) || 0;
    if (value <= 0) return '';

    return value >= 1000
      ? `${(value / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}L`
      : String(Math.round(value));
  },

  isWaterRecord(meal) {
    return meal && meal.type === 'hidratação';
  },

  mealsOnly(list) {
    return (list || []).filter(m => !this.isWaterRecord(m));
  },

  waterTotalForDate(list, dateISO) {
    return (list || [])
      .filter(m => m.date === dateISO && Number(m.waterAmount) > 0)
      .reduce((total, m) => total + Number(m.waterAmount || 0), 0);
  },

  unitToMl(unit) {
    const u = this.normalize(unit);
    return ['l', 'lt', 'litro', 'litros'].includes(u) ? 1000 : 1;
  },

  isHydrationGoal(meta) {
    if (!meta) return false;

    const category = this.normalize(meta.category);
    const title = this.normalize(meta.title);
    const unit = this.normalize(meta.unit);

    return (
      category.includes('hidrat') ||
      category.includes('agua') ||
      title.includes('agua') ||
      ['ml', 'l', 'lt', 'litro', 'litros'].includes(unit)
    );
  },

  computeStreak(list) {
    const dates = new Set((list || []).map(m => m.date));
    if (dates.size === 0) return 0;

    const cursor = this.parseLocalDate(this.todayISO());

    if (!dates.has(this.toISO(cursor))) {
      cursor.setDate(cursor.getDate() - 1);
    }

    let count = 0;

    while (dates.has(this.toISO(cursor))) {
      count++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return count;
  },

  buildDailySeries(days, valueFn) {
    const today = new Date();
    const series = [];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - i
      );

      const dateISO = this.toISO(d);
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');

      const label = days <= 7
        ? d.toLocaleDateString('pt-BR', { weekday: 'short' })
            .replace('.', '')
            .slice(0, 3)
        : `${dd}/${mm}`;

      series.push({ dateISO, label, value: valueFn(dateISO) });
    }

    return series;
  }
};

const StorageDB = {
  getUsers() {
    try {
      const data = sessionStorage.getItem(CONFIG.KEYS.USERS);
      const parsed = data ? JSON.parse(data) : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  },

  saveUsers(users) {
    try {
      sessionStorage.setItem(CONFIG.KEYS.USERS, JSON.stringify(users));
      return true;
    } catch (e) {
      UI.showToast('Erro ao salvar os dados.', 'error');
      return false;
    }
  },

  purgeLegacyStorage() {
    try {
      localStorage.removeItem(CONFIG.KEYS.USERS);
      localStorage.removeItem(CONFIG.KEYS.ACTIVE_SESSION);
    } catch (e) {
      return;
    }
  },

  findUserByEmail(email) {
    const users = this.getUsers();

    return users.find(
      u => String(u.email).toLowerCase() === String(email).toLowerCase()
    );
  },

  findUserById(id) {
    const users = this.getUsers();
    return users.find(u => u.id === id);
  },

  updateUserData(userId, updateFn) {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) return null;

    updateFn(users[index]);

    return this.saveUsers(users) ? users[index] : null;
  }
};

const Auth = {
  getActiveSession() {
    try {
      const session = sessionStorage.getItem(CONFIG.KEYS.ACTIVE_SESSION);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  },

  getAuthenticatedUser() {
    const session = this.getActiveSession();

    if (!session || !session.userId) return null;

    return StorageDB.findUserById(session.userId) || null;
  },

  createSession(user) {
    const sessionData = {
      userId: user.id,
      loginTime: new Date().toISOString()
    };

    sessionStorage.setItem(
      CONFIG.KEYS.ACTIVE_SESSION,
      JSON.stringify(sessionData)
    );
  },

  logout() {
    sessionStorage.removeItem(CONFIG.KEYS.ACTIVE_SESSION);
    window.location.replace(CONFIG.PATHS.LOGIN);
  }
};

const RouterGuard = {
  protect() {
    const page = Utils.getCurrentPage();
    const isPublic = CONFIG.PUBLIC_PAGES.includes(page);
    const user = Auth.getAuthenticatedUser();

    const redirect = (url) => {
      window.location.replace(url);
      return false;
    };

    if (!user) {
      return isPublic ? true : redirect(CONFIG.PATHS.LOGIN);
    }

    if (isPublic) {
      return redirect(CONFIG.PATHS.HOME);
    }

    return true;
  }
};

const Shell = {
  logoutBound: false,

  init(user) {
    document.querySelectorAll('.user-avatar').forEach(el => {
      el.textContent = Utils.getInitials(user.name);
      el.title = user.name;
    });

    document.querySelectorAll('[data-user-name]').forEach(el => {
      el.textContent = user.name;
    });

    document.querySelectorAll('[data-user-email]').forEach(el => {
      el.textContent = user.email;
    });

    if (this.logoutBound) return;
    this.logoutBound = true;

    document.querySelectorAll('.nav-logout, .logout').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        Auth.logout();
      });
    });
  }
};

const FormGuard = {
  bind(form, handler) {
    if (!form) return;

    form.noValidate = true;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      handler(e);
    }, true);
  }
};

const RegisterModule = {
  submitting: false,

  init() {
    const form = document.querySelector('form');
    if (!form) return;

    UI.injectFormStyles();

    form.querySelectorAll('input[type="checkbox"]').forEach((box) => {
      box.addEventListener('change', () => this.clearTermsError(form));
    });

    FormGuard.bind(form, () => this.submit(form));
  },

  findTermsCheckboxes(form) {
    const boxes = Array.from(form.querySelectorAll('input[type="checkbox"]'));
    const pattern = /term|aceit|polit|agree|condic|accept|privac/i;

    const describe = (box) => {
      const wrapped = box.closest('label');
      const linked = box.id
        ? document.querySelector(`label[for="${CSS.escape(box.id)}"]`)
        : null;

      return [
        box.id,
        box.name,
        wrapped ? wrapped.textContent : '',
        linked ? linked.textContent : ''
      ].join(' ');
    };

    const matches = boxes.filter(box => pattern.test(describe(box)));

    return matches.length > 0 ? matches : boxes;
  },

  getHighlightTarget(box) {
    const linked = box.id
      ? document.querySelector(`label[for="${CSS.escape(box.id)}"]`)
      : null;

    return box.closest('label') || linked || box.parentElement || box;
  },

  showTermsError(box) {
    this.getHighlightTarget(box).classList.add('nh-terms-error');
    box.focus();
  },

  clearTermsError(form) {
    form.querySelectorAll('.nh-terms-error').forEach((el) => {
      el.classList.remove('nh-terms-error');
    });
  },

  submit(form) {
    if (this.submitting) return;

    const nameInput =
      document.getElementById('name') ||
      document.querySelector('input[type="text"]');

    const emailInput =
      document.getElementById('email') ||
      document.querySelector('input[type="email"]');

    const passwordInput =
      document.getElementById('password') ||
      document.querySelectorAll('input[type="password"]')[0];

    const confirmInput =
      document.getElementById('confirm-password') ||
      document.querySelectorAll('input[type="password"]')[1];

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const confirmPassword = confirmInput ? confirmInput.value : '';

    if (!name || !email || !password || !confirmPassword) {
      UI.showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }

    if (!Utils.validateEmail(email)) {
      UI.showToast('Por favor, insira um e-mail válido.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      UI.showToast('As senhas não coincidem. Digite novamente.', 'error');
      return;
    }

    this.clearTermsError(form);

    const pendingTerms = this.findTermsCheckboxes(form).find(box => !box.checked);

    if (pendingTerms) {
      this.showTermsError(pendingTerms);
      UI.showToast('Você precisa aceitar os termos para criar a conta.', 'error');
      return;
    }

    if (StorageDB.findUserByEmail(email)) {
      UI.showToast('Este e-mail já está cadastrado.', 'error');
      return;
    }

    const newUser = {
      id: Utils.generateUUID(),
      name,
      email,
      password,
      questionarioConcluido: false,
      respostasQuestionario: {},
      refeicoes: [],
      metas: [],
      planoAlimentar: [],
      configuracoes: {
        notificacoes: {
          refeicoes: true,
          agua: true,
          email: false
        },
        seguranca2FA: false
      }
    };

    const users = StorageDB.getUsers();
    users.push(newUser);

    if (!StorageDB.saveUsers(users)) return;

    this.submitting = true;

    Auth.createSession(newUser);

    UI.showToast('Conta criada com sucesso!', 'success');

    setTimeout(() => {
      window.location.replace(CONFIG.PATHS.QUESTIONARIO);
    }, 1000);
  }
};

const LoginModule = {
  submitting: false,

  init() {
    const form = document.querySelector('form');
    if (!form) return;

    FormGuard.bind(form, () => this.submit());
  },

  submit() {
    if (this.submitting) return;

    const emailInput =
      document.getElementById('email') ||
      document.querySelector('input[type="email"]');

    const passwordInput =
      document.getElementById('password') ||
      document.querySelector('input[type="password"]');

    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    if (!email || !password) {
      UI.showToast('Informe seu e-mail e senha.', 'error');
      return;
    }

    const user = StorageDB.findUserByEmail(email);

    if (!user || user.password !== password) {
      UI.showToast('E-mail ou senha incorretos.', 'error');
      return;
    }

    this.submitting = true;

    Auth.createSession(user);

    UI.showToast('Login efetuado com sucesso!', 'success');

    setTimeout(() => {
      window.location.replace(CONFIG.PATHS.HOME);
    }, 800);
  }
};

const QuestionnaireModule = {
  saving: false,

  init() {
    const user = Auth.getAuthenticatedUser();
    if (!user) return;

    const form = this.getForm();

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
      });
    }
  },

  getForm() {
    return document.getElementById('quiz-form') ||
      document.querySelector('form');
  },

  complete() {
    if (this.saving) return;

    const user = Auth.getAuthenticatedUser();

    if (!user) {
      window.location.replace(CONFIG.PATHS.LOGIN);
      return;
    }

    const form = this.getForm();
    const respostas = form ? this.collectAnswers(form) : {};
    const planoPerfil = this.readPlan();

    const updated = StorageDB.updateUserData(user.id, (u) => {
      u.questionarioConcluido = true;
      u.respostasQuestionario = respostas;
      u.planoPerfil = planoPerfil;
      u.questionarioConcluidoEm = new Date().toISOString();

      try {
        u.planoAlimentar = PlanGenerator.generate(u);
      } catch (error) {
        console.error('[NutriHub] Não foi possível gerar o plano alimentar:', error);
      }
    });

    if (!updated) {
      UI.showToast('Não foi possível salvar suas respostas.', 'error');
      return;
    }

    this.saving = true;

    UI.showToast('Questionário salvo com sucesso!', 'success');

    setTimeout(() => {
      window.location.replace(CONFIG.PATHS.HOME);
    }, 600);
  },

  readPlan() {
    const text = (id) => {
      const el = document.getElementById(id);
      return el ? el.textContent.trim() : '';
    };

    return {
      dieta: {
        titulo: text('diet-name'),
        descricao: text('diet-desc')
      },
      rotina: {
        titulo: text('routine-name'),
        descricao: text('routine-desc')
      }
    };
  },

  collectAnswers(form) {
    const answers = {};

    form.querySelectorAll('input, select, textarea').forEach((el) => {
      const key = el.name || el.id;

      if (!key) return;

      if (['submit', 'button', 'reset', 'file'].includes(el.type)) return;

      if (
        (el.type === 'radio' || el.type === 'checkbox') &&
        !el.checked
      ) return;

      const value = typeof el.value === 'string'
        ? el.value.trim()
        : el.value;

      if (Object.prototype.hasOwnProperty.call(answers, key)) {
        if (!Array.isArray(answers[key])) {
          answers[key] = [answers[key]];
        }

        answers[key].push(value);
      } else {
        answers[key] = value;
      }
    });

    return answers;
  }
};

const WelcomeModal = {
  init(user) {
    const modal = document.getElementById('welcome-modal');

    if (!modal || user.boasVindasVisto) return;

    const title = document.getElementById('welcome-modal-title');

    if (title) {
      title.textContent =
        `Boas-vindas ao NutriHub, ${user.name.split(' ')[0]}! 🎉`;
    }

    const markSeen = () => {
      StorageDB.updateUserData(user.id, (u) => {
        u.boasVindasVisto = true;
      });
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') close();
    };

    const close = () => {
      markSeen();
      modal.hidden = true;
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeydown);
    };

    const closeBtn = document.getElementById('welcome-close');
    const laterBtn = document.getElementById('welcome-later');
    const configLink = document.getElementById('welcome-go-config');

    if (closeBtn) closeBtn.addEventListener('click', close);
    if (laterBtn) laterBtn.addEventListener('click', close);
    if (configLink) configLink.addEventListener('click', markSeen);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', onKeydown);

    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    if (configLink) configLink.focus();
  }
};

const GoalSync = {

  compute(u) {
    let changed = false;

    const water = Utils.waterTotalForDate(u.refeicoes, Utils.todayISO());

    (u.metas || []).forEach((meta) => {
      if (!Utils.isHydrationGoal(meta)) return;

      const factor = Utils.unitToMl(meta.unit);
      const current = Math.round((water / factor) * 100) / 100;
      const target = Number(meta.target || 0);
      const done = target > 0 && current >= target;

      if (meta.current !== current || meta.concluida !== done) {
        meta.current = current;
        meta.concluida = done;
        changed = true;
      }
    });

    return changed;
  },

  ensureHydrationGoal(u) {
    if (!Array.isArray(u.metas)) u.metas = [];

    if (u.metas.some(Utils.isHydrationGoal, Utils)) return false;

    u.metas.push({
      id: 'goal_' + Date.now().toString(36) + '_' +
        Math.random().toString(36).substring(2, 6),
      title: 'Beber água',
      category: 'Hidratação',
      target: CONFIG.WATER_DEFAULT_GOAL_ML,
      current: 0,
      unit: 'ml',
      frequencia: 'diaria',
      concluida: false,
      automatica: true,
      createdAt: new Date().toISOString()
    });

    return true;
  },

  ensureFresh(user) {
    if (!user) return user;

    const copy = JSON.parse(JSON.stringify(user));

    if (!this.compute(copy)) return user;

    return StorageDB.updateUserData(user.id, (u) => {
      this.compute(u);
    }) || user;
  }
};

const ChartRenderer = {
  bars(container, items, options = {}) {
    if (!container) return;

    const {
      unitLabel = 'registro(s)',
      formatValue = (v) => (v > 0 ? String(v) : ''),
      formatTitle = (item) => `${item.label}: ${item.value} ${unitLabel}`,
      minMax = 4
    } = options;

    container.innerHTML = '';

    const maxValue = Math.max(...items.map(i => i.value), minMax);

    items.forEach((item) => {
      const heightPercent = Math.max(
        Math.round((item.value / maxValue) * 100),
        item.value > 0 ? 15 : 4
      );

      const wrapper = document.createElement('div');
      wrapper.className = 'chart-bar-wrapper';
      wrapper.title = formatTitle(item);

      wrapper.innerHTML = `
        <span class="chart-bar-value">${Utils.sanitizeHTML(formatValue(item.value))}</span>
        <div class="chart-bar-track">
          <div class="chart-bar-fill ${item.value > 0 ? 'has-value' : ''}"
               style="height: ${heightPercent}%;"></div>
        </div>
        <span class="chart-bar-label">${Utils.sanitizeHTML(item.label)}</span>
      `;

      container.appendChild(wrapper);
    });
  }
};

const MealService = {
  TYPE_LABELS: {
    'café': 'Café da manhã',
    'almoço': 'Almoço',
    'lanche': 'Lanche',
    'jantar': 'Jantar',
    'ceia': 'Ceia',
    'hidratação': 'Hidratação (Água)',
    'outro': 'Refeição'
  },

  TYPE_ICONS: {
    'café': '☕',
    'almoço': '🍽️',
    'lanche': '🍎',
    'jantar': '🍲',
    'ceia': '🌙',
    'hidratação': '💧',
    'outro': '🍴'
  },

  normalizeType(raw) {
    const value = Utils.normalize(raw);

    if (value.includes('hidrat') || value.includes('agua')) return 'hidratação';
    if (value.includes('lanche')) return 'lanche';
    if (value.includes('almoco')) return 'almoço';
    if (value.includes('jantar')) return 'jantar';
    if (value.includes('ceia')) return 'ceia';
    if (value.includes('cafe') || value.includes('manha')) return 'café';

    return 'outro';
  },

  add(userId, data) {
    const type = this.normalizeType(data.type);
    const waterAmount = Number(data.waterAmount) > 0
      ? Number(data.waterAmount)
      : 0;

    const foods = Array.isArray(data.foods)
      ? data.foods
          .map((f, i) => {
            const cal = f.calories === null || f.calories === undefined || f.calories === ''
              ? null
              : Number(f.calories);

            return {
              id: f.id || 'food_' + Date.now().toString(36) + '_' + i,
              name: String(f.name || '').trim(),
              portion: String(f.portion || '').trim(),
              calories: Number.isFinite(cal) ? cal : null
            };
          })
          .filter(f => f.name)
      : [];

    const calories = foods.reduce((t, f) => t + (f.calories || 0), 0);

    const meal = {
      id: 'meal_' + Date.now().toString(36) + '_' +
        Math.random().toString(36).substring(2, 8),
      date: data.date,
      time: data.time,
      type,
      title: data.title || this.TYPE_LABELS[type],
      description: data.description || '',
      local: data.local || '',
      foods,
      calories,
      waterAmount,
      createdAt: new Date().toISOString()
    };

    const updated = StorageDB.updateUserData(userId, (u) => {
      if (!Array.isArray(u.refeicoes)) u.refeicoes = [];

      u.refeicoes.push(meal);

      if (waterAmount > 0) GoalSync.ensureHydrationGoal(u);

      GoalSync.compute(u);
    });

    return updated ? meal : null;
  },

  remove(userId, mealId) {
    return StorageDB.updateUserData(userId, (u) => {
      u.refeicoes = (u.refeicoes || []).filter(m => m.id !== mealId);
      GoalSync.compute(u);
    });
  },

  filter(meals, options = {}) {
    const {
      term = '',
      period = 'all',
      type = 'all',
      date = ''
    } = options;

    const query = String(term).trim().toLowerCase();
    const today = Utils.parseLocalDate(Utils.todayISO());

    let from = null;

    if (period === 'today') {
      from = today;
    } else if (period === '7days') {
      from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    } else if (period === '30days') {
      from = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29);
    }

    return meals.filter((m) => {
      if (type !== 'all' && m.type !== type) return false;

      if (date) {
        if (m.date !== date) return false;
      } else if (from && Utils.parseLocalDate(m.date) < from) {
        return false;
      }

      if (query) {
        const haystack =
          `${m.title || ''} ${m.description || ''} ${this.TYPE_LABELS[m.type] || ''}`
            .toLowerCase();

        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  },

  groupByDate(meals) {
    const map = meals.reduce((acc, meal) => {
      if (!acc[meal.date]) acc[meal.date] = [];
      acc[meal.date].push(meal);
      return acc;
    }, {});

    return Object.keys(map)
      .sort((a, b) => b.localeCompare(a))
      .map(date => ({
        date,
        meals: map[date].sort(
          (a, b) => (a.time || '').localeCompare(b.time || '')
        )
      }));
  }
};

const MealRenderer = {
  renderGrouped(container, meals, options = {}) {
    if (!container) return;

    const { withActions = false, showDate = true } = options;

    container.innerHTML = '';

    MealService.groupByDate(meals).forEach((group) => {
      const section = document.createElement('section');
      section.className = 'meal-day-group';

      if (showDate) {
        const header = document.createElement('h3');
        header.className = 'meal-day-title';
        header.textContent = Utils.formatDateLong(group.date);
        section.appendChild(header);
      }

      group.meals.forEach((meal) => {
        section.appendChild(this.createCard(meal, withActions));
      });

      container.appendChild(section);
    });
  },

  createCard(meal, withActions) {
    const isWater = Utils.isWaterRecord(meal);
    const label = MealService.TYPE_LABELS[meal.type] || 'Refeição';
    const icon = MealService.TYPE_ICONS[meal.type] || '🍴';
    const esc = (value) => Utils.sanitizeHTML(value);
    const title = meal.title || label;

    const article = document.createElement('article');
    article.className =
      `meal-card ${isWater ? 'is-water' : 'is-food'} ` +
      `meal-type-${Utils.normalize(meal.type) || 'outro'}`;
    article.dataset.mealId = meal.id;

    const chips = [];

    if (Utils.normalize(title) !== Utils.normalize(label)) {
      chips.push(`<span class="meal-card-type">${esc(label)}</span>`);
    }

    if (meal.local) {
      chips.push(`<span class="meal-card-local">📍 ${esc(meal.local)}</span>`);
    }

    if (Number(meal.waterAmount) > 0) {
      chips.push(`<span class="meal-card-water">💧 ${esc(Utils.formatMl(meal.waterAmount))}</span>`);
    }

    if (Number(meal.calories) > 0) {
      chips.push(`<span class="meal-card-kcal">🔥 ${Math.round(meal.calories)} kcal</span>`);
    }

    const metaHTML = chips.length
      ? `<div class="meal-card-meta">${chips.join('')}</div>`
      : '';

    let foodsHTML = '';

    if (Array.isArray(meal.foods) && meal.foods.length > 0) {
      const items = meal.foods.map((f) => {
        const portion = f.portion
          ? `<span class="meal-food-portion">${esc(f.portion)}</span>`
          : '';

        const kcal = f.calories !== null && f.calories !== undefined
          ? `<span class="meal-food-kcal">${esc(String(f.calories))} kcal</span>`
          : '';

        return `<li><span class="meal-food-name">${esc(f.name)}</span>${portion}${kcal}</li>`;
      }).join('');

      foodsHTML = `<ul class="meal-card-foods">${items}</ul>`;
    }

    const descHTML = meal.description
      ? `<p class="meal-card-desc">${esc(meal.description)}</p>`
      : '';

    const actionsHTML = withActions
      ? `<div class="meal-card-actions">
           <button type="button"
                   class="btn-delete-meal"
                   data-delete-meal
                   data-id="${Utils.escapeAttr(meal.id)}"
                   aria-label="Excluir registro">Excluir</button>
         </div>`
      : '';

    article.innerHTML = `
      <div class="meal-card-icon" aria-hidden="true">${icon}</div>
      <div class="meal-card-body">
        <div class="meal-card-top">
          <h4 class="meal-card-title">${esc(title)}</h4>
          <span class="meal-card-time">${esc(meal.time || '')}</span>
        </div>
        ${metaHTML}
        ${foodsHTML}
        ${descHTML}
      </div>
      ${actionsHTML}
    `;

    return article;
  }
};

const HomeModule = {
  chartDaysPeriod: 7,

  init() {
    let user = Auth.getAuthenticatedUser();
    if (!user) return;

    UI.injectWaterEffects();
    UI.injectHomeMealStyles();

    user = GoalSync.ensureFresh(user);

    const welcomeTitle = document.querySelector('.page-title');

    if (welcomeTitle) {
      welcomeTitle.textContent = `Olá, ${user.name.split(' ')[0]}! 👋`;
    }

    this.fillAnswers(user);
    this.fillPlan(user);
    this.refreshAll(user);
    this.setupWaterModal();
    this.setupChartFilters();
    WelcomeModal.init(user);
  },

  refreshAll(user) {
    this.renderMetrics(user);
    this.renderWaterSummary(user);
    this.renderTodayMeals(user);
    this.renderEvolutionChart(user);
  },

  fillAnswers(user) {
    const respostas = user.respostasQuestionario || {};

    document.querySelectorAll('[data-resposta]').forEach((el) => {
      const value = respostas[el.dataset.resposta];

      if (value === undefined || value === '') return;

      el.textContent = Array.isArray(value) ? value.join(', ') : value;
    });
  },

  fillPlan(user) {
    const plano = user.planoPerfil || {};

    document.querySelectorAll('[data-plano]').forEach((el) => {
      const [grupo, campo] = el.dataset.plano.split('.');
      const value = plano[grupo] && plano[grupo][campo];

      if (value) el.textContent = value;
    });
  },

  getHydrationGoal(user) {
    return (user.metas || []).find(Utils.isHydrationGoal, Utils) || null;
  },

  getHydrationTargetMl(user) {
    const goal = this.getHydrationGoal(user);
    if (!goal) return 0;

    return Number(goal.target || 0) * Utils.unitToMl(goal.unit);
  },

  renderMetrics(user) {
    const todayStr = Utils.todayISO();
    const records = user.refeicoes || [];

    const todayMeals = Utils.mealsOnly(records).filter(m => m.date === todayStr);
    const waterToday = Utils.waterTotalForDate(records, todayStr);

    const valMeals = document.getElementById('val-home-meals');
    const subMeals = document.getElementById('sub-home-meals');
    const valProgress = document.getElementById('val-home-progress');
    const fillProgress = document.getElementById('fill-home-progress');
    const valGoals = document.getElementById('val-home-goals');
    const tagGoals = document.getElementById('tag-home-goals');
    const valStreak = document.getElementById('val-home-streak');

    if (valMeals) valMeals.textContent = todayMeals.length.toString();

    if (subMeals) {
      subMeals.textContent = todayMeals.length === 0
        ? 'Nenhum registro efetuado'
        : `${todayMeals.length} registro(s) hoje`;
    }

    const metas = user.metas || [];
    const activeGoals = metas.filter(m => !m.concluida);
    const completedGoals = metas.filter(m => m.concluida);

    const components = [
      Math.min(todayMeals.length / CONFIG.DAILY_MEALS_TARGET, 1)
    ];

    const targetMl = this.getHydrationTargetMl(user);
    if (targetMl > 0) components.push(Math.min(waterToday / targetMl, 1));

    if (metas.length > 0) components.push(completedGoals.length / metas.length);

    const progressPercent = Math.round(
      (components.reduce((a, b) => a + b, 0) / components.length) * 100
    );

    if (valProgress) valProgress.textContent = `${progressPercent}%`;
    if (fillProgress) fillProgress.style.width = `${progressPercent}%`;

    if (valGoals) valGoals.textContent = activeGoals.length.toString();

    if (tagGoals) {
      tagGoals.textContent = metas.length === 0
        ? 'Nenhuma meta definida'
        : `${activeGoals.length} ativa(s) · ${completedGoals.length} concluída(s)`;
    }

    if (valStreak) {
      const streak = Utils.computeStreak(records);
      valStreak.textContent = streak.toString();

      const card = valStreak.closest('.metric-card');
      const sub = card ? card.querySelector('.metric-subtext') : null;

      if (sub) {
        sub.textContent = streak === 0
          ? 'Comece seu primeiro dia'
          : streak === 1
            ? 'Dia seguido com registros'
            : 'Dias seguidos com registros';
      }
    }
  },

  renderWaterSummary(user) {
    const today = Utils.todayISO();
    const waterToday = Utils.waterTotalForDate(user.refeicoes, today);
    const targetMl = this.getHydrationTargetMl(user);

    const percent = targetMl > 0
      ? Math.min(Math.round((waterToday / targetMl) * 100), 100)
      : 0;

    const totalEl = document.getElementById('home-water-total');
    const fillEl = document.getElementById('home-water-fill');
    const goalEl = document.getElementById('home-water-goal');
    const captionEl = document.getElementById('water-summary-caption');
    const progressEl = document.getElementById('home-water-progressbar');

    if (totalEl) totalEl.textContent = Utils.formatMl(waterToday);

    if (fillEl) fillEl.style.width = `${percent}%`;

    if (progressEl) progressEl.setAttribute('aria-valuenow', String(percent));

    if (goalEl) {
      goalEl.textContent = targetMl > 0
        ? `${Math.round(waterToday).toLocaleString('pt-BR')} ml de ${targetMl.toLocaleString('pt-BR')} ml · ${percent}% da meta`
        : 'Registre sua primeira ingestão para criar a meta de hidratação.';
    }

    if (captionEl) {
      captionEl.textContent = waterToday <= 0
        ? 'Ainda não há ingestão de água registrada hoje.'
        : percent >= 100
          ? 'Parabéns! Você bateu a meta de hidratação de hoje. 🎉'
          : 'Sua ingestão registrada ao longo do dia.';
    }
  },

  renderTodayMeals(user) {
    const emptyBox = document.getElementById('home-empty-today');
    const mealsList = document.getElementById('home-today-meals-list');
    const todayStr = Utils.todayISO();

    const todayRecords = (user.refeicoes || []).filter(m => m.date === todayStr);

    if (todayRecords.length === 0) {
      if (emptyBox) emptyBox.style.display = 'flex';

      if (mealsList) {
        mealsList.hidden = true;
        mealsList.innerHTML = '';
      }
    } else {
      if (emptyBox) emptyBox.style.display = 'none';

      if (mealsList) {
        mealsList.hidden = false;
        MealRenderer.renderGrouped(mealsList, todayRecords, {
          withActions: false,
          showDate: false
        });
      }
    }
  },

  renderEvolutionChart(user) {
    const container = document.getElementById('evolution-chart-bars');
    const summaryText = document.getElementById('chart-summary-text');

    if (!container) return;

    const records = user.refeicoes || [];
    const days = this.chartDaysPeriod;

    const series = Utils.buildDailySeries(
      days,
      (dateISO) => records.filter(m => m.date === dateISO).length
    );

    const total = series.reduce((sum, item) => sum + item.value, 0);

    if (summaryText) {
      summaryText.textContent =
        `${total} registro(s) efetuado(s) nos últimos ${days} dias.`;
    }

    ChartRenderer.bars(container, series, { unitLabel: 'registro(s)' });
  },

  setupChartFilters() {
    const filterBtns = document.querySelectorAll('[data-chart-period]');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.chartDaysPeriod = parseInt(btn.dataset.chartPeriod || '7', 10) || 7;

        const current = Auth.getAuthenticatedUser();
        if (current) this.renderEvolutionChart(current);
      });
    });
  },

  setupWaterModal() {
    const modal = document.getElementById('water-modal');
    const btnOpen = document.getElementById('btn-open-water-modal');
    const btnOpenCard = document.getElementById('btn-open-water-card');
    const btnClose = document.getElementById('btn-close-water-modal');
    const btnCancel = document.getElementById('btn-cancel-water-modal');
    const form = document.getElementById('water-quick-form');
    const inputWater = document.getElementById('modal-water-input');
    const quickBtns = document.querySelectorAll('.btn-water-quick');

    if (!modal) return;

    const clearSelection = () => {
      quickBtns.forEach(option => option.classList.remove('selected'));
    };

    const open = () => {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';

      if (inputWater) {
        setTimeout(() => inputWater.focus(), 60);
      }
    };

    const close = () => {
      modal.hidden = true;
      document.body.style.overflow = '';

      if (form) form.reset();
      clearSelection();
    };

    if (btnOpen) btnOpen.addEventListener('click', open);
    if (btnOpenCard) btnOpenCard.addEventListener('click', open);
    if (btnClose) btnClose.addEventListener('click', close);
    if (btnCancel) btnCancel.addEventListener('click', close);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) close();
    });

    quickBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (inputWater) inputWater.value = btn.dataset.amount;

        clearSelection();
        btn.classList.add('selected');
      });
    });

    if (inputWater) {
      inputWater.addEventListener('input', clearSelection);
    }

    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const currentUser = Auth.getAuthenticatedUser();

      if (!currentUser) {
        window.location.replace(CONFIG.PATHS.LOGIN);
        return;
      }

      const waterAmount = parseFloat(inputWater ? inputWater.value : '0');

      if (!Number.isFinite(waterAmount) || waterAmount <= 0) {
        UI.showToast('Informe uma quantidade de água válida em ml.', 'error');
        return;
      }

      if (waterAmount > CONFIG.WATER_MAX_ML) {
        UI.showToast(
          `Informe no máximo ${CONFIG.WATER_MAX_ML} ml por registro.`,
          'error'
        );
        return;
      }

      const meal = MealService.add(currentUser.id, {
        date: Utils.todayISO(),
        time: new Date().toTimeString().slice(0, 5),
        type: 'hidratação',
        title: 'Registro de Hidratação',
        description: '',
        waterAmount: Math.round(waterAmount)
      });

      if (!meal) {
        UI.showToast('Não foi possível registrar a água.', 'error');
        return;
      }

      UI.showToast(
        `💧 ${Math.round(waterAmount)} ml de água registrados com sucesso!`,
        'success'
      );

      close();

      const fresh = Auth.getAuthenticatedUser();
      if (fresh) this.refreshAll(fresh);
    });
  }
};

const HistoricoModule = {
  IDS: {
    total: ['stat-total', 'val-hist-total', 'hist-total', 'val-total-records', 'val-total', 'total-registros'],
    week: ['stat-week', 'val-hist-week', 'hist-week', 'val-week', 'registros-semana'],
    month: ['stat-month', 'val-hist-month', 'hist-month', 'val-month', 'registros-mes'],
    last: ['stat-last', 'val-hist-last', 'hist-last', 'val-last', 'ultimo-registro'],
    list: ['history-list', 'hist-list', 'meals-list', 'historico-list', 'list-view', 'hist-meals-list'],
    emptyState: ['history-empty', 'hist-empty', 'empty-state', 'meals-empty', 'history-empty-state', 'hist-empty-state'],
    calendar: ['calendar-view', 'history-calendar', 'hist-calendar', 'calendar-container'],
    calTitle: ['cal-month-name', 'calendar-title', 'cal-title', 'calendar-month-title', 'calendar-month'],
    calGrid: ['cal-days-grid', 'calendar-grid', 'cal-grid', 'history-calendar-grid', 'calendar-days'],
    calPrev: ['calendar-prev', 'cal-prev', 'btn-prev-month', 'btn-cal-prev'],
    calNext: ['calendar-next', 'cal-next', 'btn-next-month', 'btn-cal-next'],
    btnList: ['btn-view-list', 'view-list', 'btn-list-view', 'btn-list'],
    btnCalendar: ['btn-view-calendar', 'view-calendar', 'btn-calendar-view', 'btn-calendar'],
    search: ['hist-search', 'search-input', 'filter-search', 'history-search', 'search-meals'],
    period: ['filter-period', 'hist-period', 'period-filter', 'history-period', 'select-period'],
    type: ['filter-type', 'hist-type', 'type-filter', 'history-type', 'select-type'],
    date: ['filter-date', 'hist-date', 'date-filter', 'history-date', 'input-date'],
    clear: ['btn-clear-filters', 'clear-filters', 'hist-clear', 'btn-clear']
  },

  els: {},
  emptyDefaults: null,

  state: {
    term: '',
    period: 'all',
    type: 'all',
    date: '',
    view: 'list',
    calendarMonth: new Date().getMonth(),
    calendarYear: new Date().getFullYear()
  },

  init() {
    const user = Auth.getAuthenticatedUser();
    if (!user) return;

    UI.injectWaterEffects();

    this.cacheEls();
    this.bindEvents();
    this.setView('list');
    this.refresh();
  },

  cacheEls() {
    Object.keys(this.IDS).forEach((key) => {
      this.els[key] = Utils.pick(this.IDS[key]);
    });
  },

  normalizePeriod(value) {
    const v = Utils.normalize(value);

    if (['', 'all', 'todos', 'tudo', 'todo'].includes(v)) return 'all';
    if (['today', 'hoje'].includes(v)) return 'today';
    if (['7', '7days', '7dias', '7 dias', 'week', 'semana'].includes(v)) return '7days';
    if (['30', '30days', '30dias', '30 dias', 'month', 'mes'].includes(v)) return '30days';

    return 'all';
  },

  normalizeType(value) {
    const v = Utils.normalize(value);

    if (['', 'all', 'todos', 'todas', 'todo'].includes(v)) return 'all';

    return MealService.normalizeType(value);
  },

  bindEvents() {
    const { search, period, type, date, clear, btnList, btnCalendar, calPrev, calNext, list } = this.els;

    if (search) {
      search.addEventListener('input', () => {
        this.state.term = search.value;
        this.refresh();
      });
    }

    if (period) {
      period.addEventListener('change', () => {
        this.state.period = this.normalizePeriod(period.value);
        this.refresh();
      });
    }

    if (type) {
      type.addEventListener('change', () => {
        this.state.type = this.normalizeType(type.value);
        this.refresh();
      });
    }

    if (date) {
      date.addEventListener('change', () => {
        this.state.date = date.value || '';
        this.refresh();
      });
    }

    if (clear) {
      clear.addEventListener('click', () => this.clearFilters());
    }

    if (btnList) btnList.addEventListener('click', () => this.setView('list'));
    if (btnCalendar) btnCalendar.addEventListener('click', () => this.setView('calendar'));
    if (calPrev) calPrev.addEventListener('click', () => this.shiftMonth(-1));
    if (calNext) calNext.addEventListener('click', () => this.shiftMonth(1));

    if (list) {
      list.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-delete-meal], .btn-delete-meal');
        if (!btn) return;

        const mealId = btn.dataset.id || btn.dataset.deleteMeal;
        if (!mealId) return;

        if (!window.confirm('Deseja excluir este registro?')) return;

        const current = Auth.getAuthenticatedUser();
        if (!current) return;

        MealService.remove(current.id, mealId);

        UI.showToast('Registro excluído com sucesso.', 'success');
        this.refresh();
      });
    }
  },

  clearFilters() {
    this.state.term = '';
    this.state.period = 'all';
    this.state.type = 'all';
    this.state.date = '';

    const { search, period, type, date } = this.els;

    if (search) search.value = '';
    if (period) period.value = 'all';
    if (type) type.value = 'all';
    if (date) date.value = '';

    this.refresh();
  },

  refresh() {
    const user = Auth.getAuthenticatedUser();
    if (!user) return;

    const meals = MealService.filter(user.refeicoes || [], this.state);

    this.renderStats(user);
    this.renderList(meals, (user.refeicoes || []).length > 0);
    this.renderCalendar(user);
  },

  renderStats(user) {
    const meals = user.refeicoes || [];

    const now = new Date();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const weekMeals = meals.filter(m => Utils.parseLocalDate(m.date) >= weekStart);
    const monthMeals = meals.filter(m => Utils.parseLocalDate(m.date) >= monthStart);

    const lastMeal = [...meals].sort((a, b) =>
      `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`)
    )[0];

    if (this.els.total) this.els.total.textContent = String(meals.length);
    if (this.els.week) this.els.week.textContent = String(weekMeals.length);
    if (this.els.month) this.els.month.textContent = String(monthMeals.length);

    if (this.els.last) {
      this.els.last.textContent = lastMeal
        ? Utils.formatDateBR(lastMeal.date)
        : 'Nenhuma';
    }
  },

  updateEmptyState(hasAnyRecord) {
    const { emptyState } = this.els;
    if (!emptyState) return;

    const title = emptyState.querySelector('.empty-title');
    const text = emptyState.querySelector('.empty-text');
    const cta = emptyState.querySelector('a');

    if (!this.emptyDefaults && title && text) {
      this.emptyDefaults = {
        title: title.textContent,
        text: text.textContent
      };
    }

    if (title && this.emptyDefaults) {
      title.textContent = hasAnyRecord
        ? 'Nenhuma refeição encontrada'
        : this.emptyDefaults.title;
    }

    if (text && this.emptyDefaults) {
      text.textContent = hasAnyRecord
        ? 'Não há registros para os filtros selecionados. Ajuste a busca ou limpe os filtros.'
        : this.emptyDefaults.text;
    }

    if (cta) Utils.toggle(cta, !hasAnyRecord);
  },

  renderList(meals, hasAnyRecord = false) {
    const { list, emptyState } = this.els;
    if (!list) return;

    list.innerHTML = '';
    this.updateEmptyState(hasAnyRecord);

    if (meals.length === 0) {
      Utils.toggle(emptyState, this.state.view === 'list');
      return;
    }

    Utils.toggle(emptyState, false);

    MealRenderer.renderGrouped(list, meals, {
      withActions: true,
      showDate: true
    });
  },

  setView(view) {
    this.state.view = view;

    const { list, calendar, btnList, btnCalendar, emptyState } = this.els;

    Utils.toggle(list, view === 'list');
    Utils.toggle(calendar, view === 'calendar');

    if (view === 'calendar') Utils.toggle(emptyState, false);

    if (btnList) btnList.classList.toggle('active', view === 'list');
    if (btnCalendar) btnCalendar.classList.toggle('active', view === 'calendar');

    if (view === 'list') this.refresh();
  },

  shiftMonth(direction) {
    this.state.calendarMonth += direction;

    if (this.state.calendarMonth < 0) {
      this.state.calendarMonth = 11;
      this.state.calendarYear--;
    }

    if (this.state.calendarMonth > 11) {
      this.state.calendarMonth = 0;
      this.state.calendarYear++;
    }

    const user = Auth.getAuthenticatedUser();
    if (user) this.renderCalendar(user);
  },

  renderCalendar(user) {
    const { calTitle, calGrid } = this.els;

    if (!calGrid) return;

    const year = this.state.calendarYear;
    const month = this.state.calendarMonth;

    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    if (calTitle) calTitle.textContent = `${monthNames[month]} ${year}`;

    calGrid.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const meals = user.refeicoes || [];

    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'cal-day is-empty';
      calGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = [
        year,
        String(month + 1).padStart(2, '0'),
        String(day).padStart(2, '0')
      ].join('-');

      const dayMeals = meals.filter(m => m.date === date);

      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cal-day';

      if (date === Utils.todayISO()) cell.classList.add('today');
      if (dayMeals.length > 0) cell.classList.add('has-meals');
      if (date === this.state.date) cell.classList.add('selected');

      cell.setAttribute('aria-label', `${day}: ${dayMeals.length} registro(s)`);

      cell.innerHTML = `
        <span class="cal-day-number">${day}</span>
        ${dayMeals.length
          ? `<span class="cal-day-count">${dayMeals.length}</span>`
          : ''}
      `;

      cell.addEventListener('click', () => {
        if (this.els.date) this.els.date.value = date;

        this.state.date = date;
        this.setView('list');
      });

      calGrid.appendChild(cell);
    }
  }
};

const RegistroModule = {
  foods: [],
  editingId: null,
  saving: false,
  els: {},

  init() {
    const user = Auth.getAuthenticatedUser();
    if (!user) return;

    UI.injectWaterEffects();

    const g = (id) => document.getElementById(id);

    this.els = {
      form: g('registro-form'),
      type: g('meal-type'),
      date: g('meal-date'),
      time: g('meal-time'),
      local: g('meal-local'),
      title: g('meal-title'),
      notes: g('meal-notes'),
      water: g('water-quantity'),
      btnWater200: g('btn-add-water-200'),
      btnWater500: g('btn-add-water-500'),
      foodName: g('food-name'),
      foodPortion: g('food-portion'),
      foodCalories: g('food-calories'),
      btnAddFood: g('btn-add-food'),
      btnCancelEdit: g('btn-cancel-food-edit'),
      foodsList: g('foods-list'),
      foodsTotal: g('foods-total')
    };

    if (!this.els.form) return;

    if (this.els.date && !this.els.date.value) {
      this.els.date.value = Utils.todayISO();
    }

    if (this.els.time && !this.els.time.value) {
      this.els.time.value = new Date().toTimeString().slice(0, 5);
    }

    this.foods = [];
    this.editingId = null;

    this.bindEvents();
    this.applyPrefill();
    this.renderFoods();
  },

  applyPrefill() {
    let raw = null;

    try {
      raw = sessionStorage.getItem(CONFIG.KEYS.PREFILL);
      sessionStorage.removeItem(CONFIG.KEYS.PREFILL);
    } catch (error) {
      return;
    }

    if (!raw) return;

    let data;

    try {
      data = JSON.parse(raw);
    } catch (error) {
      return;
    }

    const e = this.els;

    if (e.type && data.type && Array.from(e.type.options).some(option => option.value === data.type)) {
      e.type.value = data.type;
    }

    if (e.title && data.title) e.title.value = String(data.title).slice(0, 60);

    if (e.time && /^\d{2}:\d{2}$/.test(data.time || '')) e.time.value = data.time;

    this.foods = (Array.isArray(data.foods) ? data.foods : []).map((food, index) => ({
      id: 'food_' + Date.now().toString(36) + '_' + index,
      name: String(food.name || '').trim(),
      portion: String(food.portion || '').trim(),
      calories: Number.isFinite(Number(food.calories)) ? Number(food.calories) : null
    })).filter(food => food.name);

    if (this.foods.length > 0) {
      UI.showToast('Refeição do plano carregada. Ajuste o que for preciso e salve.', 'success');
    }
  },

  bindEvents() {
    const e = this.els;

    if (e.btnWater200) e.btnWater200.addEventListener('click', () => this.addWater(200));
    if (e.btnWater500) e.btnWater500.addEventListener('click', () => this.addWater(500));

    if (e.btnAddFood) {
      e.btnAddFood.addEventListener('click', () => this.addOrUpdateFood());
    }

    if (e.btnCancelEdit) {
      e.btnCancelEdit.addEventListener('click', () => this.cancelEdit());
    }

    [e.foodName, e.foodPortion, e.foodCalories].forEach((input) => {
      if (!input) return;

      input.addEventListener('keydown', (ev) => {
        if (ev.key !== 'Enter') return;

        ev.preventDefault();
        this.addOrUpdateFood();
      });
    });

    if (e.foodsList) {
      e.foodsList.addEventListener('click', (ev) => {
        const editBtn = ev.target.closest('[data-edit-food]');
        const removeBtn = ev.target.closest('[data-remove-food]');

        if (editBtn) this.startEdit(editBtn.dataset.editFood);
        if (removeBtn) this.removeFood(removeBtn.dataset.removeFood);
      });
    }

    e.form.addEventListener('submit', (ev) => this.save(ev));
  },

  addWater(amount) {
    const input = this.els.water;
    if (!input) return;

    const current = parseFloat(input.value);
    const next = (Number.isFinite(current) ? current : 0) + amount;

    if (next > CONFIG.WATER_MAX_ML) {
      UI.showToast(`O máximo por registro é ${CONFIG.WATER_MAX_ML} ml.`, 'error');
      input.value = String(CONFIG.WATER_MAX_ML);
      return;
    }

    input.value = String(next);
  },

  readFoodInputs() {
    const e = this.els;

    const name = e.foodName ? e.foodName.value.trim() : '';
    const portion = e.foodPortion ? e.foodPortion.value.trim() : '';
    const caloriesRaw = e.foodCalories ? e.foodCalories.value.trim() : '';

    return {
      name,
      portion,
      caloriesRaw,
      calories: caloriesRaw === '' ? null : parseFloat(caloriesRaw)
    };
  },

  clearFoodInputs() {
    const e = this.els;

    if (e.foodName) e.foodName.value = '';
    if (e.foodPortion) e.foodPortion.value = '';
    if (e.foodCalories) e.foodCalories.value = '';
  },

  addOrUpdateFood() {
    const e = this.els;
    const input = this.readFoodInputs();

    if (!input.name) {
      UI.showToast('Informe o nome do alimento.', 'error');
      if (e.foodName) e.foodName.focus();
      return false;
    }

    if (
      input.calories !== null &&
      (!Number.isFinite(input.calories) || input.calories < 0 || input.calories > 10000)
    ) {
      UI.showToast('Informe calorias válidas (de 0 a 10000 kcal).', 'error');
      if (e.foodCalories) e.foodCalories.focus();
      return false;
    }

    if (this.editingId) {
      const item = this.foods.find(f => f.id === this.editingId);

      if (item) {
        item.name = input.name;
        item.portion = input.portion;
        item.calories = input.calories;
      }

      UI.showToast('Item atualizado.', 'success');
      this.exitEditMode();
    } else {
      this.foods.push({
        id: 'food_' + Date.now().toString(36) + '_' +
          Math.random().toString(36).substring(2, 6),
        name: input.name,
        portion: input.portion,
        calories: input.calories
      });

      UI.showToast(`"${input.name}" adicionado à refeição.`, 'success');
    }

    this.clearFoodInputs();
    this.renderFoods();

    if (e.foodName) e.foodName.focus();

    return true;
  },

  startEdit(foodId) {
    const item = this.foods.find(f => f.id === foodId);
    if (!item) return;

    const e = this.els;

    this.editingId = foodId;

    if (e.foodName) e.foodName.value = item.name;
    if (e.foodPortion) e.foodPortion.value = item.portion || '';
    if (e.foodCalories) {
      e.foodCalories.value = item.calories === null ? '' : String(item.calories);
    }

    if (e.btnAddFood) e.btnAddFood.textContent = 'Salvar alteração';
    Utils.toggle(e.btnCancelEdit, true);

    this.renderFoods();

    if (e.foodName) e.foodName.focus();
  },

  exitEditMode() {
    this.editingId = null;

    if (this.els.btnAddFood) this.els.btnAddFood.textContent = '+ Adicionar Item';
    Utils.toggle(this.els.btnCancelEdit, false);
  },

  cancelEdit() {
    this.exitEditMode();
    this.clearFoodInputs();
    this.renderFoods();
  },

  removeFood(foodId) {
    if (this.editingId === foodId) {
      this.exitEditMode();
      this.clearFoodInputs();
    }

    this.foods = this.foods.filter(f => f.id !== foodId);
    this.renderFoods();
  },

  renderFoods() {
    const { foodsList, foodsTotal } = this.els;
    if (!foodsList) return;

    foodsList.innerHTML = '';

    if (this.foods.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-food-msg';
      empty.textContent = 'Nenhum alimento adicionado até o momento.';
      foodsList.appendChild(empty);

      Utils.toggle(foodsTotal, false);
      return;
    }

    this.foods.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'food-item' + (item.id === this.editingId ? ' is-editing' : '');
      li.dataset.foodId = item.id;

      const meta = [];
      if (item.portion) meta.push(Utils.sanitizeHTML(item.portion));
      if (item.calories !== null) {
        meta.push(`${Utils.sanitizeHTML(String(item.calories))} kcal`);
      }

      li.innerHTML = `
        <div class="food-item-info">
          <span class="food-item-name">${Utils.sanitizeHTML(item.name)}</span>
          ${meta.length ? `<span class="food-item-meta">${meta.join(' · ')}</span>` : ''}
        </div>
        <div class="food-item-actions">
          <button type="button" class="btn-food-edit"
                  data-edit-food="${Utils.escapeAttr(item.id)}">Editar</button>
          <button type="button" class="btn-food-remove"
                  data-remove-food="${Utils.escapeAttr(item.id)}">Remover</button>
        </div>
      `;

      foodsList.appendChild(li);
    });

    if (foodsTotal) {
      const totalKcal = this.foods.reduce((t, f) => t + (f.calories || 0), 0);
      const count = this.foods.length;

      foodsTotal.textContent =
        `${count} ${count === 1 ? 'item' : 'itens'} na refeição` +
        (totalKcal > 0 ? ` · ${Math.round(totalKcal)} kcal no total` : '');

      Utils.toggle(foodsTotal, true);
    }
  },

  save(ev) {
    ev.preventDefault();

    if (this.saving) return;

    const user = Auth.getAuthenticatedUser();

    if (!user) {
      window.location.replace(CONFIG.PATHS.LOGIN);
      return;
    }

    const e = this.els;
    const typeRaw = e.type ? e.type.value : '';

    if (!typeRaw) {
      UI.showToast('Selecione o tipo da refeição.', 'error');
      if (e.type) e.type.focus();
      return;
    }

    const type = MealService.normalizeType(typeRaw);
    const date = (e.date && e.date.value) || Utils.todayISO();
    const time = (e.time && e.time.value) || new Date().toTimeString().slice(0, 5);

    const waterRaw = e.water ? parseFloat(e.water.value) : 0;
    const waterAmount = Number.isFinite(waterRaw) && waterRaw > 0 ? Math.round(waterRaw) : 0;

    if (waterAmount > CONFIG.WATER_MAX_ML) {
      UI.showToast(`O máximo por registro é ${CONFIG.WATER_MAX_ML} ml.`, 'error');
      return;
    }

    if (type !== 'hidratação' && e.foodName && e.foodName.value.trim()) {
      if (!this.addOrUpdateFood()) return;
    }

    if (type === 'hidratação') {
      if (waterAmount <= 0) {
        UI.showToast('Informe a quantidade de água em ml.', 'error');
        if (e.water) e.water.focus();
        return;
      }
    } else if (this.foods.length === 0) {
      UI.showToast('Adicione pelo menos um alimento à refeição.', 'error');
      if (e.foodName) e.foodName.focus();
      return;
    }

    const meal = MealService.add(user.id, {
      date,
      time,
      type,
      title: e.title ? e.title.value.trim() : '',
      description: e.notes ? e.notes.value.trim() : '',
      local: e.local ? e.local.value : '',
      foods: type === 'hidratação' ? [] : this.foods,
      waterAmount
    });

    if (!meal) {
      UI.showToast('Não foi possível salvar o registro.', 'error');
      return;
    }

    this.saving = true;

    const saveBtn = document.getElementById('btn-save-meal');
    if (saveBtn) saveBtn.disabled = true;

    UI.showToast('Refeição salva com sucesso!', 'success');

    setTimeout(() => {
      window.location.replace(CONFIG.PATHS.HISTORICO);
    }, 800);
  }
};

const PlanData = {
  DAYS: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],

  DAY_NAMES: {
    seg: 'Segunda-feira',
    ter: 'Terça-feira',
    qua: 'Quarta-feira',
    qui: 'Quinta-feira',
    sex: 'Sexta-feira',
    sab: 'Sábado',
    dom: 'Domingo'
  },

  SLOT_LABELS: {
    cafe: 'Café da manhã',
    lanche1: 'Lanche da manhã',
    almoco: 'Almoço',
    lanche2: 'Lanche da tarde',
    jantar: 'Jantar',
    ceia: 'Ceia'
  },

  SLOT_ICONS: {
    cafe: '☕',
    lanche1: '🍎',
    almoco: '🍽️',
    lanche2: '🥜',
    jantar: '🍲',
    ceia: '🌙'
  },

  SLOT_LIBRARY: {
    cafe: 'cafe',
    lanche1: 'lanche',
    almoco: 'almoco',
    lanche2: 'lanche',
    jantar: 'jantar',
    ceia: 'ceia'
  },

  REGISTER_TYPES: {
    cafe: 'café da manhã',
    lanche1: 'lanche da tarde',
    almoco: 'almoço',
    lanche2: 'lanche da tarde',
    jantar: 'jantar',
    ceia: 'ceia'
  },

  STRUCTURES: {
    4: [['cafe', 0.27], ['almoco', 0.38], ['lanche2', 0.10], ['jantar', 0.25]],
    5: [['cafe', 0.22], ['lanche1', 0.10], ['almoco', 0.30], ['lanche2', 0.13], ['jantar', 0.25]],
    6: [['cafe', 0.20], ['lanche1', 0.10], ['almoco', 0.28], ['lanche2', 0.12], ['jantar', 0.20], ['ceia', 0.10]]
  },

  TIMES: {
    trabalho: { cafe: '07:00', lanche1: '10:00', almoco: '12:30', lanche2: '16:00', jantar: '19:30', ceia: '22:00' },
    estudo: { cafe: '07:30', lanche1: '10:00', almoco: '12:00', lanche2: '15:30', jantar: '19:00', ceia: '21:30' }
  },

  SHOP_GROUPS: {
    fruta: 'Hortifruti',
    veg: 'Hortifruti',
    prot: 'Proteínas',
    graos: 'Grãos, cereais e raízes',
    laticinio: 'Laticínios e bebidas vegetais',
    gordura: 'Oleaginosas, sementes e óleos',
    outros: 'Outros'
  },

  FOODS: {
    banana: { n: 'Banana', k: 89, p: 1.3, c: 22.8, f: 0.1, cat: 'fruta', u: ['banana', 'bananas', 80], su: 1, mx: 3 },
    maca: { n: 'Maçã', k: 56, p: 0.3, c: 15.2, f: 0, cat: 'fruta', u: ['maçã', 'maçãs', 130], su: 1, mx: 2 },
    mamao: { n: 'Mamão papaia', k: 40, p: 0.5, c: 10.4, f: 0.1, cat: 'fruta' },
    laranja: { n: 'Laranja', k: 46, p: 1, c: 11.5, f: 0.1, cat: 'fruta', u: ['laranja', 'laranjas', 150], su: 1, mx: 2 },
    uva: { n: 'Uva', k: 53, p: 0.7, c: 13.6, f: 0.2, cat: 'fruta' },
    morango: { n: 'Morango', k: 30, p: 0.9, c: 6.8, f: 0.3, cat: 'fruta' },
    goiaba: { n: 'Goiaba', k: 54, p: 1.1, c: 13, f: 0.4, cat: 'fruta', u: ['goiaba', 'goiabas', 120], su: 1 },
    abacate: { n: 'Abacate', k: 96, p: 1.2, c: 6, f: 8.4, cat: 'fruta' },

    alface: { n: 'Alface', k: 11, p: 1.3, c: 1.7, f: 0.2, cat: 'veg' },
    tomate: { n: 'Tomate', k: 15, p: 1.1, c: 3.1, f: 0.2, cat: 'veg' },
    cenoura: { n: 'Cenoura', k: 34, p: 1.3, c: 7.7, f: 0.2, cat: 'veg' },
    pepino: { n: 'Pepino', k: 10, p: 0.9, c: 2, f: 0.1, cat: 'veg' },
    brocolis: { n: 'Brócolis cozido', k: 25, p: 2.1, c: 4.4, f: 0.5, cat: 'veg', s: ['Brócolis', 1.1] },
    abobrinha: { n: 'Abobrinha refogada', k: 28, p: 1.2, c: 4.5, f: 0.8, cat: 'veg', s: ['Abobrinha', 1.1] },
    couve: { n: 'Couve refogada', k: 65, p: 2.3, c: 6, f: 4, cat: 'veg', s: ['Couve', 1.2] },
    espinafre: { n: 'Espinafre refogado', k: 60, p: 3, c: 3, f: 4, cat: 'veg', s: ['Espinafre', 1.5] },
    abobora: { n: 'Abóbora cozida', k: 29, p: 0.8, c: 6.1, f: 0.2, cat: 'veg', s: ['Abóbora', 1.1] },
    legumes: { n: 'Legumes cozidos (mix)', k: 35, p: 1.5, c: 7, f: 0.3, cat: 'veg', s: ['Legumes variados', 1.1] },
    vagem: { n: 'Vagem cozida', k: 25, p: 1.8, c: 5, f: 0.2, cat: 'veg', s: ['Vagem', 1.05] },

    arroz: { n: 'Arroz branco cozido', k: 128, p: 2.5, c: 28.1, f: 0.2, cat: 'graos', st: 1, s: ['Arroz branco', 0.35], mx: 200 },
    arroz_int: { n: 'Arroz integral cozido', k: 124, p: 2.6, c: 25.8, f: 1, cat: 'graos', st: 1, s: ['Arroz integral', 0.35], mx: 200 },
    feijao: { n: 'Feijão carioca cozido', k: 76, p: 4.8, c: 13.6, f: 0.5, cat: 'graos', s: ['Feijão carioca', 0.35], mx: 180 },
    lentilha: { n: 'Lentilha cozida', k: 93, p: 6.3, c: 16.3, f: 0.5, cat: 'graos', s: ['Lentilha', 0.4] },
    grao_bico: { n: 'Grão-de-bico cozido', k: 121, p: 6.8, c: 21, f: 2.5, cat: 'graos', s: ['Grão-de-bico', 0.4] },
    quinoa: { n: 'Quinoa cozida', k: 120, p: 4.4, c: 21.3, f: 1.9, cat: 'graos', st: 1, s: ['Quinoa', 0.35] },
    macarrao_int: { n: 'Macarrão integral cozido', k: 124, p: 5, c: 26, f: 0.9, cat: 'graos', st: 1, fl: 'G', s: ['Macarrão integral', 0.4], mx: 220 },
    batata_doce: { n: 'Batata-doce cozida', k: 77, p: 0.6, c: 18.4, f: 0.1, cat: 'graos', st: 1, s: ['Batata-doce', 1], mx: 250 },
    batata: { n: 'Batata inglesa cozida', k: 52, p: 1.2, c: 11.9, f: 0, cat: 'graos', st: 1, s: ['Batata inglesa', 1] },
    mandioca: { n: 'Mandioca cozida', k: 125, p: 0.6, c: 30.1, f: 0.3, cat: 'graos', st: 1, s: ['Mandioca', 1] },
    cuscuz: { n: 'Cuscuz de milho', k: 113, p: 2.2, c: 25, f: 0.7, cat: 'graos', st: 1, s: ['Flocão de milho', 0.5] },
    tapioca: { n: 'Tapioca (goma hidratada)', k: 240, p: 0, c: 60, f: 0, cat: 'graos', st: 1, u: ['tapioca', 'tapiocas', 60], s: ['Goma de tapioca', 0.4], mx: 3 },
    pao_int: { n: 'Pão integral', k: 253, p: 9.4, c: 49, f: 3.7, cat: 'graos', st: 1, fl: 'G', u: ['fatia', 'fatias', 25], mx: 4 },
    aveia: { n: 'Aveia em flocos', k: 394, p: 13.9, c: 66.6, f: 8.5, cat: 'graos', fl: 'G', u: ['colher de sopa', 'colheres de sopa', 15] },
    pipoca: { n: 'Pipoca sem óleo', k: 390, p: 12, c: 78, f: 5, cat: 'graos', u: ['xícara', 'xícaras', 8] },

    ovo_cozido: { n: 'Ovo cozido', k: 146, p: 13.3, c: 0.6, f: 9.5, cat: 'prot', fl: 'E', u: ['ovo', 'ovos', 50], wh: 1, su: 1, s: ['Ovos', 1], mx: 3 },
    ovo_mexido: { n: 'Ovo mexido', k: 165, p: 11, c: 1.5, f: 12.8, cat: 'prot', fl: 'E', u: ['ovo', 'ovos', 50], wh: 1, su: 1, s: ['Ovos', 1], mx: 3 },
    frango: { n: 'Peito de frango grelhado', k: 159, p: 32, c: 0, f: 2.5, cat: 'prot', fl: 'M', s: ['Peito de frango', 1.3], mx: 200 },
    carne_moida: { n: 'Patinho moído refogado', k: 190, p: 26, c: 0, f: 9, cat: 'prot', fl: 'RH', s: ['Patinho moído', 1.3], mx: 160 },
    bife: { n: 'Bife grelhado (alcatra)', k: 220, p: 31, c: 0, f: 11, cat: 'prot', fl: 'RH', s: ['Alcatra', 1.3], mx: 160 },
    tilapia: { n: 'Tilápia grelhada', k: 128, p: 26, c: 0, f: 2.7, cat: 'prot', fl: 'F', s: ['Filé de tilápia', 1.25], mx: 200 },
    atum: { n: 'Atum em conserva (natural)', k: 116, p: 26, c: 0, f: 1, cat: 'prot', fl: 'F', s: ['Atum em conserva', 1], mx: 150 },
    peru: { n: 'Peito de peru', k: 110, p: 17, c: 3, f: 2.5, cat: 'prot', fl: 'MN', u: ['fatia', 'fatias', 15] },
    tofu: { n: 'Tofu grelhado', k: 76, p: 8, c: 1.9, f: 4.8, cat: 'prot', s: ['Tofu', 1] },
    homus: { n: 'Homus', k: 166, p: 8, c: 14, f: 9, cat: 'prot', u: ['colher de sopa', 'colheres de sopa', 20] },

    iogurte: { n: 'Iogurte natural', k: 51, p: 4.1, c: 1.9, f: 3, cat: 'laticinio', fl: 'D', u: ['pote', 'potes', 170], su: 1, mx: 2 },
    iogurte_sl: { n: 'Iogurte natural sem lactose', k: 51, p: 4.1, c: 1.9, f: 3, cat: 'laticinio', fl: 'A', u: ['pote', 'potes', 170], su: 1, mx: 2 },
    leite: { n: 'Leite integral', k: 61, p: 3.2, c: 4.6, f: 3.3, cat: 'laticinio', fl: 'D', lq: 1 },
    leite_sl: { n: 'Leite sem lactose', k: 61, p: 3.2, c: 4.6, f: 3.3, cat: 'laticinio', fl: 'A', lq: 1 },
    soja_bebida: { n: 'Bebida vegetal de soja', k: 45, p: 3.5, c: 2.5, f: 2, cat: 'laticinio', lq: 1 },
    queijo_minas: { n: 'Queijo minas frescal', k: 264, p: 17, c: 3, f: 20, cat: 'laticinio', fl: 'D', u: ['fatia', 'fatias', 30], mx: 3 },
    ricota: { n: 'Ricota', k: 140, p: 12, c: 3.8, f: 8.1, cat: 'laticinio', fl: 'D', u: ['fatia', 'fatias', 30], mx: 3 },

    azeite: { n: 'Azeite de oliva', k: 884, p: 0, c: 0, f: 100, cat: 'gordura', fx: 1, u: ['colher de sobremesa', 'colheres de sobremesa', 8] },
    castanha_caju: { n: 'Castanha de caju', k: 570, p: 18, c: 30, f: 44, cat: 'gordura', u: ['castanha', 'castanhas', 3] },
    castanha_para: { n: 'Castanha-do-pará', k: 643, p: 14, c: 12, f: 66, cat: 'gordura', u: ['castanha', 'castanhas', 4] },
    pasta_amendoim: { n: 'Pasta de amendoim', k: 588, p: 25, c: 20, f: 50, cat: 'gordura', u: ['colher de sopa', 'colheres de sopa', 15] },
    chia: { n: 'Semente de chia', k: 486, p: 16.5, c: 42, f: 31, cat: 'gordura', fx: 1, u: ['colher de sopa', 'colheres de sopa', 12] },

    cafe: { n: 'Café sem açúcar', k: 2, p: 0.1, c: 0.3, f: 0, cat: 'outros', lq: 1, fx: 1, u: ['xícara', 'xícaras', 150] },
    cha: { n: 'Chá sem açúcar', k: 1, p: 0, c: 0.2, f: 0, cat: 'outros', lq: 1, fx: 1, u: ['xícara', 'xícaras', 200] },
    agua_coco: { n: 'Água de coco', k: 22, p: 0, c: 5, f: 0, cat: 'outros', lq: 1 },
    mel: { n: 'Mel', k: 309, p: 0.4, c: 84, f: 0, cat: 'outros', fl: 'SA', fx: 1, u: ['colher de chá', 'colheres de chá', 7] },
    suco_laranja: { n: 'Suco de laranja natural', k: 45, p: 0.7, c: 10, f: 0.2, cat: 'outros', fl: 'S', lq: 1 },
    molho_tomate: { n: 'Molho de tomate caseiro', k: 30, p: 1.5, c: 6, f: 0.3, cat: 'outros', s: ['Tomate (para o molho)', 1.5] }
  },

  TEMPLATES: {
    cafe: [
      { n: 'Pão integral com ovos mexidos e mamão', p: 'rapido', i: [['pao_int', 50], ['ovo_mexido', 100], ['mamao', 150], ['cafe', 150]] },
      { n: 'Tapioca com queijo minas, banana e café', p: 'rapido', i: [['tapioca', 120], ['queijo_minas', 40], ['banana', 80], ['cafe', 150]] },
      { n: 'Tapioca com ovo cozido e laranja', p: 'rapido', i: [['tapioca', 120], ['ovo_cozido', 100], ['laranja', 150], ['cafe', 150]] },
      { n: 'Cuscuz de milho com ovo e banana', p: 'medio', i: [['cuscuz', 150], ['ovo_cozido', 100], ['banana', 80], ['cafe', 150]] },
      { n: 'Iogurte natural com aveia, morango e chia', p: 'rapido', i: [['iogurte', 170], ['aveia', 30], ['morango', 100], ['chia', 12]] },
      { n: 'Vitamina de banana com aveia', p: 'rapido', i: [['leite', 250], ['banana', 120], ['aveia', 30]] },
      { n: 'Vitamina de banana com bebida de soja e pasta de amendoim', p: 'rapido', i: [['soja_bebida', 250], ['banana', 120], ['pasta_amendoim', 15], ['chia', 12]] },
      { n: 'Tapioca com abacate e castanhas', p: 'rapido', i: [['tapioca', 120], ['abacate', 60], ['castanha_caju', 15], ['cha', 200]] },
      { n: 'Cuscuz com tofu mexido e mamão', p: 'medio', i: [['cuscuz', 150], ['tofu', 100], ['azeite', 8], ['mamao', 150], ['cafe', 150]] },
      { n: 'Mingau de aveia sem lactose com banana e chia', p: 'medio', i: [['leite_sl', 250], ['aveia', 40], ['banana', 80], ['chia', 12]] },
      { n: 'Pão integral com pasta de amendoim e banana', p: 'rapido', i: [['pao_int', 50], ['pasta_amendoim', 20], ['banana', 100], ['cafe', 150]] },
      { n: 'Pão integral com ricota, tomate e suco de laranja', p: 'rapido', i: [['pao_int', 50], ['ricota', 60], ['tomate', 50], ['suco_laranja', 200]] },
      { n: 'Panqueca de banana com ovos e morangos', p: 'medio', i: [['ovo_mexido', 100], ['banana', 120], ['morango', 100], ['cha', 200]] },
      { n: 'Tapioca com banana e mel', p: 'rapido', i: [['tapioca', 120], ['banana', 100], ['mel', 7], ['cha', 200]] },
      { n: 'Pão integral com peito de peru e queijo', p: 'rapido', i: [['pao_int', 50], ['peru', 30], ['queijo_minas', 30], ['tomate', 30], ['cafe', 150]] },
      { n: 'Vitamina de mamão com banana e castanhas', p: 'rapido', i: [['soja_bebida', 250], ['mamao', 100], ['banana', 80], ['chia', 12], ['castanha_para', 8]] }
    ],

    lanche: [
      { n: 'Maçã com castanhas', p: 'rapido', i: [['maca', 130], ['castanha_caju', 20]] },
      { n: 'Iogurte natural com morango e chia', p: 'rapido', i: [['iogurte', 170], ['morango', 100], ['chia', 12]] },
      { n: 'Banana com pasta de amendoim', p: 'rapido', i: [['banana', 80], ['pasta_amendoim', 15]] },
      { n: 'Castanhas e uvas', p: 'rapido', i: [['castanha_para', 12], ['uva', 100]] },
      { n: 'Pipoca sem óleo com água de coco', p: 'rapido', i: [['pipoca', 24], ['agua_coco', 200]] },
      { n: 'Ovo cozido com laranja', p: 'rapido', i: [['ovo_cozido', 50], ['laranja', 150]] },
      { n: 'Queijo minas com goiaba', p: 'rapido', i: [['queijo_minas', 30], ['goiaba', 120]] },
      { n: 'Sanduíche natural de ricota com cenoura', p: 'rapido', i: [['pao_int', 50], ['ricota', 40], ['cenoura', 30], ['alface', 15]] },
      { n: 'Creme de abacate com banana e chia', p: 'rapido', i: [['abacate', 80], ['banana', 80], ['chia', 12]] },
      { n: 'Cenoura e pepino com homus', p: 'rapido', i: [['cenoura', 100], ['pepino', 60], ['homus', 40]] },
      { n: 'Salada de frutas com castanha', p: 'rapido', i: [['mamao', 100], ['laranja', 100], ['uva', 60], ['castanha_caju', 10]] },
      { n: 'Pão integral com atum e tomate', p: 'rapido', i: [['pao_int', 50], ['atum', 50], ['tomate', 40]] },
      { n: 'Iogurte sem lactose com aveia e banana', p: 'rapido', i: [['iogurte_sl', 170], ['aveia', 20], ['banana', 80]] },
      { n: 'Sanduíche de peito de peru', p: 'rapido', i: [['pao_int', 50], ['peru', 45], ['alface', 15], ['tomate', 30]] },
      { n: 'Suco de laranja com castanhas', p: 'rapido', i: [['suco_laranja', 200], ['castanha_caju', 15]] },
      { n: 'Mamão com chia e castanha', p: 'rapido', i: [['mamao', 200], ['chia', 12], ['castanha_para', 8]] }
    ],

    almoco: [
      { n: 'Arroz, feijão, frango grelhado e salada', p: 'rapido', i: [['arroz', 120], ['feijao', 100], ['frango', 120], ['alface', 40], ['tomate', 50], ['cenoura', 30], ['azeite', 8]] },
      { n: 'Arroz integral, feijão, bife grelhado e legumes', p: 'medio', i: [['arroz_int', 120], ['feijao', 100], ['bife', 100], ['legumes', 80], ['alface', 40], ['azeite', 8]] },
      { n: 'Tilápia grelhada com arroz integral, batata-doce e brócolis', p: 'medio', i: [['tilapia', 140], ['arroz_int', 80], ['batata_doce', 150], ['brocolis', 80], ['tomate', 50], ['azeite', 8]] },
      { n: 'Arroz, feijão, ovos cozidos e couve refogada', p: 'rapido', i: [['arroz', 120], ['feijao', 100], ['ovo_cozido', 100], ['couve', 60], ['tomate', 50]] },
      { n: 'Arroz, lentilha, tofu grelhado e abobrinha', p: 'medio', i: [['arroz', 120], ['lentilha', 100], ['tofu', 100], ['abobrinha', 80], ['alface', 40], ['azeite', 8]] },
      { n: 'Macarrão integral com frango e molho de tomate', p: 'medio', i: [['macarrao_int', 160], ['frango', 100], ['molho_tomate', 80], ['alface', 40], ['azeite', 8]] },
      { n: 'Quinoa com grão-de-bico e legumes assados', p: 'medio', i: [['quinoa', 120], ['grao_bico', 100], ['legumes', 120], ['alface', 40], ['azeite', 8]] },
      { n: 'Mandioca cozida com carne moída, couve e salada', p: 'medio', i: [['mandioca', 150], ['carne_moida', 100], ['couve', 60], ['alface', 40], ['tomate', 60], ['azeite', 8]] },
      { n: 'Arroz, feijão, frango e abóbora', p: 'rapido', i: [['arroz', 120], ['feijao', 100], ['frango', 120], ['abobora', 80], ['alface', 40], ['azeite', 8]] },
      { n: 'Peixe ao forno com arroz integral e vagem', p: 'medio', i: [['tilapia', 140], ['arroz_int', 120], ['vagem', 80], ['tomate', 60], ['alface', 40], ['azeite', 8]] },
      { n: 'Omelete de legumes com arroz e salada', p: 'rapido', i: [['ovo_mexido', 150], ['arroz', 100], ['legumes', 80], ['alface', 40]] },
      { n: 'Arroz, feijão, tofu e brócolis', p: 'rapido', i: [['arroz', 120], ['feijao', 100], ['tofu', 100], ['brocolis', 80], ['tomate', 50], ['azeite', 8]] },
      { n: 'Batata-doce com frango desfiado e brócolis', p: 'rapido', i: [['batata_doce', 200], ['frango', 130], ['brocolis', 100], ['azeite', 8]] },
      { n: 'Arroz com atum e legumes', p: 'rapido', i: [['arroz', 120], ['atum', 100], ['legumes', 120], ['tomate', 50], ['azeite', 8]] },
      { n: 'Arroz, grão-de-bico e espinafre refogado', p: 'medio', i: [['arroz', 120], ['grao_bico', 100], ['espinafre', 80], ['tomate', 50], ['azeite', 8]] }
    ],

    jantar: [
      { n: 'Sopa de legumes com frango desfiado', p: 'medio', i: [['legumes', 200], ['batata', 100], ['frango', 100], ['azeite', 5]] },
      { n: 'Omelete de espinafre com batata e salada', p: 'rapido', i: [['ovo_mexido', 150], ['espinafre', 60], ['tomate', 60], ['alface', 40], ['batata', 120]] },
      { n: 'Sopa de lentilha com legumes e mandioca', p: 'medio', i: [['lentilha', 150], ['legumes', 200], ['mandioca', 80], ['azeite', 5]] },
      { n: 'Peixe assado com legumes e batata-doce', p: 'medio', i: [['tilapia', 140], ['abobrinha', 100], ['batata_doce', 120], ['tomate', 50]] },
      { n: 'Sanduíche de frango com salada', p: 'rapido', i: [['pao_int', 50], ['frango', 100], ['alface', 30], ['tomate', 40]] },
      { n: 'Prato leve: arroz, feijão, ovo e couve', p: 'rapido', i: [['arroz', 100], ['feijao', 80], ['ovo_cozido', 50], ['couve', 60], ['tomate', 50]] },
      { n: 'Tofu grelhado com purê de mandioca e brócolis', p: 'medio', i: [['tofu', 120], ['mandioca', 120], ['brocolis', 80], ['azeite', 8]] },
      { n: 'Salada completa com atum e grão-de-bico', p: 'rapido', i: [['alface', 60], ['tomate', 80], ['pepino', 50], ['grao_bico', 80], ['atum', 80], ['cenoura', 40], ['azeite', 8]] },
      { n: 'Salada completa com frango e batata-doce', p: 'rapido', i: [['alface', 60], ['tomate', 80], ['pepino', 50], ['cenoura', 50], ['frango', 120], ['batata_doce', 100], ['azeite', 8]] },
      { n: 'Quinoa com legumes salteados e ovo', p: 'medio', i: [['quinoa', 100], ['legumes', 150], ['ovo_cozido', 100], ['azeite', 8]] },
      { n: 'Creme de abóbora com tofu e arroz', p: 'medio', i: [['abobora', 250], ['tofu', 100], ['arroz', 80], ['azeite', 8]] },
      { n: 'Bife grelhado com batata e salada', p: 'medio', i: [['bife', 100], ['batata', 150], ['alface', 40], ['tomate', 50], ['brocolis', 60], ['azeite', 8]] },
      { n: 'Macarrão integral com legumes e ricota', p: 'medio', i: [['macarrao_int', 150], ['legumes', 120], ['ricota', 50], ['molho_tomate', 60], ['azeite', 5]] },
      { n: 'Salada morna de lentilha com legumes e arroz', p: 'rapido', i: [['lentilha', 120], ['legumes', 150], ['arroz', 60], ['tomate', 60], ['alface', 40], ['azeite', 8]] }
    ],

    ceia: [
      { n: 'Chá com banana e castanhas', p: 'rapido', i: [['cha', 200], ['banana', 80], ['castanha_caju', 15]] },
      { n: 'Iogurte natural com morango e chia', p: 'rapido', i: [['iogurte', 170], ['chia', 12], ['morango', 60]] },
      { n: 'Leite morno com aveia', p: 'rapido', i: [['leite', 200], ['aveia', 20]] },
      { n: 'Maçã assada com canela e castanha-do-pará', p: 'rapido', i: [['maca', 130], ['castanha_para', 12]] },
      { n: 'Mamão com chia e castanha', p: 'rapido', i: [['mamao', 150], ['chia', 12], ['castanha_caju', 12]] },
      { n: 'Queijo minas com uvas e chá', p: 'rapido', i: [['queijo_minas', 40], ['cha', 200], ['uva', 80]] },
      { n: 'Leite sem lactose morno com banana', p: 'rapido', i: [['leite_sl', 200], ['banana', 80]] },
      { n: 'Abacate amassado com banana e chia', p: 'rapido', i: [['abacate', 80], ['banana', 80], ['chia', 8]] }
    ]
  }
};

const PlanGenerator = {
  VERSION: 1,

  hash(text) {
    let h = 2166136261;

    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }

    return h >>> 0;
  },

  rng(seed) {
    let a = seed >>> 0;

    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  },

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  hasAnswers(answers) {
    const source = answers || {};

    return Object.keys(source).filter(key => /^q\d+$/.test(key) && source[key]).length >= 5;
  },

  signature(user) {
    const answers = user.respostasQuestionario || {};
    const perfil = user.perfil || {};

    const ordered = Object.keys(answers).sort().map(key => [key, answers[key]]);

    return String(this.hash(JSON.stringify([
      ordered,
      perfil.dataNascimento || '',
      perfil.genero || '',
      perfil.nivelAtividade || '',
      perfil.pesoAtual || '',
      perfil.metaPeso || '',
      perfil.altura || ''
    ])));
  },

  constraints(answers) {
    const q = (key) => answers[key] || '';

    return {
      diet: { Vegetariano: 'vegetariano', Vegano: 'vegano', Flexitariano: 'flexitariano' }[q('q14')] || 'onivoro',
      avoidRed: q('q16') === 'Carnes vermelhas',
      lactose: q('q17') === 'Lactose',
      gluten: q('q17') === 'Glúten',
      otherAllergy: q('q17') === 'Outras',
      avoidFried: q('q16') === 'Frituras e ultraprocessados' || q('q6') === 'Reduzir ultraprocessados',
      avoidSweet: q('q16') === 'Doces e açúcares' || q('q18') === 'Controle de açúcar',
      lowSodium: q('q18') === 'Controle de sódio',
      lightDigestion: q('q18') === 'Digestão leve'
    };
  },

  ageYears(answers, perfil) {
    if (perfil.dataNascimento) {
      const birth = Utils.parseLocalDate(perfil.dataNascimento);

      if (!Number.isNaN(birth.getTime())) {
        const now = new Date();
        let age = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) age--;

        if (age >= 5 && age <= 110) return age;
      }
    }

    return {
      'Menos de 18 anos': 16,
      '18 a 24 anos': 21,
      '25 a 34 anos': 30,
      '35 a 44 anos': 40,
      '45+ anos': 52
    }[answers.q1] || 30;
  },

  computeEnergy(answers, perfil) {
    const age = this.ageYears(answers, perfil);
    const minor = age < 18 || answers.q1 === 'Menos de 18 anos';
    const routine = answers.q3 || 'Moderada';

    const weight = parseFloat(perfil.pesoAtual);
    const height = parseFloat(perfil.altura);
    const gender = Utils.normalize(perfil.genero);

    const sex = /fem|mulher/.test(gender) ? 'f' : /mas|homem/.test(gender) ? 'm' : 'o';

    const hasProfile = Number.isFinite(weight) && weight > 0 && Number.isFinite(height) && height > 0;

    let kcal;
    let basis;

    if (hasProfile) {
      const sexOffset = sex === 'm' ? 5 : sex === 'f' ? -161 : -78;
      const bmr = 10 * weight + 6.25 * height - 5 * age + sexOffset;

      const level = Utils.normalize(perfil.nivelAtividade);
      let factor = { Tranquila: 1.35, Moderada: 1.45, Corrida: 1.55 }[routine] || 1.45;

      if (/sedent/.test(level)) factor = 1.2;
      else if (/leve|pouc/.test(level)) factor = 1.375;
      else if (/moder/.test(level)) factor = 1.55;
      else if (/intens|muito|atlet|alto/.test(level)) factor = 1.725;

      kcal = bmr * factor;
      basis = 'perfil';

      const goalWeight = parseFloat(perfil.metaPeso);

      if (Number.isFinite(goalWeight) && !minor) {
        if (goalWeight < weight - 1) kcal *= 0.88;
        else if (goalWeight > weight + 1) kcal *= 1.1;
      }

      const floor = minor ? 1800 : sex === 'm' ? 1600 : 1400;
      kcal = this.clamp(kcal, floor, 3800);
    } else {
      const base = {
        'Menos de 18 anos': 2200,
        '18 a 24 anos': 2200,
        '25 a 34 anos': 2100,
        '35 a 44 anos': 2000,
        '45+ anos': 1900
      }[answers.q1] || 2050;

      kcal = base * ({ Tranquila: 0.95, Moderada: 1, Corrida: 1.05 }[routine] || 1);
      basis = 'estimativa';
    }

    return {
      kcal: Math.round(kcal / 50) * 50,
      basis,
      minor,
      weight: hasProfile ? weight : null
    };
  },

  macroSplit(answers, c) {
    let p = 20;
    let f = 30;

    const pref = answers.q15;

    if (pref === 'Proteínas magras e grãos') { p = 25; f = 30; }
    else if (pref === 'Frutas e saladas') { p = 18; f = 28; }
    else if (pref === 'Massas e carboidratos') { p = 18; f = 27; }

    if (c.diet === 'vegano' || c.diet === 'vegetariano') p = Math.min(p, 18);

    if (answers.q18 === 'Controle de açúcar') { p += 2; f += 2; }
    if (answers.q5 === 'Ter mais energia') f -= 2;

    return { p, f, c: 100 - p - f };
  },

  waterTarget(energy) {
    if (energy.weight) {
      return this.clamp(Math.round((energy.weight * 35) / 250) * 250, 1500, 4000);
    }

    return 2000;
  },

  mealsPerDay(answers) {
    return { '1 a 2': 4, '3 a 4': 5, '5 ou mais': 6 }[answers.q4] || 5;
  },

  info(tpl) {
    if (tpl._info) return tpl._info;

    const info = {
      kcal: 0, p: 0, c: 0, f: 0,
      fixedKcal: 0, flexKcal: 0,
      flags: new Set(),
      fruit: false, veg: false, starch: false
    };

    tpl.i.forEach(([id, grams]) => {
      const food = PlanData.FOODS[id];
      const kcal = (food.k * grams) / 100;

      info.kcal += kcal;
      info.p += (food.p * grams) / 100;
      info.c += (food.c * grams) / 100;
      info.f += (food.f * grams) / 100;

      if (food.fx) info.fixedKcal += kcal;
      else info.flexKcal += kcal;

      (food.fl || '').split('').forEach(flag => info.flags.add(flag));

      if (food.cat === 'fruta') info.fruit = true;
      if (food.cat === 'veg') info.veg = true;
      if (food.st) info.starch = true;
    });

    tpl._info = info;

    return info;
  },

  allows(tpl, c, ignored) {
    const flags = this.info(tpl).flags;
    const has = (...chars) => chars.some(ch => flags.has(ch));

    if (c.diet === 'vegano' && has('M', 'R', 'F', 'E', 'D', 'A')) return false;
    if (c.diet === 'vegetariano' && has('M', 'R', 'F')) return false;
    if (c.avoidRed && has('R')) return false;
    if (c.lactose && has('D')) return false;
    if (c.gluten && has('G')) return false;

    if (c.lowSodium && !ignored.includes('lowSodium') && has('N')) return false;
    if (c.lightDigestion && !ignored.includes('lightDigestion') && has('H', 'X')) return false;
    if (c.avoidSweet && !ignored.includes('avoidSweet') && has('S')) return false;
    if (c.avoidFried && !ignored.includes('avoidFried') && has('X')) return false;

    return true;
  },

  poolFor(slot, c) {
    const library = PlanData.TEMPLATES[PlanData.SLOT_LIBRARY[slot]];

    const levels = [
      [],
      ['lowSodium'],
      ['lowSodium', 'lightDigestion'],
      ['lowSodium', 'lightDigestion', 'avoidSweet'],
      ['lowSodium', 'lightDigestion', 'avoidSweet', 'avoidFried']
    ];

    for (let i = 0; i < levels.length; i++) {
      const list = library.filter(tpl => this.allows(tpl, c, levels[i]));

      if (list.length >= 4 || (i === levels.length - 1 && list.length > 0)) {
        return { list, ignored: levels[i] };
      }
    }

    return { list: library.slice(), ignored: levels[levels.length - 1] };
  },

  rank(list, targetKcal, answers, rand) {
    const pref = answers.q15;
    const wantsQuick =
      answers.q3 === 'Corrida' ||
      answers.q19 === 'Falta de tempo' ||
      answers.q20 === 'Imprevistos de trabalho/estudo';

    const wantsGreens =
      answers.q6 === 'Variar o cardápio' ||
      answers.q11 === 'Precisa melhorar' ||
      answers.q12 === 'Raramente' ||
      answers.q12 === '1 a 2 dias por semana';

    return list
      .map((tpl) => {
        const info = this.info(tpl);
        const proteinShare = (info.p * 4) / info.kcal;
        let score = 0;

        if (pref === 'Proteínas magras e grãos' && proteinShare >= 0.22) score += 2;
        if (pref === 'Frutas e saladas' && (info.fruit || info.veg)) score += 2;
        if (pref === 'Massas e carboidratos' && info.starch) score += 2;
        if (wantsGreens && (info.fruit || info.veg)) score += 1;
        if (wantsQuick && tpl.p === 'rapido') score += 2;
        if (answers.q3 === 'Tranquila' && tpl.p === 'medio') score += 0.5;

        score -= Math.abs(Math.log(info.kcal / targetKcal)) * 2.5;
        score += rand() * 1.2;

        return { tpl, score };
      })
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.tpl);
  },

  fmtNum(n) {
    return Number.isInteger(n) ? String(n) : String(n).replace('.', ',');
  },

  build(tpl, targetKcal) {
    const info = this.info(tpl);

    const factor = info.flexKcal > 0
      ? this.clamp((targetKcal - info.fixedKcal) / info.flexKcal, 0.6, 2.3)
      : 1;

    const items = tpl.i.map(([id, baseGrams]) => {
      const food = PlanData.FOODS[id];
      let grams = food.fx ? baseGrams : baseGrams * factor;
      let qty = null;

      if (food.u) {
        const unitGrams = food.u[2];
        const step = unitGrams < 10 ? 1 : 0.5;

        qty = grams / unitGrams;
        qty = food.wh
          ? Math.max(1, Math.round(qty))
          : Math.max(step, Math.round(qty / step) * step);

        if (food.mx && qty > food.mx) qty = food.mx;

        grams = qty * unitGrams;
      } else if (food.lq) {
        grams = Math.max(50, Math.round(grams / 10) * 10);
      } else {
        grams = grams >= 100 ? Math.round(grams / 10) * 10 : Math.max(5, Math.round(grams / 5) * 5);

        if (food.mx && grams > food.mx) grams = food.mx;
      }

      grams = Math.round(grams);

      const unitText = food.lq ? 'ml' : 'g';
      const display = food.u
        ? `${this.fmtNum(qty)} ${qty > 1 ? food.u[1] : food.u[0]} (${grams} ${unitText})`
        : `${grams} ${unitText}`;

      return {
        id,
        name: food.n,
        grams,
        qty,
        display,
        kcal: Math.round((food.k * grams) / 100),
        protein: Math.round(((food.p * grams) / 100) * 10) / 10,
        carbs: Math.round(((food.c * grams) / 100) * 10) / 10,
        fats: Math.round(((food.f * grams) / 100) * 10) / 10
      };
    });

    const sum = (key) => items.reduce((t, item) => t + item[key], 0);

    return {
      name: tpl.n,
      prep: tpl.p,
      items,
      kcal: Math.round(sum('kcal')),
      protein: Math.round(sum('protein')),
      carbs: Math.round(sum('carbs')),
      fats: Math.round(sum('fats'))
    };
  },

  titles(user, answers, c) {
    const saved = user.planoPerfil || {};
    const dieta = saved.dieta || {};
    const rotina = saved.rotina || {};

    let dietTitle = 'Equilíbrio & Praticidade Nutricional';
    let dietDescription = 'Plano alimentar variado e balanceado, desenvolvido para promover saúde contínua e fácil adaptação ao seu dia a dia.';

    if (answers.q14 === 'Vegetariano' || answers.q14 === 'Vegano') {
      dietTitle = `Plano Nutritivo ${answers.q14}`;
      dietDescription = 'Foco em proteínas vegetais, leguminosas, sementes e vegetais ricos em micronutrientes essenciais.';
    } else if (answers.q5 === 'Ter mais energia') {
      dietTitle = 'Plano Vitalidade & Energia';
      dietDescription = 'Refeições ricas em carboidratos complexos de baixo índice glicêmico e gorduras boas para manter o pico de energia constante.';
    } else if (answers.q5 === 'Organizar horários') {
      dietTitle = 'Plano Estruturado por Horários';
      dietDescription = 'Combinações simplificadas divididas em intervalos regulares para evitar longos períodos de jejum.';
    }

    let routineTitle = 'Acompanhamento Moderado Diário';

    if (answers.q3 === 'Corrida') routineTitle = 'Rotina Dinâmica & Lembretes Práticos';
    else if (answers.q3 === 'Tranquila') routineTitle = 'Acompanhamento Completo & Detalhado';

    return {
      title: dieta.titulo || dietTitle,
      description: dieta.descricao || dietDescription,
      routineTitle: rotina.titulo || routineTitle
    };
  },

  highlights(answers, c, energy, structureSize, split, ignored, upgraded) {
    const list = [];

    if (upgraded) {
      list.push(`Sua meta de energia é alta (${energy.kcal.toLocaleString('pt-BR')} kcal), então o plano usa ${structureSize} refeições por dia para distribuir melhor as calorias.`);
    } else if (answers.q4 === '1 a 2') {
      list.push('Você faz poucas refeições hoje, então o plano começa com 4 refeições por dia para evitar longos períodos sem comer.');
    } else if (answers.q4 === '5 ou mais') {
      list.push('Plano com 6 refeições por dia, incluindo a ceia, respeitando o seu hábito de comer várias vezes ao dia.');
    } else {
      list.push(`Plano com ${structureSize} refeições por dia, com lanches entre as principais para manter a energia estável.`);
    }

    if (c.diet === 'vegano') list.push('Cardápio 100% vegetal: sem carnes, peixes, ovos, laticínios nem mel.');
    else if (c.diet === 'vegetariano') list.push('Cardápio vegetariano: sem carnes e peixes, com ovos e laticínios quando não há restrição.');
    else if (c.diet === 'flexitariano') list.push('Cardápio flexitariano: a maioria das refeições é vegetariana, com carne ou peixe em poucos dias da semana.');

    if (c.avoidRed) list.push('Sem carnes vermelhas, como você prefere evitar.');
    if (c.lactose) list.push('Sem lactose: leite e iogurte sem lactose ou opções vegetais.');
    if (c.gluten) list.push('Sem glúten: sem pão, aveia ou macarrão comuns. Entram tapioca, cuscuz, arroz, quinoa e raízes.');
    if (c.avoidSweet && !ignored.includes('avoidSweet')) list.push('Sem açúcar adicionado, mel ou sucos adoçados, para ajudar no controle do açúcar.');
    if (c.lowSodium && !ignored.includes('lowSodium')) list.push('Poucos embutidos e industrializados. Use temperos naturais e pouco sal.');
    if (c.lightDigestion) list.push('Preparos leves de digerir: grelhados, cozidos e assados, com poucas carnes pesadas.');
    if (c.avoidFried) list.push('Preparos assados, grelhados e cozidos, sem frituras nem ultraprocessados.');

    const prefs = {
      'Proteínas magras e grãos': 'Mais proteínas magras, ovos e grãos integrais, que é o que você prefere.',
      'Frutas e saladas': 'Mais frutas, verduras e saladas nas refeições, de acordo com a sua preferência.',
      'Massas e carboidratos': 'Inclui massas, pães e raízes, que fazem parte da sua preferência.'
    };

    if (prefs[answers.q15]) list.push(prefs[answers.q15]);

    if (answers.q3 === 'Corrida') list.push('Rotina corrida: priorizamos refeições rápidas de preparar e fáceis de levar.');
    else if (answers.q3 === 'Tranquila') list.push('Rotina tranquila: há espaço para preparos um pouco mais elaborados.');

    const goals = {
      'Ter mais energia': 'Foco em carboidratos complexos e proteína em todas as refeições para sustentar a energia.',
      'Organizar horários': 'Horários fixos para cada refeição, com intervalos de 2 a 4 horas.',
      'Comer com qualidade': 'Variedade de cores e grupos alimentares ao longo da semana.',
      'Acompanhar progresso': 'Quantidades em medidas caseiras, para facilitar o registro e o acompanhamento.'
    };

    if (goals[answers.q5]) list.push(goals[answers.q5]);

    list.push(
      energy.basis === 'perfil'
        ? `Calorias calculadas com os dados do seu perfil: ${energy.kcal.toLocaleString('pt-BR')} kcal por dia (${split.p}% proteínas, ${split.c}% carboidratos e ${split.f}% gorduras).`
        : `Calorias estimadas pela sua faixa etária e rotina: ${energy.kcal.toLocaleString('pt-BR')} kcal por dia. Complete o seu perfil para um cálculo mais preciso.`
    );

    return list;
  },

  tips(answers, c, waterMl) {
    const tips = [];

    const difficulty = {
      'Falta de tempo': 'Reserve cerca de 1 hora no domingo para cozinhar arroz, feijão e proteínas e deixar os legumes cortados. Assim, as refeições da semana saem em minutos.',
      'Falta de planejamento': 'Use a lista de compras da semana e revise o cardápio no domingo. Com tudo em casa, fica fácil seguir o plano.',
      'Esquecimento': 'Registre cada refeição logo depois de comer, pelo botão "Registrar esta refeição". Quando houver lembretes, deixe-os ativados.',
      'Opções fora de casa': 'Leve de casa lanches práticos, como fruta, castanhas e iogurte, e prefira marmitas para as refeições principais.'
    };

    if (difficulty[answers.q19]) tips.push(difficulty[answers.q19]);

    const disruptions = {
      'Imprevistos de trabalho/estudo': 'Deixe sempre um lanche reserva na bolsa, para não ficar longas horas sem comer quando o horário apertar.',
      'Cansaço no fim do dia': 'Prepare o jantar com antecedência ou escolha as opções rápidas do plano (omeletes, saladas e sopas) para os dias mais cansativos.',
      'Ansiedade/Estresse': 'Antes de petiscar por impulso, beba um copo de água e espere 10 minutos. Tenha frutas e castanhas por perto como alternativa.',
      'Falta de refeições prontas': 'Congele porções de arroz, feijão e legumes. Em poucos minutos você monta uma refeição completa.'
    };

    if (disruptions[answers.q20]) tips.push(disruptions[answers.q20]);

    if (answers.q10 === 'Frequentemente') tips.push('Programe alarmes nos horários das refeições e evite passar mais de 4 horas sem comer. Todas as refeições do plano contam.');
    if (answers.q9 === 'Raramente') tips.push('Comece fixando só o café da manhã e o almoço no mesmo horário todos os dias. Depois, encaixe os demais.');
    if (answers.q12 === 'Raramente' || answers.q12 === '1 a 2 dias por semana') tips.push('Meta simples: uma fruta em cada lanche e uma porção de legumes no almoço e no jantar.');

    if (answers.q6 === 'Aumentar consumo de água' || answers.q8 === 'Beber 2L de água') {
      tips.push(`Sua meta de água é ${(waterMl / 1000).toLocaleString('pt-BR')} L por dia. Deixe uma garrafa à vista e beba um copo a cada hora.`);
    }

    if (answers.q6 === 'Reduzir ultraprocessados') tips.push('Troque aos poucos: sucos de caixinha por frutas, biscoitos por castanhas e embutidos por ovos ou frango.');
    if (answers.q8 === 'Comer salada no almoço') tips.push('Comece o almoço e o jantar pela salada. Isso ajuda a bater a meta de vegetais.');
    if (answers.q8 === 'Registrar refeições diárias') tips.push('Use o botão "Registrar esta refeição" em cada cartão do plano e acompanhe tudo na página de progresso.');
    if (answers.q18 === 'Controle de sódio') tips.push('Prefira temperos naturais (alho, cebola, ervas e limão) e leia o rótulo dos industrializados.');
    if (answers.q18 === 'Digestão leve') tips.push('Mastigue devagar, faça refeições em porções moderadas e deixe o jantar pelo menos 2 horas antes de dormir.');
    if (answers.q13 === 'Não, decido na hora') tips.push('Escolher o cardápio do dia pela manhã, olhando este plano, já reduz muito as decisões de última hora.');

    if (c.otherAllergy) tips.push('Você informou outra restrição alimentar. Confira os ingredientes de cada refeição e, se necessário, troque o item por um equivalente seguro.');

    if (c.diet === 'vegano') tips.push('Dieta vegana pede atenção à vitamina B12. Converse com um profissional de saúde sobre suplementação.');

    return tips.slice(0, 8);
  },

  shopping(days) {
    const totals = {};

    Object.keys(days).forEach((day) => {
      days[day].forEach((meal) => {
        meal.items.forEach((item) => {
          const food = PlanData.FOODS[item.id];
          const shop = food.s || [food.n, 1];

          if (!totals[shop[0]]) {
            totals[shop[0]] = {
              name: shop[0],
              cat: food.cat,
              grams: 0,
              count: 0,
              liquid: !!food.lq,
              byUnit: !!(food.su && food.u),
              unit: food.u
            };
          }

          totals[shop[0]].grams += item.grams * shop[1];

          if (food.su && food.u) totals[shop[0]].count += item.grams / food.u[2];
        });
      });
    });

    const groups = {};

    Object.values(totals).forEach((entry) => {
      let text;

      if (entry.byUnit) {
        const n = Math.ceil(entry.count);
        text = `${n} ${n === 1 ? entry.unit[0] : entry.unit[1]}`;
      } else {
        const grams = entry.grams >= 100 ? Math.round(entry.grams / 50) * 50 : Math.max(10, Math.round(entry.grams / 10) * 10);

        if (grams >= 1000) {
          text = `${(grams / 1000).toFixed(1).replace('.', ',')} ${entry.liquid ? 'L' : 'kg'}`;
        } else {
          text = `${grams} ${entry.liquid ? 'ml' : 'g'}`;
        }
      }

      const group = PlanData.SHOP_GROUPS[entry.cat] || 'Outros';

      if (!groups[group]) groups[group] = [];

      groups[group].push({ name: entry.name, qty: text });
    });

    const order = [
      'Hortifruti',
      'Proteínas',
      'Grãos, cereais e raízes',
      'Laticínios e bebidas vegetais',
      'Oleaginosas, sementes e óleos',
      'Outros'
    ];

    return order
      .filter(group => groups[group])
      .map(group => ({
        group,
        items: groups[group].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
      }));
  },

  generate(user, variant = 0) {
    const answers = user.respostasQuestionario || {};
    const perfil = user.perfil || {};
    const signature = this.signature(user);

    const c = this.constraints(answers);
    const energy = this.computeEnergy(answers, perfil);
    const split = this.macroSplit(answers, c);

    const targets = {
      kcal: energy.kcal,
      protein: Math.round((energy.kcal * split.p) / 100 / 4),
      carbs: Math.round((energy.kcal * split.c) / 100 / 4),
      fats: Math.round((energy.kcal * split.f) / 100 / 9),
      waterMl: this.waterTarget(energy)
    };

    let size = this.mealsPerDay(answers);
    let upgraded = false;

    if (energy.kcal >= 3200 && size < 6) {
      size = 6;
      upgraded = true;
    } else if (energy.kcal >= 2800 && size < 5) {
      size = 5;
      upgraded = true;
    }

    const structure = PlanData.STRUCTURES[size];
    const times = (answers.q2 === 'Estudo' || answers.q2 === 'Outros') ? PlanData.TIMES.estudo : PlanData.TIMES.trabalho;

    const rand = this.rng(this.hash(`${signature}:${variant}`));

    const pools = {};
    let ignoredAll = [];

    structure.forEach(([slot, share]) => {
      const pool = this.poolFor(slot, c);
      const target = energy.kcal * share;
      const ranked = this.rank(pool.list, target, answers, rand);

      const within = (low, high) => ranked.filter((tpl) => {
        const kcal = this.info(tpl).kcal;
        return kcal * high >= target * 0.97 && kcal * low <= target * 1.03;
      });

      const comfortable = within(0.7, 1.5);
      const feasible = comfortable.length >= 4 ? comfortable : within(0.65, 2);

      if (feasible.length >= 4) {
        pools[slot] = feasible;
      } else {
        const distance = (tpl) => Math.abs(Math.log(this.info(tpl).kcal / target));

        pools[slot] = ranked
          .slice()
          .sort((a, b) => distance(a) - distance(b))
          .slice(0, Math.max(4, feasible.length));
      }

      pool.ignored.forEach((key) => {
        if (!ignoredAll.includes(key)) ignoredAll.push(key);
      });
    });

    const offsets = {};
    structure.forEach(([slot]) => {
      offsets[slot] = Math.floor(rand() * pools[slot].length);
    });

    if (offsets.lanche1 !== undefined && offsets.lanche2 !== undefined && pools.lanche1.length > 1) {
      offsets.lanche2 = (offsets.lanche1 + Math.floor(pools.lanche1.length / 2)) % pools.lanche2.length;
    }

    const isMeat = (tpl) => {
      const flags = this.info(tpl).flags;
      return flags.has('M') || flags.has('R') || flags.has('F');
    };

    let meatMeals = 0;
    const days = {};

    PlanData.DAYS.forEach((dayKey, dayIndex) => {
      const picks = structure.map(([slot, share]) => {
        const pool = pools[slot];
        let index = (offsets[slot] + dayIndex) % pool.length;
        let tpl = pool[index];

        if (c.diet === 'flexitariano' && (slot === 'almoco' || slot === 'jantar')) {
          for (let tries = 0; tries < pool.length && isMeat(tpl) && meatMeals >= 4; tries++) {
            index = (index + 1) % pool.length;
            tpl = pool[index];
          }

          if (isMeat(tpl)) meatMeals++;
        }

        return { slot, share, tpl, target: energy.kcal * share };
      });

      const make = () => picks.map(pick => ({
        slot: pick.slot,
        label: PlanData.SLOT_LABELS[pick.slot],
        icon: PlanData.SLOT_ICONS[pick.slot],
        time: times[pick.slot],
        ...this.build(pick.tpl, pick.target)
      }));

      let meals = make();

      for (let pass = 0; pass < 2; pass++) {
        const total = meals.reduce((t, meal) => t + meal.kcal, 0);

        if (Math.abs(total / energy.kcal - 1) <= 0.03) break;

        const ratio = energy.kcal / total;
        picks.forEach((pick) => { pick.target *= ratio; });
        meals = make();
      }

      days[dayKey] = meals;
    });

    const titles = this.titles(user, answers, c);

    const restrictions = [];
    if (c.lactose) restrictions.push('Sem lactose');
    if (c.gluten) restrictions.push('Sem glúten');
    if (c.avoidRed) restrictions.push('Sem carne vermelha');
    if (c.avoidSweet && !ignoredAll.includes('avoidSweet')) restrictions.push('Sem açúcar adicionado');
    if (c.lowSodium && !ignoredAll.includes('lowSodium')) restrictions.push('Baixo sódio');
    if (c.lightDigestion) restrictions.push('Digestão leve');

    const dietLabel = {
      vegano: 'Vegano',
      vegetariano: 'Vegetariano',
      flexitariano: 'Flexitariano',
      onivoro: 'Onívoro'
    }[c.diet];

    const notes = ['Este plano é uma orientação geral baseada nas suas respostas e não substitui a avaliação de um nutricionista.'];

    if (energy.minor) notes.push('Como você tem menos de 18 anos, valide este plano com um responsável e um profissional de saúde.');

    return {
      version: this.VERSION,
      generatedAt: new Date().toISOString(),
      signature,
      variant,
      title: titles.title,
      description: titles.description,
      routineTitle: titles.routineTitle,
      basis: energy.basis,
      targets,
      split,
      meta: {
        mealsPerDay: size,
        dietLabel,
        restrictions,
        detailed: answers.q25 !== 'Simples'
      },
      schedule: structure.map(([slot, share]) => ({
        slot,
        label: PlanData.SLOT_LABELS[slot],
        time: times[slot],
        share
      })),
      highlights: this.highlights(answers, c, energy, size, split, ignoredAll, upgraded),
      tips: this.tips(answers, c, targets.waterMl),
      notes,
      days,
      shopping: this.shopping(days)
    };
  }
};

const PlanoModule = {
  plan: null,
  user: null,
  answers: {},
  currentDay: 'seg',
  els: {},

  DAY_BY_INDEX: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'],

  init() {
    const user = Auth.getAuthenticatedUser();
    if (!user) return;

    UI.injectPlanStyles();

    HomeModule.fillAnswers(user);
    HomeModule.fillPlan(user);

    const g = (id) => document.getElementById(id);

    this.els = {
      grid: g('meals-grid'),
      empty: g('empty-plan-state'),
      kcal: g('val-kcal'),
      protein: g('val-protein'),
      carbs: g('val-carbs'),
      fats: g('val-fats')
    };

    this.user = user;
    this.answers = user.respostasQuestionario || {};
    this.currentDay = this.DAY_BY_INDEX[new Date().getDay()];

    this.bindDays();

    if (!PlanGenerator.hasAnswers(this.answers)) {
      this.showEmptyState();
      return;
    }

    this.plan = this.ensurePlan(user);

    if (!this.plan) {
      this.showEmptyState();
      return;
    }

    this.mount();
    this.renderAll();
    this.bindActions();
  },

  ensurePlan(user) {
    const current = user.planoAlimentar;
    const signature = PlanGenerator.signature(user);

    if (current && current.days && current.version === PlanGenerator.VERSION && current.signature === signature) {
      return current;
    }

    return this.savePlan(user, PlanGenerator.generate(user, current && current.variant ? current.variant : 0));
  },

  savePlan(user, plan) {
    try {
      const updated = StorageDB.updateUserData(user.id, (u) => {
        u.planoAlimentar = plan;
      });

      if (updated) this.user = updated;
    } catch (error) {
      console.error('[NutriHub] Não foi possível salvar o plano:', error);
    }

    return plan;
  },

  showEmptyState() {
    const { empty, grid } = this.els;

    Utils.toggle(grid, false);

    if (!empty) return;

    Utils.toggle(empty, true);

    const title = empty.querySelector('.empty-title');
    const text = empty.querySelector('.empty-text');

    if (title) title.textContent = 'Seu plano alimentar ainda não foi gerado';
    if (text) text.textContent = 'Responda ao questionário inicial e o NutriHub monta um plano completo, com cardápio de 7 dias, metas de nutrientes e lista de compras.';

    if (!empty.querySelector('.nhpl-empty-cta')) {
      const link = document.createElement('a');
      link.href = CONFIG.PATHS.QUESTIONARIO;
      link.className = 'btn-primary-sm nhpl-empty-cta';
      link.textContent = 'Responder questionário';
      empty.appendChild(link);
    }
  },

  mount() {
    if (!document.getElementById('plan-banner')) {
      const banner = document.createElement('section');
      banner.id = 'plan-banner';

      const nav = document.querySelector('.days-nav-card');
      const header = document.querySelector('.page-header');

      if (nav) nav.insertAdjacentElement('beforebegin', banner);
      else if (header) header.insertAdjacentElement('afterend', banner);
      else document.body.appendChild(banner);
    }

    if (!document.getElementById('plan-extras')) {
      const extras = document.createElement('div');
      extras.id = 'plan-extras';

      const { grid } = this.els;

      if (grid) grid.insertAdjacentElement('afterend', extras);
      else document.body.appendChild(extras);
    }
  },

  bindDays() {
    const buttons = document.querySelectorAll('.day-btn[data-day]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!this.plan) return;

        this.currentDay = btn.dataset.day;
        this.renderDay();
        this.renderExtras();
      });
    });
  },

  bindActions() {
    const { grid } = this.els;

    if (grid) {
      grid.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-register-slot]');
        if (btn) this.registerMeal(btn.dataset.registerSlot);
      });
    }

    document.addEventListener('click', (e) => {
      if (e.target.closest('#nhpl-regen')) this.regenerate();
    });
  },

  registerMeal(slot) {
    const meals = this.plan.days[this.currentDay] || [];
    const meal = meals.find(item => item.slot === slot);

    if (!meal) return;

    const payload = {
      type: PlanData.REGISTER_TYPES[slot],
      title: meal.name,
      time: meal.time,
      foods: meal.items.map(item => ({
        name: item.name,
        portion: item.display,
        calories: item.kcal
      }))
    };

    try {
      sessionStorage.setItem(CONFIG.KEYS.PREFILL, JSON.stringify(payload));
    } catch (error) {
      UI.showToast('Não foi possível carregar esta refeição no registro.', 'error');
      return;
    }

    window.location.href = CONFIG.PATHS.REGISTRO;
  },

  regenerate() {
    const user = Auth.getAuthenticatedUser();
    if (!user || !this.plan) return;

    const variant = (this.plan.variant || 0) + 1;

    this.plan = this.savePlan(user, PlanGenerator.generate(user, variant));
    this.renderAll();

    UI.showToast('Novo cardápio gerado com os mesmos objetivos e restrições.', 'success');
  },

  renderAll() {
    this.renderSummary();
    this.renderBanner();
    this.renderDay();
    this.renderExtras();
  },

  fmt(value) {
    return Math.round(Number(value) || 0).toLocaleString('pt-BR');
  },

  renderSummary() {
    const { kcal, protein, carbs, fats } = this.els;
    const targets = this.plan.targets;

    if (kcal) kcal.textContent = this.fmt(targets.kcal);
    if (protein) protein.textContent = `${targets.protein}g`;
    if (carbs) carbs.textContent = `${targets.carbs}g`;
    if (fats) fats.textContent = `${targets.fats}g`;
  },

  renderBanner() {
    const banner = document.getElementById('plan-banner');
    if (!banner) return;

    const esc = (value) => Utils.sanitizeHTML(value);
    const plan = this.plan;

    const chips = [
      `🍽️ ${plan.meta.mealsPerDay} refeições por dia`,
      `💧 ${(plan.targets.waterMl / 1000).toLocaleString('pt-BR')} L de água`,
      `🥗 ${plan.meta.dietLabel}`
    ].concat(plan.meta.restrictions.map(item => `🚫 ${item}`));

    const basisNote = plan.basis === 'perfil'
      ? 'Calorias calculadas com os dados do seu perfil.'
      : `Calorias estimadas pela sua faixa etária e rotina. <a href="${CONFIG.PATHS.PERFIL}">Complete seu perfil</a> para um cálculo mais preciso.`;

    banner.innerHTML = `
      <div class="nhpl-banner-top">
        <div class="nhpl-banner-main">
          <span class="nhpl-tag">Plano personalizado</span>
          <h2 class="nhpl-banner-title">${esc(plan.title)}</h2>
          <p class="nhpl-banner-desc">${esc(plan.description)}</p>
          <div class="nhpl-chips">
            ${chips.map(chip => `<span class="nhpl-chip">${esc(chip)}</span>`).join('')}
          </div>
        </div>
        <div class="nhpl-banner-side">
          <button type="button" class="nhpl-btn-outline" id="nhpl-regen">🔄 Gerar novo cardápio</button>
          <small class="nhpl-basis">${basisNote}</small>
        </div>
      </div>
      <div class="nhpl-why">
        <h3 class="nhpl-why-title">Como montamos o seu plano</h3>
        <ul class="nhpl-why-list">
          ${plan.highlights.map(item => `<li>${esc(item)}</li>`).join('')}
        </ul>
      </div>
    `;
  },

  mealCard(meal) {
    const esc = (value) => Utils.sanitizeHTML(value);
    const detailed = this.plan.meta.detailed;

    const items = meal.items.map(item => `
      <li>
        <span class="nhpl-item-name">${esc(item.name)}</span>
        <span class="nhpl-item-qty">${esc(item.display)}</span>
        ${detailed ? `<span class="nhpl-item-kcal">${item.kcal} kcal</span>` : ''}
      </li>
    `).join('');

    const macros = detailed
      ? `<div class="nhpl-macros">
           <span>Proteínas <strong>${meal.protein}g</strong></span>
           <span>Carboidratos <strong>${meal.carbs}g</strong></span>
           <span>Gorduras <strong>${meal.fats}g</strong></span>
         </div>`
      : '';

    return `
      <article class="nhpl-meal nhpl-slot-${Utils.escapeAttr(meal.slot)}" data-slot="${Utils.escapeAttr(meal.slot)}">
        <header class="nhpl-meal-head">
          <div class="nhpl-meal-icon" aria-hidden="true">${meal.icon}</div>
          <div class="nhpl-meal-titles">
            <span class="nhpl-meal-slot">${esc(meal.label)} · ${esc(meal.time)}</span>
            <h3 class="nhpl-meal-name">${esc(meal.name)}</h3>
          </div>
          <span class="nhpl-kcal">${meal.kcal} kcal</span>
        </header>
        <ul class="nhpl-items">${items}</ul>
        ${macros}
        <footer class="nhpl-meal-foot">
          <span class="nhpl-prep">${meal.prep === 'rapido' ? '⚡ Preparo rápido' : '👩‍🍳 Preparo moderado'}</span>
          <button type="button" class="nhpl-btn" data-register-slot="${Utils.escapeAttr(meal.slot)}">Registrar esta refeição</button>
        </footer>
      </article>
    `;
  },

  renderDay() {
    const { grid, empty } = this.els;
    const meals = this.plan.days[this.currentDay] || [];

    document.querySelectorAll('.day-btn[data-day]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.day === this.currentDay);
    });

    if (!grid) return;

    Utils.toggle(empty, false);
    Utils.toggle(grid, true);

    grid.innerHTML = meals.map(meal => this.mealCard(meal)).join('');
  },

  renderExtras() {
    const extras = document.getElementById('plan-extras');
    if (!extras) return;

    const esc = (value) => Utils.sanitizeHTML(value);
    const plan = this.plan;
    const meals = plan.days[this.currentDay] || [];

    const sum = (key) => meals.reduce((total, meal) => total + meal[key], 0);

    const rows = [
      ['Calorias', sum('kcal'), plan.targets.kcal, 'kcal'],
      ['Proteínas', sum('protein'), plan.targets.protein, 'g'],
      ['Carboidratos', sum('carbs'), plan.targets.carbs, 'g'],
      ['Gorduras', sum('fats'), plan.targets.fats, 'g']
    ].map(([label, value, target, unit]) => {
      const pct = Math.min(Math.round((value / target) * 100), 130);

      return `
        <div class="nhpl-row">
          <span class="nhpl-row-name">${label}</span>
          <div class="nhpl-meter"><span style="width: ${Math.min(pct, 100)}%;"></span></div>
          <span class="nhpl-row-value">${this.fmt(value)} / ${this.fmt(target)} ${unit}</span>
        </div>
      `;
    }).join('');

    const tips = plan.tips.length
      ? `<ul class="nhpl-tips">${plan.tips.map(tip => `<li>${esc(tip)}</li>`).join('')}</ul>`
      : '<p class="nhpl-muted">Suas dicas aparecem aqui conforme o questionário.</p>';

    const shopping = plan.shopping.map(group => `
      <div class="nhpl-shop-group">
        <h4>${esc(group.group)}</h4>
        <ul>
          ${group.items.map(item => `<li><span>${esc(item.name)}</span><strong>${esc(item.qty)}</strong></li>`).join('')}
        </ul>
      </div>
    `).join('');

    extras.innerHTML = `
      <div class="nhpl-extras-grid">
        <section class="nhpl-card">
          <h3 class="nhpl-card-title">Resumo de ${esc(PlanData.DAY_NAMES[this.currentDay])}</h3>
          <p class="nhpl-card-sub">O que o cardápio do dia entrega em relação à sua meta</p>
          <div class="nhpl-rows">${rows}</div>
          <p class="nhpl-water">💧 Meta de água: <strong>${(plan.targets.waterMl / 1000).toLocaleString('pt-BR')} L</strong> por dia, distribuída ao longo das refeições.</p>
        </section>

        <section class="nhpl-card">
          <h3 class="nhpl-card-title">Dicas para o seu dia a dia</h3>
          <p class="nhpl-card-sub">Escolhidas com base nas suas respostas</p>
          ${tips}
        </section>
      </div>

      <section class="nhpl-card nhpl-shop">
        <h3 class="nhpl-card-title">🛒 Lista de compras da semana</h3>
        <p class="nhpl-card-sub">Quantidades aproximadas para uma pessoa, com arroz, feijão e carnes em peso cru.</p>
        <div class="nhpl-shop-grid">${shopping}</div>
      </section>

      <p class="nhpl-disclaimer">${plan.notes.map(note => esc(note)).join(' ')}</p>
    `;
  }
};

const MetasModule = {
  currentFilter: 'all',

  IDS: {
    grid: ['goals-grid', 'goals-list', 'metas-grid', 'metas-list'],
    empty: ['goals-empty-state', 'goals-empty', 'metas-empty', 'empty-goals'],
    form: ['meta-form', 'goal-form'],
    title: ['meta-title', 'goal-title'],
    category: ['meta-category', 'goal-category'],
    target: ['meta-target', 'goal-target'],
    unit: ['meta-unit', 'goal-unit']
  },

  init() {
    let user = Auth.getAuthenticatedUser();
    if (!user) return;

    user = GoalSync.ensureFresh(user);

    this.renderMetas(user);
    this.setupModal();
    this.setupFilters();
    this.setupGridEvents();
  },

  getFilteredMetas(metas) {
    const f = Utils.normalize(this.currentFilter);

    if (f.includes('conclu')) return metas.filter(m => m.concluida);
    if (f.includes('ativ') || f.includes('andamento')) return metas.filter(m => !m.concluida);

    return metas;
  },

  renderMetas(user) {
    const grid = Utils.pick(this.IDS.grid);
    const emptyState = Utils.pick(this.IDS.empty);
    const metas = user.metas || [];
    const filtered = this.getFilteredMetas(metas);

    this.updateMetrics(user);

    if (!grid) return;

    grid.innerHTML = '';

    if (filtered.length === 0) {
      Utils.toggle(emptyState, true);
      grid.hidden = true;
      return;
    }

    Utils.toggle(emptyState, false);
    grid.hidden = false;

    filtered.forEach((meta) => {
      const current = Number(meta.current || 0);
      const target = Number(meta.target || 0) || 1;
      const percent = Math.min(Math.round((current / target) * 100), 100);
      const isWater = Utils.isHydrationGoal(meta);

      const card = document.createElement('article');
      card.className = 'goal-card';

      card.innerHTML = `
        <div class="goal-card-header">
          <div>
            <span class="goal-category-badge">${Utils.sanitizeHTML(meta.category || 'Geral')}</span>
            <h4 class="goal-card-title" style="margin-top: 6px;">${Utils.sanitizeHTML(meta.title)}</h4>
          </div>
          <button type="button" class="btn-delete-goal"
                  data-delete-goal="${Utils.escapeAttr(meta.id)}"
                  aria-label="Excluir meta">Excluir</button>
        </div>

        <div class="goal-progress-info" style="margin-top: 12px;">
          <span>Progresso</span>
          <span>${Utils.sanitizeHTML(String(current))} / ${Utils.sanitizeHTML(String(meta.target))}
            ${Utils.sanitizeHTML(meta.unit || '')} (${percent}%)</span>
        </div>

        <div class="goal-progress-bar goal-progress-track" style="margin-top: 8px;">
          <div class="goal-progress-fill" style="width: ${percent}%;"></div>
        </div>

        ${isWater
          ? '<span class="goal-hint" style="display:block;margin-top:8px;font-size:0.8rem;opacity:0.75;">💧 Atualizada automaticamente com a água registrada hoje.</span>'
          : `<button type="button" class="btn-toggle-goal"
                     data-toggle-goal="${Utils.escapeAttr(meta.id)}"
                     style="margin-top:10px;">
               ${meta.concluida ? 'Reabrir meta' : 'Marcar como concluída'}
             </button>`}

        ${meta.concluida ? '<span class="goal-completed" style="display:block;margin-top:8px;">✅ Meta concluída!</span>' : ''}
      `;

      grid.appendChild(card);
    });
  },

  updateMetrics(user) {
    const metas = user.metas || [];

    const activeGoalsEl = document.getElementById('val-active-goals');
    const completedTodayEl = document.getElementById('val-completed-today');
    const successRateEl = document.getElementById('val-success-rate');
    const streakEl = document.getElementById('val-streak');

    const activeGoals = metas.filter(m => !m.concluida).length;
    const completed = metas.filter(m => m.concluida).length;
    const successRate = metas.length > 0
      ? Math.round((completed / metas.length) * 100)
      : 0;

    if (activeGoalsEl) activeGoalsEl.textContent = String(activeGoals);
    if (completedTodayEl) completedTodayEl.textContent = String(completed);
    if (successRateEl) successRateEl.textContent = `${successRate}%`;

    if (streakEl) {
      const streak = Utils.computeStreak(user.refeicoes);
      streakEl.textContent = `${streak} ${streak === 1 ? 'dia' : 'dias'}`;
    }
  },

  setupGridEvents() {
    const grid = Utils.pick(this.IDS.grid);
    if (!grid) return;

    grid.addEventListener('click', (e) => {
      const delBtn = e.target.closest('[data-delete-goal]');
      const toggleBtn = e.target.closest('[data-toggle-goal]');

      if (delBtn) {
        this.deleteGoal(delBtn.dataset.deleteGoal);
      } else if (toggleBtn) {
        this.toggleGoal(toggleBtn.dataset.toggleGoal);
      }
    });
  },

  deleteGoal(goalId) {
    const user = Auth.getAuthenticatedUser();
    if (!user) return;

    if (!window.confirm('Deseja excluir esta meta?')) return;

    StorageDB.updateUserData(user.id, (u) => {
      u.metas = (u.metas || []).filter(goal => goal.id !== goalId);
    });

    UI.showToast('Meta excluída.', 'success');

    const fresh = Auth.getAuthenticatedUser();
    if (fresh) this.renderMetas(fresh);
  },

  toggleGoal(goalId) {
    const user = Auth.getAuthenticatedUser();
    if (!user) return;

    StorageDB.updateUserData(user.id, (u) => {
      const meta = (u.metas || []).find(g => g.id === goalId);
      if (!meta) return;

      meta.concluida = !meta.concluida;
      meta.current = meta.concluida ? Number(meta.target || 0) : 0;
    });

    const fresh = Auth.getAuthenticatedUser();
    if (fresh) this.renderMetas(fresh);
  },

  createGoal() {
    const user = Auth.getAuthenticatedUser();
    if (!user) return false;

    const read = (ids) => {
      const el = Utils.pick(ids);
      return el ? String(el.value || '').trim() : '';
    };

    const title = read(this.IDS.title);
    const category = read(this.IDS.category);
    const target = parseFloat(read(this.IDS.target));
    const unit = read(this.IDS.unit);

    if (!title || !category || !Number.isFinite(target) || target <= 0 || !unit) {
      UI.showToast('Por favor, preencha todos os campos da meta.', 'error');
      return false;
    }

    const newMeta = {
      id: 'goal_' + Date.now().toString(36) + '_' +
        Math.random().toString(36).substring(2, 6),
      title,
      category,
      target,
      current: 0,
      unit,
      frequencia: 'diaria',
      concluida: false,
      createdAt: new Date().toISOString()
    };

    const updated = StorageDB.updateUserData(user.id, (u) => {
      if (!Array.isArray(u.metas)) u.metas = [];
      u.metas.push(newMeta);
      GoalSync.compute(u);
    });

    if (!updated) {
      UI.showToast('Não foi possível salvar a meta.', 'error');
      return false;
    }

    UI.showToast('Meta criada com sucesso!', 'success');
    this.renderMetas(updated);

    return true;
  },

  setupModal() {
    const modal = document.getElementById('meta-modal');

    const btnOpenTop =
      document.getElementById('btn-open-meta-modal') ||
      document.getElementById('btn-open-modal');

    const btnOpenEmpty = document.getElementById('btn-create-first');
    const btnClose = document.getElementById('btn-close-meta-modal');
    const btnCancel = document.getElementById('btn-cancel-meta');
    const form = Utils.pick(this.IDS.form);

    const open = () => {
      if (!modal) return;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      if (modal) {
        modal.hidden = true;
        document.body.style.overflow = '';
      }

      if (form) form.reset();
    };

    if (btnOpenTop) btnOpenTop.addEventListener('click', open);
    if (btnOpenEmpty) btnOpenEmpty.addEventListener('click', open);
    if (btnClose) btnClose.addEventListener('click', close);
    if (btnCancel) btnCancel.addEventListener('click', close);

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) close();
      });
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (this.createGoal()) close();
      });
    }
  },

  setupFilters() {
    const pillBtns = document.querySelectorAll('.pill-btn[data-filter]');

    pillBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        pillBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.currentFilter = btn.dataset.filter || 'all';

        const user = Auth.getAuthenticatedUser();
        if (user) this.renderMetas(user);
      });
    });
  }
};

const ProgressoModule = {
  days: 7,
  root: null,

  TYPE_COLORS: {
    'café': '#E8A317',
    'almoço': '#16A36A',
    'lanche': '#F0701F',
    'jantar': '#5B63D3',
    'ceia': '#8A5CD0',
    'outro': '#9AA8A0'
  },

  init() {
    let user = Auth.getAuthenticatedUser();
    if (!user) return;

    user = GoalSync.ensureFresh(user);

    UI.injectProgressStyles();

    this.mount();
    this.render(user);
  },

  mount() {
    let root = document.getElementById('progress-dashboard');

    if (!root) {
      root = document.createElement('div');
      root.id = 'progress-dashboard';

      const main = document.querySelector('.main-content') || document.querySelector('main');

      if (main) {
        const header = main.querySelector('.page-header');

        Array.from(main.children).forEach((child) => {
          if (child !== header) child.style.display = 'none';
        });

        if (header) {
          header.insertAdjacentElement('afterend', root);
        } else {
          main.appendChild(root);
        }
      } else {
        document.body.appendChild(root);
      }
    }

    this.root = root;

    root.addEventListener('click', (e) => {
      const pill = e.target.closest('[data-nhp-period]');
      if (!pill) return;

      this.days = parseInt(pill.dataset.nhpPeriod, 10) || 7;

      const current = Auth.getAuthenticatedUser();
      if (current) this.render(current);
    });
  },

  fmt(value) {
    return Math.round(Number(value) || 0).toLocaleString('pt-BR');
  },

  compute(user, days) {
    const records = user.refeicoes || [];
    const meals = Utils.mealsOnly(records);

    const dates = new Set(Utils.buildDailySeries(days, () => 0).map(i => i.dateISO));
    const periodMeals = meals.filter(m => dates.has(m.date));

    const kcalSeries = Utils.buildDailySeries(days, (d) =>
      periodMeals
        .filter(m => m.date === d)
        .reduce((t, m) => t + (Number(m.calories) || 0), 0)
    );

    const waterSeries = Utils.buildDailySeries(days, (d) => Utils.waterTotalForDate(records, d));

    const sum = (arr) => arr.reduce((t, i) => t + i.value, 0);
    const kcalTotal = sum(kcalSeries);
    const waterTotal = sum(waterSeries);
    const activeDays = new Set(periodMeals.map(m => m.date)).size;

    const typeMap = {};
    periodMeals.forEach((m) => {
      typeMap[m.type] = (typeMap[m.type] || 0) + 1;
    });

    const types = Object.keys(typeMap)
      .map(type => ({ type, count: typeMap[type] }))
      .sort((a, b) => b.count - a.count);

    const foodMap = new Map();
    periodMeals.forEach((m) => {
      (m.foods || []).forEach((f) => {
        const key = Utils.normalize(f.name);
        if (!key) return;

        const current = foodMap.get(key) || { name: f.name, count: 0, kcal: 0 };
        current.count += 1;
        current.kcal += Number(f.calories) || 0;
        foodMap.set(key, current);
      });
    });

    const topFoods = Array.from(foodMap.values())
      .sort((a, b) => b.count - a.count || b.kcal - a.kcal)
      .slice(0, 5);

    const topKcalDay = kcalSeries.reduce((best, item) => (item.value > best.value ? item : best), { value: 0 });
    const topWaterDay = waterSeries.reduce((best, item) => (item.value > best.value ? item : best), { value: 0 });

    const biggestMeal = periodMeals.reduce(
      (best, m) => ((Number(m.calories) || 0) > (Number(best.calories) || 0) ? m : best),
      { calories: 0 }
    );

    const todayWater = Utils.waterTotalForDate(records, Utils.todayISO());
    const targetMl = HomeModule.getHydrationTargetMl(user);

    return {
      days,
      mealsCount: periodMeals.length,
      kcalSeries,
      waterSeries,
      kcalTotal,
      avgKcal: activeDays > 0 ? kcalTotal / activeDays : 0,
      activeDays,
      streak: Utils.computeStreak(records),
      todayWater,
      targetMl,
      avgWater: waterTotal / days,
      types,
      topFoods,
      topKcalDay,
      topWaterDay,
      biggestMeal,
      metas: user.metas || []
    };
  },

  barsHTML(series, kind, days) {
    const max = Math.max(...series.map(i => i.value), 1);
    const last = series.length - 1;

    const columns = series.map((item, index) => {
      const pct = item.value > 0 ? Math.max(Math.round((item.value / max) * 100), 6) : 0;

      const valueText = days <= 7 && item.value > 0
        ? (kind === 'water' ? Utils.formatMlShort(item.value) : this.fmt(item.value))
        : '';

      const showLabel = days <= 7 || (last - index) % 6 === 0;

      const title = kind === 'water'
        ? `${item.label}: ${Utils.formatMl(item.value)}`
        : `${item.label}: ${this.fmt(item.value)} kcal`;

      return `
        <div class="nhp-col" title="${Utils.escapeAttr(title)}">
          <span class="nhp-val">${Utils.sanitizeHTML(valueText)}</span>
          <div class="nhp-track">
            <div class="nhp-fill is-${kind}" style="height: ${pct}%;"></div>
          </div>
          <span class="nhp-label">${showLabel ? Utils.sanitizeHTML(item.label) : ''}</span>
        </div>
      `;
    }).join('');

    return `<div class="nhp-bars">${columns}</div>`;
  },

  kpiHTML(icon, value, label, hint) {
    return `
      <div class="nhp-kpi">
        <div class="nhp-kpi-icon" aria-hidden="true">${icon}</div>
        <div class="nhp-kpi-data">
          <span class="nhp-kpi-value">${Utils.sanitizeHTML(value)}</span>
          <span class="nhp-kpi-label">${Utils.sanitizeHTML(label)}</span>
          <span class="nhp-kpi-hint">${Utils.sanitizeHTML(hint)}</span>
        </div>
      </div>
    `;
  },

  typesHTML(data) {
    if (data.types.length === 0) {
      return '<div class="nhp-empty">Nenhuma refeição registrada neste período.</div>';
    }

    const total = data.types.reduce((t, i) => t + i.count, 0);

    return data.types.map((item) => {
      const pct = Math.round((item.count / total) * 100);
      const color = this.TYPE_COLORS[item.type] || this.TYPE_COLORS['outro'];
      const icon = MealService.TYPE_ICONS[item.type] || '🍴';
      const label = MealService.TYPE_LABELS[item.type] || 'Refeição';

      return `
        <div class="nhp-row">
          <span class="nhp-row-name">${icon} ${Utils.sanitizeHTML(label)}</span>
          <div class="nhp-meter"><span style="width: ${pct}%; background: ${color};"></span></div>
          <span class="nhp-row-value">${item.count} (${pct}%)</span>
        </div>
      `;
    }).join('');
  },

  foodsHTML(data) {
    if (data.topFoods.length === 0) {
      return '<div class="nhp-empty">Adicione alimentos às suas refeições para ver os mais consumidos.</div>';
    }

    const items = data.topFoods.map((food, index) => {
      const kcal = food.kcal > 0 ? ` · ${this.fmt(food.kcal)} kcal` : '';

      return `
        <div class="nhp-item">
          <span class="nhp-rank">${index + 1}</span>
          <span class="nhp-item-main">${Utils.sanitizeHTML(food.name)}</span>
          <span class="nhp-item-meta">${food.count}x${kcal}</span>
        </div>
      `;
    }).join('');

    return `<div class="nhp-list">${items}</div>`;
  },

  highlightsHTML(data) {
    const rows = [];

    if (data.topKcalDay.value > 0) {
      rows.push(['Dia mais calórico', `${Utils.formatDateBR(data.topKcalDay.dateISO)} · ${this.fmt(data.topKcalDay.value)} kcal`]);
    }

    if ((Number(data.biggestMeal.calories) || 0) > 0) {
      const label = data.biggestMeal.title || MealService.TYPE_LABELS[data.biggestMeal.type] || 'Refeição';
      rows.push(['Refeição mais calórica', `${label} · ${this.fmt(data.biggestMeal.calories)} kcal`]);
    }

    if (data.types.length > 0) {
      rows.push(['Refeição mais registrada', `${MealService.TYPE_LABELS[data.types[0].type] || 'Refeição'} (${data.types[0].count}x)`]);
    }

    if (data.topWaterDay.value > 0) {
      rows.push(['Melhor dia de hidratação', `${Utils.formatDateBR(data.topWaterDay.dateISO)} · ${Utils.formatMl(data.topWaterDay.value)}`]);
    }

    if (rows.length === 0) {
      return '<div class="nhp-empty">Os destaques aparecem conforme você registra refeições, calorias e água.</div>';
    }

    const items = rows.map(([label, value]) => `
      <div class="nhp-item nhp-hl">
        <span>${Utils.sanitizeHTML(label)}</span>
        <strong>${Utils.sanitizeHTML(value)}</strong>
      </div>
    `).join('');

    return `<div class="nhp-list">${items}</div>`;
  },

  goalsHTML(data) {
    if (data.metas.length === 0) {
      return `<div class="nhp-empty">Você ainda não tem metas. <a href="${CONFIG.PATHS.METAS}">Criar uma meta</a></div>`;
    }

    const items = data.metas.map((meta) => {
      const current = Number(meta.current) || 0;
      const target = Number(meta.target) || 1;
      const pct = Math.min(Math.round((current / target) * 100), 100);

      return `
        <div class="nhp-goal">
          <div class="nhp-goal-top">
            <span><strong>${Utils.sanitizeHTML(meta.title)}</strong>${meta.concluida ? ' ✅' : ''}</span>
            <span>${Utils.sanitizeHTML(String(current))} / ${Utils.sanitizeHTML(String(meta.target))} ${Utils.sanitizeHTML(meta.unit || '')} · ${pct}%</span>
          </div>
          <div class="nhp-meter"><span style="width: ${pct}%;"></span></div>
        </div>
      `;
    }).join('');

    return `<div class="nhp-list">${items}</div>`;
  },

  render(user) {
    if (!this.root) return;

    const days = this.days;
    const hasRecords = (user.refeicoes || []).length > 0;

    const pills = [7, 30].map(value => `
      <button type="button" class="nhp-pill ${days === value ? 'is-active' : ''}"
              data-nhp-period="${value}">Últimos ${value} dias</button>
    `).join('');

    const head = `
      <div class="nhp-head">
        <div>
          <h2 class="nhp-title">Seu progresso alimentar</h2>
          <p class="nhp-sub">Estatísticas calculadas a partir das refeições e da água que você registra.</p>
        </div>
        <div class="nhp-pills">${pills}</div>
      </div>
    `;

    if (!hasRecords) {
      this.root.innerHTML = `
        ${head}
        <div class="nhp-hero-empty">
          <div style="font-size: 2.4rem;" aria-hidden="true">📊</div>
          <h3>Ainda não há dados para mostrar</h3>
          <p>Registre sua primeira refeição ou ingestão de água e suas estatísticas aparecerão aqui automaticamente.</p>
          <a class="nhp-cta" href="${CONFIG.PATHS.REGISTRO}">+ Registrar refeição</a>
        </div>
      `;
      return;
    }

    const data = this.compute(user, days);

    const waterHint = data.targetMl > 0
      ? `${Math.min(Math.round((data.todayWater / data.targetMl) * 100), 100)}% da meta de ${Utils.formatMl(data.targetMl)}`
      : 'Registre água para criar a meta';

    const kcalNote = data.kcalTotal > 0
      ? `${this.fmt(data.kcalTotal)} kcal no período`
      : 'Informe as calorias dos alimentos para ver este gráfico';

    const kpis = [
      this.kpiHTML('🍽️', String(data.mealsCount), 'Refeições registradas', `nos últimos ${days} dias`),
      this.kpiHTML('🔥', `${this.fmt(data.kcalTotal)} kcal`, 'Calorias totais', `média de ${this.fmt(data.avgKcal)} kcal por dia registrado`),
      this.kpiHTML('📅', `${data.activeDays}/${days}`, 'Dias com registro', `${Math.round((data.activeDays / days) * 100)}% de constância`),
      this.kpiHTML('⚡', `${data.streak} ${data.streak === 1 ? 'dia' : 'dias'}`, 'Sequência atual', 'dias seguidos com registros'),
      this.kpiHTML('💧', Utils.formatMl(data.todayWater), 'Água hoje', waterHint),
      this.kpiHTML('🥤', Utils.formatMl(data.avgWater), 'Média diária de água', `nos últimos ${days} dias`)
    ].join('');

    this.root.innerHTML = `
      ${head}

      <div class="nhp-kpis">${kpis}</div>

      <div class="nhp-grid">
        <section class="nhp-card">
          <div>
            <h3 class="nhp-card-title">Calorias por dia</h3>
            <p class="nhp-card-sub">${Utils.sanitizeHTML(kcalNote)}</p>
          </div>
          ${this.barsHTML(data.kcalSeries, 'kcal', days)}
        </section>

        <section class="nhp-card">
          <div>
            <h3 class="nhp-card-title">Hidratação por dia</h3>
            <p class="nhp-card-sub">${Utils.sanitizeHTML(Utils.formatMl(data.avgWater))} por dia em média</p>
          </div>
          ${this.barsHTML(data.waterSeries, 'water', days)}
        </section>
      </div>

      <div class="nhp-grid">
        <section class="nhp-card">
          <div>
            <h3 class="nhp-card-title">Refeições por tipo</h3>
            <p class="nhp-card-sub">Distribuição dos seus registros no período</p>
          </div>
          ${this.typesHTML(data)}
        </section>

        <section class="nhp-card">
          <div>
            <h3 class="nhp-card-title">Alimentos mais consumidos</h3>
            <p class="nhp-card-sub">Os 5 itens que mais aparecem nas suas refeições</p>
          </div>
          ${this.foodsHTML(data)}
        </section>
      </div>

      <div class="nhp-grid">
        <section class="nhp-card">
          <div>
            <h3 class="nhp-card-title">Destaques</h3>
            <p class="nhp-card-sub">Os momentos que mais se destacaram</p>
          </div>
          ${this.highlightsHTML(data)}
        </section>

        <section class="nhp-card">
          <div>
            <h3 class="nhp-card-title">Progresso das metas</h3>
            <p class="nhp-card-sub">Acompanhe o andamento de cada meta</p>
          </div>
          ${this.goalsHTML(data)}
        </section>
      </div>
    `;
  }
};

const PerfilModule = {
  init() {
    const user = Auth.getAuthenticatedUser();
    if (!user) return;

    this.loadUserData(user);
    this.setupForm(user);
  },

  loadUserData(user) {
    const perfil = user.perfil || {};

    const fields = {
      'perfil-name': user.name || '',
      'perfil-birth': perfil.dataNascimento || '',
      'perfil-gender': perfil.genero || '',
      'perfil-activity': perfil.nivelAtividade || '',
      'perfil-weight': perfil.pesoAtual ?? '',
      'perfil-target-weight': perfil.metaPeso ?? '',
      'perfil-height': perfil.altura ?? ''
    };

    Object.entries(fields).forEach(([id, value]) => {
      const el = document.getElementById(id);

      if (el && value !== '') el.value = value;
    });
  },

  setupForm(user) {
    const form = document.getElementById('perfil-form');
    if (!form) return;

    let saving = false;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (saving) return;

      const read = (id) => {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
      };

      const name = read('perfil-name');
      const birth = read('perfil-birth');
      const gender = read('perfil-gender');
      const activity = read('perfil-activity');
      const weight = parseFloat(read('perfil-weight'));

      const targetRaw = read('perfil-target-weight');
      const targetWeight = targetRaw === '' ? null : parseFloat(targetRaw);

      const height = parseFloat(read('perfil-height'));

      if (
        !name || !birth || !gender || !activity ||
        Number.isNaN(weight) || Number.isNaN(height)
      ) {
        UI.showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      const birthDate = Utils.parseLocalDate(birth);
      const today = new Date();

      if (
        Number.isNaN(birthDate.getTime()) ||
        birthDate > today ||
        birthDate.getFullYear() < today.getFullYear() - 120
      ) {
        UI.showToast('Informe uma data de nascimento válida.', 'error');
        return;
      }

      if (weight < 20 || weight > 500) {
        UI.showToast('Informe um peso atual válido.', 'error');
        return;
      }

      if (
        targetWeight !== null &&
        (Number.isNaN(targetWeight) || targetWeight < 20 || targetWeight > 500)
      ) {
        UI.showToast('Informe uma meta de peso válida.', 'error');
        return;
      }

      if (height < 50 || height > 260) {
        UI.showToast('Informe uma altura válida em centímetros.', 'error');
        return;
      }

      const updated = StorageDB.updateUserData(user.id, (u) => {
        u.name = name;

        u.perfil = {
          dataNascimento: birth,
          genero: gender,
          nivelAtividade: activity,
          pesoAtual: weight,
          metaPeso: targetWeight,
          altura: height,
          atualizadoEm: new Date().toISOString()
        };
      });

      if (!updated) return;

      saving = true;

      document.querySelectorAll('.user-avatar').forEach(el => {
        el.textContent = Utils.getInitials(updated.name);
      });

      UI.showToast('Perfil salvo com sucesso!', 'success');

      setTimeout(() => {
        window.location.replace(CONFIG.PATHS.HOME);
      }, 800);
    });
  }
};

const ConfiguracoesModule = {
  init() {
    const user = Auth.getAuthenticatedUser();
    if (!user) return;

    this.loadUserData(user);
    this.setupForm(user);
  },

  loadUserData(user) {
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');

    if (nameInput) nameInput.value = user.name || '';
    if (emailInput) emailInput.value = user.email || '';
  },

  setupForm(user) {
    const form = document.getElementById('settings-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('user-name');
      const emailInput = document.getElementById('user-email');

      const newName = nameInput ? nameInput.value.trim() : user.name;
      const newEmail = emailInput ? emailInput.value.trim() : user.email;

      if (!newName || !newEmail) {
        UI.showToast('Nome e e-mail são obrigatórios.', 'error');
        return;
      }

      if (!Utils.validateEmail(newEmail)) {
        UI.showToast('Por favor, insira um e-mail válido.', 'error');
        return;
      }

      const existing = StorageDB.findUserByEmail(newEmail);

      if (existing && existing.id !== user.id) {
        UI.showToast('Este e-mail já está em uso por outra conta.', 'error');
        return;
      }

      const updated = StorageDB.updateUserData(user.id, (u) => {
        u.name = newName;
        u.email = newEmail;
      });

      if (updated) {
        Shell.init(updated);
        UI.showToast('Configurações salvas com sucesso!', 'success');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  StorageDB.purgeLegacyStorage();

  const canProceed = RouterGuard.protect();

  if (!canProceed) return;

  const page = Utils.getCurrentPage();

  const modules = {
    'cadastro.html': RegisterModule,
    'index.html': LoginModule,
    'quest.html': QuestionnaireModule,
    'home.html': HomeModule,
    'hist.html': HistoricoModule,
    'registro.html': RegistroModule,
    'plano.html': PlanoModule,
    'metas.html': MetasModule,
    'progresso.html': ProgressoModule,
    'perfil.html': PerfilModule,
    'config.html': ConfiguracoesModule
  };

  const user = Auth.getAuthenticatedUser();

  if (user && !CONFIG.PUBLIC_PAGES.includes(page)) {
    Shell.init(user);
  }

  if (modules[page]) {
    try {
      modules[page].init();
    } catch (error) {
      console.error(`[NutriHub] Erro ao iniciar o módulo de ${page}:`, error);
    }
  }
});