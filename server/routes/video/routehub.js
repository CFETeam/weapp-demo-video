module.exports = (router) => {
    // 获取视频列表
    router.get('/list', require('./handlers/list'));

    // 获取评论列表
    router.get('/commentList', require('./handlers/commentlist'));

    // 提交评论
    router.post('/comment', require('./handlers/comment'));
};