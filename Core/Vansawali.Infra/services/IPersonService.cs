using Vansawali.DataBase.DomainModel;
using System.Collections.Generic;
using Vansawali.Infra.Models;
namespace Vansawali.Infra
{
    public interface IPersonService
    {
         PersonDetails GetPersonDetails(int personId);
        List<IOutData> GetPersonListByName(IInData input);
        List<IOutData> GetPersonHierarchyById(IInData input);

    }
}