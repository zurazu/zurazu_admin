import MainTemplate from 'components/MainTemplate';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';

const TotalWrapper = styled.div`

`;
const RegisterItem = (props: any) => {
    let {idx}: any = useParams();

    useEffect(() => {

    }, []);
    return <MainTemplate history={props.history}>
        <TotalWrapper>
구현 중
        </TotalWrapper>
    </MainTemplate>;
}

export default RegisterItem;