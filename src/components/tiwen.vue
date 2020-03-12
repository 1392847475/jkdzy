<template>
  <div id="tiwen">
    <div id="header">
      <span @click="fanhui()">取消</span>
      <span>提问</span>
      
      <span @click="tijiao()" v-if = "banstate != 1&&tiwen !=false">提交</span>
      <span v-else>提交</span>
    </div>
    <div id="section">
      <p><input type="text" v-model="val1" maxlength="50" placeholder="添加标题（5-49）字"></p>
      <ul>
          <router-link tag="li" :to="'/xxiangqing/'+item.id" v-for="(item,i) in list2" :key = "i" v-if="i < 2">
            <p>{{item.title}}</p>
            <p>{{item.content}}</p>
          </router-link>
          
       </ul>
      <textarea name="" id="" v-model="val2"  maxlength="400"  placeholder="问题描述（1-400）">
      </textarea>
      <div>
        <ul>
          <li>
            <div class="tjtp">
              <p class="iconfont icon-z"></p>
              <p>添加图片</p>
              <input v-for="(item,i) in ipt" :key = "i" v-if="ipt[i]==ipc" type="file"  name="" id="file" @change="upfile($event)" accept="image/*"/>
            </div>
          </li>
          <li v-for="(item , i) in fileresult" :key = "i">
            <img v-bind:src="item" alt="" srcset="">
          </li>
         
          </ul>
        </div>
    </div>
    <div class="tjbk" @click="bankuai()">
        <p><span>*</span><span>添加板块</span></p>
        <p class="iconfont icon-jinru"></p>
      </div>
    <div class="tjbq" @click="biaoqian()">
        <p><span>*</span><span>添加标签</span></p>
        <p class="iconfont icon-jinru"></p>
      </div>
      <!-- <div v-if = "teyao != 2" class="tjbq" @click="xuanshangs()" >
        <p><span>*</span><span>添加悬赏</span></p>
        <p class="iconfont icon-jinru"></p>
      </div> -->
    <div class="tjbq sfnm">
      <p><span>*</span><span>是否匿名</span></p>
      <p><mt-switch v-model="value"></mt-switch></p>
    </div>
     <!-- <p class="xieyi">提交即视为同意<span @click="xieyi()">《医家互联用户协议》</span></p> -->
    
    <div class="diqv" v-if = "pickerr">
        <div class="skdiqv" @click="skdiqv()"></div>
        <div class="wancheng">
          <span @click="skdiqv()">清空</span>
          <span @click="skqueren()">确认</span>
        </div>
        <div class="picker" >
          <ul>
            <li v-for="(item,i) in list" :key='i'  :class="{'color':item.sshow===true}" :dataid="item.id"  @click="sbiaoqian($event,i,item)">{{item.name}}</li>
          </ul>
        </div>
      </div>
   
      <!-- 悬赏金额 -->
      <div class="xuanshang" v-show = "xuanshang">
          <div @click="fxuanshang()">

          </div>
          <div>
            <p>选择悬赏金额</p>
            <ul @click="xuanze">
              <li v-for="(item,i) in list7" :key = "i" :data-index="i" :class="{'indexcolor':index7 == i}">{{item.text}}</li>
              
            </ul>
            <button @click="yes()">确定</button>
          </div>
      </div>
         <div class="yjxy" v-show = "yjxy">
           <div>
              1、本系统主要是帮助用户在有健康知识问题或就医过程问题时，可以向公众（包括医务专家）
        寻求建议和帮助。您可以就常见的健康知识寻求正确的解读，您也可以寻医问药，您还可以针
        对就医过程中遇到的困难征求其他人的建议。但是，本板块不支持与诊疗相关的行为，不提供
        与诊疗相关的服务。<br/>
        2、请您务必注意保护您的个人隐私，建议提问者采用匿名方式发布您的问题。<br/>
        3、如果您是医务工作者，或对提问者提出的问题比较了解，希望您热情地伸出援助之手，帮助
        提问者纾危解困，系统将根据您回答问题的质量标注您的专业程度级别。<br/>
        4、该板块是向公众开放的，您需对在本系统所发表的言论承担法律责任。在此郑重提醒，所有
        建议仅供参考，本系统及其主体不对所有言行提供担保，不承担由此造成的法律责任。<br/>
        5、您选择使用本系统服务，即表示您已同意了上述协议内容。
        <p @click="xytrue()">确认</p>
     </div>
      </div>
  </div>
</template>
<script>
import axios from "axios"
import { Indicator,Switch,Toast } from 'mint-ui';
export default {
  name: 'Tiwen',
  data () {
    return {
      list: [],
      list2:[],
      val1:"",
      val2:"",
      list7:[{
        id:0,
        text:'1元'
      },{
        id:1,
        text:'2元'
      },{
        id:2,
        text:'5元'
      },{
        id:3,
        text:'10元'
      },{
        id:4,
        text:'50元'
      },{
        id:5,
        text:'100元'
      },],
      index7 : -1,
      pickerr : false,
     value:false,
     yjxy:false,
     localIds : [],
     secrecy:"0",
     strr : "",
     strr2 : "",
     questype : "0",
     mymoney: 0,
     base_URL : process.env.API_URL,
     file : [],
     fileresult : [],
     qid : [],
     teyao : "",
     banstate : "",
     xuanshang : false,
     ipt : [1,2,3,4,5,6],
     ipc : 1,
     fd : new FormData(),
     tiwen : true,
    }
  },
  mounted(){
    this.teyao = this.$route.params.id
   this.banstate = sessionStorage.getItem('skbanstate')
  },
   watch: {
    value: function (val, oldVal) {
          if(val == true){
            this.secrecy = "1"
          }else{
            this.secrecy = "0"
          }
    },
     val1:function(a,b){
        var base_URL = process.env.API_URL //获取环境变量配置
        var url = base_URL + "/pub/api/question/searchsameques";//查询提示
        var that = this
 console.log("匹配查询")
 if(a != ''){
axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&keywords=${encodeURI(a)}`).then(function(data){
          console.log(data)
                  that.list2 = data.data.data.result
                 
              }).catch(function(err){
                  console.log(err)
              })
               }else{
                 that.list2 = "";
               }
  },
    val2:function(a,b){
  },
},
methods:{
      xuanshangs(){
        this.xuanshang = true;
      },
       fxuanshang(){
         this.xuanshang = false;
         this.index7 = -1
      },
      yes(){
        var that = this;
        this.xuanshang = false;
        if(that.index7 == -1){
          let instance = Toast("请选择金额");
              setTimeout(() => {
                instance.close();
              }, 1500);
        }else if(that.index7 == 0){
          that.mymoney = 1
        }else if(that.index7 == 1){
          that.mymoney = 2
        }else if(that.index7 == 2){
          that.mymoney = 5
        }else if(that.index7 == 3){
          that.mymoney = 10
        }else if(that.index7 == 4){
          that.mymoney = 50
        }else if(that.index7 == 5){
          that.mymoney = 100
        }

         var url = that.base_URL + "/pub/api/info/mymoney";
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
           if(res.data.code == 100){
         if(that.mymoney <= res.data.data.result){
         }else{
           that.index7 == -1
           console.log("请充值")
         }
         }
           }).catch(function(){
    });

      },
       xuanze(e){
        if (e.target.nodeName.toLowerCase() === 'li') {
            const index = parseInt(e.target.dataset.index)
            // 获得引索后，只需要修改data数据就能改变UI了
            this.index7 = index;
          }
      },
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
        var url = base_URL + "/pub/api/question/initquestion";
        var url2 = base_URL + "/pub/api/question/questionpic";//图片
         var url3 = base_URL + "/pub/api/info/datadic";//板块
       
        let that = this
        if( that.val1 == ""){
            let instance = Toast('标题不能为空');
              setTimeout(() => {
                instance.close();
               }, 600)
        }else if(that.val2 == ""){
          let instance = Toast('内容不能为空');
              setTimeout(() => {
                instance.close();
               }, 600)
        }else if(that.strr2 == ""){
          let instance = Toast('标签不能为空');
              setTimeout(() => {
                instance.close();
               }, 600)
        }else if(that.strr == ""){
          let instance = Toast('板块不能为空');
              setTimeout(() => {
                instance.close();
               }, 600)
        }else{
        if(that.strr != ""){
         that.strr = that.strr.slice(0,that.strr.length-1)
        }
        if(that.strr2 != ""){
         that.strr2 = that.strr2.slice(0,that.strr2.length-1)
         }
         //悬赏问答
          if(that.index7 != -1){
            that.questype = "1"
            var beanjson = {
            "title" : that.val1,
            "content" : that.val2,
            "plate" : that.strr,
            "label" : that.strr2,
            "secrecy" : that.secrecy,
            "questype" : that.questype,
            "rewardmoney" : that.mymoney,
          }
        }else if(that.teyao == 2){//特邀问答
          var beanjson = {
            "title" : that.val1,
            "content" : that.val2,
            "plate" : that.strr,
            "label" : that.strr2,
            "secrecy" : that.secrecy,
            "questype" : "2",
          }
          }else{
          var beanjson = {//普通问答
            "title" : that.val1,
            "content" : that.val2,
            "plate" : that.strr,
            "label" : that.strr2,
            "secrecy" : that.secrecy,
            "questype" : that.questype
          }
        }
        that.tiwen = false;
    console.log(that.val2)
    var instance = Toast('提交中。。。');
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&beanjson=${encodeURI(JSON.stringify(beanjson))}`).then(function(res){
          
            if(res.data.code == 100){
              that.qid =  res.data.data.result;
              // 图片上传
              console.log(that.fd)
              axios.defaults.withCredentials = true
              
              axios({
                method: 'post',
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                url: url2+'?wechatid='+sessionStorage.getItem('skopenid')+'&questionid='+that.qid,
                data: that.fd
              }).then(function(res) {
                if(res.data.code==100){
                   instance.close();
                    let instance2 = Toast('上传成功,审核中。。。');
                    if(that.teyao == 2){
                      setTimeout(() => {
                      instance2.close();
                       that.$router.push({path:`/teyao/${that.qid}`})
                    }, 200);
                    }else{
                        setTimeout(() => {
                      instance2.close();
                       that.$router.go(-1)
                    }, 1000);
                    }
                    
                }else{
                  let instance = Toast('问题上传成功，图片上传失败');
                    if(that.teyao == 2){
                      setTimeout(() => {
                      instance.close();
                       that.$router.push({path:`/teyao/${that.qid}`})
                    }, 200);
                    }else{
                        setTimeout(() => {
                      instance.close();
                       that.$router.go(-1)
                    }, 1500);
                    }

                }
              }).catch(function(error) {
                let instance = Toast('问题上传成功，图片上传失败');
                    setTimeout(() => {
                      instance.close();
                       that.$router.go(-1)
                    }, 1500);
              })
            }
        }).catch(function(){
        });

        }
       },
       bankuai(){
       this.pickerr = true;
       var that = this;
 var base_URL = process.env.API_URL //获取环境变量配置
 var url3 = base_URL + "/pub/api/info/datadic";//板块
    axios.post(url3,`wechatid=${sessionStorage.getItem('skopenid')}&dictype=platecode`).then(function(data){
            for(var a=0 ;a<data.data.data.result.length;a++){
                    data.data.data.result[a].sshow = false
                  }
                  that.list = data.data.data.result
                  for(var i=0;i<that.list.length;i++){
                    if(that.strr.indexOf(that.list[i].id)  != -1){
                      that.list[i].sshow = true;
                    }
                  }
              }).catch(function(err){
                  console.log(err)
              })

   },
    biaoqian(){
       var base_URL = process.env.API_URL //获取环境变量配置
       var url3 = base_URL + "/pub/api/info/datadic";//板块
       this.pickerr = true;
       var that = this;
    axios.post(url3,`wechatid=${sessionStorage.getItem('skopenid')}&dictype=labelcode`).then(function(data){
                 
                  for(var a=0 ;a<data.data.data.result.length;a++){
                    data.data.data.result[a].sshow = false
                  }
                  that.list = data.data.data.result
                  for(var i=0;i<that.list.length;i++){
                    if(that.strr2.indexOf(that.list[i].id)  != -1){
                      that.list[i].sshow = true;
                    }
                  }
              }).catch(function(err){
                  console.log(err)
              })
       
   },
   //协议
   xieyi(){
      this.yjxy = true;
   },
   xytrue(){
     this.yjxy = false;
   },
      skdiqv(){
        this.strr = "",
        this.strr2 = "",
        this.pickerr = false;
      },
      skqueren(){
         this.valuesss = this.valuess
          this.pickerr = false;
      },
      sbiaoqian(event,i,item){
        item.sshow = !item.sshow;
        var el = event.target;
        if(item.dictionaryCode == "0001"){
          if(item.sshow == true){
          if(this.strr.indexOf(el.getAttribute("dataid")) == -1)
          this.strr += el.getAttribute("dataid")+"|"
        }else if(this.strr.indexOf(el.getAttribute("dataid")+"|") != -1){
          this.strr =  this.strr.replace(el.getAttribute('dataid')+"|","")
         }
        }else if(item.dictionaryCode == "0002"){
          if(item.sshow == true){
          if(this.strr2.indexOf(el.getAttribute("dataid")) == -1)
          this.strr2 += el.getAttribute("dataid")+"|"
        }else if(this.strr2.indexOf(el.getAttribute("dataid")+"|") != -1){
          this.strr2 =  this.strr2.replace(el.getAttribute('dataid')+"|","")
         }
        }
        
         console.log(item)
         
          }
    }
}
</script>

<style scoped lang="scss">
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
    padding:.95rem;
    background:#fff;
    >p{
      margin-bottom:.5rem;
      input{
        border-bottom:1px solid #ddd;
        font-size:.88rem;
        width:100%;
      }
    }
    >ul{
      li{
        margin-bottom:.3rem;
        background:#ddd;
        p:nth-child(1){
          color:#333333;
          font-size:.88rem;
          padding-bottom:.5rem;
        }
        p:nth-child(2){
           color:#868686;
          font-size:.8rem;
          line-height:1rem;
          overflow:hidden;
          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
        }
      }
    }
  textarea{
    width:100%;
    height:8rem!important;
      resize:none;
      color:#333333;
      font-size:.9rem;
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
                   top:15.2rem;
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
  .tjbq,.tjbk{
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
  .tjbk{
    border-bottom:none;
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
  .diqv{
  width:100%;
  height:100%;
  background:rgba(0,0,0,.5);
  position: fixed;
  top:0;
  .skdiqv{
    width:100%;
    height:60%;
    position:absolute;
    top:0;
  }
  .wancheng{
    width:100%;
    height:2rem;
    background:#fff;
    color:red;
    font-size:.9rem;
    position:absolute;
    bottom:30%;
    border-bottom:1px solid #ddd;
    span{
      display:inline-block;
      width:47%;
      text-align: center;
      line-height:2rem;
    }
  }
  .picker{
    width:100%;
    height:30%;
    background:#fff;
    position:absolute;
    bottom:0;
    
    ul{
          overflow:hidden;
          li{
            float:left;
            padding:.4rem .4rem;
            background:#DCDCDC;
            color:#666666;
            border-radius:.3rem;
            margin:.5rem;
            margin-right:0;
          }
          .color{
  background:#22AC38;
  color:#fff;
}
        }
  }
}
.xuanshang{
  width:100%;
  height:100%;
  position:fixed;
  z-index:999;
  bottom:0;
  background:rgba(30,30,30,.5);
  >div:nth-child(1){
    height:60%;
  }
  >div:nth-child(2){
    height:40%;
    background:#fff;
    color:#666;
    >p{
      height:20%;
      text-align: center;
      font-size:.88rem;
      line-height:2rem;
    }
    >ul{
      width:80%;
      margin-left:10%;
      height:60%;
      font-size:.88rem;
      color:#000;
      li{
        width:20%;
        height:20%;
        margin:4% 6.66%;
        text-align: center;
        float:left;
        border:1px solid #999999;
        box-sizing: border-box;
        line-height: 1.7rem;
      }
      .indexcolor{
        background:#22AC38;
        color:#fff;
      }
    }
    >button{
      height:20%;
      border-top:1px solid #E9E9E9;
      width:100%;
      background:#fff;
    }
  }
}
.xieyi{
  font-size:.65rem;
  color:#999;
  text-align: center;
  margin-top:1rem;
  span{
    color:#22AC38;
  }
}
.yjxy{
  position: fixed;
  top:0;
  width:100%;
  height:100%;
  background:#000;
  font-size:.7rem;
  color:#000;
  line-height: 1.1rem;
  background:rgba(37,37,38,.4);
  div{
    margin-top:20%;
    padding:1rem 5%;
    width:80%;
    margin-left:5%;
    background:#fff;
    border-radius: 1rem;
    p{
      margin-top:.5rem;
      height:2rem;
      line-height: 2rem;
      background:#22AC38;
      border-radius: 1rem;
      text-align: center;
      color:#fff;
      font-size:.85rem;
    }
  }
}

</style>