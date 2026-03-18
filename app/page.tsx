import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 font-sans">
      <main className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Invitation Templates
        </h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              Available Routes
            </h2>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/invitation/123/wedding/classic-wedding" 
                  className="text-blue-600 hover:underline"
                >
                  /invitation/[id]/[category]/[templateName]
                </Link>
                <p className="text-sm text-gray-500">
                  View an invitation with specific category and template
                </p>
              </li>
              <li>
                <Link 
                  href="/preview/wedding/classic-wedding" 
                  className="text-blue-600 hover:underline"
                >
                  /preview/[...slug]
                </Link>
                <p className="text-sm text-gray-500">
                  Preview mode - view templates without invitation data
                </p>
              </li>
              <li>
                <Link 
                  href="/public/123" 
                  className="text-blue-600 hover:underline"
                >
                  /public/[id]
                </Link>
                <p className="text-sm text-gray-500">
                  Public invitation view
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              Available Templates
            </h2>
            <ul className="space-y-2">
              <li className="font-medium">Wedding</li>
              <ul className="ml-4 list-inside list-disc space-y-1 text-gray-600">
                <li>Classic Wedding</li>
                <li>Modern Wedding</li>
                <li>Culture Wedding</li>
                <li>Botanical Garden</li>
                <li>Legante</li>
              </ul>
              <li className="font-medium">Birthday</li>
              <ul className="ml-4 list-inside list-disc space-y-1 text-gray-600">
                <li>Birthday Celebration</li>
              </ul>
              <li className="font-medium">Holi</li>
              <ul className="ml-4 list-inside list-disc space-y-1 text-gray-600">
                <li>Splash & Play</li>
                <li>Retro Bollywood</li>
              </ul>
              <li className="font-medium">Birthday Wish</li>
              <ul className="ml-4 list-inside list-disc space-y-1 text-gray-600">
                <li>Surprise Birthday Card</li>
              </ul>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-700">
              Environment Variables
            </h2>
            <p className="text-gray-600">
              Set <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_API_URL</code> in your environment 
              to connect to your API server.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
