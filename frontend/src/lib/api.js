import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const res = await axiosInstance.post("auth/signup", signupData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("auth/logout");
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("auth/me");
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log("error in getAuthUser", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("auth/onboard", userData);
  return res?.data;
};

export const getUserFriends = async () => {
  const res = await axiosInstance.get("users/friends");
  return res?.data;
};

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res?.data;
};

export const getOutgoingFriendReqs = async () => {
  const res = await axiosInstance.get("users/outgoing-friend-requests");
  return res?.data;
};

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`users/friend-request/${userId}`);
  return res?.data;
};

export const getFriendRequests = async () => {
  const res = await axiosInstance.get(`users/friend-requests`);
  return res?.data;
};

export const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(
    `users/friend-request/${requestId}/accept`
  );
  return res?.data;
};

export const getStreamToken = async () => {
  const res = await axiosInstance.get("chat/token");
  return res?.data;
};
