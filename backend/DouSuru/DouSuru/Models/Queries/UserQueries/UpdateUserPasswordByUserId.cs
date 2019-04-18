using DouSuru.DAL; using Microsoft.AspNetCore.Mvc; using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;

namespace DouSuru.Models.Queries.UserQueries
{
    public class UpdateUserPasswordByUserId : Query     {         public UpdateUserPasswordByUserId()         {             QueryString = "UPDATE users SET password = @password WHERE user_id = @user_id;";         }          public override JsonResult Execute( DouSuruContext context, JObject parameters )         {             return new JsonResult( new { data = context.User.FromSql(                  QueryString,
                new NpgsqlParameter( "password", ( string ) parameters[ "password" ] ),                 new NpgsqlParameter( "user_id", ( string ) parameters[ "user_id" ] ) ) } );         }     }
}
