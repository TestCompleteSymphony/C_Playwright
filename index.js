const cucumber = require('cypress-cucumber-preprocessor').default
const sqlServer = require('cypress-sql-server');

module.exports = (on, config) => {
    on('file:preprocessor', cucumber()),
        tasks = sqlServer.loadDBPlugin(config.env.db1);
    on('task', tasks);

    on('task', {
        sqlServerDB1: sql => {
            return execSQL(sql, config.env.db1)
        },
    })
    return config
}

const tedious = require('tedious')
function execSQL(sql, config) {
    const connection = new tedious.Connection(config);
    return new Promise((res, rej) => {
        connection.on('connect', err => {
            if (err) {
                rej(err)
            }

            const request = new tedious.Request(sql, function (err, rowCount, rows) {
                return err ? rej(err) : res(rows)
            })

            connection.execSql(request)
        })
    })
}
