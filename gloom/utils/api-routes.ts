const baseRoute = 'http://localhost:8000/api'

export const AUTH_ROUTES ={
   SIGNUP:`${baseRoute}/auth/signup`,
   LOGIN:`${baseRoute}/auth/login`
};

export const TRANS_ROUTES ={
   POST_TRANSACTION:`${baseRoute}/transactions`,
   GET_TRANSACTION:`${baseRoute}/transactions`
};

export const INSTRUMENTS_ROUTES = {
   POST_INSTRUMENT:`${baseRoute}/instruments`,
   GET_ALL_INSTRUMENT:`${baseRoute}/instruments`,
   GET_INSTRUMENT_BY_CATEGORY:`${baseRoute}/instruments/category`,
   GET_INSTRUMENT_BY_SELLER:`${baseRoute}/instruments/seller`,
   GET_INSTRUMENT_BY_BUYER:`${baseRoute}/instruments/buyer`,

};
 

export const CATEGORY_ROUTES = {
   POST_CATEGORY:`${baseRoute}/categories`,
   GET_ALL_CATEGORY:`${baseRoute}/categories`,

   GET_CATEGORY_BY_PARENT:`${baseRoute}/categories/parent`,
};

export const GET_INSTRUMENT_BY_ID = (id: number) => `${baseRoute}/instruments/`+ id;
export const PUT_INSTRUMENT_BY_ID = (id: number) => `${baseRoute}/instruments/`+ id;
export const DELETE_INSTRUMENT_BY_ID = (id: number) => `${baseRoute}/instruments/`+ id;

export const USERS_ROUTES = {
    GET_USERS:`${baseRoute}/user`,
    GET_PROFILE: `${baseRoute}/user/username`,
    POST_REVIEW: `${baseRoute}/user/review`,
};

export const GET_USER_BY_ID = (id: number) => `${baseRoute}/user/`+ id;

export const REVIEW_ROUTES = {
    GET_BEST_RATED_USER: `${baseRoute}/user/bestrated`,
};


export const POST_REVIEW = (id: number) => `${baseRoute}/user/`+ id +'/review';

export const POST_FAVORITE = (instrumentId: number) => `${baseRoute}/user/favorites`+ instrumentId;
 