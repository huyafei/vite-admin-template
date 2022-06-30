<template>
  <div>
    <el-button v-permission="['admin']">admin 角色显示 </el-button>
    <el-button v-permission="['editor']">editor 角色显示</el-button>
    <el-button v-permission="['admin', 'editor']">editor 和 admin 显示</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
