-- phpMyAdmin SQL Dump
-- version 3.5.4
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 05 月 28 日 16:48
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
-- 表的结构 `tbl_oneway`
--

CREATE TABLE IF NOT EXISTS `tbl_oneway` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `wapartment` int(11) NOT NULL,
  `rapartment` int(11) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=169 ;

--
-- 转存表中的数据 `tbl_oneway`
--

INSERT INTO `tbl_oneway` (`id`, `year`, `month`, `waccount`, `wapartment`, `rapartment`, `text`) VALUES
(85, '2014', '4', '2011052351', 12, 1, '空'),
(86, '2014', '4', '2011052351', 12, 2, '空'),
(87, '2014', '4', '2011052351', 12, 3, '空'),
(88, '2014', '4', '2011052351', 12, 4, '空'),
(89, '2014', '4', '2011052351', 12, 5, '空'),
(90, '2014', '4', '2011052351', 12, 6, '空'),
(91, '2014', '4', '2011052351', 12, 7, '空'),
(92, '2014', '4', '2011052351', 12, 8, '空'),
(93, '2014', '4', '2011052351', 12, 9, '空'),
(94, '2014', '4', '2011052351', 12, 10, '空'),
(95, '2014', '4', '2011052351', 12, 11, '空'),
(96, '2014', '4', '2011052363', 12, 2, '部员工作热情很高涨，但是也要注意到有不足的地方，永远不要骄傲。'),
(97, '2014', '4', '2011052363', 12, 8, '要让部门的感情联络起来，部员的工作热情不是很高，下个月至少要弄个部门活动。'),
(98, '2014', '4', '2011052418', 12, 5, '学术虽然人少了，但是效率还是可以的，但是推理达人的细节考虑不全，好好总结，在接下来的活动引起重视。这一排跟学术交流比较少，当然前段时间私事多了点，很多时候从敏妹那里获悉推理达人的事情，学术也没怎么跟我提起过，所以接下来的毕业生交流会大家一起多多交互信息吧'),
(99, '2014', '4', '2011052418', 12, 3, '首先肯定下你们都很用心去弄推理达人，但细节考虑不够周全；关于电宣方面我有个提议，风格可以大胆点，但要适合学生，年轻人那种审美.'),
(100, '2014', '4', '2011052473', 12, 6, '对体育部近期的工作不是特别满意，虽然大家都在尽自己的一份力，但是若部长们没筹划、引导好，只会事倍功半，要正视这个问题'),
(101, '2014', '4', '2011052473', 12, 9, '文娱的整体凝聚力很强，办事效率也高，不过有时小细节上会处理不好，继续加油'),
(102, '2014', '4', '2011052449', 12, 10, '近来表现的很好，但是对于一些问题的发现还是缺乏及时性。希望以后能增加对突发事件的处理能力。又及，我虽然平时批评意见提的比较多，但还是很看好你们的，我是个很护短的人，你们有错了我骂得别人骂不得，所以你们以后尽量少犯点错，偶尔犯点错给我骂骂，但是不要错到给别人骂的地步。这就是我对你们的期望。'),
(103, '2014', '4', '2011052449', 12, 7, '对于活动的总结，你们已经成文，但是希望总结的经验能够传下去；同时，不要忘记KSC作为一个俱乐部的日常活动；另，我并不懂太多的专业知识，所以，即使我是个很啰嗦的上级，但关于太专业的意见我无法提出，所以我关注的点会比较细，而且都是关于组织方面的，技术方面的漏洞，希望你们自己能够查漏补缺，并且好好培养下一代传人。'),
(104, '2014', '4', '2011052364', 12, 4, '永远都是一个超有爱的部门~'),
(105, '2014', '4', '2011052364', 12, 1, '尽管事情比较琐碎但你们还是还有耐心有热情,很不错!'),
(168, '2014', '5', '2011052364', 12, 4, '空'),
(167, '2014', '5', '2011052364', 12, 1, '空'),
(166, '2014', '5', '2011052449', 12, 10, '空'),
(165, '2014', '5', '2011052449', 12, 7, '空'),
(164, '2014', '5', '2011052473', 12, 9, '空'),
(163, '2014', '5', '2011052473', 12, 6, '空'),
(162, '2014', '5', '2011052418', 12, 5, '空'),
(161, '2014', '5', '2011052418', 12, 3, '空'),
(160, '2014', '5', '2011052363', 12, 8, '空'),
(159, '2014', '5', '2011052363', 12, 2, '空'),
(158, '2014', '5', '2011052351', 12, 11, '空'),
(157, '2014', '5', '2011052351', 12, 10, '空'),
(156, '2014', '5', '2011052351', 12, 9, '空'),
(155, '2014', '5', '2011052351', 12, 8, '空'),
(154, '2014', '5', '2011052351', 12, 7, '空'),
(153, '2014', '5', '2011052351', 12, 6, '空'),
(152, '2014', '5', '2011052351', 12, 5, '空'),
(151, '2014', '5', '2011052351', 12, 4, '空'),
(150, '2014', '5', '2011052351', 12, 3, '空'),
(149, '2014', '5', '2011052351', 12, 2, '空'),
(148, '2014', '5', '2011052351', 12, 1, '空');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
