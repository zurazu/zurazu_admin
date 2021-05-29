import React from 'react';
import styled from 'styled-components';
import Span from './Span';


const TotalWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid black;
`;
const Img = styled.img`
    width:100px;
    height: 100px;
`;

interface ThumbnailProps{
    imgUrl: string;
    brand: string;
    name: string;
    productIdx: number;
}
const RegisteredProductThumbnail = ({imgUrl, brand, name, productIdx}: ThumbnailProps) => {
    return <TotalWrapper>
        <div><Span fontWeight="700" size="1.2rem">번호: </Span> <Span size="1.2rem">{productIdx}</Span></div>
        <div><Span fontWeight="700" size="1.2rem">브랜드: </Span> <Span size="1.2rem">{brand}</Span></div>
        <div><Span fontWeight="700" size="1.2rem">이름: </Span> <Span size="1.2rem">{name}</Span></div>
        <Img src={imgUrl} alt="이미지" />
    </TotalWrapper>;
}

export default RegisteredProductThumbnail;