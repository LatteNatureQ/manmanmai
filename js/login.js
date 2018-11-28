$(function () {
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

            })