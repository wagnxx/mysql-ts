mysql> show tables;
+----------------+
| Tables_in_test |
+----------------+
| animal         |
| apps           |
| base_table     |
| coll           |
| user           |
| websites       |
+----------------+

mysql> show columns from user;
+-------+----------+------+-----+---------+----------------+
| Field | Type     | Null | Key | Default | Extra          |
+-------+----------+------+-----+---------+----------------+
| id    | int(11)  | NO   | PRI | NULL    | auto_increment |
| uname | char(22) | YES  |     | NULL    |                |
| upass | char(22) | YES  |     | NULL    |                |
+-------+----------+------+-----+---------+----------------+

mysql> show columns from websites;
+---------+--------------+------+-----+---------+----------------+
| Field   | Type         | Null | Key | Default | Extra          |
+---------+--------------+------+-----+---------+----------------+
| id      | int(11)      | NO   | PRI | NULL    | auto_increment |
| name    | char(20)     | NO   |     |         |                |
| url     | varchar(255) | NO   |     |         |                |
| alexa   | int(11)      | NO   |     | 0       |                |
| country | char(10)     | NO   |     |         |                |
+---------+--------------+------+-----+---------+----------------+


mysql> show columns from coll;
+-------+---------+------+-----+---------+----------------+
| Field | Type    | Null | Key | Default | Extra          |
+-------+---------+------+-----+---------+----------------+
| id    | int(11) | NO   | PRI | NULL    | auto_increment |
| uid   | int(11) | NO   |     | NULL    |                |
| wid   | int(11) | YES  |     | NULL    |                |
+-------+---------+------+-----+---------+----------------+

