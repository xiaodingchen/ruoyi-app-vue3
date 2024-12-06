<script setup>
import {ref} from "vue"
import {onLoad} from "@dcloudio/uni-app";
import {isEmpty} from "@/utils/common";

const props = defineProps({
  title: {type: String, default: ''},
  back: {type: Boolean, default: false}
})

const statusBarHeight = ref(0) //手机状态栏的高度，这个状态来就是手机顶部的电量啊，信号这些区域的高度，如果是刘海屏，它还会包含刘海屏的高度
const menuButtonInfo = ref({})//胶囊信息,就是微信小程序自带的那个有关闭，分享按钮的胶囊。
const navBarHeight =  ref(0)//状态栏与胶囊按钮中的空隙
const showTitle = ref()

function handleBack(){
  uni.navigateBack()
}


onLoad(()=>{
  //缓存中没有的话就执行下面方法：
  statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight
  // #ifndef H5 || APP
  menuButtonInfo.value = uni.getMenuButtonBoundingClientRect()
  // #endif

  //然后计算出navBarHeight
  if(isEmpty(menuButtonInfo.value) || statusBarHeight < 1){
    navBarHeight.value = 50
  }else{
    navBarHeight.value = (menuButtonInfo.value.bottom - statusBarHeight.value) + (menuButtonInfo.value.top - statusBarHeight.value) //状态栏与胶囊按钮中的空隙
  }

  showTitle.value = props.title
  if(isEmpty(showTitle.value)){
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    console.log(currentPage, 'currentPage')
    showTitle.value = getApp().globalData?.pages?.pages?.find(item=>item.path === currentPage.route)?.style?.navigationBarTitleText || ''
  }
})
</script>

<template>
  <view :style="{height: (statusBarHeight+navBarHeight)+'px'}"></view>
  <view class="top" :style="{height: (statusBarHeight+navBarHeight)+'px'}">
    <view :style="{height: statusBarHeight+'px'}"></view>
    <view class="nav" :style="{height: navBarHeight+'px'}">
      <image v-if="!back" class="menuImage" src="/static/logo.png" />
      <view v-if="back" class="menuImage" @click="handleBack">
        <uni-icons type="left" size="30" color="#fff"></uni-icons>
      </view>
      <text class="menuText" v-if="showTitle">{{showTitle}}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
$fsize: 0.01rem;
$text-color-one: #333333;

.top {
  position: fixed;
  left: 0 * $fsize;
  top: 0 * $fsize;
  width: 100%;
  z-index: 99;
  background-color: #27213D;
}
.nav{
  display: flex;
  flex-direction: row;
  align-items: center;
  .menuText {
    color: #fff;
    font-size: 32rpx;
    font-weight: 500;
    flex: 1;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }

  .menuImage {
    margin-left: 3px;
    width: 90rpx;
    height: 69rpx;
  }
}
</style>
