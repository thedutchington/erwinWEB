import { ClinicalCursor } from './ClinicalCursor'

export const AuroraBackground = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full bg-[#0F172A] text-white overflow-hidden selection:bg-gold/30">
            <ClinicalCursor />
            {/* Background Container */}
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                {/* Deep Scholarly Gradients */}
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#0F172A] blur-[120px] rounded-full mix-blend-multiply" />
                <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-gold/5 blur-[150px] rounded-full opacity-40 animate-pulse" />
                <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] bg-slate-900/40 blur-[100px] rounded-full" />

                {/* Swiss Noise Grain - Standardized */}
                <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>

                {/* Architectural Grid - Gold Tinted */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#F59E0B05_1px,transparent_1px),linear-gradient(to_bottom,#F59E0B05_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none masking-gradient"></div>

                {/* Secondary Precision Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"></div>

                {/* Vignette for cinematic focus */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0F172A_100%)] opacity-80"></div>
            </div>

            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    )
}
