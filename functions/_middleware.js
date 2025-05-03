// Middleware para Cloudflare Workers
export async function onRequest(context) {
  const response = await context.next()
  const url = new URL(context.request.url)

  // Clonar la respuesta para modificarla
  const newResponse = new Response(response.body, response)

  // Añadir encabezados de seguridad
  newResponse.headers.set("X-Content-Type-Options", "nosniff")
  newResponse.headers.set("X-Frame-Options", "DENY")
  newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Optimizar caché para recursos estáticos
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$/)) {
    newResponse.headers.set("Cache-Control", "public, max-age=31536000, immutable")
  } else {
    // Para HTML y otros recursos dinámicos
    newResponse.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400")
  }

  return newResponse
}
