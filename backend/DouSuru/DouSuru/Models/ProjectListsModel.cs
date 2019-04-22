using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ProjectListsModel {
        [Key]
        [ForeignKey("ProjectModel")]
        public uint project_id { get; set; }
        public ProjectModel Project { get; set; }
        [ForeignKey("ListModel")]
        public uint list_id { get; set; }
        public ListModel List { get; set; }
    }
}