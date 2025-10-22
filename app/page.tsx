'use client'

import dynamic from 'next/dynamic'

const ChordBuilder = dynamic(() => import('../components/ChordBuilder'), { ssr: false })

export default function Page() {
  return (
    <main className="min-h-screen p-10">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold">Monte seu Acorde</h1>
        <p className="text-gray-600 mt-2">Crie, edite e exporte diagramas de acordes visualmente.</p>
      </header>

      <section className="max-w-4xl mx-auto">
        <ChordBuilder />
      </section>

      <footer className="max-w-4xl mx-auto mt-12 text-sm text-gray-500">
        Desenvolvido com ❤️ · Next.js + TailwindCSS
      </footer>
    </main>
  )
}
