<?php

/** 删除所有空格
	 * @param String $str
	 * @return String格式化之后字符串 
	 */
function trimall($str) {
	$qian = array (" ","　","\t","\n","\r" );
	$hou = array ("","","","","" );
	return str_replace ( $qian, $hou, $str );
}

/**
 * 将字符串进行正则匹配(将文件中注释内容删除),并将结果放在一个数组中。
 * @param String 待匹配的字符串
 * @return Array 匹配成功后返回的字符串。
 */
function formatFiles($str){
	$patten = '/([\/][\*][^\/\*]+[\*][\/])([^\/\*]+)/i';
	if (preg_match_all ( $patten, $str, $match, PREG_SET_ORDER )) {
		$formtStr='';
		foreach ( $match as $v ) {
			$formtStr=$formtStr.$v[2];
		}
		return  $formtStr;
	}
}

/**
 * 将字符串进行正则匹配(得到匹配class的名称以及值)，并将结果放在一个数组中。
 *
 * @param1 String $pregExp 正则匹配模式
 * @param2 String $formatCss 需要格式化的字符串
 * @return Array 匹配成功后的字符串放在数组中。
 */
function matchCss($pregExp, $formatCss, $posts) {
	$arr = array ();
	$formatCss=formatFiles($formatCss);
	if (preg_match_all ( $pregExp, $formatCss, $match, PREG_SET_ORDER )) {
		foreach ( $match as $value ) {
			foreach ( $posts as $sp ) {
				if($value [2]){
					
				}
				if($value [8]){
					
				}
					
				if ($value [1] === $sp) {
					if($value [2]){
						array_push ( $arr, $value [1].$value [2] . $value [9]);
					}else{
						array_push ( $arr, $value [1] . $value [9]);
					}
				}
				if ($value [7] === $sp) {
					if($value [8]){
						array_push ( $arr, $value [7] .$value [8]. $value [9]);
					}else{
						array_push ( $arr, $value [7] . $value [9]);
					}
					
				}
			}
		}
		return $arr;
	}
}
/**
 *
 * @return String 返回一个正则字符串。
 */
function getPreg() {
	//return '/([.]?[|\w|-]*)(\s*[:]?\s*\w*)([,]?)([.][|\w|-]+)(\s*[:]?\s*\w*)[\s]*([\{][^\{\}]+[\}])/i';
	return '/([.]?[|\w|-]*)(\s*[:]?\s*\w*)([,]?)([.]?[|\w|-]*)(\s*[:]?\s*\w*)([,]?)([.][|\w|-]*)(\s*[:]?\s*\w*)[\s]*([\{][^\{\}]+[\}])/i';
}

/**将文件中内容输出成字符,并且按照大括号的形式进行分割,放入数组中。
 *@param String $file 输入文件名称
 * @return String 返回一个正则字符串。
 */
function fileFmt($file){
	$array=array();
	if(file_exists($file)){
		$data=file_get_contents ( $file );
		$data = str_replace("\n","",$data);
		$arr=(explode('}',$data));
		 foreach ($arr as $vs){
			$vs=$vs.'}';
			array_push($array, $vs);
		} 
	}
	array_pop($array);
	return $array;
}


/**
 * 文件的读取,进行文件的处理
 * @param String $pregExp 需要读出的文件
 * @param String $pregExp 需要写入的文件
 * @return
 *
 */
function fileHandler($fielRead, $fileWiter, $posts) {
	$baseCss = file_get_contents ( $fielRead );
	$formatCss = trimall ( str_replace ( "'", '"', $baseCss ) );
	$pregExp = getPreg ();
	$getArr = matchCss ( $pregExp, $formatCss, $posts );
	$ArrMerged=array_merge($getArr,array_diff(fileFmt($fileWiter),$getArr));
	$ArrMerged=str_replace("}","}\n", $ArrMerged);
	print_r($ArrMerged);
	file_put_contents ( $fileWiter, $ArrMerged);
}
if(isset($_POST ['postClass'])){
	$posts=$_POST ['postClass'];
	fileHandler('../css/rain.css','createdCss.txt',$posts);
}else{
	header('Location:./index.html');
} 

?>
