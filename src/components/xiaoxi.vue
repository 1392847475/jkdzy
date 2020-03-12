<template>
  <div id="xiaoxi">
   <div id="header">
     <p>消息</p>
      <!-- <span class="iconfont icon-shanchu" @click="confirm()"></span> -->
    </div>

    <div class="nav">
      <ul class="nav-list">
            <li v-for="(item,i) in items" @click="sk_list(i)" :key="i" >
              <span v-bind:class="{redd:i==current}">{{item.select}}</span>
              <i v-if = "iss != 0 && item.true ">{{iss}}</i>
            </li> 
      </ul>
    </div>
    <div id="section">
      <mt-tab-container v-model="active" :swipeable="true" >
        <mt-tab-container-item id="1">
          <div v-if = "list != ''">
          <ul class="section-list1" >
            <li  v-for="(item , i) in list" :key="i"  v-bind:class="'color1'==item.state">
              <p><span>{{item.userid}}</span><span>{{item.sendtime}}</span></p>
              <p v-html="item.sendcode">{{item.sendcode}}</p>
              <router-link :to="'/xxiangqing/'+item.dataid" tag ="p"  v-if = "item.datatype == 2||item.datatype ==1||item.datatype ==3" class="xq">点击查看详情</router-link>
              <p class="sc" ><span @click="sc(item.id)">删除</span></p>
            </li>
            <!-- <li>
              <p><span>刘河水医生采纳了您的回答</span><span>2018.11.28</span></p>
              <p>你好，按照你描述的情况正常针对癌症可以考虑采用...</p>
            </li>
            <li>
              <h1><span>刘河水医生关注了您</span><span>2018.11.28</span></h1>
            </li> -->
        </ul>
        <p v-if = "number == 1" class="jz" @click="jz()">点击加载更多</p>
        <p v-else-if = "number == 2" class="jz">加载中。。。</p>
        <p v-else-if = "number == 3" class="jz jzz">没有更多了</p>
       </div>
       <p v-else class="none">暂无消息</p>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="section-list2">
            
          <!-- <router-link to="/tzxiangqing" tag="li">
           <h3>系统通知</h3>
           <span>2018年8月19日  17：20</span>
           <p>
            你已经回答了５个问题，您再回答１个就可以升级哟。
            </p>
          </router-link> -->
          
        </ul>
        <p  class="none">暂无通知</p>
        </mt-tab-container-item>
     </mt-tab-container>
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
import axios from "axios";
import { TabContainer, TabContainerItem ,MessageBox} from 'mint-ui';
export default {
  name: 'Xiaoxi',
    data () {
    return {
     active:"1",
     current:0,
     items: [
　　　　　　　　　{select:'消息',true : true},
　　　　　　　　　{select:'通知'},
　　　　　　　　],
    activee:["1","2"],
      list : "",
      iss : 0,
      i : 1,
      number : 1,
    }
  },
  watch: {
    active: function (val, oldVal) {//监听tab对应的ID
        this.current=val-1
    }
},
computed:{
 
},
mounted(){
  var base_URL = process.env.API_URL //获取环境变量配置\
  var url = base_URL + "/pub/api/message/mymessage";
  let that = this
  //获取消息列表
   axios.post(url+'?wechatid='+sessionStorage.getItem('skopenid'))
                  .then(function(res){
                    console.log(res,"aa")
                  that.list = res.data.data.result.list
                  if(that.list.length < 10){
                    that.number = 3
                  }
                  
                  for(var a=0;a<that.list.length;a++){
                      if(that.list[a].state == 0){
                         that.iss = that.iss++
                      }
                  }
                  }).catch(function(err){

                  })             
},
 
  methods: {
 sk_tab(value){
console.log(value)
 },
  sk_list(i){
   this.current=i;
   this.active=this.activee[i]
  },
  confirm(){
    MessageBox({
  showCancelButton:true
})
MessageBox.confirm('当前消息记录将被清空，是否确认','清空消息列表',).then(action => {
 if(action == 'confirm'){
   this.$router.replace({
                        path: '/refresh',
                        query: {}
                      })
   console.log("确认");
 }
}).catch(err=>{
  if(err == 'cancel'){
    console.log("取消")
  }
});
  },
  jz(){
    var that = this;
    that.i++;
    that.number = 2;
    var base_URL = process.env.API_URL //获取环境变量配置\
  var url = base_URL + "/pub/api/message/mymessage";
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
                    
                  }
          }).catch(function(err){

                  }) 
  },
  sc(id){
      var base_URL = process.env.API_URL //获取环境变量配置\
  var url = base_URL + "/pub/api/message/delmeaasge";
      MessageBox({
      showCancelButton:true
    })
    MessageBox.confirm('当前消息记录将被删除，是否确认','删除消息',).then(action => {
    if(action == 'confirm'){
      //console.log("确认");
      let that = this
      // this.$router.replace({
      //                   path: '/refresh',
      //                   query: {
      //                     t: Date.now()
      //                   }
      //                 })
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&messageid=${id}`)
                  .then(function(res){
                 // console.log(res)
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

<style scoped lang="scss">
#xiaoxi{
  height:100%;
  display: flex;
  flex-direction:column;
  background:#F0F0F0;
}
#header{
    position: fixed;
    width:100%;
    top:0;
    height:1.8rem;
    border-bottom:1px solid #CCCCCC;
    padding:.6rem 0;
    display:flex;
    background:#fff;
    z-index:9;
    p{
      width:100%;
      line-height:1.8rem;
      text-align:center;
       font-weight:900;
       color:#333333;
    font-size:1.2rem;
}
  // span{
  //   line-height:1.8rem;
  // }
  //   span:nth-child(1){
  //     flex:1;
  //     text-align:center;
  //     font-weight:900;
  //     color:#333333;
  //     font-size:1.2rem;
  //     padding-left:2.5rem;
  //   }
  //   span:nth-child(2){
  //    font-size:1.5rem;
  //    padding-right:1rem;
  //   }
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
      i{
        position:absolute;
        padding:0 .35rem;
        background:#EE5649;
        color:#fff;
        border-radius:.6rem;
        font-size:.7rem;
        text-align: center;
        line-height:1.2rem;
        left:55%;
        top:.3rem;
      }
    }
    
  }
}
.redd{
  color:#22AC38!important;
  border-bottom:.2rem solid #22AC38;
  }
  #section{
   padding:6rem 0 3rem 0;
  
  }
  .section-list1{
    background:#fff;
   li{
      padding:1rem;
      border-top:1px solid #CCCCCC;
      p:nth-child(1){
        font-size:.9rem;
        color:#999999;
        overflow: hidden;
        line-height:1.2rem;
        margin-bottom:1rem;
        span:nth-child(1){
          float: left;
        }
        span:nth-child(2){
          float: right;
        }
      }
      p:nth-child(2){
        
        // overflow:hidden;
        // white-space:nowrap;
        // text-overflow:ellipsis;
        line-height: 1.2rem;
      }
      .xq{
        font-size:.75rem;
        color:#9EDDFC;
      }
      .sc{
        text-align:right;
        color:#9EDDFC;
        font-size:.8rem;
      }
      h1{
        overflow: hidden;
      span:nth-child(1){
        color:#333333;
        font-size:1rem;
        float: left;
      }
      span:nth-child(2){
        font-size:.9rem;
          float: right;
          color:#999999;
        }
    }
    }
    .color1{
        background:#D5EDD9;
    }
    li:nth-child(1){
      border:none;
      
    }
  }
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
  .section-list2{
    padding:.5rem .8rem;
    li{
      background:#fff;
      border-radius:.5rem;
      padding:.8rem .6rem;
    h3{
      font-size:1.2rem;
      color:#222222;
      margin-bottom:1rem;
      
    }
    >span{
      color:#818181;
      font-size:.85rem;
      line-height:1.3rem;
    }
    >p{
      color:#818181;
      font-size:.9rem;
      line-height:1.3rem;
    }
    }
  }
  .none{
    text-align: center;
        color:#999999;
        line-height: 3rem;
  }
</style>