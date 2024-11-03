import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

interface RootObject {
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
  courts: Court[];
}

interface Court {
  id: string;
  name: string;
  description: string;
  price_per_hour: number;
  status: string;
}

export type IGetVenue = {
  venue_id: string;
};

const getVenue = async (props: IGetVenue) => {
  try {
    const res = await axiosAPIWithoutAuth.get<RootObject>(
      `/venues/${props.venue_id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getVenue;
