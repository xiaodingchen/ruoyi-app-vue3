import config from '@/config'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import {toast, showConfirm, tansParams, uniToastErr, sprintf} from '@/utils/common'
import useUserStore from "@/store/modules/user";

let timeout = 10000
const baseUrl = config.baseUrl

const request = config => {
  const userStore = useUserStore()
  // 是否需要设置 token
  config.header = config?.header || {}
  const isToken = config.headers?.isToken === false
  if (getToken() && !isToken) {
    config.header['Authorization'] = 'Bearer ' + getToken()
  }
  // get请求映射params参数
  if (config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.url = url
  }
  return new Promise((resolve, reject) => {
    uni.request({
        method: config.method || 'get',
        timeout: config.timeout ||  timeout,
        url: config.baseUrl || baseUrl + config.url,
        data: config.data,
        header: config.header,
        dataType: 'json'
      }).then(response => {
        // console.log(response, 1111, config)
        if(response.statusCode !== 200){
          toast(response.data + '')
          reject(new Error(config.url + ': ' + response.data))
          return;
        }
        const res = response.data
        const code = res?.code || 200
        const msg = errorCode[code] || res?.msg || errorCode['default']
        if (code === 401) {
          const pages = getCurrentPages()
          const currentPage = pages[pages.length - 1]
          if(currentPage.route !== 'pages/login'){
            showConfirm('登录状态已过期，您可以继续留在该页面，或者重新登录?').then(res => {
              if (res.confirm) {
                userStore.logOut().then(res => {
                  uni.reLaunch({ url: '/pages/login' })
                })
              }
            })
          }

          reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
          toast(msg)
          reject('500')
        } else if (code !== 200) {
          toast(msg)
          reject(code)
        }
        resolve(res)
      })
      .catch(error => {
        console.log('err: ', error)
        let message = error?.message || error?.errMsg || error?.toString() || error + ''
        let errMsg
        if (message.includes('Network Error')) {
          errMsg = '网络错误'
        }else if (message.includes('request:fail')) {
          errMsg = '请求异常'
        } else if (message.includes('timeout')) {
          errMsg = '请求超时'
        } else if (message.includes('Request failed with status code')) {
          errMsg = '接口异常'
        } else{
          errMsg = '未知错误'
        }
        uniToastErr(errMsg)
        if(error instanceof Error){
          reject(error)
          return
        }
        reject(new Error(sprintf('url: %s, msg: %s', config.url, message)))
      })
  })
}

export default request
