import axios from './http/index'

export default {
    // 测试axios
    testAxios(data: any) {
        return axios({ url: '/user/test', method: 'get', params: data })
    },
}
