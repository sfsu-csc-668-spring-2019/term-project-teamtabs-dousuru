using DouSuru.DAL;
using DouSuru.Models.QueriesContainer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

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
            // RUN TEST
            /*
            QueriesContainer.Execute( QueriesContainer.CREATE_USER, _context, JObject.FromObject( new {
                user_name = "a3",
                password = "b3",
                display_name = "c3",
                icon = "d3",
                email = "e3"
            } ) );
            */
            var data = QueriesContainer.Execute( QueriesContainer.GET_USER_INFORMATION_BY_USER_NAME, _context, JObject.FromObject( new
            {
                user_name = "a3"
            } ) );
            
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
