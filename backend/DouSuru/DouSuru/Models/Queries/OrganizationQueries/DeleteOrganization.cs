using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DouSuru.Models.Queries.OrganizationQueries
{
    public class DeleteOrganization:Query
    {
        DeleteOrganization()
        {
            QueryString = "DELETE FROM organizations WHERE organization_id=@organization_id CASCADE;";
        }

        public override JsonResult Execute(DouSuruContext context, JsonResult parameters)
        {
            return new JsonResult(new { data = context.Database.ExecuteSqlCommand(QueryString, parameters) });
        }
    }
}
