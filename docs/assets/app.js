import { academicWorks, awards, education, profile, projects, research } from './data.js';

export const normalizeLocale = (value) => value?.startsWith('en') ? 'en' : 'zh';

export const nextLocale = (locale) => locale === 'zh' ? 'en' : 'zh';

export const textFor = (record, locale) => record[normalizeLocale(locale)];

export const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
})[character]);

export const timelineMarkup = (records, locale) => records.map((item) => {
  const isResearch = Boolean(item.researchLayout);
  const isCard = Boolean(item.cardLayout || isResearch);
  const renderLogos = (items) => items.map((logo) => {
    const source = typeof logo === 'string' ? logo : logo.src;
    const modifiers = typeof logo === 'string' ? '' : `${logo.dark ? ' entry__logo--dark' : ''}${logo.invert ? ' entry__logo--invert' : ''}`;
    return `<img class="entry__logo${modifiers}" src="${escapeHtml(source)}" alt="" aria-hidden="true">`;
  }).join('');
  const logoItems = renderLogos(item.logos || (item.logo ? [item.logo] : []));
  const logos = logoItems ? `<span class="entry__logos">${logoItems}</span>` : '';
  const cardLogoItems = renderLogos(item.cardLogos || item.logos || (item.logo ? [item.logo] : []));
  const titleLogos = item.logosBeforeTitle ? logos : '';
  const metaLogos = item.logosBeforeTitle || isResearch ? '' : logos;
  const titleLogoItems = (item.titleLogos || (item.titleLogo ? [item.titleLogo] : [])).map((logo) => `<img class="entry__inline-logo" src="${escapeHtml(logo)}" alt="" aria-hidden="true">`).join('');
  const titleLogo = titleLogoItems ? `<span class="entry__title-logos">${titleLogoItems}</span>` : '';
  const schoolLogos = (item.schoolLogos || (item.schoolLogo ? [item.schoolLogo] : [])).map((logo) => `<img class="entry__inline-logo" src="${escapeHtml(logo)}" alt="" aria-hidden="true">`).join('');
  const schoolLogoGroup = schoolLogos ? `<span class="entry__school-logos">${schoolLogos}</span>` : '';
  const schoolRow = item.school ? `<div class="entry__school-row"><span class="entry__school-name">${escapeHtml(textFor(item.school, locale))}</span>${schoolLogoGroup}</div>` : '';
  const periodLogo = item.periodLogo ? `<img class="entry__period-logo" src="${escapeHtml(item.periodLogo)}" alt="" aria-hidden="true">` : '';
  const summaryLogo = item.summaryLogo ? `<span class="entry__logos entry__logos--summary entry__summary-logos"><img class="entry__inline-logo" src="${escapeHtml(item.summaryLogo)}" alt="" aria-hidden="true"></span>` : '';
  const summaryClass = item.emphasizeSummary ? ' entry__body--degree' : '';
  const entryClass = `${item.compactLayout ? ' entry--compact' : ''}${isResearch ? ' entry--research' : ''}`;
  const heading = isResearch
    ? `<div class="entry__research-heading"><h3>${escapeHtml(textFor(item.title, locale))}</h3>${logos}</div>`
    : `${titleLogos}${schoolRow}<div class="entry__title-row"><h3>${escapeHtml(textFor(item.title, locale))}</h3>${titleLogo}</div>`;
  const summary = item.hideSummary
    ? ''
    : isResearch
    ? `<ul class="entry__research-bullets"><li>${escapeHtml(textFor(item.summary, locale))}</li></ul>`
    : `<div class="entry__summary-row"><p class="entry__body${summaryClass}">${escapeHtml(textFor(item.summary, locale))}</p>${summaryLogo}</div>`;
  const projectLinks = [
    item.website?.startsWith('https://')
      ? `<a class="entry__link" href="${escapeHtml(item.website)}" target="_blank" rel="noreferrer">${normalizeLocale(locale) === 'zh' ? '项目网页' : 'Project website'} <span aria-hidden="true">↗</span></a>`
      : '',
    item.code?.startsWith('https://')
      ? `<a class="entry__link" href="${escapeHtml(item.code)}" target="_blank" rel="noreferrer">${normalizeLocale(locale) === 'zh' ? '开源代码' : 'Open-source code'} <span aria-hidden="true">↗</span></a>`
      : '',
    item.link?.startsWith('https://')
      ? `<a class="entry__link" href="${escapeHtml(item.link)}" target="_blank" rel="noreferrer">${normalizeLocale(locale) === 'zh' ? '开源代码' : 'Open-source code'} <span aria-hidden="true">↗</span></a>`
      : ''
  ].filter(Boolean).join('');
  if (isCard) {
    const cardTitle = textFor(item.school || item.title, locale);
    const cardMeta = textFor(item.cardMeta || item.organization, locale);
    const cardBullets = item.cardBullets || [item.summary];
    const cardBulletItems = cardBullets.map((bullet) => `<li>${escapeHtml(textFor(bullet, locale))}</li>`).join('');
    return `
  <article class="entry${item.compactLayout ? ' entry--compact' : ''}${isResearch ? ' entry--research' : ''} entry--card">
    <div class="entry__card-logo-panel">${cardLogoItems}</div>
    <div class="entry__card-content">
      <p class="entry__period">${escapeHtml(item.period)}</p>
      <h3>${escapeHtml(cardTitle)}</h3>
      <p class="entry__card-meta">${escapeHtml(cardMeta)}</p>
      <ul class="entry__card-bullets">${cardBulletItems}</ul>
      ${projectLinks}
    </div>
  </article>`;
  }
  return `
  <article class="entry${entryClass}">
    <div class="entry__period-wrap"><p class="entry__period">${escapeHtml(item.period)}</p>${periodLogo}</div>
    <div>
      ${heading}
      <div class="entry__meta">${metaLogos}<span>${escapeHtml(textFor(item.organization, locale))}</span></div>
      ${summary}
      ${projectLinks}
    </div>
  </article>`;
}).join('');

export const academicWorksMarkup = (works, locale) => {
  const groupLabels = {
    publication: { zh: 'Publications', en: 'Publications' },
    coursePaper: { zh: 'Course Paper', en: 'Course Paper' }
  };
  const workMarkup = (work) => {
  const previews = work.previews || [work.preview];
  const hasCarousel = previews.length > 1;
  const images = previews.map((preview, index) => `<img class="work-card__image" src="${escapeHtml(preview)}" alt="${escapeHtml(textFor(work.title, locale))} — figure ${index + 1}" draggable="false">`).join('');
  const authors = work.authors?.map((author) => `${escapeHtml(author.name)}${author.equalContribution ? '<sup>*</sup>' : ''}`).join('; ');
  const media = hasCarousel
    ? `<div class="work-carousel" data-carousel><div class="work-carousel__track" data-carousel-track tabindex="0" aria-label="${escapeHtml(textFor(work.title, locale))} figures">${images}</div><div class="work-carousel__controls"><button type="button" data-carousel-prev aria-label="Previous figure">←</button><button type="button" data-carousel-next aria-label="Next figure">→</button></div></div>`
    : images;
    return `
  <article class="work-card">
    ${media}
    <div class="work-card__content">
      <h3>${escapeHtml(textFor(work.title, locale))}</h3>
      ${authors ? `<p class="work-card__authors">${authors}</p>` : ''}
      ${work.note ? `<p class="work-card__note"><span>${escapeHtml(textFor(work.note, locale))}</span>${work.noteLogo ? `<img class="work-card__note-logo" src="${escapeHtml(work.noteLogo)}" alt="" aria-hidden="true">` : ''}</p>` : ''}
      <details><summary>${normalizeLocale(locale) === 'zh' ? '查看摘要' : 'Read abstract'}</summary><p>${escapeHtml(textFor(work.abstract, locale))}</p></details>
      <a class="work-card__pdf" href="${escapeHtml(work.pdf)}" target="_blank" rel="noreferrer">${normalizeLocale(locale) === 'zh' ? '查看 PDF' : 'View PDF'} <span aria-hidden="true">↗</span></a>
      ${work.code ? `<a class="work-card__code" href="${escapeHtml(work.code)}" target="_blank" rel="noreferrer">${normalizeLocale(locale) === 'zh' ? '查看代码' : 'View code'} <span aria-hidden="true">↗</span></a>` : ''}
    </div>
  </article>`;
  };
  return ['publication', 'coursePaper'].map((category) => {
    const groupedWorks = works.filter((work) => (work.category || 'publication') === category);
    return groupedWorks.length
      ? `<section class="work-group"><h3 class="work-group__heading">${escapeHtml(textFor(groupLabels[category], locale))}</h3><div class="work-group__cards">${groupedWorks.map(workMarkup).join('')}</div></section>`
      : '';
  }).join('');
};

const copy = {
  zh: {
    navAbout: '关于', navResearch: '研究', navProjects: '成果', navEducation: '教育', navAwards: '荣誉', navContact: '联系',
    about: '个人简介', research: '研究经历', projects: 'Project', education: '教育背景', awards: '获奖经历', contact: '联系方式',
    contactCopy: '欢迎来信交流研究与合作。', backToTop: '回到顶部 ↑', menuOpen: '打开导航', menuClose: '关闭导航'
  },
  en: {
    navAbout: 'About', navResearch: 'Research', navProjects: 'Work', navEducation: 'Education', navAwards: 'Awards', navContact: 'Contact',
    about: 'About me', research: 'Research experience', projects: 'Project', education: 'Education', awards: 'Awards & honors', contact: 'Contact',
    contactCopy: 'I welcome conversations about research, collaboration, and exchange.', backToTop: 'Back to top ↑', menuOpen: 'Open navigation', menuClose: 'Close navigation'
  }
};

const records = { research, projects, education, awards };

const savedLocale = () => {
  try { return localStorage.getItem('resume-locale-v2'); } catch { return null; }
};

const storeLocale = (locale) => {
  try { localStorage.setItem('resume-locale-v2', locale); } catch { /* Storage may be unavailable in private contexts. */ }
};

const setText = (selector, value) => document.querySelectorAll(selector).forEach((element) => { element.textContent = value; });

const initializeCarousels = () => {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const scrollToSlide = (direction) => {
      const width = track.clientWidth;
      const current = Math.round(track.scrollLeft / width);
      track.scrollTo({ left: Math.max(0, current + direction) * width, behavior: 'smooth' });
    };
    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => scrollToSlide(-1));
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => scrollToSlide(1));

    let dragStart = null;
    let startScrollLeft = 0;
    const finishDrag = () => {
      if (dragStart === null) return;
      dragStart = null;
      track.classList.remove('is-dragging');
      const width = track.clientWidth;
      track.scrollTo({ left: Math.round(track.scrollLeft / width) * width, behavior: 'smooth' });
    };
    track.addEventListener('pointerdown', (event) => {
      dragStart = event.clientX;
      startScrollLeft = track.scrollLeft;
      track.setPointerCapture?.(event.pointerId);
      track.classList.add('is-dragging');
    });
    track.addEventListener('pointermove', (event) => {
      if (dragStart === null) return;
      track.scrollLeft = startScrollLeft - (event.clientX - dragStart);
    });
    track.addEventListener('pointerup', finishDrag);
    track.addEventListener('pointercancel', finishDrag);
  });
};

const closeMenu = () => {
  const menu = document.querySelector('.site-nav');
  const toggle = document.querySelector('.menu-toggle');
  if (!menu || !toggle) return;
  menu.dataset.open = 'false';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.querySelector('.sr-only').textContent = copy[document.documentElement.lang.startsWith('en') ? 'en' : 'zh'].menuOpen;
  toggle.querySelector('[aria-hidden="true"]').textContent = 'Menu';
};

export const render = (locale) => {
  if (typeof document === 'undefined') return;
  const language = normalizeLocale(locale);
  const strings = copy[language];
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = `${textFor(profile.name, language)}${language === 'zh' ? '｜个人主页' : ' | Personal homepage'}`;

  document.querySelectorAll('[data-key]').forEach((element) => { element.textContent = strings[element.dataset.key]; });
  document.querySelectorAll('[data-profile]').forEach((element) => { element.textContent = textFor(profile[element.dataset.profile], language); });
  document.querySelectorAll('[data-keywords]').forEach((element) => {
    element.innerHTML = profile.keywords[language].map((keyword, index) => `<span class="research-keyword research-keyword--${index % 5}">${escapeHtml(keyword)}</span>`).join('');
  });
  document.querySelectorAll('[data-entries]').forEach((element) => { element.innerHTML = timelineMarkup(records[element.dataset.entries], language); });
  document.querySelectorAll('[data-work-cards]').forEach((element) => { element.innerHTML = academicWorksMarkup(academicWorks, language); });
  initializeCarousels();

  const email = profile.email;
  document.querySelectorAll('[data-email]').forEach((element) => {
    element.href = `mailto:${email}`;
    const label = element.querySelector('span');
    if (label) label.textContent = email;
    else element.textContent = `${email} `;
  });
  document.querySelectorAll('[data-github]').forEach((element) => { element.href = profile.github; });
  document.querySelectorAll('[data-locale]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.locale === language)));
  closeMenu();
};

export const setLocale = (locale) => {
  const language = normalizeLocale(locale);
  storeLocale(language);
  render(language);
};

const initialize = () => {
  const language = normalizeLocale(savedLocale() || 'en');
  render(language);
  document.querySelectorAll('[data-locale]').forEach((button) => button.addEventListener('click', () => setLocale(button.dataset.locale)));

  const menu = document.querySelector('.site-nav');
  const toggle = document.querySelector('.menu-toggle');
  toggle.addEventListener('click', () => {
    const isOpen = menu.dataset.open === 'true';
    menu.dataset.open = String(!isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
    const activeLocale = document.documentElement.lang.startsWith('en') ? 'en' : 'zh';
    toggle.querySelector('.sr-only').textContent = copy[activeLocale].menuClose;
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  document.querySelector('[data-back-to-top]')?.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

if (typeof document !== 'undefined') initialize();
