import axios from "axios";
import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

interface RootObject {
  id: string;
  name: string;
}

interface RootObject {
  name_th: string;
  name_en: string;
  geography_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

export type IGetProvinces = {};

const getProvinces = async (props?: IGetProvinces) => {
  try {
    const res = await axios.get<RootObject[]>(`https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getProvinces;
