import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type ICreateFacilitie = {
  name: string;
};

const createFacilitie = async (props: ICreateFacilitie) => {
  try {
    const payload = _.omit(props, ["facilitie_id"]);
    const res = await axiosAPIWithoutAuth.post<object>(`/facilities`, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default createFacilitie;
