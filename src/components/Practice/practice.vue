<template>
  <div>
    <el-row>
      <el-col :span="12"><div class="grid-content"><router-link :to="{path:'/addPractice'}"><el-button type="primary">新建练习</el-button></router-link></div></el-col>
      <el-col :span="12"><div class="grid-content"></div></el-col>
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
        prop="monthOld"
        label="适合月龄">
      </el-table-column>
      <el-table-column
        prop="classify"
        label="分类">
      </el-table-column>
      <el-table-column
        prop="target"
        label="目标">
      </el-table-column>
      <el-table-column
        prop="video"
        label="视频ID">
      </el-table-column>
      <el-table-column
        prop="audio"
        label="音频管理">
      </el-table-column>
      <el-table-column
        prop="course"
        label="课程说明">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="详情页">
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
    name: "courseClassify",
    data() {
      const item = {
        id: '2321321321532',
        monthOld: '4,5,6,7',
        classify:'系统提供',
        target:'大运动能力',
        video:'5245454545545',
        audio:'编辑',
        course:'欢动节奏课程',
        detail:'编辑',
      };
      return {
        tableData: Array(10).fill(item),
        currentPage:1,
      }
    },
    methods: {
      //点击查看
      handleClick(row) {
        this.$router.push({
          path: '/addPractice',
          query: {id:row.id}
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
  .el-table
    margin-top 20px
</style>
