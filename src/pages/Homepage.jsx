import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger);
const Homepage = () => {
  const navigate = useNavigate()
  useEffect(() => {
  
    const tl = gsap.timeline();


    tl.fromTo(
      ".title1",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    ).fromTo(
      ".title2",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.8" // starts 0.5s before the first animation ends
    ).fromTo(
      ".paragraph",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.8" // starts 0.5s before the first animation ends
    ).fromTo(
      ".buttonn",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out",stagger: 3},
      "-=0.9" // starts 0.5s before the first animation ends
    ).fromTo(
      ".cards",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out",stagger: 3},
      "-=0.8" // starts 0.5s before the first animation ends
    ).fromTo(
      ".whpart",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out",stagger: 3},
      "-=0.8" // starts 0.5s before the first animation ends
    );
  
      gsap.fromTo(
  ".spart .grid > div",
  { opacity: 0, y: 100 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".spart",
      start: "top 90%",
      toggleActions: "play none none none", 
      // "play pause resume reset" options: we only play once here
    },
  }
);


    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto ">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="title1 block ">Smart Transport</span>
              <span className="title2 py-2 block bg-gradient-to-r bg-[#50c878] bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
           

            <p className="text-xl text-gray-600/90 mb-8 leading-relaxed paragraph">
              Experience the future of public transportation with real-time tracking,
              smart ticketing, and AI-powered route optimization.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center buttonn">
              <button
                onClick={() => navigate('/tracker')}
                className="bg-[#faab4aee]  text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#faac4a] transition-all transform hover:scale-105"
              >
                Track Bus Now
              </button>
              <button
                onClick={() => navigate('/booking')}
                className="bg-blue-200  text-[#3c68b0]  px-8 py-4 rounded-lg hover:text-white text-lg font-semibold hover:bg-blue-400 transition-all hover:scale-105"
              >
                Book Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-4 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto cards  ">
            <div className="text-center bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-gray-800 mb-2">50+</div>
              <div className="text-gray-600/80">Active Routes</div>
            </div>
            <div className="text-center bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-gray-800 mb-2">10K+</div>
              <div className="text-gray-600/80">Daily Passengers</div>
            </div>
            <div className="text-center bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl font-bold text-gray-800 mb-2">95%</div>
              <div className="text-gray-600/80">On-Time Performance</div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
       <div className="container mx-auto px-4 mt-16 spart">
      <div className="text-center mb-12 whpart">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 ">Why Choose Marg-AI?</h2>
        <p className="text-gray-600/80 max-w-2xl mx-auto">
          Advanced technology meets everyday convenience to transform your commute
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
          <div className="text-4xl mb-4">📍</div>
          <h3 className="text-gray-800 font-semibold mb-2">Live Tracking</h3>
          <p className="text-gray-600/70 text-sm">Real-time bus locations</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-gray-800 font-semibold mb-2">Digital Tickets</h3>
          <p className="text-gray-600/70 text-sm">Contactless payments</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
          <div className="text-4xl mb-4">🚨</div>
          <h3 className="text-gray-800 font-semibold mb-2">Safety First</h3>
          <p className="text-gray-600/70 text-sm">Emergency alerts & monitoring</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg text-center hover:shadow-xl transition-shadow duration-300">
          <div className="text-4xl mb-4">🌐</div>
          <h3 className="text-gray-800 font-semibold mb-2">Multi-Language</h3>
          <p className="text-gray-600/70 text-sm">English, Hindi, Bengali</p>
        </div>
      </div>
    </div>
  );
      </div>
    </div>
  )
}

export default Homepage