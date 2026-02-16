import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from './NavBar'
import { Footer } from './Sections'
import { AuroraBackground } from './ui/AuroraBackground'

export default function Layout() {
  return (
    <AuroraBackground>
      <div className="relative z-10 flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuroraBackground>
  )
}
