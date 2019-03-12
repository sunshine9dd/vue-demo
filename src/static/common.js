import Vue from 'vue'
// 验证手机号
Vue.filter("checkMobile", checkMobile);
Vue.prototype.checkMobile = checkMobile;
const mobileRegular=/^(0|86|17951)?(13[0-9]|15[012356789]|17[012345678]|18[0-9]|14[56789]|19[89]|166)[0-9]{8}$/;
function checkMobile(value) {
  return mobileRegular.test(value);
}
/*输入限制 -s*/
Vue.filter("inputLimitFn", inputLimitFn);
Vue.prototype.inputLimitFn = inputLimitFn;
const $eng=/[^\a-\z\A-\Z]/g // 只能输入英文 type=eng
  ,$num=/[^\d]/g // 只能输入数字 type=num
  ,$num2=/[^\d\.]/g // 限制输入小数点后两位 type=num2
  ,$numTWO= /^\D*([1-9]\d*\.?\d{0,2})?.*$/ // 只能输入数字和小数点,且保留两位有效数字type=numD
  ,$num3= /^\D*([1-9]\d*)?.*$/ // 只能输入整数且开头不能为零
  ,$chn=/[^\u4E00-\u9FA5]/g // 只能输入中文 type=chn
  ,$ecn=/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g // 只能输入英文中文数字 type=ecn (默认值)
  ,$enu=/[^\a-\z\A-\Z0-9]/g // 只能输入英文、数字 type=enu
  ,$ecx=/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\_]/g // 只能输入中文、英文、数字、下划线 type=ecx
  ,$num4=/[^Z0-9\,]/g // 只能输入数字和逗号
  ,$csy=/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\_\-\,\/\，\.\。\;\；\:\：\?\&\'\‘\’\"\“\”]/g; // 输入输入中文、英文、数字、下划线、标点 type=csy

function inputLimitFn(value,type) { // value-表示传入的值 type-表示传入的类型 ,使用：在页面中this.inputLimitFn('31242aada','chn');
  let w=value;
  switch (type){
    case 'eng':
      value=w.replace($eng,'');
      break;
    case 'num':
      value=w.replace($num,'');
      break;
    case 'num2':
      w=w.replace($num2,'');
      if(w>99999999){
        w=w.substr(0,8);
      }else if(w===99999999){
        w=w.replace($num,'')
      }

      if(w.indexOf('.')>0){
        let v=w.split('.');
        if(v[1].length===1){
          w=v[0]+'.'+v[1];
        }else{
          w=v[0]+'.'+v[1].substr(0,2);
        }
      }else if(w.indexOf('.')===0) {
        w='0'+w;
      }

      value=w;
      break;
    case 'numTWO':
      value=w.replace($numTWO,'$1');
      break;
    case 'num3':
      value=w.replace($num3,'$1');
      break;
    case 'num4':
      value=w.replace($num4,'');
      break;
    case 'chn':
      value=w.replace($chn,'');
      break;
    case 'enu':
      value=w.replace($enu,'');
      break;
    case 'ecx':
      value=w.replace($ecx,'');
      break;
    case 'csy':
      value=w.replace($csy,'');
      break;
    default:
      value=w.replace($ecn,'');
  }
  return value;
}
/*输入限制 -e*/

