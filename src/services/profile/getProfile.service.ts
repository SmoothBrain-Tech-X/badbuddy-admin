import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

interface RootObject {
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
  hosted_sessions: number;
  joined_sessions: number;
  average_rating: number;
  total_reviews: number;
  regular_partners: number;
}

export type IGetProfile = {};

const getProfile = async (props?: IGetProfile) => {
  try {
    const res = await axiosAPIWithoutAuth.get<RootObject>(`/users/profile`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getProfile;
