import { toast } from "react-toastify";
import axiosInstance from "@config/api";
import Qs from "qs";

export async function callService(service, data, isFormData = false) {
    try {
        const response = isFormData
            ? await sendFormRequest(service.method, service.path, data)
            : await sendRequest(service.method, service.path, data);
        return response;
    } catch (error) {
        if (error && error.message) {
            toast.error(error.message);
        } else {
            toast.error("An error occurred");
        }
    }
}
async function sendRequest(method, path, data) {
    try {
        const { body, params, query } = data;

        let requestConfig = {
            method,
            url: path,
            data: body,
            params: params,
            paramsSerializer: (params) =>
                Qs.stringify(params, { arrayFormat: "brackets" }),
        };
        return (await axiosInstance(requestConfig)).data;
    } catch (error) {
        throw error;
    }
}

async function sendFormRequest(method, path, data) {
    try {
        let requestConfig = {
            method,
            url: path,
            data,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        return (await axiosInstance(requestConfig)).data;
    } catch (error) {
        throw error;
    }
}
