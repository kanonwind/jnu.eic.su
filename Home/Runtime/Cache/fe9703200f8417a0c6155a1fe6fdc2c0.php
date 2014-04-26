<?php if (!defined('THINK_PATH')) exit();?><?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="EN" xml:lang="EN">
	<head>
	<meta http-equiv="content-type" content="text/html;charset=utf-8"/>
	<link rel="shortcut icon" href="logo.jpg" />
	<link href="__PUBLIC__/css/login.css" type="text/css" rel="stylesheet" />
	<script type="text/javascript" src="__PUBLIC__/js/jquery.js"></script>
	<!--<script  type="text/javascript" src="__PUBLIC__/image/login.js"> </script>-->
	<title>登陆您的团委学生会账户</title>
	</head>
	<body>
		<div id="main_body">
	
			<div id="left_big_logo">
				<img id="big_logo" src="__PUBLIC__/image/logo_big.jpg" width="440px" height="440px" alt="暨南大学电气信息学院团委学生会的标准徽标" />
			</div>
	
			<div id="right_login_form">
				<h1>登录您的账户</h1>
				
				<p id="login_error"></p>
				
				<form id="login_info" method="post" action="__URL__/check" >
					<div class="section">
						<div id="user_name_label" class="name_label">
							<span id="head_name_label" >
								团委学生会账户
								<a id="login_what_is_this" class="login_help" href="#">
									这是什么？
								</a>
							</span>
						</div>
						<div>
							<input type="text" name="user_login_name" id="user_login_name" class="login_input"/>
						</div>
						<div id="pw_lable" class="name_label">
							<span>
								密码
							</span>
						</div>
						<div>
							<input type="password" name="user_login_pw" id="user_login_pw" class="login_input"/>
						</div>
						<div id="keep_login_checkbox">
							
							<label for="keep_login">
								<input type="checkbox" id="keep_login" name="keep_login" value="keep" />
								保持我的登录状态
							</label>
						</div>
					</div>
					<div>
						<button id="login_button" type="submit" name="login" title="立即登陆账户" class="c_login_button">
							登陆
						</button>
						<button id="cancel_button" type="submit" name="cancel" title="取消并返回上一页面" class="c_login_button">
							取消
						</button>	
					</div>
							
				</form>
				
				<div>
					<a href="#" id="cna_not_login" class="login_help">
						无法访问您的账户？
					</a>
				</div>
				
				<div id="copyright">
					<hr />
					<p>
						&copy;2014暨南大学电气信息学院团委学生会
					</p>
				</div>
					
					
			</div>
			
		</div>
	</body>
</html>