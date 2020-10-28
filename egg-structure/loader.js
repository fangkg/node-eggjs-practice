const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

function load(dir, cb) {
    // 相对路径转成绝对路径
    const url = path.resolve(__dirname, dir);
    // 读取文件列表
    const files = fs.readdirSync(url);
    files.forEach(filename => {
        // 转码去掉后缀
        filename = filename.replace('.js', '');
        // 加载文件
        const file = require(url + '/' + filename);
        // 加载后执行回调函数
        cb(filename, cb);
    })
}

// 初始化路由
function initRouter(app) {
    const router = new Router();
    load('routes', (filename, routes) => {
        // 计算前缀
        const prefix = filename === 'index' ? '' : `/${filename}`;
        // 路由类型判断
        routes = typeof routes === 'function' ? routes(app) : routes;
        // 遍历添加路由
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ');
            console.log(`正在映射地址：${method.toLocaleUpperCase()} ${prefix + path}`);
            // router[method](prefix + path, routes[key]);
            // 注册
            router[method](prefix + path), async ctx => {
                app.ctx = ctx;
                await routes[key](app);
            }
        })
    });

    return router;
}


function initController() {
    const controllers = {};
    load('controller', (filename, controller) => {
        controllers[filename] = controller;
    })
    return controllers;
}

function initService(app) {
    const services = {}
    load('service', (filename, service) => {
        services[filename] = service(app);
    })
    return services;
}

const Sequelize = require('sequelize');
function loadConfig(app) {
    load('config', (filename, conf) => {
        if (conf.db) {
            app.$db = new Sequelize(conf.db);

            // 加载模型
            app.$model = {};
            load('model', (filename, { schema, options }) => {
                app.$model[filename] = app.$db.define(filename, schema, options);
            });
            // 模型同步
            app.$db.sync();
        }

        if (conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware', mid);
                app.$app.use(require(midPath))
            })
        }
    })
}

const schedule = require('node-schedule');
function initSchedule() {
    load('schedule', (filename, scheduleConfig) => {
        schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
    })
}


module.exports = { initRouter, initController, initService, loadConfig, initSchedule }