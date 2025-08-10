import react from 'react';
import Logo from './atoms/Logo';
import Input from './atoms/Input';
import Feedback from './atoms/Feedback';

const Navbar = () => {
    return (
        <div className='bg-primary flex justify-between items-center p-4'>    
        <Logo />
        <Input />
        <Feedback />
        </div>
    )
}

export default Navbar;