import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react"; // 导入需要的图标

export function CtaSection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Listo para crear tu lettering personalizado?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-10 text-white/80">
          Comienza a diseñar textos únicos, letras decoradas y tipografías creativas para tus proyectos, redes
          sociales o cualquier ocasión especial.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/editor" className="gap-2">
            <Sparkles className="h-5 w-5" />
            Ir al Editor de Lettering
          </Link>
        </Button>
      </div>
    </section>
  );
}
