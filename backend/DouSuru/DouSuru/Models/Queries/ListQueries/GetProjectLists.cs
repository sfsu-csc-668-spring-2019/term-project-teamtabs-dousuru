using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.ListQueries
{
    public class GetProjectLists:Query
    {
        public GetProjectLists()         {             QueryString = "SELECT * FROM projects WHERE project_id IN " +
                "( SELECT list_id FROM project_lists WHERE project_id = @project_id );";                    }          public override JsonResult Execute(DouSuruContext context, JObject parameters)
        {
            context.List.FromSql(
                QueryString,
                new NpgsqlParameter("project_id", (string)parameters["project_id"]));
            return null;
        }
    }
}
