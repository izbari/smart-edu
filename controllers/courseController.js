const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);

  try {
    res.status(201).json({ status: "success", course });
  } catch {
    res.status(400).json({ status: "fail", error });
  }
};
exports.getAllCourses = async (req, res) => {
    const courses = await Course.find();
  
    try {
      res.status(200).render('courses',{courses,page_name:'courses'});
    } catch {
      res.status(400).json({ status: "fail", error });
    }
  };
  exports.getCourse = async (req, res) => {
    const course = await Course.findOne({slug: req.params.slug});
  
    try {
      res.status(200).render('course',{course,page_name:'courses'});
    } catch {
      res.status(400).json({ status: "fail", error });
    }
  };
  