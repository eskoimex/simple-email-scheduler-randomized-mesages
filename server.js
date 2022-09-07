const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
require('dotenv').config();

// Init app
const app = express();

// View Engine
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// methodOverride
app.use(methodOverride('_method'));


const port = process.env.PORT || 4000;
const host = process.env.HOST;

//ROUTES
const userRoutes = require('./routes/user.routes');

//ENDPOINTS
// app.use('/api/v1/', userRoutes.routes);
//FRONTEND VIEW
app.use('/', userRoutes.routes);

app.listen(port, () => console.log(`App is listening on the url ${host} at ` + port));
