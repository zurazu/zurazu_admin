import HomeHeader from 'components/HomeHeader';
import ResponsiveContainer from 'components/ResponsiveContainer';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const TotalWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const BodyWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const HeaderWrapper = styled.div`
    width: 100%;
`;
interface TemplateProps {
    history: any;
    children?: any;
}
const MainTemplate = ({history, children}: TemplateProps) => {

    useEffect(() => {
        // 원래는 해당 토큰이 유효한지 검사해야하지만 아직 구현한 페이지가 없어서 호출할 api가 없으므로 임시로 토큰유무로 하자
        const sessionObj = window.sessionStorage.getItem('userInfo');
        let userInfo = sessionObj ? JSON.parse(sessionObj) : null;
        if(userInfo) {
            if(userInfo.accessToken === null) {
                history.push('/login');
            }
        } else {
            history.push('/login');
        }
    }, [history]);
    
    return <TotalWrapper>
        <HeaderWrapper>
            <HomeHeader history={history}/>
        </HeaderWrapper>
        <BodyWrapper>
            <ResponsiveContainer>
                {children}
            </ResponsiveContainer>
        </BodyWrapper>
    </TotalWrapper>;
}

export default MainTemplate;