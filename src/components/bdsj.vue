<template>
  <div class="bdsj">
    <div id="header">
      <span  class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>绑定手机号</span>
    </div>
    <div class="size">
      <span>手机号码</span>
      <input type="text">
    </div>
    <div class="yzm">
      <span>验证码</span>
      <span>获取验证码</span>
    </div>
    <button class="btn">绑定</button>
  </div>
</template>
<script>
export default {
  name: 'Bdsj',
  data () {
    return {
     
    }
  },
  methods:{
      fanhui(){
        this.$router.go(-1)
      }
    }
}
</script>

<style scoped lang="scss">
.bdsj{
  height:100%;
  background:#F7F7F7;
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
      font-size:1.3rem;
     }
    span:nth-child(2){
      flex:1;
      text-align:center;
      font-weight:900;
      color:#333333;
      font-size:1.2rem;
      padding-right:1rem;
    }
   }
  .size{
    background:#fff;
    margin-top:.5rem;
    padding:.8rem;
    border-top:1px solid #F1F1F1;
    border-bottom:1px solid #F1F1F1;
    overflow: hidden;
    >span:nth-child(1){
      font-size:1.1rem;
      color:#323232;
    }
    >input{
      float:right;
      height:1.1rem;
      color:#666666;
    }
  }
  .yzm{
     background:#fff;
    padding:.8rem;
   border-bottom:1px solid #F1F1F1;
    overflow: hidden;
    >span:nth-child(1){
      font-size:1.1rem;
      color:#323232;
    }
    >span:nth-child(2){
      font-size:1rem;
      color:#22AC38;
      float:right;
    }
  }
  .btn{
    margin-top:3rem;
    margin-left:5%;
    width:90%;
    height:3rem;
    background:#22AC38;
    color:#fff;
    border-radius: 3rem;
  }
</style>