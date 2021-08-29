const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);

  try {
    res.status(201).json({ status: "success", category });
  } catch {
    res.status(400).json({ status: "fail", error });
  }
};
exports.getAllCategories = async (req, res) => {
    const courses = await Category.find();
  
    try {
      res.status(200).render('courses',{courses,page_name:'courses'});
    } catch {
      res.status(400).json({ status: "fail", error });
    }
  };
  exports.getCategory = async (req, res) => {
    const course = await Course.findOne({slug: req.params.slug});
  
    try {
      res.status(200).render('course',{course,page_name:'courses'});
    } catch {
      res.status(400).json({ status: "fail", error });
    }
  };
  