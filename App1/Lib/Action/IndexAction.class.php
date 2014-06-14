<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends Action {
    public function index()
	{ 
		$this->display();
    }
	
	//获取前端发送过来的json数据
	public function getJson()
	{

		//获取ID和flag值
		$id=$_POST['id'];
		$flag=$_POST['flag'];
		//$id="12345";
		//$flag=1;
		//判断该id是否存在，不存在则新建
		$zuohengceshi_model=new Model("Zuohengceshi");
		$status=0;
		if(!empty($id))
		{
			$zuohengceshi_info=$zuohengceshi_model->select();
			foreach($zuohengceshi_info as $v)
			{
				if($id==$v['id'])
					$status=1;
			}
		}
		if($status==0 && !empty($id))
		{
			//新增
			unset($data);
			$data['id']=$id;
			$data['page']=0;
			$zuohengceshi_model->add($data);
			//将传过来的flag值添加到page中
			unset($data);
			$data['page']+=$flag;
			$zuohengceshi_info=$zuohengceshi_model->where("id=$id")->data($data)->save();
		}
		if($status==1 && !empty($id))
		{
			$zuohengceshi_info=$zuohengceshi_model->where("id=$id")->find();
			$page=$zuohengceshi_info['page'];
			//将传过来的flag值添加到page中
			unset($data);
			$data['page']=$page+$flag;
			$zuohengceshi_info=$zuohengceshi_model->where("id=$id")->data($data)->save();			
		}
	
		//发送数据
		$arr=Array(
			'page'=>$data['page'],
		);
		echo $this->_encode($arr);
	}
	//向前端发送json数据
	public function sendJson()
	{
		//获取ID
		$id=$_POST['id'];

		//根据ID获取page
		$zuohengceshi_model=new Model("Zuohengceshi");
		$zuohengceshi_info=$zuohengceshi_model->where("id=$id")->find();
		if($zuohengceshi_info)
			$page=$zuohengceshi_info['page'];
		else
			$page=0;
		//发送数据
		$arr=Array(
			'page'=>$page,
		);
		echo $this->_encode($arr);
	}
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
}