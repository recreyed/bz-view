<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { ArchiveOutline } from '@vicons/ionicons5'
import { uploadFile } from '@/services/api'


let fileList = ref<any[]>([])


const handleUploadChange = (data: any) => {
    console.log(data);
    
    fileList.value = data.fileList
}
// 上传
const uploadArray = () => {
    fileList.value.forEach((item: any) => {
        upload(item)
    })
}
const upload = (fileItem: any) => {
    let file = fileItem.file;

    let uploadBody = {
        uploadUrl: JSON.parse(<string>localStorage.getItem('bz-view-uploadInfo')).uploadUrl,
        token: JSON.parse(<string>localStorage.getItem('bz-view-uploadInfo')).authorizationToken,
        name: file.name,
    };
    const fileData = new FormData()
    fileData.append("file_", file)


    uploadFile(fileData,uploadBody).then(res => {
    })
}
</script>

<template>
    <div class="upload-wrap">
        <n-upload multiple directory-dnd :default-upload="false" v-model:file-list="fileList" @change="handleUploadChange"
            :max="5">
            <n-upload-dragger>
                <div style="margin-bottom: 12px">
                    <n-icon size="48" :depth="3">
                        <ArchiveOutline />
                    </n-icon>
                </div>
                <span>点击或者拖动文件到该区域来上传</span>
            </n-upload-dragger>
        </n-upload>
        <n-button @click="uploadArray">上传</n-button>
    </div>
</template>
<style lang="less" scoped>
.upload-wrap {
    flex: 1;
    margin: 20px 25px 20px 0;
    border-radius: 10px;
    height: calc(100vh - 40px);
    background-color: #fff;
}
</style>
