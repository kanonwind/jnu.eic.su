<?php
  //1、确定应用名称 前台为home，后台可取为admin，用常量形式定义
  define('APP_NAME','Home');
  //2、确定应用路径
  define('APP_PATH','./Home/');
  //3、开启调试模式
  define('APP_DEBUG',true);
  //4、引入核心文件，区分大小写
  define('ENGINE_NAME','SAE');
  require './ThinkPHP/ThinkPHP.php';
/*   define("HOME_PATH","./ThinkPHP");
  require HOME_PATH.'Extend/Engine/Sae.php'; */
?>