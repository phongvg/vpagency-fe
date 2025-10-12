import { BaseResponse } from '@/@types/common'
import { UserStatisticResponse } from '@/@types/statistic'
import ApiService from '@/services/ApiService'

export async function getUserStatistic() {
  return ApiService.fetchData<BaseResponse<UserStatisticResponse>>({
    url: '/admin/users/stats',
    method: 'get',
  })
}
