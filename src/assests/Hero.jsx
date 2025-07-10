import React from 'react'

const Hero = () => {

  return (
    <div className="relative overflow-hidden bg-white mt-5 lg:mt-20">
    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-20 lg:pt-22">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div className="sm:max-w-lg">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Summer styles are finally here
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn't care if you live or die.
          </p>
        </div>
        <div>
          <div className="mt-10">
            {/* Decorative image grid */}
   
            <button
              className="bg-gradient-to-r from-purple-500 to-pink-500 inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 "
            >
              Shop Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  

  )
}

export default Hero