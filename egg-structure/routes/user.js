// module.exports = {
//     'get /': async ctx => {
//         ctx.body = '用户首页';
//     },
//     'get /info': ctx => {
//         ctx.body = '用户详情页面';
//     }
// }

module.exports = {
    'get /': async app => {
        const name = await app.$service.user.getName();
        app.ctx.body = '用户：' + name;
    },
    'get /info': app => {
        app.ctx.body = '用户详情：' + app.$service.user.getAge();
    }
}