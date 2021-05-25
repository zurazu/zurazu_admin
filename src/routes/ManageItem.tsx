import Span from 'components/Span';
import React, { useEffect, useState } from 'react';
import MainTemplate from 'components/MainTemplate';
import { axiosApiInstance } from 'modules/axiosApiInstance';
import ProductItem from 'components/ProductItem';
import styled from 'styled-components';


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
const ManageItem = (props: any) => {
    const [productList, setProductList] = useState([]);
    const [offset,setOffset] = useState(0);
    const [limit, setLimit] = useState(10);

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

    useEffect(() => {
        axiosApiInstance.get("/admin/applySellProduct?offset=" + offset + "&limit=" + limit).then((response) => {
            console.log(response.data.list);
            const list = response.data.list.products.map((row: any) => {
                return <ProductItem key={row.idx} productIdx={row.idx} brandName={row.brandName} date={row.date} saleStatus={row.saleStatus} orderNumber={row.orderNumber} />;
            });
            setProductList(list);
        }).catch((error) => {
            alert("오류");
        });
    }, [offset, limit]);
    
    return <MainTemplate history={props.history}>
        {productList}
        <ButtonWrapper>
            <PrevNextButton onClick={onClickPrevButton}>이전</PrevNextButton>
            <PrevNextButton onClick={onClickNextButton}>다음</PrevNextButton>
        </ButtonWrapper>
    </MainTemplate>;
}

export default ManageItem;