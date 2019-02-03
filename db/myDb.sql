CREATE TABLE student 
(
    id uuid PRIMARY KEY,
    name varchar(200) NOT NULL,
    deletedate date
)
CREATE TABLE spellinglist 
(
    id uuid PRIMARY KEY,
    name varchar(200) NOT NULL,
    studentid uuid REFERENCES student(id),
    deletedate date
)

CREATE TABLE spellingword 
(
    id uuid PRIMARY KEY,
    word varchar(200) NOT NULL,
    spellinglistid uuid REFERENCES spellinglist(id)
)

CREATE TABLE spellingwordscore
(
    id uuid PRIMARY KEY,
    spellingwordid uuid REFERENCES spellingword(id),
    score integer NOT NULL,
    scoredate date NOT NULL,
    deletedate date
)