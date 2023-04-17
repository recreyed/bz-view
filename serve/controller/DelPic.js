//文件列表
const { requestAuth } = require(process.cwd() + "/common/axios")

const getDelPic = async (req, res, next) => {
    requestAuth({
        url: `${req.body.apiUrl}/b2api/v2/b2_delete_file_version`,
        method: 'post',
        headers: { 'Authorization': req.headers.authorization },
        data: { fileName: req.body.fileName, fileId: req.body.fileId }
    }).then(response => {
        sendJson(res, 200, "操作成功", response)
    })
}

module.exports = {
    getDelPic
}