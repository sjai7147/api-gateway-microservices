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

        public UserLogin CreatedByNavigation { get; set; }
        public Person Parent { get; set; }
        public Relation Relation { get; set; }
        public Village Village { get; set; }
        public ICollection<Person> InverseParent { get; set; }
        public ICollection<PersonHistory> PersonHistory { get; set; }
        public ICollection<PersonImage> PersonImage { get; set; }
        public ICollection<PersonMobile> PersonMobile { get; set; }
    }
}
