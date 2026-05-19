import apiClient from './apiClient';

const LOGIN_URL = 'https://www.tatd.in/app-api/driver/login/driver-login.php';
const OTP_URL =
  'https://www.tatd.in/app-api/driver/login/verify-otp-login.php';

export const loginDriver = async (mobile: string) => {
  const response = await apiClient.post(
    LOGIN_URL,
    {
      mobile,
      user_type: 'Driver',
      app_version: '2.37',
      app_type: 'android',
    },
    { baseURL: '' },
  );
  console.log(response, 'response for login')
  return response.data;
};

export const verifyOtp = async (mobile: string, otp: string) => {
  console.log(mobile, otp, 'mobile and otp')
  const response = await apiClient.post(
    OTP_URL,
    {
      mobile: mobile,
      otp: otp,
      user_type: 'Driver',
      app_version: '2.37',
      app_type: 'android',
    },
    { baseURL: '' },
  );
  console.log(response, 'otp for login')
  return response.data;
};
