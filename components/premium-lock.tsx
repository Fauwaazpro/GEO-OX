"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PremiumLockProps {
    children: React.ReactNode
    isLocked: boolean
    title?: string
    description?: string
}

export function PremiumLock({
    children,
    isLocked,
    title = "Premium Feature",
    description = "Upgrade to GEO Up Premium to access this advanced tool and more."
}: PremiumLockProps) {
    if (!isLocked) return <>{children}</>

    return (
        <div className="relative group overflow-hidden rounded-xl border border-slate-200">
            {/* Blurred Content */}
            <div className="filter blur-[6px] opacity-40 pointer-events-none select-none" aria-hidden="true">
                {children}
            </div>

            {/* Lock Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] p-6 text-center">
                <div className="p-3 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full mb-4 shadow-sm border border-amber-200">
                    <Lock className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 mb-6 max-w-xs">{description}</p>
                <Link href="/pricing">
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-md border-0">
                        Upgrade to Unlock
                    </Button>
                </Link>
            </div>
        </div>
    )
}
