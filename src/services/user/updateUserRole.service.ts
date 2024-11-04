import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type IUpdateUserRole = {
  user_id: string;
  role: string;
};

const updateUserRole = async (props?: IUpdateUserRole) => {
  try {
    const res = await axiosAPIWithoutAuth.put<object>(
      `/users/update/role`,
      props,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default updateUserRole;
