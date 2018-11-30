$(function () {
var mmb=new Mmb();
    mmb.hasLogged();
    mmb.login();
})
var Mmb=function(){

}
            // 获取登陆状态
            Mmb.prototype={
                hasLogged:function(){
                    var hasLogged=sessionStorage.getItem('hasLogged');
                    // 已登录
                    if(hasLogged){
                        mui.confirm("已登录,无需重新登录,是否跳转到首页", "温馨提示", ["确定","取消"],function(e){
                           if(e.index==0){
                               location="index.html";
                           }
                           
                        });
        
                    }
                },
     
                login:function(){
                    $('.login').on('tap', function () {
                        var username = $('.username').val();
                        var password = $('.password').val();
                        if (username.trim() == "" || password.trim() == "") {
                            mui.alert("用户名或密码不能为空请重新输入", "温馨提示", "确定")
                            return false;
                        }
                        var login = JSON.parse(localStorage.getItem('login' || []));
    
                        if (login) {
                            var check = true;
                            // 判断成功的
                            for (var i = 0; i < login.length; i++) {
    
                                if (username == login[i].username&&password==login[i].password) {
                                   
                                    mui.alert("登录成功", "温馨提示", "确定")  
                                    // 存储登录记录
                                    sessionStorage.setItem('hasLogged',"已登录");
                                    location="index.html"        
                                    return false;                 
                                }else{
                                    check=false;
                                }
                            }
                            // 如果不成功
                            if (check == false) {
                                // 遍历
                                for (var i = 0; i < login.length; i++) {
                                    // 判断用户名是否存在
                                    if (username == login[i].username) {
                                        mui.alert("密码不正确,请重新登录", "温馨提示", "确定") 
                                        check=true;         
                                        return false;                 
                                    }else{
                                        check=false;
                                    }
                            }
                            // 如果用户名存在,就是密码有误
                            if (check == false) {
                                mui.alert("用户名不存在", "温馨提示", "确定")  
                            }
                            }
                        }
                        })
    

                } 

            }

            