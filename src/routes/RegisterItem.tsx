import MainTemplate from 'components/MainTemplate';
import Span from 'components/Span';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

const TotalWrapper = styled.div`
    width: 100%;
    height: 100%;
`;
const RegisterProductForm = styled.form`

`;
const RegisterItem = (props: any) => {
    let {applySellProductIdx}: any = useParams();

    useEffect(() => {

    }, []);

    return <MainTemplate history={props.history}>
        <TotalWrapper>
            <Span fontWeight="700" size="1.4rem">판매 등록 페이지입니다.</Span>
            <RegisterProductForm>

            </RegisterProductForm>
        </TotalWrapper>
    </MainTemplate>;
}

export default RegisterItem;