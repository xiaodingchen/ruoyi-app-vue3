<script setup>
import {getCurrentInstance} from "vue"
import { onLaunch } from '@dcloudio/uni-app'
import './permission'
import pagesJson from './pages.json'
import config from "@/config";
import {getToken} from "@/utils/auth"; // permission

const {proxy} = getCurrentInstance()

onLaunch(() => {
  initApp()
})
function initApp(){
  initConfig()
  //#ifdef H5
  checkLogin()
  //#endif
}
function initConfig(){
  proxy.globalData.config = config
  proxy.globalData.pages = pagesJson
}
function checkLogin() {
  if (!getToken()) {
    proxy.$tab.reLaunch('/pages/login')
  }
}
</script>

<style lang="scss">
@import "uview-plus/index.scss";
@import '@/static/scss/index.scss';
</style>
