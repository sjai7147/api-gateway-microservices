using System;
namespace Vansawali.Infra.Models
{
    public class PersonDetail:IOutData,IInData
    {
        public int? personId { get; set; }
        public int parentId { get; set; }
        public int villageId { get; set; }       
        public int relationId { get; set; }
        public int sex { get; set; }
        public string name { get; set; }
        public string shortDesc { get; set; }
        public string imageString { get; set; }
        public DateTime dateOfBirth { get; set; }
        public DateTime? marriageDate { get; set; }
        public DateTime? liveTill { get; set; }
        
    }
}