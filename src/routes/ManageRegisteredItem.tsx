import MainTemplate from 'components/MainTemplate';
import RegisteredProductThumbnail from 'components/RegisteredProductThumbnail';
import Span from 'components/Span';
import { axiosApiInstance } from 'modules/axiosApiInstance';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const TotalWrapper = styled.div`
    display: flex;
    flex-direction: column;

`;
const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid black;
`;
const CategoryQueryButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
    font-weight: 700;
    border: 1px solid black;
    border-radius: 5px;
    background-color: white;

    :hover{
        background-color: lightblue;
    }
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
const ManageRegisteredItem = (props: any) => {
    const [mainCategoryIdx, setMainCategoryIdx]: any = useState();
    const [subCategoryIdx, setSubCategoryIdx]: any = useState();
    const [mainCategoryOptionList, setMainCategoryOption] = useState();
    const [subCategoryOptionList, setSubCategoryOption] = useState();
    const [offset,setOffset]: any = useState(0);
    const [limit, setLimit]: any = useState(10);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axiosApiInstance.get("http://api.zurazu.com/mainCategories").then((response) => {
            const categories = response.data.list;
            const categoryOption = categories.map((row: any) => {
                return <option key={row.idx} value={row.idx}>{row.korean}</option>
            });
            setMainCategoryOption(categoryOption);
            setMainCategoryIdx(categories[0].idx);
        }).catch((error) => {
            alert("?????????????????? ???????????? ??????");
        });
    }, []);

    useEffect(() => {
        if(mainCategoryIdx != null) {
            axiosApiInstance.get("http://api.zurazu.com/subCategories?mainIdx=" + mainCategoryIdx).then((response) => {
                const categories = response.data.list;
                const categoryOption = categories.map((row: any) => {
                    return <option key={row.idx} value={row.idx}>{row.korean}</option>
                });
                setSubCategoryOption(categoryOption);
                setSubCategoryIdx(categories[0].idx);
            }).catch((error) => {
                alert("?????????????????? ???????????? ??????");
            });
        }
    }, [mainCategoryIdx]);

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

    const onClickQueryCategoryButton = () => {
        setOffset(0);
        setLimit(10);
        const params = new URLSearchParams();
        params.append("offset", offset);
        params.append("limit", limit);
        params.append("mainCategoryIdx", mainCategoryIdx);
        params.append("subCategoryIdx", subCategoryIdx);
        params.append("notOnlySelectProgressing", 'true');

        axiosApiInstance.get("http://api.zurazu.com/product", {params}).then((response)=>{
            const products = response.data.list.products;

            const list = products.map((row: any) => {
                return <Link to={"/registeredItem/" + row.productIdx} key={row.productIdx} ><RegisteredProductThumbnail imgUrl={row.image.url} brand={row.brand} name={row.name} productIdx={row.productIdx} /></Link>;
            });
            setProductList(list);
        }).catch((error) => {
            alert("?????? ??????");
        });
    }
    return <MainTemplate history={props.history}>
        <TotalWrapper>
            <Span size="2rem" fontWeight={700}>?????? ?????? ??????</Span>
            <CategoryWrapper>
                <div>
                    <Span size="1.2rem">?????? ???????????? ??????</Span>
                    <select onChange={(e:any) => {setMainCategoryIdx(e.target.value)}}>
                        {mainCategoryOptionList}
                    </select>
                </div>
                <div>
                    <Span size="1.2rem">?????? ???????????? ??????</Span>
                    <select onChange={(e:any) => {setSubCategoryIdx(e.target.value)}}>
                        {subCategoryOptionList}
                    </select>
                </div>
                <div>
                    <CategoryQueryButton onClick={onClickQueryCategoryButton}>?????? ??????</CategoryQueryButton>
                </div>
            </CategoryWrapper>

            {productList}

        <ButtonWrapper>
            <PrevNextButton onClick={onClickPrevButton}>??????</PrevNextButton>
            <PrevNextButton onClick={onClickNextButton}>??????</PrevNextButton>
        </ButtonWrapper>
        </TotalWrapper>    
    </MainTemplate>
}
export default ManageRegisteredItem;