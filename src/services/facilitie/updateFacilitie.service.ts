import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type IUpdateFacilitie = {
  facilitie_id: string;
  name: string;
};

const updateFacilitie = async (props: IUpdateFacilitie) => {
  try {
    const payload = _.omit(props, ["facilitie_id"]);
    const res = await axiosAPIWithoutAuth.put<object>(
      `/facilities/${props.facilitie_id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default updateFacilitie;
