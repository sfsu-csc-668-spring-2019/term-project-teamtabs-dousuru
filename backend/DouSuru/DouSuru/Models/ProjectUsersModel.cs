using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ProjectUsersModel {
        [Key]
        [ForeignKey("projects")]
        public uint project_id { get; set; }
        [ForeignKey("users")]
        public uint user_id { get; set; }
    }
}