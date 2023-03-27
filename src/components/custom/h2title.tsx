import React from 'react';

const H2Title = ({ children }: { children: React.ReactNode }) => {
    return <h2 className="text-xl font-bold mb-4">{children}</h2>;
};

export default H2Title;
