import MainTemplate from 'components/MainTemplate';
import Span from 'components/Span';
import { axiosApiInstance } from 'modules/axiosApiInstance';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PurchaseHistoryThumbnail from 'components/PurchaseHistoryThumbnail';

const TotalWrapper = styled.div`
    display: flex;
    flex-direction: column;

`;
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
const PrevNextButton = styled.button`
    width: 200px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
`;
const ManagePurchaseHistory = (props: any) => {
    const [offset,setOffset]: any = useState(0);
    const [limit, setLimit]: any = useState(10);
    const [purchaseInfoList, setPurchaseInfoList] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams();
        params.append("offset", offset);
        params.append("limit", limit);
        
        axiosApiInstance.get("http://api.zurazu.com/admin/purchase/history",{params}).then((response) => {

            const list = response.data.list.history.map((row: any) => {
                return <PurchaseHistoryThumbnail 
                key={row.idx} 
                idx={row.idx} 
                confirmPurchase={row.confirmPurchase} 
                customerEmail={row.customerEmail} 
                customerName={row.customerName} 
                orderNumber={row.orderNumber} 
                purchasePrice={row.purchasePrice}
                registerProduct={row.registerProduct}/>;
            });
            setPurchaseInfoList(list);
        }).catch((error) => {
            alert("오류");
        });
    }, [offset, limit]);


    const onClickPrevButton = () => {
        if(offset - 10 < 0){
            setOffset(0);
        } else {
            setOffset(offset - 10);
        }
    }
    const onClickNextButton = () => {
        setOffset(offset + 10);
    }
    return <MainTemplate history={props.history}>
        <TotalWrapper>
            <Span size="2rem" fontWeight={700}>구매 내역 관리</Span>

            {purchaseInfoList}

        <ButtonWrapper>
            <PrevNextButton onClick={onClickPrevButton}>이전</PrevNextButton>
            <PrevNextButton onClick={onClickNextButton}>다음</PrevNextButton>
        </ButtonWrapper>
        </TotalWrapper>    
    </MainTemplate>
}

export default ManagePurchaseHistory;