using Microsoft.AspNetCore.Mvc;

namespace DouSuru.Controllers {
    [Route("organization/id/{organizationId}/project/id/{projectId}/list/id/{listId}/task/")]
    public class TaskController : Controller {

        [HttpGet("create")]
        public ActionResult GetTaskCreate(int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpGet("id/{taskId}")]
        public ActionResult GetTaskPage(int organizationId, int projectId, int listId, int taskId) {
            return Json(new { authentication = false, organizationId, projectId, listId, taskId });
        }

        [HttpGet("id/{taskId}/chatlog/")]
        public ActionResult GetTaskChatlog(int organizationId, int projectId, int listId, int taskId) {
            return Json(new { authentication = false, organizationId, projectId, listId, taskId });
        }

        [HttpGet("id/{taskId}/configuration")]
        public ActionResult GetTaskConfiguration(int organizationId, int projectId, int listId, int taskId) {
            return Json(new { authentication = false, organizationId, projectId, listId, taskId });
        }

        [HttpGet("id/{taskId}/notification")]
        public ActionResult GetTaskNotification(int organizationId, int projectId, int listId, int taskId) {
            return Json(new { authentication = false, organizationId, projectId, listId, taskId });
        }

        [HttpPost("create")]
        public ActionResult PostTaskCreate([FromBody]string body, int organizationId, int projectId, int listId) {
            return Json(new { authentication = false, organizationId, projectId, listId });
        }

        [HttpPost("id/{taskId}/chatlog/")]
        public ActionResult PostTaskChatlog([FromBody]string body, int organizationId, int projectId, int listId, int taskId) {
            return Json(new { authentication = false, organizationId, projectId, listId, taskId });
        }

        [HttpPost("id/{taskId}/chatlog/search")]
        public ActionResult PostTaskChatlogSearch([FromBody]string body, int organizationId, int projectId, int listId, int taskId) {
            return Json(new { authentication = false, organizationId, projectId, listId, taskId });
        }

        [HttpPost("id/{taskId}/configuration")]
        public ActionResult PostTaskConfiguration([FromBody]string body, int organizationId, int projectId, int listId, int taskId) {
            return Json(new { authentication = false, organizationId, projectId, listId, taskId });
        }

        [HttpPost("id/{taskId}/delete")]
        public ActionResult PostTaskDelete([FromBody]string body, int organizationId, int projectId, int listId, int taskId) {
            return Json(new { authentication = false, organizationId, projectId, listId, taskId });
        }

        [HttpPost("id/{taskId}/notification")]
        public ActionResult PostTaskNotification([FromBody]string body, int organizationId, int projectId, int listId, int taskId) {
            return Json(new { authentication = false, organizationId, projectId, listId, taskId });
        }
    }
}
