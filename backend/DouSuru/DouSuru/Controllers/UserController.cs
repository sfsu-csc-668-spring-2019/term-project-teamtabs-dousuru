using Microsoft.AspNetCore.Mvc;

namespace DouSuru.Controllers {
    [Route("user/")]
    public class UserController : Controller {
        
        [HttpGet("search")]
        public ActionResult GetUserGlobalSearch() {
            return Json(new { authentication = false });
        }

        [HttpGet("id/{userId}")]
        public ActionResult GetUserPage(int userId) {
            return Json(new { authentication = false, userId });
        }

        [HttpGet("id/{userId}/chatlog/{chatId}")]
        public ActionResult GetUserChatlog(int userId, int chatId) {
            return Json(new { authentication = false, userId, chatId });
        }

        [HttpGet("id/{userId}/configuration")]
        public ActionResult GetUserConfiguration(int userId) {
            return Json(new { authentication = false, userId });
        }

        [HttpGet("id/{userId}/notification")]
        public ActionResult GetUserNotification(int userId) {
            return Json(new { authentication = false, userId });
        }
        
        [HttpPost("search")]
        public ActionResult PostUserGlobalSearch([FromBody]string body) {
            return Json(new { authentication = false });
        }

        [HttpPost("id/{userId}/chatlog/id/{chatId}")]
        public ActionResult PostUserChatlog([FromBody]string body, int userId, int chatId) {
            return Json(new { authentication = false, userId, chatId });
        }

        [HttpPost("id/{userId}/chatlog/id/{chatId}/search")]
        public ActionResult PostUserChatlogSearch([FromBody]string body, int userId, int chatId) {
            return Json(new { authentication = false, userId, chatId });
        }

        [HttpPost("id/{userId}/configuration")]
        public ActionResult PostUserConfiguration([FromBody]string body, int userId) {
            return Json(new { authentication = false, userId });
        }

        [HttpPost("id/{userId}/notification")]
        public ActionResult PostUserNotification([FromBody]string body, int userId) {
            return Json(new { authentication = false, userId });
        }

        [HttpPost("id/{userId}/search")]
        public ActionResult PostUserSearch([FromBody]string body, int userId) {
            return Json(new { authentication = false, userId });
        }

    }
}
