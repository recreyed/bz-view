import requestAuth from './authHttp';
import requestCom from './commonHttp';

const AUTH_URL = '/auth'
const UPLOAD_URL = '/upload'
const LIST_URL = '/list'
const IMG_ITEM_URL = '/img'
// 登录授权接口
export function s3Login(auth: any) {
    return requestAuth.post(AUTH_URL, { applicationKeyId: auth.applicationKeyId, applicationKey: auth.applicationKey })
}

// 登录
// export function s3Login(auth: any) {
//     return requestAuth({
//         url: '/auth',
//         method: 'post',
//         data: { applicationKeyId: auth.applicationKeyId, applicationKey: auth.applicationKey }
//     })
// }
// 查看文件列表
export function s3Imglist(bucket: any) {
    return requestCom({
        url: '/imglist',
        method: 'post',
        data: { bucketId: bucket.bucketId, apiUrl: bucket.apiUrl }
    })
}
// 上传文件
export function uploadFile(file: any, uploadBody: any) {
    return requestAuth({
        url: '/upload',
        method: 'post',
        headers: {
            'Authorization': uploadBody.token,
            'X-Bz-File-Name': uploadBody.name,
            'X-Bz-Info-UploadUrl': uploadBody.uploadUrl,
        },
        data: file
    })
}
// 删除文件
export function s3DelImg(file: any) {
    return requestCom({
        url: '/delPic',
        method: 'post',
        data: { fileName: file.fileName, fileId: file.fileId, apiUrl: file.apiUrl }
    })
}