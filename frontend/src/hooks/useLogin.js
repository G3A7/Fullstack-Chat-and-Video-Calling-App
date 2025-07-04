import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

function useLogin() {
  const queryClient = useQueryClient();
  const {
    mutate: loginMutaion,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return { loginMutaion, isPending, error };
}

export default useLogin;
