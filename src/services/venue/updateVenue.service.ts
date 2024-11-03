import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type TUpdateVenue = {
  venue_id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  open_time: string;
  close_time: string;
  image_urls: string;
  status: string;
};

const updateVenue = async (props: TUpdateVenue) => {
  try {
    const payload = _.omit(props, ["venue_id"]);
    const res = await axiosAPIWithoutAuth.put<object>(
      `/venues/${props.venue_id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default updateVenue;
