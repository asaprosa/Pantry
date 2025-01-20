import React from 'react'
import { Navbar } from '../components/navbar'
import { Header } from '../components/Header'
import { ThemeProvider } from '../components/theme-provider'
import '../app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid h-screen w-full pl-[56px]">
            <Navbar />
            <div className="flex flex-col">
              <Header />
              <main>{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
