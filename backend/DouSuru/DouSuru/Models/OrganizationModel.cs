using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class OrganizationModel {
        [Key]
        public uint organization_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string icon { get; set; }
        [ForeignKey("UserModel")]
        public uint user_id { get; set; }
        public UserModel User { get; set; }
    }
}