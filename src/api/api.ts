import * as axios from "axios";

// @ts-ignore
const instance = axios.create({
    baseURL: '/db.json'
});

export const getQuestions = () => {
    return instance.get().then((response: { data: any; }) => response.data);
};