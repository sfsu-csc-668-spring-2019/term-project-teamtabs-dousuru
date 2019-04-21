using DouSuru.DAL; using Microsoft.AspNetCore.Mvc; using Microsoft.EntityFrameworkCore; using Newtonsoft.Json.Linq;
using Npgsql;
using System.Data.SqlClient;

namespace DouSuru.Models.Queries.UserQueries {     public class GetUserInformationByUserName : Query     {         public GetUserInformationByUserName()         {             QueryString = "SELECT user_id, user_name, password, display_name, icon, email FROM users WHERE user_name = @user_name;";         }          public override JsonResult Execute( DouSuruContext context, JObject parameters )         {             return new JsonResult( context.User.FromSql( QueryString, new NpgsqlParameter( "user_name", ( string ) parameters[ "user_name" ] ) ) );         }     } } 
