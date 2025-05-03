"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"
import { MobileNav } from "@/components/mobile-nav"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  const routes = [
    { href: "/", label: "Inicio" },
    { href: "/editor", label: "Editor" },
    { href: "/plantillas", label: "Plantillas" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <SiteLogo size="sm" />

        {/* Mobile Navigation */}
        <MobileNav />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href && "text-primary font-semibold",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild className="lg:h-10">
            <Link href="/editor">Comenzar Ahora</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
