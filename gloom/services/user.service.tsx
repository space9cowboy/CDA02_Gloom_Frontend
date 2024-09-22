import axios from 'axios';
import { USERS_ROUTES, GET_USER_BY_ID, POST_FAVORITE } from '@/utils/api-routes';

export const GetUserById = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            axios.get(GET_USER_BY_ID(id))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("GetUserById > axios error=", err);
                    reject("Error in GetUserById axios!");
                });
        } catch (error) {
            console.error("in userServices > GetUserById, Error===", error);
            reject("Unexpected error in GetUserById!");
        }
    });
};
export const GetAllUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            axios.get(USERS_ROUTES.GET_USERS)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("GetAllUsers > axios error=", err);
                    reject("Error in GetAllUsers axios!");
                });
        } catch (error) {
            console.error("in userServices > GetAllUsers, Error===", error);
            reject("Unexpected error in GetAllUsers!");
        }
    });
};
export const PostFavorite = (instrumentId: number) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post(POST_FAVORITE(instrumentId))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("PostFavorite > axios error=", err);
                    reject("Error in PostFavorite axios!");
                });
        } catch (error) {
            console.error("in favoriteServices > PostFavorite, Error===", error);
            reject("Unexpected error in PostFavorite!");
        }
    });
};