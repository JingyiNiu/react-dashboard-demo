import React from 'react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const CustomButton = ({ children, className, ...props }: CustomButtonProps) => {
    return (
        <button className={`rounded-md bg-primary-500 hover:bg-primary-800 text-white p-2 ${className}`} {...props}>
            {children}
        </button>
    );
};

export default CustomButton;
