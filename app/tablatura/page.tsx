'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { TablatureBuilderRef } from '../../components/tablature/TablatureBuilder'
import Link from 'next/link'

const TablatureBuilder = dynamic(() => import('../../components/tablature/TablatureBuilder'), { ssr: false })

export default function TablaturePage() {
  const tablatureBuilderRef = useRef<TablatureBuilderRef>(null)
  const [showHelp, setShowHelp] = useState(false)

  const handleExport = async () => {
    await tablatureBuilderRef.current?.exportTablature()
  }

  return (
    <main className="min-h-screen p-10">
      <header className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Monte sua Tablatura</h1>
            <p className="text-gray-600 mt-2">Crie e edite tablaturas de violão visualmente.</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              ← Acordes
            </Link>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              title="Mostrar/ocultar ajuda"
            >
              {showHelp ? '✕ Fechar' : '❓ Ajuda'}
            </button>
            <button
              onClick={handleExport}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              title="Exportar tablatura como PNG"
            >
              📥 Exportar PNG
            </button>
          </div>
        </div>

        {showHelp && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Como usar</h2>
            
            <div className="space-y-4 text-sm text-blue-900">
              <div>
                <h3 className="font-semibold mb-2">🎸 Tablaturas:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Clique na tablatura para adicionar notas</li>
                  <li>Escolha o tipo: Número da casa ou Indicador de dedo (P, I, M, A)</li>
                  <li>Use os controles laterais para selecionar o tipo de marcação</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">✍️ Dedos:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>P:</strong> Polegar</li>
                  <li><strong>I:</strong> Indicador</li>
                  <li><strong>M:</strong> Médio</li>
                  <li><strong>A:</strong> Anelar</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="max-w-6xl mx-auto">
        <TablatureBuilder ref={tablatureBuilderRef} />
      </section>

      <footer className="max-w-4xl mx-auto mt-12 text-sm text-gray-500">
        Desenvolvido com ❤️ · Next.js + TailwindCSS
      </footer>
    </main>
  )
}

