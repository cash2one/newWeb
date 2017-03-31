$(function(){
	$('.search-dc').click(function(){
		var oUl = $('.select-more');
		if(oUl.css('display') == 'block'){
			oUl.hide();
			$(".search-box-show").css("overflow","");
		}else{
			oUl.show();
		}
	});
	$('.select-more li a').click(function(){
		var otext = $(this).text();
		$('.search-dc').html(otext);
		$('.select-more').hide();
	});



	$('.search-input').bind({
		focus:function(){
			if (this.value == this.defaultValue){
				$('.gjc').hide();
			}
		},
		blur:function(){
			if (this.value == ""){
				$('.gjc').show();
			}
		}
	});
	//---searchbar end---

	$('.con0-sxtit').click(function(){

		var oUl = $('.con0-mgul');
		if(oUl.css('display') == 'block'){
			oUl.hide();
		}else{
			oUl.show();
		}
	});

	$('.con0-mgul a').click(function(){
		var otext = $(this).text();

		$('.con0-mgsw').html(otext);

		$('.con0-mgul').hide();
	});


	$('.con1-sxtit').click(function(){

		var oUl = $('.con1-mgul');
		if(oUl.css('display') == 'block'){
			oUl.hide();
		}else{
			oUl.show();
		}
	});

	$('.con1-mgul a').click(function(){
		var otext = $(this).text();
		$('.con1-mgsw').html(otext);

		$('.con1-mgul').hide();
	});

	$('.con2-sxtit').click(function(){

		var oUl = $('.con2-mgul');
		if(oUl.css('display') == 'block'){
			oUl.hide();
		}else{
			oUl.show();
		}
	});


	$('.con2-mgul a').click(function(){
		var otext = $(this).text();

		$('.con2-mgsw').html(otext);

		$('.con2-mgul').hide();
	});


	$('.con3-sxtit').click(function(){

		var oUl = $('.con3-mgul');
		if(oUl.css('display') == 'block'){
			oUl.hide();
		}else{
			oUl.show();
		}
	});

	$('.con3-mgul a').click(function(){
		var otext = $(this).text();

		$('.con3-mgsw').html(otext);

		$('.con3-mgul').hide();
	});

	$('.city-sxtit').click(function(){

		var oUl = $('.city-mgul');
		if(oUl.css('display') == 'block'){
			oUl.hide();
		}else{
			oUl.show();
		}
	});
	$('.area-sxtit').click(function(){

		var oUl = $('.area-mgul');
		if(oUl.css('display') == 'block'){
			oUl.hide();
		}else{
			oUl.show();
		}
	});


	$('.reg-department').click(function(){

		var oUl = $('.reg-department-mgul');
		if(oUl.css('display') == 'block'){
			oUl.hide();
		}else{
			oUl.show();
		}
	});
	$('.reg-department-mgul a').click(function(){
		var otext = $(this).text();

		$('.reg-department-mgsw').html(otext);
		$(".reg-department-mgul").hide();
	});

	$('.search-default').click(function(){

		var oUl = $('.select-more');
		if(oUl.css('display') == 'block'){
			oUl.hide();
		}else{
			oUl.show();
		}
	});
	$('.select-more li a').click(function(){
		var otext = $(this).text();

		$('.select-span').html(otext);
		$(".select-more").hide();
	});
});