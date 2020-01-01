+----------------+
| Tables_in_test |
+----------------+
| apps           |
| coll           |
| user           |
| websites       |
+----------------+
mysql> select * from  websites limit 5;
+----+--------------+---------------------------+-------+---------+
| id | name         | url                       | alexa | country |
+----+--------------+---------------------------+-------+---------+
|  1 | Google       | https://www.google.cm/    |     1 | USA     |
|  2 | 淘宝         | https://www.taobao.com/   |    13 | CN      |
|  3 | 菜鸟教程     | http://www.runoob.com/    |  4689 | CN      |
|  4 | 微博         | http://weibo.com/         |    20 | CN      |
|  5 | Facebook     | https://www.facebook.com/ |     3 | USA     |
+----+--------------+---------------------------+-------+---------+

mysql> select * from  user  limit 5;
+----+-------+-------+
| id | uname | upass |
+----+-------+-------+
|  1 | 1     | 1     |
|  6 | admin | admin |
+----+-------+-------+

mysql> select * from coll;
+----+-----+------+
| id | uid | wid  |
+----+-----+------+
|  1 |   1 |    1 |

// 已知 uid

select wid from coll where uid=1;