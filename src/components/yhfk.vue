<template>
  <div class="huida">
    <div id="header">
      <span @click="fanhui()">取消</span>
      <span>用户反馈</span>
      <span @click="tijiao()" v-if = "fankui !=false">提交</span>
      <span v-else>提交</span>
    </div>
    <div id="section">
      <textarea name="" id="" v-model = "iptt" maxlength="300" placeholder="请详细说明，以便于我们定位和解决问题（字数限制在300字以内）">
      </textarea>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import { Indicator,Toast } from 'mint-ui';
export default {
  name: 'Yhfk',
   data () {
    return {
     value:false,
     qid : "",
     list : {},
     iptt : "",
     secrecy : 0,
    fileresult : [],
     banstate : "",
     fankui : true,
    }
  },
   watch: {
    value: function (val, oldVal) {
       if(val == true){
         this.secrecy = 1;
       }else{
         this.secrecy = 0;
       }
    },
},
mounted(){
  this.banstate = sessionStorage.getItem('skbanstate')
  var base_URL = process.env.API_URL //获取环境变量配置
   var url = base_URL + "/pub/api/question/questioninfo";
     let that = this;
      that.qid = this.$route.params.qid
   //请求资料详情
    axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&qid=${that.qid}`).then(function(res){
      console.log(res)
      if(res.data.code == 100){
        that.list = res.data.data.result 
      }
    }).catch(function(){

    })
},
methods:{
      fanhui(){
        
        this.$router.go(-1)
      },
      tijiao(){
        var base_URL = process.env.API_URL //获取环境变量配置
   var url = base_URL + "/pub/api/answer/sreply";
   var url2 = base_URL + "/pub/api/answer/answerpic";
        let that = this;
        if(that.iptt != ""){
        let data = {
          "content" : that.iptt,
          "secrecy" : that.secrecy
        }
        that.fankui = false;
        let instance = Toast('上传中。。。');
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&qid=${that.qid}&beanjson=${encodeURI(JSON.stringify(data))}`).then(function(res){
          console.log(res)
            if(res.data.code == 100){
              axios.defaults.withCredentials = true
            }
        }).catch(function(){
        })
      }else{
         instance.close();
                    let instance2 = Toast('内容不能为空');
                    setTimeout(() => {
                      instance2.close();
                    }, 600);
      }
      }
    }
}
</script>

<style scoped lang="scss">
.wenti{
  background:#F8F8F8;
  color:#999999;
  padding:1rem;
}
#header{
    height:1.8rem;
    border-bottom:1px solid #CCCCCC;
    padding:.6rem .6rem;
    display:flex;
    background:#fff;
  span{
    line-height:1.8rem;
  }
    span:nth-child(1){
     color:#666666;
    }
    span:nth-child(2){
      flex:1;
      text-align:center;
      font-weight:900;
      color:#333333;
      font-size:1.2rem;
    }
    span:nth-child(3){
     color:#22AC38;
      
    }
  }
  #section{
    padding:1rem;
    background:#fff;
  textarea{
    width:100%;
    height:8rem!important;
      resize:none;
      color:#333333;
      font-size:1.1rem;
  }
  }
 
</style>