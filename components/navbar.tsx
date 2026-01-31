"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export function Navbar() {
    return (
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                        <Shield className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-xl text-slate-900 tracking-tight">GEO <span className="text-blue-600">Ox</span></span>
                </Link>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="#tools" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Tools
                    </Link>
                    <Link href="#pricing" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Pricing
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        About
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/login">
                        <Button variant="ghost" className="font-medium">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button className="font-medium bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
