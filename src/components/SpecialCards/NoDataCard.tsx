import React from 'react';

type Props = {};

const NoDataCard = (props : Props) => {
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
            margin: '30px'
        }}>
            <svg width="48" height="48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '16px' }}>
                <circle cx="24" cy="24" r="22" stroke="#ccc" strokeWidth="4" />
                <text x="24" y="30" textAnchor="middle" fontSize="18" fill="#ccc">No Data</text>
            </svg>
            <div>No data available</div>
        </div>
    );
};

export { NoDataCard };