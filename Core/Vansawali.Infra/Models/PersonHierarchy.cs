using System;
namespace Vansawali.Infra.Models
{
    public class PersonHierarchy:IOutData
    {
        public int PersonId { get; set; }
        public int ParentId { get; set; }
        public string Name { get; set; }
        public string  WifeName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime MarriageDate { get; set; }
        public DateTime LiveTill { get; set; }
        public string ImagePath { get; set; }
    }
}