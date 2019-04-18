﻿using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DouSuru.Models.Queries.UserQueries
{
    public class GetUserInformationByUserName : Query
    {
        GetUserInformationByUserName()
        {
            QueryString = "SELECT (user_name, user_email, user_icon) FROM users WHERE user_name = @user_name";
        }

        public override JsonResult Execute( DouSuruContext context, object[] parameters )
        {
            return new JsonResult( new { data = context.User.FromSql( QueryString, parameters ) } );
        }
    }
}