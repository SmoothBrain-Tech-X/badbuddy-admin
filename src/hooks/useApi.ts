import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function useApi<
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError,
  TData = TQueryFnData,
>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  const { data } = useSession();

  return useQuery({
    queryKey,
    queryFn: async () => {
      return fetcher(queryKey[1], data?.user.access_token ?? "");
    },
    ...options,
  });
}
