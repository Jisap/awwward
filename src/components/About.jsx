import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger); // Se registra el plugin ScrollTrigger, que permite sincronizar animaciones con el desplazamiento del usuario.

const About = () => {

  useGSAP(() => {                                 // Define la animaciones
    const clipAnimation = gsap.timeline({         // Dentro de la animación se crea un timeline
      scrollTrigger: {                            // con una configuración de ScrollTrigger
        trigger: "#clip",                         // El elemento que activa el ScrollTrigger
        start: "center center",                   // El punto de inicio de la animación
        end: "+=800 center",                      // El punto de finalización (800px después)
        scrub: 0.5,                               // Sincroniza la animación con el desplazamiento (0.5 es la suavidad del efecto)
        pin: true,                                // Fija el elemento en su lugar durante la animación. El elemento no se mueve junto con el resto de la página durante un periodo específico del desplazamiento (la duración del ScrollTrigger).
        pinSpacing: true,                         // Mantiene el espacio para el elemento fijo
      }
    })

    clipAnimation.to(".mask-clip-path", {         // Esta animación cambia las propiedades del elemento .mask-clip-path a lo largo del scroll
      width: "100vw",                             // width y height: Se expanden para ocupar todo el ancho (100vw) y alto (100vh) de la pantalla.
      height: "100vh",
      borderRadius: 0                             // borderRadius: Se reduce a 0 para eliminar cualquier curva.
    })
  })

  return (
    <div  id="about" className='min-h-screen w-screen'>
      <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
        <h2 className='font-general text-sm uppercase md:text-[10px]'>
          Welcome to Zentry
        </h2>
        <AnimatedTitle 
          title="Disc<b>o</b>ver the world&apos;s <br /> l<b>a</b>rgest shared adventure"
          containerClass="mt-5 !text-black text-center"
        />
        <div className='about-subtext'>
          <p>
            The Game of Games begins-your life, now an epic MMORPG
          </p>
          <p>
            Zentry unites every player from countless games and platforms
          </p>
        </div>
      </div>

      {/* La animación afecta a un elemento con el ID clip y su hijo .mask-clip-path. */}
      <div className='h-dvh w-screen' id="clip">
        <div className='mask-clip-path about-image'>
          <img 
            src="img/about.webp"
            alt="background"
            className='absolute left-0 top-0 size-full object-cover'
          />
        </div>
      </div>

    </div>
  )
}

export default About