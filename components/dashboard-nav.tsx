"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, Settings, LayoutDashboard, LogOut } from "lucide-react"

export function DashboardNav() {
    const pathname = usePathname()

    return (
        <header className="border-b bg-white shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center space-x-2">
                    <div className="bg-gradient-primary p-1.5 rounded-lg text-white">
                        <Shield className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl text-slate-900 tracking-tight">GEO <span className="text-blue-600">Ox</span></span>
                </Link>

                <nav className="flex items-center space-x-2">
                    <Link href="/dashboard">
                        <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} size="sm" className="gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            <span className="hidden sm:inline">Tools</span>
                        </Button>
                    </Link>
                    <Link href="/dashboard/account">
                        <Button variant={pathname === "/dashboard/account" ? "secondary" : "ghost"} size="sm" className="gap-2">
                            <Settings className="h-4 w-4" />
                            <span className="hidden sm:inline">Account</span>
                        </Button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
