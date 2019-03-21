using Microsoft.AspNetCore.Mvc;

namespace DouSuru.Controllers {
    [Route("organization/")]
    public class OrganizationController : Controller {

        [HttpGet("create")]
        public ActionResult GetOrganizationCreate() {
            return Json(new { authentication = false });
        }

        [HttpGet("id/{organizationId}")]
        public ActionResult GetOrganizationPage(int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpGet("id/{organizationId}/chatlog/")]
        public ActionResult GetOrganizationChatlog(int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpGet("id/{organizationId}/configuration")]
        public ActionResult GetOrganizationConfiguration(int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpGet("id/{organizationId}/notification")]
        public ActionResult GetOrganizationNotification(int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("create")]
        public ActionResult PostOrganizationCreate([FromBody]string body) {
            return Json(new { authentication = false });
        }

        [HttpPost("id/{organizationId}/chatlog/")]
        public ActionResult PostOrganizationChatlog([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("id/{organizationId}/chatlog/search")]
        public ActionResult PostOrganizationChatlogSearch([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("id/{organizationId}/configuration")]
        public ActionResult PostOrganizationConfiguration([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("id/{organizationId}/delete")]
        public ActionResult PostOrganizationDelete([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("id/{organizationId}/notification")]
        public ActionResult PostOrganizationNotification([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("id/{organizationId}/invite")]
        public ActionResult PostOrganizationInvite([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("id/{organizationId}/join")]
        public ActionResult PostOrganizationJoin([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("id/{organizationId}/log")]
        public ActionResult PostOrganizationLog([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

        [HttpPost("id/{organizationId}/search")]
        public ActionResult PostOrganizationSearch([FromBody]string body, int organizationId) {
            return Json(new { authentication = false, organizationId });
        }

    }
}
