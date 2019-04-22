using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Npgsql;
using System;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.UserQueries
{
    public class CreateUser : Query
    {
        public CreateUser()
        {
            QueryString = "INSERT INTO users VALUES ( DEFAULT, @user_name, @password, @display_name, @icon, @email);";
        }

        public override JsonResult Execute( DouSuruContext context, JObject parameters )
        {
            context.Database.ExecuteSqlCommand(
                QueryString,
                new NpgsqlParameter( "user_name", ( string ) parameters[ "user_name" ] ),
                new NpgsqlParameter( "password", ( string ) parameters[ "password" ] ),
                new NpgsqlParameter( "display_name", ( string ) parameters[ "display_name" ] ),
                new NpgsqlParameter( "icon", ( string ) parameters[ "icon" ] ),
                new NpgsqlParameter( "email", ( string ) parameters[ "email" ] ) );
            return null;
        }
    }
}
