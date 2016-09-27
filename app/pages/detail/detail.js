const request = require('../../lib/request.js');
const api = require('../../lib/api.js');

Page({
	data: {
		nick: '',
		avatar: '',
		vid: 0,
		commentList: [],
		showSubmitLoading: false,
		showSubmitSuccessToast: false,
	},

	onReady() {
    	let app = getApp();
        wx.setNavigationBarTitle({ title: '播放-' + app.currentVideoTitle});
    },

    onLoad() {
        let app = getApp();
        let self = this;
        this.setData({ videoUrl: app.currentVideoUrl, vid: +app.vid });

        this.getUserInfo().then((userInfo) => {
        	self.setData({
        		nick: userInfo.nickName,
        		avatar: userInfo.avatarUrl
        	});
        })

        this.getCommentList().then((resp) => {
            if (resp.code !== 0) {
                // 视频列表加载失败
                return;
            }

            this.setData({ commentList: resp.data });
        });
    },

    getUserInfo() {
    	return new Promise((resolve, reject) => {
    		wx.getUserInfo({ success: (resp) => {
    			resolve(resp.userInfo);
    		}, fail: reject })
    	})
    },

    // 获取评论列表
    getCommentList() {
        let promise = request({
            method: 'GET',
            data: {vid: this.data.vid},
            url: api.getUrl('/commentList'),
        });
        return promise;
    },

    commentInputChange(e) {
    	this.data.commentContent = e.detail.value.trim();
    },

    submitComment() {
    	if (!this.data.commentContent || this.data.isSubmiting) return;

    	let params = {
        	vid: this.data.vid,
        	nick: this.data.nick,
        	avatar: this.data.avatar,
        	content: this.data.commentContent
        };

        this.setData({isSubmiting: true, showSubmitLoading: true});
    	request({
            method: 'POST',
            url: api.getUrl('/comment'),
            data: params
        }).then((resp) => {
        	this.setData({isSubmiting: false, showSubmitLoading: false});

        	if (resp.code == 0) {
        		this.setData({
        			commentList: [params].concat(this.data.commentList),
        			showSubmitSuccessToast: true,
        		});

        		setTimeout(() => {
        			this.setData( {showSubmitSuccessToast: false} );
        		}, 2000)
        	}
        });
    }
});