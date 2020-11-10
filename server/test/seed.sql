insert into tag (text,created_at,updated_at) values ("Tag1","2020-11-01", "2020-11-01");
insert into tag (text,created_at,updated_at) values ("Tag2","2020-11-01", "2020-11-01");
insert into tag (text,created_at,updated_at) values ("Tag3","2020-11-01", "2020-11-01");

insert into travel_entry (start_date, end_date,latlon,desc,user_id,created_at,updated_at) values ("2020-11-01","2020-11-02","12.123,23.321","szep hely",1,"2020-11-01", "2020-11-01");

insert into tag_entries (tag_id, travel_entry_id) values (1,1);

insert into comment (text,created_at,updated_at,author_id,entry_id) values ("Nagyon jo","2020-11-01", "2020-11-01",1,1);