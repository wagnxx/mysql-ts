/*
 Navicat MySQL Data Transfer

 Source Server         : 127.0.0.1
 Source Server Version : 50621
 Source Host           : localhost
 Source Database       : RUNOOB

 Target Server Version : 50621
 File Encoding         : utf-8

 Date: 05/18/2016 11:44:07 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `coll`
-- ----------------------------
DROP TABLE IF EXISTS `coll`;
CREATE TABLE `coll` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL  COMMENT '用户id',
  `bid` int(11) NOT NULL  COMMENT 'book id',
  -- `app_name` char(20) NOT NULL DEFAULT '' COMMENT '站点名称',
  -- `url` varchar(255) NOT NULL DEFAULT '',
  -- `country` char(10) NOT NULL DEFAULT '' COMMENT '国家',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `coll`
-- ----------------------------
BEGIN;
INSERT INTO `coll` VALUES ('1', '1','1'),;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
