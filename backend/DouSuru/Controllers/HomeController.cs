﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DouSuru.Models;

namespace DouSuru.Controllers {
    public class HomeController : Controller {
        [Route("")]
        [Route("Home")]
        [Route("Home/Index")]
        public IActionResult Index() {
            return View();
        }

        [Route("Home/About")]
        public IActionResult About() {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        [Route("Home/Content")]
        public IActionResult Contact() {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy() {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
