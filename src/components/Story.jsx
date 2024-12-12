import gsap from "gsap";
import React, { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'
import Button from "./Button";
import RoundedCorners from "./RoundedCorners";

const Story = () => {

  const frameRef = useRef(null);

  const handleMouseMove = (e) => {                                            // Activa una animación cuando el cursor se mueve sobre la imagen.

    const { clientX, clientY } = e;                                           // Obtiene las coordenadas del cursor respecto al área visible de la imagen (clientX y clientY).
    const element = frameRef.current;                                         // Obtiene el elemento que se muestra en la imagen.

    if (!element) return;

    const rect = element.getBoundingClientRect();                             // Obtiene la posición y el tamaño del elemento en la ventana.
    const xPos = clientX - rect.left;                                         // Calcula las posiciones relativas del cursor (xPos y yPos) dentro del elemento 
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;                                           // y su distancia al centro de la imagen (centerX y centerY).
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;                       // Calcula la rotación del elemento en X y Y.
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {                                                        // Usa GSAP para animar la rotación del elemento.
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  }
 
  const handleMouseLeave = () => {                                            // Desactiva la animación cuando el cursor se deja de mover sobre la imagen.
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,                                                           // Para ello regresa a rotateX: 0 y rotateY: 0.
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  }

  return (
    <section 
      id="story" 
      className="min-h-dvh w-screen bg-black text-blue-50"
    >
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>

        <div className="relative size-full">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img 
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/entrance.webp"
                  alt="entrance.webp"
                  className="object-contain"
                />
              </div>
            </div>

            <RoundedCorners />
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story