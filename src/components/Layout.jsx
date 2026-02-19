import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Footer } from './Sections'
import { AuroraBackground } from './ui/AuroraBackground'
import { ScrollToTop } from './ScrollToTop'
import { PageTransition } from './ui/PageTransition'

export default function Layout() {
  return (
    <AuroraBackground>
      <ScrollToTop />
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        <Footer />
      </div>
    </AuroraBackground>
  )
}
