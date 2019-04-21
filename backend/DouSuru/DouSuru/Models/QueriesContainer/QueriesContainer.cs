using DouSuru.DAL;
using DouSuru.Models.Queries;
using DouSuru.Models.Queries.UserQueries;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;

namespace DouSuru.Models.QueriesContainer
{
    public static class QueriesContainer
    {
        public const string CREATE_USER = "CREATE_USER";
        public const string DELETE_USER_BY_ID = "DELETE_USER_BY_ID";
        public const string GET_USER_INFORMATION_BY_USER_NAME = "GET_USER_INFORMATION_BY_USER_NAME";
        public const string UPDATE_USER_BY_USER_NAME = "UPDATE_USER_BY_USER_NAME";
        public const string UPDATE_USER_PASSWORD_BY_USER_ID = "UPDATE_USER_PASSWORD_BY_USER_ID";

        public static JsonResult Execute( string key, DouSuruContext context, JObject parameters )
        {
            return _getQuery( key ).Execute( context, parameters );
        }

        private static Dictionary<string, Query> _queriesContainer = new Dictionary<string, Query>()
        {
            { CREATE_USER, new CreateUser() },
            { DELETE_USER_BY_ID, new DeleteUserByUserId() },
            { GET_USER_INFORMATION_BY_USER_NAME, new GetUserInformationByUserName() },
            { UPDATE_USER_BY_USER_NAME, new UpdateUserByUserName() },
            { UPDATE_USER_PASSWORD_BY_USER_ID, new UpdateUserPasswordByUserId() }
        };

        private static Query _getQuery( string key )
        {
            return _queriesContainer.GetValueOrDefault( key );
        }
    }
}
