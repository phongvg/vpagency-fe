import { ApiAxiosError } from '@/@types/apiError'
import { GET_APPEAL_ACCOUNT_DETAIL, GET_APPEAL_ACCOUNT_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import {
  apiCreateAppealAccount,
  apiDeleteAppealAccount,
  apiGetAppealAccountById,
  apiGetAppealAccountList,
  apiUpdateAppealAccount,
} from '@/views/appealAccount/services/AppealAccountService'
import { useAppealAccountStore } from '@/views/appealAccount/store/useAppealAccountStore'
import { UpdateAppealAccountRequest } from '@/views/appealAccount/types/appealAccount.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAppealAccountsQuery = () => {
  const { filter } = useAppealAccountStore()

  return useQuery({
    queryKey: [GET_APPEAL_ACCOUNT_LIST, filter],
    queryFn: async () => {
      const response = await apiGetAppealAccountList(filter)
      return response.data.data
    },
  })
}

export const useGetAppealAccountDetailQuery = (id: string, enabled = false) => {
  return useQuery({
    queryKey: [GET_APPEAL_ACCOUNT_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetAppealAccountById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}

export const useCreateAppealAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateAppealAccountRequest | UpdateAppealAccountRequest[]) =>
      apiCreateAppealAccount(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_APPEAL_ACCOUNT_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateAppealAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAppealAccountRequest }) =>
      apiUpdateAppealAccount(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_APPEAL_ACCOUNT_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteAppealAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteAppealAccount(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_APPEAL_ACCOUNT_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
