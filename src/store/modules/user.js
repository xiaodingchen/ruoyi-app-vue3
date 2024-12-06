import {defineStore} from "pinia";
import {getToken, removeToken, setToken} from "@/utils/auth";
import storage from "@/utils/storage";
import constant from "@/utils/constant";
import {getInfo, login, logout} from "@/api/login";


const useUserStore = defineStore('userStore', {
    state: ()=>{
        return {
            token: getToken(),
            name: storage.get(constant.name),
            avatar: storage.get(constant.avatar),
            roles: storage.get(constant.roles),
            permissions: storage.get(constant.permissions)
        }
    },
    actions:{
        // 登录
        login(userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                login(username, password, code, uuid).then(res => {
                    setToken(res.token)
                    this.token = res.token
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        getInfo() {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    const user = res.user
                    const defAva = "/static/images/profile.jpg"
                    const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;

                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        this.roles = res.roles
                        this.permissions = res.permissions
                    } else {
                        this.roles = ['ROLE_DEFAULT']
                    }
                    this.id = user.userId
                    this.name = user.userName
                    this.avatar = avatar
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 退出系统
        logOut() {
            return new Promise((resolve, reject) => {
                logout(this.token).then(() => {
                    this.token = ''
                    this.roles = []
                    this.permissions = []
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        setAvatar(avatar){
            this.avatar = avatar
        },
    }
})

export default useUserStore
