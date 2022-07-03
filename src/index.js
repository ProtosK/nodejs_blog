const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const app = express();
const port = 3000;

const route = require('./routes/index.js');
const db = require('./config/db/index');

//Connect DB
db.connect();

//use static folder (middleware điều hướng xem có phải file tĩnh không và nối path, nếu tĩnh sẽ điều hướng qua folder public)
app.use(express.static(path.join(__dirname, "public")));

//middleware cấu trúc lại dữ liệu (kiều body parser(req.body)) từ Form data thành khi sử dung mothod Post
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

// HTTP logger
app.use(morgan('combined'));
// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a+b,
    sortable:(field, sort) => {
      // field là url truyền vào
      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'oi oi-elevator',
        asc: 'oi oi-sort-ascending',
        desc: 'oi oi-sort-descending',
      }

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
      }

      const icon = icons[sortType];
      const type = types[sortType];

      return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`;
    }
}
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Action --> Dispatcher --> Function
//Routes init
route(app); //chạy web, đã được định nghĩa trong routes/index.js

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})