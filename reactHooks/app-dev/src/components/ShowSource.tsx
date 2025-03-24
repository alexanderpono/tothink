import React from 'react';

export interface ShowSourceProps {
    text: string;
}

export const ShowSource: React.FC<ShowSourceProps> = ({ text }) => {
    return <pre>{text}</pre>;
};
