import { ApiAxiosError } from '@/@types/apiError'
import {
  apiCreateGmailAccount,
  apiDeleteGmailAccount,
  apiGetGmailAccountList,
  apiUpdateGmailAccount,
} from '@/services/GmailAccountService'
import { GET_GMAIL_ACCOUNT_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'
import { CreateGmailAccountRequest, UpdateGmailAccountRequest } from '@/views/gmailAccounts/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetGmailAccountsQuery = () => {
  const { filter } = useGmailAccountStore()

  return useQuery({
    queryKey: [GET_GMAIL_ACCOUNT_LIST, filter],
    queryFn: async () => {
      const response = await apiGetGmailAccountList(filter)
      return response.data.data
    },
  })
}

export const useCreateGmailAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateGmailAccountRequest) => apiCreateGmailAccount(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_GMAIL_ACCOUNT_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateGmailAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGmailAccountRequest }) =>
      apiUpdateGmailAccount(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_GMAIL_ACCOUNT_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteGmailAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteGmailAccount(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_GMAIL_ACCOUNT_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
