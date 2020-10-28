module.exports = {
    'get /': async ctx => {
        ctx.body = '首页';
    },
    'get /detail': ctx => {
        ctx.body = '详细页面';
    }
}