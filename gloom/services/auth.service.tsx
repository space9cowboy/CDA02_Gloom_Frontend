import axios from 'axios';
import { AUTH_ROUTES } from '@/utils/api-routes';

export const SignupUser = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post(AUTH_ROUTES.SIGNUP, userData)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("SignupUser > axios error=", err);
                    reject("Error in SignupUser axios!");
                });
        } catch (error) {
            console.error("in userServices > SignupUser, Error===", error);
            reject("Unexpected error in SignupUser!");
        }
    });
};
export const LoginUser = (loginData: any) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post(AUTH_ROUTES.LOGIN, loginData)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("LoginUser > axios error=", err);
                    reject("Error in LoginUser axios!");
                });
        } catch (error) {
            console.error("in userServices > LoginUser, Error===", error);
            reject("Unexpected error in LoginUser!");
        }
    });
};
