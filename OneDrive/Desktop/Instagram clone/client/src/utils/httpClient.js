import axios from 'axios'
import { getAuthenticationToken } from './index'

const BASE_URL_URL = process.env.REACT_APP_BASE_URL;

// base instance
const http = axios.create({
    baseURL: BASE_URL_URL,
    responseType: 'json',
    timeout: 10000,
    timeoutErrorMessage: 'Request Timeout Error',
})

let token;
const getHeaders = (isSecured) => {
    token = getAuthenticationToken();

    let options = {
        'Content-Type': 'application/json'
    }
    if (isSecured) {
        options['Authorization'] = `Bearer ${token}`
    }
    return options;
}

const GET = (url, isSecured = false, params = {}) => {
    return http.get(url, {
        headers: getHeaders(isSecured),
        params
    })
}

const POST = (url, data, isSecured = false, params = {}) => {
    return http.post(url, data, {
        headers: getHeaders(isSecured),
        params
    })
}

const PUT = (url, data, isSecured = false, params = {}) => {
    return http.put(url, data, {
        headers: getHeaders(isSecured), params
    })
}

const DELETE = (url, isSecured = false, params = {}) => {
    return http.delete(url, {
        headers: getHeaders(isSecured), params
    })
}

export const httpClient = {
    GET, POST, PUT, DELETE
}