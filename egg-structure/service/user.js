// const delay = (data, tick) => new Promise(resolve => {
//     setTimeout(() => {
//         resolve(data);
//     }, tick);
// })

// module.exports = {
//     getName() {
//         return delay('jerry', 100);
//     },
//     // 同步
//     getAge() {
//         return 20;
//     }
// }

// 柯里化变换
module.exports = app => ({
    getName() {
        return app.$model.user.findAll();
    },
    // 同步
    getAge() {
        return 20;
    }
})