-- phpMyAdmin SQL Dump
-- version 3.5.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 06 月 04 日 15:22
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
-- 表的结构 `tbl_rlgj`
--

CREATE TABLE IF NOT EXISTS `tbl_rlgj` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `apartment` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- 转存表中的数据 `tbl_rlgj`
--

INSERT INTO `tbl_rlgj` (`id`, `account`, `apartment`) VALUES
(1, '2013053188', 1),
(2, '2013053219', 2),
(3, '2013053241', 3),
(4, '2013053162', 4),
(5, '2013053092', 5),
(6, '2013053175', 6),
(7, '2013053207', 7),
(8, '2013053015', 8),
(9, '2013053062', 9),
(10, '2013053189', 10),
(11, '2013053146', 11);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
