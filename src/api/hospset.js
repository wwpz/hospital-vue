import request from '@/utils/request'

export default {
  getHospsetList(data) {
    return request({
      url: '/hosp/hospitalset/queryPage',
      method: 'POST',
      data: data
    })
  }
}
