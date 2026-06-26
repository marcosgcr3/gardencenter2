"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.about": "Sobre Nosotros",
    "nav.plants": "Plantas",
    "nav.gallery": "Galería",
    "nav.contact": "Contacto",
    "nav.contactBtn": "Contactar",
    "contact.banner": "Lun - Vie: 8:30-14:00, 16:00-20:00 | Sáb: 10:00-14:00",

    // Footer
    "footer.desc": "Tu vivero y centro de jardinería de confianza en San Pedro Alcántara, Marbella. Variedad de plantas de interior, exterior, alfarería y decoración para el hogar.",
    "footer.title.links": "Enlaces Rápidos",
    "footer.title.contact": "Contacto",
    "footer.title.hours": "Horario",
    "footer.rights": "Todos los derechos reservados.",

    // General terms
    "days.mon-fri": "Lunes a Viernes",
    "days.sat": "Sábados",
    "days.sun": "Domingos",
    "status.closed": "Cerrado",

    // Home Page
    "home.badge": "Vivero Familiar desde 1989",
    "home.hero.title1": "Cultivamos naturaleza,",
    "home.hero.title2": "diseñamos espacios.",
    "home.hero.desc": "Garden Center Lindavista. Más de 30 años creando jardines únicos.",
    "home.hero.btn.discover": "Descubrir",
    "home.slide1.title": "Vivero en San Pedro de Alcántara, Marbella | Garden Center Linda Vista",
    "home.slide1.desc": "Tu vivero de confianza en San Pedro de Alcántara (Marbella) desde 1989. Selección única de plantas, alfarería, decoración y servicios de jardinería profesional.",
    "home.slide2.title": "El vivero de referencia en Marbella",
    "home.slide2.desc": "Situados en San Pedro Alcántara, a escasos minutos de Puerto Banús. Descubre nuestra gran variedad de macetas y cerámicas.",
    "home.slide3.title": "Servicios de Jardinería Profesional",
    "home.slide3.desc": "Diseñamos, construimos y mantenemos el jardín de tus sueños con un equipo experto y maquinaria moderna.",
    "home.btn.info": "Solicitar Información",
    "home.btn.more": "Saber Más",
    
    "home.features.title1": "Familiar",
    "home.features.desc1": "Como empresa familiar desde 1989, ofrecemos un trato cercano, personalizado y de total confianza para asegurar el éxito de tu jardín.",
    "home.features.title2": "Asesoramiento",
    "home.features.desc2": "Nuestro equipo de profesionales te guiará y asesorará de manera experta en la elección y el cuidado óptimo de tus plantas.",
    "home.features.title3": "Transporte Propio",
    "home.features.desc3": "Disponemos de vehículos equipados y personal cualificado para realizar la entrega de tus plantas y cerámicas a domicilio.",
    
    "home.about.badge": "Sobre Nosotros",
    "home.about.title": "Tu vivero de confianza en San Pedro de Alcántara, Marbella, desde 1989",
    "home.about.desc1": "Como empresa familiar ubicada en el corazón de la Costa del Sol, conocemos de primera mano las necesidades del cliente nacional y extranjero. Ofrecemos un servicio de atención agradable, comunicativo y experto para garantizar el éxito de tu jardín.",
    "home.about.desc2": "A solo 3 minutos de Puerto Banús y 10 minutos de Marbella, disponemos de la mayor selección de maceterías y cerámicas de la costa, así como ofertas especiales de temporada.",
    "home.about.link": "Conoce más sobre nuestra historia",
    
    "home.services.badge": "Nuestros Servicios",
    "home.services.title": "Servicios de Jardinería y Vivero en Marbella",
    "home.services.desc": "Descubre las cuatro áreas principales que nos definen y los productos que tenemos disponibles para transformar tus espacios.",
    
    "home.services.s1.title": "Jardinería",
    "home.services.s1.desc": "Realizamos diseño, construcción y mantenimiento integral de jardines públicos y privados, optimizando el riego.",
    "home.services.s2.title": "Plantas",
    "home.services.s2.desc": "Gran variedad de plantas de interior, exterior, árboles ejemplares, arbustos y flores de temporada. Abastecimiento semanal.",
    "home.services.s3.title": "Decoración",
    "home.services.s3.desc": "La mayor selección de la costa de alfarería y macetas de todo tipo (cerámica, barro, resina) y complementos decorativos.",
    "home.services.s4.title": "Muebles",
    "home.services.s4.desc": "Mobiliario exclusivo de exterior y complementos confortables diseñados para resistir las condiciones del Mediterráneo.",
    
    "home.cta.title": "¿Necesitas asesoramiento profesional para tu jardín?",
    "home.cta.desc": "Llámanos directamente o ven a visitarnos en San Pedro Alcántara. Nuestro equipo de profesionales estará encantado de ayudarte.",
    "home.cta.btn.call": "Llamar: 952 78 52 06",
    "home.cta.btn.msg": "Enviar Mensaje",
    "home.cta.hours.title": "Horarios de Apertura",
    
    "home.reviews.badge": "Opiniones de Clientes",
    "home.reviews.title": "Lo que opinan de nosotros",
    "home.reviews.subtitle": "Cliente Satisfecho",
    
    // Reviews
    "review.1": "Gran variedad de plantas de interior y exterior, flores, hierbas y todo tipo de macetas y decoración de jardines. Buen servicio y muy amables.",
    "review.2": "Excelente selección y personal muy servicial y amable. Siempre salgo muy contenta de este vivero.",
    "review.3": "Excelente personal, de lo más útil e informativo. Te asesoran a la perfección en la elección de plantas.",
    "review.4": "Excelente calidad de productos en el centro de jardinería. Variedad inmejorable en toda la zona de Marbella.",
    "review.5": "Siempre es mi centro de jardinería 'ir'. El asesoramiento profesional es excelente y el trato impecable.",

    // About Us Page
    "about.badge": "Conócenos mejor",
    "about.title": "Sobre Nosotros",
    "about.header.desc": "Garden Center Linda Vista: Pasión familiar por la jardinería, plantas y decoración desde 1989.",
    "about.subtitle": "Nuestra Historia y Filosofía",
    "about.main.title": "Más de 30 años cultivando belleza y bienestar",
    "about.p1": "Garden Center Linda Vista es una empresa familiar fundada en 1989 dedicada con entusiasmo a la venta y distribución de plantas, semillas, abonos, artículos de jardinería, alfarería exclusiva, decoración y mobiliario, así como a la ejecución de jardines y su mantenimiento profesional.",
    "about.p2": "Nos proveemos semanalmente de los más prestigiosos y variados productores nacionales e internacionales para ofrecer siempre plantas frescas y saludables. Asimismo, contamos con una gran variedad y cantidad de macetas y alfarería artesanal traída de diferentes rincones de España y del extranjero para que encuentres la pieza perfecta.",
    "about.p3": "Nuestro gran pilar y secreto durante todos estos años ha sido la apuesta firme por un trato personalizado y de absoluta confianza. Contamos con un equipo altamente cualificado y encantado de asesorarte en todo lo que necesites, logrando que muchos de nuestros visitantes habituales se conviertan en amigos que conforman el alma de nuestro negocio.",
    "about.location.title": "Excelente ubicación (San Pedro Alcántara)",
    "about.location.desc": "Disponemos del privilegio de estar situados en un enclave estratégico, a escasos minutos de los principales centros urbanos de la Costa del Sol (haz clic en las tarjetas o en el mapa para indicaciones):",
    "about.experience.badge": "Años de Exp.",
    "about.values.badge": "Nuestros Valores",
    "about.values.title": "¿Por qué elegir Garden Center Linda Vista?",
    "about.values.desc": "Guiamos nuestro trabajo diario bajo principios que garantizan la satisfacción de nuestros clientes y el cuidado sostenible del medio ambiente.",
    "about.val.title1": "Desde 1989",
    "about.val.desc1": "Más de tres décadas ofreciendo asesoramiento experto y los mejores productos de jardinería en la Costa del Sol.",
    "about.val.title2": "Empresa Familiar",
    "about.val.desc2": "Fundada y dirigida con pasión familiar, lo que se traduce en cercanía, confianza y compromiso con el cliente.",
    "about.val.title3": "Trato Personalizado",
    "about.val.desc3": "Nuestra prioridad es escuchar y entender tus necesidades. Para nosotros, cada cliente es un amigo de la casa.",
    "about.val.title4": "Calidad Semanal",
    "about.val.desc4": "Renovamos nuestro stock de plantas semanalmente con los mejores productores nacionales e internacionales.",
    "about.cta.title": "Ven a descubrir el vivero más acogedor de la Costa del Sol",
    "about.cta.desc": "Estamos situados en Calle Araucaria 10, San Pedro Alcántara. ¡Disponemos de aparcamiento cómodo y ofertas especiales de temporada esperándote!",
    "about.cta.btn": "Cómo llegar e información de contacto",
    "about.advice.title": "Asesoramiento Técnico",
    "about.advice.desc": "¿No estás seguro de qué planta elegir o cómo solucionar una plaga? Nuestro equipo te asesorará para asegurar la salud de tu jardín.",

    // Contact Page
    "contact.badge": "Estamos para ayudarte",
    "contact.title": "Contacto",
    "contact.header.desc": "¿Tienes alguna consulta o necesitas presupuesto? Escríbenos o ven a visitarnos en San Pedro Alcántara.",
    "contact.info.badge": "Información",
    "contact.info.title": "Nuestros Datos de Contacto",
    "contact.info.desc": "Estaremos encantados de atenderte por cualquiera de estas vías. Si deseas visitarnos, disponemos de zona de carga de plantas para tu comodidad.",
    "contact.card.address": "Dirección",
    "contact.card.address.btn": "Ver en Google Maps",
    "contact.card.phone": "Teléfono",
    "contact.card.phone.btn": "Llamar ahora",
    "contact.card.email": "Email de Contacto",
    "contact.card.email.btn": "Enviar email",
    "contact.card.hours": "Horario comercial",
    "contact.card.hours.mon-fri": "Lunes - Viernes: 08:30-14:00 / 16:00-20:00",
    "contact.card.hours.sat": "Sábados: 10:00 - 14:00",
    "contact.card.hours.sun": "Domingos: Cerrado",

    // Contact Form Component
    "form.title": "Envíanos un Mensaje",
    "form.success.title": "¡Mensaje Enviado!",
    "form.success.desc": "Muchas gracias por contactar con Garden Center Linda Vista. Responderemos a tu solicitud lo antes posible.",
    "form.success.btn": "Enviar otro mensaje",
    "form.label.name": "Nombre Completo",
    "form.label.email": "Correo Electrónico",
    "form.label.phone": "Teléfono (Opcional)",
    "form.label.message": "Mensaje o Consulta",
    "form.placeholder.message": "Escribe aquí tu consulta...",
    "form.btn.sending": "Enviando mensaje...",
    "form.btn.send": "Enviar Mensaje",
    "form.val.name": "Por favor, introduce tu nombre.",
    "form.val.email": "Por favor, introduce tu email.",
    "form.val.email.invalid": "Por favor, introduce un email válido.",
    "form.val.message": "Por favor, escribe tu mensaje.",

    // Gallery Page
    "gallery.badge": "Nuestras Instalaciones",
    "gallery.title": "Galería de Fotos",
    "gallery.header.desc": "Echa un vistazo a nuestra gran variedad de plantas, flores, alfarería y zona de exposición.",
    "gallery.info.badge": "Catálogo Visual",
    "gallery.info.title": "Instalaciones y Exposición",
    "gallery.info.desc": "Trabajamos para tener un vivero ordenado, limpio y repleto de opciones inspiradoras. Haz clic en cualquiera de las imágenes para verlas en pantalla completa.",
    "gallery.photo1": "Variedad de plantas y flores en el vivero Linda Vista",
    "gallery.photo2": "Arbustos y plantas de exterior ordenadas en las instalaciones",
    "gallery.photo3": "Macetería de cerámica artesanal y macetas de exterior",
    "gallery.photo4": "Plantas de interior y flores de temporada",
    "gallery.photo5": "Artículos de decoración de jardín y alfarería esmaltada",
    "gallery.photo6": "Gran selección de plantas verdes y arbustos ornamentales",
    "gallery.photo7": "Exposición de plantas floridas en nuestro vivero",
    "gallery.photo8": "Sección de plantas de exterior de alta calidad",

    // Catalog Page & Plant Details
    "catalog.title": "Nuestras Plantas y Árboles",
    "catalog.desc": "Explora nuestra base de datos con variedades icónicas seleccionadas especialmente para el clima de la Costa del Sol. Conoce sus nombres científicos, características principales, niveles de dificultad, necesidades de luz, plagas comunes y frecuencias exactas de riego.",
    "catalog.badge": "Guía de Variedades y Cuidados",
    "catalog.adminBtn": "Panel Admin",
    "catalog.search": "Busca por nombre común, científico, descripción...",
    "catalog.filter.cat": "Categoría",
    "catalog.filter.diff": "Dificultad",
    "catalog.filter.all": "Todas",
    "catalog.found": "plantas encontradas",
    "catalog.found.single": "planta encontrada",
    "catalog.clear": "Limpiar filtros",
    "catalog.empty.title": "Sin resultados",
    "catalog.empty.desc": "No hemos encontrado ninguna planta que coincida con tus términos de búsqueda o filtros seleccionados.",
    "catalog.empty.btn": "Restablecer filtros",
    "catalog.btn.view": "Ver Ficha Completa",

    // Categories
    "category.Todas": "Todas",
    "category.Interior": "Interior",
    "category.Exterior": "Exterior",
    "category.Suculentas": "Suculentas",
    "category.Árboles": "Árboles y Arbustos",

    // Difficulties
    "difficulty.Todas": "Todas",
    "difficulty.Bajo": "Bajo",
    "difficulty.Medio": "Medio",
    "difficulty.Alto": "Alto",

    // Plant Details Layout
    "details.difficulty": "Dificultad",
    "details.light": "Iluminación",
    "details.watering": "Riego",
    "details.temperature": "Temperatura",
    "details.humidity": "Humedad",
    "details.title.spec": "Ficha Técnica",
    "details.title.features": "Características Principales",
    "details.title.care": "Cuidados Recomendados",
    "details.title.diseases": "Enfermedades y Plagas",
    "details.title.wateringPlan": "Plan de Riego Detallado",
    "details.watering.summer": "Primavera - Verano",
    "details.watering.winter": "Otoño - Invierno",
    "details.btn.back": "Volver al Catálogo",
    "details.btn.print": "Imprimir Ficha",
    "details.funFact": "Dato Curioso"
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.plants": "Plants",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.contactBtn": "Contact Us",
    "contact.banner": "Mon - Fri: 8:30-14:00, 16:00-20:00 | Sat: 10:00-14:00",

    // Footer
    "footer.desc": "Your trusted nursery and garden center in San Pedro Alcántara, Marbella. Wide variety of indoor and outdoor plants, pottery, and home decoration.",
    "footer.title.links": "Quick Links",
    "footer.title.contact": "Contact",
    "footer.title.hours": "Working Hours",
    "footer.rights": "All rights reserved.",

    // General terms
    "days.mon-fri": "Monday to Friday",
    "days.sat": "Saturdays",
    "days.sun": "Sundays",
    "status.closed": "Closed",

    // Home Page
    "home.badge": "Family Nursery since 1989",
    "home.hero.title1": "Cultivating nature,",
    "home.hero.title2": "designing spaces.",
    "home.hero.desc": "Garden Center Lindavista. More than 30 years creating unique gardens.",
    "home.hero.btn.discover": "Discover",
    "home.slide1.title": "Welcome to Garden Center Linda Vista | Nursery in San Pedro Alcántara, Marbella",
    "home.slide1.desc": "Your trusted nursery in San Pedro Alcántara (Marbella) since 1989. Unique selection of plants, pottery, decoration and professional gardening services.",
    "home.slide2.title": "The reference nursery in Marbella",
    "home.slide2.desc": "Located in San Pedro Alcántara, just minutes from Puerto Banús. Discover our large variety of pots and ceramics.",
    "home.slide3.title": "Professional Gardening Services",
    "home.slide3.desc": "We design, build and maintain the garden of your dreams with an expert team and modern machinery.",
    "home.btn.info": "Request Info",
    "home.btn.more": "Learn More",
    
    "home.features.title1": "Family Business",
    "home.features.desc1": "As a family-run nursery since 1989, we offer a personal, friendly, and trustworthy service to ensure your garden's success.",
    "home.features.title2": "Expert Advice",
    "home.features.desc2": "Our team of professionals will guide you and provide expert advice on choosing and caring for your plants.",
    "home.features.title3": "Own Transport",
    "home.features.desc3": "We have equipped vehicles and qualified staff to deliver your plants and pottery directly to your home.",
    
    "home.about.badge": "About Us",
    "home.about.title": "Your trusted garden center and nursery in San Pedro Alcántara, Marbella, since 1989",
    "home.about.desc1": "As a family business in the heart of the Costa del Sol, we know the needs of local and international clients first-hand. We offer a friendly, communicative, and expert service to ensure your garden's success.",
    "home.about.desc2": "Just 3 minutes from Puerto Banús and 10 minutes from Marbella, we offer the largest selection of pottery and ceramics on the coast, along with special seasonal deals.",
    "home.about.link": "Learn more about our history",
    
    "home.services.badge": "Our Services",
    "home.services.title": "Gardening & Nursery Services in Marbella",
    "home.services.desc": "Discover the four main areas that define us and the products we have available to transform your spaces.",
    
    "home.services.s1.title": "Gardening",
    "home.services.s1.desc": "We carry out comprehensive design, construction, and maintenance of public and private gardens, optimizing irrigation.",
    "home.services.s2.title": "Plants",
    "home.services.s2.desc": "Wide variety of indoor and outdoor plants, specimen trees, shrubs, and seasonal flowers. Weekly supply.",
    "home.services.s3.title": "Decoration",
    "home.services.s3.desc": "The largest selection of pottery and pots of all types (ceramic, clay, resin) and decorative accessories on the coast.",
    "home.services.s4.title": "Furniture",
    "home.services.s4.desc": "Exclusive outdoor furniture and comfortable accessories designed to withstand Mediterranean weather conditions.",
    
    "home.cta.title": "Need professional advice for your garden?",
    "home.cta.desc": "Call us directly or visit us in San Pedro Alcántara. Our team of professionals will be happy to help you.",
    "home.cta.btn.call": "Call: 952 78 52 06",
    "home.cta.btn.msg": "Send Message",
    "home.cta.hours.title": "Opening Hours",
    
    "home.reviews.badge": "Customer Reviews",
    "home.reviews.title": "What they say about us",
    "home.reviews.subtitle": "Satisfied Customer",
    
    // Reviews
    "review.1": "Great variety of indoor and outdoor plants, flowers, herbs and all kinds of pots and garden decoration. Good service and very friendly.",
    "review.2": "Excellent selection and very helpful and friendly staff. I always leave this nursery very happy.",
    "review.3": "Excellent staff, extremely helpful and informative. They advise you perfectly in the choice of plants.",
    "review.4": "Excellent quality products in the garden center. Unbeatable variety in the entire Marbella area.",
    "review.5": "Always my go-to garden center. Professional advice is excellent and service is impeccable.",

    // About Us Page
    "about.badge": "Get to know us",
    "about.title": "About Us",
    "about.header.desc": "Garden Center Linda Vista: Family passion for gardening, plants and decoration since 1989.",
    "about.subtitle": "Our History and Philosophy",
    "about.main.title": "More than 30 years cultivating beauty and well-being",
    "about.p1": "Garden Center Linda Vista is a family business founded in 1989 enthusiastically dedicated to the sale and distribution of plants, seeds, fertilizers, gardening items, exclusive pottery, decoration and furniture, as well as the execution of gardens and their professional maintenance.",
    "about.p2": "We supply ourselves weekly from the most prestigious and varied national and international producers to always offer fresh and healthy plants. Likewise, we have a great variety and quantity of pots and artisan pottery brought from different corners of Spain and abroad so that you can find the perfect piece.",
    "about.p3": "Our great pillar and secret during all these years has been our firm commitment to a personalized and absolutely trustworthy service. We have a highly qualified team who are delighted to advise you on everything you need, turning many of our regular visitors into friends who conform the soul of our business.",
    "about.location.title": "Excellent location (San Pedro Alcántara)",
    "about.location.desc": "We enjoy the privilege of being located in a strategic enclave, a few minutes from the main urban centers of the Costa del Sol (click on the cards or on the map for directions):",
    "about.experience.badge": "Years Exp.",
    "about.values.badge": "Our Values",
    "about.values.title": "Why choose Garden Center Linda Vista?",
    "about.values.desc": "We guide our daily work under principles that guarantee the satisfaction of our clients and the sustainable care of the environment.",
    "about.val.title1": "Since 1989",
    "about.val.desc1": "More than three decades offering expert advice and the best gardening products on the Costa del Sol.",
    "about.val.title2": "Family Business",
    "about.val.desc2": "Founded and run with family passion, which translates into closeness, trust, and commitment to the client.",
    "about.val.title3": "Personalized Service",
    "about.val.desc3": "Our priority is to listen and understand your needs. For us, every client is a friend of the house.",
    "about.val.title4": "Weekly Quality",
    "about.val.desc4": "We renew our plant stock weekly with the best national and international producers.",
    "about.cta.title": "Come discover the coziest nursery on the Costa del Sol",
    "about.cta.desc": "We are located at Calle Araucaria 10, San Pedro Alcántara. Convenient parking and special seasonal offers await you!",
    "about.cta.btn": "How to get here & contact info",
    "about.advice.title": "Technical Advice",
    "about.advice.desc": "Not sure which plant to choose or how to solve a pest problem? Our team will advise you to ensure your garden's health.",

    // Contact Page
    "contact.badge": "We are here to help",
    "contact.title": "Contact",
    "contact.header.desc": "Do you have any questions or need a quote? Write to us or visit us in San Pedro Alcántara.",
    "contact.info.badge": "Information",
    "contact.info.title": "Our Contact Details",
    "contact.info.desc": "We will be happy to assist you through any of these channels. If you wish to visit us, we have a plant loading area for your convenience.",
    "contact.card.address": "Address",
    "contact.card.address.btn": "View on Google Maps",
    "contact.card.phone": "Phone",
    "contact.card.phone.btn": "Call now",
    "contact.card.email": "Contact Email",
    "contact.card.email.btn": "Send email",
    "contact.card.hours": "Business Hours",
    "contact.card.hours.mon-fri": "Monday - Friday: 08:30-14:00 / 16:00-20:00",
    "contact.card.hours.sat": "Saturdays: 10:00 - 14:00",
    "contact.card.hours.sun": "Sundays: Closed",

    // Contact Form Component
    "form.title": "Send us a Message",
    "form.success.title": "Message Sent!",
    "form.success.desc": "Thank you very much for contacting Garden Center Linda Vista. We will respond to your request as soon as possible.",
    "form.success.btn": "Send another message",
    "form.label.name": "Full Name",
    "form.label.email": "Email Address",
    "form.label.phone": "Phone (Optional)",
    "form.label.message": "Message or Inquiry",
    "form.placeholder.message": "Write your inquiry here...",
    "form.btn.sending": "Sending message...",
    "form.btn.send": "Send Message",
    "form.val.name": "Please enter your name.",
    "form.val.email": "Please enter your email.",
    "form.val.email.invalid": "Please enter a valid email address.",
    "form.val.message": "Please write your message.",

    // Gallery Page
    "gallery.badge": "Our Facilities",
    "gallery.title": "Photo Gallery",
    "gallery.header.desc": "Take a look at our wide variety of plants, flowers, pottery, and exhibition area.",
    "gallery.info.badge": "Visual Catalog",
    "gallery.info.title": "Facilities & Exhibition",
    "gallery.info.desc": "We work to have an orderly, clean nursery full of inspiring options. Click on any of the images to view them in full screen.",
    "gallery.photo1": "Variety of plants and flowers in the Linda Vista nursery",
    "gallery.photo2": "Shrubs and outdoor plants organized in the facilities",
    "gallery.photo3": "Handcrafted ceramic pottery and outdoor pots",
    "gallery.photo4": "Indoor plants and seasonal flowers",
    "gallery.photo5": "Garden decoration items and glazed pottery",
    "gallery.photo6": "Large selection of green plants and ornamental shrubs",
    "gallery.photo7": "Exhibition of flowering plants in our nursery",
    "gallery.photo8": "High-quality outdoor plants section",

    // Catalog Page & Plant Details
    "catalog.title": "Our Plants and Trees",
    "catalog.desc": "Explore our database with iconic varieties selected especially for the Costa del Sol climate. Learn their scientific names, main characteristics, difficulty levels, light needs, common pests, and exact watering frequencies.",
    "catalog.badge": "Varieties and Care Guide",
    "catalog.adminBtn": "Admin Panel",
    "catalog.search": "Search by common name, scientific name, description...",
    "catalog.filter.cat": "Category",
    "catalog.filter.diff": "Difficulty",
    "catalog.filter.all": "All",
    "catalog.found": "plants found",
    "catalog.found.single": "plant found",
    "catalog.clear": "Clear filters",
    "catalog.empty.title": "No results",
    "catalog.empty.desc": "We could not find any plants matching your search terms or selected filters.",
    "catalog.empty.btn": "Reset filters",
    "catalog.btn.view": "View Full Details",

    // Categories
    "category.Todas": "All",
    "category.Interior": "Indoor",
    "category.Exterior": "Outdoor",
    "category.Suculentas": "Succulents",
    "category.Árboles": "Trees & Shrubs",

    // Difficulties
    "difficulty.Todas": "All",
    "difficulty.Bajo": "Low",
    "difficulty.Medio": "Medium",
    "difficulty.Alto": "High",

    // Plant Details Layout
    "details.difficulty": "Difficulty",
    "details.light": "Light",
    "details.watering": "Watering",
    "details.temperature": "Temperature",
    "details.humidity": "Humidity",
    "details.title.spec": "Technical Datasheet",
    "details.title.features": "Key Characteristics",
    "details.title.care": "Recommended Care",
    "details.title.diseases": "Diseases and Pests",
    "details.title.wateringPlan": "Detailed Watering Plan",
    "details.watering.summer": "Spring - Summer",
    "details.watering.winter": "Autumn - Winter",
    "details.btn.back": "Back to Catalog",
    "details.btn.print": "Print Page",
    "details.funFact": "Fun Fact"
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const savedLang = localStorage.getItem("gclv_lang") as Language;
    if (savedLang === "es" || savedLang === "en") {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "en" || browserLang === "es") {
        setLanguageState(browserLang as Language);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("gclv_lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
