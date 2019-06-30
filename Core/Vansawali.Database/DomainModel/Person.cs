using System;
using System.Collections.Generic;

namespace Vansawali.DataBase.DomainModel
{
    public partial class Person
    {
        public Person()
        {
            InverseParent = new HashSet<Person>();
            PersonHistory = new HashSet<PersonHistory>();
            PersonImage = new HashSet<PersonImage>();
            PersonMobile = new HashSet<PersonMobile>();
        }

        public int Id { get; set; }
        public int PersonId { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? LiveTill { get; set; }
        public DateTime? MarriageDate { get; set; }
        public int? VillageId { get; set; }
        public int? RelationId { get; set; }
        public string ShortDesc { get; set; }
        public bool Gender { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public bool? IsValid { get; set; }

        public virtual UserLogin CreatedByNavigation { get; set; }
        public virtual Person Parent { get; set; }
        public virtual Relation Relation { get; set; }
        public virtual Village Village { get; set; }
        public virtual ICollection<Person> InverseParent { get; set; }
        public virtual ICollection<PersonHistory> PersonHistory { get; set; }
        public virtual ICollection<PersonImage> PersonImage { get; set; }
        public virtual ICollection<PersonMobile> PersonMobile { get; set; }
    }
}
