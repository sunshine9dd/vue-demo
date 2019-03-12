<template>
  <el-container id="homeBox">
    <!--头部-->
    <el-header>
      <div class="title">托幼管理系统</div>
      <div class="userInfoBox">
        <el-dropdown>
          <div class="el-dropdown-link">
            <img src="../assets/logo.png"/>
            13550015593<i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown" style="width: 150px;text-align: center">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!--左侧导航栏-->
      <el-aside width="200px" id="leftAside">
        <el-menu
          :default-active="activeMenuIndex"
          :active="$route.path"
          class="el-menu-vertical-demo"
          router
          background-color="#676C6F"
          text-color="#fff"
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title" >园所管理</span>
          </el-menu-item>
          <el-menu-item index="/practice">
            <i class="el-icon-document"></i>
            <span slot="title">练习管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!--中间内容-->
      <el-container>
        <!--中间内容-->
        <el-main>
          <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </el-main>
        <!--底部-->
        <el-footer id="footer">
          底部内容
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
    import { mapMutations } from 'vuex' ;
    export default {
      name: "home",
      data() {
        return {
          activeMenuIndex:this.$route.path
        }
      },
      mounted() {//设置导航选中状态
        this.navActiveFn(this.$route.path);
      },
      methods: {
        ...mapMutations(['pathChange']),
        //导航显示选中的地址
        navActiveFn(path){
          if(path == '/home' || path == '/addGarden'){
            this.activeMenuIndex = '/home'
          }else if(path == '/practice' || path == '/addPractice'){
            this.activeMenuIndex = '/practice'
          }
        }
      },
      watch:{
        $route(to,from){  //监听路由并设置导航选中状态
          this.pathChange(to.path);
          this.navActiveFn(to.path);
        }
      }
    }
</script>

<style lang="stylus"  scoped>

  #homeBox
    position fixed
    width 100%
    height 100%
    left 0
    top 0
    .el-header, .el-footer
      background-color #B3C0D1
      color #333
      text-align center
      line-height 60px
    .el-header
      padding 0 200px
      position relative
      background-color rgb(84, 92, 100)
      .title
        position absolute
        left 0
        top 0
        width 200px
        height 60px
        line-height 60px
        color #fff
        font-size 16px
      .userInfoBox
        position absolute
        right  0
        top 0
        width 200px
        height 60px
        line-height 60px
        color #fff
        font-size 16px
        .el-dropdown-link
          color #fff
          cursor pointer
          img
            width 50px
            height 50px
            border-radius 50%
    .el-aside
      background-color #676C6F
      color #333
      text-align center
      line-height 200px
      .el-menu
        border none

  body > .el-container
    margin-bottom 40px
  .el-main
    background-color #fff
    color #333
</style>
