'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function PortfolioMotion() {
  useLayoutEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.site-nav-links a'));
    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.getAttribute('href') || ''))
      .filter((section): section is HTMLElement => Boolean(section));

    const setActive = (id: string) => {
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    };

    const onClick = (event: Event) => {
      const link = event.currentTarget as HTMLAnchorElement;
      setActive(link.hash.slice(1));
    };
    links.forEach((link) => link.addEventListener('click', onClick));

    let frame = 0;
    const syncActiveSection = () => {
      frame = 0;
      const marker = window.innerHeight * 0.28;
      let current = sections[0];
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= marker) current = section;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1];
      }
      if (current?.id) setActive(current.id);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(syncActiveSection);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    syncActiveSection();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      links.forEach((link) => link.removeEventListener('click', onClick));
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const returnTarget = window.location.hash
      ? document.querySelector<HTMLElement>(window.location.hash)
      : null;
    if (returnTarget) {
      gsap.set('.opening-screen', { autoAlpha: 0, display: 'none' });
      document.body.classList.remove('motion-active');
      document.body.style.overflow = '';
      window.requestAnimationFrame(() => returnTarget.scrollIntoView({ block: 'start' }));
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      gsap.set('.opening-screen', { autoAlpha: 0, display: 'none' });
      return;
    }

    document.body.classList.add('motion-active');
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const opening = gsap.timeline({
        defaults: { ease: 'expo.out' },
        onComplete: () => {
          document.body.style.overflow = '';
          ScrollTrigger.refresh();
        },
      });

      gsap.set('.hero-title img', { yPercent: 125, scaleX: 0.66, clipPath: 'inset(0 0 100% 0)', transformOrigin: '50% 100%' });
      gsap.set('.hero-character', { xPercent: 12, scale: 1.1, clipPath: 'inset(0 0 0 42%)' });
      gsap.set(['.nav', '.hero-tag', '.hero-scroll', '.hero-signature'], { autoAlpha: 0, y: 28 });

      opening
        .fromTo('.opening-screen__identity', { yPercent: 130, scaleX: 0.55 }, { yPercent: 0, scaleX: 1, duration: 1.35 }, 0.1)
        .to('.opening-screen__bar', { scaleX: 1, duration: 1.15, ease: 'power4.inOut' }, 0.22)
        .to('.opening-screen__identity', { yPercent: -130, duration: 0.8, ease: 'power4.in' }, 1.25)
        .to('.opening-screen', { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: 'power4.inOut' }, 1.42)
        .to('.hero-title img', {
          yPercent: 0,
          scaleX: 1,
          clipPath: 'inset(-12% -2% -14% -2%)',
          duration: 1.45,
          stagger: 0.14,
          onComplete: () => gsap.set('.hero-title img', { clearProps: 'clipPath,transform' }),
        }, 1.62)
        .to('.hero-character', { xPercent: 0, scale: 1, clipPath: 'inset(0 0 0 0%)', duration: 1.55 }, 1.82)
        .to('.nav', { autoAlpha: 1, y: 0, duration: 1.05 }, 2.05)
        .to(['.hero-tag', '.hero-scroll', '.hero-signature'], { autoAlpha: 1, y: 0, duration: 1, stagger: 0.12 }, 2.18);

      const revealHeading = (section: string, heading: string) => {
        gsap.from(heading, {
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
          yPercent: 95,
          scaleX: 0.72,
          clipPath: 'inset(0 0 100% 0)',
          transformOrigin: '50% 100%',
          duration: 1.45,
          ease: 'expo.out',
        });
      };

      revealHeading('.experience-visual', '.experience-heading');
      revealHeading('.services-showcase', '.services-title');
      revealHeading('.projects', '.projects .section-head');
      revealHeading('.strengths', '.strengths .section-head');

      gsap.from('.experience-item', {
        scrollTrigger: { trigger: '.experience-timeline', start: 'top 80%', once: true },
        y: 130,
        autoAlpha: 0,
        scaleY: 0.78,
        transformOrigin: '50% 100%',
        duration: 1.2,
        stagger: 0.16,
        ease: 'power4.out',
      });

      gsap.from('.bend-panel', {
        scrollTrigger: { trigger: '.bending-marquee-section', start: 'top 82%', once: true },
        y: 120,
        autoAlpha: 0,
        scaleY: 0.72,
        transformOrigin: '50% 100%',
        duration: 1.35,
        stagger: 0.12,
        ease: 'power4.out',
      });

      gsap.from('.portrait-wrap', {
        scrollTrigger: { trigger: '.about-grid', start: 'top 78%', once: true },
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.55,
        ease: 'expo.inOut',
      });
      gsap.from('.portrait-wrap img', {
        scrollTrigger: { trigger: '.about-grid', start: 'top bottom', end: 'bottom top', scrub: 1.3 },
        yPercent: -4,
        scale: 1.08,
        ease: 'none',
      });
      gsap.from('.about-copy > *', {
        scrollTrigger: { trigger: '.about-copy', start: 'top 80%', once: true },
        y: 70,
        autoAlpha: 0,
        duration: 1.05,
        stagger: 0.13,
        ease: 'power4.out',
      });

      gsap.from('.project-card', {
        scrollTrigger: { trigger: '.project-list', start: 'top 82%', once: true },
        y: 150,
        autoAlpha: 0,
        clipPath: 'inset(12% 0 0 0)',
        duration: 1.3,
        stagger: 0.16,
        ease: 'power4.out',
      });
      gsap.utils.toArray<HTMLElement>('.project-image img').forEach((image) => {
        gsap.fromTo(image, { yPercent: -5 }, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: image.closest('.project-card'), start: 'top bottom', end: 'bottom top', scrub: 1.2 },
        });
      });

      gsap.from('.strength-grid article', {
        scrollTrigger: { trigger: '.strength-grid', start: 'top 82%', once: true },
        y: 120,
        autoAlpha: 0,
        scale: 0.94,
        duration: 1.15,
        stagger: 0.13,
        ease: 'power4.out',
      });
      gsap.from('.footer-bottom', {
        scrollTrigger: { trigger: '.contact-section', start: 'top 55%', once: true },
        y: 70,
        autoAlpha: 0,
        duration: 1.15,
        stagger: 0.18,
        ease: 'power4.out',
      });
    });

    return () => {
      ctx.revert();
      document.body.classList.remove('motion-active');
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="opening-screen" aria-hidden="true">
      <div className="opening-screen__mask"><div className="opening-screen__identity"><span className="opening-screen__word">ZhaoZijiang Portfolio</span><span className="opening-screen__cn">赵兹江作品集</span></div></div>
      <i className="opening-screen__bar" />
      <span className="opening-screen__meta">VISUAL · UI · AI · BRAND</span>
    </div>
  );
}
