import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

interface RootObject {
  id: string;
  name: string;
}

export type IGetFacilitie = {
  facilitie_id: string;
};

const getFacilitie = async (props?: IGetFacilitie) => {
  try {
    const res = await axiosAPIWithoutAuth.get<RootObject>(
      `/facilities/${props?.facilitie_id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getFacilitie;
