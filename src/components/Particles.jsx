import { useEffect } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

function ParticlesBackground() {
    
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        });
    }, []);

    return (
        <Particles
            id="tsparticles"
            options={{
                background: {
                    color: {
                        value: "#000000ff",
                    },
                },
                fpsLimit: 60,
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 6,
                    },
                    number: {
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
}

export default ParticlesBackground;