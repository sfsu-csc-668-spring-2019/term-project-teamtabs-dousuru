using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DouSuru.Models.Queries.OrganizationQueries
{
    public class GetUserOrganizations:Query
    {
        public GetUserOrganizations()         {             QueryString = "SELECT * FROM organizations WHERE organization_id IN user_organizations;";         }          public override JsonResult Execute(DouSuruContext context, JsonResult parameters)         {             return new JsonResult(new { data = context.User.FromSql(QueryString, parameters) });         }
    }
}
