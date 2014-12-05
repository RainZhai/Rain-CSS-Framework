<?php 
//topic data
    header('Content-Type:application/javascript;charset=utf-8');
	$str = array(
		'list' => array(
			array(
				'showimg' => true,
				'url' => '#/topic1',
				'imgurl' => 'images/t1.jpg',
				'name' => '双十一，游戏也来年终大促！',
				'date' => '2014-11-11',
				'intro' => '游戏年终大促，双11敢玩赶送！手机、京东购物卡、话费拿到你手软！不玩？小心后悔剁手啊'
			)
		),
		'morebtn' => false
	);

	$jsonencode = json_encode($str);
	echo "var data =".$jsonencode;
?>