// module.exports = {
//     index: async ctx => {
//         ctx.body = '首页CTRL';
//     },
//     detail: ctx => {
//         ctx.body = '详细CTRL';
//     }
// }

// 柯里化变换
module.exports = app => ({
    'get /': app.$ctrl.home.index,
    'get /detail': app.$ctrl.home.detail
});