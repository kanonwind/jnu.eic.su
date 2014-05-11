-- phpMyAdmin SQL Dump
-- version 3.5.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 05 月 06 日 07:00
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
-- 表的结构 `tbl_bmkh`
--

CREATE TABLE IF NOT EXISTS `tbl_bmkh` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `wapartment` int(11) NOT NULL,
  `rapartment` int(11) NOT NULL,
  `total` float NOT NULL DEFAULT '0',
  `DF1` float NOT NULL DEFAULT '0',
  `DF2` float NOT NULL DEFAULT '0',
  `DF3` float NOT NULL DEFAULT '0',
  `DF4` float NOT NULL DEFAULT '0',
  `DF5` float NOT NULL DEFAULT '0',
  `DF6` float NOT NULL DEFAULT '0',
  `DF7` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=106 ;

--
-- 转存表中的数据 `tbl_bmkh`
--

INSERT INTO `tbl_bmkh` (`id`, `year`, `month`, `waccount`, `wapartment`, `rapartment`, `total`, `DF1`, `DF2`, `DF3`, `DF4`, `DF5`, `DF6`, `DF7`) VALUES
(85, '2014', '4', '2011052351', 12, 1, 0, 7, 8, 9, 10, 8, 9, 9),
(86, '2014', '4', '2011052351', 12, 2, 0, 9, 10, 10, 9, 9, 8, 8),
(87, '2014', '4', '2011052351', 12, 3, 0, 10, 9, 9, 10, 8, 9, 8),
(88, '2014', '4', '2011052351', 12, 4, 0, 8, 9, 8, 7, 9, 7, 8),
(89, '2014', '4', '2011052351', 12, 5, 0, 7, 8, 8, 9, 7, 7, 7),
(90, '2014', '4', '2011052351', 12, 6, 0, 8, 8, 9, 8, 7, 7, 7),
(91, '2014', '4', '2011052351', 12, 7, 0, 7, 7, 7, 8, 8, 7, 7),
(92, '2014', '4', '2011052351', 12, 8, 0, 8, 8, 8, 8, 6, 6, 6),
(93, '2014', '4', '2011052351', 12, 9, 0, 8, 9, 8, 8, 8, 7, 8),
(94, '2014', '4', '2011052351', 12, 10, 0, 8, 9, 9, 6, 9, 8, 7),
(95, '2014', '4', '2011052351', 12, 11, 0, 8, 10, 9, 9, 8, 7, 8),
(96, '2014', '4', '2011052363', 12, 2, 0, 9.5, 9, 9.7, 9, 9, 9, 9),
(97, '2014', '4', '2011052363', 12, 8, 0, 8, 9, 8, 9, 8, 7.8, 8),
(98, '2014', '4', '2011052418', 12, 5, 0, 9, 8, 8, 9, 9, 7, 8),
(99, '2014', '4', '2011052418', 12, 3, 0, 9, 7, 8, 9, 9, 7, 8),
(100, '2014', '4', '2011052473', 12, 6, 0, 8, 7, 7, 9, 9, 7, 8),
(101, '2014', '4', '2011052473', 12, 9, 0, 8, 9, 9, 9, 9, 8, 9),
(102, '2014', '4', '2011052449', 12, 10, 0, 9, 8.5, 9, 9, 10, 8, 9),
(103, '2014', '4', '2011052449', 12, 7, 0, 9, 8.5, 8.5, 9, 9, 8.5, 9),
(104, '2014', '4', '2011052364', 12, 4, 0, 8, 7, 9, 8, 10, 6, 9),
(105, '2014', '4', '2011052364', 12, 1, 0, 8, 8, 8, 9, 10, 8, 9);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
