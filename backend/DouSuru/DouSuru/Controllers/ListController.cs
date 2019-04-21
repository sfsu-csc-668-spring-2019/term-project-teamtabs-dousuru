using Microsoft.AspNetCore.Mvc;

namespace DouSuru.Controllers {
    [Route("organization/id/{organizationId}/project/id/{projectId}/list/")]
    public class ListController : Controller {

        [HttpGet("create")]
        public ActionResult GetListCreate(int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpGet("id/{listId}")]
        public ActionResult GetListPage(int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpGet("id/{listId}/chatlog/")]
        public ActionResult GetListChatlog(int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpGet("id/{listId}/configuration")]
        public ActionResult GetListConfiguration(int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpGet("id/{listId}/notification")]
        public ActionResult GetListNotification(int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpPost("create")]
        public ActionResult PostListCreate([FromBody]string body, int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpPost("id/{listId}/chatlog/")]
        public ActionResult PostListChatlog([FromBody]string body, int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpPost("id/{listId}/chatlog/search")]
        public ActionResult PostListChatlogSearch([FromBody]string body, int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpPost("id/{listId}/configuration")]
        public ActionResult PostListConfiguration([FromBody]string body, int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpPost("id/{listId}/delete")]
        public ActionResult PostListDelete([FromBody]string body, int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpPost("id/{listId}/notification")]
        public ActionResult PostListNotification([FromBody]string body, int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpPost("id/{listId}/search")]
        public ActionResult PostListSearch([FromBody]string body, int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

    }
}
