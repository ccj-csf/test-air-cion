
CREATE TABLE IF NOT EXISTS Example
(
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT
);

INSERT INTO Example (name)
VALUES ('Example1'),
       ('Example2'),
       ('Example3');
