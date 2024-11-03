import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type IAddCourt = {
  venue_id: string;
  name: string;
  description: string;
  price_per_hour: number;
};

const addCourt = async (props: IAddCourt) => {
  try {
    const res = await axiosAPIWithoutAuth.post<object>(
      `/venues/${props.venue_id}/courts`,
      props,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default addCourt;
