import React from 'react'
import {
  Hero,
  BentoGrid,
  Timeline,
  Services,
  Testimonials,
  FAQ
} from '../components/Sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <section className="px-6 py-20 text-center">
        <p className="font-display text-2xl md:text-3xl text-white/80 mb-8 max-w-3xl mx-auto italic font-light leading-relaxed">
          "Leadership is about making others better as a result of your presence and making sure that impact lasts in your absence."
        </p>
      </section>
      <Timeline />
      <Services />
      <Testimonials />
      <FAQ />
    </>
  )
}
