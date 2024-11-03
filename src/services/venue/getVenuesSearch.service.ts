import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";
import qs from "qs";
import { QSConfig } from "@/configs/QSConfig/QSConfig";

interface RootObject {
  venues: Venue[];
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

export type IGetVenuesSearch = {
  q?: string;
  limit?: number;
  offset?: number;
};

const getVenuesSearch = async (props: IGetVenuesSearch) => {
  try {
    const query = qs.stringify(
      {
        q: props.q,
        limit: props.limit,
        offset: props.offset,
      },
      QSConfig,
    );

    const res = await axiosAPIWithoutAuth.get<RootObject>(
      `/venues/search${query}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getVenuesSearch;
