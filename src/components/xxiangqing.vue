<template>
  <div class="xxiangqing" v-if = "list != ''&&list != undefined">
    <div id="header">
      <span class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span class="iconfont icon-shoucang1" v-bind:class="{iconShoucang :shoucangx}" @click="shoucang()"></span>
    </div>
      <div id="problem">
            <router-link v-if = "list.secrecy == '0'" :to="'/yhzl/'+list.userid" tag="div" class="data">
            <img  v-lazy="uheadportrait" alt="">
                <span >{{list.user.nickname}}</span>
                <!-- <i>Lv5</i> -->
              </router-link>
              <div class="data"  v-if = "list.secrecy == '1'">
                <p></p>
                <span>匿名用户</span>
              </div>
          <h3>{{list.title}}</h3>
          <p><span></span><span>{{list.createtime}}</span></p>
      </div>
      <div id="section" >
        <p class="content" v-html="list.content">{{list.content}}</p>
        <!-- <div v-if= "code1 == 102" class="teyao"><router-link tag="span" to='/teyao'><i class="iconfont icon-tianjia1" ></i>邀请回答</router-link><span><i class="iconfont icon-bi"></i>写回答</span></div> -->
        <ul class="sectionimg">
              <li v-for="(item,i) in list4" :key="i"><img @click="imglook(i,list4)"  v-lazy="base_URL+item.url" alt=""></li>
            </ul>
        <ul class="sectionlist" v-if = "answer !=''">
          <li v-for="(item,i) in answer" :key = 'i' >
            <router-link v-if = "item.user != undefined"  :to="'/yhzl/'+item.user.id" tag="div" class="data">
                <img v-if="item.user.headportrait.length > 50" v-lazy="item.user.headportrait" alt="">
                <img v-else v-lazy="base_URL+item.user.headportrait" alt="">
            <span>{{item.user.nickname}}</span>
            <span class="zjia" v-if = "item.user.certlevel == 1">专家</span>
            <span class="fzjia" v-else >lv.{{item.user.badgedata}}</span>
            <span v-if = "item.user.certlevel == 1"><span class="xing" v-for="(itemm,i) in item.user.pjstar" :key="i"><i class="iconfont iconShoucang"></i></span></span>
            <img class="ycn" v-if = "item.isadopt == 'yes'" src="../assets/img/363.png" />
            </router-link>
            <div v-else class="data">
              <span>{{item.username}}</span>
              <img class="ycn" v-if = "item.isadopt == 'yes'" src="../assets/img/363.png" />
            </div>
            <p v-html="item.content" class="gly">
              {{item.content}}
            </p>
            <ul>
              <li v-for="(itemm,i) in item.piclist" :key="i"><img @click="imglook(i,item.piclist)" v-lazy="base_URL+itemm.url" alt="" ></li>
            </ul>
            <div class="time">
              <p>发表于：{{item.createtime}}</p>
              <p>
                <span @click="dianzan(item.id,i)" :class="{'dianzan':item.yesclick == true} "><i class="iconfont icon-iconfontzhizuobiaozhun023148" ></i>{{item.greatnum}}</span>
                <span @click="plxq(item.id)"><i class="iconfont icon-pinglun"></i>{{item.comentnum}}</span>
                </p>
            </div>
            <div class="caina" v-if="cainax"><button @click="caina(item.id)">采纳</button></div>
          </li>
         </ul>
        <p v-else class="nonep"> 暂时没有人回答 </p>
      </div>
      <div id="footer">
        <router-link v-if = "code1 == 100" :to="'/huida/'+qid" tag="p"><i class="iconfont icon-tiwen"></i>我来答</router-link>
        <!-- <p v-else-if = "code1 == 102" @click="code11(102)"><i class="iconfont icon-tiwen"></i>我来答</p> -->
        <!-- <p v-else-if = "code1 == 102&&questype == 1" @click="code11(101)" class="footerp"><i class="iconfont icon-liwu"></i><span>提高悬赏</span></p> -->
        <p v-else-if = "code1 == 102&&questype == 0" @click="code11(102)"><i class="iconfont icon-tiwen"></i>我来答</p>
        <p v-else-if = "code1 == 103" @click="code11(103)"><i class="iconfont icon-tiwen"></i>我来答</p>
        <p v-else-if = "code1 == 104" @click="code11(104)"><i class="iconfont icon-tiwen"></i>我来答</p>
        <p v-else-if = "code1 == 105" @click="code11(105)"><i class="iconfont icon-tiwen"></i>我来答</p>
        <!-- <p><span>分享至：</span><i class="iconfont icon-weixin" @click="fweixin()"></i><img src="../assets/img/pyquan.png" alt=""></p> -->
      </div>
      <!-- 图片查看 -->
      <div :class="{'skimg':skimg === true}" class="none">
         <div @click="guanbi()" class="guanbi">关闭</div>
          <div class="skkimg" v-bind:style="{'background': 'url('+base_URL + list5.url+')no-repeat center/contain'}">
         </div>
      </div>
      <!-- 评论详情 -->
      <div class="plxq" v-show = "plxqx">
        <div >
          <div>
        <div class="plxqhead">
          <p>评论详情</p>
          <p class="iconfont icon-guanbi" @click="gb()"></p>
        </div>
        <div class="plxqmin" v-if="list6 != ''">
            <ul class="plxqlist">
              <li v-for = "(item,i) in list6" :key = "i">
                 <div>
                    <router-link :to="'/yhzl/'+item.userid" >
                    <img v-bind:src="item.headurl" alt="">
                    <b>{{item.username}}</b>
                     </router-link>
                    <p :class="{'dianzan':item.yesclick == true}">
                      <i class="iconfont icon-iconfontzhizuobiaozhun023148" @click="dianzans(item.id,i)"></i>
                      <span>{{item.greatnum}}</span>
                    </p>
                  </div>
                  <div>
                    <p>{{item.name}}</p>
                    <p><span>{{item.createtime}}</span><span @click="hf(item.id,item.username)">回复他</span></p>
                  </div>
                  <div v-if="item.children[0] != undefined">
                    <ul >
                      <li v-for="(itemm,i) in item.children" :key="i" >
                        <router-link :to="'/yhzl/'+itemm.userid" tag="span" class="pl1">{{itemm.username}}</router-link>

                        <span v-for="(itemmm,i) in item.children" :key="i">
                        <span v-if="itemm.parentid == itemmm.id">回复</span>
                        <router-link :to="'/yhzl/'+itemmm.userid" tag="span" class="pl1" v-if="itemm.parentid == itemmm.id">
                         {{itemmm.username}}
                        </router-link>
                        </span>
                        <span class="pl1">：</span>
                        <span @click="hff(itemm.id,itemm.username)">{{itemm.name}}</span>
                      </li>
                    </ul>
                  </div>
              </li>
            </ul>
        </div>
        <p v-else class="plxqminp"> 还没有人评论，赶快抢沙发吧~~</p>
        <div class="plxqfoot" v-bind:class="{plxqfoott:inpt}">
          <textarea v-bind:class="{inpt:inpt}" name="" id=""  v-bind:placeholder="name" @blur="focusState = false"    v-model="ipt" v-focus="focusState" @click="iptt()"></textarea>
          <button v-show="inpt" @click="btn">发布</button>
        </div>
      </div>
      </div>
      </div>
      <!-- 悬赏金额 -->
      <div class="xuanshang" v-show = "xuanshang">
          <div @click="fxuanshang()">

          </div>
          <div>
            <p>选择悬赏金额</p>
            <ul @click="xuanze">
              <li v-for="(item,i) in list7" :key = "i" :data-index="i" :class="{'indexcolor':index7 == i}">{{item.text}}</li>
              
            </ul>
            <button @click="yes()">确定</button>
          </div>
      </div>
  </div>
  <div v-else>
    <div id="header">
      <span class="iconfont icon-fanhui" @click="fanhui()"></span>
    </div>
     <p class="ysc">该问题已删除</p>
  </div>
</template>
<script>
import Vue from "vue"
import axios from "axios"
import Swiper from "swiper"
import wx from 'weixin-js-sdk';
import 'swiper/dist/css/swiper.min.css';
import { Indicator,Switch,Toast ,MessageBox,Lazyload } from 'mint-ui';
Vue.use(Lazyload);
export default {
  name: 'Xxiangqing',
  
  data () {
    return {
      list: {},
      list11:{},
      qid : "",
      awid : "",
      fawid : true,
      zt : true,
      list2: "",
      list4 : [],
      list5 : [],
      list6 : '',
      list7:[{
        id:0,
        text:'1元'
      },{
        id:1,
        text:'2元'
      },{
        id:2,
        text:'5元'
      },{
        id:3,
        text:'10元'
      },{
        id:4,
        text:'50元'
      },{
        id:5,
        text:'100元'
      },],
      index7 : -1,
      imgurl : [],
      code1 : "",
      answer : "",
      mymoney: 0,
      ipt : "",
      ipttt : "",
      itemid :"",
      parentid : "0",
      focusState : false ,
      shoucangx : false,
      cainax : false,
      name : "在此评论...",
      uheadportrait : "",
      aheadportrait : "",
      questype : "",
      skimg : false,
      plxqx : false,
      inpt : false,
      xuanshang : false,
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
    }
  },
  mounted(){
   var base_URL = process.env.API_URL //获取环境变量配置
   var url = base_URL + "/pub/api/click/yescollect";//查看用户是否收藏
   var url1 = base_URL + "/pub/api/question/questioninfo"; //请求问题详情
   var url2 = base_URL + "/pub/api/answer/getanswerpic"; //请求回复附件
   var url3 = base_URL + "/pub/api/click/yesgreat"; //查看用户是否点赞 传回复的id
   var url4 = base_URL + "/pub/api/question/getquestionpic";//请求问题附件
   var url5 = base_URL + "/pub/api/answer/yesreply";  //查看问题可否回复
  
   let that = this;
  that.mySwiper = new Swiper('.swiper-container',{
            initialSlide:0,
            autoplay:false,
            keyboardControl:true,
            autoHeight:true,
            observer:true,
            observeParents:true,
            on: {
          slideChangeTransitionEnd: function(){
            that.nowIndex=that.mySwiper.activeIndex
          },
            }
        });
    if(this.$route.params.id.indexOf("-")  == -1){
      that.qid = this.$route.params.id
    }else{
       that.qid = this.$route.params.id.substr(0,32)
       that.awid = this.$route.params.id.substr(33,64)
       that.plxq(that.awid)
    }
      

    //查看用户是否收藏
    axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&questionid=${that.qid}`).then(function(res){
      console.log(res,"查看是否收藏")
      if(res.data.code == 100){
          that.shoucangx = true;
        }
        }).catch(function(){

        })
    
   //请求问题详情
    axios.post(url1,`wechatid=${sessionStorage.getItem('skopenid')}&qid=${that.qid}`).then(function(res){
      console.log(res,"3466")
      if(res.data.code == 100){
        that.list = res.data.data.result
        that.questype = that.list.questype
        that.list.createtime = that.list.createtime.slice(0,16)
        that.uheadportrait =  that.list.user.headportrait
// 从消息页跳转过来的判断问题有没有被删除
      for(var i=0;i<that.list.answer.length;i++){
        if(that.awid == that.list.answer[i].id){
          that.zt = false
        }
      }
        if(that.awid !=''&&that.zt){
          that.fawid = false;
           let instance = Toast("该回答已删除");
                setTimeout(() => {
                  instance.close();
                }, 1000);
        }
    //请求问题附件
         axios.post(url4,`wechatid=${sessionStorage.getItem('skopenid')}&qid=${that.qid}`).then(function(res){
      console.log(res,"附件")
      if(res.data.code == 100){
        that.list4 = res.data.data.result
      }
  
    }).catch(function(){

    });

 //判断进入页面的用户是否为问题发起者
      if(that.list.user.wechatid == sessionStorage.getItem('skopenid')){
          console.log("aaa")
            that.cainax = true;
          }
      if(that.uheadportrait.length > 50){
      }else{
          that.uheadportrait = base_URL +that.uheadportrait
        }

    if(that.list.answer.length != 0){
      that.answer =  that.list.answer
     for(var a = 0;a<that.answer.length;a++){
        that.list.answer[a].createtime = that.list.answer[a].createtime.slice(0,16)
        that.answer[a].dianzanx = false
      }
      digui(0,that.answer.length)
     function digui(i,length){
       //查看用户是否点赞 传回复的id
    axios.post(url3,`wechatid=${sessionStorage.getItem('skopenid')}&answerid=${that.answer[i].id}`).then(function(res){
     if(res.data.code == 100){
                      that.answer[i].dianzanx = true;
                    }
                     if(i < length){
                        i++
                        digui(i,length)
                      }
                    }).catch(function(){
                    })
     }
    }
              }}).catch(function(){
    });

    //查看问题可否回复
    axios.post(url5,`wechatid=${sessionStorage.getItem('skopenid')}&qid=${that.qid}`).then(function(res){
      console.log(res,"是否可回复")
      console.log(sessionStorage.getItem('skbanstate'))
      if(sessionStorage.getItem('skbanstate') == 1){
        that.code1 = 105
      }else{
           that.code1 = res.data.code
      }
    }).catch(function(){

    });
  },
  directives: {
    focus: {
      //根据focusState的状态改变是否聚焦focus
      update: function (el, value) {    //第二个参数传进来的是个json
        if (value.value) {
          el.focus()
        }
      }
    }
  },
  watch:{
      focusState(val){
        console.log(val,"aaa")
        //判断当焦点消失时 改变class
        if(val == false){
             this.inpt = false;
             this.ipt = "";
        }else{
          this.inpt = true;
        }
      },
  },
  methods:{
      fanhui(){
        this.$router.go(-1)
      },
      fxuanshang(){
         this.xuanshang = false;
         this.index7 = -1
      },
      xuanze(e){
        if (e.target.nodeName.toLowerCase() === 'li') {
            const index = parseInt(e.target.dataset.index)
            // 获得引索后，只需要修改data数据就能改变UI了
            this.index7 = index;
          }
      },
      yes(){
        var that = this;
        if(that.index7 == -1){
          let instance = Toast("请选择金额");
              setTimeout(() => {
                instance.close();
              }, 1500);

        }else if(that.index7 == 0){
          that.mymoney = 1
        }else if(that.index7 == 1){
          that.mymoney = 2
        }else if(that.index7 == 2){
          that.mymoney = 5
        }else if(that.index7 == 3){
          that.mymoney = 10
        }else if(that.index7 == 4){
          that.mymoney = 50
        }else if(that.index7 == 5){
          that.mymoney = 100
        }
        var url = that.base_URL + "/pub/api/info/mymoney";
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
      console.log(res,"aaaabbb")
       if(res.data.code == 100){
         if(that.mymoney <= res.data.data.result){
           var url2 = that.base_URL + "/pub/api/question/zjreward";
           axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}&questionid=${that.qid}&rewardnum=${that.mymoney}`).then(function(res){
      console.log(res,"aa",that.mymoney)
       if(res.data.code == 100){
        this.xuanshang = false;
        console.log("悬赏成功")
    }
       }).catch(function(){
    });
         }else{
           console.log("请充值")
         }
        
       }
       }).catch(function(){
    });
      },
      code11(i){
        if(i == 101){
        this.xuanshang = true;
        }else if(i == 102){
          let instance = Toast("自己不能回答自己的问题哦");
              setTimeout(() => {
                instance.close();
              }, 1500);
        }else if(i == 103){
          let instance = Toast("当前问题已完成哦");
              setTimeout(() => {
                instance.close();
              }, 1500);
        }else if(i == 104){
            let instance = Toast("您已经回答过该问题");
              setTimeout(() => {
                instance.close();
              }, 1500);
        }else if(i == 105){
            let instance = Toast("你已经被限制回答");
                setTimeout(() => {
                  instance.close();
                }, 1500);
        }
        
      },
      //图片查看
      imglook(i,list){
        
        this.list5 = list[i]
        console.log(this.list5)
        this.skimg = true;
      },
      guanbi(){
         this.skimg = !this.skimg
      },
      //关闭评论
      gb(){
          this.plxqx = false 
      },
      //打开评论
      plxq(id){
        var that = this
        that.parentid = "0";
        that.name = "在此评论..."
        if(that.fawid){
          that.plxqx = true
        }
        that.itemid = id
        if(that.$route.params.id.indexOf("-")  == -1){
          var url = that.base_URL + "/pub/api/comments/answercoment";
        }else{
          var url = that.base_URL + "/pub/api/comments/manswercoment";
        }
        
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&answerid=${id}`).then(function(res){
      console.log(res,"aaaabbb")
       if(res.data.code == 100){
       that.list6 = res.data.data.result
        for(var i = 0 ; i<that.list6.length;i++){
        that.list6[i].createtime = that.list6[i].createtime.slice(0,16)
         that.list6[i].yesclick = false
         if(that.list6[i].headurl.length < 50){
           
           that.list6[i].headurl = that.base_URL + that.list6[i].headurl
         }
       }
       }
       }).catch(function(){
    });
},
  //回复楼主
    hf(id,name){
      this.focusState = true;
      this.parentid = id;
      this.name = "回复"+name;
    },
    //回复楼中楼
    hff(id,name){ 
      this.focusState = true;
      this.parentid = id;
      this.name ="回复"+name;
    },
    //点击输入框
      iptt(){
        this.inpt = true;
        this.focusState = true;
                },
        //提交评论       
    btn(){
      this.focusState = true;
      this.ipttt = this.ipt;
      this.focusState = false;
      var that = this;
      var url = that.base_URL + "/pub/api/comments/initcoment"; //
      var  beanjson = {
        "answerid":that.itemid,
        "parentid":that.parentid,
        "name":that.ipttt,
      }
      var data = encodeURI(JSON.stringify(beanjson))
      if(that.ipttt != ""){
          that.plxqx = false;
          axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&beanjson=${data}`).then(function(res){
      console.log(res)
       if(res.data.code == 100){
          let instance = Toast("发表成功 审核中...");
              setTimeout(() => {
                instance.close();
              }, 1000);
       }
       }).catch(function(){

    });
      }else{
         let instance = Toast("不能为空");
              setTimeout(() => {
                instance.close();
              }, 600);
      }
         
    },
     //评论点赞
     dianzans(id,i){
          let that = this;
          var url = that.base_URL + "/pub/api/comments/canclecommentgreat"; //取消点赞
          var url2 = that.base_URL + "/pub/api/comments/commentgreat"; //点赞
        if(that.list6[i].yesclick){
          //取消点赞
           that.list6[i].yesclick = false
        that.list6[i].greatnum = that.list6[i].greatnum-1
             axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&commentid=${id}`).then(function(res){
                console.log(res,"2")
       if(res.data.code == 100){
       
       }}).catch(function(){

    });
        }else{
          //点赞
         that.list6[i].yesclick = true
        that.list6[i].greatnum = that.list6[i].greatnum+1
          axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}&commentid=${id}`).then(function(res){
            console.log(res,"1")
       if(res.data.code == 100){
        
       }}).catch(function(){

    });
        }
     },    
      //采纳
      caina(id){
        var base_URL = process.env.API_URL //获取环境变量配置
         var url = base_URL + "/pub/api/click/replyadopt";
         let that = this;
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&answerid=${id}`).then(function(res){
      console.log(res,"采纳")
       if(res.data.code == 100){
         let instance = Toast("采纳成功");
              setTimeout(() => {
                instance.close();
              }, 1200);
       }else if(res.data.code == 200){
         let instance = Toast("已经采纳过了");
              setTimeout(() => {
                instance.close();
              }, 1200);
       }else if(res.data.code == 400){
          let instance = Toast("系统错误");
              setTimeout(() => {
                instance.close();
              }, 1200);
       }
       }).catch(function(){

    });
      },
      //点赞 传回复的id
      dianzan(id,i){
        var base_URL = process.env.API_URL //获取环境变量配置
         var url = base_URL + "/pub/api/click/cancelgreat"; //取消点赞
          var url2 = base_URL + "/pub/api/click/greatreply"; //点赞
        let that = this;
        
        if(that.answer[i].yesclick){
          //取消点赞
           that.answer[i].yesclick = false
        that.answer[i].greatnum = that.answer[i].greatnum-1
             axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&answerid=${id}`).then(function(res){
      console.log(res,"2")
       if(res.data.code == 100){
       
       }}).catch(function(){

    });
        }else{
          //点赞
         that.answer[i].yesclick = true
        that.answer[i].greatnum = that.answer[i].greatnum+1
          axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}&answerid=${id}`).then(function(res){
      console.log(res,"1")
       if(res.data.code == 100){
        
       }}).catch(function(){

    });
        }   
      },
      //收藏
      shoucang(){
        var base_URL = process.env.API_URL //获取环境变量配置
         var url = base_URL + "/pub/api/click/collectquestion";
         var url2 = base_URL + "/pub/api/click/cancelcollect";
        let that = this;
        if(that.shoucangx == false){
           that.shoucangx = true;
            axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&questionid=${that.qid}`).then(function(res){
       if(res.data.code == 100){
        console.log(that.shoucangx)
           let instance = Toast("收藏成功");
              setTimeout(() => {
                instance.close();
              }, 1200);
       }}).catch(function(){
});
        }else{
          //取消收藏
          that.shoucangx = false;
             axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}&questionid=${that.qid}`).then(function(res){
      console.log(res)
       if(res.data.code == 100){
         let instance = Toast("取消收藏");
              setTimeout(() => {
                instance.close();
              }, 1200);
       }}).catch(function(){

    });}},
//     fweixin(){
//        var base_URL = process.env.API_URL //获取环境变量配置
//          var url = base_URL + "/pub/wechat/jssdkconfig";
//       var local = window.location.href.replace("&","-")
 
//   console.log(local)
//       axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&wurl=${local}`).then(function(res){
//         console.log(res)
//        if(res.data.code == 100){
       
//     wx.config({
//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: 'wx18c6d2cc389d83d7', // 必填，公众号的唯一标识
//     timestamp:  res.data.data.result.timestamp , // 必填，生成签名的时间戳
//     nonceStr: res.data.data.result.nonceStr, // 必填，生成签名的随机串
//     signature: res.data.data.result.signature,// 必填，签名
//     jsApiList: [ "updateAppMessageShareData","updateTimelineShareData",] // 必填，需要使用的JS接口列表
// });
//     wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
//     wx.updateAppMessageShareData({ 
//         title: '健康大中原', // 分享标题
//         desc: '有点东西', // 分享描述
//         link: local, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
//         imgUrl: '', // 分享图标
//         success: function () {
//           // 设置成功
//         }
//     })
// });
//        }}).catch(function(){
//     });
//     }
    }
}
</script>

<style scoped lang="scss">
img[lazy=loading] {
  margin: auto;
  background:#C8C8C8;
}
.xxiangqing{
  height:100%;
  background:#F2F2F2;
 }
#header{
  width:100%;
    position:fixed;
    top:0;
    height:1.8rem;
    z-index:99;
    border-bottom:1px solid #CCCCCC;
    padding:.6rem 0;
   background:#F2F2F2;
   overflow: hidden;
  span{
    line-height:1.8rem;
  }
    span:nth-child(1){
      font-size:1.3rem;
      float:left;
      padding-left:.6rem;
    }
    span:nth-child(2){
      float:right;
      color:#696969;
      font-size:1.5rem;
      padding-right:.6rem;
    }
    
  }
  #problem{
    width:100%;
    background:#F2F2F2;
    padding:.5rem .6rem;
    position:fixed;
    margin-top:1px;
    z-index: 99;
    top:3rem;
    .data{
      margin:.5rem 0;
          img{
            width:2rem;
            height:2rem;
            border-radius:50%;
          }
          p{
            width:2rem;
            height:2rem;
            border-radius:50%;
            display:inline-block;
            background:#C8C8C8;
          }
          span{
            font-weight:900;
            font-size:.9rem;
            padding:.5rem .5rem;
          }
          i{
            display: inline-block;
            padding:0 .3rem;
            border:1px solid #999999;
            color:#999;
            font-size:.75rem;
            border-radius:.5rem;
          }
          
        }
       
    h3{
      word-wrap: break-word;
      font-size:1.3rem;
      color:#000;
      line-height:1.6rem;
       overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
    }
    >p{
      padding-top:.6rem;
      color:#333333;
      font-size:1rem;
      span{
        color:#999999;
        padding-left:.4rem;
      }
      span:nth-child(2){
        font-size:.85rem;
        float:right;
        padding-right:1rem;
      }
    }
  }
  #section{
    padding-top:10.5rem;
    padding-bottom:1rem;
    .content{
      word-wrap: break-word;
      background:#fff;
      font-size:.9rem;
      color:#5b626b;
      padding:.3rem .5rem;
      line-height: 1.2rem;
      border-bottom:1px solid #d6d6d6;
    }
    .teyao{
      background:#fff;
      height:2.5rem;
      color:#646464;
      span{
        display: inline-block;
        width:50%;
        height:100%;
        text-align: center;
        line-height: 2.5rem;
        box-sizing: border-box;
        font-size:.8rem;
        letter-spacing: .1rem;
        i{
          color:#646464;
          font-size:1.1rem;
          font-weight: 900;
          padding-right:.3rem;
        }
      }
      span:nth-child(1){
        border-right:1px solid #CCCCCC;
      }
    }
    .sectionimg{
      overflow: hidden;
      background:#fff;
      >li{
        width:31%;
        height:7rem;
        margin: .5rem 1%;
        float: left;
        >img{
          width:100%;
          height:100%;
        }
      }
    }
    >.nonep{
        text-align: center;
        color:#999999;
        line-height: 3rem;
      }
    .sectionlist{
      border-top:1px solid #ddd;
      margin-bottom:3rem;
      >li{
        background:#fff;
        padding:.4rem .5rem;
        .data{
          position: relative;
          img{
            width:2rem;
            height:2rem;
            border-radius:50%;
          }
          span{
            font-weight:900;
            font-size:.9rem;
            padding:.5rem .5rem;
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
          >.xing{
            padding:0;
            i{
              border:none;
              font-size:.7rem;
              padding:0;
            }
          } 
          >.ycn{
            position:absolute;
            right:0;
            top:0;
            width:4rem;
            height:4rem;
            border-radius:50%;
          } 
        }
        >p{
          padding:.8rem 0;
          line-height:1.3rem;
          font-size:.9rem;
          color:#5b626b;
        }
        >ul{
          overflow: hidden;
          li{
            float:left;
            margin-right:3%;
            margin-bottom:.4rem;
            width:30%;
            height:7rem;
            img{
              width:100%;
              height:100%;
            }
          }
        }
        .time{
          overflow: hidden;
          margin-top:.4rem;
          color:#999999;
          font-size:.8rem;
          >p:nth-child(1){
            float: left;
            line-height: 1.2rem;
          }
          >p:nth-child(2){
            float: right;
            span{
              padding-left:1rem;
              i{
                font-weight:900;
                padding-right:.2rem;
              }
            }
            >span:nth-child(2){
              i{
                  font-size:.88rem;
              }
              
            }
            .dianzan{
                color:#d81e06;
              }
            }
        }
        .caina{
          margin-top:.5rem;
          text-align: right;
          
          button{
            color:#fff;
            padding:.1rem .6rem;
            font-size:.9rem;
            border-radius: .4rem;
            background:#377EF4
          }
        }
      }
    }
    
  }
  #footer{
    box-sizing:border-box ;
    padding:.4rem 0;
    line-height:2.2rem;
    p{
      width:100%;
      text-align: center;
      color:#22AC38;
      font-size:1rem;
      letter-spacing:.4rem;
      i{
        font-size:1.2rem;
         padding-right:.3rem;
      }
    }
    .footerp{
      color:#666666;
      position: relative;
      span{
          
      }
    i{
        font-size:2.2rem;
        color:#F49A0B;
        position:absolute;
        left:7rem;
      }
    }
    // >p:nth-child(1){
    //   width:45%;
    //   float:left;
    //   text-align: center;
    //   color:#22AC38;
    //   font-size:1rem;
    //   border-right:1px solid #666666;
    //   i{
    //     font-size:1.2rem;
    //     padding-right:.3rem;
    //   }
    // }
    // >p:nth-child(2){
    //   width:50%;
    //   float:right;
    //   span{
    //     color:#999999;
    //     font-size:.8rem;
    //   }
    //   i{
    //     margin:0 1.2rem;
    //     color:#25BE03;
    //     font-size:1.3rem;
    //   }
    //   img{
    //     width:1.5rem;
    //     height:1.5rem;
    //     margin-bottom:.6rem;
    //   }
    // }
  }
   .none{
    display: none;
  }
  .skimg{
    display: block;
    width:100%;
    height: 100%;
    position:fixed;
    z-index:999;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:#000;
    color:#fff;
    
      .skkimg{
        width:100%;
        height: 100%;
       
      
    }
   
  }
 .guanbi{
   position:fixed;
   z-index:999;
   width:15%;
   border-radius: .4rem;
   font-size:.8rem;
   text-align: center;
   line-height: 1.5rem;
    height:1.5rem;
    background:#fff;
    top:5%;
    left:45%;
    color:#000;
 }
.plxq{
  display:block;
    position:fixed;
    width:100%;
    height:100%;
    z-index:999;
    bottom:0;
    background:rgba(51,51,51,.5);
    color:#000;
     
    >div{
      width:100%;
       height:94%;
       margin-top:10%;
       background:#fff;
       border-radius: 1rem;
      overflow-y: scroll;
       >div{
        margin-bottom:3rem;
        position:relative;
        
       .plxqhead{
         border-radius: 1rem 1rem 0 0;
         position: fixed;
         width:100%;
         background:#fff;
         height:2rem;
         padding:1rem 0 .5rem 0;
         font-weight:900;
         color:#333333;
         p:nth-child(1){
           width:80%;
           text-align:center;
           float:left;
           padding-left:10%;
         }
         p:nth-child(2){
           width:10%;
           float:right;
         }
       }
       .plxqminp{
        padding-top:5rem;
        color:#666666;
        font-size:.8rem;
        line-height:1.8rem;
        text-align: center;
       }
       
       .plxqmin{
        padding-top:3rem;
       >ul{
           >li{
             border-bottom : 1px solid #999999;
             margin: .7rem .7rem;
             >div:nth-child(1){
               height:1.8rem;
               img{
                 width:1.8rem;
                 height:1.8rem;
                 border-radius:50%;
               }
               b{
                 font-size:.88rem;
                 color:#000000;
                 font-weight: 900;
               }
               p{
                 height:1.8rem;
                display:inline-block;
                float:right;
                color:#666666;
                font-size:.8rem;
                line-height:1.8rem;
               }
               .dianzan{
                color:#d81e06;
              }
             }
             >div:nth-child(2){
               margin-top:.8rem;
               padding:0 2.1rem;
               >p:nth-child(1){
                 color:#666666;
                 line-height:1.1rem;
                 font-size:.88rem;
                }
               >p:nth-child(2){
                 color:#999999;
                 font-size:.7rem;
                 margin:.2rem 0 1rem 0;
                 >span:nth-child(2){
                   margin-left:.5rem;
                   display:inline-block;
                   padding:.1rem .3rem;
                   border:1px solid #999;
                   border-radius: .5rem;
                 }
               }
             }
             >div:nth-child(3){
               margin:0 .2rem .5rem 2.1rem;
               padding:.8rem .5rem;
               line-height: 1rem;
                background:#F2F2F2;
                font-size:.8rem;
                color:#666666;
                ul{
                  li{
                    padding-bottom:.4rem;
                  }
                }
              .pl1{
                color:#000000;
              }
             }
            }
         }
       }
       .plxqfoot{
         border-radius: 0 0 1rem 1rem ;
         position: fixed;
         bottom:0;
         width:100%;
         height:3rem;
         background:#fff;
         border-top:1px solid #E9E9E9;
         textarea{
           width:60%;
           height:1.2rem;
           margin:.5rem 10%;
           background:#F2F2F2;
           border-radius: 1rem;
           font-size: .8rem;
           text-indent: 1rem;
           resize : none;
           padding:.5rem 0;
         }
         .inpt{
           width:90%;
           margin-left:5%;
           height:4rem;
           border-radius :0;
           text-indent:0;
           padding:0;
         }
       }
       .plxqfoott{
         border-radius: 0 ;
         position: fixed;
         bottom:0;
         width:100%;
         height:7rem;
         button{
          color:#fff;
          background:#127ACA;
          width:3rem;
          height:1.5rem;
          border-radius: .8rem;
          float:right;
          margin-right:.8rem;
          font-size:.8rem;
         }
       }
    }
    }
}
.xuanshang{
  width:100%;
  height:100%;
  position:fixed;
  z-index:999;
  bottom:0;
  background:rgba(30,30,30,.5);
  >div:nth-child(1){
    height:60%;
  }
  >div:nth-child(2){
    height:40%;
    background:#fff;
    color:#666;
    >p{
      height:20%;
      text-align: center;
      font-size:.88rem;
      line-height:2rem;
    }
    >ul{
      width:80%;
      margin-left:10%;
      height:60%;
      font-size:.88rem;
      color:#000;
      li{
        width:20%;
        height:20%;
        margin:4% 6.66%;
        text-align: center;
        float:left;
        border:1px solid #999999;
        box-sizing: border-box;
        line-height: 1.7rem;
      }
      .indexcolor{
        background:#22AC38;
        color:#fff;
      }
    }
    >button{
      height:20%;
      border-top:1px solid #E9E9E9;
      width:100%;
      background:#fff;
    }
  }
}
.ysc{
  padding-top:3rem;
  width:#999;
  text-align: center;
  font-size:.8rem;
  line-height: 3rem;
}
</style>
<style>
  .gly img{
  display: block;
  max-width: 100%;
}
</style>