import axios from 'axios';
import { INSTRUMENTS_ROUTES, GET_INSTRUMENT_BY_ID, PUT_INSTRUMENT_BY_ID, DELETE_INSTRUMENT_BY_ID } from '@/utils/api-routes';

export const GetAllInstruments = () => {
    return new Promise((resolve, reject) => {
        try {
            axios.get(INSTRUMENTS_ROUTES.GET_ALL_INSTRUMENT)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("GetAllInstruments > axios error=", err);
                    reject("Error in GetAllInstruments axios!");
                });
        } catch (error) {
            console.error("in instrumentServices > GetAllInstruments, Error===", error);
            reject("Unexpected error in GetAllInstruments!");
        }
    });
};
export const GetInstrumentById = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            axios.get(GET_INSTRUMENT_BY_ID(id))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("GetInstrumentById > axios error=", err);
                    reject("Error in GetInstrumentById axios!");
                });
        } catch (error) {
            console.error("in instrumentServices > GetInstrumentById, Error===", error);
            reject("Unexpected error in GetInstrumentById!");
        }
    });
};
export const UpdateInstrumentById = (id: number, instrumentData: any) => {
    return new Promise((resolve, reject) => {
        try {
            axios.put(PUT_INSTRUMENT_BY_ID(id), instrumentData)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("UpdateInstrumentById > axios error=", err);
                    reject("Error in UpdateInstrumentById axios!");
                });
        } catch (error) {
            console.error("in instrumentServices > UpdateInstrumentById, Error===", error);
            reject("Unexpected error in UpdateInstrumentById!");
        }
    });
};
export const DeleteInstrumentById = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            axios.delete(DELETE_INSTRUMENT_BY_ID(id))
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    console.error("DeleteInstrumentById > axios error=", err);
                    reject("Error in DeleteInstrumentById axios!");
                });
        } catch (error) {
            console.error("in instrumentServices > DeleteInstrumentById, Error===", error);
            reject("Unexpected error in DeleteInstrumentById!");
        }
    });
};
