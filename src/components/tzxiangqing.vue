<template>
  <div class="tzxiangqing">
    <div id="header">
      <span  class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>通知详情</span>
    </div>
    <div id="section">
      <h3>恭贺商户【上海包图网科技有限公司】成功于此平台对接。</h3>
      <p>2018-05-20</p>
      <ul>
        <li>
         恭贺商户【上海包图网科技有限公司】成功于此平台对接。
        </li>
        <li>联系人：郭女士</li>
        <li>联系电话：13312345678</li>
        <li>商户地址：河北省石家庄市长安区和平东路xxx号</li>
        <li>经营范围：汽车美容、汽车配件、润滑油、汽车租赁、汽车维修等。</li>
        <li>官网链接：https://ibaotu.com/</li>
        <li>平台对接的商户，可在【包图官网】→【商城基地】板块看到。</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tzxiangqing',
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
   #section{
     background:#fff;
     padding:1rem .5rem;
     color:#000;
     border-bottom:1px solid #CCCCCC;
     h3{
       font-size:1.1rem;
       line-height:1.6rem;
     }
     p{
       padding-top:1rem;
      text-align: right;
       font-size:1rem;
     }
     ul{
       padding-top:.6rem;
        font-size:.9rem;
       line-height:1.8rem;
     }
   }
</style>