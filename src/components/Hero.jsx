import React, { useState, useRef } from 'react'

const Hero = () => {

  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState([0]);

  const totalVideos = 3;
  const nextVideoRef = useRef(null);

  // Calcula el índice del próximo video, ciclando entre 1 y el total de videos.
  // El operador % garantiza que el índice se mantenga dentro de los límites del número total de videos,
  // y el +1 ajusta el rango para empezar desde 1 en lugar de 0.
  const upComingVideoIndex = (currentIndex % totalVideos) + 1;  

  const handleMiniVideoPlayer = () => {
    setHasClicked(true);
    setCurrentIndex(upComingVideoIndex);
  }

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  }

  

  

  return (
    <div className='relative h-dvh w-screen overflow-x-hidden'>
      <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
        <div>
          <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
            <div 
              onClick={handleMiniVideoPlayer}
              className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
            >
              <video 
                ref={nextVideoRef}
                src={getVideoSrc(upComingVideoIndex)}
                loop
                muted
                id="current-video"
                className='size-64 origin-center scale-150 object-cover object-center'
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video 
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
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
          />
        </div>
      </div>
    </div>
  )
}

export default Hero