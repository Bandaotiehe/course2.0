/*
SQLyog Enterprise v12.3.1 (64 bit)
MySQL - 5.7.26 : Database - course_selection_system
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`course_selection_system` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `course_selection_system`;

/*Table structure for table `admin_information` */

DROP TABLE IF EXISTS `admin_information`;

CREATE TABLE `admin_information` (
  `Ad_no` varchar(30) NOT NULL,
  `Ad_pa` varchar(30) NOT NULL,
  PRIMARY KEY (`Ad_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `admin_information` */

insert  into `admin_information`(`Ad_no`,`Ad_pa`) values 
('001','111111');

/*Table structure for table `basic` */

DROP TABLE IF EXISTS `basic`;

CREATE TABLE `basic` (
  `id` varchar(30) NOT NULL,
  `tid` varchar(30) NOT NULL,
  `tname` varchar(30) NOT NULL,
  `cid` varchar(30) NOT NULL,
  `cname` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `basic` */

insert  into `basic`(`id`,`tid`,`tname`,`cid`,`cname`) values 
('1','00001','耿耀君','002','数据结构'),
('2','00001','耿耀君','003','windows程序设计'),
('3','11111','杜炜','201','离散数学');

/*Table structure for table `course` */

DROP TABLE IF EXISTS `course`;

CREATE TABLE `course` (
  `classId` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(200) NOT NULL,
  `classNum` int(11) NOT NULL,
  `teaId` int(11) NOT NULL,
  `classChooseNum` int(11) NOT NULL,
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=1098 DEFAULT CHARSET=utf8;

/*Data for the table `course` */

insert  into `course`(`classId`,`className`,`classNum`,`teaId`,`classChooseNum`) values 
(1002,'宏观经济学',3,2018100002,4),
(1005,'市场营销学',6,2018100002,3),
(1006,'大学英语',3,2018100003,1),
(1007,'大学英语',3,2018100003,7),
(1008,'高等数学',6,2018100004,1),
(1095,'高数',32,2018100001,1),
(1097,'高数',32,2018100001,-1);

/*Table structure for table `course_choose` */

DROP TABLE IF EXISTS `course_choose`;

CREATE TABLE `course_choose` (
  `chooseId` int(11) NOT NULL AUTO_INCREMENT,
  `stuId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`chooseId`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;

/*Data for the table `course_choose` */

insert  into `course_choose`(`chooseId`,`stuId`,`classId`,`score`) values 
(3,2018000004,1002,70),
(15,2018000002,1006,0),
(16,2018000002,1008,0),
(17,2018000004,1005,0),
(19,2018000003,1005,0),
(20,2018000003,1002,0),
(124,2018000001,1095,0);

/*Table structure for table `course_limit` */

DROP TABLE IF EXISTS `course_limit`;

CREATE TABLE `course_limit` (
  `limitId` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) NOT NULL,
  `insId` int(11) NOT NULL,
  PRIMARY KEY (`limitId`)
) ENGINE=InnoDB AUTO_INCREMENT=1222 DEFAULT CHARSET=utf8;

/*Data for the table `course_limit` */

insert  into `course_limit`(`limitId`,`classId`,`insId`) values 
(1002,1002,1004),
(1003,1002,1005),
(1006,1005,1005),
(1007,1006,1001),
(1008,1006,1002),
(1009,1007,1004),
(1010,1007,1005),
(1011,1008,1001),
(1196,1095,1001),
(1197,1095,1002),
(1198,1095,1004),
(1199,1095,1005),
(1219,1097,1002),
(1220,1097,1004),
(1221,1097,1005);

/*Table structure for table `institution` */

DROP TABLE IF EXISTS `institution`;

CREATE TABLE `institution` (
  `insId` int(11) NOT NULL AUTO_INCREMENT,
  `insName` varchar(200) NOT NULL,
  PRIMARY KEY (`insId`)
) ENGINE=InnoDB AUTO_INCREMENT=1006 DEFAULT CHARSET=utf8;

/*Data for the table `institution` */

insert  into `institution`(`insId`,`insName`) values 
(1001,'信息科学技术学院'),
(1002,'医学院'),
(1004,'管理学院'),
(1005,'经济学院');

/*Table structure for table `loginusers` */

DROP TABLE IF EXISTS `loginusers`;

CREATE TABLE `loginusers` (
  `adminid` int(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `loginusers` */

insert  into `loginusers`(`adminid`,`username`,`password`) values 
(1,'admin','admin'),
(2,'kth','123');

/*Table structure for table `ss` */

DROP TABLE IF EXISTS `ss`;

CREATE TABLE `ss` (
  `number` varchar(10) NOT NULL,
  `password` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`number`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `ss` */

insert  into `ss`(`number`,`password`) values 
('2016012742','202919'),
('2016012748','133512'),
('2016012745','569873'),
('2016012744','123456'),
('2016012746','999999'),
('2016012456','555555'),
('2016012743','222222'),
('4444444444','444444'),
('2016012777','777777'),
('2016012888','888888'),
('2016012753','123456');

/*Table structure for table `stu_introduction` */

DROP TABLE IF EXISTS `stu_introduction`;

CREATE TABLE `stu_introduction` (
  `id` varchar(30) NOT NULL DEFAULT '',
  `name` varchar(30) NOT NULL,
  `sex` varchar(30) NOT NULL,
  `college` varchar(30) NOT NULL,
  `classes` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `stu_introduction` */

insert  into `stu_introduction`(`id`,`name`,`sex`,`college`,`classes`) values 
('2016012748','刘政琪','男','信息工程学院','电子商务1601'),
('2016012746','张京','男','信息工程学院','电子商务1601'),
('2016012743','王宇轩','男','信息工程学院','电子商务1601'),
('2016012744','陶原','男','信息工程学院','电子商务1601'),
('2016012742','王竟宇','男','信息工程学院','电子商务1601'),
('2016012777','江鹏','男','信息工程学院','电子商务1602'),
('2016012888','马明月','男','信息工程学院','电子商务1602'),
('2016012753','严昊','男','信息工程学院','电子商务1601');

/*Table structure for table `stu_select` */

DROP TABLE IF EXISTS `stu_select`;

CREATE TABLE `stu_select` (
  `sid` varchar(30) NOT NULL DEFAULT '',
  `sname` varchar(30) DEFAULT NULL,
  `cid` varchar(30) NOT NULL DEFAULT '',
  `course` varchar(30) DEFAULT NULL,
  `result` int(30) DEFAULT NULL,
  PRIMARY KEY (`sid`,`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `stu_select` */

insert  into `stu_select`(`sid`,`sname`,`cid`,`course`,`result`) values 
('2016012748','刘政琪','001','电子商务供应链',72),
('2016012748','刘政琪','101','体育',85),
('2016012744','陶原','002','数据结构',86),
('2016012744','陶原','003','windows程序设计',98),
('2016012888','马明月','004','大学计算机基础',95),
('2016012748','刘政琪','002','数据结构',80),
('2016012888','马明月','002','数据结构',99),
('2016012777','江鹏','002','数据结构',100),
('2016012753','严昊','002','数据结构',65),
('2016012742','王竟宇','002','数据结构',97),
('2016012742','王竟宇','201','离散数学',89);

/*Table structure for table `student` */

DROP TABLE IF EXISTS `student`;

CREATE TABLE `student` (
  `stuId` int(11) NOT NULL,
  `stuName` varchar(200) NOT NULL,
  `stuPass` varchar(200) NOT NULL,
  `insId` int(11) DEFAULT NULL,
  `insName` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`stuId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `student` */

insert  into `student`(`stuId`,`stuName`,`stuPass`,`insId`,`insName`) values 
(2018000001,'张三','123asd',1005,'经济学院'),
(2018000002,'李四','2018000002',1001,'信息科学技术学院'),
(2018000003,'王五','123',1005,'经济学院'),
(2018000004,'赵六','2018000004',1005,'经济学院'),
(2018000005,'孙七','2018000005',1004,'管理学院'),
(2018000006,'周八','2018000006',1001,'信息科学技术学院'),
(2018000007,'吴九','2018000007',1004,'管理学院'),
(2018000008,'郑十','2018000008',1001,'信息科学技术学院'),
(2018000009,'刘备','2018000009',1004,'管理学院'),
(2018000010,'关羽','2018000010',1002,'医学院'),
(2018000011,'张飞','2018000011',1002,'医学院');

/*Table structure for table `studentmanager` */

DROP TABLE IF EXISTS `studentmanager`;

CREATE TABLE `studentmanager` (
  `ID` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `数学` int(255) DEFAULT NULL,
  `英语` int(255) DEFAULT NULL,
  `语文` int(255) DEFAULT NULL,
  `物理` int(255) DEFAULT NULL,
  `生物` int(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `studentmanager` */

insert  into `studentmanager`(`ID`,`Name`,`数学`,`英语`,`语文`,`物理`,`生物`) values 
('1234','hello',0,0,0,0,0),
('2017031','student1',100,100,33,33,33),
('2017032','孔潭活',66,100,66,66,66),
('2017033','student2',55,80,100,55,55),
('2017034','student3',99,80,100,100,44);

/*Table structure for table `tea` */

DROP TABLE IF EXISTS `tea`;

CREATE TABLE `tea` (
  `tid` varchar(30) NOT NULL,
  `tpassowrd` varchar(30) NOT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `tea` */

insert  into `tea`(`tid`,`tpassowrd`) values 
('00001','123456'),
('11111','123456');

/*Table structure for table `teacher` */

DROP TABLE IF EXISTS `teacher`;

CREATE TABLE `teacher` (
  `id` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `college` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `teacher` */

insert  into `teacher`(`id`,`name`,`college`) values 
('00001','耿耀君','信息工程学院'),
('11111','杜炜','理学院');

/*Table structure for table `userif` */

DROP TABLE IF EXISTS `userif`;

CREATE TABLE `userif` (
  `uid` varchar(30) NOT NULL DEFAULT '',
  `pwd` varchar(30) DEFAULT NULL,
  `authority` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `userif` */

insert  into `userif`(`uid`,`pwd`,`authority`) values 
('00001','123456','T'),
('11111','123456','T');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userid` varchar(255) NOT NULL DEFAULT '0',
  `username` varchar(255) DEFAULT NULL,
  `userpwd` varchar(255) DEFAULT NULL,
  `sexy` varchar(255) DEFAULT NULL,
  `classgrade` varchar(255) DEFAULT NULL,
  `usertype` varchar(255) DEFAULT NULL,
  `type` int(255) NOT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`userid`,`username`,`userpwd`,`sexy`,`classgrade`,`usertype`,`type`) values 
('1200101','teacher1','1200101','男','1班','教师',1),
('1200102','teacher2','1200102','女','2班','教师',0),
('1200103','teacher3','1200103','女','3班','教师',0),
('1234','hello','123456','男','2班','学生',0),
('2017031','student1','2017031','男','1班','学生',0),
('2017032','孔潭活','2017032','女','1班','学生',0),
('2017033','student2','2017033','女','2班','学生',0),
('2017034','student3','2017034','女','3班','学生',0);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
