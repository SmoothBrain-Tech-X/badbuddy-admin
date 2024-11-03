import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

interface RootObject {
  facilities: Facility[];
}

interface Facility {
  id: string;
  name: string;
}

export type IGetFacilities = {};

const getFacilities = async (props?: IGetFacilities) => {
  try {
    const res = await axiosAPIWithoutAuth.get<RootObject>(`/facilities`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getFacilities;
