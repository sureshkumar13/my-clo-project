import { PricingOption } from '../../utils/constants';
import { StyledContentListContainer, StyledContentListGrid, StyledContentListImage, StyledContentListInfo, StyledContentListItem, StyledContentListPrice } from './StyledContentList';


import React, { useEffect, useRef } from 'react';

const ContentList = (props: any) => {
  const { items, onLoadMore, hasMore } = props;
  function getPricingValue(pricing: number) {
    return Object.entries(PricingOption).find(([key, val]) => val === pricing)?.[0] || '';
  }

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasMore) return;
    const handleScroll = () => {
      if (!loaderRef.current) return;
      const rect = loaderRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight) {
        onLoadMore && onLoadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, onLoadMore]);

  return (
    <StyledContentListContainer>
      {items.map((item: any) => (
        <StyledContentListItem key={item.id}>
          <StyledContentListImage src={item.imagePath} alt={item.title} />
          <StyledContentListGrid>
            <StyledContentListInfo>
              <span>{item.title}</span>
              <span>{item.creator}</span>
            </StyledContentListInfo>
            <StyledContentListPrice>
              {getPricingValue(item.pricingOption) === 'PAID' ? `$${item.price}` : getPricingValue(item.pricingOption)}
            </StyledContentListPrice>
          </StyledContentListGrid>
        </StyledContentListItem>
      ))}
      {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
    </StyledContentListContainer>
  );
};



export default ContentList;
