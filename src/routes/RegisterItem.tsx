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
    
    const onSubmitEvent = () => {
        const params = new FormData();
        if(applySellProductIdx != null) {
            params.append("applySellProductIdx", applySellProductIdx);

        }
        if(subCategoryIdx != null) {
            params.append("subCategoryIdx", subCategoryIdx);
        }
        if(name != null) {
            params.append("name",name);

        }
        if(price != null) {
            params.append("price",price);
        }
        if(brand != null) {
            params.append("brand",brand);
        }
        if(colorText != null){
            params.append("colorText", colorText);
        }
        if(material != null) {
            params.append("material", material);
        }
        if(clothingStatus != null) {
            params.append("clothingStatus", clothingStatus);
        }
        if(inspectionStatus != null) {
            params.append("inspectionStatus", inspectionStatus);
        }
        if(size != null){
            params.append("clothingSize", size);
        }
        if(laundryComment != null) {
            params.append("laundryComment", laundryComment);
        }
        if(infoComment != null){
            params.append("infoComment", infoComment);
        }
        if(keyword != null) {
            params.append("searchKeyword", keyword);
        }
        
        if(colorImgFile != null) {
            params.append("colorChipImage", colorImgFile[0]);
        }
        if(imgFiles != null) {
            for(let i = 0 ; i < imgFiles.length ; i++) {
                params.append("photos[" + i + "]", imgFiles[i]);
                console.log(imgFiles[i]);
            }
        }

        axiosApiInstance.post("http://api.zurazu.com/admin/product/register",params,{headers: {'Content-Type': 'multipart/form-data'}})
        .then((response) => {
            alert("success");
            props.history.push("/item");
        }).catch((error) => {
            alert(error.response.data.message);
        });
    }
    useEffect(() => {
        console.log(colorImgFile);
    }, [colorImgFile]);
    return <MainTemplate history={props.history}>
        <TotalWrapper>
            <Span fontWeight="700" size="1.4rem">?????? ?????? ??????????????????.</Span>
            <RegisterProductForm>
                <FormItem>
                    <Span>?????? ??????</Span>
                    <input type="text" name="name" value={name} onChange={(e: any)=>setName(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Span>????????? ??? ?????????</Span>
                    <input type="text" name="brand" value={brand} onChange={(e: any)=>setBrand(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Span>?????? ???????????? ??????</Span>
                    <select onChange={(e: any) => {setMainCategoryIdx(e.target.value)}}>
                        {mainCategoryOptionList}
                    </select>
                </FormItem>
                <FormItem>
                    <Span>?????? ???????????? ??????</Span>
                    <select onChange={(e:any) => {setSubCategoryIdx(e.target.value)}}>
                        {subCategoryOptionList}
                    </select>
                </FormItem>
                <FormItem>
                    <Span>??????</Span>
                    <input type="text" name="price" value={price} onChange={(e:any)=>setPrice(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Span>??????</Span>
                    <input type="text" name="colorText" value={colorText} onChange={(e:any)=>setColorText(e.target.value)}/>
                    <input type="file" name="colorChipImage" onChange={(e:any)=>setColorImgFile(e.target.files)}/>
                </FormItem>
                <FormItem>
                    <Span>??????</Span>
                    <input type="text" name="material"  value={material} onChange={(e:any)=>setMaterial(e.target.value)}/>
                </FormItem>
                <FormItem>
                    <Span>??? ?????? A B C ??????</Span>
                    <input type="text" name="clothingStatus" value={clothingStatus} onChange={(e:any)=>setClothingStatus(e.target.value)}/>                    
                </FormItem>
                <FormItem>
                    <Span>?????? ?????? 0~4 (0??? ?????? ??????)</Span>
                    <input type="text" name="inspectionStatus" value={inspectionStatus} onChange={(e:any)=>setInstectionStatus(e.target.value)}/>                    
                </FormItem>
                <FormItem>
                    <Span>?????? ?????????</Span>
                    <input type="text" name="clothingSize" value={size} onChange={(e:any)=>setSize(e.target.value)}/>                    
                </FormItem>
                <FormItem>
                    <Span>?????? ??? ?????? ??????</Span>
                    <textarea name="laundryComment" value={laundryComment} rows={10} cols={10} onChange={(e:any)=>setLaundryComment(e.target.value)}/>
                </FormItem>
                    <Span>?????? ?????? ??????</Span>
                    <textarea name="infoComment" value={infoComment} rows={10} cols={10} onChange={(e:any)=>setInfoComment(e.target.value)}/>
                <FormItem>
                    <Span>?????? ????????? ??????(ex- ?????????, ????????????, ??? ?????? ,?????? ??????)</Span>
                    <input type="text" name="searchKeyword" value={keyword} onChange={(e:any)=>setKeyword(e.target.value)}/>                    
                </FormItem>
                <FormItem>
                    <Span>????????? ?????????(?????? ??????)</Span>
                    <input type="file" multiple onChange={(e:any)=>setImgFiles(e.target.files)}/>                    
                </FormItem>
                <ButtonWrapper>
                    <SubmitButton onClick={onSubmitEvent}>?????? ??????</SubmitButton>
                </ButtonWrapper>
            </RegisterProductForm>
        </TotalWrapper>
    </MainTemplate>;
}

export default RegisterItem;