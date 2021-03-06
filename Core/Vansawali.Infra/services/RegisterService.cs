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
    public class RegisterService:IRegisterService
    {
         private VansawaliContext _VansawaliContext;
        public RegisterService(VansawaliContext VansawaliContext){
            _VansawaliContext=VansawaliContext;
        }
        public  IOutData RegisterUser(IInData input){
            LoginUserDetail userDetail=((LoginUserDetail)input);
            try{
                this._VansawaliContext.UserLogin.Add(
                new UserLogin{
                    UserId=userDetail.UserId,
                    UserPass=userDetail.Password,
                    Name=userDetail.Name,
                    IsValid=true,
                    RoleId=3,
                    CreatedOn=DateTime.Now
                });
                this._VansawaliContext.SaveChanges();
                return new Output{ Error=null,Message="User added successfully",CustomData=new{ userDetail=userDetail.UserId,Name=userDetail.Name} };
            }catch(Exception ex){
                throw ex;
            }
            
        }
    }
}