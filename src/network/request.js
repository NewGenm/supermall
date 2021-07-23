import axios from 'axios'
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    // axios的拦截器
    // 请求拦截
    instance.interceptors.request.use((config) => {
        // 拦截请求后可以做哪些功能
        // 1.比如config中的一些信息不符合服务的要求

        // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标

        // 3.某些网络请求（比如访问需要登陆的页面），必须携带一些特殊的信息，没有就提示登陆
        // console.log(config)
        // 请求拦截后如果不返回，前端是拿不到请求的，需要返回请求
        return config
    }, (err) => console.log(err)
    )

    // 响应拦截
    instance.interceptors.response.use(
        (res) => {
            // console.log(res)
            // 同样需要返回，返回data就行，这是需要的数据
            return res.data
        },
        // (err) => console.log(err)
        )
    // axios.create创建的instance就是一个promise
    return instance(config)

}