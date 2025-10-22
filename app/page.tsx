'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { ChordBuilderRef } from '../components/chord/ChordBuilder'

const ChordBuilder = dynamic(() => import('../components/chord/ChordBuilder'), { ssr: false })

export default function Page() {
  const chordBuilderRef = useRef<ChordBuilderRef>(null)

  const handleExport = async () => {
    await chordBuilderRef.current?.exportChord()
  }

  return (
    <main className="min-h-screen p-10">
      <header className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Monte seu Acorde</h1>
            <p className="text-gray-600 mt-2">Crie, edite e exporte diagramas de acordes visualmente.</p>
          </div>
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Exportar PNG
          </button>
        </div>
      </header>

      <section className="max-w-4xl mx-auto">
        <ChordBuilder ref={chordBuilderRef} />
      </section>

      <footer className="max-w-4xl mx-auto mt-12 text-sm text-gray-500">
        Desenvolvido com ❤️ · Next.js + TailwindCSS
      </footer>
    </main>
  )
}
