exports.getAboutPage = (req, res) => {
    res.status(200).render("about",{
        page_name:"about"
    })
  }
  exports.getIndexPage = (req, res) => {
    res.status(200).render("index",{
        page_name:"index"
    })
  }
  exports.getContactPage = (req, res) => {
    res.status(200).render("contact",{
        page_name:"contact"
    })
  }
  exports.getLoginPage = (req, res) => {
    res.status(200).render("login",{
        page_name:"login"
    })
  }