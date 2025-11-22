import React from 'react'

const Header = () => {
  return (
    <div className='relative h-screen w-full bg-[url("/src/assets/H2.jpg")] bg-cover bg-center bg-no-repeat'>

      {/* Dark gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 to-black/20'></div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-16 lg:px-24 xl:px-32 text-white'>

        {/* Tag */}
        <p className='bg-primary/60 px-4 py-1.5 rounded-full text-sm tracking-wide'>
          PAW & PREFERENCE
        </p>

        {/* Title */}
        <h1 className='font-playfair text-primary text-5xl md:text-5xl md:text-[56px] md:leading-[60px] font-extrabold max-w-2xl mt-6 drop-shadow-lg'>
          Choose Your Favourite Cat
        </h1>

        {/* Description */}
        <p className='max-w-md mt-3 text-sm md:text-base text-white/90'>
          Select one button or swipe to the right if you like the cat,  
          or left if you don’t prefer it.
        </p>
      </div>

    </div>
  )
}

export default Header
