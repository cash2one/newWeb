/**
 * Created by dells on 2017/4/10.
 */
/**
 * 胎心监护孕妇列表相关js操作
 */
var gravida = new function() {
    this.queryGravidaList=function(){
        var data={};
        var currentPage = $("#paginationCPage").val();

        if(typeof(currentPage) == 'undefined' || currentPage == ''){
            currentPage ="1";
        }

        if(!util.isNumber(currentPage))
        {
            layer.alert("请输入合法的页数");
            return;
        }

        data['currentPage'] =currentPage;

        data['startDateStr'] = $("#studyDateStart3").val();  //查询关键字之预产期开始时间
        data['endDateStr'] = $("#studyDateStart4").val();  //查询关键字之预产期结束时间
        data['searchWord'] = $("#searchWord").val();   //查询关键字之搜索词

        var startDate = util.parseDate(data['startDateStr']);
        var endDate = util.parseDate(data['endDateStr']);

        if(startDate.getTime() >endDate.getTime())
        {
            layer.alert("结束时间大于开始时间", {icon: 2});
            return;
        }

        var loading =  layer.load("正在查询");
        jQuery.ajax({
            url:contextPath+"/gravida/list.json?rand="+Math.random(),
            data:data,
            dataType: "json",
            success:function(data){
                layer.close(loading);
                if(data.resultCode != "SUCCESS"){
                    util.failedHandler(data.resultCode,data.resultMsg);
                    return ;
                }
                var pageResult=data.resultMsg;    //data.resultMsg得到pageResult
                //pageResult.result的到list
                //遍历list可以组装页面
                if(typeof(pageResult) == 'undefined'){
                    layer.alert("未查询到相关信息", {icon: 2});
                    return ;
                }


                var trHtml = gravida.parseListHtml(pageResult,data);  //组装list的页面

                $(".fh-list").find("tbody").html(trHtml);   //定位页面中元素，然后把组装好的页面填进去


                //组装分页参数
                var pageHtml = gravida.parsePageHtml(pageResult,"gravida.queryGravidaList()");
                $(".page-list").html(pageHtml);
            },
            error:function(e)
            {
                layer.close(loading);
                layer.alert("服务器异常请稍后再试");
            }
        });
    };


    this.parseListHtml=function(pageResult,data){
        var list = pageResult.result;
        //组装列表
        var trHtml="";
        for(var i=0;i<list.length;i++){
            var r = list[i];
            trHtml+='<tr><td>'+(pageResult.currentPage==0?i+1:(pageResult.currentPage-1)*10+i+1)+'</td>';
            trHtml+='<td>'+r.gravidaName+'</td>';
            trHtml+='<td>'+r.bindHospitalName+'</td>';
            trHtml+='<td>'+r.bindDoctorName+'</td>';
            trHtml+='<td>'+r.gravidaAge+'</td>';
            trHtml+='<td>'+r.gravidaPredictedStr+'</td>';
            trHtml+='<td>'+r.gravidaMobile+'</td>';
            trHtml+='<td>'+r.creatorName+'</td>';
            trHtml+='<td><a class="fh-list-info newuser-add" href="javascript:gravida.gravidaInfo('+r.gravidaId+');">个人记录</a>';

            if(data.consultFlag==1||data.monitorFlag==1){
                trHtml+='<a class="fh-list-detail" href="javascript:monitor.gravidaDetailList('+r.gravidaId+');">记录查看</a>';
            }
            if(data.mngFlag==1){
                trHtml+='<a class="fh-list-info delete" href="javascript:gravida.deleteGravidaInfo('+r.gravidaId+');">删除</a>';
            }

            trHtml+='</td>';
            trHtml+='</tr>';
        }
        return trHtml;

    };



    this.parsePageHtml=function(pageResult,submitJs){
        var list = pageResult.result;
        var currentSize = list.length ;
        var totalPage = pageResult.totalPage;
        var currentPage = pageResult.currentPage;
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var totalItem = pageResult.totalItem;
        var pageHtml = '<div class=\"page-right\">';
        pageHtml +='<span class="pagen">本页共<a class="page-number">&nbsp;'+currentSize;
        pageHtml +='&nbsp;</a>条记录&nbsp;/&nbsp;总共<aclass="page-number">&nbsp;'+totalItem+'&nbsp;</a>条记录</span></div>';
        pageHtml +='<div class="page-left">';
        pageHtml +='<a href="javascript:void(0);" class="pageimg page-first" onclick="gotoPageP(1);">首页</a>';
        pageHtml +='<a href="javascript:void(0);" class="pageimg page-prev" onclick="gotoPageP('+prePage+')">上一页</a>';
        pageHtml +='<a href="javascript:void(0);" ondragstart="return false" class="big">';
        pageHtml += '<input type="text"  style="height:16px;" value="'+currentPage+'"  id="paginationCPage" onkeyup="javascript:gravida.pageNumCheck('+currentPage+');" onafterpaste="javascript:gravida.pageNumCheck('+currentPage+');"  name="currentPage" class="page-to">';
        pageHtml += '<span>共'+totalPage+'页</span><span class="page-go" onclick='+submitJs+'>go</span></a>';
        pageHtml +='<a href="javascript:void(0);" class="pageimg page-next" onclick="gotoPageP('+nextPage+')">下一页</a>';
        pageHtml +='<a href="javascript:void(0);" class="pageimg page-last" onclick="gotoPageP('+totalPage+')">尾页</a>';
        pageHtml += '</div>';
        pageHtml +='<script>function gotoPageP(currentPage){';
        pageHtml +='$("#paginationCPage").val(currentPage);';
        pageHtml += submitJs+"();}</script>";
        return pageHtml;
    };

    this.pageNumCheck = function(currentPage)
    {
        var pageNum = $("#paginationCPage").val();
        $("#paginationCPage").val(pageNum.replace(/\D/g,currentPage));
    };


    //查看孕妇详情
    this.gravidaInfo=function(gravidaId){
        jQuery.ajax({
            url:contextPath+"/gravida/info.json?rand="+Math.random(),
            data:{gravidaId:gravidaId},
            dataType: "html",
            success:function(data){
                try
                {
                    var errorData = JSON.parse(data);
                    if(errorData["resultCode"] == "NOLOGIN")
                    {
                        layer.alert("登录超时,请登录后再试!");
                        return;
                    }
                }
                catch(e){}

                $("#gravidaInfoShow").html(data);
                layer.open({
                    type: 1,
                    title: "孕妇资料",
                    shade: 0.5,
                    skin: 'layui-layer-rim',
                    area: ['auto', '520px'],
                    content: $('.newuser')
                });
            }
        });
    };


    //删除孕妇
    this.deleteGravidaInfo=function(gravidaId){
        if(confirm("是否确定删除？")){
            jQuery.ajax({
                url:contextPath+"/gravida/deleteGravida.json?rand="+Math.random(),
                data:{gravidaId:gravidaId},
                dataType: "text",
                success:function(data){
                    if(data == 'success')
                    {
                        layer.msg('删除成功', {
                            time: 2000,
                            btn: ['确定']
                        });
                        gravida.queryGravidaList();
                    }
                    else
                    {
                        layer.alert("删除失败");
                    }
                }
            });}
    };


    this.getAddGravidaPage = function()
    {
        jQuery.ajax({
            url:contextPath+"/gravida/addGravidaPage.json?rand="+Math.random(),
            dataType: "html",
            success:function(data){
                try
                {
                    var errorData = JSON.parse(data);
                    if(errorData["resultCode"] == "NOLOGIN")
                    {
                        layer.alert("登录超时,请登录后再试!");
                        return;
                    }
                }
                catch(e){}

                $("#gravidaInfoShow").html(data);
                layer.open({
                    type: 1,
                    title: "孕妇资料",
                    shade: 0.5,
                    skin: 'layui-layer-rim',
                    area: ['auto', '520px'],
                    content: $('.newuser')
                });
            }
        });
    };

    //修改孕妇信息
    this.updateGravida = function()
    {
        var gravidaId = $("#gravidaId").val();
        var gravidaMobile = $("#gravidaMobile").val();
        if(gravidaMobile == '')
        {
            layer.alert("孕妇联系电话不能为空");
            return;
        }

        var gravidaPredicted1 = $("#gravidaPredicted1").val();
        if(gravidaPredicted1 == '')
        {
            layer.alert("预产期不能为空");
            return;
        }

        if(!util.isPhoneNum(gravidaMobile))
        {
            layer.alert("请输入正确的孕妇联系电话");
            return;
        }

        var address = $("#address").val();

        var hospitalId = $("#hospitalId").val();
        if(hospitalId == '')
        {
            layer.alert("就诊医院不能为空");
            return;
        }
        var hospitalName = $("#hospitalName").val();

        var bindDoctorId = $("#bindDoctorId").val();
        if(bindDoctorId == '')
        {
            layer.alert("就诊医生不能为空");
            return;
        }
        var bindDoctorName = $("#bindDoctorName").val();

        var memo = $("#memo").val();

        var emergencyName = $("#emergencyName").val();
        if(emergencyName == '')
        {
            layer.alert("紧急联系人姓名不能为空");
            return;
        }

        var emergencyMobile = $("#emergencyMobile").val();
        if(emergencyMobile == '')
        {
            layer.alert("紧急联系人电话不能为空");
            return;
        }

        if(!util.isPhoneNum(emergencyMobile))
        {
            layer.alert("请输入正确的紧急联系人电话联系电话");
            return;
        }

        var emergencyRelation = $("#emergencyRelation").val();


        jQuery.ajax({
            url:contextPath+"/gravida/update.json?rand="+Math.random(),
            data:{
                gravidaId:gravidaId,
                gravidaMobile:gravidaMobile,
                address:address,
                bindHospitalId:hospitalId,
                bindHospitalName:hospitalName,
                bindDoctorId:bindDoctorId,
                bindDoctorName:bindDoctorName,
                memo:memo,
                emergencyMobile:emergencyMobile,
                emergencyRelation:emergencyRelation,
                emergencyName:emergencyName,
                isDelete:'n'
            },
            dataType: "text",
            success:function(data){
                if(data == 'success')
                {
                    layer.closeAll();
                    layer.msg('保存成功', {
                        time: 2000, //20s后自动关闭
                        btn: ['确定']
                    });
                    gravida.queryGravidaList();
                }
                else
                {
                    layer.alert("保存失败");
                }
            }
        });
    };

    //新增后保存孕妇信息
    this.saveGravida = function()
    {
        var gravidaName = $("#gravidaName").val();
        if(gravidaName == '')
        {
            layer.alert("孕妇姓名不能为空");
            return;
        }

        var gravidaIdCard = $("#gravidaIdCard").val();
        if(gravidaIdCard == '')
        {
            layer.alert("孕妇身份证不能为空");
            return;
        }

        if(!util.IdentityCodeValid(gravidaIdCard))
        {
            layer.alert("请输入合法的身份证号");
            return;
        }

        var gravidaAge = $("#gravidaAge").val();
        var fetalCount = $("#fetalCount").val();

        var gravidaPredicted1 = $("#gravidaPredicted1").val();
        if(gravidaPredicted1 == '')
        {
            layer.alert("预产期不能为空");
            return;
        }

        var gravidaMobile = $("#gravidaMobile").val();
        if(gravidaMobile == '')
        {
            layer.alert("孕妇联系手机号不能为空");
            return;
        }

        if(!util.isPhoneNum(gravidaMobile))
        {
            layer.alert("请输入合法的孕妇联系手机号");
            return;
        }

        var bindhospitalId = $("#hospitalId").val();
        if(bindhospitalId == '')
        {
            layer.alert("就诊医院不能为空");
            return;
        }

        var bindhospitalName = $("#hospitalName").val();

        var bindDoctorId = $("#bindDoctorId").val();
        if(bindDoctorId == '')
        {
            layer.alert("就诊医生不能为空");
            return;
        }

        var bindDoctorName = $("#bindDoctorName").val();
        var address = $("#address").val();
        var memo = $("#memo").val();

        var emergencyRelation = $("#emergencyRelation").val();
        var emergencyName = $("#emergencyName").val();
        if(emergencyName == '')
        {
            layer.alert("紧急联系人姓名不能为空");
            return;
        }
        var emergencyMobile = $("#emergencyMobile").val();
        if(emergencyMobile == '')
        {
            layer.alert("紧急联系人电话不能为空");
            return;
        }

        if(!util.isPhoneNum(emergencyMobile))
        {
            layer.alert("请输入合法的紧急联系人电话");
            return;
        }

        jQuery.ajax({
            url:contextPath+"/gravida/savegravida.json?rand="+Math.random(),
            data:{
                gravidaName:gravidaName,
                gravidaIdCard:gravidaIdCard,
                gravidaAge:gravidaAge,
                FetusCount:fetalCount,
                gravidaPredicted1:gravidaPredicted1,
                gravidaMobile:gravidaMobile,
                bindHospitalId:bindhospitalId,
                bindHospitalName:bindhospitalName,
                bindDoctorId:bindDoctorId,
                bindDoctorName:bindDoctorName,
                address:address,
                memo:memo,
                emergencyMobile:emergencyMobile,
                emergencyRelation:emergencyRelation,
                emergencyName:emergencyName,
                isDelete:'n'
            },
            dataType: "text",
            success:function(data){
                if(data == 'success')
                {
                    layer.closeAll();
                    layer.msg('保存成功', {
                        time: 2000, //20s后自动关闭
                        btn: ['确定']
                    });
                    gravida.queryGravidaList();
                }
                else if('S002' == data){
                    layer.alert("两次预产期时间间隔不足6个月,新增失败");
                }
                else if('S001' == data)
                {
                    layer.alert("预产期时间范围不在当前至40周,新增失败");
                }
                else
                {
                    layer.alert("保存失败");
                }
            }
        });
    };


    this.selectHospital = function(hosid,hosname)
    {
        $("#hospitalId").val(hosid);
        $("#hospitalName").val(hosname);
        $("#hospitalNameSpan").html(hosname);
        jQuery.ajax({
            url:contextPath+"/gravida/getFetalDoctors.json?rand="+Math.random(),  //获取选定医院医生
            data:{
                hospitalId:hosid
            },
            dataType: "text",
            success:function(data){
                var retData = JSON.parse(data);
                var doctors = retData["doctorMap"];
                var str = "";
                var indexflag = 0;
                var defaultDoctor = "";
                var defaultName = "";
                for(var code in doctors){
                    if(indexflag == 0)
                    {
                        defaultDoctor = code;
                        defaultName = doctors[code];
                    }
                    str += "<li><a href=\"javascript:gravida.selectDoctor('"+  code +"','"+ doctors[code] +"');\">"+doctors[code] +"</a></li>";
                    indexflag++;
                }
                $("#doctorListUl").html(str);

                if(indexflag == 0)
                {
                    $("#bindDoctorId").val("");
                    $("#bindDoctorName").val("");
                    $("#spanDoctorName").html("未查询到医生");
                }
                else
                {
                    $("#bindDoctorId").val(defaultDoctor);
                    $("#bindDoctorName").val(defaultName);
                    $("#spanDoctorName").html(defaultName);
                }

                var bindedDoctors = retData["bindedDoctors"];
                if(typeof(bindedDoctors)!="undefined" && bindedDoctors != null && bindedDoctors != '')
                {
                    $("#bindeddoctorsem").html(bindedDoctors);
                }
                else
                {
                    $("#bindeddoctorsem").html("0");
                }

                var unappliedCount = retData["unappliedCount"];
                if(typeof(unappliedCount)!="undefined" && unappliedCount != null && unappliedCount != '')
                {
                    $("#unappliedcountem").html(unappliedCount);
                }
                else
                {
                    $("#unappliedcountem").html("0");
                }

                var appliedCount = retData["appliedCount"];
                if(typeof(appliedCount)!="undefined" && appliedCount != null && appliedCount != '')
                {
                    $("#appliedcountem").html(appliedCount);
                }
                else
                {
                    $("#appliedcountem").html("0");
                }


            }
        });
    };

    this.selectDoctor = function(doctorid,doctorname)
    {
        $("#bindDoctorId").val(doctorid);
        $("#bindDoctorName").val(doctorname);
        $("#spanDoctorName").html(doctorname);

        jQuery.ajax({
            url:contextPath+"/gravida/getBindedAndUpplied.json?rand="+Math.random(),
            data:{
                doctorid:doctorid
            },
            dataType: "text",
            success:function(data){
                var retData = JSON.parse(data);

                var bindedDoctors = retData["bindedDoctors"];
                if(typeof(bindedDoctors)!="undefined" && bindedDoctors != null && bindedDoctors != '')
                {
                    $("#bindeddoctorsem").html(bindedDoctors);
                }
                else
                {
                    $("#bindeddoctorsem").html("0");
                }

                var unappliedCount = retData["unappliedCount"];
                if(typeof(unappliedCount)!="undefined" && unappliedCount != null && unappliedCount != '')
                {
                    $("#unappliedcountem").html(unappliedCount);
                }
                else
                {
                    $("#unappliedcountem").html("0");
                }

                var appliedCount = retData["appliedCount"];
                if(typeof(appliedCount)!="undefined" && appliedCount != null && appliedCount != '')
                {
                    $("#appliedcountem").html(appliedCount);
                }
                else
                {
                    $("#appliedcountem").html("0");
                }
            }
        });
    };

    this.selectRelation = function(code,text)
    {
        $("#emergencyRelation").val(code);
    };

    this.selectFetalCount = function(code,text)
    {
        $("#fetalCount").val(code);
        $("#taishu1").html(text);
    };

    //身份证信息修改后,自动计算年龄
    this.addIdNumOnblur = function()
    {
        var idnum = $("#gravidaIdCard").val();
        if(idnum == '')
        {
            $("#gravidaAge").val("");
            return;
        }

        if(util.IdentityCodeValid(idnum))
        {
            var age = util.getAgeByIDNum(idnum);
            $("#gravidaAge").val(age);
        }
        else
        {
            $("#gravidaAge").val("");
        }
    };


    //计算孕周
    this.addPredictedOnchange = function()
    {
        var predictDate = $("#gravidaPredicted1").val();
        if(predictDate == '')
        {
            return;
        }

        var year = predictDate.substring(0,4);
        var month = predictDate.substring(5,7) - 1;
        var day = predictDate.substring(8,10);

        var newDate = new Date(year,month,day);
        newDate.setDate(newDate.getDate() - 280);
        var now = new Date();
        var delta = now.getTime() - newDate.getTime();
        var days=Math.floor(delta/(24*3600*1000))
        var weeks = parseInt(days/7);
        var mod = days%7;
        var str = weeks + "周";
        if(mod != 0)
            str += mod + "天";
        $("#fetalPeriod").val(str);
    }

    this.closelayer = function()
    {
        layer.closeAll();
    };
};
