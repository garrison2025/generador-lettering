"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SiteLogo } from "@/components/site-logo"
import Link from "next/link"
import { Menu, X, Home, PencilLine, BookOpen, Info, Mail, Shield } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Inicio", icon: <Home className="h-5 w-5 mr-2" /> },
    { href: "/editor", label: "Editor", icon: <PencilLine className="h-5 w-5 mr-2" /> },
    { href: "/plantillas", label: "Plantillas", icon: <BookOpen className="h-5 w-5 mr-2" /> },
    { href: "/acerca", label: "Acerca", icon: <Info className="h-5 w-5 mr-2" /> },
    { href: "/contacto", label: "Contacto", icon: <Mail className="h-5 w-5 mr-2" /> },
    { href: "/privacidad", label: "Privacidad", icon: <Shield className="h-5 w-5 mr-2" /> },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between py-4 border-b">
            <SiteLogo size="sm" showText={false} />
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Cerrar menú</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-6">
            <nav className="flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-md transition-colors hover:bg-gray-100",
                    pathname === route.href ? "bg-primary/10 text-primary font-medium" : "text-gray-600",
                  )}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t py-4">
            <Button asChild className="w-full" onClick={() => setOpen(false)}>
              <Link href="/editor">Crear Lettering</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
