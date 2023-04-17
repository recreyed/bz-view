//文件列表
const { requestAuth } = require(process.cwd() + "/common/axios")

const getImgList = async (req, res, next) => {
    requestAuth({
        url: `${req.body.apiUrl}/b2api/v2/b2_list_file_names`,
        method: 'post',
        headers: { 'Authorization': req.headers.authorization },
        data: { bucketId: req.body.bucketId }
    }).then(response => {
        sendJson(res, 200, "操作成功", response)
    })
}

module.exports = {
    getImgList
}