import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-slate-900">Page Not Found</h2>
            <p className="mt-2 text-lg text-slate-600">Could not find requested resource</p>
            <div className="mt-6">
                <Link href="/" className="text-blue-600 hover:text-blue-500 font-medium">
                    Return Home
                </Link>
            </div>
        </div>
    )
}
