import React from 'react';
import headphone from '../assets/headphones.png';

const Hero = () => {
    return (
        <div className='bg-text h-1/2 w-full flex flex-row justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-white text-4xl font-primary'>100 Thousand Songs, ad-free</h1>
                <h1 className='text-white text-4xl font-primary'> Over thousand podcast episodes</h1>
            </div>
            <div>
                <img src={headphone} alt='hero' />
            </div>
        </div>
    )
}

export default Hero;