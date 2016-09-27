const RouterBase = require('../../../common/routerbase');
const config = require('../../../config');
const mysql = require('mysql');

class CommentList extends RouterBase {
    handle() {
        let vid = this.req.query.vid;
        if (!vid) {
            this.res.json({ code: -1, msg: 'failed', data: {} });
            return;
        }

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
                this.res.json({ code: -1, msg: 'failed', data: {} });
            }
        });

        //查询列表
        connection.query('SELECT * from comment where vid = ? order by id desc', [vid], (err, result) => {
            if (err) {
                this.res.json({ code: -1, msg: 'failed', data: {} });
                return;
            }

            this.res.json({
                code: 0,
                msg: 'ok',
                data: result,
            });
        });

        //查询完后关闭连接
        connection.end();
    }
}

module.exports = CommentList.makeRouteHandler();