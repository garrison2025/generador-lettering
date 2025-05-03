export function SchemaMarkup() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Generador de Lettering",
    url: "https://generadordelettering.org",
    description: "Herramienta online para crear lettering personalizado y diseños tipográficos",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://generadordelettering.org/plantillas?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    inLanguage: "es-ES",
    datePublished: "2023-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    logo: "https://generadordelettering.org/logo-dark.png",
  }

  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Generador de Lettering",
    description: "Herramienta online para crear lettering personalizado y diseños tipográficos",
    url: "https://generadordelettering.org",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Organization",
      name: "Generador de Lettering",
      url: "https://generadordelettering.org",
      logo: "https://generadordelettering.org/logo-dark.png",
    },
    screenshot: "https://generadordelettering.org/og-image.png",
    softwareVersion: "1.0.0",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
      bestRating: "5",
      worstRating: "1",
    },
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Generador de Lettering",
    url: "https://generadordelettering.org",
    logo: "https://generadordelettering.org/logo-dark.png",
    sameAs: [
      "https://twitter.com/generadorlettering",
      "https://facebook.com/generadorlettering",
      "https://instagram.com/generadorlettering",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@generadordelettering.org",
      availableLanguage: "Spanish",
    },
  }

  // Esquema de FAQPage para la sección de preguntas frecuentes
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es el lettering y en qué se diferencia de la caligrafía?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El lettering es el arte de dibujar letras, mientras que la caligrafía es el arte de escribirlas. Nuestro generador de lettering te permite crear diseños tipográficos únicos sin necesidad de habilidades avanzadas de dibujo o caligrafía.",
        },
      },
      {
        "@type": "Question",
        name: "¿Necesito crear una cuenta para usar el generador?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, nuestro generador de lettering es de uso libre y no requiere registro. Puedes comenzar a crear diseños inmediatamente.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo usar los diseños creados para fines comerciales?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, todos los diseños que crees con nuestra herramienta son de tu propiedad y puedes utilizarlos tanto para proyectos personales como comerciales.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo puedo guardar mis diseños para editarlos más tarde?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Actualmente, la función de guardar diseños está en desarrollo. Por ahora, te recomendamos exportar tus diseños y guardarlos localmente.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué navegadores son compatibles con el generador?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nuestro generador funciona en todos los navegadores modernos como Chrome, Firefox, Safari y Edge. Recomendamos mantener tu navegador actualizado para una mejor experiencia.",
        },
      },
    ],
  }

  // Esquema HowTo para el uso del editor
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo usar el Generador de Lettering",
    description: "Guía paso a paso para crear diseños de lettering personalizados con nuestra herramienta online.",
    totalTime: "PT5M",
    tool: {
      "@type": "HowToTool",
      name: "Navegador web moderno (Chrome, Firefox, Safari o Edge)",
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Elige una plantilla o comienza desde cero",
        text: "Selecciona una de nuestras plantillas prediseñadas o comienza con tu propio texto personalizado.",
        url: "https://generadordelettering.org/editor",
        image: "https://generadordelettering.org/images/paso1.jpg",
      },
      {
        "@type": "HowToStep",
        name: "Personaliza tu texto",
        text: "Modifica el estilo de letra, tamaño, color y alineación según tus preferencias.",
        url: "https://generadordelettering.org/editor",
        image: "https://generadordelettering.org/images/paso2.jpg",
      },
      {
        "@type": "HowToStep",
        name: "Añade efectos especiales",
        text: "Aplica sombras, contornos o rotación para dar un toque único a tu diseño.",
        url: "https://generadordelettering.org/editor",
        image: "https://generadordelettering.org/images/paso3.jpg",
      },
      {
        "@type": "HowToStep",
        name: "Exporta tu creación",
        text: "Descarga tu diseño en formato PNG o JPG para usarlo en tus proyectos.",
        url: "https://generadordelettering.org/editor",
        image: "https://generadordelettering.org/images/paso4.jpg",
      },
    ],
  }

  // Esquema para las categorías de plantillas
  const plantillasCategoriaSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Categorías de Plantillas de Lettering",
    description: "Explora nuestras diferentes categorías de plantillas de lettering para diversas ocasiones y estilos.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ocasiones Especiales",
        url: "https://generadordelettering.org/plantillas/categoria/ocasiones",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Frases Inspiradoras",
        url: "https://generadordelettering.org/plantillas/categoria/frases",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Festividades",
        url: "https://generadordelettering.org/plantillas/categoria/festividades",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Negocios",
        url: "https://generadordelettering.org/plantillas/categoria/negocios",
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(applicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(plantillasCategoriaSchema),
        }}
      />
    </>
  )
}
