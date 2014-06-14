-- phpMyAdmin SQL Dump
-- version 3.5.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 06 月 08 日 08:55
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
-- 表的结构 `tbl_yxbzhx`
--

CREATE TABLE IF NOT EXISTS `tbl_yxbzhx` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) CHARACTER SET utf32 NOT NULL,
  `HX` varchar(20) CHARACTER SET utf32 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=54 ;

--
-- 转存表中的数据 `tbl_yxbzhx`
--

INSERT INTO `tbl_yxbzhx` (`id`, `year`, `month`, `HX`) VALUES
(53, '2014', '5', '2012052294'),
(52, '2014', '5', '2012052296'),
(51, '2014', '5', '2012052364'),
(31, '2014', '4', '2012052294'),
(30, '2014', '4', '2012052321'),
(29, '2014', '4', '2012052206'),
(28, '2014', '4', '2012052275'),
(27, '2014', '4', '2012052282'),
(26, '2014', '4', '2012052377'),
(25, '2014', '4', '2012052358'),
(24, '2014', '4', '2012052331'),
(23, '2014', '4', '2012052297'),
(50, '2014', '5', '2012052206'),
(49, '2014', '5', '2012053245'),
(48, '2014', '5', '2012052281'),
(47, '2014', '5', '2012052254'),
(46, '2014', '5', '2012052300'),
(45, '2014', '5', '2012052201'),
(44, '2014', '5', '2012052180'),
(43, '2014', '5', '2012053187');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
