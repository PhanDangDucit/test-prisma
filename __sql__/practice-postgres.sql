create table users(
	id int primary key generated always as identity,
	name varchar(100)
)

select * from "users";

insert into users(name) values
('Duc'),
('Mr.Kameron');

drop table users;