import Head from "next/head"

interface MetaTagsProps {
  title?: string
  description?: string
  keywords?: string
  url?: string
  image?: string
  type?: string
  locale?: string
  twitterCard?: string
  canonicalUrl?: string
}

export function MetaTags({
  title = "Generador de Lettering - Crea diseños tipográficos únicos y letras personalizadas",
  description = "Crea y personaliza textos con diversos estilos caligráficos y tipográficos. Diseña lettering artístico, letras personalizadas y textos bonitos para tus proyectos de forma fácil y gratuita.",
  keywords = "generador de lettering, letras personalizadas, lettering online, caligrafia online, diseño de letras, tipografia creativa, letras decoradas, plantillas de lettering, abecedario para imprimir, creador de lettering, lettering digital, lettering frases, textos bonitos, tipografia para carteles",
  url = "https://generadordelettering.org",
  image = "https://generadordelettering.org/og-image.png",
  type = "website",
  locale = "es_ES",
  twitterCard = "summary_large_image",
  canonicalUrl,
}: MetaTagsProps) {
  const fullUrl = url.startsWith("http") ? url : `https://generadordelettering.org${url}`
  const fullImage = image.startsWith("http") ? image : `https://generadordelettering.org${image}`
  const canonical = canonicalUrl || fullUrl

  return (
    <Head>
      {/* Essential Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Generador de Lettering" />
      <meta property="og:locale" content={locale} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#5B4FBE" />

      {/* Icons - Add or update these files in your public directory */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect to Cloudflare */}
      <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
    </Head>
  )
}
