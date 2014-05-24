<?php
/*
*新闻主页
*/
class HomeAction extends Action
{
  //首页
  public function index()
  {
    session_name('LOGIN');
    session_start();
    if(empty($_SESSION['account']))
      $this->redirect('Login/index'); 
	$this->display();
  }
}
?>