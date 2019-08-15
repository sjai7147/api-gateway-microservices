using System;
using Vansawali.DataBase.DomainModel;
using Vansawali.DataBase.DomainContext;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;
using Vansawali.Infra.Models;
using Vansawali.Infra;
namespace Vansawali.Infra.services
{
    public class LoginService:ILoginService
    {
        private VansawaliContext _VansawaliContext;
        public LoginService(VansawaliContext VansawaliContext){
            _VansawaliContext=VansawaliContext;
        }
        public IOutData Login(IInData login){
            LoginModel loginData=((LoginModel)login);
           var user= this._VansawaliContext.UserLogin
            .FirstOrDefault(u=>u.IsValid.Value&&u.UserId==loginData.UserId&&u.UserPass==loginData.Password&&(u.RoleId==1||u.RoleId==2));
            if(user==null){
                return new Output{ Error="Invalid User"};
            }else{
                return new Output{Error=null,CustomData = new { UserName=user.Name, UserId=user.UserId}};
            }            

        }
    }
}