import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type IDeleteCourt = {
  venue_id: string;
  court_id: string;
};

const deleteCourt = async (props: IDeleteCourt) => {
  try {
    const res = await axiosAPIWithoutAuth.delete<object>(
      `/venues/${props.venue_id}/courts/${props.court_id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default deleteCourt;
