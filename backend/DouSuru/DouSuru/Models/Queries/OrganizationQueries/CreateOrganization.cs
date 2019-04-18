using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DouSuru.Models.Queries.OrganizationQueries
{
    public class CreateOrganization: Query
    {
        CreateOrganization()
        {
            QueryString = "INSERT INTO organizations (name, description, icon, user_id) " +
                "VALUES( '@organization_name', '@description', '@icon', @user_id)";
        }

        public override JsonResult Execute(DouSuruContext context, JsonResult parameters)
        {
            return new JsonResult(new { data = context.Database.ExecuteSqlCommand(QueryString, parameters) });
        }
    }
}
