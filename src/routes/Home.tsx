import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';

const Home = () => {
    const [redirect, setRedirect] = useState('');
    useEffect(() => {
        const accessToken = window.sessionStorage.getItem("accessToken");
        if(accessToken == null) {
            setRedirect('/login');
        }
    },[]);
    
    if(redirect !== '') {
        return <Redirect to={redirect} />;
    }
    return <div>home으로</div>;
}

export default Home;