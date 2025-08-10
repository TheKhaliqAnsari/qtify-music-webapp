import React from 'react';
import search from '../../assets/search-icon.svg';

const Input = () => {
    return (
        <div className="relative w-[50%]">
            <input 
                type='text' 
                placeholder='Search a album of your choice' 
                className='bg-background border-2 border-white rounded-md p-2 pr-16 w-full border-1 border-text' 
            />   
            <div className="absolute right-12 top-1/2 transform -translate-y-1/2 w-px h-6 bg-white opacity-60"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 border-l-2 border-text rounded-r-md flex items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-10 transition-colors">
                <img 
                    src={search} 
                    alt='search' 
                    className='w-6 h-6' 
                />
            </div>
        </div>
    )
}

export default Input;