const config = require('../../config.js');
const util = require('../../lib/util.js');
const request = require('../../lib/request.js');
const api = require('../../lib/api.js');

Page({
    data: {
        // 视频列表数据
        videoList: [],

        // 列表布局数据,
        layerList: [],

        //一行几个
        layoutColumnSize: 2,

        //当前加载页
        curPage: 1,

        //总页数
        totalPage: 1,

        //是否显示加载图标
        showLoding: true
    },

    onLoad() {
        this.getVideoList();
    },

    // 获取相册列表
    getVideoList() {
        request({
            data: {pageNo: this.data.curPage},
            method: 'GET',
            url: api.getUrl('/list'),
        }).then((resp) => {
            if (resp.code !== 0) {
                // 视频列表加载失败
                return;
            }
            this.setData({totalPage: resp.data.totalPage});
            this.renderVideoList(resp.data.list);
        });
    },

    // 渲染影片列表
    renderVideoList(videoList) {
        let layoutColumnSize = this.data.layoutColumnSize;
        videoList = this.data.videoList.concat(videoList);
        this.setData({ videoList: videoList });

        let layoutList = [];
        if (videoList.length) {
            layoutList = util.listToMatrix(videoList, layoutColumnSize);
        }

        setTimeout(() => {
            this.setData({ layoutList: layoutList, showLoding: false});
        }, 500)
    },

    //滚动到底部时触发
    scrollToLower(e) {
        if (this.data.showLoding || this.data.curPage == this.data.totalPage) return;

        this.setData( {curPage: ++this.data.curPage, showLoding: true} )
        this.getVideoList();
    },

    //播放影片
    gotoPlay(event) {
        let currentVideoUrl = event.currentTarget.dataset.src;
        let currentVideoTitle = event.currentTarget.dataset.title;
        let vid = event.currentTarget.dataset.vid;
        if (!currentVideoUrl || !currentVideoTitle || !vid) return;

        let app = getApp();
        app.currentVideoUrl = currentVideoUrl;
        app.currentVideoTitle = currentVideoTitle;
        app.vid = vid;

        wx.navigateTo({ url: '../detail/detail' });
    },
});