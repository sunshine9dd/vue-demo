<template>
  <div>
    <el-form label-position="top" status-icon :rules="rules" :model="gardenForm" ref="gardenForm" label-width="100px" class="demo-dynamic">
      <el-form-item
        prop="gardenName"
        label="园所名称"
       >
        <el-input v-model="gardenForm.gardenName"></el-input>
      </el-form-item>
      <el-form-item
        prop="mobile"
        label="手机号码"
        >
        <el-input v-model="gardenForm.mobile"></el-input>
      </el-form-item>
      <el-form-item
        prop="name"
        label="负责人姓名"
        >
        <el-input v-model="gardenForm.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('gardenForm')">提交</el-button>
        <el-button @click="resetForm('gardenForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "addGarden",
        data() {
          //验证手机是否正确
          let mobileLength = (rule, value, callback) => {
            if(!this.checkMobile(value)){
              callback(new Error('手机号格式不正确'));
            }else {
              callback();
            }
          };
          //限制输入类型
          let inputLimit = (rule, value, callback) => {
            this.gardenForm[rule.field]= this.inputLimitFn(value,rule.type);
            callback();
          };
          return {
            gardenForm: {
              gardenName:'',
              mobile:'',
              name:'',
            },
            rules: {
              gardenName: [
                { required: true, message: '请输入园所名称', trigger: 'blur' },
                { validator: inputLimit, trigger: 'change' ,type:'ecn'}
              ],
              mobile: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { validator: mobileLength, trigger: 'blur' },
                { validator: inputLimit, trigger: 'change',type:'num' }
              ],
              name: [
                { required: true, message: '请输入负责人姓名', trigger: 'blur' },
                { validator: inputLimit, trigger: 'change' ,type:'ecn'}
              ]
            }
          }
        },
        created(){
          let {query:{id,name,account,person}}=this.$route;
          if(id){
            this.gardenForm.gardenName = name;
            this.gardenForm.mobile = account;
            this.gardenForm.name = person;
          }
        },
        methods: {
          //提交表单
          submitForm(formName) {
            console.log(1111);
            this.$refs[formName].validate((valid) => {
              if (valid) {
                console.log(222);
                alert('submit!');
              } else {
                console.log(333);
                console.log('error submit!!');
                return false;
              }
            });
          },
          //重置表单
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
    }
</script>

<style lang="stylus" scoped>
  h2
   padding 10px 0
   font-size 14px
  .inputBox
    width 300px
  .submit
    margin 10px 0
</style>
