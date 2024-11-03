import updateProfile from "@/services/profile/updateProfile.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateProfile = () => {
  return useMutation({
    mutationFn: updateProfile,
  });
};

export default useUpdateProfile;
