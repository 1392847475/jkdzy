<template>
    <div class="wdgz">
       <div id="header">
      <span  class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>我的关注</span>
    </div>
      <div class="nav">
      <ul class="nav-list">
            <li v-for="(item,i) in items" @click="sk_list(i)" :key="i" >
              <span v-bind:class="{redd:i==current}">{{item.select}}</span>
            </li> 
      </ul>
    </div>
    <div id="section">
      <mt-tab-container v-model="active" :swipeable="true">
        <mt-tab-container-item id="1">
        <ul class="section-list1">
          <router-link tag="li" :to="'/yhzl/'+item.id" v-for="(item,i) in list" :key="i">
            <img v-if="item.headportrait.length > 50" v-lazy="item.headportrait" alt="">
            <img v-else v-lazy="base_URL+item.headportrait" alt="">
            <div>
              <p>{{item.nickname}}</p>
              <p v-if="item.unit != undefined">{{item.unit}} | {{item.department}}</p>
            </div>
            
          </router-link>
        </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="section-list2">
          <router-link tag="li" :to="'/yhzl/'+item.id" v-for="(item,i) in list2" :key="i">
            <img v-if="item.headportrait.length > 50" v-lazy="item.headportrait" alt="">
            <img v-else v-lazy="base_URL+item.headportrait" alt="">
            <div>
              <p>{{item.nickname}}</p>
              <p v-if="item.unit != undefined">{{item.unit}} | {{item.department}}</p>
            </div>
            
          </router-link>
        </ul>
        </mt-tab-container-item>
       
       
    </mt-tab-container>
    </div>
    </div>
  </template>
  <script>
  import Vue from "vue"
  import axios from "axios";
  import { TabContainer, TabContainerItem ,MessageBox,Lazyload} from 'mint-ui';
  Vue.use(Lazyload);
export default {
  name: 'Wdcg',
  data () {
    return {
     active:"1",
     current:0,
     items: [
　　　　　　　　　{select:'我关注的'},
　　　　　　　　　{select:'关注我的'},
　　　　　　　　],
    activee:["1","2"],
    list : [],
    list2 : [],
    base_URL : process.env.API_URL,
    }
  },
  watch: {
    active: function (val, oldVal) {//监听tab对应的ID
        this.current=val-1
    }
},
computed:{
  mounted(){}
},
mounted(){
  let that = this;
  var base_URL = process.env.API_URL //获取环境变量配置
  var url = base_URL + "/pub/api/info/myfous";
  var url2 = base_URL + "/pub/api/info/fousmy";
  axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
            console.log(res)
             if(res.data.code == 100){
               that.list = res.data.data.result
         
             }
          }).catch(function(){

          })
    //关注我的
     axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
            console.log(res,"33")
             if(res.data.code == 100){
               that.list2 = res.data.data.result
           
  
             }
          }).catch(function(){

          })
      
},
  methods:{
     sk_tab(value){
console.log(value)
 },
  sk_list(i){
   this.current=i;
   this.active=this.activee[i]
  },
      fanhui(){
        this.$router.go(-1)
      },
    }
}
</script>

<style scoped lang='scss'>
img[lazy=loading] {
  margin: auto;
  background:#C8C8C8;
}
.wdgz{
  height:100%;
  background:#F0F0F0;
}
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
   .nav{
  width:100%;
  position:fixed;
  top:3rem;
  z-index:9;
  background:#fff;
  ul{
    overflow: hidden;
    height:3rem;
    border-top:1px solid #CCCCCC;
    border-bottom:1px solid #CCCCCC;
    box-sizing:border-box;
    li{
      position: relative;
      width:50%;
      float: left;
      font-size:1rem;
      text-align:center;  
      color:#666666;
      span{
        display: inline-block;
        height:2.8rem;
        line-height:2.8rem;
        width:60%;
      }
    }
    
  }
}
.redd{
  color:#22AC38!important;
  border-bottom:.2rem solid #22AC38;
  }
  #section{
    position: relative;
    top:6rem;
  }
  .section-list1{
    background:#fff;
    li{
      padding:.8rem;
      border-bottom:1px solid #CCCCCC;
      overflow: hidden;
      >img{
        float: left;
        width:3rem;
        height:3rem;
        border-radius:50%;
      }
      >div{
        float: left;
        margin-left:.5rem;
          p:nth-child(1){
            color:#000;
            font-size:1.1rem;
             padding-top:.3rem;
          }
          p:nth-child(2){
            padding-top:.5rem;
            font-size:.9rem;
            color:#666666;
        }
      }
    }
   }
  .section-list2{
    background:#fff;
    li{
      padding:.8rem;
      border-bottom:1px solid #CCCCCC;
      overflow: hidden;
      >img{
        float: left;
        width:3rem;
        height:3rem;
        border-radius:50%;
      }
      >div{
        float: left;
        margin-left:.5rem;
          p:nth-child(1){
            color:#000;
            font-size:1.1rem;
             padding-top:.3rem;
          }
          p:nth-child(2){
            padding-top:.5rem;
            font-size:.9rem;
            color:#666666;
        }
      }
    }
  }
</style>