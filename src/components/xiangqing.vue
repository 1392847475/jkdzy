<template>
  <div class="xiangqing">
    <div id="header">
      <span class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>文章详情</span>
      <span></span>
      <!-- <span class="iconfont icon-fenxiang"></span> -->
    </div>
    <div id="section">
      <h3>
      {{list.title}} 
      </h3>
      <p class="time"><span>{{list.creattime.slice(0,10)}}</span><span>{{list.fwzhcode}}</span></p>
      <p class="content" v-html="list.content">
        {{list.content}}
      </p>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: 'Xiangqing',
  
  data () {
    return {
      list : "",
      base_URL : process.env.API_URL,
      id : "",
    }
  },
  mounted(){
    var that = this;
    var url = that.base_URL + "/pub/api/info/subjectinfo";
    that.id = this.$route.params.id
    console.log(this.$route.params.id)
     axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&subjectid=${that.id}`)
        .then(function(res){
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
      }
    },
}
</script>

<style scoped lang="scss">
#header{
  width:94%;
    height:1.8rem;
    border-bottom:1px solid #CCCCCC;
    padding:.6rem 3%;
    display:flex;
    background:#fff;
    position: fixed;
    top:0;
  span{
    line-height:1.8rem;
  }
    span:nth-child(1){
      font-size:1.3rem;
     
    }
    span:nth-child(2){
      flex:1;
      text-align:center;
      font-weight:900;
      color:#333333;
      font-size:1.2rem;
    }
    span:nth-child(3){
      display: inline-block;
      width:1.5rem;
      height:1.5rem;
    }
  }
  #section{
    margin-top:3rem;
    padding:1rem .6rem;
    >h3{
      font-size:1.5rem;
      font-weight:900;
      color:#000;
      line-height:1.8rem;
    }
    .time{
      padding:1rem 0;
      span:nth-child(1){
        font-size:.9rem;
        color:#888;
        padding-right:1rem;
      }
      span:nth-child(2){
         font-size:.9rem;
        color:#576B95;
      }
    }
    .content{
      font-size:1rem;
      color:#111;
      line-height:1.5rem;
    }
  }
</style>
<style>
 .content img{
    width:100%;
 }
</style>