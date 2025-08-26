import React, { useEffect, useMemo, useState } from 'react';
import Spline from '@splinetool/react-spline';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.('change', onChange);
    return () => m.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

function Logo() {
  return (
    <div className="logo" aria-label="Cursor for Music">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <path fill="currentColor" d="M22 2v16.2a6.5 6.5 0 1 1-2-4.6V7.5L10 10.2V22a6.5 6.5 0 1 1-2-4.6V7.8L22 4.2V2z"/>
      </svg>
      <span>Cursor</span>
      <span className="sub">for Music</span>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <header className={`nav ${open ? 'open' : ''}`}>
      <div className="container">
        <a href="#" className="brand" aria-label="Cursor for Music home">
          <Logo />
        </a>
        <nav className="links" aria-label="Primary">
          <a href="#product">Product</a>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
          <a href="#blog">Blog</a>
        </nav>
        <div className="actions">
          <a className="btn ghost" href="#signin">Sign in</a>
          <a className="btn primary" href="#get-started">Start free</a>
        </div>
        <button className="hamburger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="mobile" hidden={!open}>
        <a href="#product" onClick={() => setOpen(false)}>Product</a>
        <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
        <a href="#docs" onClick={() => setOpen(false)}>Docs</a>
        <a href="#blog" onClick={() => setOpen(false)}>Blog</a>
        <div className="m-actions">
          <a className="btn ghost" href="#signin" onClick={() => setOpen(false)}>Sign in</a>
          <a className="btn primary" href="#get-started" onClick={() => setOpen(false)}>Start free</a>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sceneUrl = useMemo(
    () => 'https://prod.spline.design/QrI46EbSvyxcmozb/scene.splinecode',
    []
  );

  return (
    <div className="app">
      <div className="bg">
        {!prefersReducedMotion ? (
          <Spline scene={sceneUrl} />
        ) : (
          <div className="fallback" aria-hidden="true" />
        )}
        <div className="vignette" />
        <div className="noise" aria-hidden="true" />
      </div>

      <Nav />

      <main className="hero">
        <div className="container">
          <div className="eyebrow">The creative OS for modern music teams</div>
          <h1>
            Compose, collaborate, and ship tracks faster with
            <span> Cursor</span>
          </h1>
          <p className="subtext">
            From idea to master—bring your workflow, stems, and notes into one place.
            Real-time sessions, versioning, and AI-powered assists tuned for music.
          </p>
          <div className="cta">
            <a className="btn primary lg" href="#get-started">Start free</a>
            <a className="btn ghost lg" href="#demo">Watch demo</a>
          </div>
          <div className="kpis">
            <div>
              <strong>25k+</strong>
              <span>creators</span>
            </div>
            <div>
              <strong>99.99%</strong>
              <span>uptime</span>
            </div>
            <div>
              <strong>2x</strong>
              <span>faster delivery</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
