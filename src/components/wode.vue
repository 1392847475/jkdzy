<template>
  <div class="wode">
    <div id="header">
      <p>我</p>
    </div>
    <div id="zhuye">
      <router-link to="/wszl" tag="div">
        <div>
          <img  v-bind:src="list.headportrait" alt="">
        </div>
        <div>
          <p><span>{{list.nickname}}</span><!-- <span>Lv.5</span>--></p> 
          <p>查看或编辑个人主页</p>
          <span class="zjia" v-if = "list.certlevel == 1">专家</span>
          <span class="fzjia" v-else >lv.{{list.badgedata}}</span>
          <span v-if = "list.certlevel == 1"><span v-for="(item,i) in list.pjstar" :key="i" ><i class="iconfont iconShoucang"></i></span></span>
        </div>
      </router-link>
      
      <div>
        <ul>
          <li>
            <p v-if="list.banstate == undefined">0</p>
            <p v-else>{{list.banstate}}</p>
            <p>赞</p>
          </li>
          <li>
            <p v-if="list.mininginnum == undefined">0</p>
            <p v-else>{{list.mininginnum}}</p>
            <p>采纳</p>
          </li>
          <li>
            <p v-if="list.digestnum == undefined">0</p>
            <p v-else>{{list.digestnum}}</p>
            <p>加精</p>
          </li>
          <router-link tag="li" to = '/jfxq'>
            <p v-if="list.score == undefined">0</p>
            <p v-else>{{list.score}}</p>
            <p>积分</p>
          </router-link>
        </ul>
      </div>
    </div>
    <div id="list">
      <ul>
         <router-link v-if="list.sendmesstime == 'yes'" :to="'/shenhe/'+list.id" tag="li" class="tjbq">
            <p>移动办公</p>
            <p class="iconfont icon-jinru"></p>
            <p class="border"></p> 
          </router-link> 
        <router-link :to="'/tiwen/2'" tag="li" class="tjbq">
            <p>特邀问答</p>
            <p class="iconfont icon-jinru"></p>
          </router-link>
          <router-link :to="'/dwhd'" tag="li" class="tjbq">
            <p>待我回答<span v-if = "dhdnum != ''">({{dhdnum}})</span></p>
            <p class="iconfont icon-jinru"></p>
            <p class="border"></p>
          </router-link>
          <router-link to="/wdtw" tag="li" class="tjbq">
            <p>我的提问<span v-if = "twnum != ''">({{twnum}})</span></p>
            <p class="iconfont icon-jinru"></p>
          </router-link>
        <router-link to="/wdhd" tag="li" class="tjbq">
            <p>我的回答<span v-if = "hdnum != ''">({{hdnum}})</span></p>
            <p class="iconfont icon-jinru"></p>
            <p class="border"></p>
          </router-link>
        <router-link to="/wdgz" tag="li" class="tjbq">
            <p>我的关注</p>
            <p class="iconfont icon-jinru"></p>
          </router-link>
        <router-link to="/wdsc" tag="li" class="tjbq">
            <p>我的收藏</p>
            <p class="iconfont icon-jinru"></p>
            <!-- <p class="border"></p> -->
          </router-link>
        <!-- <router-link to="/yhfk" tag="li" class="tjbq">
            <p>用户反馈</p>
            <p class="iconfont icon-jinru"></p>
            <p class="border"></p> 
          </router-link> -->
          
       <!-- <router-link to="/wdcg" tag="li" class="tjbq">
            <p>我的草稿</p>
            <p class="iconfont icon-jinru"></p>
          </router-link> -->
      </ul>
    </div>
    <div id="footer">
      <ul>
        <li>
          <router-link to="/index" tag='div'>
          <p class="iconfont icon-wenben"></p>
          <p>首页</p>
          </router-link>
        </li>
        <li>
          <router-link to="/xiaoxi">
            <p class="iconfont icon-xiaoxi"></p>
            <p>消息</p>
          </router-link>
        </li>
        <li>
          <router-link to="/wode">
            <p class="iconfont icon-tianchongxing-"></p>
            <p>我的</p>
          </router-link>
        </li>
      </ul>

    </div>
   
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'Wode',
  data () {
    return {
     list:{},
     twnum:"",
     hdnum:"",
     dhdnum:"",
    }
  },
  mounted(){
    var base_URL = process.env.API_URL //获取环境变量配置
    var url = base_URL + "/pub/api/info/userinfo";
    var url2 = base_URL + "/pub/api/question/myquestion";
    var url3 = base_URL + "/pub/api/answer/myreplyinfo";
    var url4 = base_URL + "/pub/api/guest/zjquestions";
    var that = this
    //我的资料
    axios(url+'?wechatid='+sessionStorage.getItem('skopenid')).then(function(data){
       console.log(data)
      if(data.data.code == 100){
        that.list = data.data.data.result
        if(that.list.headportrait.length > 50){

        }else{
          that.list.headportrait = base_URL +that.list.headportrait
        }
        
        // console.log(that.list)
      }else if(data.data.code == 400){
        // console.log(data.data.data.result)
      }
    }).catch(function(){

    });

    //提问数量
    axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
       console.log(res,"2")
      if(res.data.code == 100){
        if(res.data.data.result.list.length != 0){
          that.twnum = res.data.data.result.totalRow
        }
        
      }
    }).catch(function(){

    })

    //回答数量
      axios.post(url3,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
       console.log(res,"3")
      if(res.data.code == 100){
        if(res.data.data.result.list.length != 0){
          that.hdnum = res.data.data.result.totalRow
        }
      }
      }).catch(function(){
      

    })

    //待回答
      axios.post(url4,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
       console.log(res,"33")
      if(res.data.code == 100){
        if(res.data.data.result.list.length != 0){
          that.dhdnum = res.data.data.result.totalRow
        }
      }
      }).catch(function(){
    })
  },
  modules(){

  },
  
}
</script>

<style scoped lang="scss">
.wode{
  height:100%;
  background:#F0F0F0;
}
#header{
  background:#fff;
  border-bottom:1px solid #CCCCCC;
  p{
    font-size:1.2rem;
    font-weight:900;
    line-height:2.8rem;
    text-align: center;
  }
}
#zhuye{
  width:90%;
  margin:1rem 5%;
  border-radius:1rem;
  padding:.7rem 0;
  background:#fff;
  -webkit-box-shadow: 0px 3px 2px 0px #EAEAEA !important;
	-moz-box-shadow: 0px 3px 2px 0px #EAEAEA !important;
	-o-box-shadow: 0px 3px 2px 0px #EAEAEA !important;
	box-shadow: 0px 3px 2px 0px #EAEAEA !important;
  >div:nth-child(1){
    overflow: hidden;
  >div:nth-child(1){
    width:4rem;
    height:4rem;
    border-radius:50%;
    overflow: hidden;
    float:left;
    margin:0 .5rem;
    >img{
      width:100%;
      height:100%;
    }
  }
  >div:nth-child(2){
    float:left;
    >p:nth-child(1){
      padding:.6rem 0;
      span:nth-child(1){
        font-weight:600;
        font-size:1.1rem;
        color:#333333;
      }
      span:nth-child(2){
        display: inline-block;
        border:1px solid #666666;
        font-size:.75rem;
        color:#666666;
        padding:.1rem .3rem;
        margin-left:.6rem;
        border-radius:.5rem;
      }
    }
    >p:nth-child(2){
      color:#333333;
      font-size:.8rem;
      margin-bottom:.3rem;
    }
     >.zjia{
            font-weight:0;
            display: inline-block;
            padding:.1rem .3rem;
            border:1px solid #999999;
            color:#999;
            font-size:.6rem;
            border-radius:.5rem;
          }
          >.fzjia{
             font-weight:0;
            display: inline-block;
            padding:.1rem .3rem;
            font-size:.6rem;
            border-radius:.5rem;
            color:#E8AB53;
            border:1px solid #E8AB53;
          }
  }
  }
  >div:nth-child(2){
    ul{
      overflow: hidden;
      li{
        width:25%;
        float: left;
        >p:nth-child(1){
          font-size:1.4rem;
          text-align: center;
          color:#000000;
          line-height:2rem;
          padding-top:.5rem;
        }
        >p:nth-child(2){
          font-size:.8rem;
          color:#A9A9A9;
          text-align:center;
           line-height:1.5rem;
           padding-bottom:.5rem;
        }
      }
    }
  }
}
#list{
  ul{
    background:#fff;
    margin-bottom:3.3rem;
    .tjbq{
        padding:1rem;
       overflow:hidden;
       position:relative;
        p:nth-child(1){
          float:left;
          color:#000000;
          font-size:1rem;
          padding-left:.5rem;
        }
        p:nth-child(2){
          float:right;
          font-size:.8rem;
        }
        .border{
          position: absolute;
          width:92%;
          border-top:1px solid #CCCCCC;
          bottom:0;
        }
      }
   }
}
 

</style>