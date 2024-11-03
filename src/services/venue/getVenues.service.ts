import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

interface RootObject {
  venues: Venue[];
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

export type IGetVenues = {};

const getVenues = async (props: IGetVenues) => {
  try {
    const res = await axiosAPIWithoutAuth.get<RootObject>(`/venues`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getVenues;
