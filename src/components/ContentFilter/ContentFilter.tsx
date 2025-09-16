
import React from 'react';
import { StyledContentButton, StyledContentFilterContainer, StyledContentFilterContents, StyledContentFilterLabel } from './StyledContentFilter';

type ContentFilterProps = {
    id: string;
    value: number[];
    onChange: (filters: number[]) => void;
};

const ContentFilter = ({ id, value, onChange }: ContentFilterProps) => {
    const handleCheckboxChange = (filter: number) => {
        if (value.includes(filter)) {
            onChange(value.filter(f => f !== filter));
        } else {
            onChange([...value, filter]);
        }
    };

    const handleReset = () => onChange([]);

    return (
        <StyledContentFilterContainer>
            <StyledContentFilterContents>
                <StyledContentFilterLabel>{"Pricing Option"}</StyledContentFilterLabel>
                <StyledContentFilterLabel>
                    <input
                        type="checkbox"
                        name="contentFilter"
                        value="Paid"
                        checked={value.includes(0)}
                        onChange={() => handleCheckboxChange(0)}
                    />
                    Paid
                </StyledContentFilterLabel>
                <StyledContentFilterLabel>
                    <input
                        type="checkbox"
                        name="contentFilter"
                        value="Free"
                        checked={value.includes(1)}
                        onChange={() => handleCheckboxChange(1)}
                    />
                    Free
                </StyledContentFilterLabel>
                <StyledContentFilterLabel>
                    <input
                        type="checkbox"
                        name="contentFilter"
                        value="View Only"
                        checked={value.includes(2)}
                        onChange={() => handleCheckboxChange(2)}
                    />
                    View Only
                </StyledContentFilterLabel>
            </StyledContentFilterContents>
            <StyledContentButton onClick={handleReset}>Reset</StyledContentButton>
        </StyledContentFilterContainer>
    );
};

export { ContentFilter };