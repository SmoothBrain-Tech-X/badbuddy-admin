import axios from "axios";
import { getSession } from "next-auth/react";

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_API + "/api";
};

export const axiosAPI = axios.create({
  baseURL: getBaseUrl(),
});

export const axiosAPIWithoutAuth = axios.create({
  baseURL: getBaseUrl(),
});

axiosAPIWithoutAuth.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (session) {
    request.headers.Authorization = `Bearer ${session.user.access_token}`;
  }
  return request;
});
