<template>
  <div class="dashboard-container scroll-y">
    <Admin v-if="roles.includes('admin')" />
    <Editor v-else />
    <hr>
    <div>
      <h3 class='mb-2'>配置文件setting.js</h3>
      <div class="rowSS">
        <div class="mb-1">
          页面布局
          <div class="mt-2">
            侧边导航LOGO：
            <el-switch v-model="store.state.app.settings.sidebarLogo" />
          </div>
          <div class="mt-3">
            侧边菜单：
            <el-switch v-model="store.state.app.settings.showLeftMenu" />
          </div>
          <div class="mt-3">
            侧边导航菜单-折叠按钮：
            <el-switch v-model="store.state.app.settings.showHamburger" />
          </div>

          <div class="mt-3">
            顶部标签栏：
            <el-switch v-model="store.state.app.settings.showTagsView" />
          </div>
          <div class="mt-3">
            顶部导航：
            <el-switch v-model="store.state.app.settings.showTopNavbar" />
          </div>
        </div>

        <div class="mb-1 ml-6">
          页面相关动画
          <div class="mt-3">
            页面加载进度条：
            <el-switch v-model="store.state.app.settings.isNeedNprogress" />
          </div>
        </div>
      </div>
      <div class="mt-2 mb-1">使用 store.commit 改变</div>
      <el-button type="primary" @click="testChangeSettings">测试改变 Settings</el-button>
    </div>
  </div>
</template>

<script setup>
import Admin from './Admin'
import Editor from './Editor'

import { computed,getCurrentInstance, ref} from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const roles = computed(() => {
  return store.state.user.roles
})

let settings = computed(() => {
  return store.state.app.settings || {}
})

const testChangeSettings = () => {
  store.commit('app/SET_SETTINGS', { sidebarLogo: !settings.value.sidebarLogo })
}

let source = ref(false)
const sourceFun = () => {
  source.value = !source.value
}

const handle = () => {
  new Promise((resolve, reject) => {
    reject('reject promise')
  }).then((res) => {
    console.log('ok')
  })
}

let flag = ref(null)

const consoleErrorFun = () => {
  console.error('console.error')
}

const normalError = () => {
  throw new Error(' throw new Error("")\n')
}
let updateReq = () => {
  return axiosReq({
    // baseURL: 'http://8.135.1.141/micro-service-test',
    url: '/integration-front/brand/updateBy',
    data: { id: 'fai' },
    method: 'put',
    isParams: true,
    bfLoading: true
  }).then(() => {})
  // .catch((err) => {
  //   console.log('接口catch', err)
  // })
}
</script>

<style scoped lang="scss"></style>
