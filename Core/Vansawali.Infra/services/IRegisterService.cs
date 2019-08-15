using Vansawali.Infra.Models;
using Vansawali.Infra;
namespace Vansawali.Infra.services
{
    public interface IRegisterService
    {
        IOutData RegisterUser(IInData input);
    }
}