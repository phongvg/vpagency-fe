import { ApiAxiosError } from '@/@types/apiError'
import {
  apiCreateAdsAccount,
  apiDeleteAdsAccount,
  apiGetAdsAccountList,
  apiUpdateAdsAccount,
} from '@/services/AdsAccountService'
import { GET_ADS_ACCOUNT_LIST } from '@/utils/queryKey'
import { toastError } from '@/utils/toast'
import { useAdsAccountStore } from '@/views/adsAccounts/store/useAdsAccountStore'
import { CreateAdsAccountRequest, UpdateAdsAccountRequest } from '@/views/adsAccounts/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAdsAccountsQuery = () => {
  const { filter } = useAdsAccountStore()

  return useQuery({
    queryKey: [GET_ADS_ACCOUNT_LIST, filter],
    queryFn: async () => {
      const response = await apiGetAdsAccountList(filter)
      return response.data.data
    },
  })
}

export const useCreateAdsAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateAdsAccountRequest) => apiCreateAdsAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_ACCOUNT_LIST] })
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateAdsAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAdsAccountRequest }) => apiUpdateAdsAccount(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_ACCOUNT_LIST] })
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteAdsAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteAdsAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_ACCOUNT_LIST] })
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
