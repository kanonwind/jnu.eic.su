-- phpMyAdmin SQL Dump
-- version 3.5.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 06 月 08 日 10:39
-- 服务器版本: 5.5.31
-- PHP 版本: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `zuoheng`
--

-- --------------------------------------------------------

--
-- 表的结构 `tbl_bmty`
--

CREATE TABLE IF NOT EXISTS `tbl_bmty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `rapartment` int(11) NOT NULL,
  `tyly` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- 转存表中的数据 `tbl_bmty`
--

INSERT INTO `tbl_bmty` (`id`, `year`, `month`, `waccount`, `rapartment`, `tyly`) VALUES
(21, '2014', '4', '2011052418', 9, '空'),
(20, '2014', '4', '2011052363', 3, '空'),
(19, '2014', '4', '2011052351', 3, '空'),
(22, '2014', '4', '2011052473', 1, '空'),
(23, '2014', '4', '2011052449', 2, '空'),
(24, '2014', '4', '2011052364', 1, '空'),
(42, '2014', '5', '2011052364', 11, '空'),
(41, '2014', '5', '2011052449', 1, '空'),
(40, '2014', '5', '2011052473', 11, '空'),
(39, '2014', '5', '2011052418', 9, '空'),
(38, '2014', '5', '2011052363', 5, '空'),
(37, '2014', '5', '2011052351', 9, '空');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
