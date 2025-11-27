import { ApiAxiosError } from '@/@types/apiError'
import {
  apiAssignGmailAccountToSelf,
  apiCreateGmailAccount,
  apiDeleteGmailAccount,
  apiGetGmailAccountById,
  apiGetGmailAccountList,
  apiUpdateGmailAccount,
} from '@/views/gmailAccounts/services/GmailAccountService'
import { GET_GMAIL_ACCOUNT_LIST, GET_GMAIL_ACCOUNT_DETAIL } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useGmailAccountStore } from '@/views/gmailAccounts/store/useGmailAccountStore'
import { UpdateGmailAccountRequest } from '@/views/gmailAccounts/types/gmailAccount.type'
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

export const useGetGmailAccountDetailQuery = (id: string, enabled = false) => {
  return useQuery({
    queryKey: [GET_GMAIL_ACCOUNT_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetGmailAccountById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}

export const useCreateGmailAccountMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: UpdateGmailAccountRequest | UpdateGmailAccountRequest[]) =>
      apiCreateGmailAccount(payload),
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

export const useAssignGmailAccountToSelfMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiAssignGmailAccountToSelf(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_GMAIL_ACCOUNT_LIST] })
      toastSuccess(response.data.message)
    },
  })
}
