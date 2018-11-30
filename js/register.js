$(function () {
  
    var mmb=new Mmb();
    mmb.rand();
    mmb.code();
    mmb.mobilecode();
    mmb.register();


})
    var Mmb=function(){

    }

      // 随机生成4位验证码

    Mmb.prototype={
        code:0,
        mobilecode:"",
        rand:function (min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        },
    
        code:function(){
            this.code = this.rand(1000, 9999);
            document.getElementById("num").innerText =this.code;
        },

        // 随机生成手机验证码
        mobilecode:function(){
            var that=this;
            
            $('#gemobilecode').on('tap', function () {
                var code = that.rand(100000, 999999);
                that.mobilecode = code;
                console.log(that.mobilecode);
            })
        },
  
        // 1.点击注册,遍历所有的输入框,如果有没有输入的,就提示,return
        register:function(){
            var that=this;
            $('form .register').on('tap', function () {
                // 获取所有的输入框
                var inputList = $('form input');
                // 开关思想
                var check = true;
                // 遍历
                inputList.each(function () {
                    if ($(this).val() == "" || $(this).val().trim() == "") {
                        // 获取绑定标签的文本
                        var text = $(this).prev().html();
                        mui.toast(text + "不能为空", {
                            duration: '1000',
                            type: 'div'
                        });
                        check = false;
                        return false;
                    }
                })
                // 全都有输入
                if (check) {
                    // 获取输入框的文本
                    var username = $('.username').val();
                    var password = $('.password').val();
                    var mobile = $('.mobile').val();
                    // // 验证手机号码是否正确
                    if(!(/^1[34578]\d{9}$/.test(mobile))){ 
                        mui.alert( "您输入有效的手机号", "温馨提示", "确定")
                        return false; 
                    } 
                    var vcode = $('.vcode').val();
                    // 判断验证码是否有误
                    if (vcode != that.code) {
                        mui.alert("您输入的验证码有误，请重新输入", "温馨提示", "确定")
                        return false;
                    }
                    if (that.mobilecode == "") {
                        mui.alert("请先获取手机验证码", "温馨提示", "确定")
                        return false;
                    }
                    var phoneCode = $('.mobilecode').val();
                    if (phoneCode != that.mobilecode) {
                        mui.alert("您输入的手机验证码有误，请重新输入", "温馨提示", "确定")
                        return false;
                    }
                    var email = $('.email').val();
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                                 if(!myreg.test(email))
                                 {                       
                                     mui.alert("请输入有效的E_mail！", "温馨提示", "确定")
                                    return false;
                                }
                    var login =JSON.parse(localStorage.getItem('login'||[]));
                    if(login){
                            for(var i=0;i<login.length;i++){
                                　　for(var key in login[i]){
                                    if(username==login[i].username){
                                            mui.alert("用户名以被注册,请重新输入", "温馨提示", "确定")   
                                        return false;          
                                    }
                                    if(mobile==login[i].mobile){
                                            mui.alert("手机号以被注册,请重新输入", "温馨提示", "确定")   
                                        return false;          
                                    }
                                    // if(email==login[i].email){
                                    //         mui.alert("邮箱以被注册,请重新输入", "温馨提示", "确定")   
                                    //     return false;          
                                    // }
                                }             
                            }     
                    }
                    // 如果没有数据,就声明一个空数组
                    if(!login){
                        var login=[];
                    }        
                    login.push({
                        "username": username,
                        "password":password,
                        "mobile":mobile,
                        "email":email         
                    }, );       
                    localStorage.setItem('login',JSON.stringify(login));
                    location="login.html";
                }
        
            })
        }
     
    

    }
    