import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";
import qs from "qs";
import { QSConfig } from "@/configs/QSConfig/QSConfig";

interface RootObject {
  users: User[];
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
}

export type IGetUser = {
  q?: string;
  limit?: number;
  offset?: number;
  play_level?: string;
  location?: string;
};

const getUser = async (props: IGetUser) => {
  try {
    const query = qs.stringify(
      {
        q: props.q,
        limit: props.limit,
        offset: props.offset,
        play_level: props.play_level,
        location: props.location,
      },
      QSConfig,
    );

    const res = await axiosAPIWithoutAuth.get<RootObject>(
      `/users/search${query}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getUser;
