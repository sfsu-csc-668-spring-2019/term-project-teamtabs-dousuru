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
                "VALUES(@organization_name, @description, @icon, @user_id); " +
                "WITH added_organization(organization_id) as " +
                    "( " +
                        "SELECT MAX(organization_id) " +
                        "FROM organizations " +
                        "WHERE user_id = @user_id " +
                    ") " +
                "SELECT* FROM added_organization; "; 
        }

        public override JsonResult Execute(DouSuruContext context, JsonResult parameters)
        {
            return new JsonResult(new { data = context.Database.ExecuteSqlCommand(QueryString, parameters) });
        }
    }
}
