using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class OrganizationUsersModel {
        [Key]
        [ForeignKey("organizations")]
        public uint organization_id { get; set; }
        [ForeignKey("users")]
        public uint user_id { get; set; }
    }
}