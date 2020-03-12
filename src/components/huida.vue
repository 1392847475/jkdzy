<template>
  <div class="huida">
    
    <div id="header">
      <span @click="fanhui()">取消</span>
      <span>回答</span>
      <span @click="tijiao()" v-if = "banstate != 1&&tiwen !=false">提交</span>
      <span v-else>提交</span>
    </div>
    <div class="wenti">
      <p>{{list.title}}</p>
    </div>
    <div id="section">
      <textarea name="" id="" v-model = "iptt" maxlength="400" placeholder="回答（1-400）">

      </textarea>
      <div>
        <ul>
          <li>
            <div class="tjtp">
              
              <p class="iconfont icon-z"></p>
              <p>添加图片</p>
              <input v-for="(item,i) in ipt" :key = "i" v-if="ipt[i]==ipc" type="file" multiple name="" id="file" @change="upfile($event)" accept="image/*"/>
            </div>
          </li>
          <li v-for="(item , i) in fileresult" :key = "i">
            <img v-bind:src="item" alt="" srcset="">
          </li>
          </ul>
        </div>
    </div>
    <div class="tjbq sfnm">
      <!-- <p><span>*</span><span>是否匿名</span></p>
      <p><mt-switch v-model="value"></mt-switch></p> -->
    </div>
  </div>
</template>
<script>
import axios from "axios"
import { Indicator,Toast } from 'mint-ui';
export default {
  name: 'Huida',
   data () {
    return {
     value:false,
     qid : "",
     list : {},
     iptt : "",
     secrecy : 0,
     ipt : [1,2,3,4,5,6,7,8,9],
     ipc : 1,
     fd : new FormData(),
     fileresult : [],
     banstate : "",
     tiwen : true,
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
      upfile($event){
        //选择图片
        let that = this

        let file = $event.target.files[0]
        if(that.fileresult.length < 6){
             if(file.size > 1024 * 1024 *2){
           let instance3 = Toast('图片大小超过2M,请手动压缩后再次尝试');
              setTimeout(() => {
                 instance3.close();
               }, 1500);
        }else{
            that.fd.append('file',file)
         console.log(that.fd)
        let rd = new FileReader() //转base64 展示缩略图
        rd.readAsDataURL(file)
        rd.onloadend = function(e){
         
         that.fileresult.push(this.result) 
        }
        that.ipc = that.ipc++
        }
        }else{
           let instance3 = Toast('最多选择6张图片');
              setTimeout(() => {
                 instance3.close();
               }, 1500);
        }
       
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
        that.tiwen = false;
        let instance = Toast('上传中。。。');
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&qid=${that.qid}&beanjson=${encodeURI(JSON.stringify(data))}`).then(function(res){
          console.log(res)
            if(res.data.code == 100){
              axios.defaults.withCredentials = true
              axios({
                method: 'post',
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                url: url2+'?wechatid='+sessionStorage.getItem('skopenid')+'&answerid='+res.data.data.result,
                data: that.fd
              }).then(function(res) {
                console.log(res)
                if(res.data.code==100){
                  
                   instance.close();
                    let instance2 = Toast('上传成功,审核中。。。');
                    setTimeout(() => {
                      instance2.close();
                       that.$router.go(-1)
                    }, 1000);
                }else{
                  let instance = Toast('问题上传成功，图片上传失败');
                    setTimeout(() => {
                      instance.close();
                       that.$router.go(-1)
                    }, 1500);
                }
              }).catch(function(error) {
                console.log(error);
              })
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
    >div{
      margin-top:1rem;
      ul{
        overflow: hidden;
        li{
          width:23%;
          height:4rem;
          float: left;
          margin-right:2%;
          margin-bottom:.4rem;
        .tjtp{
                width:4rem;
                height:4rem;
                border:1px dashed #666666;
                box-sizing:border-box;
               
                p{
                  text-align:center;
                  color:#999;
                }
                p:nth-child(1){
                  font-size:1.8rem;
                  line-height:2.1rem;
                }
                p:nth-child(2){
                  font-size:.8rem;
                  line-height:1.7rem;
                 }
                  #file{
                   position:absolute;
                   width:4rem;
                   height:4rem;
                   top:16.2rem;
                   opacity: 0;
                 }
              }
              img{
                width:100%;
                height:100%;

              }
        }
      }
      
    }
  }
  .tjbq{
    padding:1rem;
    border-top:1px solid #E6E6E6;
    border-bottom:1px solid #E6E6E6;
    overflow:hidden;
    p:nth-child(1){
      float:left;
      position: relative;
      span:nth-child(1){
        color:#E02E24;
        font-size:1.2rem;
        position:absolute;
        top:.3rem;
      }
      span:nth-child(2){
        color:#B3B3B3;
        font-size:1.2rem;
        padding-left:.7rem;
      
      }
    }
    p:nth-child(2){
      float:right;
      font-size:1.1rem;
    }
  }
  .sfnm{
     p:nth-child(1){
       height:2.2rem;
       line-height: 2.2rem;
     }
    border-top:none;
    padding:.5rem 1rem;
    p:nth-child(2){
     
     
    }
  }
</style>