import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'

const AnimatedTitle = ({ title, containerClass }) => {

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {                                               // Se crea un contexto para la animación
      const titleAnimation = gsap.timeline({
        scrollTrigger: {                                                           // Con ScrollTrigger se sincroniza la animación con el desplazamiento del usuario
          trigger: containerRef.current,                                           // Elemento que activa el ScrollTrigger
          start: "100 bottom",                                                     // Punto de inicio de la animación: Comienza cuando el contenedor está a 100px de la parte inferior
          end: "center bottom",                                                    // Punto de finalización:Termina cuando el centro del contenedor alcanza la parte inferior
          toggleActions: "play none none reverse",                                 // Configura qué sucede en diferentes estados: play: empieza la animación, none: no hace nada, reverse: invierte la animación
        }
      });

      titleAnimation.to(".animated-word", {                                        // Esta animación cambia las propiedades de los elementos .animated-word a lo largo del scroll
        opacity: 1,                                                                // opacity: Las palabras aparecen progresivamente.
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",           // transform: Se aplica una transformación 3D 
        ease: "power2.inOut",                                                      // ease: La curva de animación suaviza la transición. 
        stagger: 0.02,                                                             // stagger: Las palabras aparecen con un retraso escalonado de 0.02 segundos entre sí.
      },0)
    }, containerRef);

    return () => ctx.revert();  // Cuando el componente se desmonta, el contexto GSAP se revierte, eliminando animaciones y eventos asociados para evitar fugas de memoria.
  },[])

  return (
    <div
      ref={containerRef}
      className={`animated-title ${containerClass}`}
    >
      {/* El texto (title) se divide por líneas (<br />) y luego por palabras (" "). */}
      {title.split("<br />").map((line, index) => (
        <div key={index} className='flex-center max-w-full flex-wraps gap-2 px-10 md:gap-3'>
          {line.split(" ").map((word, i) => (
            // Cada palabra es envuelta en un span con la clase animated-word. Esto permite animar cada palabra individualmente.
            <span 
              key={i}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}  
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default AnimatedTitle