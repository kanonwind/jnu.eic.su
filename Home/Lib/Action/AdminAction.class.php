<?php
/*
*
*/
class AdminAction extends Action
{
  //实现人力跟进部门的绑定，主席团主管部门的绑定
  public function index()
  {
    session_name('LOGIN');
    session_start();
    if(empty($_SESSION['account']))
      $this->redirect('Login/index'); 
	$this->display();
	//只有人力的部长才能访问到
	$account=$_SESSION['account'];
	$person_model=new Model("Person");
	$person_info=$person_model->where("account=$account")->find();
	if($person_info['apartment']!=2 || $person_info['type']!=3)
	  $this->redirect('Home/index');
  }
}
?>