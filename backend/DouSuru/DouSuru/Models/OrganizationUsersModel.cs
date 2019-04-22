using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class OrganizationUsersModel {
        [Key]
        [ForeignKey("OrganizationModel")]
        public uint organization_id { get; set; }
        [ForeignKey("UserModel")]
        public uint user_id { get; set; }
    }
}