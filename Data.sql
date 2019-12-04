DROP Database Library;
CREATE Database Library;

USE Library;

CREATE TABLE books (
  id int(11) NOT NULL,
  bookName varchar(200) NOT NULL,
  author varchar(200) NOT NULL
);

ALTER TABLE books ADD PRIMARY KEY (id);
ALTER TABLE books MODIFY id int(11) NOT NULL AUTO_INCREMENT;

select * from books;
