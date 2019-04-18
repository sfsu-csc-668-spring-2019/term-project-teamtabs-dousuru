using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;

namespace DouSuru.Models.Queries.UserQueries
{
    public class DeleteUserByUserId : Query
    {
        public DeleteUserByUserId()
        {
            QueryString = "DELETE FROM users WHERE user_id = @user_id;";
        }

        public override JsonResult Execute( DouSuruContext context, JObject parameters )
        {
            return new JsonResult( new { data = context.Database.ExecuteSqlCommand( QueryString, new NpgsqlParameter( "user_id", ( string ) parameters[ "user_id" ] ) ) } );
        }
    }
}