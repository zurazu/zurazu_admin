import Span from 'components/Span';
import React from 'react';
import MainTemplate from 'components/MainTemplate';

const ManageCategory = (props: any) => {

    
    return <MainTemplate history={props.history}>
        <Span>카테고리 관리 페이지입니다.</Span>
    </MainTemplate>;
}

export default ManageCategory;