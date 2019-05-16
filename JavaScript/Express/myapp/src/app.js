// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//     res.send('hello, world!');
// });

// app.get('/user', (req, res) =>{
//    res.send('/user'); 
// });

// app.use('/static', express.static('static'));

// app.listen(3111, () => {
//     console.log('example app listening on port 3111');
// });
const Vue = require('vue');
const koa = require('koa');
const { createRenderer } = require('vue-server-renderer')

const app = new koa();
const renderer = createRenderer({
    template: require('fs').readFileSync(__dirname + '/static/index.html', 'utf8');
});


app.use(async ctx => {
    //ctx.body = 'hello, koa2';
    
});

app.listen(3001);

console.log('[demo] start-quick is starting at port 3001');

