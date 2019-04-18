using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class OrganizationProjectsModel {
        [Key]
        [ForeignKey("organizations")]
        public uint organization_id { get; set; }
        [ForeignKey("projects")]
        public uint project_id { get; set; }
    }
}