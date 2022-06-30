<template>
  <div class="navbar ">
    <div class="navbar-left">
      <hamburger
        v-if="settings.showHamburger"
        :is-active="opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <breadcrumb class="breadcrumb-container" v-if="device!=='mobile'"/>
    </div>
   
    <div class="navbar-right right-menu">
      <template v-if="device!=='mobile'">
        <ScreenFull class="right-menu-item"/>
        <SizeSelect class="right-menu-item"/>
        <LangSelect class="right-menu-item"/>
      </template>
      <el-dropdown trigger="click" size="default" class="right-menu-item">
        <div class="avatar-wrapper">
          <img src="@/assets/layout/animation-image.gif" class="user-avatar" />
          <CaretBottom style="width: 1em; height: 1em; margin-left: 4px" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item divided @click="loginOut">login out</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import SizeSelect from '@/components/SizeSelect/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ScreenFull from '@/components/ScreenFull/index.vue'

import { CaretBottom } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb'
import Hamburger from './Hamburger'
import { computed, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
const store = useStore()
let settings = computed(() => {
  return store.state.app.settings
})
let device = computed(() => {
  return store.state.app.device
})
const opened = computed(() => {
  return store.state.app.sidebar.opened
})
const toggleSideBar = () => {
  store.commit('app/TOGGLE_SIDEBAR_OPENED')
}
/*
 * 退出登录
 * */
const loginOut = () => {
  store.dispatch('user/logout').then(() => {
    // ElMessage({ message: '退出登录成功', type: 'success' })
    // record the back point
    //此处reload清空路由和重置部分状态
    location.reload()
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  height: $navBarHeight;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .navbar-left,.navbar-right{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
.navbar-left{
  .hamburger-container,.breadcrumb-container{
    margin-left: 20px;
  }
}
//drop-down
.right-menu {
  cursor: pointer;
  .right-menu-item{
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
  }
  &>.right-menu-item:last-child{
    margin-right: 12px;
  }
}
//logo
.avatar-wrapper {
  margin-top: 5px;

  cursor: pointer;
  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
}




</style>
