﻿using System;
using System.Collections.Generic;

namespace Vansawali.DataBase.DomainModel
{
    public partial class Relation
    {
        public Relation()
        {
            Person = new HashSet<Person>();
        }

        public int Id { get; set; }
        public int RelationId { get; set; }
        public string Relation1 { get; set; }
        public bool? IsValid { get; set; }

        public virtual ICollection<Person> Person { get; set; }
    }
}
