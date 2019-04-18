using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class ChangeLogModel {
        [Key]
        public uint log_id { get; set; }
        [ForeignKey("users")]
        public uint user_id { get; set; }
        [ForeignKey("organizations")]
        public string organization_id { get; set; }
        public string description { get; set; }
        public DateTime change_date { get; set; }
    }
}