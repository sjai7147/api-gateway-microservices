create database Sajara
GO
use[Sajara]
GO
create table Roles
(
RoleId int identity not null primary key,
RoleText varchar(200),
RoleValue int,
IsValid bit default(1)
)
GO
create table UserLogin
(
Id int identity not null primary key,
UserId varchar(50) unique,
UserPass varchar(50),
CreatedOn datetime default(getdate()),
IsValid bit default(1),
RoleId int foreign key references Roles(RoleId),
Name nvarchar(200)
)
GO
create table Village
(
VillageId int identity primary key not null,
VillageName nvarchar(200),
History nvarchar(4000),
IsValid bit default (1),
CreatedBy int foreign key references UserLogin(Id),
CreatedDate datetime default(getdate()),
)
GO
create table Relation
(
RelationId int identity not null primary key,
Relation varchar(200),
IsValid bit default(1)
)
GO

Create table Person
(
Id int identity unique not null,
PersonId int primary key not null,
ParentId int unique foreign key references Person(PersonId),
Name nvarchar(300) not null,
DateOfBirth dateTime,
LiveTill datetime,
MarriageDate datetime,
VillageId int foreign key references Village(VillageId),-- come from village table
RelationId int foreign key references Relation(RelationId),
ShortDesc nvarchar(500),-- will specify short description about person not history
Gender bit not null,--1 Male 0 Female
CreatedBy int foreign key references UserLogin(Id),
CreatedDate datetime default(getdate()),
IsValid bit default(1)
)
GO
--drop table PersonHistory
create table PersonHistory
(
HistoryId int identity not null primary key,
PersonId int foreign key references Person(PersonId),
History nvarchar(4000)
)
Go
create table PersonImage
(
ImageId int identity not null primary key,
PersonId int foreign key references Person(PersonId),
ImageUrl varchar(400),
UploadBy int foreign key references UserLogin(Id)
)
GO
create table PersonMobile
(
id int identity not null,
PersonId int foreign key references Person(PersonId),
MobileNo varchar(15) not null primary key,
UploadBy int foreign key references UserLogin(Id)
)


