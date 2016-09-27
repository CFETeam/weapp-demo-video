const RouterBase = require('../../../common/routerbase');
const config = require('../../../config');
const mysql = require('mysql');

class Comment extends RouterBase {
    handle() {
        let req = this.req;
        let comment = Object.assign({}, {
            vid: req.body.vid,
            nick: req.body.nick,
            avatar: req.body.avatar,
            content: req.body. content
        });

        //CDB Mysql配置
        let connection = mysql.createConnection({
            host: config.host,
            password: config.password,
            user: config.user,
            database: config.database
        });

        //开启数据库连接
        connection.connect((err) => {
            if (err) {
                this.res.json({ code: -1, msg: 'failed'});
            }
        });

        //提交评论
        connection.query('INSERT INTO comment SET ?', comment, (err, result) => {
            if (err) {
                this.res.json({ code: -1, msg: 'failed'});
                return;
            }

            this.res.json({
                code: 0,
                msg: 'ok'
            });
        });

        //提交完后关闭连接
        connection.end();
    }
}

module.exports = Comment.makeRouteHandler();