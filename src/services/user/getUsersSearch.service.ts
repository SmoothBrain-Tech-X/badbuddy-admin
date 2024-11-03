import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";
import qs from "qs";
import { QSConfig } from "@/configs/QSConfig/QSConfig";

interface RootObject {
  Users: Venue[];
  total: number;
}

interface Venue {
  id: string;
  name: string;
  description: string;
  address: string;
  location: string;
  phone: string;
  email: string;
  open_time: string;
  close_time: string;
  image_urls: string;
  status: string;
  rating: number;
  total_reviews: number;
  courts: null;
}

export type IGetUsersSearch = {
  q?: string;
  limit?: number;
  offset?: number;
  play_level?: string;
  location?: string;
};

const getUsersSearch = async (props: IGetUsersSearch) => {
  try {
    const query = qs.stringify(
      {
        q: props.q?.length,
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

export default getUsersSearch;
