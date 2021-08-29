const Course = require("../models/Course");
const Category = require("../models/Category");

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  
  try {
    res.status(201).json({ status: "success", course });
  } catch {
    res.status(400).json({ status: "fail", error });
  }
};
exports.getAllCourses = async (req, res) => {
  
    const categorySlug =  req.query.categories;
    console.log(categorySlug)
    const category = await Category.findOne({slug:categorySlug}) 
  let filter={};
    if(categorySlug){
       filter= {category:category._id}
    }


  const courses = await Course.find(filter);
  const categories = await Category.find();



    try {
      res.status(200).render('courses',{courses,categories,page_name:'courses'});
    } catch {
      res.status(400).json({ status: "fail", error });
    }
  };
  exports.getCourse = async (req, res) => {
  try   
    {
      const course = await Course.findOne({slug: req.params.slug});
      res.status(200).render('course',{course,page_name:'courses'});
    } catch {
      res.status(400).json({ status: "fail", error });
    }
  };
  