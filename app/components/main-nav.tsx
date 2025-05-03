import Link from "next/link"
import { PencilLine, BookOpen, Home } from "lucide-react"

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
        <Home className="h-4 w-4" />
        <span>Inicio</span>
      </Link>
      <Link href="/editor" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
        <PencilLine className="h-4 w-4" />
        <span>Editor</span>
      </Link>
      <Link
        href="/plantillas"
        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
      >
        <BookOpen className="h-4 w-4" />
        <span>Plantillas</span>
      </Link>
    </nav>
  )
}
