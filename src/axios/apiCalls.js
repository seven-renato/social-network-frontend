import { apiRequest } from "./requestMethods"

export const loginRequest = async (username) => {
  try {
    const res = await apiRequest.post("/login", username);
    return res
  } catch (err) {
    return false
  }
};

export const registerRequest = async (user) => {
  try {
    const res = await apiRequest.post("/register", user);
    return res
  } catch (err) {
    return false
  }
};

export const getUser = async (username) => {
  try {
    const res = await apiRequest.get(`/user/${username}`);
    return res
  } catch (err) {
    return false
  }
};

export const searchUser = async (data) => {
  try {
    const res = await apiRequest.post(`/search`, data);
    return res
  } catch (err) {
    return false
  }
};

export const changeInfoVisility = async (data) => {
  try {
    const res = await apiRequest.put(`/user-info-visibility`, data);
    return res
  } catch (err) {
    return false
  }
};

export const getInfoVisibility = async (data) => {
  try {
    const res = await apiRequest.get(`/user-info-visibility/${data}`);
    return res
  } catch (err) {
    return false
  }
};

export const createRelation = async (data) => {
  try {
    const res = await apiRequest.post(`/add-relation`, data);
    return res
  } catch (err) {
    return false
  }
};


export const userGraph = async (data) => {
  try {
    const res = await apiRequest.get(`/user-centered-graph/${data}`);
    return res
  } catch (err) {
    return false
  }
} 

export const socialNetworkGraph = async () => {
  try {
    const res = await apiRequest.get(`/social-network-graph`);
    return res
  } catch (err) {
    return false
  }
} 