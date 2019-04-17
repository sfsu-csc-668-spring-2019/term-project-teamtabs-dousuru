using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class UserModel {
        //public string RequestId { get; set; }
        //public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
        [Key]
        public uint user_id { get; set; }
        public string password { get; set; }
        public string user_name { get; set; }
        public string display_name { get; set; }
    }
}