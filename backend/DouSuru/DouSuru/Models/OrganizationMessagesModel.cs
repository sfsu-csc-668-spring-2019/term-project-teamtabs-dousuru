using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class OrganizationMessagesModel {
        [Key]
        [ForeignKey("organizations")]
        public uint organization_id { get; set; }
        [ForeignKey("messages")]
        public uint message_id { get; set; }
    }
}