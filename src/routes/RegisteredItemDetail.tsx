import MainTemplate from 'components/MainTemplate';
import Span from 'components/Span';
import { axiosApiInstance } from 'modules/axiosApiInstance';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

const TotalWrapper = styled.div`
    padding: 0 0 50px 0;
    display: flex;
    flex-direction: column;
`;
const DeleteButton = styled.button`
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid gray;
    background-color: red;
`;

const RegisteredItemDetail = (props: any) => {
    let { idx }: any = useParams();
    const [product, setProduct]: any = useState({});
    const [images, setImages]: any = useState([]);
    const [subCategory, setSubCategory]:any = useState({});
    const [colorChip, setColorChip]:any = useState({});

    useEffect(() => {
        axiosApiInstance.get("http://api.zurazu.com/product/" + idx).then((response) => {
            console.log(response.data.list.product);
            setProduct(response.data.list.product);
            setSubCategory(response.data.list.product.subCategory);
            setColorChip(response.data.list.product.colorChip);
            const imgData = response.data.list.images;
            const list = imgData.map((row: any) => {
                return <img key={row.idx} src={row.url} alt="img" />;
            });
            setImages(list);
        }).catch((error) => {
            alert("조회 실패");
        });
    }, [idx]);
    
    const onClickDeleteProduct = () => {
        const confirm = window.confirm("정말 삭제하시겠습니까?\n복구 불가능합니다.");
        if(confirm) {
            axiosApiInstance.post("http://api.zurazu.com/admin/product/delete",{registerNumber: product.registerNumber}).then((response) => {
            alert("success");
            props.history.goBack();
        }).catch((error) => {
            alert("조회 실패");
        });
        }
    }
    return <MainTemplate history={props.history}>
        <TotalWrapper>
            {images}
            <Span size="1.2rem">카테고리: {subCategory.korean}</Span>
            <Span size="1.2rem">컬러칩: {colorChip.colorText}</Span>
            <img src={colorChip.url}></img>
            <Span size="1.2rem">이름: {product.name}</Span>
            <Span size="1.2rem">브랜드: {product.brand}</Span>
            <Span size="1.2rem">가격: {product.price}</Span>
            <Span size="1.2rem">재질: {product.material}</Span>
            <Span size="1.2rem">사이즈: {product.clothingSize}</Span>
            <Span size="1.2rem">정보: {product.infoComment}</Span>
            <Span size="1.2rem">laundryComment: {product.laundryComment}</Span>
            <Span size="1.2rem">searchKeyword: {product.searchKeyword}</Span>
            <Span size="1.2rem">registerNumber: {product.registerNumber}</Span>
            <Span size="1.2rem">clothingStatus: {product.clothingStatus}</Span>
            <Span size="1.2rem">inspectionStatus: {product.inspectionStatus}</Span>
            <Span size="1.2rem">createDate: {product.createDate}</Span>
            <DeleteButton onClick={()=>{onClickDeleteProduct()}}><Span textColor="white" fontWeight="700">삭제</Span></DeleteButton>
        </TotalWrapper>
    </MainTemplate>;
}

export default RegisteredItemDetail;