"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreadcrumbsProps {
  items: {
    label: string
    href: string
  }[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  // Asegurarse de que siempre hay un elemento de inicio
  const breadcrumbItems = items[0]?.label === "Inicio" ? items : [{ label: "Inicio", href: "/" }, ...items]

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex flex-wrap items-center text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbItems.map((item, index) => (
          <li
            key={item.href}
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-muted-foreground" />}

            {index === 0 && <Home className="mr-1 h-3.5 w-3.5" />}

            {index === breadcrumbItems.length - 1 ? (
              <span className="font-medium text-primary" itemProp="name">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            )}
            <meta itemProp="position" content={String(index + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  )
}
