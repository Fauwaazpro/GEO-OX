import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ToolBenefits() {
    return (
        <section className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                        <div className="space-y-2">
                            <h3 className="font-bold">Real-Time Analysis</h3>
                            <p className="text-sm text-muted-foreground">
                                Analyze content against live search results from Google, Bing, and Perplexity.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                        <div className="space-y-2">
                            <h3 className="font-bold">AI Optimization</h3>
                            <p className="text-sm text-muted-foreground">
                                Get recommendations tailored for LLMs like ChatGPT, Claude, and Gemini.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                    <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                        <div className="space-y-2">
                            <h3 className="font-bold">Comprehensive Reports</h3>
                            <p className="text-sm text-muted-foreground">
                                Detailed insights into technical SEO, content authority, and mobile readiness.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto text-center md:max-w-[58rem]">
                <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                    GEO-OX provides the tools you need to dominate the new era of search.
                </p>
            </div>
        </section>
    )
}