import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

type Language = "fr" | "en";
type Localized = { fr: string; en: string };

type Tour = {
  id: string;
  image: string;
  title: Localized;
  duration: Localized;
  location: Localized;
  description: Localized;
  alt: Localized;
  program: { fr: string[]; en: string[] };
};

const whatsappNumber = "212675642713";
const instagramUrl = "https://www.instagram.com/morocco_excursions_by_anouar";
const whatsappUrl = (message: string) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
const pexels = (photoId: string, width = 1400) =>
  `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=920&w=${width}`;

const agafayPhoto =
  "https://static.wixstatic.com/media/7539e6_17f259f487e6445a910c01d69e641ca6~mv2.jpg/v1/fill/w_1400,h_920,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/agafay6.jpg";

const tours: Tour[] = [
  {
    id: "merzouga",
    image: pexels("30320422"),
    title: { fr: "Marrakech - Merzouga", en: "Marrakech - Merzouga" },
    duration: { fr: "3 jours / 2 nuits", en: "3 days / 2 nights" },
    location: { fr: "Sahara · grand sud", en: "Sahara · deep south" },
    description: {
      fr: "Une traversée spectaculaire de l'Atlas jusqu'aux dunes, entre kasbahs, gorges et nuit sous le ciel du désert.",
      en: "A spectacular crossing of the Atlas to the dunes, through kasbahs and gorges, with a night beneath desert skies.",
    },
    alt: {
      fr: "Caravane de dromadaires sur les dunes de Merzouga au coucher du soleil",
      en: "Camel caravan crossing the Merzouga dunes at sunset",
    },
    program: {
      fr: [
        "Jour 1 : Haut Atlas, kasbah d'Ait Ben Haddou et vallée du Dades.",
        "Jour 2 : gorges du Todra, route vers Merzouga et coucher de soleil sur les dunes.",
        "Jour 3 : lever du soleil dans le Sahara, puis retour vers Marrakech.",
      ],
      en: [
        "Day 1: High Atlas, Ait Ben Haddou kasbah and the Dades Valley.",
        "Day 2: Todra Gorge, the road to Merzouga and sunset over the dunes.",
        "Day 3: sunrise in the Sahara, then return to Marrakech.",
      ],
    },
  },
  {
    id: "agafay",
    image: agafayPhoto,
    title: { fr: "Désert d'Agafay", en: "Agafay Desert" },
    duration: { fr: "Demi-journée ou journée", en: "Half or full day" },
    location: { fr: "À 45 min de Marrakech", en: "45 min from Marrakech" },
    description: {
      fr: "Lumière dorée, collines minérales et horizon ouvert. Une escapade tout près de Marrakech, à votre rythme.",
      en: "Golden light, mineral hills and wide-open horizons. A close-to-Marrakech escape, at your own pace.",
    },
    alt: {
      fr: "Paysage minéral du désert d'Agafay au soleil couchant",
      en: "Rocky Agafay Desert landscape at sunset",
    },
    program: {
      fr: [
        "Départ de Marrakech et trajet à travers les paysages de pierre d'Agafay.",
        "Temps libre pour admirer le paysage ou ajouter une activité au devis.",
        "Retour en fin de journée, ou après le coucher du soleil selon la formule.",
      ],
      en: [
        "Depart from Marrakech and travel through the rocky landscapes of Agafay.",
        "Time to enjoy the scenery, with optional activities added to your quote.",
        "Return in the late afternoon or after sunset, depending on your chosen trip.",
      ],
    },
  },
  {
    id: "essaouira",
    image: pexels("31070248"),
    title: { fr: "Essaouira & l'Atlantique", en: "Essaouira & the Atlantic" },
    duration: { fr: "Journée complète", en: "Full day" },
    location: { fr: "Côte atlantique", en: "Atlantic coast" },
    description: {
      fr: "Une journée iodée entre remparts, port de pêche, ruelles de la medina et longue plage atlantique.",
      en: "A breath of sea air between historic ramparts, a fishing port, medina lanes and the long Atlantic beach.",
    },
    alt: {
      fr: "Bateaux de pêche bleus dans le port d'Essaouira",
      en: "Blue fishing boats in the harbour of Essaouira",
    },
    program: {
      fr: [
        "Départ le matin depuis Marrakech et route vers la côte atlantique.",
        "Découverte libre des remparts, du port et des ruelles d'Essaouira.",
        "Temps pour déjeuner ou flâner avant le retour à Marrakech.",
      ],
      en: [
        "Morning departure from Marrakech and a drive to the Atlantic coast.",
        "Explore the ramparts, harbour and medina lanes of Essaouira at your leisure.",
        "Time for lunch or a stroll before returning to Marrakech.",
      ],
    },
  },
  {
    id: "ouzoud",
    image: pexels("6545708"),
    title: { fr: "Cascades d'Ouzoud", en: "Ouzoud Waterfalls" },
    duration: { fr: "Journée complète", en: "Full day" },
    location: { fr: "Atlas central", en: "Central Atlas" },
    description: {
      fr: "Partez respirer au bord des cascades, entre sentiers ombragés, oliveraies et villages de l'Atlas.",
      en: "Breathe in the mountain air by the waterfalls, with shaded paths, olive groves and Atlas villages.",
    },
    alt: {
      fr: "Cascade entourée de falaises et de végétation luxuriante",
      en: "Waterfall framed by cliffs and lush greenery",
    },
    program: {
      fr: [
        "Départ matinal de Marrakech en direction des cascades.",
        "Balade autour des chutes et temps libre pour profiter du site.",
        "Déjeuner et éventuel accompagnement local à confirmer au devis.",
      ],
      en: [
        "Morning departure from Marrakech towards the waterfalls.",
        "Walk around the falls and enjoy free time at the site.",
        "Lunch and any local guiding can be confirmed in your quote.",
      ],
    },
  },
  {
    id: "ourika",
    image: pexels("17492446"),
    title: { fr: "Vallée de l'Ourika", en: "Ourika Valley" },
    duration: { fr: "Journée complète", en: "Full day" },
    location: { fr: "Haut Atlas", en: "High Atlas" },
    description: {
      fr: "Villages berbères, rivière fraîche et panoramas de montagne : une parenthèse paisible au pied du Toubkal.",
      en: "Berber villages, cool river air and mountain views: a peaceful escape at the foot of Toubkal.",
    },
    alt: {
      fr: "Vallée verdoyante et sommets de l'Atlas marocain",
      en: "Green valley and Atlas peaks in Morocco",
    },
    program: {
      fr: [
        "Route panoramique depuis Marrakech en direction de la vallée.",
        "Arrêts dans les villages et découverte des paysages au fil de l'Ourika.",
        "Balade ou déjeuner au bord de l'eau selon vos envies et la saison.",
      ],
      en: [
        "Scenic drive from Marrakech towards the valley.",
        "Stop in local villages and discover the landscapes along the Ourika.",
        "Choose a walk or lunch by the water, depending on your plans and the season.",
      ],
    },
  },
  {
    id: "fes",
    image: pexels("28582578"),
    title: { fr: "Fes & les villes impériales", en: "Fes & the Imperial Cities" },
    duration: { fr: "À partir de 2 jours", en: "From 2 days" },
    location: { fr: "Circuit privé", en: "Private circuit" },
    description: {
      fr: "Prenez le temps de découvrir Fes, sa medina vivante et les étapes historiques qui jalonnent la route.",
      en: "Take time to discover Fes, its living medina and the historic stops along the way.",
    },
    alt: {
      fr: "Rue animée de la medina de Fes et de ses échoppes",
      en: "Lively street and market stalls in the medina of Fes",
    },
    program: {
      fr: [
        "Itinéraire privé construit selon votre point de départ et le nombre de nuits.",
        "Découverte de Fes et de sa medina, avec guide local disponible sur demande.",
        "Étapes et hébergements choisis ensemble avant validation du devis.",
      ],
      en: [
        "A private route shaped around your starting point and number of nights.",
        "Discover Fes and its medina, with a local guide available on request.",
        "Stops and accommodation are agreed together before you confirm the quote.",
      ],
    },
  },
  {
    id: "chefchaouen",
    image: pexels("18487344"),
    title: { fr: "Chefchaouen & le nord", en: "Chefchaouen & the North" },
    duration: { fr: "3 jours ou plus", en: "3 days or more" },
    location: { fr: "Circuit privé", en: "Private circuit" },
    description: {
      fr: "Cap au nord pour les ruelles bleues de Chefchaouen, les reliefs du Rif et les haltes choisies en chemin.",
      en: "Head north for Chefchaouen's blue lanes, the Rif Mountains and thoughtful stops along the way.",
    },
    alt: {
      fr: "Façades et ruelles bleues de Chefchaouen",
      en: "Blue facades and lanes in Chefchaouen",
    },
    program: {
      fr: [
        "Circuit au départ de Marrakech, avec étapes et nuitées définies avec vous.",
        "Temps de découverte dans la medina bleue et les paysages du Rif.",
        "Durée, hébergements et retour adaptés à votre itinéraire global.",
      ],
      en: [
        "A route from Marrakech, with stops and overnight stays planned together.",
        "Time to explore the blue medina and the landscapes of the Rif.",
        "Duration, accommodation and return are tailored to your wider itinerary.",
      ],
    },
  },
  {
    id: "sur-mesure",
    image: pexels("38891222"),
    title: { fr: "Un circuit sur mesure", en: "A tailor-made journey" },
    duration: { fr: "Selon vos envies", en: "Made to fit your plans" },
    location: { fr: "Tout le Maroc", en: "Across Morocco" },
    description: {
      fr: "Une idée précise ou l'envie de vous laisser guider ? Construisons ensemble un itinéraire qui vous ressemble.",
      en: "Have a clear idea, or want help finding your route? Let's plan an itinerary that feels like yours.",
    },
    alt: {
      fr: "Cour intérieure d'un riad marocain traditionnel",
      en: "Inner courtyard of a traditional Moroccan riad",
    },
    program: {
      fr: [
        "Partagez vos dates, votre rythme, vos envies et votre budget.",
        "Anouar vous propose un parcours et des options détaillés.",
        "Le programme et le tarif sont confirmés avec vous avant réservation.",
      ],
      en: [
        "Share your dates, pace, interests and budget.",
        "Anouar will suggest a route with clear options.",
        "The itinerary and price are agreed with you before booking.",
      ],
    },
  },
];

const gallery: Array<{ image: string; label: Localized; isVideo?: boolean }> = [
  {
    image: pexels("30320422", 1800),
    label: { fr: "Les dunes de Merzouga", en: "The dunes of Merzouga" },
  },
  {
    image: pexels("31070248"),
    label: { fr: "Le port d'Essaouira", en: "The harbour of Essaouira" },
  },
  {
    image: pexels("37684079"),
    label: { fr: "Les reliefs de l'Atlas", en: "The Atlas Mountains" },
  },
  {
    image: agafayPhoto,
    label: { fr: "Une lumière d'Agafay", en: "Agafay in golden light" },
    isVideo: true,
  },
  {
    image: pexels("18487344"),
    label: { fr: "Les ruelles de Chefchaouen", en: "The lanes of Chefchaouen" },
  },
];

const copy = {
  fr: {
    nav: {
      excursions: "Excursions",
      approach: "Notre approche",
      gallery: "Galerie",
      about: "Anouar",
      faq: "FAQ",
      booking: "Réserver",
      menuOpen: "Ouvrir le menu",
      menuClose: "Fermer le menu",
      language: "Switch to English",
      themeDark: "Activer le mode sombre",
      themeLight: "Activer le mode clair",
    },
    hero: {
      title: "Morocco\nExcursions",
      byline: "by Anouar",
      lead: "Le Maroc, vécu de l'intérieur. Des dunes du Sahara aux ruelles des medinas, des excursions privées imaginées avec un regard local.",
      cta: "Réserver sur WhatsApp",
      explore: "Explorer les excursions",
    },
    tours: {
      eyebrow: "LA ROUTE VOUS APPARTIENT",
      title: "Le Maroc, une excursion à la fois.",
      lead: "Des grands paysages aux journées au grand air, choisissez votre échappée. Chaque itinéraire se précise avec Anouar, selon vos dates et votre rythme.",
      duration: "Durée",
      price: "Tarif",
      quoteLabel: "Sur devis",
      quoteNote: "Détails et prix confirmés avant réservation.",
      details: "Programme & inclusions",
      program: "Au programme",
      included: "Inclus dans la demande",
      notIncluded: "À prévoir ou à confirmer",
      commonIncluded: [
        "Transport privé et confortable depuis Marrakech, selon le circuit.",
        "Prise en charge et retour au point convenu avec Anouar.",
      ],
      commonExcluded: [
        "Repas, boissons, billets et activités, sauf mention au devis.",
        "Hébergements et dépenses personnelles pour les circuits de plusieurs jours.",
        "Pourboires et options non indiquées dans la confirmation.",
      ],
      detailsNote: "Le devis précise chaque prestation incluse et non incluse.",
      cta: "Demander un devis",
    },
    why: {
      eyebrow: "L'ESPRIT DU VOYAGE",
      title: "La liberté de voyager, l'esprit tranquille.",
      lead: "Un contact direct, un itinéraire préparé avec soin et les détails posés avant le départ.",
      items: [
        { title: "Guide local", text: "Un regard du pays, des conseils sincères et le sens du détour qui fait la journée." },
        { title: "Véhicule confortable", text: "Un trajet privé pensé pour votre groupe, avec un rythme souple et des pauses quand il le faut." },
        { title: "Groupes privés", text: "Vous voyagez avec vos proches, sans programme collectif imposé." },
        { title: "Prix clair", text: "Chaque prestation est détaillée et validée avec vous avant toute réservation." },
      ],
    },
    gallery: {
      eyebrow: "CARNET DE ROUTE",
      title: "Des couleurs qu'on n'oublie pas.",
      lead: "Du silence des dunes au bleu de l'Atlantique, quelques aperçus du Maroc qui vous attend.",
      video: "Voir les vidéos sur Instagram",
      openPhoto: "Ouvrir la photo en grand",
      openVideo: "Voir les vidéos et stories sur Instagram",
    },
    reviews: {
      eyebrow: "AVIS VOYAGEURS",
      title: "La confiance se construit avant le départ.",
      text: "Échangez directement avec Anouar pour parler du trajet, du programme et du budget. Les avis publiés sur cette page seront de vrais retours de voyageurs, partagés avec leur accord.",
      cta: "Poser une question à Anouar",
    },
    about: {
      eyebrow: "FAISONS CONNAISSANCE",
      title: "Derrière chaque itinéraire, Anouar.",
      text: "Guide local et interlocuteur direct, Anouar prépare chaque excursion en tenant compte de votre groupe, de vos envies et du temps dont vous disposez. L'idée est simple : découvrir le Maroc sans se presser, avec des étapes choisies et un accueil attentif.",
      second: "Le site et les demandes sont disponibles en français et en anglais. Indiquez la langue souhaitée pour l'accompagnement au moment de votre réservation.",
      imageAlt: "Image d'illustration d'un guide local sur un sentier du sud marocain",
      imageCaption: "Visuel d'illustration · portrait d'Anouar à remplacer",
      languages: "Échanges en français ou en anglais",
      contact: "Écrire à Anouar",
    },
    faq: {
      eyebrow: "AVANT DE PARTIR",
      title: "Les réponses, sans détour.",
      lead: "Une question n'est pas dans la liste ? Anouar vous répond directement sur WhatsApp.",
      items: [
        {
          question: "Comment se passe le paiement ?",
          answer: "Les moyens de paiement et les éventuelles conditions d'acompte sont indiqués dans le devis, avant toute confirmation. N'envoyez aucun règlement avant d'avoir validé les détails directement avec Anouar.",
        },
        {
          question: "Puis-je annuler ou modifier ma réservation ?",
          answer: "Les délais et conditions d'annulation dépendent du circuit et des prestations réservées. Ils sont précisés par écrit dans votre échange de confirmation avant tout engagement.",
        },
        {
          question: "À quelle heure part-on et où se fait la prise en charge ?",
          answer: "L'horaire et le lieu de prise en charge sont définis avec vous selon l'excursion et votre hébergement. Ils sont confirmés par WhatsApp avant le départ.",
        },
        {
          question: "Que comprend le prix de l'excursion ?",
          answer: "Le devis détaille le transport et chaque prestation incluse. Repas, boissons, entrées, activités et hébergements peuvent varier selon la formule et ne sont compris que s'ils sont mentionnés.",
        },
        {
          question: "Que faut-il emporter ?",
          answer: "Prévoyez de l'eau, une protection solaire et des chaussures adaptées à la sortie choisie. Pour le désert ou la montagne, Anouar vous indiquera les vêtements utiles selon la saison.",
        },
      ],
    },
    booking: {
      eyebrow: "VOTRE PROCHAINE AVENTURE",
      title: "Parlons de votre voyage.",
      lead: "Quelques détails suffisent. Votre demande s'ouvrira dans WhatsApp avec un message déjà préparé; rien n'est envoyé depuis ce site.",
      name: "Votre nom",
      namePlaceholder: "Ex. Camille Martin",
      trip: "Excursion souhaitée",
      chooseTrip: "Choisir une excursion",
      date: "Date souhaitée",
      people: "Nombre de personnes",
      message: "Un détail à partager ?",
      messagePlaceholder: "Hébergement, envies, questions, budget...",
      submit: "Continuer sur WhatsApp",
      note: "Votre demande n'est pas une réservation confirmée. Anouar vous répondra avec les disponibilités et un devis détaillé.",
      formName: "Veuillez indiquer votre nom.",
      formTrip: "Choisissez une excursion.",
      formDate: "Choisissez une date souhaitée.",
    },
    footer: {
      line: "Le Maroc, avec un regard local.",
      contact: "Contact",
      follow: "Suivre le voyage",
      legal: "Mentions légales",
      legalText: "Avant publication, compléter ici l'identité juridique de l'exploitant, l'adresse professionnelle et les informations d'immatriculation applicables. Les demandes envoyées depuis le formulaire sont transmises uniquement lorsque vous ouvrez WhatsApp.",
      copyright: "Tous droits réservés.",
    },
    floating: "Écrire sur WhatsApp",
  },
  en: {
    nav: {
      excursions: "Excursions",
      approach: "Our approach",
      gallery: "Gallery",
      about: "Anouar",
      faq: "FAQ",
      booking: "Book",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      language: "Passer en français",
      themeDark: "Switch to dark mode",
      themeLight: "Switch to light mode",
    },
    hero: {
      title: "Morocco\nExcursions",
      byline: "by Anouar",
      lead: "Morocco, seen from the inside. From Sahara dunes to medina lanes, private excursions shaped by a local perspective.",
      cta: "Book on WhatsApp",
      explore: "Explore excursions",
    },
    tours: {
      eyebrow: "THE ROAD IS YOURS",
      title: "Morocco, one excursion at a time.",
      lead: "From wide-open landscapes to fresh-air escapes, choose your next journey. Plan every detail with Anouar around your dates and pace.",
      duration: "Duration",
      price: "Price",
      quoteLabel: "Quote on request",
      quoteNote: "Details and price confirmed before booking.",
      details: "Itinerary & inclusions",
      program: "The itinerary",
      included: "Included in your enquiry",
      notIncluded: "To plan or confirm",
      commonIncluded: [
        "Private, comfortable transport from Marrakech, depending on the route.",
        "Pick-up and drop-off at a location agreed with Anouar.",
      ],
      commonExcluded: [
        "Meals, drinks, tickets and activities unless listed in your quote.",
        "Accommodation and personal expenses on multi-day trips.",
        "Tips and options not listed in your confirmation.",
      ],
      detailsNote: "Your quote lists every included and excluded service.",
      cta: "Request a quote",
    },
    why: {
      eyebrow: "THE WAY WE TRAVEL",
      title: "Travel freely, with peace of mind.",
      lead: "A direct contact, a thoughtfully planned route and clear details before you set off.",
      items: [
        { title: "Local guide", text: "A local perspective, honest recommendations and an eye for the detour that makes the day." },
        { title: "Comfortable vehicle", text: "A private ride planned for your group, with a flexible pace and breaks when you need them." },
        { title: "Private groups", text: "Travel with your own people, without a fixed group itinerary." },
        { title: "Clear pricing", text: "Every service is itemised and agreed with you before booking." },
      ],
    },
    gallery: {
      eyebrow: "FIELD NOTES",
      title: "Colours that stay with you.",
      lead: "From the stillness of the dunes to the blue Atlantic, a glimpse of the Morocco waiting for you.",
      video: "Watch videos on Instagram",
      openPhoto: "Open full-size photo",
      openVideo: "See videos and stories on Instagram",
    },
    reviews: {
      eyebrow: "TRAVELLER REVIEWS",
      title: "Trust starts before the journey.",
      text: "Speak directly with Anouar about the route, itinerary and budget. Reviews shown on this page will be genuine traveller feedback, shared with their permission.",
      cta: "Ask Anouar a question",
    },
    about: {
      eyebrow: "A LITTLE INTRODUCTION",
      title: "Behind every route, Anouar.",
      text: "A local guide and your direct contact, Anouar plans each excursion around your group, your interests and the time you have. The idea is simple: discover Morocco without rushing, with thoughtful stops and a warm welcome.",
      second: "The website and enquiries are available in French and English. Let us know your preferred language for the excursion when you book.",
      imageAlt: "Illustrative image of a local guide on a trail in southern Morocco",
      imageCaption: "Illustrative image · replace with Anouar's portrait",
      languages: "Enquiries in French or English",
      contact: "Write to Anouar",
    },
    faq: {
      eyebrow: "BEFORE YOU GO",
      title: "Straight answers, all in one place.",
      lead: "Can't find your answer? Anouar will reply directly on WhatsApp.",
      items: [
        {
          question: "How does payment work?",
          answer: "Payment methods and any deposit requirements are set out in your quote, before confirmation. Do not send payment until you have confirmed the details directly with Anouar.",
        },
        {
          question: "Can I cancel or change my booking?",
          answer: "Cancellation terms and timeframes depend on the trip and services booked. They will be shared in writing before you make a commitment.",
        },
        {
          question: "What time do we leave, and where is pick-up?",
          answer: "The departure time and pick-up location are agreed with you based on the excursion and your accommodation. Anouar will confirm them on WhatsApp before the trip.",
        },
        {
          question: "What is included in the excursion price?",
          answer: "Your quote lists transport and every included service. Meals, drinks, entry fees, activities and accommodation vary by itinerary and are included only when specified.",
        },
        {
          question: "What should I bring?",
          answer: "Bring water, sun protection and shoes suited to your excursion. For desert or mountain trips, Anouar can advise you on seasonal clothing.",
        },
      ],
    },
    booking: {
      eyebrow: "YOUR NEXT ADVENTURE",
      title: "Let's talk about your trip.",
      lead: "A few details are all we need. Your request will open in WhatsApp with a message ready to send; nothing is sent from this website.",
      name: "Your name",
      namePlaceholder: "e.g. Camille Martin",
      trip: "Excursion of interest",
      chooseTrip: "Choose an excursion",
      date: "Preferred date",
      people: "Number of travellers",
      message: "Anything else to share?",
      messagePlaceholder: "Accommodation, interests, questions, budget...",
      submit: "Continue on WhatsApp",
      note: "Your enquiry is not a confirmed booking. Anouar will reply with availability and a detailed quote.",
      formName: "Please enter your name.",
      formTrip: "Please choose an excursion.",
      formDate: "Please select a preferred date.",
    },
    footer: {
      line: "Morocco, through a local lens.",
      contact: "Contact",
      follow: "Follow the journey",
      legal: "Legal information",
      legalText: "Before publishing, add the operator's legal identity, business address and applicable registration details here. Enquiries from this form are only transmitted when you open WhatsApp.",
      copyright: "All rights reserved.",
    },
    floating: "Message on WhatsApp",
  },
} as const;

type BookingForm = {
  name: string;
  tour: string;
  date: string;
  people: string;
  message: string;
};

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="icon">
      {diagonal ? (
        <path d="M7 17 17 7M8 7h9v9" />
      ) : (
        <path d="M4.5 12h14m-5.5-6 6 6-6 6" />
      )}
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="whatsapp-icon">
      <path
        d="M26.2 5.8A14.1 14.1 0 0 0 3.9 22.7L2 30l7.5-1.9a14.1 14.1 0 0 0 16.7-22.3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M11.1 9.5c-.3-.7-.6-.7-.9-.7h-.8c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.6 4.2 6.4 5.7 3.2 1.3 3.8 1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5l-2.5-1.2c-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.5-.2.3-.5.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.3 0-.5.2-.7l.6-.7c.2-.2.3-.4.4-.6.1-.2 0-.5 0-.7-.1-.2-.9-2.2-1.2-2.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="icon">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.6 6.5h.01" />
    </svg>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>("fr");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("anouar-theme") === "dark";
  });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [booking, setBooking] = useState<BookingForm>({
    name: "",
    tour: "",
    date: "",
    people: "2",
    message: "",
  });

  const t = copy[language];

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    document.documentElement.lang = language;
    window.localStorage.setItem("anouar-theme", darkMode ? "dark" : "light");
  }, [darkMode, language]);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 28);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [language]);

  const closeMenu = () => setMenuOpen(false);

  const chooseTour = (tourId: string) => {
    setBooking((current) => ({ ...current, tour: tourId }));
    closeMenu();
    document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" });
    window.setTimeout(() => document.getElementById("traveler-name")?.focus(), 500);
  };

  const handleBookingChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.currentTarget;
    setBooking((current) => ({ ...current, [name]: value }));
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedTour = tours.find((tour) => tour.id === booking.tour);
    const tourName = selectedTour ? selectedTour.title[language] : t.booking.chooseTrip;
    const message =
      language === "fr"
        ? `Bonjour Anouar, je souhaite recevoir un devis.\n\nNom : ${booking.name}\nExcursion : ${tourName}\nDate souhaitée : ${booking.date}\nNombre de personnes : ${booking.people}\nMessage : ${booking.message || "Aucun détail complémentaire."}`
        : `Hello Anouar, I would like to request a quote.\n\nName: ${booking.name}\nExcursion: ${tourName}\nPreferred date: ${booking.date}\nNumber of travellers: ${booking.people}\nMessage: ${booking.message || "No extra details."}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  };

  const localDate = new Date();
  localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
  const today = localDate.toISOString().slice(0, 10);
  const quickWhatsApp = whatsappUrl(
    language === "fr"
      ? "Bonjour Anouar, je souhaite en savoir plus sur vos excursions au Maroc."
      : "Hello Anouar, I would like to know more about your excursions in Morocco.",
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        {language === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>

      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="header-inner">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Morocco Excursions by Anouar">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" fill="none">
                <path d="M16 2.5 19.2 12.8 29.5 16l-10.3 3.2L16 29.5l-3.2-10.3L2.5 16l10.3-3.2L16 2.5Z" />
                <path d="M16 9.2 18 14l4.8 2-4.8 2-2 4.8-2-4.8-4.8-2 4.8-2 2-4.8Z" />
              </svg>
            </span>
            <span className="brand-words">
              <span className="brand-name">Morocco Excursions</span>
              <span className="brand-byline">by Anouar</span>
            </span>
          </a>

          <nav id="main-menu" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label={language === "fr" ? "Navigation principale" : "Main navigation"}>
            <a href="#excursions" onClick={closeMenu}>{t.nav.excursions}</a>
            <a href="#approche" onClick={closeMenu}>{t.nav.approach}</a>
            <a href="#galerie" onClick={closeMenu}>{t.nav.gallery}</a>
            <a href="#anouar" onClick={closeMenu}>{t.nav.about}</a>
            <a href="#faq" onClick={closeMenu}>{t.nav.faq}</a>
            <a className="nav-book" href="#reservation" onClick={closeMenu}>
              {t.nav.booking}<ArrowIcon />
            </a>
          </nav>

          <div className="header-tools">
            <button
              className="tool-button language-toggle"
              type="button"
              onClick={() => setLanguage((current) => (current === "fr" ? "en" : "fr"))}
              aria-label={t.nav.language}
              title={t.nav.language}
            >
              {language === "fr" ? "EN" : "FR"}
            </button>
            <button
              className="tool-button theme-toggle"
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              aria-label={darkMode ? t.nav.themeLight : t.nav.themeDark}
              aria-pressed={darkMode}
              title={darkMode ? t.nav.themeLight : t.nav.themeDark}
            >
              {darkMode ? (
                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M20.2 15.2A8.3 8.3 0 0 1 8.8 3.8 8.6 8.6 0 1 0 20.2 15.2Z" />
                </svg>
              )}
            </button>
            <button
              className={`tool-button menu-toggle${menuOpen ? " is-active" : ""}`}
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={menuOpen ? t.nav.menuClose : t.nav.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="main-menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src={pexels("30320422", 2200)}
            alt={language === "fr" ? "Caravane traversant les dunes du Sahara marocain au coucher du soleil" : "A caravan crossing Moroccan Sahara dunes at sunset"}
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="container hero-content">
            <p className="hero-kicker">{language === "fr" ? "DES VOYAGES PRIVÉS AU MAROC" : "PRIVATE JOURNEYS IN MOROCCO"}</p>
            <h1 id="hero-title">
              {t.hero.title.split("\n").map((line) => <span key={line}>{line}</span>)}
              <em>{t.hero.byline}</em>
            </h1>
            <p className="hero-lead">{t.hero.lead}</p>
            <div className="hero-actions">
              <a className="button button-gold" href={quickWhatsApp} target="_blank" rel="noreferrer">
                <WhatsAppIcon />
                {t.hero.cta}
              </a>
              <a className="text-link text-link-light" href="#excursions">
                {t.hero.explore}<ArrowIcon />
              </a>
            </div>
          </div>
          <a className="hero-scroll" href="#excursions" aria-label={language === "fr" ? "Défiler jusqu'aux excursions" : "Scroll to excursions"}>
            <span />
          </a>
        </section>

        <section className="excursions-section section-pad" id="excursions" aria-labelledby="excursions-title">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">{t.tours.eyebrow}</p>
                <h2 id="excursions-title">{t.tours.title}</h2>
                <p className="section-lead">{t.tours.lead}</p>
              </div>
              <span className="section-counter" aria-hidden="true">01 <i /> 08</span>
            </div>

            <div className="excursion-grid">
              {tours.map((tour, index) => (
                <article className="tour-entry reveal" key={tour.id}>
                  <a
                    className="tour-image-link"
                    href={tour.image}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${t.gallery.openPhoto}: ${tour.alt[language]}`}
                  >
                    <img src={tour.image} alt={tour.alt[language]} loading="lazy" decoding="async" />
                    <span className="image-arrow" aria-hidden="true"><ArrowIcon diagonal /></span>
                  </a>
                  <div className="tour-content">
                    <div className="tour-meta">
                      <span>{tour.location[language]}</span>
                      <span>{tour.duration[language]}</span>
                    </div>
                    <h3>{tour.title[language]}</h3>
                    <p className="tour-description">{tour.description[language]}</p>
                    <details className="tour-details">
                      <summary>
                        <span>{t.tours.details}</span>
                        <span className="details-plus" aria-hidden="true" />
                      </summary>
                      <div className="tour-detail-body">
                        <div className="detail-group">
                          <h4>{t.tours.program}</h4>
                          <ul>
                            {tour.program[language].map((step) => <li key={step}>{step}</li>)}
                          </ul>
                        </div>
                        <div className="detail-columns">
                          <div className="detail-group">
                            <h4>{t.tours.included}</h4>
                            <ul>
                              {t.tours.commonIncluded.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                          </div>
                          <div className="detail-group">
                            <h4>{t.tours.notIncluded}</h4>
                            <ul>
                              {t.tours.commonExcluded.map((item) => <li key={item}>{item}</li>)}
                            </ul>
                          </div>
                        </div>
                        <p className="detail-note">{t.tours.detailsNote}</p>
                      </div>
                    </details>
                    <div className="tour-footer">
                      <div className="tour-price">
                        <span>{t.tours.price}</span>
                        <strong>{t.tours.quoteLabel}</strong>
                        <small>{t.tours.quoteNote}</small>
                      </div>
                      <button className="text-link tour-cta" type="button" onClick={() => chooseTour(tour.id)}>
                        {t.tours.cta}<ArrowIcon />
                      </button>
                    </div>
                  </div>
                  <span className="tour-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="approach-section section-pad" id="approche" aria-labelledby="approach-title">
          <div className="container">
            <div className="approach-heading reveal">
              <p className="eyebrow eyebrow-gold">{t.why.eyebrow}</p>
              <h2 id="approach-title">{t.why.title}</h2>
              <p>{t.why.lead}</p>
            </div>
            <div className="values-grid">
              {t.why.items.map((item, index) => (
                <article className="value-item reveal" key={item.title}>
                  <span className="value-number">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gallery-section section-pad" id="galerie" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-heading gallery-heading reveal">
              <div>
                <p className="eyebrow">{t.gallery.eyebrow}</p>
                <h2 id="gallery-title">{t.gallery.title}</h2>
                <p className="section-lead">{t.gallery.lead}</p>
              </div>
              <a className="text-link gallery-follow" href={instagramUrl} target="_blank" rel="noreferrer">
                <InstagramIcon />{t.gallery.video}<ArrowIcon diagonal />
              </a>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <figure className={`gallery-tile gallery-tile-${index + 1} reveal`} key={item.label.fr}>
                  <a
                    href={item.isVideo ? instagramUrl : item.image}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.isVideo ? t.gallery.openVideo : `${t.gallery.openPhoto}: ${item.label[language]}`}
                  >
                    <img src={item.image} alt={item.label[language]} loading="lazy" decoding="async" />
                    <span className="gallery-caption">{item.label[language]}</span>
                    {item.isVideo && (
                      <span className="play-button" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10-6.5-10-6.5Z" /></svg>
                      </span>
                    )}
                  </a>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="reviews-section section-pad" id="avis" aria-labelledby="reviews-title">
          <div className="container reviews-inner reveal">
            <span className="review-ornament" aria-hidden="true">“</span>
            <div className="reviews-copy">
              <p className="eyebrow">{t.reviews.eyebrow}</p>
              <h2 id="reviews-title">{t.reviews.title}</h2>
              <p>{t.reviews.text}</p>
              <a className="text-link" href={quickWhatsApp} target="_blank" rel="noreferrer">
                {t.reviews.cta}<ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="anouar" aria-labelledby="about-title">
          <div className="container about-layout">
            <figure className="about-image reveal">
              <img src={pexels("37441809", 1600)} alt={t.about.imageAlt} loading="lazy" decoding="async" />
              <figcaption>{t.about.imageCaption}</figcaption>
            </figure>
            <div className="about-copy reveal">
              <p className="eyebrow">{t.about.eyebrow}</p>
              <h2 id="about-title">{t.about.title}</h2>
              <p>{t.about.text}</p>
              <p>{t.about.second}</p>
              <p className="language-note"><span className="language-dot" />{t.about.languages}</p>
              <a className="text-link" href={quickWhatsApp} target="_blank" rel="noreferrer">
                {t.about.contact}<ArrowIcon />
              </a>
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-intro reveal">
              <p className="eyebrow">{t.faq.eyebrow}</p>
              <h2 id="faq-title">{t.faq.title}</h2>
              <p>{t.faq.lead}</p>
              <a className="text-link" href={quickWhatsApp} target="_blank" rel="noreferrer">
                {t.reviews.cta}<ArrowIcon />
              </a>
            </div>
            <div className="faq-list reveal">
              {t.faq.items.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>
                    <span>{item.question}</span>
                    <span className="details-plus" aria-hidden="true" />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-section section-pad" id="reservation" aria-labelledby="booking-title">
          <div className="container booking-layout">
            <div className="booking-copy reveal">
              <p className="eyebrow eyebrow-gold">{t.booking.eyebrow}</p>
              <h2 id="booking-title">{t.booking.title}</h2>
              <p>{t.booking.lead}</p>
              <div className="booking-contact">
                <span>{language === "fr" ? "Réponse directe par" : "A direct reply on"}</span>
                <strong>WhatsApp</strong>
                <a href={quickWhatsApp} target="_blank" rel="noreferrer">+212 675-642713</a>
              </div>
            </div>
            <form className="booking-form reveal" onSubmit={submitBooking}>
              <div className="form-grid">
                <label className="form-field" htmlFor="traveler-name">
                  <span>{t.booking.name}</span>
                  <input
                    id="traveler-name"
                    type="text"
                    name="name"
                    value={booking.name}
                    onChange={handleBookingChange}
                    placeholder={t.booking.namePlaceholder}
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="form-field" htmlFor="trip-choice">
                  <span>{t.booking.trip}</span>
                  <select id="trip-choice" name="tour" value={booking.tour} onChange={handleBookingChange} required>
                    <option value="" disabled>{t.booking.chooseTrip}</option>
                    {tours.map((tour) => <option value={tour.id} key={tour.id}>{tour.title[language]}</option>)}
                  </select>
                </label>
                <label className="form-field" htmlFor="trip-date">
                  <span>{t.booking.date}</span>
                  <input id="trip-date" type="date" name="date" min={today} value={booking.date} onChange={handleBookingChange} required />
                </label>
                <label className="form-field" htmlFor="trip-people">
                  <span>{t.booking.people}</span>
                  <input id="trip-people" type="number" name="people" min="1" max="30" value={booking.people} onChange={handleBookingChange} required />
                </label>
                <label className="form-field form-field-wide" htmlFor="trip-message">
                  <span>{t.booking.message}</span>
                  <textarea id="trip-message" name="message" rows={4} value={booking.message} onChange={handleBookingChange} placeholder={t.booking.messagePlaceholder} />
                </label>
              </div>
              <button className="button button-gold form-submit" type="submit">
                <WhatsAppIcon />{t.booking.submit}<ArrowIcon />
              </button>
              <p className="form-note">{t.booking.note}</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand-block">
            <a className="brand footer-brand" href="#top" aria-label="Morocco Excursions by Anouar">
              <span className="brand-mark" aria-hidden="true">
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M16 2.5 19.2 12.8 29.5 16l-10.3 3.2L16 29.5l-3.2-10.3L2.5 16l10.3-3.2L16 2.5Z" />
                  <path d="M16 9.2 18 14l4.8 2-4.8 2-2 4.8-2-4.8-4.8-2 4.8-2 2-4.8Z" />
                </svg>
              </span>
              <span className="brand-words">
                <span className="brand-name">Morocco Excursions</span>
                <span className="brand-byline">by Anouar</span>
              </span>
            </a>
            <p>{t.footer.line}</p>
          </div>
          <div className="footer-column">
            <h2>{t.footer.contact}</h2>
            <a href="tel:+212675642713">+212 675-642713</a>
            <a href={quickWhatsApp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
          <div className="footer-column">
            <h2>{t.footer.follow}</h2>
            <a href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon />Instagram<ArrowIcon diagonal /></a>
            <a href="#excursions">{t.nav.excursions}<ArrowIcon /></a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Morocco Excursions by Anouar. {t.footer.copyright}</span>
          <details className="legal-details" id="mentions-legales">
            <summary>{t.footer.legal}</summary>
            <p>{t.footer.legalText}</p>
          </details>
          <a className="back-to-top" href="#top" aria-label={language === "fr" ? "Retour en haut de page" : "Back to top"}>
            <ArrowIcon diagonal />
          </a>
        </div>
      </footer>

      <a className="floating-whatsapp" href={quickWhatsApp} target="_blank" rel="noreferrer" aria-label={t.floating}>
        <WhatsAppIcon />
        <span>{t.floating}</span>
      </a>
    </>
  );
}

export default App;
