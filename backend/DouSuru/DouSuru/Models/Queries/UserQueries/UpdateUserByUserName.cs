using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;

namespace DouSuru.Models.Queries.UserQueries
{
    public class UpdateUserByUserName : Query
    {
        public UpdateUserByUserName()
        {
            QueryString = "UPDATE users SET (display_name, user_icon, user_email) = (@display_name, @icon, @email) WHERE user_name = @user_name;";
        }

        public override JsonResult Execute( DouSuruContext context, JObject parameters )
        {
            return new JsonResult( new
            {
                data = context.User.FromSql( QueryString,
                new NpgsqlParameter( "user_name", ( string ) parameters[ "user_name" ] ),
                new NpgsqlParameter( "display_name", ( string ) parameters[ "display_name" ] ),
                new NpgsqlParameter( "icon", ( string ) parameters[ "icon" ] ),
                new NpgsqlParameter( "email", ( string ) parameters[ "email" ] ) )
            } );
        }
    }
}
