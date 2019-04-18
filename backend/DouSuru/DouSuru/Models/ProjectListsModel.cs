using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ProjectListsModel {
        [Key]
        [ForeignKey("projects")]
        public uint project_id { get; set; }
        [ForeignKey("lists")]
        public uint list_id { get; set; }
    }
}