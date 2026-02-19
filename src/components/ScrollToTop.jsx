import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to top smoothly on every route change.
 * Drop this once inside your <Routes> or <Layout>.
 */
export function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [pathname])

    return null
}
