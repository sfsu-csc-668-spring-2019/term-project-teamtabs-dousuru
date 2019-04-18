﻿using DouSuru.DAL;
using Microsoft.AspNetCore.Mvc;

namespace DouSuru.Models.Queries
{
    public abstract class Query
    {
        public string QueryString;
        public abstract JsonResult Execute(DouSuruContext context, JsonResult parameters); //returns a json string or null if write query
    }
}
