jQuery(document).ready(function(e) {
    

$(".container .containerx ul").children("li").hide();
$(".container .containerx .conl ul:first").children().show();
$(".container .containerx .conl ul span:eq(0)").addClass("ulx");
$(".container .containerx .conl ul span").click(function(){
	var s=$(".container .containerx .conl ul span").index(this);
	var d=$(".container .containerx .conl ul:first").children("li");
	//$(".container .containerx .conl ul").children("li").not(d).hide();
	$(".container .containerx .conl ul").children("li").hide();		
})
$(".container .containerx .conl ul span").click(function(){
	var s=$(".container .containerx .conl ul span").index(this);
	if($(this).siblings("li").is(":visible")){
		$(this).siblings("li").hide();
		$(".container .containerx .conl ul span").removeClass("ulx");	
	}else{
		$(this).siblings("li").show();
		$(".container .containerx .conl ul span").removeClass("ulx");
		$(this).addClass("ulx");		
	}
})
/*中间*/
$(".container .containerx .conr .what").show();
$(".container .containerx .conr .text ").hide();
$(".container .containerx .conr .what").click(function(){
	r=$(".container .containerx .conr .what").index(this);
	if($(this).siblings().is(":visible")){
		$(this).siblings().hide();
	}else{
		$(this).siblings().show();	
	}	
})
});