-- MySQL dump 10.13  Distrib 5.5.31, for Win32 (x86)
--
-- Host: localhost    Database: zuoheng
-- ------------------------------------------------------
-- Server version	5.5.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_admin`
--

DROP TABLE IF EXISTS `tbl_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_admin` (
  `account` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_admin`
--

LOCK TABLES `tbl_admin` WRITE;
/*!40000 ALTER TABLE `tbl_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_authority`
--

DROP TABLE IF EXISTS `tbl_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_authority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_authority`
--

LOCK TABLES `tbl_authority` WRITE;
/*!40000 ALTER TABLE `tbl_authority` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_bmfk`
--

DROP TABLE IF EXISTS `tbl_bmfk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_bmfk` (
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bmfk`
--

LOCK TABLES `tbl_bmfk` WRITE;
/*!40000 ALTER TABLE `tbl_bmfk` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_bmfk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_bmkh`
--

DROP TABLE IF EXISTS `tbl_bmkh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_bmkh` (
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bmkh`
--

LOCK TABLES `tbl_bmkh` WRITE;
/*!40000 ALTER TABLE `tbl_bmkh` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_bmkh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_bmty`
--

DROP TABLE IF EXISTS `tbl_bmty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_bmty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `rapartment` int(11) NOT NULL,
  `tyly` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bmty`
--

LOCK TABLES `tbl_bmty` WRITE;
/*!40000 ALTER TABLE `tbl_bmty` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_bmty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_bzfk`
--

DROP TABLE IF EXISTS `tbl_bzfk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_bzfk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `account` varchar(20) NOT NULL,
  `total` float NOT NULL,
  `rank` int(11) NOT NULL,
  `yxbz` float NOT NULL,
  `zpdf` float NOT NULL,
  `zxpjdf` float NOT NULL,
  `gspfdf` float NOT NULL,
  `bzpjdf` float NOT NULL,
  `cqdf` float NOT NULL,
  `wddf` float NOT NULL,
  `fkdf` float NOT NULL,
  `qtdf` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bzfk`
--

LOCK TABLES `tbl_bzfk` WRITE;
/*!40000 ALTER TABLE `tbl_bzfk` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_bzfk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_bzkh`
--

DROP TABLE IF EXISTS `tbl_bzkh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_bzkh` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waccount` varchar(20) CHARACTER SET utf8 NOT NULL,
  `wapartment` int(11) NOT NULL,
  `raccount` varchar(20) CHARACTER SET utf8 NOT NULL,
  `rapartment` int(11) NOT NULL,
  `year` varchar(20) CHARACTER SET utf8 NOT NULL,
  `month` varchar(20) CHARACTER SET utf8 NOT NULL,
  `total` float NOT NULL DEFAULT '0',
  `DF1` float NOT NULL DEFAULT '0',
  `DF2` float NOT NULL DEFAULT '0',
  `DF3` float NOT NULL DEFAULT '0',
  `DF4` float NOT NULL DEFAULT '0',
  `DF5` float NOT NULL DEFAULT '0',
  `DF6` float NOT NULL DEFAULT '0',
  `DF7` float NOT NULL DEFAULT '0',
  `DF8` float NOT NULL DEFAULT '0',
  `DF9` float NOT NULL DEFAULT '0',
  `DF10` float NOT NULL DEFAULT '0',
  `DF11` float NOT NULL DEFAULT '0',
  `DF12` float NOT NULL DEFAULT '0',
  `DF13` float NOT NULL DEFAULT '0',
  `DF14` float NOT NULL DEFAULT '0',
  `DF15` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bzkh`
--

LOCK TABLES `tbl_bzkh` WRITE;
/*!40000 ALTER TABLE `tbl_bzkh` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_bzkh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_bzzp`
--

DROP TABLE IF EXISTS `tbl_bzzp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_bzzp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `waccount` varchar(20) CHARACTER SET utf8 NOT NULL,
  `wapartment` int(11) NOT NULL,
  `year` varchar(20) CHARACTER SET utf8 NOT NULL,
  `month` varchar(20) CHARACTER SET utf8 NOT NULL,
  `zptext` text CHARACTER SET utf8 NOT NULL,
  `total` float NOT NULL DEFAULT '0',
  `DF1` float NOT NULL DEFAULT '0',
  `DF2` int(11) NOT NULL DEFAULT '0',
  `DF3` float NOT NULL DEFAULT '0',
  `DF4` float NOT NULL DEFAULT '0',
  `DF5` float NOT NULL DEFAULT '0',
  `DF6` float NOT NULL DEFAULT '0',
  `DF7` float NOT NULL DEFAULT '0',
  `DF8` float NOT NULL DEFAULT '0',
  `DF9` float NOT NULL DEFAULT '0',
  `DF10` float NOT NULL DEFAULT '0',
  `DF11` float NOT NULL DEFAULT '0',
  `DF12` float NOT NULL DEFAULT '0',
  `DF13` float NOT NULL DEFAULT '0',
  `DF14` float NOT NULL DEFAULT '0',
  `DF15` float NOT NULL DEFAULT '0',
  `DF16` float NOT NULL DEFAULT '0',
  `DF17` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_bzzp`
--

LOCK TABLES `tbl_bzzp` WRITE;
/*!40000 ALTER TABLE `tbl_bzzp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_bzzp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_chuqin`
--

DROP TABLE IF EXISTS `tbl_chuqin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_chuqin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `raccount` varchar(20) NOT NULL,
  `rapartment` int(11) NOT NULL,
  `qj` int(11) NOT NULL DEFAULT '0',
  `ct` int(11) NOT NULL DEFAULT '0',
  `qx` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_chuqin`
--

LOCK TABLES `tbl_chuqin` WRITE;
/*!40000 ALTER TABLE `tbl_chuqin` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_chuqin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_diaoyan`
--

DROP TABLE IF EXISTS `tbl_diaoyan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_diaoyan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `raccount` int(11) NOT NULL,
  `rapartment` int(11) NOT NULL,
  `caina` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_diaoyan`
--

LOCK TABLES `tbl_diaoyan` WRITE;
/*!40000 ALTER TABLE `tbl_diaoyan` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_diaoyan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_gsfk`
--

DROP TABLE IF EXISTS `tbl_gsfk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_gsfk` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `account` varchar(20) NOT NULL,
  `total` float NOT NULL,
  `rank` int(11) NOT NULL,
  `yxgs` float NOT NULL DEFAULT '0',
  `zpdf` float NOT NULL,
  `bzpjdf` float NOT NULL,
  `cqdf` float NOT NULL,
  `wddf` float NOT NULL,
  `tydf` float NOT NULL,
  `fkdf` float NOT NULL,
  `qtdf` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_gsfk`
--

LOCK TABLES `tbl_gsfk` WRITE;
/*!40000 ALTER TABLE `tbl_gsfk` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_gsfk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_gskh`
--

DROP TABLE IF EXISTS `tbl_gskh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_gskh` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `wapartment` int(11) NOT NULL,
  `raccount` varchar(20) NOT NULL,
  `total` float NOT NULL DEFAULT '0',
  `DF1` float NOT NULL DEFAULT '0',
  `DF2` float NOT NULL DEFAULT '0',
  `DF3` float NOT NULL DEFAULT '0',
  `DF4` float NOT NULL DEFAULT '0',
  `DF5` float NOT NULL DEFAULT '0',
  `DF6` float NOT NULL DEFAULT '0',
  `DF7` float NOT NULL DEFAULT '0',
  `DF8` float NOT NULL DEFAULT '0',
  `DF9` float NOT NULL DEFAULT '0',
  `DF10` float NOT NULL DEFAULT '0',
  `DF11` float NOT NULL DEFAULT '0',
  `DF12` float NOT NULL DEFAULT '0',
  `DF13` float NOT NULL DEFAULT '0',
  `DF14` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_gskh`
--

LOCK TABLES `tbl_gskh` WRITE;
/*!40000 ALTER TABLE `tbl_gskh` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_gskh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_gszp`
--

DROP TABLE IF EXISTS `tbl_gszp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_gszp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `account` varchar(20) NOT NULL,
  `apartment` int(11) NOT NULL,
  `zptext` text NOT NULL,
  `total` float NOT NULL DEFAULT '0',
  `DF1` float NOT NULL DEFAULT '0',
  `DF2` float NOT NULL DEFAULT '0',
  `DF3` float NOT NULL DEFAULT '0',
  `DF4` float NOT NULL DEFAULT '0',
  `DF5` float NOT NULL DEFAULT '0',
  `DF6` float NOT NULL DEFAULT '0',
  `DF7` float NOT NULL DEFAULT '0',
  `DF8` float NOT NULL DEFAULT '0',
  `DF9` float NOT NULL DEFAULT '0',
  `DF10` float NOT NULL DEFAULT '0',
  `DF11` float NOT NULL DEFAULT '0',
  `DF12` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_gszp`
--

LOCK TABLES `tbl_gszp` WRITE;
/*!40000 ALTER TABLE `tbl_gszp` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_gszp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_interact`
--

DROP TABLE IF EXISTS `tbl_interact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_interact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `wapartment` int(11) NOT NULL,
  `wtype` int(11) NOT NULL,
  `raccount` varchar(20) NOT NULL,
  `rapartment` int(11) NOT NULL,
  `rtype` int(11) NOT NULL,
  `text` text NOT NULL,
  `DF` float NOT NULL DEFAULT '0',
  `nm` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_interact`
--

LOCK TABLES `tbl_interact` WRITE;
/*!40000 ALTER TABLE `tbl_interact` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_interact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_oneway`
--

DROP TABLE IF EXISTS `tbl_oneway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_oneway` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `wapartment` int(11) NOT NULL,
  `rapartment` int(11) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_oneway`
--

LOCK TABLES `tbl_oneway` WRITE;
/*!40000 ALTER TABLE `tbl_oneway` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_oneway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_person`
--

DROP TABLE IF EXISTS `tbl_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_person` (
  `account` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `sex` varchar(20) NOT NULL,
  `grade` varchar(20) NOT NULL,
  `major` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `short` varchar(20) NOT NULL,
  `qq` varchar(20) NOT NULL,
  `dorm` varchar(20) NOT NULL,
  `birthtype` varchar(20) NOT NULL,
  `birthmonth` varchar(20) NOT NULL,
  `birthyday` varchar(20) NOT NULL,
  `psssword` varchar(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `mail` varchar(20) NOT NULL,
  `apartment` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `position` varchar(20) NOT NULL,
  `is_active` varchar(20) NOT NULL DEFAULT 'n',
  PRIMARY KEY (`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_person`
--

LOCK TABLES `tbl_person` WRITE;
/*!40000 ALTER TABLE `tbl_person` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_president`
--

DROP TABLE IF EXISTS `tbl_president`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_president` (
  `account` varchar(20) NOT NULL,
  `apartment1` int(11) NOT NULL DEFAULT '0',
  `apartment2` int(11) NOT NULL DEFAULT '0',
  `is_sub` varchar(20) NOT NULL DEFAULT 'y',
  PRIMARY KEY (`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_president`
--

LOCK TABLES `tbl_president` WRITE;
/*!40000 ALTER TABLE `tbl_president` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_president` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_resource`
--

DROP TABLE IF EXISTS `tbl_resource`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `account` varchar(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  `assess` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_resource`
--

LOCK TABLES `tbl_resource` WRITE;
/*!40000 ALTER TABLE `tbl_resource` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_resource` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_rlgj`
--

DROP TABLE IF EXISTS `tbl_rlgj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_rlgj` (
  `account` varchar(20) NOT NULL,
  `apartment` int(11) NOT NULL,
  PRIMARY KEY (`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_rlgj`
--

LOCK TABLES `tbl_rlgj` WRITE;
/*!40000 ALTER TABLE `tbl_rlgj` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_rlgj` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_timetable`
--

DROP TABLE IF EXISTS `tbl_timetable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_timetable` (
  `account` varchar(20) NOT NULL,
  `A1` varchar(20) DEFAULT 'n',
  `A2` varchar(20) DEFAULT 'n',
  `A3` varchar(20) DEFAULT 'n',
  `A4` varchar(20) DEFAULT 'n',
  `A5` varchar(20) DEFAULT 'n',
  `A6` varchar(20) DEFAULT 'n',
  `A7` varchar(20) DEFAULT 'n',
  `A8` varchar(20) DEFAULT 'n',
  `A9` varchar(20) DEFAULT 'n',
  `A10` varchar(20) DEFAULT 'n',
  `A11` varchar(20) DEFAULT 'n',
  `A12` varchar(20) DEFAULT 'n',
  `A13` varchar(20) DEFAULT 'n',
  `A14` varchar(20) DEFAULT 'n',
  `B1` varchar(20) DEFAULT 'n',
  `B2` varchar(20) DEFAULT 'n',
  `B3` varchar(20) DEFAULT 'n',
  `B4` varchar(20) DEFAULT 'n',
  `B5` varchar(20) DEFAULT 'n',
  `B6` varchar(20) DEFAULT 'n',
  `B7` varchar(20) DEFAULT 'n',
  `B8` varchar(20) DEFAULT 'n',
  `B9` varchar(20) DEFAULT 'n',
  `B10` varchar(20) DEFAULT 'n',
  `B11` varchar(20) DEFAULT 'n',
  `B12` varchar(20) DEFAULT 'n',
  `B13` varchar(20) DEFAULT 'n',
  `B14` varchar(20) DEFAULT 'n',
  `C1` varchar(20) DEFAULT 'n',
  `C2` varchar(20) DEFAULT 'n',
  `C3` varchar(20) DEFAULT 'n',
  `C4` varchar(20) DEFAULT 'n',
  `C5` varchar(20) DEFAULT 'n',
  `C6` varchar(20) DEFAULT 'n',
  `C7` varchar(20) DEFAULT 'n',
  `C8` varchar(20) DEFAULT 'n',
  `C9` varchar(20) DEFAULT 'n',
  `C10` varchar(20) DEFAULT 'n',
  `C11` varchar(20) DEFAULT 'n',
  `C12` varchar(20) DEFAULT 'n',
  `C13` varchar(20) DEFAULT 'n',
  `C14` varchar(20) DEFAULT 'n',
  `D1` varchar(20) DEFAULT 'n',
  `D2` varchar(20) DEFAULT 'n',
  `D3` varchar(20) DEFAULT 'n',
  `D4` varchar(20) DEFAULT 'n',
  `D5` varchar(20) DEFAULT 'n',
  `D6` varchar(20) DEFAULT 'n',
  `D7` varchar(20) DEFAULT 'n',
  `D8` varchar(20) DEFAULT 'n',
  `D9` varchar(20) DEFAULT 'n',
  `D10` varchar(20) DEFAULT 'n',
  `D11` varchar(20) DEFAULT 'n',
  `D12` varchar(20) DEFAULT 'n',
  `D13` varchar(20) DEFAULT 'n',
  `D14` varchar(20) DEFAULT 'n',
  `E1` varchar(20) DEFAULT 'n',
  `E2` varchar(20) DEFAULT 'n',
  `E3` varchar(20) DEFAULT 'n',
  `E4` varchar(20) DEFAULT 'n',
  `E5` varchar(20) DEFAULT 'n',
  `E6` varchar(20) DEFAULT 'n',
  `E7` varchar(20) DEFAULT 'n',
  `E8` varchar(20) DEFAULT 'n',
  `E9` varchar(20) DEFAULT 'n',
  `E10` varchar(20) DEFAULT 'n',
  `E11` varchar(20) DEFAULT 'n',
  `E12` varchar(20) DEFAULT 'n',
  `E13` varchar(20) DEFAULT 'n',
  `E14` varchar(20) DEFAULT 'n',
  `F1` varchar(20) DEFAULT 'n',
  `F2` varchar(20) DEFAULT 'n',
  `F3` varchar(20) DEFAULT 'n',
  `F4` varchar(20) DEFAULT 'n',
  `F5` varchar(20) DEFAULT 'n',
  `F6` varchar(20) DEFAULT 'n',
  `F7` varchar(20) DEFAULT 'n',
  `F8` varchar(20) DEFAULT 'n',
  `F9` varchar(20) DEFAULT 'n',
  `F10` varchar(20) DEFAULT 'n',
  `F11` varchar(20) DEFAULT 'n',
  `F12` varchar(20) DEFAULT 'n',
  `F13` varchar(20) DEFAULT 'n',
  `F14` varchar(20) DEFAULT 'n',
  `G1` varchar(20) DEFAULT 'n',
  `G2` varchar(20) DEFAULT 'n',
  `G3` varchar(20) DEFAULT 'n',
  `G4` varchar(20) DEFAULT 'n',
  `G5` varchar(20) DEFAULT 'n',
  `G6` varchar(20) DEFAULT 'n',
  `G7` varchar(20) DEFAULT 'n',
  `G8` varchar(20) DEFAULT 'n',
  `G9` varchar(20) DEFAULT 'n',
  `G10` varchar(20) DEFAULT 'n',
  `G11` varchar(20) DEFAULT 'n',
  `G12` varchar(20) DEFAULT 'n',
  `G13` varchar(20) DEFAULT 'n',
  `G14` varchar(20) DEFAULT 'n',
  PRIMARY KEY (`account`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_timetable`
--

LOCK TABLES `tbl_timetable` WRITE;
/*!40000 ALTER TABLE `tbl_timetable` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_timetable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_user` (
  `account` varchar(20) NOT NULL DEFAULT '',
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`account`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES ('2012052308','2012052308');
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_wdcs`
--

DROP TABLE IF EXISTS `tbl_wdcs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_wdcs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `account` varchar(20) NOT NULL,
  `wdcs` int(11) NOT NULL DEFAULT '0',
  `rank` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_wdcs`
--

LOCK TABLES `tbl_wdcs` WRITE;
/*!40000 ALTER TABLE `tbl_wdcs` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_wdcs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_yxbz`
--

DROP TABLE IF EXISTS `tbl_yxbz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_yxbz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` varchar(20) NOT NULL,
  `month` varchar(20) NOT NULL,
  `waccount` varchar(20) NOT NULL,
  `raccount` varchar(20) NOT NULL,
  `checked` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_yxbz`
--

LOCK TABLES `tbl_yxbz` WRITE;
/*!40000 ALTER TABLE `tbl_yxbz` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_yxbz` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-05-02  9:37:05
