import getProfile, {
  type IGetProfile,
} from "@/services/profile/getProfile.service";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = (props?: IGetProfile) => {
  return useQuery({
    queryKey: ["useGetProfile"],
    queryFn: () => getProfile(props),
  });
};

export default useGetProfile;
