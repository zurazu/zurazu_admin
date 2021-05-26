import MainTemplate from 'components/MainTemplate';
import Span from 'components/Span';
import { axiosApiInstance } from 'modules/axiosApiInstance';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

const TotalWrapper = styled.div`
    width: 100%;
    height: 100%;
`;
const RegisterProductForm = styled.div`
    display: flex;
    flex-direction: column;
    span{
        font-size: 1.2rem;
        font-weight: 700;
    }
    input[type=text] {
        border-bottom: 1px solid black;
    }
    input[type=submit] {
        border: 1px soild black;
    }
`;
const FormItem = styled.div`
    display: flex;
    flex-direction: column;
`;
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0 0 20px 0;

`;
const SubmitButton = styled.button`
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid black;
    background-color: yellow;
`;
const RegisterItem = (props: any) => {
    let {applySellProductIdx}: any = useParams();
    const [mainCategoryOptionList, setMainCategoryOption] = useState();
    const [subCategoryOptionList, setSubCategoryOption] = useState();
    const [mainCategoryIdx, setMainCategoryIdx] = useState();
    const [subCategoryIdx, setSubCategoryIdx]: any = useState();
    const [name, setName]: any = useState();
    const [brand, setBrand]: any = useState();
    const [price, setPrice]: any = useState();
    const [colorText, setColorText]: any = useState();
    const [colorImgFile, setColorImgFile]: any = useState();
    const [material, setMaterial]: any = useState();
    const [clothingStatus, setClothingStatus]: any = useState();
    const [inspectionStatus, setInstectionStatus]: any = useState(0);
    const [size, setSize]: any = useState();
    const [laundryComment, setLaundryComment]: any = useState();
    const [infoComment, setInfoComment]: any = useState();
    const [keyword,setKeyword]: any = useState();
    const [imgFiles, setImgFiles]: any = useState();
    useEffect(() => {
        axiosApiInstance.get("http://api.zurazu.com/mainCategories").then((response) => {
            const categories = response.data.list;
            const categoryOption = categories.map((row: any) => {
                return <option key={row.idx} value={row.idx}>{row.korean}</option>
            });
            setMainCategoryOption(categoryOption);
        }).catch((error) => {
            alert("메인카테고리 불러오기 실패");
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
            }).catch((error) => {
                alert("서브카테고리 불러오기 실패");
            });
        }
    }, [mainCategoryIdx]);
    
    const onSubmitEvent = () => {
        const params = new FormData();
        params.append("applySellProductIdx", applySellProductIdx);
        params.append("subCategoryIdx", subCategoryIdx);
        params.append("name",name);
        params.append("price",price);
        params.append("brand",brand);
        params.append("colorText", colorText);
        params.append("material", material);
        params.append("clothingStatus", clothingStatus);
        params.append("inspectionStatus", inspectionStatus);
        params.append("clothingSize", size);
        params.append("laundryComment", laundryComment);
        params.append("infoComment", infoComment);
        params.append("searchKeyword", keyword);
        
        params.append("colorChipImage", colorImgFile[0]);
        for(let i = 0 ; i < imgFiles.length ; i++) {
            params.append("photos[" + i + "]", imgFiles[i]);
            console.log(imgFiles[i]);
        }

        axiosApiInstance.post("http://api.zurazu.com/admin/product/register",params,{headers: {'Content-Type': 'multipart/form-data'}})
        .then((response) => {
            alert("success");
            props.history.push("http://api.zurazu.com/item");
        }).catch((error) => {
            alert("실패");
        });
    }
    useEffect(() => {
        console.log(colorImgFile);
    }, [colorImgFile]);
    return <MainTemplate history={props.history}>
        <TotalWrapper>
            <Span fontWeight="700" size="1.4rem">판매 등록 페이지입니다.</Span>
            <RegisterProductForm>
                <FormItem>
                    <Span>상품 이름</Span>
                    <input type="text" name="name" value={name} onChange={(e: any)=>setName(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Span>브랜드 및 구매처</Span>
                    <input type="text" name="brand" value={brand} onChange={(e: any)=>setBrand(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Span>메인 카테고리 설정</Span>
                    <select onChange={(e: any) => {setMainCategoryIdx(e.target.value)}}>
                        {mainCategoryOptionList}
                    </select>
                </FormItem>
                <FormItem>
                    <Span>서브 카테고리 설정</Span>
                    <select onChange={(e:any) => {setSubCategoryIdx(e.target.value)}}>
                        {subCategoryOptionList}
                    </select>
                </FormItem>
                <FormItem>
                    <Span>가격</Span>
                    <input type="text" name="price" value={price} onChange={(e:any)=>setPrice(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Span>컬러</Span>
                    <input type="text" name="colorText" value={colorText} onChange={(e:any)=>setColorText(e.target.value)}/>
                    <input type="file" name="colorChipImage" onChange={(e:any)=>setColorImgFile(e.target.files)}/>
                </FormItem>
                <FormItem>
                    <Span>소재</Span>
                    <input type="text" name="material"  value={material} onChange={(e:any)=>setMaterial(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Span>옷 등급 A B C 입력</Span>
                    <input type="text" name="clothingStatus" value={clothingStatus} onChange={(e:any)=>setClothingStatus(e.target.value)}/>                    
                </FormItem>
                <FormItem>
                    <Span>검수 기준 0~4 (0이 가장 높음)</Span>
                    <input type="text" name="inspectionStatus" value={inspectionStatus} onChange={(e:any)=>setInstectionStatus(e.target.value)}/>                    
                </FormItem>
                <FormItem>
                    <Span>실측 사이즈</Span>
                    <input type="text" name="clothingSize" value={size} onChange={(e:any)=>setSize(e.target.value)}/>                    
                </FormItem>
                <FormItem>
                    <Span>세탁 및 취급 방법</Span>
                    <textarea name="laundryComment" value={laundryComment} rows={10} cols={10} onChange={(e:any)=>setLaundryComment(e.target.value)}/>
                </FormItem>
                    <Span>제품 상세 정보</Span>
                    <textarea name="infoComment" value={infoComment} rows={10} cols={10} onChange={(e:any)=>setInfoComment(e.target.value)}/>
                <FormItem>
                    <Span>검색 키워드 설정(ex- 맨투맨, 아디다스, 옷 처럼 ,으로 구분)</Span>
                    <input type="text" name="searchKeyword" value={keyword} onChange={(e:any)=>setKeyword(e.target.value)}/>                    
                </FormItem>
                <FormItem>
                    <Span>이미지 업로드(다중 선택)</Span>
                    <input type="file" multiple onChange={(e:any)=>setImgFiles(e.target.files)}/>                    
                </FormItem>
                <ButtonWrapper>
                    <SubmitButton onClick={onSubmitEvent}>상품 등록</SubmitButton>
                </ButtonWrapper>
            </RegisterProductForm>
        </TotalWrapper>
    </MainTemplate>;
}

export default RegisterItem;