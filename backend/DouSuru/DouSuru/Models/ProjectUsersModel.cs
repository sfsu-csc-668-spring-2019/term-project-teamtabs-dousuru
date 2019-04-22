using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ProjectUsersModel {
        [Key]
        [ForeignKey("ProjectModel")]
        public uint project_id { get; set; }
        public ProjectModel Project { get; set; }
        [ForeignKey("UserModel")]
        public uint user_id { get; set; }
        public UserModel User { get; set; }
    }
}