const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator')
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');


exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(200).redirect("/users/dashboard");

  } catch (error) {     
    const errors = validationResult(req)  
    console.error(errors)
    for(let i = 0; i < errors.array().length; i++) {       
       req.flash('error',`${errors.array()[i].msg}`)
  }
    res.status(400).redirect("/register");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id;
            res.status(200).redirect("/users/dashboard");
          }else{
            req.flash('error',`Your Password is Not Correct!`)
            res.status(200).redirect("/login");

          }
          
        });
      }
      else{
        req.flash('error',`Email is not correct!`)
        res.status(200).redirect("/login");

      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");

  });
}
exports.getDashboardPage = async (req, res) => {
  const user = await User.findById({ _id: req.session.userID }).populate('courses');
  const users = await User.find();
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    users,
    categories,
    courses
  });
};exports.deleteUser = async (req, res) => { 
  try {
    const user =await User.findByIdAndRemove(req.params.id);
    const courses = await Course.deleteMany({user:req.params.id})
    req.flash('error',`${user.name} has been removed successfully`);
    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};