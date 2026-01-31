DB
----

create database nodejstemplate;

use nodejstemplate;

CREATE TABLE users(
id INT auto_increment Primary Key,
name VARCHAR(255) Not null,
email varchar(255) Not null unique,
created_at Timestamp Default current_timestamp,
updated_at timestamp default current_timestamp On update current_timestamp
);


desc users;

select * from users;

ENV
----
PORT=3000
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=nodejstemplate

To run
----
npm i
npm run dev



