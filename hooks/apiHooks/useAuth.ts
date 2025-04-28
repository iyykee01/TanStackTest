import { login_user } from "@/constants/auth";
import { requestData } from "@/libs/api/requests";
import { useMutation } from "@tanstack/react-query";

//useMutation function to handle the login to use my
//PostData function and its parameters as above

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (data: any) => requestData("post", login_user, data),
  });
