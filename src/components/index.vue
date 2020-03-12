<template>
  <div id="box">
    <div id="header">
      <div class="sk-header1">
        <i class="iconfont icon-fangdajing"></i>
        <form action="javascript:return true;">
          <input @keyup.13="show()" type="search" placeholder="搜索您想问的内容" ref="input1" v-model="inpt"/>
        </form>
        
      </div>
      <div class="sk-header2">
         <a  v-if = "banstate == 1" @click="banstat()"> <!-- 不可提问回答 -->
          <i class="iconfont icon-tiwen"></i>
          <span>提问</span>
        </a>
        <router-link :to="'/tiwen/1'" v-else >
          <i class="iconfont icon-tiwen"></i>
          <span>提问</span>
        </router-link>
        
      </div>
    </div>
    <div class="nav">
     <ul class="nav-list">
          <li  v-for="(item,index) in navList" :key='index' :class="{'redd':nowIndex==index}" @click="tabClick(index)"><i>{{item.name}}</i>
        </li>
     </ul>
    
    </div>
    <div id="section">
      <div class="swiper-container swiper_con">
        <div class="swiper-wrapper" >
           <!-- 问答 -->
        <div class="swiper-slide" ref="viewBox1">
           <div v-if="list != ''"> 
          <ul class="section-list1">
          <li v-for="(item , i) in list" :key = "i" v-bind:id = item.id>
            <router-link :to="'/xxiangqing/'+item.id" >
              <h4>{{item.title}}</h4>
              <div v-if="item.questionpic != undefined" class="listcen">
                <p v-html="item.content">{{item.content}}</p>
                <p><img v-lazy="base_URL+item.questionpic.url" alt=""></p>
              </div>
              <p v-else  v-html="item.content">{{item.content}}
              </p>
              <div class="listbot">
                <p>
                  <span class="iconfont icon-icontag"></span>
                  <span>{{item.label}}</span>
                </p>
                <p>
                  <span>{{item.createtime.slice(0,10)}}</span>
                </p>
              </div>
            </router-link>
          </li>
    </ul>
        <p v-if = "number == 1" class="jz" @click="jz(1)">点击加载更多</p>
        <p v-else-if = "number == 2" class="jz">加载中。。。</p>
        <p v-else-if = "number == 3" class="jz jzz">没有更多了</p>
      </div>
      </div>
      <!-- <p v-else class="none">暂无内容</p>
        </div>  -->
      <!-- 关注 -->
        <div class="swiper-slide" ref="viewBox2">
          <ul class="section-list1">
           <li v-for="(item , i) in list3" :key = "i" v-bind:id = item.id>
            <router-link :to="'/xxiangqing/'+item.id" >
              <h4>{{item.title}}</h4>
              <p v-html="item.content">{{item.content}}</p>
              <div class="listbot">
                <p>
                  <span class="iconfont icon-icontag"></span>
                  <span>{{item.plate}}</span>
                  <!-- <span>医疗</span> -->
                </p>
                <p>
                  <span>{{item.createtime.slice(0,10)}}</span>
                </p>
              </div>
            </router-link>
          </li>

        </ul>
        </div>
                  <!-- 推荐 -->
        <div class="swiper-slide" ref="viewBox3">
        <ul class="section-list1"  >
          <li v-for="(item , i) in list2" :key = "i" v-bind:id = item.id>
            <router-link :to="'/xxiangqing/'+item.id" >
              <h4>{{item.title}}</h4>
              <p v-html="item.content">{{item.content}}</p>

              <div class="listbot">
                <p>
                  <span class="iconfont icon-icontag"></span>
                  <span>{{item.label}}</span>
                  <!-- <span>医疗</span> -->
                </p>
                <p>
                  <span>{{item.createtime.slice(0,10)}}</span>
                  
                </p>
              </div>
            </router-link>
          </li>
    </ul>

        </div>
       
        <!-- //专题 -->
        <div class="swiper-slide" ref="viewBox4">
          <div class="section4">
            <!-- <img src="../assets/img/linshibanner.png" alt=""> -->
            <div v-if="list4 != ''">
            <ul class="section-list3">
              <li v-for="(item,i) in list4" :key="i">
                <router-link :to="'/xiangqing/'+item.id">
                  <p>{{item.title}}</p>
                  <p><span>{{item.creattime.slice(0,10)}}</span>|<span v-html="item.name">{{item.name}}</span></p>
                </router-link>
              </li>
            </ul>
             <p v-if = "nnumber == 1" class="jz" @click="jz(2)">点击加载更多</p>
              <p v-else-if = "nnumber == 2" class="jz">加载中。。。</p>
              <p v-else-if = "nnumber == 3" class="jz jzz">没有更多了</p>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div id="footer" v-show="hidshow">
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

import Vue from 'vue';
import axios from "axios"
import Swiper from "swiper"
import 'swiper/dist/css/swiper.min.css';
import { InfiniteScroll ,Spinner,Lazyload ,Toast } from 'mint-ui';
Vue.use(InfiniteScroll);
Vue.use(Lazyload);
Vue.component(Spinner.name, Spinner);
//axios.defaults.baseURL='http://localhost:8080'

export default {
  name: 'Index',
  data () {
    return {
     active:"1",
     list:[],
     list2: [],
     list3 : [],
     list4 : [],
     list5: [],
     navList: [
　　　　　　　　　{name:'问答'},
　　　　　　　　　{name:'关注'},
　　　　　　　　　{name:'推荐'},
　　　　　　　　　{name:'专题'}
　　　　　　　　],
      nowIndex:0,
      //键盘弹出 隐藏footer;
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hidshow:true,  //显示或者隐藏footer
      banstate:"",
      queryLoading: false,
      moreLoading: false,
      allLoaded: false,
      totalNum: 0,
      pageSize: 20,
      pageNum: 1,
      code : "",
      token : "",
      inpt : "",
      skopenid : "",
      i : 1,
      swp : 0,
      number : 1,
      ii : 1,
      nnumber : 1,
     base_URL : process.env.API_URL,
      swiperOption: {
        // 获取当前版块的index
        on: {
        slideChangeTransitionEnd: () => {
         let swiper = this.$refs.mySwiper.swiper
          this.nowIndex = swiper.realIndex
        },
        reachEnd: () => {
          this.realIndex = 999
        }
        },
       },
    activee:["1","2","3","4"]
    }
  },
  watch: {
    showHeight:function() {
        if(this.docmHeight > this.showHeight){
          console.log(this.docmHeight,this.showHeight)
            this.hidshow=false
        }else{
            this.hidshow=true
        }
    }
    // active: function (val, oldVal) {//监听tab对应的ID
    //     this.current=val-1
    // }
},
mounted(){
// window.onresize监听页面高度的变化
    window.onresize = ()=>{
        return(()=>{
            this.showHeight = document.body.clientHeight;
        })()
    }
var that=this
   that.swp = sessionStorage.getItem('skindex')
  that.nowIndex = that.swp
var base_URL = process.env.API_URL //获取环境变量配置
      that.mySwiper = new Swiper('.swiper-container',{
          initialSlide:that.swp,
          autoplay:false,
          keyboardControl:true,
          autoHeight:true,
          observer:true,
          observeParents:true,
          on: {
        slideChangeTransitionEnd: function(){
          if( that.mySwiper != undefined){
              that.nowIndex=that.mySwiper.activeIndex
          }
         // sessionStorage.setItem('skindex',String(that.nowIndex))
        },
          }
       });
        // if(!sessionStorage.getItem('skopenid')||sessionStorage.getItem('skopenid')=="undefined"){ // 如果缓存sessionStorage中没有微信openId，则需用code去后台获取
      //  getCode();
      // function  getCode () { // 非静默授权，第一次有弹框
      //   var base_URL = process.env.API_URL //获取环境变量配置
      //    var local = window.location.href // 获取页面url
      //           //var appid = 'wx18c6d2cc389d83d7' //正式
      //          var appid = 'wx20f7249b76794ceb' //测试
      //          console.log(local,getUrlCode().token,getUrlCode().code)
      //           that.code = getUrlCode().code // 截取code
      //           if (that.code == null || that.code === '') { // 如果没有code，则去请求
      //               window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      //           } else {
                //      var url = base_URL + "/pub/wechat/wechatid";
                //  axios.post(url,`code=${that.code}`)
                //   .then(function(response){
                 //   console.log(response)
                 //  if(response.data.code == 100){
                
               // 开发环境 openid写死
              //  
               //
              
                // sessionStorage.setItem('skopenid',String('oV2MX5pKlLBUsBZwliaOyxNHFy2A'))
                // sessionStorage.setItem('skbanstate',String('0'))

               that.skopenid = sessionStorage.getItem('skopenid')
                that.banstate = sessionStorage.getItem('skbanstate')
                    // if(response.data.data.result.banstate == 2){
                       if(that.banstate == 2){
                         let instance3 = Toast('你已经被限制登录');
                            setTimeout(() => {
                              instance3.close();
                            }, 3000);
                     }else{
                     //  that.banstate = response.data.data.result.banstate
                    // that.skopenid = response.data.data.result.openid
                      // sessionStorage.setItem('skopenid',String(that.skopenid))
                      // sessionStorage.setItem('skbanstate',String(that.banstate))
                      //问答
                    var url = base_URL + "/pub/api/question/queslist";
//以上内容需要对axios二次封装下，注册到vue全局 每个接口就都会在打包时自动配置，不封就每次 按照上边的方式写url
         axios.post(url,`wechatid=${that.skopenid}`)
        .then(function(res){
          console.log(res)
          if(res.data.code == 100){
           that.list = res.data.data.result.list
           if(that.list.length < 10){
             that.number = 3
           }
          }
        }).catch(function(){
        })
      //推荐
       var url2 = base_URL + "/pub/api/info/labelpush";
        axios.post(url2,`wechatid=${that.skopenid}`)
        .then(function(res){
          console.log(res,"1")
         if(res.data.code == 100){
            that.list2 = res.data.data.result
           //that.list = res.data.data.result.list
          }
        }).catch(function(){
        })
        //关注
          var url3 = base_URL + "/pub/api/info/platepush";
        axios.post(url3,`wechatid=${that.skopenid}`)
        .then(function(res){
          console.log(res,"2")
          if(res.data.code == 100){
           that.list3 = res.data.data.result
          }
        }).catch(function(){
        })
        //专题
          var url4 = base_URL + "/pub/api/info/subjectpush";
        axios.post(url4,`wechatid=${that.skopenid}`)
        .then(function(res){
          console.log(res,"3")
         if(res.data.code == 100){
           that.list4 = res.data.data.result.list
            if(that.list4.length < 10){
             that.nnumber = 3
           }
          }
        }).catch(function(){
        })
                   }


                  // }else{
                  //     console.log("code值不正确，或已使用!")
                  //   }        
// })
//                   .catch(function(error){
//                   })
            //   }
            // }
            // 截取url中的code方法
//         function  getUrlCode() { 
//                 var url = location.search
//                var theRequest = new Object()
//                 if (url.indexOf("?") != -1) {
//                     var str = url.substr(1)
//                     var strs = str.split("&")
//                     for(var i = 0; i < strs.length; i ++) {
//                         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
//                     }
//                 }
//                 return theRequest
// }
//         } else {
//           console.log("有openid")
//           }
},
computed:{
},
  methods: {
    show(){
      this.$refs.input1.blur();
      console.log(this.inpt)
      if(this.inpt != ''){
        this.$router.push({path:'/ss/'+this.inpt})
         }else{
                let instance3 = Toast('请输入关键字');
                      setTimeout(() => {
                        instance3.close();
                      }, 800);
                    }
    },
  tabClick(index){
    
        this.nowIndex = index
        this.mySwiper.slideTo(index,0,false)
        sessionStorage.setItem('skindex',String(index))
      },
      banstat(){
        let instance3 = Toast('你已经被限制提问');
                            setTimeout(() => {
                              instance3.close();
                            }, 2000);
      },
       //加载更多
       jz(id){
    var that = this;
  if(id == 1){
    that.i++;
    that.number = 2;
    var base_URL = process.env.API_URL //获取环境变量配置\
  var url = base_URL + "/pub/api/question/queslist";
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
  }else if(id == 2){
    that.ii++;
    that.nnumber = 2;
    var base_URL = process.env.API_URL //获取环境变量配置\
  var url = base_URL + "/pub/api/info/subjectpush";
     axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&pageNumber=${that.ii}&pageSize=10`)
                  .then(function(res){
                  console.log(res,that.i)
                  if(res.data.code==100){
                    if(res.data.data.result.list.length == 0){
                      that.nnumber = 3
                    }else{
                      for(var i = 0;i<res.data.data.result.list.length;i++){
                        that.list4.push(res.data.data.result.list[i])
                      }
                      
                      that.nnumber = 1
                    }
                    console.log(that.list4)
                  }
          }).catch(function(err){
                  }) 
  }
  },
// loadMore(){
//  let that = this
//  if(this.allLoaded){
//           this.moreLoading = true;
//           return;
//         }
// if(this.queryLoading){
//           return;
//         }
// this.moreLoading = !this.queryLoading;
//         this.pageNum++;
//  console.log("bbb")
//   setTimeout(() => {
//     //问答
//          axios.post("api/pub/api/question/queslist",`wechatid=${sessionStorage.getItem('skopenid')}&padeNumber=${that.pageNum}&pageSize=20`)
//         .then(function(res){
//           console.log(res)
//           if(res.data.code == 100){
//            that.list.push(res.data.data.result.list) 
//           }
//           this.moreLoading = this.allLoaded;
//         }).catch(function(){

//         })
//     let last = this.list[this.list.length - 1];
//     for (let i = 1; i <= 10; i++) {
//       this.list.push(last + i);
//     }
//     this.loading = false;
//   }, 500);
// },



}
}
</script>
<style scoped lang="scss">

#header{
  width:100%;
  overflow: hidden;
  padding:.3rem 0;
   position:fixed;
   top:0;
   background:#fff;
    z-index:9;
  .sk-header1{
    float: left;
    height:2rem;
    margin:0 3%;
    background:#DDDDDD;
    border-radius: .3rem;
    width:70%;
    i{
     line-height:2rem;
     padding-left:15%;
     font-size:1rem;
    }
    form{
      display: inline-block;
       width:75%;
       height:1.4rem;
      input{
      width:100%;
      height:100%;
      background:#DDDDDD;
      margin-bottom:.3rem;
      font-size:.9rem;
    }
    }
    
  }
  .sk-header2{
    a{
    float: left;
    width:20%;
    line-height:2rem;
    font-size:1rem;
    color:#22AC38;
    i{
      font-size:1rem;
    }
  }
  }
}
.nav{
  width:100%;
  position:fixed;
  top:2.6rem;
  z-index:9;
  background:#fff;
  ul{
    overflow: hidden;
    height:2.6rem;
    border-top:1px solid #CCCCCC;
    border-bottom:1px solid #CCCCCC;
    box-sizing:border-box;
    li{
      width:25%;
      float: left;
      font-size:1rem;
      line-height: 2.4rem;
      text-align:center;  
      color:#666666;
    }
  }
}
.redd{
  color:#000000!important;
 
  border-bottom:.2rem solid #333333;
  }
  #section{
    padding-top:5.2rem;
    padding-bottom:3rem;
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
  .section-list1{
    z-index: 9999;
    li{
      padding:.6rem;
      border-bottom:1px solid #CCCCCC;
      background:#fff;
      >a{
        h4{
          font-size:1rem;
          font-weight:900;
          color:#333333;
          padding-bottom:.5rem;
          line-height: 1.3rem;
          }
      >p{
        font-size:0.88rem;
        color:#444444;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-line-clamp:3;
        /*! autoprefixer:off */
        -webkit-box-orient:vertical;
        /* autoprefixer:on */
        overflow:hidden;
        white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
        line-height:1.2rem;
      }
      >.listcen{
        overflow: hidden;
        >p:nth-child(1){
        float: left;
        width:65%;
        font-size:0.88rem;
        line-height:1.2rem;
        color:#444444;
        text-overflow:ellipsis;
        display:-webkit-box;
        /*! autoprefixer:off */
        -webkit-box-orient:vertical;
        /* autoprefixer:on */
        -webkit-line-clamp:3;
        overflow:hidden;
        white-space:normal;
        word-break:break-all;
        word-wrap:break-word;
        }
        >p:nth-child(2){
          float: right;
          width:30%;
          height:4rem;
          img{
            width:100%;
            height:100%;
          }
        }
      }
      >.listbot{
        overflow: hidden;
        margin-top:.8rem;
        font-size:.85rem;
        P:nth-child(1){
          width:40%;
          color:#999999;
          float:left;
        }
        P:nth-child(2){
          width:40%;
          color:#999999;
          float:right;
          text-align: right;
        }
      }
      }

    }
  }
  .section-list2{
    section-list2{
      padding:.6rem;
      border-bottom:1px solid #CCCCCC;
      background:#fff;
      overflow: hidden;
      >a{
      >div:nth-child(1){
        width:70%;
        float:left;
        >p{
          color:#333333;
          font-size:1.1rem;
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
        line-height:1.5rem;
        }
        >div{
          margin-top:1rem;
          overflow: hidden;
          >p:nth-child(1){
          color:#999999;
          float:left;
          font-size:.9rem;
          }
        >p:nth-child(2){
          color:#22AC38;
          float:right;
          text-align: right;
          }
        }
      }
      >div:nth-child(2){
        float:right;
        width:25%;
        img{
          width:100%;height:100%;
        }
      }
      }
    }
  }
  .section4{
    //  border-bottom:1px solid #CCCCCC;
    >img{
      width:100%;
    }
    .section-list3{
      li{
        padding:0.6rem;
        border-bottom:1px solid #CCCCCC;
        >a{
          p:nth-child(1){
            font-size:1.1rem;
            color:#333333;
            font-weight:600;
            line-height:1.4rem;
          }
          p:nth-child(2){
            margin-top:1.2rem;
            font-size:.8rem;
            color:#444;
            span:nth-child(1){
              color:#444;
              padding-right:.2rem;
            }
            span:nth-child(2){
              color:#3B97F9;
              padding-left:.2rem;
            }
          }
        }
      }
    }
  }
  #footer{
    position:fixed;
    bottom:0;
    width:100%;
    height:3rem;
    border-top:1px solid #E9E9E9;
    background:#fff;
    ul{
      li{
        float:left;
        width:33.33%;
        text-align:center;
        line-height:1.5rem;
        p{
          font-size:.8rem;
          color:#999999;
        }
        p:nth-child(1){
           font-size:1.4rem;
        }
      }
    }
  }
  .none{
     text-align: center;
     line-height: 2rem;
     color:#999;
   }
  img[lazy=loading] {
  margin: auto;
  background:#C8C8C8;
}
</style>
