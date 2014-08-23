<?php
//注意，请不要在这里配置SAE的数据库，配置你本地的数据库就可以了。
return array(
    //'配置项'=>'配置值'
    'SHOW_PAGE_TRACE'=>true,
    'URL_HTML_SUFFIX'=>'.html',
	'DB_TYPE'=>'mysql',   //设置数据库类型
	'DB_PREFIX'=>'tbl_',  //设置表前缀
/* 	//SAE上测试用下面配置
	'DB_HOST'=>'SAE_MYSQL_HOST_M',//设置主机
	'DB_NAME'=>'SAE_MYSQL_DB',//设置数据库名
	'DB_USER'=>'SAE_MYSQL_USER',    //设置用户名
	'DB_PWD'=>'SAE_MYSQL_PASS',        //设置密码
	'DB_PORT'=>'SAE_MYSQL_PORT',   //设置端口号 */
	//本地测试用下面配置
	'DB_HOST'=>'localhost',//设置主机
	'DB_NAME'=>'app_jnueicsu',//设置数据库名
	'DB_USER'=>'root',    //设置用户名
	'DB_PWD'=>'',        //设置密码
	'DB_PORT'=>'3306',   //设置端口号	

);
?>