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
                return <div onClick={()=>{onClickPurchaseItem(row.orderNumber, row.registerProduct.idx)}}><PurchaseHistoryThumbnail 
                key={row.idx} 
                idx={row.idx} 
                confirmPurchase={row.confirmPurchase} 
                customerEmail={row.customerEmail} 
                customerName={row.customerName} 
                orderNumber={row.orderNumber} 
                purchasePrice={row.purchasePrice}
                registerProduct={row.registerProduct}/></div>;
            });
            setPurchaseInfoList(list);
        }).catch((error) => {
            alert("오류");
        });
    }, [offset, limit]);

    const onClickPurchaseItem = (orderNumber: string, productIdx: any) => {
        //현재 api는 입금 완료 뿐만 아니라 상품 상태를 상품 거부 등 다른 상태로도 바꿀 수 있는데 시간 없으니 베타까지는 그냥 입금 완료만 바로 가능하게
        const confirm = window.confirm("주문번호 " + orderNumber + "의 입금 상태를 \n'입금 완료'로 변경하시겠습니까?");
        if(confirm === true) {
            const params = new URLSearchParams();
            params.append("type", "FINISH_DEPOSIT");
            params.append("productIdx", productIdx);
            console.log(productIdx);
            axiosApiInstance.post("http://api.zurazu.com/admin/product/status/update", params).then((response) => {
                alert("성공");
                window.location.reload();
            }).catch((error) => {
                alert("실패");
            });
        } else {

        }
    }
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