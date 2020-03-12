<template>
  <div class="tjbq">
     <div id="header">
      <span class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>积分详情</span>
    </div>
    <div id="section">
      <div v-if="list != ''">
        <ul >
          <li v-for="(item , i) in list" :key="i" >
            <p><span>{{item.datamark}}</span><span>+{{item.score}}</span></p>
            <p>{{item.creattime}}</p>
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
export default {
  name: 'jfxq',
  data () {
    return {
     list:[],
     i : 1,
     number : 1,
    }
  },
  mounted(){
    var base_URL = process.env.API_URL //获取环境变量配置
    var that = this;
    var url = base_URL + "/pub/api/info/scorelist";
     axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
       console.log(res)
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
  var url = base_URL + "/pub/api/info/scorelist";
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
    }
    span:nth-child(3){
     font-size:1.1rem;
     color:#22AC38;
    }
  }
  #section{
    padding:1.0rem 1rem 0.5rem 1rem; 
    border-bottom:1px solid #CCC;
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
      overflow:hidden;
      li{
        width:94%;
        float:left;
        padding:.4rem .5rem;
        margin-bottom:.6rem;
        background:#DCDCDC;
        color:#666666;
        border-radius:.3rem;
        line-height: 1.5rem;
        >p:nth-child(1){
          >span:nth-child(2){
            float:right;
            margin-right:.8rem;
            color:red;
          }
        }
        >p:nth-child(2){
          font-size:.8rem;
          margin-top:.4rem;
        }
        
      }
    }
  }
  .none{
     text-align: center;
     line-height: 2rem;
     color:#999;
   }
</style>