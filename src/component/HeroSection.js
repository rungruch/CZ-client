// HeroSection.js
import React, { useState, useEffect } from 'react';
import { useLocation,Link } from 'react-router-dom';
// import tempvdo from '../../assets/hero1.mp4'
// //const VideoPlayer = lazy(() => import('./VideoPlayer'));
// import VideoPlayer from '../../component/VideoPlayer';

const HeroSection = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([]);
  

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const heroSlides = await heroLoader();
        setSlides(heroSlides);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <section className={`${location.pathname === '/' ? 'main-hero-section' : 'hero-section'}`}>
      <div className='hero-slide'>
        {/* <Suspense fallback={<video src={tempvdo}>Loading...</video>}>
          <VideoPlayer url = {slides[current].videoUrl}  />
        </Suspense> */}
        <div className='hero-content'>
          <h1>{slides[current].title}</h1>
          <p>{slides[current].subTitle}</p>
          <Link to='/buy'>
          <button>Buy Tickets</button> 
          </Link>
        </div>
        <div className='dots'>
          {slides.map((slide, index) => (
            <span
              key={index}
              className={current === index ? 'dot active' : 'dot'}
              onClick={() => goToSlide(index)}
            ></span>
          ))}
        </div>
        <img src={slides[current].picUrl } alt='slideimg'/>
      </div>
    </section>
  );
};

export default HeroSection;


export const heroLoader = async () => {
	// const res = await getProducts();
	const res = await fetch('/api/hero_slides')
	if (!res.ok) {
		throw Error('Could not fetch the products')
	}
	return res.json()
}