import Span from 'components/Span';
import React from 'react';
import MainTemplate from 'components/MainTemplate';

const Home = (props: any) => {

    
    return <MainTemplate history={props.history}>
        <Span>관리자 페이지입니다.</Span>
    </MainTemplate>;
}

export default Home;