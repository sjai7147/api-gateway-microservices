using Vansawali.DataBase.DomainModel;
using Vansawali.DataBase.DomainContext;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;
namespace Vansawali.Infra
{
    public class PersonsService:IPersonService
    {
     private VansawaliContext _VansawaliContext;
     public PersonsService(VansawaliContext VansawaliContext){
          _VansawaliContext=VansawaliContext;
     }
        public Person GetPerson(int personId){ 
           return this._VansawaliContext.Person.Single(p=>p.PersonId==personId);
           }
        public List<Person> GetPersonList(){
            return this._VansawaliContext.Person.ToList<Person>();
            }

    }
}