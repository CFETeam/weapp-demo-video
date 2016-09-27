const RouterBase = require('../../../common/routerbase');
const config = require('../../../config');
const mysql = require('mysql');

class VideoList extends RouterBase {
    handle() {
        //CDB Mysql配置
        let connection = mysql.createConnection({
            host: config.host,
            password: config.password,
            user: config.user,
            database: config.database
        });

        let pageNo = this.req.query.pageNo;
        let pageSize = 6;
        let start = (pageNo - 1) * pageSize;

        //开启数据库连接
        connection.connect((err) => {
            if (err) {
                this.res.json({ code: -1, msg: 'failed', data: {} });
            }
        });

        //查询列表
        Promise.all([
            this.queryList(start, pageSize, connection),
            this.queryTotalPage(pageSize, connection)
        ]).then(([list, totalPage]) => {
            this.res.json({
                code: 0,
                msg: 'ok',
                data: {list, totalPage}
            });
        })

        //查询完后关闭连接
        connection.end();
    }

    //查询分页列表
    queryList(start, pageSize, connection) {
        return new Promise((resolve, rejct) => {
            connection.query('SELECT * from video limit ?,?', [start, pageSize], (err, result) => {
                if (err) {
                    this.res.json({ code: -1, msg: 'failed', data: {} });
                    return;
                }

                resolve(result);
            })
        })
    }

    //查询总页数
    queryTotalPage(pageSize, connection) {
        return new Promise((resolve, rejct) => {
            connection.query('SELECT count(*) as count from video', (err, result) => {
                if (err) {
                    this.res.json({ code: -1, msg: 'failed', data: {} });
                    return;
                }

                resolve(Math.ceil(result[0].count / pageSize));
            })
        })
    }
}

module.exports = VideoList.makeRouteHandler();