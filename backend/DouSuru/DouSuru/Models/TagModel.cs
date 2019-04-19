using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DouSuru.Models {
    public class TagModel {
        [Key]
        public uint tag_id { get; set; }
        public string name { get; set; }
        public string color { get; set; }
    }
}