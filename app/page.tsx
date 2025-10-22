'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { ChordBuilderRef } from '../components/builder/ChordBuilder'

const ChordBuilder = dynamic(() => import('../components/builder/ChordBuilder'), { ssr: false })

export default function Page() {
  const chordBuilderRef = useRef<ChordBuilderRef>(null)
  const [showHelp, setShowHelp] = useState(false)

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
          <div className="flex gap-2">
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
              title="Exportar diagrama como PNG"
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
                <h3 className="font-semibold mb-2">🖱️ Interação com o Fretboard:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Clique no fretboard para adicionar/remover dots</li>
                  <li>Passe o mouse para ver preview do dot antes de clicar</li>
                  <li>Clique na parte superior (acima das casas) para adicionar marcações (corda solta/abafada)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">⌨️ Atalhos de Teclado:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><kbd className="px-2 py-1 bg-white rounded border">1</kbd>, <kbd className="px-2 py-1 bg-white rounded border">2</kbd>, <kbd className="px-2 py-1 bg-white rounded border">3</kbd>, <kbd className="px-2 py-1 bg-white rounded border">4</kbd> - Selecionar dedo (Indicador, Médio, Anelar, Mínimo)</li>
                  <li><kbd className="px-2 py-1 bg-white rounded border">Ctrl</kbd> + <kbd className="px-2 py-1 bg-white rounded border">Delete</kbd> ou <kbd className="px-2 py-1 bg-white rounded border">⌘</kbd> + <kbd className="px-2 py-1 bg-white rounded border">Backspace</kbd> - Limpar tudo</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">🎸 Controles:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Dedos:</strong> Selecione qual dedo (1-4) será usado ao clicar no fretboard</li>
                  <li><strong>Capotraste:</strong> Adicione um capotraste e escolha em qual casa</li>
                  <li><strong>Pestana:</strong> Adicione uma pestana (barre) definindo corda inicial e casa</li>
                  <li><strong>Limpar Tudo:</strong> Remove todos os dots e reseta o diagrama</li>
                </ul>
              </div>
            </div>
          </div>
        )}
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
