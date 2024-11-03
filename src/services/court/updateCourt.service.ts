import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type IUpdateCourt = {
  venue_id: string;
  court_id: string;
  name: string;
  description: string;
  price_per_hour: number;
  status: string;
};

const updateCourt = async (props: IUpdateCourt) => {
  try {
    const payload = _.omit(props, ["venue_id", "court_id"]);
    const res = await axiosAPIWithoutAuth.put<object>(
      `/venues/${props.venue_id}/courts/${props.court_id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default updateCourt;
