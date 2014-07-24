-- phpMyAdmin SQL Dump
-- version 3.5.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 05 月 28 日 16:45
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
-- 表的结构 `tbl_bmfk`
--

CREATE TABLE IF NOT EXISTS `tbl_bmfk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `apartment` int(11) NOT NULL,
  `total` float NOT NULL,
  `rank` int(11) NOT NULL,
  `yxbm` int(11) NOT NULL DEFAULT '0',
  `zxpjdf` float NOT NULL,
  `zgpjdf` float NOT NULL,
  `cqdf` float NOT NULL,
  `wgkf` float NOT NULL,
  `fkdf` float NOT NULL,
  `tydf` float NOT NULL,
  `qtdf` float NOT NULL,
  `yxbz` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=67 ;

--
-- 转存表中的数据 `tbl_bmfk`
--

INSERT INTO `tbl_bmfk` (`id`, `year`, `month`, `apartment`, `total`, `rank`, `yxbm`, `zxpjdf`, `zgpjdf`, `cqdf`, `wgkf`, `fkdf`, `tydf`, `qtdf`, `yxbz`) VALUES
(23, '2014', '4', 1, 9.35714, 1, 1, 4.28571, 2.57143, 1.9, 0, 0, 0.6, 0, 0),
(24, '2014', '4', 2, 8.75143, 4, 0, 4.5, 2.75143, 1.9, -0.7, 0, 0.3, 0, 0),
(25, '2014', '4', 3, 8.94286, 2, 1, 4.5, 2.44286, 1.9, -0.8, 0.1, 0.6, 0, 0.2),
(26, '2014', '4', 4, 8.44286, 6, 0, 4, 2.44286, 1.9, 0, 0.1, 0, 0, 0),
(27, '2014', '4', 5, 8.07143, 10, 0, 3.78571, 2.48571, 2, -0.2, 0, 0, 0, 0),
(28, '2014', '4', 6, 8.11429, 9, 0, 3.85714, 2.35714, 2, -0.1, 0, 0, 0, 0),
(29, '2014', '4', 7, 8.27857, 7, 0, 3.64286, 2.63571, 1.9, -0.3, 0.2, 0, 0, 0.2),
(30, '2014', '4', 8, 7.84857, 11, 0, 3.57143, 2.47714, 1.9, -0.1, 0, 0, 0, 0),
(31, '2014', '4', 9, 8.81429, 3, 0, 4, 2.61429, 1.8, -0.1, 0, 0.3, 0, 0.2),
(32, '2014', '4', 10, 8.27857, 8, 0, 4, 2.67857, 2, -0.4, 0, 0, 0, 0),
(33, '2014', '4', 11, 8.64286, 5, 0, 4.21429, 2.52857, 1.8, 0, 0.1, 0, 0, 0),
(66, '2014', '5', 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(65, '2014', '5', 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(64, '2014', '5', 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(63, '2014', '5', 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(62, '2014', '5', 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(61, '2014', '5', 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(60, '2014', '5', 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(59, '2014', '5', 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(58, '2014', '5', 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(57, '2014', '5', 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(56, '2014', '5', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
