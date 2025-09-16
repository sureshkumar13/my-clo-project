import React from 'react';

type Props = {
    error: string;
};

const ErrorCard = (props : Props) => {
    const {error} = props;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            background: '#f8f8f8',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            color: '#888',
            fontSize: '1.2rem',
            margin: '30px',
            width: '90%',
            height: '500px'
        }}>
            <div>Error card!!</div>
            <div>{error}</div>
        </div>
    );
};

export { ErrorCard };