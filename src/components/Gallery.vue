<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { s3Imglist, s3DelImg } from '@/services/api'
import { useMessage } from 'naive-ui'

const message = useMessage()

let imgList = ref<any>([])
let picIdList = ref<any>([])
const customUrl = computed(() => {
    return JSON.parse(<string>localStorage.getItem('bz-view-token')).customUrl
})
// 图片列表
let bucketInfo = <string>localStorage.getItem('bz-view-authInfo')
// 删除图片
const delPic = (file: any) => {
    return new Promise<void>((resolve, reject) => {
        s3DelImg({ fileName: file.fileName, fileId: file.fileId, apiUrl: JSON.parse(bucketInfo).apiUrl }).then((res: any) => {
            if (res.state == 200) {
                message.success(res.message)
            } else {
                message.error(res.message)
            }
            resolve()
        })
    })
};
const delList = () => {
    let delList = imgList.value.filter((item: any) => picIdList.value.includes(item.fileId))
    let proResList =  delList.map((item: any) => {
        delPic(item)
    })
    Promise.all(proResList).then(()=>{
        getImgList()
    })
}
// 图片列表
const getImgList = () => {
    if (bucketInfo) {
        s3Imglist({ bucketId: JSON.parse(bucketInfo).allowed.bucketId, apiUrl: JSON.parse(bucketInfo).apiUrl }).then((res: any) => {
            if (res) {
                imgList.value = res.data.files
            } else {
                message.error(res.message)
            }
        })
    }
}
getImgList()


</script>

<template>
    <div class="gallery-wrap">
        <n-button @click="delList">删除</n-button>
        <n-checkbox-group v-model:value="picIdList">
            <div class="pic-wrap">
                <n-space>
                    <div class="pic-item-wrap" v-for="item, index in imgList" :key="index">
                        <n-checkbox class="pic-check" :value="item.fileId" />
                        <n-image class="image-item" width="180" height="120" lazy object-fit="cover"
                            :src="`${customUrl}${item.fileName}`">
                        </n-image>
                    </div>
                </n-space>
            </div>
        </n-checkbox-group>
    </div>
</template>
<style lang="less" scoped>
.gallery-wrap {
    flex: 1;
    margin: 20px 25px 20px 0;
    padding: 25px;
    border-radius: 10px;
    background-color: #fff;

    .pic-wrap {
        display: flex;
        flex-flow: row wrap;
        padding: 15px 0;

        .pic-item-wrap {
            position: relative;
            border: 1px solid #d8e3e7;
            border-radius: 10px;
            overflow: hidden;
            line-height: 0;
            border-top-left-radius: 3px;

            .pic-check {
                position: absolute;
                padding: 15px;
                top: -18px;
                left: -15px;
            }
        }
    }
}

@media screen and (max-width:800px) {
    .gallery-wrap {
        margin: 20px 25px;
    }
}
</style>
