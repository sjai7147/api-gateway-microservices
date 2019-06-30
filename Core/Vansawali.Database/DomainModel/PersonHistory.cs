using System;
using System.Collections.Generic;

namespace Vansawali.DataBase.DomainModel
{
    public partial class PersonHistory
    {
        public int HistoryId { get; set; }
        public int? PersonId { get; set; }
        public string History { get; set; }

        public virtual Person Person { get; set; }
    }
}
