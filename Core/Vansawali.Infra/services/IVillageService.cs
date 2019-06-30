using System.Collections.Generic;
using Vansawali.Infra;
namespace Vansawali.Infra.services
{
    public interface IVillageService
    {
        List<IOutData> GetAllVillage();
    }
}