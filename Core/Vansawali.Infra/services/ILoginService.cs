using Vansawali.Infra.Models;
using Vansawali.Infra;
namespace Vansawali.Infra.services
{
    public interface ILoginService
    {
        IOutData Login(IInData login);
    }
}