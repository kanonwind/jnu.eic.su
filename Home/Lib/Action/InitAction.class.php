<?php
/*
*系统初始化
*/
class InitAction extends Action
{
  //整个系统重置，只保留管理员tbl_admin
  public function resetAll()
  {
    //删除成员信息tbl_person	//删除跟进部门信息tbl_rlgj、tbl_president	//删除基本考核表信息tbl_bmkh,tbl_bmty,tbl_bzkh,tbl_bzzp,tbl_gskh,tbl_gszp,tbl_interact,tbl_oneway,tbl_resource,	//删除外调出勤等特殊表格tbl_chuqin,tbl_diaoyan,tbl_wdcs,tbl_yxbz,tbl_yxbzhx,tbl_yxchxz
	//删除反馈表信息tbl_bmfk,tbl_bzfk,tbl_gsfk,
	//删除课表tbl_timetable
	//删除考核授权tbl_authority	
  }
  //人员信息初始化
  public function initPerson()
  {
    //究竟是要提供界面操作还是跑函数，有待商榷
  }
  //人力干事跟进部门初始化
  public function initRlgj()
  {
    $rlgj_model=new Model("Rlgj");
    //总共11个部门
	for($i=1;$i<=11;$i++)
	{
	  unset($data);
	  $data['apartment']=$i;
	  $rlgj_info=$rlgj_model->add($data);
	  if(!$rlgj_info)
	    echo "部门".$i."人力干事跟进部门初始化失败</br>";
	}
  }
  //主席主管部门初始化
  public function initZxzg()
  {
    //找出所有主席团成员
	$person_model=new Model("Person");
	$president_model=new Model("President");
	$person_info=$person_model->where("type=4")->select();
	foreach($person_info as $v)
	{
	  unset($data);
	  $data['account']=$v['account'];
	}
  }
  //某年某月考核系统初始化
  public function initPerform()
  {
    //获取传过来的时间
	//根据tbl_authority判断，若时间已经存在拒绝访问
	//干事自评表，部长自评表，干事自评表，部长考核表，部门考核表
	$this->funcyjjh();
  } 
  //一键激活，包括：干事自评表，部长自评表，干事自评表，部长考核表，部门考核表
  public function funcyjjh()
  {
    //设置年月
	//$year="2014";
	//$month="4";
	$year=$_POST['year'];
	$month=$_POST['month'];
    //一键激活数据库表，包括：
	
	$person_model=new Model("Person");
	$gszp_model=new Model("Gszp");
	$interact_model=new Model("Interact");
	$bzzp_model=new Model("Bzzp");
	$gskh_model=new Model("Gskh");
	$president_model=new Model("President");
	$bzkh_model=new Model("Bzkh");
	$bmkh_model=new Model("Bmkh");
	$oneway_model=new Model("Oneway");
	//出现bug了，应该是bmty
	//$bmty_model=new Model("Bzty");
	$bmty_model=new Model("Bmty");
	echo "干事初始化开始</br>";
	//找出所有干事
	$person_info=$person_model->where("type=1 or type=2")->select();
	foreach($person_info as $v)
	{
	  $account=$v['account'];
	  //基本信息
	  $apartment=$v['apartment'];
	  unset($data);
	  $data['account']=$account;
	  $data['apartment']=$v['apartment'];
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['zptext']="空";
	  //干事自评表，每个部门的干事都要初始化
	  $gszp_info=$gszp_model->add($data);
	  if(!$gszp_info)
	    echo $account."干事自评表初始化出错</br>";
	  //干事推优干事
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$v['apartment'];
	  $data['wtype']=$v['type'];
	  $data['rapartment']=$v['apartment'];
	  $data['rtype']=$v['type'];
	  $data['text']="空";
	  $interact_info=$interact_model->add($data);
	  if(!$interact_info)
	    echo $account."干事推优干事初始化出错</br>";
	  //干事对部长的评价
	  //找出所有部长
	  $person_info_bz=$person_model->where("apartment=$apartment and type=3")->select();
	  foreach($person_info_bz as $v_bz)
	  {
        unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$account;
	    $data['wapartment']=$v['apartment'];
	    $data['wtype']=$v['type'];
		$data['raccount']=$v_bz['account'];
	    $data['rapartment']=$v['apartment'];
	    $data['rtype']=3;
		$data['nm']=1;
		$data['text']="空";
		$interact_info=$interact_model->add($data);
		//判断是否添加成功
		if(!$interact_info)
		  echo $account."干事对部长的评价初始化失败"."</br>";
	  }
	  
	}
	echo "干事初始化完成</br>";
	//干事初始化完成
	//找出所有部长
	echo "部长初始化开始</br>";
	$person_info=$person_model->where("type=3")->select();
	foreach($person_info as $v)
	{
	  //基本信息
	  $apartment=$v['apartment'];
	  $account=$v['account'];
	  //部长自评表
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$apartment;
	  $data['zptext']="空";
	  $bzzp_info=$bzzp_model->add($data);
	  if(!bzzp_info)
	    echo $account."的部长自评初始化失败";
	  //该部长对本部门其他部长的评价
	  $person_info_bz=$person_model->where("apartment=$apartment and type=3")->select();
	  foreach($person_info_bz as $v_bz)
	  {
	    if($v_bz['account']==$v['account'])
		  continue;
		unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$account;
	    $data['wapartment']=$apartment;
	    $data['wtype']=3;
		$data['raccount']=$v_bz['account'];
	    $data['rapartment']=$apartment;
	    $data['rtype']=3;
		$data['nm']=1;
		$data['text']="空";
		$interact_info=$interact_model->add($data);
		if(!interact_info)
		  echo $account."部长对本部门其他部长的评价失败";
	  }

	  //该部长对其主管副主席的评价
	  //找出主管副主席
	  $person_info_zg=$president_model->where("apartment1=$apartment or apartment2=$apartment")->find();
	  $zg_account=$person_info_zg['account'];
      unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$apartment;
	  $data['wtype']=3;
      $data['raccount']=$zg_account;
	  $data['rapartment']=12;
	  $data['rtype']=4;
	  $data['text']="空";
      $interact_info=$interact_model->add($data);	
	  if(!$interact_info)
	    echo $account."对主管副主席评价初始化失败</br>";
	  $person_info_zxt=$person_model->where("type=4")->select();
	  foreach($person_info_zxt as $v_zxt)
	  {
	    $zxt_account=$v_zxt['account'];
      unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['wapartment']=$apartment;
	  $data['wtype']=3;
      $data['raccount']=$zxt_account;
	  $data['rapartment']=12;
	  $data['rtype']=4;
	  $data['text']="空";
	  $data['nm']=1;
	  $interact_info=$interact_model->add($data);	
	  if(!$interact_info)
	    echo $account."主席团成员匿名评价初始化失败</br>";
	  }
      //干事考核表，对部门所有干事的给分
      //找出该部长所有的干事
      $person_info_gs=$person_model->where("apartment=$apartment and (type=1 or type=2)")->select();
      foreach($person_info_gs as $v_gs)
      {
	    //给干事打分
	    unset($data);
	    $data['year']=$year;
	    $data['month']=$month;	
	    $data['waccount']=$account;	
	    $data['wapartment']=$apartment;
        $data['raccount']=$v_gs['account'];	
			$data['total']=0;
			$data['DF1']=0;
			$data['DF2']=0;
			$data['DF3']=0;
			$data['DF4']=0;
			$data['DF5']=0;
			$data['DF6']=0;
			$data['DF7']=0;
			$data['DF8']=0;
			$data['DF9']=0;
			$data['DF10']=0;
			$data['DF11']=0;
			$data['DF12']=0;
			$data['DF13']=0;
			$data['DF14']=0	;			
		$gskh_info=$gskh_model->add($data);
		if(!$gskh_info)
		  echo $account."对干事考核初始化失败</br>";
		//对干事评价
		unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$account;
	    $data['wapartment']=$apartment;
	    $data['wtype']=3;
		$data['raccount']=$v_gs['account'];
	    $data['rapartment']=$apartment;
	    $data['rtype']=$v_gs['type'];
		$data['text']="空";
		$interact_info=$interact_model->add($data);
		if(!interact_info)
		  echo $account."对干事评价初始化失败</br>";
	  }	  
	}
	echo "部长初始化完成</br>";
	//部长初始化完成
	//找出所有主席团成员
	echo "主席团初始化开始</br>";
	$person_info=$person_model->where("type=4")->select();
	//var_dump($person_info);
	foreach($person_info as $v)
	{
	  //每个主席团成员都要对其主管的部门的部长进行考核
	  //基本信息
	  $account=$v['account'];
	  $president_info=$president_model->where("account=$account")->find();


	    if($president_info['is_sub']=='y')//一般主管副主席
		{
		  $apartment_zxt_1=$president_info['apartment1'];
		  //根据第一个部门，对部长、部门进行考核
		  if($apartment_zxt_1!=0)
		  {
		    $person_info_bz=$person_model->where("apartment=$apartment_zxt_1 and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_zxt_1;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			  if(!$bzkh_info)
			    echo $account."对部长评分初始化失败</br>";
			  //进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_zxt_1;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			  if(!$interact_info)
			    echo $account."对部长评价初始化失败</br>";
			}
			//对部门1进行考核
			unset($data);
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$apartment_zxt_1;
			$data['year']=$year;
			$data['month']=$month;
			$data['total']=0;
			$data['DF1']=0;
			$data['DF2']=0;
			$data['DF3']=0;
			$data['DF4']=0;
			$data['DF5']=0;
			$data['DF6']=0;
			$data['DF7']=0;
			$bmkh_info=$bmkh_model->add($data);
			if(!bmkh_info)
			  echo $account."对部门考核初始化失败</br>";
			//对部门的评价
			unset($data);
			$data['year']=$year;
			$data['month']=$month;
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$apartment_zxt_1;
			$data['text']="空";
			$oneway_info=$oneway_model->add($data);
			if(!$oneway_info)
			  echo $account."对部门评价初始化失败</br>";
		  }
		  $apartment_zxt_2=$president_info['apartment2'];
		  //根据第二个部门，对部长进行考核
		  if($apartment_zxt_2!=0)
		  {
		    $person_info_bz=$person_model->where("apartment=$apartment_zxt_2 and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_zxt_2;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			  if(!$bzkh_info)
			    echo $account."对部长评分初始化失败</br>";
			  //进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_zxt_2;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			  if(!$interact_info)
			    echo $account."对部长评价初始化失败</br>";
			}
			//对部门2进行考核
			unset($data);
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$apartment_zxt_2;
			$data['year']=$year;
			$data['month']=$month;
			$data['total']=0;
			$data['DF1']=0;
			$data['DF2']=0;
			$data['DF3']=0;
			$data['DF4']=0;
			$data['DF5']=0;
			$data['DF6']=0;
			$data['DF7']=0;
			$bmkh_info=$bmkh_model->add($data);
			if(!$bmkh_info)
			  echo $account."对部门评价初始化失败</br>";
			//对部门的评价
			unset($data);
			$data['year']=$year;
			$data['month']=$month;
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$apartment_zxt_2;
			$data['text']="空";
			$oneway_model->add($data);
			if(!$oneway_info)
			  echo $account."对部门评价初始化失败</br>";
		  }
		}
		else//略叼主席
		{
		  //对管辖内的部长进行评分评价
		  $apartment_zxt_1=$president_info['apartment1'];
		  //根据第一个部门，对部长、部门进行考核
		  if($apartment_zxt_1!=0)
		  {
		    $person_info_bz=$person_model->where("apartment=$apartment_zxt_1 and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_zxt_1;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			  if(!bzkh_info)
			    echo $account."对部长考核初始化失败</br>";
			  //进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_zxt_1;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			  if(!$interact_info)
			    echo $account."对部长的评价初始化失败</br>";
			}
		  }
		  $apartment_zxt_2=$president_info['apartment2'];
		  //根据第二个部门，对部长进行考核
		  if($apartment_zxt_2!=0)
		  {
		    $person_info_bz=$person_model->where("apartment=$apartment_zxt_2 and type=3")->select();
			foreach($person_info_bz as $v_bz)
			{
			  //进行评分
			  unset($data);
			  $data['waccount']=$account;
			  $data['wapartment']=12;
			  $data['raccount']=$v_bz['account'];
			  $data['rapartment']=$apartment_zxt_2;
			  $data['year']=$year;
			  $data['month']=$month;
			  $bzkh_info=$bzkh_model->add($data);
			  if(!$bzkh_info)
			    echo $account."对部长考核初始化失败</br>";
			  //进行评价
			  unset($data);
	          $data['year']=$year;
	          $data['month']=$month;
	          $data['waccount']=$account;
	          $data['wapartment']=12;
	          $data['wtype']=4;
		      $data['raccount']=$v_bz['account'];
	          $data['rapartment']=$apartment_zxt_2;
	          $data['rtype']=3;
			  $data['text']="空";
		      $interact_info=$interact_model->add($data);
			  if(!$interact_info)
			    echo $account."对部长的评价初始化失败</br>";
			}
		}
		  //对11个部门进行考核
		  //echo $account."</br>";
		  for($i=1;$i<=11;$i++)
		  {
			//对部门$i进行考核
			unset($data);
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$i;
			$data['year']=$year;
			$data['month']=$month;
			$data['total']=0;
			$data['DF1']=0;
			$data['DF2']=0;
			$data['DF3']=0;
			$data['DF4']=0;
			$data['DF5']=0;
			$data['DF6']=0;
			$data['DF7']=0;
			
			$bmkh_info=$bmkh_model->add($data);
			if(!bmkh_info)
			  echo $account."对部门考核初始化失败</br>";
			//对部门的评价
			unset($data);
			$data['year']=$year;
			$data['month']=$month;
			$data['waccount']=$account;
			$data['wapartment']=12;
			$data['rapartment']=$i;
			$data['text']="空";
			$oneway_info=$oneway_model->add($data);
			if(!$oneway_info)
			  echo $account."对部门的评价初始化失败</br>";
		  }
	  }
	
    }
    echo "主席团初始化完成</br>";  
  } 
  //一键考核补充：主席团的部门推优
  public function funcinitbmty()
  {
    //$year="2014";
	//$month="4";
    $year=$_POST['year'];
	$month=$_POST['month'];
	echo "主席团的部门推优初始化开始</br>";
	//找出所有主席团成员
	$person_model=new Model("Person");
	$bmty_model=new Model("Bmty");
	$person_info=$person_model->where("type=4")->select();
	//var_dump($person_info);
	foreach($person_info as $v)
	{
	  //每个主席团成员都要对其主管的部门的部长进行考核
	  //基本信息
	  $account=$v['account'];


	  //不管是不是主席，都得对非主管部门推优
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['waccount']=$account;
	  $data['rapartment']=1;
	  $data['tyly']="空";
	  $bmty_info=$bmty_model->add($data);
	  if(!bmty_info)
	    echo $account."对非主管部门推优初始化失败</br>";
	}
	echo "主席团的部门推优初始化完成</br>";
  }
  //一键考核补充：成该月份的干事反馈表
  public function funcinitgsfk()
  {
    //$year="2014";
    //$month="4";
    $year=$_POST['year'];
    $month=$_POST['month'];
    $person_model=new Model("Person");
    $gsfk_model=new Model("Gsfk");
    //找到所有的干事
    echo "干事反馈表初始化开始</br>";
    $person_info=$person_model->where("type=1 or type=2")->select();
    foreach($person_info as $v)
    {
      //echo $v['account']."</br>";
      unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$v['account'];
	  $data['total']=0;
	  $data['rank']=0;
	  $data['yxgs']=0;
	  $data['zpdf']=0;
	  $data['bzpjdf']=0;
	  $data['cqdf']=0;
	  $data['wddf']=0;
	  $data['tydf']=0;
	  $data['fkdf']=0;
	  $data['qtdf']=0;
	  $gsfk_info=$gsfk_model->add($data);
	  if(!gsfk_info) 
	   echo $v['account']."干事反馈初始化失败</br>";
    }
    echo "干事反馈表初始化开始</br>";
  }
 //一键考核补充：该月份的部长反馈表
  public function funcinitbzfk()
  {
    echo "部长反馈表初始化开始</br>";
    //找出所有的部长
	//$year="2014";
	//$month="4";
	$year=$_POST['year'];
	$month=$_POST['month'];
	$person_model=new Model("Person");
	$bzfk_model=new Model("Bzfk");
	$person_info=$person_model->where("type=3")->select();
	foreach($person_info as $v)
	{
	  $bz_account=$v['account'];
	  unset($data);
	  $data['year']=$year;
	  $data['month']=$month;
	  $data['account']=$bz_account;
	  $data['total']=0;
	  $data['rank']=0;
	  $data['yxbz']=0;
	  $data['zpdf']=0;
	  $data['zxpjdf']=0;
	  $data['gspjdf']=0;
	  $data['bzpjdf']=0;
	  $data['cqdf']=0;
	  $data['wddf']=0;
	  $data['fkdf']=0;
	  $data['qtdf']=0;
	  $bzfk_info=$bzfk_model->add($data);
	  if(!bzfk_info)
	    echo $data['account']."部长反馈表初始化失败</br>";
	}
	echo "部长反馈表初始化完成</br>";
  }
  //一键考核补充，该月份的部门反馈表
  public function funcinitbmfk()
  {
   //$year="2014";
   //$month="4";
   $year=$_POST['year'];
   $month=$_POST['month'];
   echo "部门反馈表初始化开始</br>";
   $bmfk_model=new Model("Bmfk");
   //找出11个部门
   for($i=1;$i<=11;$i++)
   {
     unset($data);
	 $data['year']=$year;
	 $data['month']=$month;
	 $data['apartment']=$i;
	 $data['total']=0;
	 $data['rank']=0;
	 $data['yxbm']=0;
	 $data['zxpjdf']=0;
	 $data['zgpjdf']=0;
	 $data['cqdf']=0;
	 $data['wgkf']=0;
	 $data['fkdf']=0;
	 $data['tydf']=0;
	 $data['qtdf']=0;
	 $data['yxbz']=0;
	 $bmfk_info=$bmfk_model->add($data);
	 if(!$bmfk_info)
	   echo $i."部门反馈表初始化失败</br>";
   }
   echo "部门反馈表初始化结束</br>";
  }
  //一键考核补充：该月的优秀部长评定表
  public function funcinityxbz()
  {
    //$year="2014";
	//$month="4";
	$year=$_POST['year'];
	$month=$_POST['month'];
    //找到所有主席
	echo "优秀部长评定表初始化开始</br>";
	$person_model=new Model("Person");
	$yxbz_model=new Model("Yxbz");
	$president_model=new Model("President");
	$yxbzhx_model=new Model("Yxbzhx");
	$yxbzhx_info=$yxbzhx_model->select();
    //从优秀部长候选中选
	$person_model=$person_model->where("type=4")->select();
	foreach($person_model as $v)
	{
	  //必须投四个部长
	  foreach($yxbzhx_info as $v_hx)
	  {
	    unset($data);
	    $data['year']=$year;
	    $data['month']=$month;
	    $data['waccount']=$v['account'];
		$data['raccount']=$v_hx['HX'];
		//被投部长默认为空，方便使用是用empty()判断
	    $data['checked']=0;
		$yxbz_info=$yxbz_model->add($data);
		if(!$yxbz_info)
		  echo $data['waccount']."优秀部长评定初始化失败";
     }
   }
   echo "优秀部长评定表初始化完成</br>";
  }
  //一键考核补充，该月的外调次数表
  public function funcinitwdcs()
  {
   //$year="2014";
   //$month="4";
   $year=$_POST['year'];
   $month=$_POST['month'];
   $wdcs_model=new Model("Wdcs");
   $person_model=new Model("Person");
   echo "外调次数初始化开始</br>";
   //每个部门的干事初始化
   for($i=1;$i<=11;$i++)
   {
     $person_info=$person_model->where("apartment=$i and (type=1 or type=2)")->select();
	 foreach($person_info as $v)
	 {
	   unset($data);
	   $data['year']=$year;
	   $data['month']=$month;
	   $data['account']=$v['account'];
	   $data['wdcs']=0;
	   $data['rank']=0;
	   $wdcs_info=$wdcs_model->add($data);
	   if(!$wdcs_info)
	     echo $data['account']."外调次数初始化失败</br>";
	 }
   }
   echo "外调次数初始化结束</br>";
  }
  //一键考核补充，该月的出勤统计
  public function funcinitchuqin()
  {
    $year=$_POST['year'];
    $month=$_POST['month'];
	$person_model=new Model("Person");
	$chuqin_model=new Model("Chuqin");
	$rlgj_model=new Model("Rlgj");
	//共11个部门，根据跟进干事记录各部门的出勤情况
  }
  //一键考核补充，该月的调研采纳统计
  public function funcinitdiaoyan()
  {}
  //一键考核补充，该月的优秀部长候选
  public function funcinityxbzhx()
  {}
  //一键考核补充，该月的优秀称号限制
  public function funcinityxchxz()
  {}
}
?>