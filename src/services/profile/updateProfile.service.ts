import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type TUpdateProfile = {
  first_name: string;
  last_name: string;
  phone: string;
  play_level: string;
  location: string;
  bio: string;
  avatar_url: string;
};

const updateProfile = async (props?: TUpdateProfile) => {
  try {
    const res = await axiosAPIWithoutAuth.put<object>(`/users/profile`, props);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default updateProfile;
