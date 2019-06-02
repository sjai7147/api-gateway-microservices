using Vansawali.DataBase.DomainModel;
using System.Collections.Generic;
namespace Vansawali.Infra
{
    public interface IPersonService
    {
         Person GetPerson(int personId);
        List<Person> GetPersonList();
    }
}