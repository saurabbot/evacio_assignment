const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const passport = require('passport');
const passportLocal = require('passport-local');
const session = require('express-session');
const methodOverride = require('method-override');



// Routes
const authRoutes = require('./routes/auth');
const bagsRoutes = require('./routes/bags');
const inventoryRoutes = require('./routes/inventory');
const usersRoutes = require('./routes/users');
//app connect
const app = express();
//connect to database.
const uri = 'mongodb+srv://shyam:password%40123@cluster0.vt0xb.mongodb.net/evacioData?retryWrites=true&w=majority';
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({
  secret: 'MySuperSecret',
  saveUninitialized: true,
  resave: false,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
const port = process.env.PORT || 3000;

app.use("/", authRoutes);
app.use("/bag", bagsRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/users", usersRoutes);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
