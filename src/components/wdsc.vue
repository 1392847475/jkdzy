<template>
    <div class="wdsc">
       <div id="header">
      <span  class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>我的收藏</span>
    </div>
    <div id="section">
      <div  v-if="list2 != ''">
      <ul >
        <router-link tag="li" :to="'/xxiangqing/'+item.id" v-for="(item,i) in list2" :key="i">
          <div>
            <p>问答</p>
            <p>{{item.title}}</p>
          </div>
          <p>
            <span></span>
            <span>{{item.createtime}}</span>
          </p>
        </router-link>
      </ul>
      <p v-if = "number == 1" class="jz" @click="jz()">点击加载更多</p>
        <p v-else-if = "number == 2" class="jz">加载中。。。</p>
        <p v-else-if = "number == 3" class="jz jzz">没有更多了</p>
      </div>
      <p v-else class="none">暂无收藏</p>
    </div>
    </div>
  </template>
  <script>
  import axios from "axios"
export default {
  name: 'Wdsc',
  data () {
    return {
     list : [],
     list2 : [],
      i : 1,
     number : 1,
    }
  },
  mounted(){
    var base_URL = process.env.API_URL //获取环境变量配置
      var url = base_URL + "/pub/api/click/getmyquestion";
      var url2 = base_URL + "/pub/api/question/questioninfo";
    let that = this;
    //获取问题的qid
       axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
      console.log(res)
       if(res.data.code == 100){
         that.list = res.data.data.result.list
         if(res.data.data.result.list.length < 10){
           that.number = 3
         }
      //请求问题
      let i = 0;
        wenti(i,that.list.length)
        function wenti(i,length){
            axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}&qid=${that.list[i].questionid}`).then(function(res){
      console.log(res,"2",i)
       if(res.data.code == 100){
        if(res.data.data.result != undefined){
          that.list2.push(res.data.data.result)
          if(++i<length){
            wenti(i,length)
          }
        }else{
          if(++i<length){
            wenti(i,length)
          }
        }
    }}).catch(function(){
    });
        }
       }}).catch(function(){

    });
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
  var url = base_URL + "/pub/api/click/getmyquestion";
  var url2 = base_URL + "/pub/api/question/questioninfo";
     axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&pageNumber=${that.i}&pageSize=10`)
                  .then(function(res){
                  console.log(res,that.i)
                  if(res.data.code==100){
                    if(res.data.data.result.list.length == 0){
                      that.number = 3
                    }else{
                     //请求问题
                let i = 0;
                  wenti(i,that.list.length)
                  function wenti(i,length){
                      axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}&qid=${ res.data.data.result.list[i].questionid}`).then(function(res){
                console.log(res,"2",i)
                if(res.data.code == 100){
                  if(res.data.data.result != undefined){
                    that.list2.push(res.data.data.result)
                    if(++i<length){
                      wenti(i,length)
                    }
                  }
              }}).catch(function(){
              });
                      that.number = 1
                    }
                    }
                  }
          }).catch(function(err){

                  }) 
  },
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
         padding:.8rem .6rem;
         border-bottom:1px solid #CCCCCC;
         >div{
           overflow: hidden;
           position: relative;
           >p:nth-child(1){
             position: absolute;
             top:.2rem;
             font-size:.9rem;
            padding:.2rem .3rem;
            color:#fff;
            background:#22AC38;
           }
           >p:nth-child(2){
             font-size:1.3rem;
            color:#000;
             padding-left:3rem;
             line-height: 1.8rem;
             overflow:hidden;
              text-overflow:ellipsis;
              display:-webkit-box;
              -webkit-box-orient:vertical;
              -webkit-line-clamp:3;
           }
         }
         >p{
           margin-top:1.5rem;
           overflow: hidden;
           span{
             color:#666666;
           }
           >span:nth-child(1){
                float:left;
           }
           >span:nth-child(2){
                float:right;
           }
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