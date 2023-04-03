import { Link } from 'react-router-dom';
import React from 'react';

type LinkProps = {
    to: string;
    target?: string;
    className?: string;
    children: React.ReactNode;
};

const CustomLink = ({ to, target, className, children }: LinkProps) => {
    return (
        <div className={`${className}`}>
            <Link
                to={to}
                target={target}
                className={`text-primary-800 hover:text-primary-800 underline hover:underline underline-offset-4 decoration-dotted hover:decoration-solid hover:decoration-2 ${className}`}
            >
                {children}
            </Link>
        </div>
    );
};

export default CustomLink;
