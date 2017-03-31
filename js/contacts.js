//联系人'
var contacts = new function(){
	
	this.invited = function(){
		var url = $('#url').val();
		var contactId = $('#contactId').val();
		var contactType = $('#contactType').val();
		var messageContent = $('#messageContent').val();
		var contactName = $('#contactNames').val();
		$.ajax({
			url:url,
			data:{
			contactId:contactId,
			contactType:contactType,
			messageContent:messageContent,
			contactName:contactName
			},
			async:false,
			success:function(data){
				$('#reInfo').val(data);
			},
			error:function(data){
				$('#reInfo').val('邀请失败，请稍候重试。')
			}
		});
	}
	
	this.setName = function(divId,inviteName,url,contactId,contactType){
		$(divId).html(inviteName);
		$(divId + "1").html(inviteName);
		$(divId + "2").html(inviteName);
		$('#contactNames').val(inviteName);
		$('#url').val(url);
		$('#contactId').val(contactId);
		$('#contactType').val(contactType);
	}
	
	this.search = function(id,frmId){
		$('#searchLetter').val('');
		var value = $(id).text();
		$('#searchLetter').val(value);
		$(frmId).submit();
	}
	
	this.searchName = function(searchId,frmId){
		var searchName = $(searchId).val();
		if(util.isEmpty(searchName)){
			alert('请输入名字搜索');
			return false;
		}else{
			$(frmId).submit();
		}
	}
	
	this.setType = function(searchType,frmId){
		$('#contactType').val(searchType);
		$('#changeContactType').val(searchType);
		$('#searchContactName').val('');
		$(frmId).submit();
	}
	
	this.del = function(url,contactId,retUrl){
		if(confirm('确认要删除该好友?')){
			$.ajax({
				url:url,
				data:{
				contactId:contactId
				},
				success:function(data){
					alert(data);
					util.forward(retUrl);
				},
				error:function(data){
					alert(data);
					util.forward(retUrl);
				}
			});
		}
	}
	
}