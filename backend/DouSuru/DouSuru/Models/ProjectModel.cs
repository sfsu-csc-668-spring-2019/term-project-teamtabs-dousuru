using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ProjectModel {
        [Key]
        public uint project_id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public bool is_public { get; set; }
        [ForeignKey("users")]
        public uint user_id { get; set; }
    }
}