<template>
  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default{
    data(){
      return {
        rules: {
          account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: '19983262650',
          password: '1234'
        },
        loading: false
      }
    },
    methods: {
      ...mapMutations(['login','pathChange']),
      submitClick: function () {
        var _this = this;
        this.loading = true;
        var path = _this.$route.query.redirect;
        _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
        this.pathChange(path == '/' || path == undefined ? '/home' : path)
        // this.postRequest('/school/userLogin', {
        //   mobile : this.loginForm.username,
        //   verifyCode: this.loginForm.password
        // }).then(res=> {
        //   _this.loading = false;
        //   if (res && res.status == 200) {
        //     var data = res.data;
        //     _this.login(data.msg);
        //     _this.pathChange('/home');
        //     var path = _this.$route.query.redirect;
        //     _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
        //   }
        // });
        // this.getRequest('/login?id=1').then(res=> {
        //   _this.loading = false;
        //   if (res && res.status == 200) {
        //     var data = res.data;
        //     _this.$store.commit('login', data.msg);
        //     var path = _this.$route.query.redirect;
        //     _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
        //   }
        // });
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .login-container
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .login_title
      margin: 0 auto 40px auto;
      text-align: center;
      color: #505458;
    .login_remember
      margin: 0 0 35px 0;
      text-align: left;
</style>
