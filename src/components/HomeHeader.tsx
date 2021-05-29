import React from 'react';
import Span from './Span';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';
const HeaderWrapper = styled.header`
    width: 100%;
    height: 50px;
    background-color: ${theme.colors.mainColor};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 0 30px;
`;

const HeaderItemList = styled.div`
    height: 100%;
    display: flex;
`;
const HeaderItem = styled.div`
    height: 100%;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        color: white;
        font-size: 1.2rem;
        font-weight: 700
    }
    :hover {
        span {
            color: lightblue;
        }
    }
`;
interface headerProps {
    history: any,
}
const HomeHeader = ({history}: headerProps) => {
    
    const onClickLogout = () => {
        window.sessionStorage.removeItem('userInfo');
        history.push('/login');
    }

    return <HeaderWrapper>
    <Span textColor="white" fontWeight="700" size="2rem">zurazu</Span>
    <HeaderItemList>
        <Link to="/category"><HeaderItem><Span>카테고리 관리</Span></HeaderItem></Link>
        <Link to="/notice"><HeaderItem><Span>공지사항 관리</Span></HeaderItem></Link>
        <Link to="/item"><HeaderItem><Span>판매신청 내역</Span></HeaderItem></Link>
        <Link to="/registeredItem"><HeaderItem><Span>상품 관리</Span></HeaderItem></Link>
        <Link to="/purchaseHistory"><HeaderItem><Span>입금 상태 관리</Span></HeaderItem></Link>
    </HeaderItemList>
    <div onClick={()=>{onClickLogout()}}><Span textColor="white" fontWeight="700" size="1.5rem">로그아웃</Span></div>
</HeaderWrapper>;
}
export default HomeHeader;