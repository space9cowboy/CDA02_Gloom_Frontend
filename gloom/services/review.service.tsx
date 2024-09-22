import axios from 'axios';
import { POST_REVIEW } from '@/utils/api-routes';

export const PostReview = (userId: number, reviewData: any) => {
    return new Promise((resolve, reject) => {
        try {
            axios.post(POST_REVIEW(userId), reviewData)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("PostReview > axios error=", err);
                    reject("Error in PostReview axios!");
                });
        } catch (error) {
            console.error("in reviewServices > PostReview, Error===", error);
            reject("Unexpected error in PostReview!");
        }
    });
};
