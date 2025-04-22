"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Layers,
  AppWindow,
  MessageSquare,
  BarChart2,
  Shield,
  Settings,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/transactions", label: "Transactions", icon: CreditCard },
  { href: "/admin/modules", label: "Modules", icon: Layers },
  { href: "/admin/apps", label: "Applications", icon: AppWindow },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/analytics", label: "Analytiques", icon: BarChart2 },
  { href: "/admin/security", label: "Sécurité", icon: Shield },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="rounded-md bg-blue-600 p-1.5">
            <span className="text-xl font-bold text-white">RP</span>
          </div>
          <span className="text-xl font-bold">RestoPilote</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive ? "bg-blue-50 text-blue-700" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <div className="text-xs text-gray-500">RestoPilote Admin v1.0</div>
      </div>
    </div>
  )
}
