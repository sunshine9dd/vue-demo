<template>
  <div>
    <el-form label-position="top" status-icon :rules="rules" :model="practiceForm" ref="practiceForm" label-width="100px" class="demo-dynamic">
      <el-form-item
        prop="classify"
        label="练习标题"
      >
        <el-input v-model="practiceForm.classify"></el-input>
      </el-form-item>
      <el-form-item
        prop="monthOld"
        label="适合月龄"
      >
        <el-input v-model="practiceForm.monthOld"></el-input>
      </el-form-item>
      <el-form-item label="实现能力" prop="target">
        <el-select v-model="practiceForm.target" placeholder="请选择能力模块">
          <el-option label="大运动能力" value="1"></el-option>
          <el-option label="精细化运动" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="video"
        label="视频"
        :rules="{
      required: true, message: '视频不能为空', trigger: 'blur'
    }"
      >
        <el-input class="video" v-model="practiceForm.video" :disabled="true"></el-input>
        <el-upload
          class="upload"
          action=""
          :multiple='true'
          :show-file-list="false"
          :before-upload="beforeVideoUpload"
          :limit='1'
          accept="video/mp4"
        >
          <el-button  type="primary">上传视频</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in practiceForm.audio"
        :label="'音频' + index"
        :key="domain.key"
        :prop="'audio.' + index + '.value'"
        :rules="{
      required: true, message: '音频不能为空', trigger: 'blur'
    }"
      >
        <el-input class="audio" v-model="domain.value" :disabled="true"></el-input>
        <el-upload
          class="upload"
          action=""
          :multiple='true'
          :show-file-list="false"
          :before-upload="beforeAudioUpload"
          :limit='1'
          accept="audio/mpeg,audio/mp4"
        >
          <el-button  type="primary" @click.prevent="setAudioIndex(index)">上传音频</el-button>
        </el-upload>
        <el-button class="del" @click.prevent="removeAudio(domain)">删除</el-button>
      </el-form-item>
      <el-button  type="primary" @click.prevent="addAudio()">增加音频</el-button>
      <el-form-item
        prop="course"
        label="课程说明"
      >
        <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 6}" v-model="practiceForm.course"></el-input>
      </el-form-item>
      <el-form-item
        prop="detail"
        label="课程详情"
      >
        <div id="editorElem"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('practiceForm')">提交</el-button>
        <el-button @click="resetForm('practiceForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import E from 'wangeditor';
  import * as qiniu from 'qiniu-js';
  import { Loading } from 'element-ui';
  export default {
    name: "addGarden",
    data() {
      //限制输入类型
      let inputLimit = (rule, value, callback) => {
        this.practiceForm[rule.field]= this.inputLimitFn(value,rule.type);
      };
      return {
        qiniutoken:'',//七牛token
        qiniuhost:'',//七牛文件头部
        loading:'',//遮罩层
        practiceForm: {
          classify:'',
          monthOld:'',
          target:'',
          video:'',
          audio:[{
            value:""
          }],
          course:'',
          detail:'1',
        },
        rules: {
          classify: [
            { required: true, message: '请输入练习标题', trigger: 'blur' },
            { validator: inputLimit, trigger: 'change' ,type:'ecn'}
          ],
          monthOld: [
            { required: true, message: '请输入适合月龄', trigger: 'blur' },
            { validator: inputLimit, trigger: 'change',type:'num4' }
          ],
          target: [
            { required: true, message: '请选择实现能力', trigger: 'blur' }
          ],
          course: [
            { required: true, message: '请输入课程说明', trigger: 'blur' },
            { validator: inputLimit, trigger: 'change' ,type:'csy'}
          ]
        }
      }
    },
    created(){
      let {query:{id}}=this.$route;
    },
    mounted() {//创建富文本编辑器
      let _this = this;
      this.editor = new E('#editorElem');
      this.editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        // 'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ];
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
      };
      this.editor.customConfig.showLinkImg = false;
      this.editor.customConfig.customUploadImg = function (files, insert) {
        _this.beforeImgUpload(files);
      };
      this.editor.create();
    },
    methods: {
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //设置当前上传视频的index
      setAudioIndex(index){
        this.audioIndex = index;
      },
      //增加音频
      addAudio(){
        this.practiceForm.audio.push({
          value: '',
          key: Date.now()
        });
      },
      //删除音频
      removeAudio(item) {
        let index = this.practiceForm.audio.indexOf(item);
        if(this.practiceForm.audio.length == 1){

        }else if (index !== -1) {
          this.practiceForm.audio.splice(index, 1)
        }
      },
      //上传图片前判断
      beforeImgUpload(files) {
        for (let i=0,fileLen=files.length;i<fileLen;i++){
          if (parseInt(files[i].size / 1024 / 1024) >= 5) {
            this.$message({
              message:`第${i}张图片大于5M，请压缩后上传`
            });
          }  else {
            this.upLoadFile(files[i],'image');
          }
        }
        return false;
      },
      //上传视频前判断?avinfo
      beforeVideoUpload(file) {
        if (parseInt(file.size / 1024 / 1024) >= 100) {
          this.$message({
            message:`视频大于100M，请压缩后上传`
          });
        }else {
          this.upLoadFile(file,'video');
        }
        return false;
      },
      //上传音频前判断
      beforeAudioUpload(file) {
        if (parseInt(file.size / 1024 / 1024) >= 10) {
          this.$message({
            message:`音频大于10M，请压缩后上传`
          });
        } else {
          this.upLoadFile(file,'audio');
        }
        return false;
      },
      // 上传
      async upLoadFile(file,type) {
        if (this.qiniutoken === '') {
          await this.getToken();
        }
        this.loading = Loading.service({
          lock: true,
          text: '上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        const observable = await qiniu.upload(file,`practice_audio_${file.name}`, this.qiniutoken);
        observable.subscribe({
          error:err=> {
            console.log('uploadErr:',err);
          },
          complete: res => {
            if(this.loading){
              this.loading.close();
            }
            if(type == 'image'){
              this.editor.txt.append('<img style="max-width: 100%" src="'+this.qiniuhost+'/'+res.key+'">');
            }else if(type == 'video'){
              this.practiceForm.video = this.qiniuhost+'/'+res.key;
            }else if(type == 'audio'){
              this.practiceForm.audio[this.audioIndex].value = this.qiniuhost+'/'+res.key;
            }
          },
          next:res =>{
            this.loading.text = '上传中,已上传'+parseInt(res.total.percent)+'%';
          }
        });
      },
      // 获取token
      getToken() {
        return this.getRequest('/operation/common/qinNiu/info').then(res=> {
          if(res.data.status) {
            this.qiniutoken = res.data.data.token;
            this.qiniuhost = res.data.data.host;
          }
        });
      },
    }
  }
</script>

<style lang="stylus" scoped>
  h2
    padding 10px 0
    font-size 14px
  .inputBox
    width 300px
  .upload
    display inline-block
    margin-left 8px
  .video
    display inline-block
    width calc(100% - 110px)
  .audio
    display inline-block
    width calc(100% - 192px)
  .del
   margin-left 8px
</style>
