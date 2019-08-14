using Vansawali.DataBase.DomainModel;
using System.Collections.Generic;
using Vansawali.Infra.Models;

namespace Vansawali.Infra
{
    public interface IPersonService
    {
         PersonDetail GetPersonDetails(int personId);
        List<IOutData> GetPersonListByName(IInData input);
        List<IOutData> GetPersonHierarchyById(IInData input);
        IOutData SavePerson(IInData input);

    }
}