import { ClinicalCursor } from './ClinicalCursor'

export const AuroraBackground = ({ children }) => {
    return (
        <div className="relative min-h-screen w-full bg-paper text-ink overflow-hidden selection:bg-accent/30">
            <ClinicalCursor />
            {/* Background Container */}
            <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
                {/* Subtle static orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/5 blur-[120px] rounded-full" />

                {/* Swiss Noise Grain - Subtle but layered */}
                <div className="absolute inset-0 bg-noise opacity-[0.08] mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-noise opacity-[0.02] mix-blend-soft-light"></div>

                {/* Swiss Grid Lines - Stationary Blueprint Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:8rem_8rem] pointer-events-none"></div>

                {/* Secondary Finer Grid for coordinate feel */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>

                {/* Scanlines Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none opacity-5"></div>
            </div>

            <div className="relative z-10 w-full">
                {children}
            </div>
        </div>
    )
}
