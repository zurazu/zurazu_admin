import Span from 'components/Span';
import React, { useEffect, useState } from 'react';
import MainTemplate from 'components/MainTemplate';
import { axiosApiInstance } from 'modules/axiosApiInstance';
import ProductItem from 'components/ProductItem';

const ManageItem = (props: any) => {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        axiosApiInstance.get("/admin/applySellProduct?offset=0&limit=10").then((response) => {
            console.log(response.data.list);
            const list = response.data.list.products.map((row: any) => {
                return <ProductItem key={row.idx} productIdx={row.idx} brandName={row.brandName} date={row.date} saleStatus={row.saleStatus} orderNumber={row.orderNumber} />;
            });
            setProductList(list);
        }).catch((error) => {
            alert("오류");
        });
    }, []);
    
    return <MainTemplate history={props.history}>
        {productList}
    </MainTemplate>;
}

export default ManageItem;