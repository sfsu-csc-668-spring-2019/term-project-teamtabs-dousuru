﻿using DouSuru.DAL;
using DouSuru.Models.Queries;
using DouSuru.Models.Queries.UserQueries;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DouSuru.Models.QueriesContainer
{
    public static class QueriesContainer
    {
        public const string DELETE_USER_BY_ID = "DELETE_USER_BY_ID";
        public const string GET_USER_INFORMATION_BY_USER_NAME = "GET_USER_INFORMATION_BY_USER_NAME";

        public static JsonResult Execute( string key, DouSuruContext context, JsonResult parameters )
        {
            return _getQuery( key ).Execute( context, parameters );
        }

        private static Dictionary<string, Query> _queriesContainer = new Dictionary<string, Query>()
        {
            { DELETE_USER_BY_ID, new DeleteUserByUserId() },
            { GET_USER_INFORMATION_BY_USER_NAME, new GetUserInformationByUserName() }
        };

        private static Query _getQuery( string key )
        {
            return _queriesContainer.GetValueOrDefault( key );
        }
    }
}