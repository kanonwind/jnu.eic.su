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
-- 表的结构 `tbl_president`
--

CREATE TABLE IF NOT EXISTS `tbl_president` (
  `account` varchar(20) NOT NULL,
  `apartment1` int(11) NOT NULL DEFAULT '0',
  `apartment2` int(11) NOT NULL DEFAULT '0',
  `is_sub` varchar(20) NOT NULL DEFAULT 'y',
  PRIMARY KEY (`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `tbl_president`
--

INSERT INTO `tbl_president` (`account`, `apartment1`, `apartment2`, `is_sub`) VALUES
('2011052351', 11, 0, 'n'),
('2011052363', 2, 8, 'y'),
('2011052418', 3, 5, 'y'),
('2011052473', 6, 9, 'y'),
('2011052449', 7, 10, 'y'),
('2011052364', 1, 4, 'y');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
