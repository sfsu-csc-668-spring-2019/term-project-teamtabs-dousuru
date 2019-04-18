using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ProjectListsModel {
        [Key]
        [ForeignKey("ProjectModel")]
        public uint project_id { get; set; }
        [ForeignKey("ListModel")]
        public uint list_id { get; set; }
    }
}