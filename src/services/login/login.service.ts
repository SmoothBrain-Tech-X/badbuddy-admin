import _ from "lodash";
import { axiosAPI } from "utils/axios";

export type LoginProps = {
  email: string;
  password: string;
};

interface RootObject {
  access_token: string;
  user: User;
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  play_level: string;
  location: string;
  bio: string;
  gender: string;
  play_hand: string;
  avatar_url: string;
  last_active_at: string;
  role: string;
  venues: Venue[];
}

interface Venue {
  id: string;
}

const login = async (props: LoginProps) => {
  try {
    const res = await axiosAPI.post<RootObject>(`/users/login`, props);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default login;
