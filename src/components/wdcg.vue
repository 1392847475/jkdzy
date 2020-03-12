<template>
    <div class="wdcg">
       <div id="header">
      <span  class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>我的草稿</span>
      <span class="iconfont icon-shanchu" @click="confirm()"></span>
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
          <li>
            <p>多喝热水</p>
            <p>2018.11.28</p>
          </li>
        </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="section-list2">
          <li>
            <p>我得肚子特难受可咋办</p>
            <p>2018.11.28</p>
          </li>
        </ul>
        </mt-tab-container-item>
       
       
    </mt-tab-container>
    </div>
    </div>
  </template>
  <script>
  import { TabContainer, TabContainerItem ,MessageBox} from 'mint-ui';
export default {
  name: 'Wdcg',
  data () {
    return {
     active:"1",
     current:0,
     items: [
　　　　　　　　　{select:'回答草稿'},
　　　　　　　　　{select:'提问草稿'},
　　　　　　　　],
    activee:["1","2"],
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
      confirm(){
    MessageBox({
  showCancelButton:true
})
MessageBox.confirm('当前消息记录将被清空，是否确认','清空消息列表',).then(action => {
 if(action == 'confirm'){
   console.log("确认");
 }
}).catch(err=>{
  if(err == 'cancel'){
    console.log("取消")
  }
});
  }
    }
}
</script>

<style scoped lang='scss'>
.wdcg{
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
     }
    span:nth-child(3){
     font-size:1.5rem;
     padding-right:.6rem;
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
        width:50%;
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
      p:nth-child(1){
        color:#000;
        font-size:1.1rem;
      }
      p:nth-child(2){
        padding-top:.5rem;
        font-size:.9rem;
        color:#666666;
      }
    }
   }
  .section-list2{
    background:#fff;
    li{
      padding:.8rem;
      border-bottom:1px solid #CCCCCC;
      p:nth-child(1){
        color:#000;
        font-size:1.1rem;
      }
      p:nth-child(2){
        padding-top:.5rem;
        font-size:.9rem;
        color:#666666;
      }
    }
  }
</style>