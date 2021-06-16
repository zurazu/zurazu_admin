import React, {useEffect, useState} from 'react';
import MainTemplate from 'components/MainTemplate';
import { axiosApiInstance } from 'modules/axiosApiInstance';
import { useParams } from 'react-router';
import Span from 'components/Span';
import styled from 'styled-components';

const ProductWrapper = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 2rem;
`;

const ImagesWrapper = styled.div`

`;
const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;
const Button = styled.button`
    width: 300px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 5px;
`;
const ManageItemDetail = (props: any) => {
    let {idx}: any = useParams();
    const [product, setProduct]: any = useState({});
    const [imageList, setImageList]: any = useState([]);
    
    useEffect(() => {
        axiosApiInstance.get("/member/applySellProduct/" + idx).then((response) => {
            const product = response.data.list.product;
            const images = response.data.list.images;
            setProduct(product);
            const list = images.map((row: any) => {
                return <img alt="aa" src={row.url}></img>;
            });
            setImageList(list);
        }).catch((error) => {
            alert("오류");
        });
    }, [idx]);
    const onClickDenyItemButton = () => {
        if(product.saleStatus === 'REGISTERED') {
            alert("이미 상품 등록된 아이템");
            return;
        }
        const params = new URLSearchParams();
        params.append('type', 'DENY');
        params.append('productIdx', idx);
        axiosApiInstance.post('/admin/applySellProduct/update/saleStatus',params).then((response) => {
            props.history.goBack();
        }).catch((error) =>{
            alert("실패");
        });
    }
    const onClickAgreeItemButton = () => {
        if(product.saleStatus ==='REGISTERED') {
            alert("이미 상품 등록된 아이템");
            return;
        }
        const params = new URLSearchParams();
        params.append('type', 'AGREE');
        params.append('productIdx', idx);
        axiosApiInstance.post('/admin/applySellProduct/update/saleStatus',params).then((response) => {
            props.history.goBack();
        }).catch((error) =>{
            alert("실패");
        });
    }
    const onClickRegisterButton = () => {
        if(product.saleStatus === 'WAITING'){
            alert("상품 승인을 해서 고객으로부터 옷을 받으세요");
            return;
        }
        props.history.push("/item/register/" + product.idx);
    }
    return <MainTemplate history={props.history}>
        <ProductWrapper>
            <Span size="1.2rem">작성일자: {product.date}</Span>
            <Span size="1.2rem">상품 상태: {product.saleStatus}</Span>
            <Span size="1.2rem">주문 번호: {product.orderNumber}</Span>
            <Span size="1.2rem">사용자 idx: {product.memberIdx}</Span>
            <Span size="1.2rem">카테고리: {product.categoryIdx}</Span>
            <Span size="1.2rem">브랜드 이름: {product.brandName}</Span>
            <Span size="1.2rem">구매 가격: {product.purchasePrice}</Span>
            <Span size= "1.2rem">희망 가격: {product.desiredPrice}</Span>
            <Span size="1.2rem">사이즈: {product.clothingSize}</Span>
            <Span size="1.2rem">옷 상태: {product.clothingStatus}</Span>
            <Span size="1.2rem">성별: {product.gender}</Span>
            <Span size="1.2rem">상품 정보: {product.comments}</Span>
            {product.lockerTime &&
            <Span textColor="red" fontWeight="700">{product.lockerTime}까지 옷을 보관함으로 가져와야합니다.</Span>}
        </ProductWrapper>
        <ImagesWrapper>
            {imageList}
        </ImagesWrapper>
        <FooterWrapper>
            {product.saleStatus !== 'REGISTERED' && <Button onClick={onClickAgreeItemButton}>상품 승인</Button>}
            <Button onClick={onClickDenyItemButton}>상품 거부</Button>
            {product.saleStatus !== 'REGISTERED' && <Button onClick={onClickRegisterButton}>상품 등록</Button>}
            
        </FooterWrapper>
    </MainTemplate>
};
export default ManageItemDetail;