/* eslint-disable no-unused-vars */
let express     = require('express'),
    cors        = require('cors'),
    mongoose    = require('mongoose'),
    database    = require('./database'),
    bodyParser  = require('body-parser'),
    createError = require('http-errors')

// Connect MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully.');
}, error => {
    console.log('Cannot connect to database ' + error);
})

const jobPostAPI = require('./routes/jobPost.route');
const categoriesAPI = require('./routes/category.route');
const clientDetailAPI = require('./routes/clientDetail.route');
const freelancerDetailAPI = require('./routes/freelancerDetail.route');
const jobApplicationAPI = require('./routes/jobApplication.route');
const cityAPI = require('./routes/city.route');
const lastLoginAPI = require('./routes/lastLogin.route');
const freelancerProjectAPI = require('./routes/freelancerProject.route');
const activityAPI = require('./routes/activity.route');
const archivedJobAPI = require('./routes/archivedJob.route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

// Cors
app.use(cors());

// Serve static files from the "public" directory
app.use(express.static('public'));

// API
app.use('/api', jobPostAPI, categoriesAPI, clientDetailAPI, freelancerDetailAPI, jobApplicationAPI, cityAPI, lastLoginAPI, freelancerProjectAPI, activityAPI, archivedJobAPI);

// CREATE PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connect to port ' + port);
})

// 404 Handler
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})