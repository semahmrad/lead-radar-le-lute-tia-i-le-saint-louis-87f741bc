const siteConfigElement = document.getElementById('site-config');
const siteConfig = siteConfigElement ? JSON.parse(siteConfigElement.textContent || '{}') : {};
const state = {
  translations: null,
  language: localStorage.getItem('lead-radar-language') || siteConfig.defaultLanguage || 'fr',
};

const refs = {
  title: document.querySelector('title'),
  metaDescription: document.querySelector('meta[name="description"]'),
  navAbout: document.getElementById('navAbout'),
  navServices: document.getElementById('navServices'),
  navGallery: document.getElementById('navGallery'),
  navReviews: document.getElementById('navReviews'),
  navContact: document.getElementById('navContact'),
  languageLabel: document.getElementById('languageLabel'),
  heroEyebrow: document.getElementById('heroEyebrow'),
  heroTitle: document.getElementById('heroTitle'),
  heroSubtitle: document.getElementById('heroSubtitle'),
  heroDescription: document.getElementById('heroDescription'),
  heroPrimaryCta: document.getElementById('heroPrimaryCta'),
  heroSecondaryCta: document.getElementById('heroSecondaryCta'),
  aboutEyebrow: document.getElementById('aboutEyebrow'),
  aboutTitle: document.getElementById('aboutTitle'),
  aboutBody: document.getElementById('aboutBody'),
  servicesEyebrow: document.getElementById('servicesEyebrow'),
  servicesTitle: document.getElementById('servicesTitle'),
  servicesIntro: document.getElementById('servicesIntro'),
  servicesGrid: document.getElementById('servicesGrid'),
  highlightsEyebrow: document.getElementById('highlightsEyebrow'),
  highlightsTitle: document.getElementById('highlightsTitle'),
  highlightsGrid: document.getElementById('highlightsGrid'),
  galleryEyebrow: document.getElementById('galleryEyebrow'),
  galleryTitle: document.getElementById('galleryTitle'),
  galleryIntro: document.getElementById('galleryIntro'),
  reviewsEyebrow: document.getElementById('reviewsEyebrow'),
  reviewsTitle: document.getElementById('reviewsTitle'),
  reviewsSummary: document.getElementById('reviewsSummary'),
  contactEyebrow: document.getElementById('contactEyebrow'),
  contactTitle: document.getElementById('contactTitle'),
  contactIntro: document.getElementById('contactIntro'),
  faqEyebrow: document.getElementById('faqEyebrow'),
  faqTitle: document.getElementById('faqTitle'),
  faqList: document.getElementById('faqList'),
  footerTagline: document.getElementById('footerTagline'),
  addressLabel: document.getElementById('addressLabel'),
  phoneLabel: document.getElementById('phoneLabel'),
  emailLabel: document.getElementById('emailLabel'),
  hoursLabel: document.getElementById('hoursLabel'),
  formTitle: document.getElementById('formTitle'),
  formIntro: document.getElementById('formIntro'),
  formNameLabel: document.getElementById('formNameLabel'),
  formPhoneLabel: document.getElementById('formPhoneLabel'),
  formMessageLabel: document.getElementById('formMessageLabel'),
  formSubmitButton: document.getElementById('formSubmitButton'),
  contactName: document.getElementById('contactName'),
  contactPhone: document.getElementById('contactPhone'),
  contactMessage: document.getElementById('contactMessage'),
  openMapLink: document.getElementById('openMapLink'),
  callNowLink: document.getElementById('callNowLink'),
  viewReviewsButton: document.getElementById('viewReviewsButton'),
  writeReviewButton: document.getElementById('writeReviewButton'),
  reviewsBadge: document.getElementById('reviewsBadge'),
  contactBadge: document.getElementById('contactBadge'),
  languageSwitcher: document.getElementById('languageSwitcher'),
  navToggle: document.getElementById('navToggle'),
  whatsappForm: document.getElementById('whatsappForm'),
  welcomeSplash: document.getElementById('welcomeSplash'),
  welcomeContinueButton: document.getElementById('welcomeContinueButton'),
  welcomeCloseButton: document.getElementById('welcomeCloseButton'),
  lightbox: document.getElementById('lightbox'),
  lightboxImage: document.getElementById('lightboxImage'),
  lightboxCaption: document.getElementById('lightboxCaption'),
  lightboxClose: document.getElementById('lightboxClose'),
  galleryGrid: document.getElementById('galleryGrid'),
};

const setText = (element, value) => {
  if (element && typeof value === 'string') {
    element.textContent = value;
  }
};

const renderCards = (container, items, className) => {
  if (!container || !Array.isArray(items)) {
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <article class="${className}">
          <h3>${escapeHtml(item.title || '')}</h3>
          <p>${escapeHtml(item.description || '')}</p>
        </article>
      `,
    )
    .join('');
};

const renderFaq = (container, items) => {
  if (!container || !Array.isArray(items)) {
    return;
  }

  container.innerHTML = items
    .map(
      (item, index) => `
        <details class="faq-item" ${index === 0 ? 'open' : ''}>
          <summary>${escapeHtml(item.question || '')}</summary>
          <p>${escapeHtml(item.answer || '')}</p>
        </details>
      `,
    )
    .join('');
};

const updateGalleryCaptions = (captions) => {
  if (!refs.galleryGrid || !Array.isArray(captions)) {
    return;
  }

  refs.galleryGrid.querySelectorAll('figcaption').forEach((captionElement, index) => {
    captionElement.textContent = captions[index] || captions[captions.length - 1] || '';
  });
};

const applyLanguage = (language) => {
  if (!state.translations?.content?.[language]) {
    return;
  }

  const translation = state.translations.content[language];
  state.language = language;
  localStorage.setItem('lead-radar-language', language);

  document.documentElement.lang = language;
  const isRtl = language === 'ar';
  document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  document.body.dataset.dir = isRtl ? 'rtl' : 'ltr';

  setText(refs.title, translation.metaTitle);
  if (refs.metaDescription && translation.metaDescription) {
    refs.metaDescription.setAttribute('content', translation.metaDescription);
  }

  setText(refs.navAbout, translation.nav.about);
  setText(refs.navServices, translation.nav.services);
  setText(refs.navGallery, translation.nav.gallery);
  setText(refs.navReviews, translation.nav.reviews);
  setText(refs.navContact, translation.nav.contact);
  setText(refs.languageLabel, translation.ui.languageLabel);

  setText(refs.heroEyebrow, translation.hero.eyebrow);
  setText(refs.heroTitle, translation.hero.title);
  setText(refs.heroSubtitle, translation.hero.subtitle);
  setText(refs.heroDescription, translation.hero.description);
  setText(refs.heroPrimaryCta, translation.hero.primaryCta);
  setText(refs.heroSecondaryCta, translation.hero.secondaryCta);

  setText(refs.aboutEyebrow, translation.about.eyebrow);
  setText(refs.aboutTitle, translation.about.title);
  setText(refs.aboutBody, translation.about.body);

  setText(refs.servicesEyebrow, translation.services.eyebrow);
  setText(refs.servicesTitle, translation.services.title);
  setText(refs.servicesIntro, translation.services.intro);

  setText(refs.highlightsEyebrow, translation.highlights.eyebrow);
  setText(refs.highlightsTitle, translation.highlights.title);

  setText(refs.galleryEyebrow, translation.gallery.eyebrow);
  setText(refs.galleryTitle, translation.gallery.title);
  setText(refs.galleryIntro, translation.gallery.intro);

  setText(refs.reviewsEyebrow, translation.reviews.eyebrow);
  setText(refs.reviewsTitle, translation.reviews.title);
  setText(refs.reviewsSummary, translation.reviews.summary);

  setText(refs.contactEyebrow, translation.contact.eyebrow);
  setText(refs.contactTitle, translation.contact.title);
  setText(refs.contactIntro, translation.contact.intro);

  setText(refs.faqEyebrow, translation.faq.eyebrow);
  setText(refs.faqTitle, translation.faq.title);

  setText(refs.footerTagline, translation.footer.tagline);
  setText(refs.addressLabel, translation.ui.addressLabel);
  setText(refs.phoneLabel, translation.ui.phoneLabel);
  setText(refs.emailLabel, translation.ui.emailLabel);
  setText(refs.hoursLabel, translation.ui.hoursLabel);
  setText(refs.formTitle, translation.form.title);
  setText(refs.formIntro, translation.form.intro);
  setText(refs.formNameLabel, translation.ui.formNameLabel);
  setText(refs.formPhoneLabel, translation.ui.formPhoneLabel);
  setText(refs.formMessageLabel, translation.ui.formMessageLabel);
  setText(refs.formSubmitButton, translation.ui.formSubmitLabel);
  setText(refs.openMapLink, translation.ui.viewOnMaps);
  setText(refs.callNowLink, translation.ui.callNow);
  setText(refs.viewReviewsButton, translation.ui.viewReviews);
  setText(refs.writeReviewButton, translation.ui.writeReview);
  setText(refs.reviewsBadge, translation.ui.reviewBadge);
  setText(refs.contactBadge, translation.ui.contactBadge);

  if (refs.contactName) {
    refs.contactName.placeholder = translation.ui.formNamePlaceholder || '';
  }

  if (refs.contactPhone) {
    refs.contactPhone.placeholder = translation.ui.formPhonePlaceholder || '';
  }

  if (refs.contactMessage) {
    refs.contactMessage.placeholder = translation.ui.formMessagePlaceholder || '';
  }

  renderCards(refs.servicesGrid, translation.services.items, 'info-card');
  renderCards(refs.highlightsGrid, translation.highlights.items, 'highlight-card');
  renderFaq(refs.faqList, translation.faq.items);
  updateGalleryCaptions(translation.gallery.captions);

  if (refs.languageSwitcher) {
    refs.languageSwitcher.value = language;
  }
};

const handleWhatsAppForm = () => {
  if (!refs.whatsappForm) {
    return;
  }

  refs.whatsappForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = refs.contactName?.value?.trim() || '';
    const phone = refs.contactPhone?.value?.trim() || '';
    const message = refs.contactMessage?.value?.trim() || '';
    const whatsappNumber = String(siteConfig.whatsappNumber || siteConfig.phoneNumber || '')
      .replace(/[^\d]/g, '');

    if (!whatsappNumber) {
      window.alert('No WhatsApp number is available for this business.');
      return;
    }

    const payload = [
      name ? `Name: ${name}` : '',
      phone ? `Phone: ${phone}` : '',
      message || refs.contactMessage?.placeholder || '',
    ]
      .filter(Boolean)
      .join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(payload)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
};

const handleLightbox = () => {
  if (!refs.galleryGrid || !refs.lightbox || !refs.lightboxImage || !refs.lightboxCaption) {
    return;
  }

  refs.galleryGrid.addEventListener('click', (event) => {
    const figure = event.target instanceof HTMLElement
      ? event.target.closest('figure')
      : null;

    if (!figure) {
      return;
    }

    const image = figure.querySelector('img');
    const caption = figure.querySelector('figcaption');

    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    refs.lightboxImage.src = image.src;
    refs.lightboxImage.alt = image.alt;
    refs.lightboxCaption.textContent = caption?.textContent || '';
    refs.lightbox.hidden = false;
  });

  refs.lightboxClose?.addEventListener('click', () => {
    refs.lightbox.hidden = true;
  });

  refs.lightbox.addEventListener('click', (event) => {
    if (event.target === refs.lightbox) {
      refs.lightbox.hidden = true;
    }
  });
};

const handleNavigationToggle = () => {
  if (!refs.navToggle) {
    return;
  }

  refs.navToggle.addEventListener('click', () => {
    const nextState = document.body.dataset.navOpen === 'true' ? 'false' : 'true';
    document.body.dataset.navOpen = nextState;
    refs.navToggle.setAttribute('aria-expanded', String(nextState === 'true'));
  });
};

const handleWelcomeSplash = () => {
  document.body.dataset.splash = 'open';

  const closeSplash = () => {
    document.body.dataset.splash = 'closed';
  };

  refs.welcomeContinueButton?.addEventListener('click', closeSplash);
  refs.welcomeCloseButton?.addEventListener('click', closeSplash);
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const init = async () => {
  try {
    const response = await fetch('assets/translations/i18n.json', { cache: 'no-store' });
    state.translations = await response.json();
    applyLanguage(state.language);
  } catch {
    // The default language is already present in the HTML.
  }

  refs.languageSwitcher?.addEventListener('change', (event) => {
    applyLanguage(event.target.value);
  });

  handleWelcomeSplash();
  handleNavigationToggle();
  handleWhatsAppForm();
  handleLightbox();
};

init();