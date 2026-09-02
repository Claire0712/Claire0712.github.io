import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { academicWorksMarkup, currentUpdatesMarkup, normalizeLocale, nextLocale, textFor, timelineMarkup } from '../assets/app.js';
import { academicWorks, currentUpdates, profile, research, projects, education, awards } from '../assets/data.js';

test('normalizes only supported locales', () => {
  assert.equal(normalizeLocale('en'), 'en');
  assert.equal(normalizeLocale('zh-CN'), 'zh');
  assert.equal(normalizeLocale('fr'), 'zh');
});

test('switches between Chinese and English', () => {
  assert.equal(nextLocale('zh'), 'en');
  assert.equal(nextLocale('en'), 'zh');
});

test('returns the requested localized field', () => {
  assert.equal(textFor({ zh: '研究', en: 'Research' }, 'en'), 'Research');
});

test('sample records supply both language variants', () => {
  for (const record of [profile, ...research, ...projects, ...education, ...awards]) {
    assert.ok(record.title?.zh || record.name?.zh);
    assert.ok(record.title?.en || record.name?.en);
  }
});

test('profile supplies localized research-interest keywords', () => {
  assert.deepEqual(profile.keywords.en, ['Urban Systems', 'Sustainable Energy', 'Data-Driven Decision-Making', 'Remote Sensing', 'Knowledge Graphs', 'Intelligent Agents']);
  assert.equal(profile.keywords.zh.length, 6);
});

test('right sidebar current-updates card keeps only the Nature Communications co-author update', async () => {
  const html = await readFile(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
  const english = currentUpdatesMarkup(currentUpdates, 'en');
  const chinese = currentUpdatesMarkup(currentUpdates, 'zh');
  assert.match(html, /class="current-updates-card"/);
  assert.match(html, /data-current-updates/);
  assert.equal(currentUpdates.length, 1);
  assert.match(english, /Nature Communications/);
  assert.match(english, /Co-author/);
  assert.doesNotMatch(english, /Co-first author/);
  assert.match(english, /Supported by Peking University Shenzhen/);
  assert.match(english, /Target submission: September/);
  assert.match(chinese, /共同作者/);
  assert.match(chinese, /北京大学深圳研究支持/);
  assert.doesNotMatch(`${english}\n${chinese}`, /COLING 2027|WWW 2027/);
  assert.match(chinese, /Nature Communications/);
  assert.match(chinese, /预计 9 月投稿/);
});

test('about section renders a dedicated keyword container instead of the intro paragraph', async () => {
  const html = await readFile(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
  assert.match(html, /data-keywords/);
  assert.doesNotMatch(html, /data-profile="intro"/);
});

test('stylesheet provides the agreed blue-purple visual tokens', async () => {
  const css = await readFile(fileURLToPath(new URL('../assets/styles.css', import.meta.url)), 'utf8');
  for (const token of ['--lavender: #B6B3D6', '--lavender-light: #CFCCE3', '--mist-blue: #9BD7F3', '--mist-blue-light: #D8EEFB']) {
    assert.ok(css.includes(token));
  }
  assert.match(css, /\.content-card[^}]*border-color: var\(--lavender-light\)/);
});

test('resume data is populated from the CV instead of placeholder copy', () => {
  assert.equal(profile.name.zh, '张诗卓');
  assert.equal(profile.name.en, 'Shizhuo Zhang');
  assert.equal(profile.email, 'clairez.zhang@connect.polyu.hk');
  assert.equal(education.length, 1);
  assert.equal(research.length, 3);
  assert.equal(projects.length, 1);
  assert.equal(academicWorks.length, 4);
  assert.equal(awards.length, 4);
  assert.doesNotMatch(JSON.stringify({ profile, research, projects, education, awards }), /你的姓名|Your Name|示例|example\.com/);
});

test('timeline markup escapes supplied text', () => {
  const html = timelineMarkup([{ period: '2026', title: { zh: '<b>x</b>', en: 'Safe' }, organization: { zh: '机构', en: 'Org' }, summary: { zh: '说明', en: 'Summary' } }], 'zh');
  assert.ok(html.includes('&lt;b&gt;x&lt;/b&gt;'));
  assert.ok(!html.includes('<b>x</b>'));
});

test('timeline markup renders separate project website and source links', () => {
  const html = timelineMarkup([{ period: '2026', title: { zh: '项目', en: 'Project' }, organization: { zh: '机构', en: 'Org' }, summary: { zh: '说明', en: 'Summary' }, website: 'https://claire0712.github.io/Service-Learning/', code: 'https://github.com/Claire0712/Service-Learning' }], 'en');
  assert.match(html, /href="https:\/\/claire0712\.github\.io\/Service-Learning\/"/);
  assert.match(html, /href="https:\/\/github\.com\/Claire0712\/Service-Learning"/);
  assert.match(html, /Project website/);
  assert.match(html, /Open-source code/);
});

test('research timeline renders aligned role-logo headings and concise bullet descriptions', () => {
  const html = timelineMarkup(research, 'en');
  assert.equal((html.match(/class="entry entry--research entry--card"/g) || []).length, 3);
  assert.equal((html.match(/class="entry__card-logo-panel"/g) || []).length, 3);
  assert.equal((html.match(/class="entry__card-bullets"/g) || []).length, 3);
  assert.match(html, /<li>Conduct data-driven analysis/);
  assert.equal((html.match(/class="entry__logo(?: |")/g) || []).length, 3);
  assert.match(html, /assets\/media\/pku-smart-cities-lab-logo\.png/);
  assert.match(html, /assets\/media\/polyu-sft-logo\.png/);
  assert.match(html, /assets\/media\/polyu-comp-logo\.png/);
  assert.match(html, /entry__logo--invert/);
  assert.doesNotMatch(html, /entry__logo--dark/);
});

test('education and research records render the shared logo-panel card layout', () => {
  const educationHtml = timelineMarkup(education, 'en');
  const researchHtml = timelineMarkup(research, 'en');
  const projectHtml = timelineMarkup(projects, 'en');
  assert.match(educationHtml, /class="entry entry--compact entry--card"/);
  assert.equal((researchHtml.match(/entry--card/g) || []).length, 3);
  assert.match(educationHtml, /class="entry__card-logo-panel"/);
  assert.match(educationHtml, /polyu-logo\.svg/);
  assert.doesNotMatch(educationHtml, /fce-logo\.png/);
  assert.doesNotMatch(educationHtml, /ama-logo\.png/);
  assert.match(researchHtml, /entry__card-meta/);
  assert.equal((researchHtml.match(/entry__card-bullets/g) || []).length, 3);
  assert.match(researchHtml, /Built a domain-specific Retrieval-Augmented Generation \(RAG\) prototype for fashion\/textiles QA/);
  assert.match(researchHtml, /Implemented a BERT-based named entity recognition \(NER\) model/);
  assert.match(projectHtml, /class="entry entry--card"/);
  assert.match(projectHtml, /whu-rsgis-logo\.png/);
  assert.doesNotMatch(projectHtml, /whu-seal\.png/);
  assert.equal((projectHtml.match(/class="entry__logo"/g) || []).length, 1);
});

test('education and project entries render their specified institutional logos', () => {
  const educationHtml = timelineMarkup(education, 'en');
  const projectHtml = timelineMarkup(projects, 'zh');
  assert.equal((educationHtml.match(/class="entry__logo"/g) || []).length, 1);
  assert.match(educationHtml, /polyu-logo\.svg/);
  assert.match(educationHtml, /entry__card-content[\s\S]*The Hong Kong Polytechnic University[\s\S]*BSc in Urban Informatics and Smart Cities · Hong Kong SAR/);
  assert.match(educationHtml, /class="entry entry--compact entry--card"/);
  assert.match(projectHtml, /whu-rsgis-logo\.png/);
});

test('education separates the minor line and its AMA logo from the BSc information', () => {
  const html = timelineMarkup(education, 'en');
  assert.match(html, /entry__card-bullets[\s\S]*Faculty of Construction and Environment[\s\S]*Minor in Applied Mathematics/);
  assert.doesNotMatch(html, /ama-logo\.png/);
});

test('academic works render image cards with expandable abstracts and PDFs', () => {
  const html = academicWorksMarkup(academicWorks, 'en');
  const chineseHtml = academicWorksMarkup(academicWorks, 'zh');
  assert.equal((html.match(/class="work-card"/g) || []).length, 4);
  assert.match(html, /class="work-group__heading">Publications/);
  assert.match(html, /class="work-group__heading">Course Paper/);
  assert.equal((html.match(/<details>/g) || []).length, 4);
  assert.match(html, /assets\/media\/mmm-figure\.png/);
  assert.match(html, /assets\/media\/mmm-qapcf\.png/);
  assert.match(html, /data-carousel/);
  assert.match(html, /data-carousel-next/);
  assert.match(html, /MMM2027 Under Submission/);
  assert.match(html, /PKU Course Paper/);
  assert.match(chineseHtml, /MMM2027 在投/);
  assert.match(chineseHtml, /高温与卫生系统能力：中国医患关系的可复现生态学研究/);
  assert.match(html, /Zhang, Shizhuo<sup>\*<\/sup>; Liu, Wentao<sup>\*<\/sup>; Fang, Kun; Chen, Yutong/);
  assert.match(html, /work-card__note-logo/);
  assert.match(html, /pku-logo\.svg/);
  assert.doesNotMatch(html, /MMM2027\/MMM2027\.pdf/);
  assert.match(html, /PKUcourse\/main_副本\.pdf/);
  assert.match(html, /LSGI2801\.pdf/);
  assert.match(html, /LSGI2801_Assignment\.pdf/);
  assert.match(html, /hk-ev-distribution\.png/);
  assert.match(html, /sg-ev-distribution\.png/);
  assert.match(html, /ebola-interventions\.png/);
  assert.match(html, /github\.com\/Claire0712\/pku-program/);
});

test('carousel code supports pointer dragging as well as previous and next controls', async () => {
  const app = await readFile(fileURLToPath(new URL('../assets/app.js', import.meta.url)), 'utf8');
  assert.match(app, /pointerdown/);
  assert.match(app, /pointermove/);
  assert.match(app, /scrollTo/);
});

test('awards list CGMO immediately before CMO as separate records', () => {
  assert.doesNotMatch(JSON.stringify(awards), /Mathematical Contest in Modeling/);
  assert.equal(awards[2].title.en, '22nd Chinese Girls’ Mathematical Olympiad — Third Prize');
  assert.equal(awards[3].title.en, 'Chinese Mathematical Olympiad, Guizhou Division — Second Prize');
  assert.equal(awards[2].organization.en, 'Chinese Mathematical Society');
  assert.equal(awards[3].organization.en, 'Chinese Mathematical Society');
  assert.equal(awards[0].organization.en, 'Mathematical Association of America');
  assert.equal(awards[1].organization.en, 'Mathematical Association of America');
  assert.ok(awards.every((award) => award.hideSummary));
  assert.doesNotMatch(timelineMarkup(awards, 'en'), /entry__summary-row/);
});

test('education appears before research in navigation and main content', async () => {
  const html = await readFile(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
  assert.ok(html.indexOf('href="#education"') < html.indexOf('href="#research"'));
  assert.ok(html.indexOf('id="education"') < html.indexOf('id="research"'));
});

test('profile card has no resume or contact action links and keeps the work-card container', async () => {
  const html = await readFile(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
  const profile = html.slice(html.indexOf('<div class="profile-card"'), html.indexOf('</aside>', html.indexOf('<div class="profile-card"')));
  assert.doesNotMatch(profile, /button-link|text-link|查看履历|联系我/);
  assert.match(profile, /class="profile-photo" src="\.\/assets\/media\/profile-photo\.jpg"/);
  assert.match(html, /data-work-cards="academicWorks"/);
});

test('projects and academic work share one section without the former eyebrow label', async () => {
  const html = await readFile(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
  assert.doesNotMatch(html, /个人履历\s*\/\s*研究与实践/);
  assert.doesNotMatch(html, /id="academic-work"/);
  assert.match(html, /data-entries="projects"/);
  assert.match(html, /data-work-cards="academicWorks"/);
});

test('homepage uses an academic sidebar and card-based content layout', async () => {
  const html = await readFile(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
  assert.match(html, /class="academic-layout container"/);
  assert.match(html, /class="profile-card"/);
  assert.match(html, /class="content-column"/);
  assert.equal((html.match(/class="content-card(?: contact)?"/g) || []).length, 5);
  assert.doesNotMatch(html, /id="contact"/);
  assert.doesNotMatch(html, /navContact/);
  assert.doesNotMatch(html, /class="hero container"/);
});

test('profile card keeps the supplied email and GitHub links after removing contact', async () => {
  const html = await readFile(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8');
  assert.equal(profile.github, 'https://github.com/Claire0712');
  const profileCard = html.slice(html.indexOf('<div class="profile-card"'), html.indexOf('</aside>', html.indexOf('<div class="profile-card"')));
  assert.match(profileCard, /data-github/);
  assert.match(profileCard, /profile-contact__icon/);
  assert.match(profileCard, /aria-label="Email"/);
  assert.match(profileCard, /aria-label="GitHub"/);
  assert.match(profileCard, /data-email/);
  assert.equal((html.match(/data-email/g) || []).length, 1);
});

test('email rendering preserves its inline icon', async () => {
  const app = await readFile(fileURLToPath(new URL('../assets/app.js', import.meta.url)), 'utf8');
  assert.match(app, /querySelector\('span'\)/);
});

test('back-to-top control explicitly scrolls the document to the top', async () => {
  const [html, app] = await Promise.all([
    readFile(fileURLToPath(new URL('../index.html', import.meta.url)), 'utf8'),
    readFile(fileURLToPath(new URL('../assets/app.js', import.meta.url)), 'utf8')
  ]);
  assert.match(html, /data-back-to-top/);
  assert.match(app, /querySelector\('\[data-back-to-top\]'\)/);
  assert.match(app, /window\.scrollTo\(\{ top: 0, behavior: 'smooth' \}\)/);
});

test('paper cards stack before the content column becomes too narrow', async () => {
  const styles = await readFile(fileURLToPath(new URL('../assets/styles.css', import.meta.url)), 'utf8');
  assert.match(styles, /@media \(max-width: 1100px\)[\s\S]*\.content-card \.work-card \{ grid-template-columns: 1fr; \}/);
  assert.match(styles, /@media \(max-width: 1100px\)[\s\S]*\.work-card__authors \{ white-space: normal; \}/);
});

test('English is the default presentation language and GitHub caption', async () => {
  const base = fileURLToPath(new URL('../', import.meta.url));
  const [html, app] = await Promise.all([
    readFile(`${base}index.html`, 'utf8'),
    readFile(`${base}assets/app.js`, 'utf8')
  ]);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /data-locale="en" aria-pressed="true"/);
  assert.match(html, /<span>GitHub \/ Repositories<\/span>/);
  assert.match(app, /savedLocale\(\) \|\| 'en'/);
});

test('academic work keeps submission and course-work status in separate labels', () => {
  assert.doesNotMatch(academicWorks[0].title.en, /Under submission/);
  assert.doesNotMatch(academicWorks[1].title.en, /Peking University course work/);
  assert.deepEqual(academicWorks[0].note, { zh: 'MMM2027 在投', en: 'MMM2027 Under Submission' });
  assert.deepEqual(academicWorks[1].note, { zh: '北大课程论文', en: 'PKU Course Paper' });
});

test('page source no longer contains the removed hero-action labels', async () => {
  const base = fileURLToPath(new URL('../', import.meta.url));
  const [html, app] = await Promise.all([
    readFile(`${base}index.html`, 'utf8'),
    readFile(`${base}assets/app.js`, 'utf8')
  ]);
  assert.doesNotMatch(`${html}\n${app}`, /查看履历|联系我/);
});

test('static page fallbacks do not expose placeholder identity or contact details', async () => {
  const base = fileURLToPath(new URL('../', import.meta.url));
  const [html, app] = await Promise.all([
    readFile(`${base}index.html`, 'utf8'),
    readFile(`${base}assets/app.js`, 'utf8')
  ]);
  assert.doesNotMatch(`${html}\n${app}`, /YOUR NAME|你的姓名|Your Name|hello@example\.com/);
});
