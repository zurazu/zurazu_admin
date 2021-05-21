import axios from 'axios';

//refresh 갱신 기능이 있는 axios 인스턴스
export const axiosApiInstance = axios.create({
});

//Request interceptor for API calls
//요청 전에 헤더에 엑세스 토큰을 넣는다.
axiosApiInstance.interceptors.request.use(
  async config => {
    const sessionObj = window.sessionStorage.getItem('userInfo');
    let userInfo = sessionObj ? JSON.parse(sessionObj) : null;
    
    const accessToken = userInfo.accessToken[0];
    config.headers = {
      Authentication: accessToken,
    }
    return config;
  },
  error => {
    Promise.reject(error)
  });

// Response interceptor for API calls
// 엑세스 토큰이 만료된 경우 refresh토큰으로 엑세스토큰을 갱신하고 다시 요청보낸다
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    // accessToken 만료 시
    originalRequest._retry = true;
    const sessionObj = window.sessionStorage.getItem('userInfo');

    let userInfo = sessionObj ? JSON.parse(sessionObj) : null;
    const access_token = await refreshAccessToken(userInfo.refreshToken[0]);

    if (userInfo) {
      originalRequest.headers['Authentication'] = access_token;
      userInfo.accessToken = access_token;
      window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    return axios(originalRequest);
  }
  return Promise.reject(error);
});

const refreshAccessToken = (refreshToken: string) => {
  //토큰 갱신해서 accessToken 반환
  const params = new URLSearchParams();
  params.append('refreshToken', refreshToken);
  return new Promise((succ, fail) => {
    axios.post('/admin/refreshToken',params).then((response) => {
      succ(response.data.list.accessToken);
    }).catch((error) => {
      fail(null);
    });
  });
}