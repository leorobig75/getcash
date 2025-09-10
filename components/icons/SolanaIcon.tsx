
import React from 'react';

const SolanaIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        className={`fill-current ${props.className}`}
    >
        <title>Solana</title>
        <path
            d="M5.334 4.342c-1.34-1.34-3.48-1.34-4.79.03l.03-.03c-1.34 1.34-1.34 3.48-.03 4.79l.03-.03L18.658 1.05c1.34-1.34 3.48-1.34 4.79-.03l-.03.03c1.34 1.34 1.34 3.48.03 4.79l-.03.03L5.334 23.018c-1.34 1.34-3.48 1.34-4.79.03l.03-.03c-1.34-1.34-1.34-3.48-.03-4.79l-.03.03L18.657 4.164c1.34-1.34 3.48-1.34 4.79-.03l-.03.03c1.34 1.34 1.34 3.48.03 4.79l-.03.03L5.334 4.342Z"
            fill="url(#solana-gradient)"
        />
        <defs>
            <linearGradient
                id="solana-gradient"
                x1="4.555"
                y1="4.555"
                x2="21.445"
                y2="21.445"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#9945FF" />
                <stop offset="1" stopColor="#14F195" />
            </linearGradient>
        </defs>
    </svg>
);

export default SolanaIcon;
