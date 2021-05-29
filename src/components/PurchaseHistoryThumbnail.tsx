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
interface PurchaseHistoryThumbnailProps {
    idx: number;
    customerEmail: string;
    orderNumber: string;
    confirmPurchase: boolean;
    customerName: string;
    purchasePrice: number;
    registerProduct: any;
}
const PurchaseHistoryThumbnail = ({idx, customerEmail, orderNumber, confirmPurchase, customerName, purchasePrice, registerProduct}: PurchaseHistoryThumbnailProps) => {
    return <TotalWrapper>
        <div><Span size="1.2rem" fontWeight={700}>인덱스: </Span><Span size="1.2rem">{idx}</Span></div>
        <div><Span size="1.2rem" fontWeight={700}>주문 번호: </Span><Span size="1.2rem">{orderNumber}</Span></div>
        <div><Span size="1.2rem" fontWeight={700}>이름: </Span><Span size="1.2rem">{customerName}</Span></div>
        <div><Span size="1.2rem" fontWeight={700}>이메일: </Span><Span size="1.2rem">{customerEmail}</Span></div>
        <div><Span size="1.2rem" fontWeight={700}>구매 가격: </Span><Span size="1.2rem">{purchasePrice}</Span></div>
        <div><Span size="1.2rem" fontWeight={700}>입금 상태(상품 상태): </Span><Span size="1.2rem">{registerProduct.saleStatus}</Span></div>
        <div><Span size="1.2rem" fontWeight={700}>구매확정 여부: </Span><Span size="1.2rem">{confirmPurchase === true ? "O" : "X"}</Span></div>
    </TotalWrapper>;
};

export default PurchaseHistoryThumbnail;