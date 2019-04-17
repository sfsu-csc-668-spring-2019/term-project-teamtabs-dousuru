using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using DouSuru.DAL;
using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using System;

namespace DouSuru.Controllers {
    [Route("/")]
    public class HomeController : Controller {
        private IConfiguration _configuration;
        private DouSuruContext _context;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
           _context = new DouSuruContext(configuration);
        }

        [HttpGet("")]
        public ActionResult GetHomeIndex() {
            //TODO SEPERATE QUERIES INTO RELEVANT CLASSES
            string _insertQuery = "INSERT INTO users (user_name, password, display_name) VALUES ('Billy', 'Ian', 'Henry');";
            _context
                .Database
                .ExecuteSqlCommand(_insertQuery);
            
            var data = _context.User.FromSql("select * from users;");
            return Json(new { authentication = false, data });
        }

        [HttpGet("about")]
        public ActionResult GetHomeAbout() {
            return Json(new{ a = true});
        }

        [HttpGet("privacy")]
        public ActionResult GetHomePrivacy() {
            return Json(new { authentication = false });
        }

        [HttpGet("login")]
        public ActionResult GetHomeLogin() {
            return Json(new { authentication = false });
        }

        [HttpGet("logout")]
        public ActionResult GetHomeLogout() {
            return Json(new { authentication = false });
        }

        [HttpGet("register")]
        public ActionResult GetHomeRegister() {
            return Json(new { authentication = false });
        }

        [HttpPost("login")]
        public ActionResult PostHomeLogin([FromBody]string body) {
            return Json(new { authentication = false });
        }

        [HttpPost("register")]
        public ActionResult PostHomeRegister([FromBody]string body) {
            return Json(new { authentication = false });
        }

    }
}
