<?php
/*
*
*/
class AdminAction extends Action
{
  //调用—_encode()函数，将数组进行编码转哈
   public  function _encode($arr)
  {
    $na = array();
    foreach ( $arr as $k => $value ) {  
      $na[$this->_urlencode($k)] = $this->_urlencode ($value);  
    }
    //return addcslashes(urldecode(json_encode($na)),"\\r");
	return urldecode(json_encode($na));
  }
   public function _urlencode($elem)
  {
    if(is_array($elem)){
    foreach($elem as $k=>$v){
      $na[$this->_urlencode($k)] = $this->_urlencode($v);
    }
    return $na;
  }
  return urlencode($elem);
  }
  //实现人力跟进部门的绑定，主席团主管部门的绑定
  public function index()
  {
    session_name('LOGIN');
    session_start();
    if(!$this->judgelog())
      $this->redirect('Login/index'); 
	
	//只有人力的部长才能访问到
	$account=$_SESSION['account'];
	$person_model=new Model("Person");
	$person_info=$person_model->where("account=$account")->find();
	if($person_info['apartment']!=2 || $person_info['type']!=3)
	  $this->redirect('Home/index');
	  
	$this->display();
  }
  //向前端发送人力干事跟进部门、主席团主管部门的信息
  public function funcBindInfo()
  {
    //主席团主管部门的信息
	$person_model=new Model("Person");
	$president_model=new Model("President");
	$rlgj_model=new Model("Rlgj");
	$person_info=$person_model->where("type=4")->select();
	foreach($person_info as $v)
	{
	  $zxt_account=$v['account'];
	  $person_info=$person_model->where("account=$zxt_account")->find();
	  $zxt_name=$person_info['name'];
	  //找出负责的部门
	  $president_info=$president_model->where("account=$zxt_account")->find();
	  if($president_info['is_sub']=='n')
	  {
	    unset($department);
		if(!empty($president_info['apartment1']))
		{
	     $department[]=Array(
		   "num"=>$president_info['apartment1'],
		 );
		}
		if(!empty($president_info['apartment2']))
		{
		  $department[]=Array(
		    "num"=>$president_info['apartment2'],
		  );
		}
	  }
		//echo $zxt_name."是真主席";
	  
	  else
	  {
	    unset($department);
	    $department[]=Array(
		  "num"=>$president_info['apartment1'],
		);
		$department[]=Array(
		  "num"=>$president_info['apartment2'],
		);
	  }
	  //echo $this->_encode($department);
	  $arrZXT[]=Array(
	    "account"=>$zxt_account,
		"name"=>$zxt_name,
		"department"=>$department,
	  );
	}
	//unset($department);
	//echo $this->_encode($arrZXT);
	//人力干事跟进部门的信息
	$person_info=$person_model->where("type=2 and apartment=2")->select();
	foreach($person_info as $v)
	{
	  $gs_account=$v['account'];
	  $gs_name=$v['name'];
	  //echo $gs_name."asd";
	  $rlgj_info=$rlgj_model->where("account=$gs_account")->find();
	  if(empty($rlgj_info['apartment']))
	    $apartment=1;
      else
	    $apartment=$rlgj_info['apartment'];
	  $arrRLGS[]=Array(
	    "account"=>$gs_account,
		"name"=>$gs_name,
		"department"=>$apartment,
	  );
	}
	//echo $this->_encode($arrRLGS);
	//获取主席
	unset($zx_account);
	$president_info=$president_model->select();
	foreach($president_info as $v)
	{
	  if($v['is_sub']=='n'){
	    $zx_account=$v['account'];
		$person_info=$person_model->where("account=$zx_account")->find();
		$zx_name=$person_info['name'];
		}
	}
	if(empty($zx_account))
	{
	  $president_info2=$president_model->find();
	  $zx_account=$president_info['account'];
	  $person_info=$person_model->where("account=$zx_account")->find();
	  $zx_name=$person_info['name'];
	}
	 $chairman=Array(
	    "account"=>$zx_account,
		"name"=>$zx_name,
	  );

	//向前端发送json数据
	$arr=Array(
	  "arrZXT"=>$arrZXT,
	  "arrRLGS"=>$arrRLGS,
	  "chairman"=>$chairman,
	  "status"=>"nima",
	);
	echo $this->_encode($arr);
  }
  //接收前端发送过来的人力跟进部门、主席团主管部门的信息
  public function post_BindInfo()
  {
    $status=1;
    if(empty($_POST['arrRLGS']))
      $status=0;

	//指定主席
	
	$president_model=new Model("President");
	$person_model=new Model("Person");
	$rlgj_model=new Model("Rlgj");
	
	$zx_account=$_POST['chairman'];
	//修改前先置is_sub为y
	$data['is_sub']='y';
	$str="n";
	$president_model->where("")->data($data)->save();
	unset($data);
	$data['account']=$zx_account;
	$data['is_sub']='n';
	$president_model->where("account=$zx_account")->data($data)->save();
	//echo $this->_encode($arr); 
	//主席团主管部门
	//$arrZXT=$_POST['arrZXT'];
	
	for($i=0;$i<count($_POST['arrZXT']);$i++)
	{
	  unset($data);
	  $data['apartment1']='';
	  $data['apartment2']='';
	  $data['account']=$_POST['arrZXT'][$i]['account'];
	  $zxt_account=$_POST['arrZXT'][$i]['account'];
	  $president_model->where("account=$zxt_account")->data($data)->save();
	  $apartment1=$_POST['arrZXT'][$i]['arrZGBM'][0]['num'];
	  if(count($_POST['arrZXT'][$i]['arrZGBM'])>1)
	    $apartment2=$_POST['arrZXT'][$i]['arrZGBM'][1]['num'];
	  //先将apartment1和apartment2置空
	  
	  if(!empty($apartment1))
	  {
	    //$status.="进入食堂去";
	    unset($data);
	    $data['account']=$zxt_account;
		$data['apartment1']=$apartment1;
		$president_info=$president_model->where("account=$zxt_account")->data($data)->save();
	    if(!$president_info)
		  $status=0;
	  }
	  if(!empty($apartment2))
	  {
	    unset($data);
	    $data['account']=$zxt_account;
		$data['apartment2']=$apartment2;
		$president_info=$president_model->where("account=$zxt_account")->data($data)->save();
	    if(!$president_info)
		  $status=0;
	  }
	}

	//人力干事跟进部门的信息

	for($i=0;$i<count($_POST['arrRLGS']);$i++)
	{
	  unset($data);
	  $data['account']=$_POST['arrRLGS'][$i]['account'];
	  $apartment=$_POST['arrRLGS'][$i]['department'];
	  $rlgj_info=$rlgj_model->where("apartment=$apartment")->data($data)->save();
	  if(empty($apartment)||empty($data['account']))
	    $status=0;
	}
	//if(empty($_POST['arrZXT'][0]['account']))
	  //$status="没能正常接收";
	//else
	  //$status.=$_POST['arrZXT'][0]['account'];
	
	$arr=Array(
	  'status'=>$_POST['chairman'],
	);
	echo $this->_encode($arr);
  }
  	//每个需要用到判断用户是否登录的地方，都要调用这个方法，每个控制器都有相同的一个
	public function judgelog()
	{
		$judgelog=1;
		session_name('LOGIN');
		session_start();
		if(empty($_SESSION['account'])||empty($_SESSION['random']))
		{
			$judgelog=0;
		}
		else
		{
			$account=$_SESSION['account'];
			$random=$_SESSION['random'];
			$login_model=new Model("Login");
			$login_info=$login_model->where("account=$account and random=$random")->find();
			if(!$login_info)
			{
				//随机数不一样，覆盖掉			
				$judgelog=0;		
			}

		}
		return $judgelog;
	}
}
?>