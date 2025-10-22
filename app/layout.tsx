import '../styles/globals.css'
export const metadata = {
  title: 'MontAcorde',
  description: 'Construtor visual de acordes de violão'
}

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
