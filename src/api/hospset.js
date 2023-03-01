import request from '@/utils/request'

export default {
  getHospsetList(data) {
    return request({
      url: '/hosp/hospitalset/queryPage',
      method: 'POST',
      data: data
    })
  },
  updateHospset(data){
    return request({
      url: '/hosp/hospitalset/update',
      method: 'PUT',
      data: data
    })
  },
  removeHospsetById(val){
    return request({
      url: '/hosp/hospitalset/deletes/' + val,
      method: 'DELETE',
    })
  },
  removeHospsetByIds(data){
    return request({
      url: '/hosp/hospitalset/deletes',
      method: 'DELETE',
      data: data
    })
  }
}
