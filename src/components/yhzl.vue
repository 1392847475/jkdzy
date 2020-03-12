<template>
  <div class="yhzl">
    <div id="header">
      <span  class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>{{list.nickname}}</span>
    </div>
    <div id="header2">
      <div>
        <span @click="sixin()">私信他</span>
        <img v-bind:src="list.headportrait" alt="">
        <span v-if="guanzhux == true" @click="guanzhu()">已关注</span>
        <span v-else @click="guanzhu()">加关注</span>
      </div>
      <p class="header2p" v-if="list.unit != undefined">{{list.unit}} <span>|</span> {{list.department}}</p>
      <p>{{list.signature}}</p>
      <!-- <p>糟糕，他还没完事个人信息呀~</p> -->
    </div>
   <div id="header3">
     <ul>
       <li>
         <p v-if="list.banstate == undefined">0</p>
         <p v-else>{{list.banstate}}</p>
         <p>赞</p>
       </li>
       <router-link tag="li" :to="'/tdgz/'+userid">
         <p>{{bguanzhulen}}</p>
         <p>关注他的</p>
       </router-link>
       <router-link tag="li" :to="'/tdgz/'+userid">
         <p>{{guanzhulen}}</p>
         <p>他关注的</p>
       </router-link>
     </ul>
   </div>
  <div class="nav">
      <ul class="nav-list">
            <li v-for="(item,i) in items" @click="sk_list(i)" :key="i" >
              <i ></i>
              <span v-bind:class="{redd:i==current}" v-if="i==0">{{hdnum}}{{item.select}}</span>
              <span v-bind:class="{redd:i==current}" v-if="i==1">{{twnum}}{{item.select}}</span>
            </li> 
      </ul>
    </div>
    <div id="section">
      <mt-tab-container v-model="active" :swipeable="true">
        <mt-tab-container-item id="1">
        <ul class="section-list1">
          <router-link tag="li" v-for = "(item,i) in list2" :key="i" :to="'/xxiangqing/'+item.question.id">
            <h3>{{item.question.title}}</h3>
            <p>{{item.content}}</p>
            <span>{{item.createtime}}</span>
          </router-link>
        </ul>
          <p v-if = "number == 1" class="jz" @click="jz(1)">点击加载更多</p>
          <p v-else-if = "number == 2" class="jz">加载中。。。</p>
          <p v-else-if = "number == 3" class="jz jzz">没有更多了</p>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="section-list1">
          <router-link tag="li" v-for = "(item,i) in list5" :key="i" :to="'/xxiangqing/'+item.id">
            <h3>{{item.title}}</h3>
            <p>{{item.content}}</p>
            <span>{{item.createtime}}</span>
          </router-link>
        </ul>
        <p v-if = "nnumber == 1" class="jz" @click="jz(2)">点击加载更多</p>
              <p v-else-if = "nnumber == 2" class="jz">加载中。。。</p>
              <p v-else-if = "nnumber == 3" class="jz jzz">没有更多了</p>
        </mt-tab-container-item>
    </mt-tab-container>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  import { TabContainer, TabContainerItem,Toast  ,MessageBox} from 'mint-ui';
export default {
  name: 'Yhzl',
 data () {
    return {
     active:"1",
     current:0,
     items: [
　　　　　　　　　{select:'回答'},
　　　　　　　　　{select:'提问'},
　　　　　　　　],
    activee:["1","2"],
    userid : "",
    list : {},
    list2 : "",
    list5 : [],
    guanzhux : false,
    guanzhulen : 0,
    bguanzhulen : 0,
    twnum : "",
    hdnum : "",
    i : 1,
    number : 1,
    ii : 1,
    nnumber : 1,
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
     var url = base_URL + "/pub/api/info/userfous";//获取用户的关注
     var url2 = base_URL + "/pub/api/info/foususer";//获取关注用户的
     var url3 = base_URL + "/pub/api/info/useridinfo";//获取资料
     var url4 = base_URL + "/pub/api/info/yesfocus";//查看用户是否关注
     var url5 = base_URL + "/pub/api/answer/myreplyinfo"; //获取用户openid 请求回答
    var url6 = base_URL + "/pub/api/question/myquestion";//获取提问
    that.userid = this.$route.params.id
    //获取用户的关注
    console.log("ccc")
    axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&userid=${that.userid}`).then(function(res){
      console.log(res,"查看用户的关注")
      if(res.data.code == 100){
        that.guanzhulen = res.data.data.result.length
         }
    }).catch(function(){

    });
    //获取关注用户的
    axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}&userid=${that.userid}`).then(function(res){
      console.log(res,"查看关注用户的")
      if(res.data.code == 100){
        that.bguanzhulen = res.data.data.result.length
         }
    }).catch(function(){

    });
    //获取资料
  axios.post(url3,`wechatid=${sessionStorage.getItem('skopenid')}&userid=${that.userid}`).then(function(res){
      console.log(res,"资料")
      if(res.data.code == 100){
        that.list = res.data.data.result 
        if(that.list.headportrait.length > 50){
        }else{
          that.list.headportrait =base_URL + that.list.headportrait
        }
        
        //查看用户是否关注
    axios.post(url4,`wechatid=${sessionStorage.getItem('skopenid')}&fuserid=${that.list.id}`).then(function(res){
      console.log(res,"查看用户是否关注")
      if(res.data.code == 100){
          that.guanzhux = true
         }
    }).catch(function(){

    })
    //获取他人的要带state=1
    if(that.list.wechatid == sessionStorage.getItem('skopenid')){
      var state = ''
    }else{
      var state = '&state=1'
    }
   //获取用户openid 请求回答
    axios.post(url5,`wechatid=${that.list.wechatid}${state}`).then(function(res){
      console.log(res,"回复")
      if(res.data.code == 100){
        that.list2 = res.data.data.result.list
        that.hdnum = res.data.data.result.totalRow
        if(that.list2.length < 10){
          that.number = 3
        }
    }
        }).catch(function(){
        });

    //获取提问
      axios.post(url6,`wechatid=${that.list.wechatid}${state}`).then(function(res){
            console.log(res,"1")
            if(res.data.code == 100){
            that.list5 = res.data.data.result.list
            that.twnum = res.data.data.result.totalRow
            if(that.list5.length < 10){
            that.nnumber = 3
        }
            }
          }).catch(function(){
          })


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
      sixin(){
        console.log("sixin")
        let instance = Toast("板块暂未开放，敬请期待");
              setTimeout(() => {
                instance.close();
              }, 1000);
      },
      //加载更多
      jz(id){
    var that = this;
    var base_URL = process.env.API_URL //获取环境变量配置\
    var url1 = base_URL + "/pub/api/answer/myreplyinfo"; //获取用户openid 请求回答
    var url2 = base_URL + "/pub/api/question/myquestion";//获取提问
    if(that.list.wechatid == sessionStorage.getItem('skopenid')){
      var state = ''
    }else{
      var state = '&state=1'
    }
  if(id == 1){
    that.i++;
    that.number = 2;
     axios.post(url1,`wechatid=${that.list.wechatid}${state}&pageNumber=${that.i}&pageSize=10`)
                  .then(function(res){
                  console.log(res,that.i)
                  if(res.data.code==100){
                    if(res.data.data.result.list.length == 0){
                      that.number = 3
                    }else{
                      for(var i = 0;i<res.data.data.result.list.length;i++){
                        that.list2.push(res.data.data.result.list[i])
                      }
                      
                      that.number = 1
                    }
                    console.log(that.list2)
                  }
          }).catch(function(err){
                  }) 
  }else if(id == 2){
    that.ii++;
    that.nnumber = 2;
     axios.post(url2,`wechatid=${that.list.wechatid}${state}&pageNumber=${that.ii}&pageSize=10`)
                  .then(function(res){
                  console.log(res,that.ii)
                  if(res.data.code==100){
                    if(res.data.data.result.list.length == 0){
                      that.nnumber = 3
                    }else{
                      for(var i = 0;i<res.data.data.result.list.length;i++){
                        that.list5.push(res.data.data.result.list[i])
                      }
                      that.nnumber = 1
                    }
                    console.log(that.list5)
                  }
          }).catch(function(err){
                  }) 
  }
  },
      //关注
      guanzhu(){
        var base_URL = process.env.API_URL //获取环境变量配置
         var url = base_URL + "/pub/api/info/focususer";
         var url2 = base_URL + "/pub/api/info/cancelfocus";
        let that = this
    if(that.list.wechatid != sessionStorage.getItem('skopenid')){
        if(that.guanzhux == false){
            axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&fuserid=${that.list.id}`).then(function(res){
            console.log(res,"33")
            if(res.data.code == 100){
              that.guanzhux = true
              let instance = Toast("已关注");
              setTimeout(() => {
                instance.close();
              }, 1000);
            //that.list5 = res.data.data.result.list
            }
          }).catch(function(){

          })
        }else{
          axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}&fuserid=${that.list.id}`).then(function(res){
            console.log(res,"22")
            if(res.data.code == 100){
              that.guanzhux = false
              let instance = Toast("取消关注");
              setTimeout(() => {
                instance.close();
              }, 1000);
            //that.list5 = res.data.data.result.list
            }
          }).catch(function(){

          })
        }
 }

      }
    }
}
</script>

<style scoped lang="scss">
.yhzl{
  height:100%;
  background:#F2F2F2;
}
#header{
    width:100%;
    height:1.8rem;
    border-bottom:1px solid #CCCCCC;
    padding:.6rem 0;
    display:flex;
    background:#fff;
    position: fixed;
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
      font-weight:900;
      color:#333333;
      font-size:1.2rem;
       padding-right:1.5rem;
    }
   }
   
   #header2{
     background:#fff;
     margin-top:3rem;
     padding:.8rem 0;
     border-bottom:1px solid #ccc;
     >div{
       font-weight:900;
       font-size:1.1rem;
       text-align: center;
       img{
         width:5rem;
         height:5rem;
         padding:0 2rem;
         border-radius:50%;
       }
       
     }
     p{
       color:#666666;
       text-align: center;
       font-size:1rem;
     }
     .header2p{
         font-size:1.1rem;
         color:#000000;
         padding:1rem 0;
         span{
           padding:0 .5rem;
         }
       }
   }
   #header3{
     background:#fff;
     ul{
       overflow: hidden;
       padding:.8rem 0;
       
       li{
         width: 33.33%;
         float:left;
         text-align: center;
         font-size:1rem;
         line-height: 1.5rem;
         >p:nth-child(1){
           color:#000000;
          }
          >p:nth-child(2){
            font-size:.9rem;
           color:#666666;
          }
       }
     }
   }
    .nav{
      margin-top:.6rem;
      background:#fff;
      .nav-list{
          background:#fff;
      } 
  ul{
    overflow: hidden;
    height:4rem;
    border-bottom:1px solid #CCCCCC;
    box-sizing:border-box;
    li{
      position: relative;
      width:50%;
      float: left;
      font-size:.9rem;
      text-align:center;  
      color:#666666;
      span{
        display: inline-block;
        height:3.8rem;
        line-height:3.8rem;
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
   
  }
  .section-list1{
    background:#fff;
    li{
      padding:.8rem;
      border-bottom:1px solid #CCCCCC;
      overflow: hidden;
      h3{
        font-size:1.1rem;
        font-weight:900;
        color:#000;
        line-height:1.3rem;
      }
     p{
       color:#666666;
       font-size:1.1rem;
       margin:.7rem 0;
       line-height:1.4rem;
       text-overflow:ellipsis;
        display:-webkit-box;
        /*! autoprefixer:off */
        -webkit-box-orient:vertical;
        /* autoprefixer:on */
        -webkit-line-clamp:2;
        overflow:hidden;
        white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
     }
     span{
       font-size:.9rem;
       color:#111111;
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
  .jz{
    text-align: center;
    font-size:.88rem;
    line-height: 3rem;
    width:100%;
    height:3rem;
    color:#22AC38;
    background:#F2F2F2;
  }
  .jzz{
    color:#999999;
  }
</style>