import axios, { AxiosResponse } from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

client.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("Authorization");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

async function get<T>(url: string) {
  try {
    const result = await client.request<T, AxiosResponse<T>>({
      method: "GET",
      url,
      responseType: "json",
    });
    return result.data;
  } catch (e) {
    throw e;
  }
}

async function post<T>(url: string, payload: Object) {
  try {
    const result = await client.request<T, AxiosResponse<T>>({
      method: "POST",
      url,
      responseType: "json",
      data: payload,
    });

    return result.data;
  } catch (e) {
    throw e;
  }
}

async function put<T>(url: string, payload: Object) {
  try {
    const result = await client.request<T, AxiosResponse<T>>({
      method: "PUT",
      url,
      responseType: "json",
      data: payload,
    });

    return result.data;
  } catch (e) {
    throw e;
  }
}

async function remove<T>(url: string) {
  try {
    const result = await client.request<T, AxiosResponse<T>>({
      method: "DELETE",
      url,
      responseType: "json",
    });

    return result.data;
  } catch (e) {
    throw e;
  }
}

const AxiosService = {
  post,
  get,
  put,
  remove,
};

export default AxiosService;
