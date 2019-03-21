using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace DouSuru.Controllers {
    [Route("organization/id/{organizationId}/project/")]
    public class ProjectController : Controller {

        [HttpGet("create")]
        public ActionResult GetProjectCreate(int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpGet("id/{projectId}")]
        public ActionResult GetProjectPage(int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpGet("id/{projectId}/chatlog/")]
        public ActionResult GetProjectChatlog(int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpGet("id/{projectId}/configuration")]
        public ActionResult GetProjectConfiguration(int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpGet("id/{projectId}/notification")]
        public ActionResult GetProjectNotification(int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpPost("create")]
        public ActionResult PostProjectCreate([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("id/{projectId}/chatlog/")]
        public ActionResult PostProjectChatlog([FromBody]string body, int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpPost("id/{projectId}/chatlog/search")]
        public ActionResult PostProjectChatlogSearch([FromBody]string body, int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpPost("id/{projectId}/configuration")]
        public ActionResult PostProjectConfiguration([FromBody]string body, int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpPost("id/{projectId}/delete")]
        public ActionResult PostProjectDelete([FromBody]string body, int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpPost("id/{projectId}/notification")]
        public ActionResult PostProjectNotification([FromBody]string body, int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

        [HttpPost("id/{projectId}/search")]
        public ActionResult PostProjectSearch([FromBody]string body, int organizationId, int projectId) {
            return Json(new { authentication = false, organizationId, projectId });
        }

    }
}
