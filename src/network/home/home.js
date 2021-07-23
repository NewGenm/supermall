// 封装有关home页面的所有网络请求
// 方便管理
import { request } from '../request.js'

export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  }) 
}
