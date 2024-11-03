import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type IDeleteFacilitie = {
  facilitie_id: string;
};

const deleteFacilitie = async (props: IDeleteFacilitie) => {
  try {
    const res = await axiosAPIWithoutAuth.delete<object>(
      `/facilities/${props.facilitie_id}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default deleteFacilitie;
