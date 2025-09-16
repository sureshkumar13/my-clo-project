import React, {useState} from 'react';
import { Type } from 'typescript';

export type SortType = '' | 'name' | 'high' | 'low';

type SortComponentProps = {
    id: string;
    value: SortType;
    onSort: (type: SortType) => void;
};

const SortComponent = ({ id, value, onSort }: SortComponentProps) => {
    return (
        <div style={{ margin: '30px' }}>
            <select
                id={id}
                value={value}
                onChange={e => onSort(e.target.value as SortType)}
                style={{ padding: '8px', borderRadius: '4px', fontSize: '1rem' }}
            >
                <option value="">Sort By</option>
                <option value="name">Item Name</option>
                <option value="high">Higher Price</option>
                <option value="low">Lower Price</option>
            </select>
        </div>
    );
};

SortComponent.propTypes = {};

export { SortComponent };