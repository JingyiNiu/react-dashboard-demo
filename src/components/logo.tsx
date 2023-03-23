const LogoSvg = () => {
    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
        >
            <g clipPath="url(#clip0_1_2)">
                <circle cx="500" cy="500" r="500" fill="#86D1D6" className="hover:fill-primary-800" />
                <path
                    d="M339.233 280.234C311.735 300.438 313.143 583.163 317.284 722H369.05C371.397 617.113 377.002 405.435 380.646 397.817C385.201 388.295 586.883 722 649.417 722C699.443 722 687.24 427.489 675.921 280.234H639.892C638.373 385.535 632.106 599.117 619.185 611.041C603.034 625.946 373.606 254.978 339.233 280.234Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_1_2">
                    <rect width="1000" height="1000" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default LogoSvg;
