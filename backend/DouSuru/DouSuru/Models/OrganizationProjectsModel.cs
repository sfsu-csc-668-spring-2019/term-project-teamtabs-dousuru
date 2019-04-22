using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class OrganizationProjectsModel {
        [Key]
        [ForeignKey("OrganizationModel")]
        public uint organization_id { get; set; }
        public OrganizationModel Organization { get; set; }
        [ForeignKey("ProjectModel")]
        public uint project_id { get; set; }
        public ProjectModel Project { get; set; }
    }
}