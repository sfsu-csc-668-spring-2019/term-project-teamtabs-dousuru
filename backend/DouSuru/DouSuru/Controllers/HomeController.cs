using Microsoft.AspNetCore.Mvc;

namespace DouSuru.Controllers {
    [Route("/")]
    public class HomeController : Controller {

        [HttpGet("")]
        public ActionResult GetHomeIndex() {
            return Json(new { authentication = false });
        }

        [HttpGet("about")]
        public ActionResult GetHomeAbout() {
            return Json(new { authentication = false });
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
