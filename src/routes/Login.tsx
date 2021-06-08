import axios from 'axios';
import AnimInputBox from 'components/AnimInputBox';
import Span from 'components/Span';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from 'styles/theme';

const TotalWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.mainColor};
`
const InnerWrapper = styled.div`
`;
const HeaderWrapper = styled.div`
    padding: 5px 0 5px 0;
    display: flex;
    justify-content: center;
`;
const BodyWrapper = styled.div`
    width: 300px;
    height: 250px;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
`;
const LoginButton = styled.input`
border: 1px solid gray;
border-radius: 5px;
width: 100%;
height: 30px;
margin-bottom: 10px;
`;
const RegisterButton = styled.button`
    border: 1px solid gray;
    border-radius: 5px;
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
`;
const Login = (props: any) => {
    const [id,setId] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitLogin = () => {
        axios.post('http://api.zurazu.com/admin/login', {id: id, password: password}, {headers: {'Content-Type': 'application/json'}}).then((response) => {
            const accessToken = response.data.list.accessToken;
            const refreshToken = response.data.list.refreshToken;
            const userInfo = {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
            window.sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
            props.history.push("/");
        }).catch((error) => {
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                if(error.response.status === 400) {
                    alert("아이디 비밀번호를 입력해주세요");
                }
                if(error.response.status === 404) {
                    alert("해당 계정이 없음");
                }
                if(error.response.status === 401) {
                    alert("승인나지 않은 계정입니다.");
                }
              }
              else if (error.request) {
                // 요청이 이루어 졌으나 응답을 받지 못했습니다.
                // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
                // Node.js의 http.ClientRequest 인스턴스입니다.
                console.log(error.request);
              }
              else {
                // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
                console.log('Error', error.message);
              }
		});
    }
    return <TotalWrapper>
        <InnerWrapper>
            <HeaderWrapper>
                <Span textColor="white" fontWeight="700" size="2rem">zurazu admin</Span>
            </HeaderWrapper>
            <BodyWrapper>
                    <AnimInputBox inputType="text" label="아이디" name="id" onChange={(e)=>{setId(e.target.value)}} />
                    <AnimInputBox inputType="password" label="비밀번호" name="password" onChange={(e)=>{setPassword(e.target.value)}} />
                    <LoginButton type="submit" value="로그인" onClick={()=>{onSubmitLogin()}} />
                <Link to="/register"><RegisterButton>관리자 신청</RegisterButton></Link>
            </BodyWrapper>
        </InnerWrapper>
    </TotalWrapper>;
}

export default Login;