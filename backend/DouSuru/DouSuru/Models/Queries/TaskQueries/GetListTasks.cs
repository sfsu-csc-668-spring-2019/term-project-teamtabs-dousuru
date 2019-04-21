using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.OrganizationQueries
{
    public class GetListTasks:Query
    {
        public GetListTasks()         {             QueryString = "SELECT * FROM tasks WHERE task_id IN " +
                "( SELECT task_id FROM list_tasks WHERE list_id = @list_id ) ; ";         }          public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.Organization.FromSql(
                QueryString,
                new NpgsqlParameter("list_id", (string)parameters["list_id"]));
            return null;
        }
    }
}
