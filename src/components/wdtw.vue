<template>
    <div class="">
       <div id="header">
      <span  class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>我的提问</span>
    </div>
    <div id="section">
      <div v-if="list != ''">
      <ul >
        <li v-for = "(item , i) in list" :key = "i">
        <router-link tag = "div" :to="'/xxiangqing/'+item.id" >
         <h3>{{item.title}}</h3>
         <p class="ddd"><span>{{item.createtime}}</span></p>
         <p v-if = "item.state==0" class="color1">审核中</p>
         <p v-if = "item.state==1" class="color2">审核已通过</p>
         <p v-if = "item.state==2" class="color2">已采纳</p>
         <p v-if = "item.state==3" class="color2">加精</p>
         <p v-if = "item.state==7" class="color3">审核未通过</p>
         </router-link>
         <p class="sc" ><span @click="sc(item.id)">删除</span></p>
         </li>
      </ul>
        <p v-if = "number == 1" class="jz" @click="jz()">点击加载更多</p>
        <p v-else-if = "number == 2" class="jz">加载中。。。</p>
        <p v-else-if = "number == 3" class="jz jzz">没有更多了</p>
      </div>
      <p v-else class="none">暂无提问</p>
    </div>
    </div>
  </template>
  <script>
  import axios from "axios"
  import {MessageBox} from 'mint-ui';
export default {
  name: 'Wdtw',
  data () {
    return {
     list : [],
     i : 1,
     number : 1,
    }
  },
  mounted(){
    var base_URL = process.env.API_URL //获取环境变量配置
    var url = base_URL + "/pub/api/question/myquestion";
    let that = this;
    axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
      console.log(res,"1")
      if(res.data.code == 100){
       that.list = res.data.data.result.list
        if(that.list.length < 10){
             that.number = 3
           }
      }
    }).catch(function(){

    })
  },
  methods:{
      fanhui(){
        this.$router.go(-1)
      },
      //加载更多
       jz(){
    var that = this;
    that.i++;
    that.number = 2;
    var base_URL = process.env.API_URL //获取环境变量配置\
  var url = base_URL + "/pub/api/question/myquestion";
     axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&pageNumber=${that.i}&pageSize=10`)
                  .then(function(res){
                  console.log(res,that.i)
                  if(res.data.code==100){
                    if(res.data.data.result.list.length == 0){
                      that.number = 3
                    }else{
                      for(var i = 0;i<res.data.data.result.list.length;i++){
                        that.list.push(res.data.data.result.list[i])
                      }
                      
                      that.number = 1
                    }
                    console.log(that.list)
                  }
          }).catch(function(err){

                  }) 
  },
      //删除提问
       sc(id){
          var base_URL = process.env.API_URL //获取环境变量配置
    var url = base_URL + "/pub/api/question/redelquestion";
        MessageBox({
      showCancelButton:true
    })
    MessageBox.confirm('当前提问将被删除，是否确认','删除问题',).then(action => {
    if(action == 'confirm'){
      //console.log("确认");
      
      let that = this
      // this.$router.replace({
      //                   path: '/refresh',
      //                   query: {
      //                     t: Date.now()
      //                   }
      //                 })
        //用 id
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&questionid=${id}`)
                  .then(function(res){
                  console.log(res,id)
                  if(res.data.code==100){
                    console.log("删除成功")
                    that.$router.replace({
                        path: '/refresh',
                        query: {}
                      })
                  }
          }).catch(function(err){

                  }) 
    }
    }).catch(err=>{
      if(err == 'cancel'){
        //console.log("取消")
      }
    });
      }
    }
}
</script>

<style scoped lang='scss'>
#header{
   height:1.8rem;
    border-bottom:1px solid #CCCCCC;
    width:100%;
    padding:.6rem 0;
    display:flex;
    background:#fff;
    position:fixed;
    top:0;
  span{
    line-height:1.8rem;
  }
    span:nth-child(1){
      font-size:1.3rem;
      padding-left:.6rem;
     }
    span:nth-child(2){
      flex:1;
      text-align:center;
      color:#333333;
      font-size:1.2rem;
      padding-right:2rem;
    }
   }
   #section{
     padding-top:3rem;
     .jz{
    text-align: center;
    font-size:.88rem;
    line-height: 3rem;
    width:100%;
    height:3rem;
    color:#22AC38;
  }
  .jzz{
    color:#999999;
  }
     ul{
       background:#fff;
       li{
         padding:.6rem .6rem;
         border-bottom:1px solid #CCCCCC;
         h3{
           color:#333;
           font-size:1.2rem;
           line-height: 1.5rem;
         }
         p{
           font-size:.9rem;
           padding-top:1rem;
         }
          .sc{
        text-align:right;
        color:#9EDDFC;
        font-size:.8rem;
        padding-top:0;
        span{
          line-height: 1.4rem;
        }
      }
       }
     }
   }
   .color1{
     color:#FF8E09;
   }
   .color2{
     color:#22AC38;
   }
   .color3{
     color:red;
   }
   .ddd{
     color:#878889;
   }
   .none{
     text-align: center;
     line-height: 2rem;
     color:#999;
   }
</style>