
--seed role
insert into Roles(RoleText,RoleValue)
values('Super',1),('Admin',2),('Viewer',3)
--UserLogin
insert into UserLogin(UserId,UserPass,RoleId,Name)
values('admin','Man@2#3$2019',1,'Manshahi Admin')
--village

insert into Village(VillageName,History)
values('Manshahi','Top level person will come under this village'),('Nagar',''),('Chhatauna',''),('Pura',''),
('Chandauki',''),('Sonpura',''),('Sonawa',''),('Meerpur',''),('Rattipur',''),('Mahdaura','')

--Realation
insert into Relation(RelationId,Relation)
Values(1,'Not Specified'),(2,'Son'),(3,'Wife'),(4,'Daughter')

--Person

insert into person(PersonId,ParentId,Name,VillageId,RElationId,Gender)
values(1,1,'Manshah',1,1,1),(2,1,'Ramdutt Singh',2,1,1),(3,2,'Naseeba Singh',2,3,0),(4,2,'Indra Bahadur Singh',2,2,1),(5,4,'Anjani Singh',2,3,0)
,(6,4,'Vijay Pratap Singh',2,2,1),(7,4,'Rudra Pratap Singh',2,2,1),(8,4,'Shiv Pratap Singh',2,2,1),(9,6,'Saroj Singh',2,3,0),(10,6,'Jai Singh',2,2,1)
,(11,6,'Udai Singh',2,2,1),(12,6,'Veer Singh',2,2,1),(13,7,'Asha Singh',2,3,0),(14,7,'Madhu Singh',2,4,0),(15,7,'Sharada Singh',2,3,0)
,(16,7,'Yashwant Singh',2,2,1),(17,7,'Richa Singh',2,4,0),(18,7,'Golu Singh',2,2,1),(19,8,'Pushpa Singh',2,3,0),(20,8,'Khushabu Singh',2,4,0)
,(21,8,'Sharvesh Singh',2,2,1),(22,8,'Chhoti Singh',2,4,0),(23,10,'Suman Singh',2,3,0),(24,10,'Avinash Singh',2,2,1),(25,10,'Deepika Singh',2,4,0)
,(26,11,'Soni Singh',2,3,0),(27,11,'Shubhi Singh',2,4,0),(28,11,'shrey Singh',2,2,1),(29,12,'Pragyan Singh',2,3,0),(30,12,'Saumya Singh',2,2,1)
,(31,12,'Saumitra Singh',2,2,1),(32,16,'Sonu Wife Singh',2,3,0),(33,1,'Kamta Singh',2,1,1),(34,33,'Shubhash Singh',2,1,1),(35,34,'Pinku Singh',2,1,1)

select * from Village
select * from Relation
select * from Person

--select * from Person
--exec USP_GetPerson_Hierarchy_ByPersonId 33
drop proc USP_GetPerson_Hierarchy_ByPersonId
go
create proc USP_GetPerson_Hierarchy_ByPersonId
(
@PersonId int
)
as
begin
;with cte_person(PersonId,ParentId,Name,WifeName,DateOfBirth,MarriageDate,LiveTill,ImagePath)
AS
(
select P.PersonId,P.ParentId,P.Name,
(STUFF(( 
    select ','+ cast(Name as nvarchar(255)) 
    from Person w 
    WHERE w.ParentId = p.PersonId and w.RelationId=3
    FOR XML PATH('') 
    ) 
    ,1,1,'')) as WifeName,
P.DateOfBirth,p.MarriageDate,P.LiveTill,null from Person as P where P.PersonId=@PersonId
Union all
select p.PersonId,p.ParentId,p.Name,
(STUFF(( 
    select ','+ cast(Name as nvarchar(255)) 
    from Person w 
    WHERE w.ParentId = p.PersonId and w.RelationId=3
    FOR XML PATH('') 
    ) 
    ,1,1,'')) as WifeName,
p.DateOfBirth,p.MarriageDate,p.LiveTill,null from Person as p
inner join cte_person as cp on p.parentId=cp.PersonId and p.RelationId=2 and cp.PersonId<>p.PersonId
)
select * from cte_Person order by ParentId

end
GO

-- drop proc USP_Get_Person_ByName
--USP_Get_Person_ByName 'k',2
create proc USP_Get_Person_ByName
(
@PersonName nvarchar(300)
--@VillageId int
)
as
begin
select p.PersonId, 
p.Name+isnull((select '('+  f.Name+')' from Person as f where f.PersonId=p.ParentId and f.RelationId=2),'')+'=>'+v.VillageName Name,p.VillageId
from Person as p
inner join Village as v on p.VillageId=v.VillageId
where  p.Name like '%'+@PersonName+'%' --and p.VillageId=@VillageId
end

GO
--drop proc Usp_Get_Villages
-- Usp_Get_Villages
create proc Usp_Get_Villages
as
begin
select VillageId,VillageName from Village where IsValid=1 order by VillageName 
end

Go

create proc Usp_Get_Roles
as
begin
select RoleId,RoleText,RoleValue from Roles where IsValid=1 order by RoleText
end

GO

Create proc Usp_Login_User
(
@UserId varchar(50),
@Password varchar(50)
)
as
begin
select UserId,r.RoleValue from UserLogin as ul 
inner join Roles as r on ul.RoleId=r.RoleId
where ul.UserId=@UserId and ul.UserPass=@Password
end
