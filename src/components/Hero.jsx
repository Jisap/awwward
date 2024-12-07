import React, { useState, useRef, useEffect } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  const [currentIndex, setCurrentIndex] = useState(1);        // Índice del video actual
  const [hasClicked, setHasClicked] = useState(false);        // Indica si se ha pulsado el botón de reproducción
  const [loading, setLoading] = useState(true);               // Indica si se está cargando el video actual
  const [loadedVideos, setLoadedVideos] = useState([0]);      // Número de videos cargados

  const totalVideos = 4;
  const nextVideoRef = useRef(null);                          // Referencia al siguiente video

  const handleVideoLoad = () => {                             // Función que se ejecuta cuando el video se carga
    setLoadedVideos((prev) => prev + 1);                      // Incrementa el estado que determmina el número de videos cargados (loadedVideos) -> loader
  }

  useEffect(() => {
    if (loadedVideos >= totalVideos) {                        // En el html tenemos 3 videos cargados, si se ha cargado el último video, se desactiva la animación de carga
      setLoading(false);
    }
  }, [loadedVideos]);

  // Calcula el índice del próximo video, ciclando entre 1 y el total de videos.
  // El operador % garantiza que el índice se mantenga dentro de los límites del número total de videos,
  // y el +1 ajusta el rango para empezar desde 1 en lugar de 0.
  const upComingVideoIndex = (currentIndex % totalVideos) + 1;  


  const handleMiniVideoPlayer = () => {                       // Función que se ejecuta cuando se pulsa el botón de play
    setHasClicked(true);
    setCurrentIndex(upComingVideoIndex);                      // y establece el índice del video que se va a reproducir
  }

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`


  useGSAP(() => {                                             // El hook useGSAP se utiliza para definir animaciones cuando cambia currentIndex:

    if(hasClicked){                                           // Si se ha pulsado el boton de play, se ejecuta la animacion de video
      gsap.set("#next-video", { visibility: "visible" });     // El video con ID #next-video se hace visible.
      gsap.to("#next-video", {                                // Una vez visible se escala su tamaño
        transformOrigin: "center center",                     // Define el punto de referencia para la transformación.
        scale: 1,                                             // Escala el video a su tamaño original.
        width: "100%",                                        // Aseguramos que el video ocupe todo el ancho y alto del contenedor.
        height: "100%",
        duration: 1,                                          // La animación dura 1 segundo.
        ease: "power1.inOut",                                 // La curva de "power1.inOut" hace que la animación comience lenta, acelere en el medio y desacelere al final.
        onStart: () => nextVideoRef.current.play(),           // Tan pronto como comienza la animación, se llama a esta función, iniciando la reproducción del video al que hace referencia nextVideoRef. 
      })
      gsap.from("#current-video", {                           // Una vez que el video se ha escalado, el video anteriorse hace invisible.
        transformOrigin: "center center",                     // desde el centro del contenedor
        scale: 0,                                             // se le da un tamaño de cero
        duration: 1.5,
        ease: "power1.inOut",
      })
    }

  },{dependencies:[currentIndex], revertOnUpdate: true})

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",                    // Este es el poligono final que se obtiene al hacer scroll
      borderRadius: "0% 0% 40% 10%",
    })
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",              // Este es el poligono inicial desde el que parte la animacón, un cuadrado de 100x100
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",                                             // la animación se inicia desde el centro del container
        end: "bottom center",                                               // y termina cuando el video llega al final del contenedor
        scrub: true,
      },
    });
  })

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      
      <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
        <div>
          <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
            <div 
              onClick={handleMiniVideoPlayer}
              className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
            >
              <video 
                id="current-video"
                ref={nextVideoRef}
                src={getVideoSrc(upComingVideoIndex)}
                loop
                muted
                className='size-64 origin-center scale-150 object-cover object-center'
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video 
            id="next-video"
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
            onLoadedData={handleVideoLoad}
          />

          <video 
            src={getVideoSrc(
              currentIndex === totalVideos - 1 
                ? 1 
                : currentIndex
            )}
            autoPlay
            loop
            muted
            className='absolute lef-0 top-0 size-full object-cover object-center'
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
          G<b>a</b>ming
        </h1>

        <div className='absolute left-0 top-0 z-40 size-full'>
          <div className='mt-24 px-5 sm:px-10'>
            <h1 className='special-font hero-heading text-blue-100'>
              redefi<b>n</b>e
            </h1>
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            /> 
          </div>
        </div>
      </div>

      <h1 className='special-font hero-heading absolute bottom-5 right-5  text-black'>
        G<b>a</b>ming
      </h1>
    </div>
  )
}

export default Hero