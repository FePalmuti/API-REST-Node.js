DROP Database Library;
CREATE Database Library;

USE Library;

CREATE TABLE books (
  id int(11) NOT NULL AUTO_INCREMENT,
  bookName varchar(200) NOT NULL,
  author varchar(200) NOT NULL,
  PRIMARY KEY (id)
);

select * from books;
