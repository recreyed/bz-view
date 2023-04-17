<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import Upload from '../components/Upload.vue'
import Gallery from '../components/Gallery.vue'
import Config from '../components/Config.vue'

import { NButton } from 'naive-ui'

import { s3Login, s3Imglist, uploadFile } from '@/services/api'

import { reactive, ref, computed } from 'vue'

let areaFlag = ref(0)
const receiveAreaFlag = (data:any)=>{
  areaFlag.value = data
}


let cfgForm = reactive({
    applicationKeyId: '',
    applicationKey: '',
    customUrl: '',
    bucketName: '',
})
const auth =(form: any)=> {
    s3Login(form).then((res: any) => {
        if (res) {
            localStorage.setItem('bz-view-token', JSON.stringify(form))
            localStorage.setItem('bz-view-authInfo', JSON.stringify(res.data.authInfo))
            localStorage.setItem('bz-view-uploadInfo', JSON.stringify(res.data.uploadInfo))
        } else {
            
        }
    })
}

</script>

<template>
  <main class="main-wrap">
    <n-button>naive-ui</n-button>
    <form>
      <input type="text" v-model="cfgForm.applicationKeyId">
      <input type="text" v-model="cfgForm.applicationKey">
    </form>
    <button @click="auth(cfgForm)">提交</button>
    <!-- <NavBar @changeAreaFlag="receiveAreaFlag"></NavBar>
    <Upload v-if="areaFlag == 0"></Upload>
    <Gallery v-else-if="areaFlag == 1"></Gallery>
    <Config v-else-if="areaFlag == 2"></Config> -->
  </main>
</template>

<style lang="less" scoped>
.main-wrap{
  display: flex;
}
</style>