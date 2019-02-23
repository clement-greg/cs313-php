CREATE TABLE student 
(
    id uuid NOT NULL PRIMARY KEY,
    name varchar(200) NOT NULL,
    deletedate timestamp
)

CREATE TABLE spellinglist
(
    id uuid NOT NULL  PRIMARY KEY,
    name varchar(200) NOT NULL,
    studentid uuid NOT NULL REFERENCES student(id),
    deletedate timestamp,
    createddate timestamp NOT NULL
)

CREATE TABLE spellingword 
(
    id uuid NOT NULL PRIMARY KEY,
    word varchar(200) NOT NULL,
    spellinglistid uuid NOT NULL REFERENCES spellinglist(id),
    createddate timestamp NOT NULL,
    deletedate timestamp
)

CREATE TABLE spellingwordscore 
(
    id uuid NOT NULL PRIMARY KEY,
    spellingwordid uuid NOT NULL REFERENCES spellingword(id),
    score integer NOT NULL,
    deletedate timestamp,
    scoredate timestamp NOT NULL
)

CREATE OR REPLACE VIEW spellinglistdetail AS
 SELECT spellinglist.id,
    spellinglist.name,
    spellinglist.studentid,
    spellinglist.deletedate,
    spellinglist.createddate,
    student.name AS studentname
   FROM spellinglist
     JOIN student ON spellinglist.studentid = student.id;