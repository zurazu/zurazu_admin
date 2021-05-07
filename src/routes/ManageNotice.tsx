import Span from 'components/Span';
import React from 'react';
import MainTemplate from 'components/MainTemplate';

const ManageNotice = (props: any) => {

    
    return <MainTemplate history={props.history}>
        <Span>공지 관리 페이지입니다.</Span>
    </MainTemplate>;
}

export default ManageNotice;