import { useState } from 'react';
import classNames from 'classnames';
import { Button } from './Button';
import { Eye, EyeOff } from "lucide-react";

export const Input = ({ type, value, onChange, placeholder, className, name, error, showText = false }) => {
    const [inputType, setInputType] = useState(type);

    const inputClass =  classNames({
        "w-full mb-4 p-3 border border-[#BDBDBD] rounded-lg focus:outline-none focus:border-[#2F80ED]": true,
        "border-red-500": error,
        [className]: true
    })


    const toggleInputType = () => setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));

    return (
        <div className='relative'>
            <input
                type={inputType}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={inputClass}
            />
            {showText && (
                <Button
                    type='button'
                    onClick={toggleInputType}
                    className='absolute right-4 top-4 text-blue-500 focus:outline-none'
                    text= {inputType === 'password' ? <Eye size={20} /> : <EyeOff size={20} />}
                />
            )}
        </div>
    );
}

