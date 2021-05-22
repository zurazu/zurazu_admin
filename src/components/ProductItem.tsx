import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Span from './Span';

const TotalWrapper = styled.div`
    width: 100%;
    height: 40px;
    border-bottom: 1px solid gray;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;
interface ProductItemProps {
    productIdx: number;
    brandName: string;
    date: string;
    saleStatus: string;
    orderNumber: string;
}
const ProductItem = ({productIdx, brandName, date, saleStatus, orderNumber}: ProductItemProps) => {
    return <Link to={"/item/" + productIdx}><TotalWrapper>
        <div><Span fontWeight={700}>주문 번호: </Span><Span>{orderNumber}</Span></div>
        <div><Span fontWeight={700}>상품 상태: </Span><Span>{saleStatus}</Span></div>
        <div><Span fontWeight={700}>이름: </Span><Span>{brandName}</Span></div>
        <div><Span fontWeight={700}>신청 일자: </Span><Span>{date}</Span></div>
    </TotalWrapper></Link>;
};

export default ProductItem;