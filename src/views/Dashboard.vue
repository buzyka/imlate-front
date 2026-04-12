<template>
  <div class="landing-page">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">ImLate Administration</p>
        <h1 class="hero-title">Registration system.</h1>
        <p class="hero-text">
          Welcome back, {{ userName }}. ImLate gives your team one clear place to
          manage visitors, follow attendance activity, and keep access workflows organized.
        </p>
        <div class="hero-actions">
          <a
            href="https://imlate.buzyka.com/getting-started.html"
            target="_blank"
            rel="noopener"
            class="hero-action hero-action--brand"
          >
            Getting Started
          </a>
          <a
            href="https://imlate.buzyka.com/"
            target="_blank"
            rel="noopener"
            class="hero-action hero-action--alt"
          >
            Documentation
          </a>
        </div>
      </div>

      <div class="hero-visual" aria-hidden="true">
        <img :src="heroLogo" alt="" class="hero-logo">
      </div>
    </section>

    <section class="feature-grid">
      <a
        href="https://imlate.buzyka.com/getting-started.html"
        target="_blank"
        rel="noopener"
        class="feature-card"
      >
        <div class="feature-icon">📖</div>
        <h2 class="feature-title">Getting Started</h2>
        <p class="feature-details">
          Open the quickest path to setup, first steps, and the main ImLate workflow.
        </p>
      </a>

      <a
        href="https://imlate.buzyka.com/admin/index.html"
        target="_blank"
        rel="noopener"
        class="feature-card"
      >
        <div class="feature-icon">⚙️</div>
        <h2 class="feature-title">Admin Panel</h2>
        <p class="feature-details">
          Manage visitors, admin users, profile details, branding, and system settings.
        </p>
      </a>

      <a
        href="https://imlate.buzyka.com/public-frontend/index.html"
        target="_blank"
        rel="noopener"
        class="feature-card"
      >
        <div class="feature-icon">🖥️</div>
        <h2 class="feature-title">Tracking point</h2>
        <p class="feature-details">
          Read how the public tracking part works, including the RFID reader flow and attendance events.
        </p>
      </a>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth.js'
import heroLogo from '../assets/big-logo.png'

const auth = useAuthStore()
const userName = computed(() => auth.userName)
</script>

<style scoped>
.landing-page {
  --landing-navy: #1b2a4a;
  --landing-navy-light: #253a63;
  --landing-orange: #f5a623;
  --landing-orange-dark: #e8961e;
  --landing-text: #2c3e50;
  --landing-soft: #f7f8fa;
  --landing-border: rgba(27, 42, 74, 0.1);

  width: 100%;
  max-width: 1180px;
  margin: 0;
  min-height: 100%;
  padding: 20px 32px 12px;
  color: var(--landing-text);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 560px) minmax(260px, 1fr);
  gap: 48px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0 32px;
  border-bottom: 2px solid var(--landing-orange);
}

.eyebrow {
  margin: 0;
  color: var(--landing-navy);
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-title {
  max-width: 10ch;
  margin: 10px 0 0;
  color: var(--landing-navy);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  line-height: 1.05;
}

.hero-text {
  max-width: 34rem;
  margin: 18px 0 0;
  font-size: 1.04rem;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.hero-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 164px;
  padding: 12px 20px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
}

.hero-action--brand {
  background: var(--landing-orange);
  color: #fff;
}

.hero-action--brand:hover {
  background: var(--landing-orange-dark);
}

.hero-action--alt {
  border-color: var(--landing-navy);
  color: var(--landing-navy);
  background: transparent;
}

.hero-action--alt:hover {
  border-color: var(--landing-navy-light);
  color: var(--landing-navy-light);
  background: rgba(27, 42, 74, 0.05);
}

.hero-visual {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-logo {
  width: min(100%, 260px);
  height: auto;
  display: block;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-top: 28px;
}

.feature-card {
  display: block;
  padding: 24px;
  background: #fff;
  border: 1px solid var(--landing-border);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.feature-card:hover {
  box-shadow: 0 8px 24px rgba(27, 42, 74, 0.12);
  transform: translateY(-3px);
}

.feature-icon {
  margin-bottom: 12px;
  font-size: 32px;
}

.feature-title {
  margin: 0 0 8px;
  color: var(--landing-navy);
  font-size: 17px;
  font-weight: 600;
}

.feature-details {
  margin: 0;
  font-size: 14px;
  color: var(--landing-text);
  opacity: 0.8;
  line-height: 1.5;
}

@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 24px;
    padding-bottom: 28px;
  }

  .hero-logo {
    width: min(100%, 250px);
  }
}

@media (max-width: 768px) {
  .landing-page {
    padding: 0;
  }

  .hero-title {
    max-width: none;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-action {
    width: 100%;
  }
}
</style>
