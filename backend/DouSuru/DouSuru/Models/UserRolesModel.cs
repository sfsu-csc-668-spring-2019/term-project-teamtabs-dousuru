using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class UserRolesModel {
        [Key]
        [ForeignKey("UserModel")]
        public uint user_id { get; set; }
        [ForeignKey("RoleModel")]
        public uint role_id { get; set; }
    }
}