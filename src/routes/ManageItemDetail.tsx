import React, {useEffect, useState} from 'react';
import MainTemplate from 'components/MainTemplate';
import { axiosApiInstance } from 'modules/axiosApiInstance';
import { useParams } from 'react-router';
import Span from 'components/Span';
import styled from 'styled-components';

const ProductWrapper = styled.div`
display: flex;
flex-direction: column;
`;

const ImagesWrapper = styled.div`

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
    return <MainTemplate history={props.history}>
        <ProductWrapper>
            <Span>작성일자: {product.date}</Span>
            <Span>상품 상태: {product.saleStatus}</Span>
            <Span>주문 번호: {product.orderNumber}</Span>
            <Span>사용자 idx: {product.memberIdx}</Span>
            <Span>카테고리: {product.categoryIdx}</Span>
            <Span>브랜드 이름: {product.brandName}</Span>
            <Span>가격: {product.price}</Span>
            <Span>사이즈: {product.clothingSize}</Span>
            <Span>옷 상태: {product.clothingStatus}</Span>
            <Span>성별: {product.gender}</Span>
            <Span>상품 정보: {product.comments}</Span>
        </ProductWrapper>
        <ImagesWrapper>
            {imageList}
        </ImagesWrapper>
    </MainTemplate>
};
/*  카테고리, 한글, 영어로, 영어는 대문자  */
export default ManageItemDetail;