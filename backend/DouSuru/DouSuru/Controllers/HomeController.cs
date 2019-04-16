using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using DouSuru.DAL;
using DouSuru.Data;
using System.Diagnostics;

namespace DouSuru.Controllers {
    [Route("/")]
    public class HomeController : Controller {
        private IConfiguration _configuration;
        private ApplicationDbContext _context;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
            Debug.Write("Hey im here");
           _context = new ApplicationDbContext(options =>
                options.UseNpgsql(
                    Configuration.GetConnectionString("DefaultConnection")));
        }

        [HttpGet("")]
        public ActionResult GetHomeIndex() {
            Debug.Write(_configuration);
            return Json(new { authentication = false });
        }

        [HttpGet("about")]
        public ActionResult GetHomeAbout() {
        //DbContext.Database.SqlQuery<dynamic>("INSERT INTO organizations VALUES (test, description, NULL)");

        //var results = DbContext.Database.SqlQuery<dynamic>("SELECT * FROM organizations").ToList();


            return Json(new{ a = true});
            //return Json(new { authentication = false, results });
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
