import http from "./httpService";
//import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/logins";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  console.log(jwt);
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function setJwt() {}

const auth = {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt,
};

export default auth;
