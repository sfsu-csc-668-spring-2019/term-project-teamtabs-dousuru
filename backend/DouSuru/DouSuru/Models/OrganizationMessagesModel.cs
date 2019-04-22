using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class OrganizationMessagesModel {
        [Key]
        [ForeignKey("OrganizationModel")]
        public uint organization_id { get; set; }
        public OrganizationModel Organization { get; set; }
        [ForeignKey("MessageModel")]
        public uint message_id { get; set; }
        public MessageModel Message { get; set; }
    }
}