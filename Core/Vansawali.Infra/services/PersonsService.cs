using Vansawali.DataBase.DomainModel;
using Vansawali.DataBase.DomainContext;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;
using Vansawali.Infra.Models;
namespace Vansawali.Infra
{
    public class PersonsService:IPersonService
    {
     private VansawaliContext _VansawaliContext;
     public PersonsService(VansawaliContext VansawaliContext){
          _VansawaliContext=VansawaliContext;
     }
    public PersonDetails GetPersonDetails(int personId){ 
    return this._VansawaliContext.Person.Where(p=>p.PersonId==personId).Select(s=>new PersonDetails{}).FirstOrDefault();
    }

    public List<IOutData> GetPersonListByName(IInData input){
        SearchPerson person= ((SearchPerson)input);    
     return this._VansawaliContext.LoadStoredProc("USP_Get_Person_ByName")
     .WithSqlParam("@PersonName", person.Name)
     .WithSqlParam("@VillageId", person.VillageId)
     .ExecuteStoredProc<SearchPerson>().ToList<IOutData>();
    }
     public List<IOutData> GetPersonHierarchyById(IInData input){
         SearchPerson person= ((SearchPerson)input);
      return this._VansawaliContext.LoadStoredProc("USP_GetPerson_Hierarchy_ByPersonId")
     .WithSqlParam("@PersonId", person.PersonId)     
     .ExecuteStoredProc<PersonHierarchy>().ToList<IOutData>();
    }

    }
}