
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
insert into Relation(Relation)
Values('Not Specified'),('Son'),('Wife'),('Daughter')

--Person

insert into person(PersonId,ParentId,Name,VillageId,RElationId,Gender)
values(1,1,'Manshah',1,1,1),(2,1,'Ramdutt Singh',2,1,1),(3,2,'Naseeba Singh',2,3,0),(4,2,'Indra Bahadur Singh',2,2,1),(5,4,'Anjani Singh',2,3,0)
,(6,4,'Vijay Pratap Singh',2,2,1),(7,4,'Rudra Pratap Singh',2,2,1),(8,4,'Shiv Pratap Singh',2,2,1),(9,6,'Saroj Singh',2,3,0),(10,6,'Jai Singh',2,2,1)
,(11,6,'Udai Singh',2,2,1),(12,6,'Veer Singh',2,2,1),(13,7,'Asha Singh',2,3,0),(14,7,'Madhu Singh',2,4,0),(15,7,'Sharada Singh',2,3,0)
,(16,7,'Yashwant Singh',2,2,1),(17,7,'Richa Singh',2,3,0),(18,7,'Golu Singh',2,2,1),(19,8,'Pushpa Singh',2,3,0),(20,8,'Khushabu Singh',2,4,0)
,(21,8,'Sharvesh Singh',2,2,1),(22,8,'Chhoti Singh',2,4,0),(23,10,'Suman Singh',2,3,0),(24,10,'Avinash Singh',2,2,1),(25,10,'Deepika Singh',2,4,0)
,(26,11,'Soni Singh',2,3,0),(27,11,'Shubhi Singh',2,4,0),(28,11,'shrey Singh',2,2,1),(29,12,'Pragyan Singh',2,3,0),(30,12,'Saumya Singh',2,2,1)
,(31,12,'Saumitra Singh',2,2,1),(32,16,'Sonu Wife Singh',2,3,0)

select * from Village
select * from Relation
select * from Person
