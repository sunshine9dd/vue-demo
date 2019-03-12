<template>
  <div>
    <el-row>
      <el-col :span="12"><div class="grid-content"><router-link :to="{path:'/addGarden'}"><el-button type="primary">添加园所</el-button></router-link></div></el-col>
      <el-col :span="12">
        <div class="grid-content rightBox">
          <div class="el-input inputW">
            <input type="text" @input="onInputFn('name','ecn')" v-model="name" class="el-input__inner"/>
          </div>
          <el-button type="primary">搜索</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      border
      :header-cell-style="{background:'#d3dce6'}"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        label="园所名称"
      >
      </el-table-column>
      <el-table-column
        prop="openid"
        label="openid"
      >
      </el-table-column>
      <el-table-column
        prop="account"
        label="账号"
      >
      </el-table-column>
      <el-table-column
        prop="person"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="jurisdiction"
        label="权限"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="240px"
      >
        <template slot-scope="scope">
          <!--<el-button @click="handleClick(scope.row)" size="small">查看</el-button>-->
          <el-button @click="handleClick(scope.row)" type="primary" size="small">修改</el-button>
          <el-button @click="deleteFn(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @current-change="handleSizeChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
    export default {
        name: "garden",
        data() {
          const item = {
            id: '23427347213',
            name: '拓扑亲子园',
            openid: 'wx8485234',
            account: '13594463375',
            person: '王小虎',
            jurisdiction: '进入后台'
          };
          return {
            tableData: Array(10).fill(item),
            currentPage:1,
            name:''
          }
        },
        methods: {
          //输入框搜索事件
          onInputFn(name,type){
            this[name]= this.inputLimitFn(this[name],type);
          },
          //点击查看
          handleClick(row) {
            this.$router.push({
              path: '/addGarden',
              query: {id:row.id,name: row.name,account:row.account,person:row.person}
            })
          },
          //分页点击事件
          handleSizeChange(num){
            this.$message({
              message:num
            });
          },
          //点击删除
          deleteFn(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          }
        }
    }
</script>

<style lang="stylus" scoped>
    .rightBox
      text-align right
      .inputW
       width 200px
    .el-table
      margin-top 20px
</style>
