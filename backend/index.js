
const express = require('express');
const bodyparser = require('body-parser')
var cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({
        msg: 'Hello World'
    })
});

app.use('/auth', require('./routes/authRoutes'));
app.use('/restaurant', require('./routes/restaurantRoutes'));
app.use('/notification', require('./routes/notificationRoutes'));
app.use('/menu', require('./routes/menuRoutes'));
app.use('/order', require('./routes/orderRoutes'));
app.use('/history', require('./routes/orderHistoryRoutes'));


app.listen(5000, () => {
    console.log('App Listening on port 5000');
});
