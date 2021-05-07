import Span from 'components/Span';
import React from 'react';
import MainTemplate from 'components/MainTemplate';

const ManageItem = (props: any) => {

    
    return <MainTemplate history={props.history}>
        <Span>판매 신청 관리 페이지입니다.</Span>
    </MainTemplate>;
}

export default ManageItem;