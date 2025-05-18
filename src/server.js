const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const serverConfig = require('./config.js');
const { engine } = require('express-handlebars');
const viewsRouter = require('./routes/views.routes');
const mainRouter = require('./routes/main.routes.js');
const model = require('./model/model.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: false
}))
app.use(cookieParser());
app.use(model);


app.use(viewsRouter);
app.use('/api', mainRouter);


const { PORT } = serverConfig;
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));