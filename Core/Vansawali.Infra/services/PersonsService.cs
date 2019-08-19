using System;
using Vansawali.DataBase.DomainModel;
using Vansawali.DataBase.DomainContext;
using System.Linq;
using System.Collections.Generic;
using System.Linq.Expressions;
using Vansawali.Infra.Models;
using System.IO;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Options;
namespace Vansawali.Infra
{
    public class PersonsService:IPersonService
    {
        private VansawaliContext _VansawaliContext;
        private AppSettings _AppSettings;
        public PersonsService(VansawaliContext VansawaliContext,IOptions<AppSettings> AppSettings){
            _VansawaliContext=VansawaliContext;
            _AppSettings=AppSettings.Value;
        }
        public PersonDetail GetPersonDetails(int personId){ 
            return this._VansawaliContext.Person.Where(p=>p.PersonId==personId)
            .Select(s=>new PersonDetail{}).FirstOrDefault();
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

        public IOutData SavePerson(IInData input){      
        string message="" ;
                try{
                PersonDetail personDetail=((PersonDetail)input);
                Console.Clear();
                
                message=personDetail.name+" is added in database successfully";
                var personId= this._VansawaliContext.Person.Max(pd=>pd.PersonId)+1;
                this._VansawaliContext.Person.Add(new Person{               
                    PersonId=personId,
                    Name=personDetail.name,
                    ParentId= personDetail.parentId,
                    VillageId= personDetail.villageId,
                    RelationId= personDetail.relationId,
                    Gender=personDetail.sex==1?true:false,
                    ShortDesc= personDetail.shortDesc,
                    //public string imageString;
                    DateOfBirth= personDetail.dateOfBirth,
                    MarriageDate= personDetail.marriageDate,
                    LiveTill= personDetail.liveTill,
                    IsValid=true
                    });
                    if(!string.IsNullOrEmpty(personDetail.imageString)){
                        string filename=saveImageInFolder(personDetail.imageString);
                        this._VansawaliContext.PersonImage.Add( 
                            new PersonImage{
                                PersonId=personId,
                                ImageUrl=filename
                            });
                    }
                    this._VansawaliContext.SaveChanges();
                
                }catch(Exception ex){
                    message=ex.Message;
                    throw new Exception("Exception",ex);

                }
            return new Output{Message=message};
        }
        private string saveImageInFolder(string imageString ){
            var match = Regex.Match(imageString, @"data:(?<type>.+?);base64,(?<data>.+)");
            var base64Data = match.Groups["data"].Value;
            var contentType = match.Groups["type"].Value;
            var bytesdata = Convert.FromBase64String(base64Data);
           
            string path=_AppSettings.PersonImagePath;
                if(!Directory.Exists(path)){
                    Directory.CreateDirectory(path);
                }
                var filename= string.Format(@"{0}.jpeg", Guid.NewGuid());

                //Generate unique filename
                string filepath= Path.Combine(path, filename);
                using (var imageFile = new FileStream(filepath, FileMode.Create))
                    {
                        imageFile.Write(bytesdata, 0, bytesdata.Length);
                        imageFile.Flush();
                    }
                    return filename;
        }

    }
}