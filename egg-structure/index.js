// const app = new (require('koa'))();
// const { initRouter } = require('./loader');
// app.use(initRouter().routes());

// app.listen(3000);

const App = require('./app');
const app = new App();

app.start(3000);