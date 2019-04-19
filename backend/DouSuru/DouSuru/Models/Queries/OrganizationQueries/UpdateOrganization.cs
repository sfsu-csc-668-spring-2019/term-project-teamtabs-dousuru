using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DouSuru.Models.Queries.UpdateOrganization
{
    public class UpdateOrganization : Query
    {
        public UpdateOrganization()
        {
            QueryString = "UPDATE organizations SET (name, description, icon) = (@name, @user_icon, @description, @icon) WHERE organization_id = @organization_id;";
        }

        public override JsonResult Execute(DouSuruContext context, JsonResult parameters)
        {
            return new JsonResult(new { data = context.User.FromSql(QueryString, parameters) });
        }
    }
}

