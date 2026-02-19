import { GrainBackground } from './GrainBackground'

export const AuroraBackground = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full bg-[#0A0A0A] text-white overflow-hidden selection:bg-gold/30">
            <GrainBackground />
            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    )
}
