<template>
  <div class="">
     <div id="header">
      <span  class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>移动办公</span>
    </div>
    <div class="nav">
     <ul class="nav-list">
          <li  v-for="(item,index) in list" :key='index' :class="{'redd':nowIndex==index,'li1':list.length==1,'li2':list.length==2}"   @click="tabClick(index,item.name)"><i>{{item.name}}</i>
        </li>
     </ul>
    </div>
    <div id="section">
      <div v-if="list2 != ''">
        <ul>
          <li v-for="(item,i) in list2" :key = i @click="xq(item.id,item.userid,i)">
            <div>
              <p v-if="item.title != undefined">{{item.title}}</p>
              <p v-if="item.name != undefined">{{item.name}}</p>
              <p v-if="name == '审核回复'">{{item.content}}</p>
              <p v-if="item.questype != undefined&&item.questype != 0">{{item.questype}}</p>
              <p>{{item.createtime}}</p>
            </div>
            <div>
              <span  class="iconfont icon-fanhui"></span>
            </div>
          </li>
        </ul>
         <p v-if = "number == 1" class="jz" @click="jz(name)">点击加载更多</p>
        <p v-else-if = "number == 2" class="jz">加载中。。。</p>
        <p v-else-if = "number == 3" class="jz jzz">没有更多了</p>
      </div>
      <p v-else>暂无内容</p>
    </div>
    <!-- 详情 -->
    <div class="plxq" v-if = "xqx">
        <div >
          <div>
        <div class="plxqhead">
          <p>详情</p>
          <p class="iconfont icon-guanbi" @click="gb()"></p>
        </div>
        <div class="plxqmin">
          <div class="mintw" v-if="name == '审核提问'">
            <p><img :src="headportrait" alt="">{{list2[index].username}}</p>
            <p>{{list2[index].title}}</p>
            <p>{{list2[index].content}}</p>
            <p>板块： <span>{{list2[index].plate}}</span></p>
            <p>标签： <span>{{list2[index].label}}</span></p>
            <ul>
              <li v-for = "(item,i) in list3" :key="i">
                <img @click="imglook(i,list3)" v-lazy="base_URL+item.url" alt="">
              </li>
            </ul>
          </div>
          <div class="minhf" v-if="name == '审核回复'">
            <p><span>问题：</span>{{list2[index].title}}</p>
            <p><img :src="headportrait" alt="">{{list2[index].username}}</p>
            <p>{{list2[index].content}}</p>
            <ul>
              <li v-for = "(item,i) in list3" :key="i">
                <img @click="imglook(i,list3)" v-lazy="base_URL+item.url" alt="">
              </li>
            </ul>
          </div>
          <div class="minpl" v-if="name == '发布评论'">
            <div >
              <p><span>问题：</span>{{list4.question.content}}</p>
              <p><span>回答：</span>{{list4.answer.content}}</p>
              
            </div>
            <p><img :src="headportrait" alt="">{{list2[index].username}}</p>
            <p>{{list2[index].name}}</p>
            
          </div>
        </div>
        <div class="plxqfoot" :class="{'plxqfoott':name == '发布评论'}">
          <textarea v-if = "name != '发布评论'" name="" id="" v-model="title"  maxlength="200"  placeholder="审核意见...">
          </textarea>
          <div class="footbtn" >
            <span @click="fabu(true)">发布</span>
            <span  @click="fabu(false)">废弃</span>
          </div>
          
        </div>
      </div>
      </div>
      </div>
      <!-- 图片查看 -->
      <div :class="{'skimg':skimg === true}" class="none">
         <div @click="guanbi()" class="guanbi">关闭</div>
          <div class="skkimg" v-bind:style="{'background': 'url('+base_URL + list5.url+')no-repeat center/contain'}">
         </div>
      </div>
  </div>
</template>
<script>
import Vue from "vue"
import axios from "axios"
import { Indicator,Switch,Toast,Lazyload } from 'mint-ui';
Vue.use(Lazyload);
export default {
  name: 'Shenhe',
  data () {
    return {
    nowIndex:0,
    xqx : false,
    skimg : false,
    number : 1,
    i : 1,
    userid : '',
    questionid : "",
    name : "",
    title : "",
    index : "",
    base_URL : process.env.API_URL, //获取环境变量配置
    list : "",
    list2 : "",
    list3 : "",//保存附件
    list4:"",//保存评论详情
    list5 : "",
    headportrait : "",
    }
  },

  methods:{
    //加载更多
       jz(name){
        var that = this;
        that.i++;
        that.number = 2
        if(name == '审核提问' ){
          var url = this.base_URL + "/pub/permissions/toauditquestions";//审核提问
        }else if(name == '审核回复'){
        var url = this.base_URL + "/pub/permissions/toauditanswer";//审核回复
        }else if(name == '发布评论'){
          var url = this.base_URL + "/pub/permissions/toauditcomments";//审核评论
        }
    axios.post(url,`userid=${that.userid}&pageNumber=${that.i}&pageSize=10`).then(function(res){
                if(res.data.data.result.list.length < 10){
                      that.number = 3
                    }else{
                      for(var i = 0;i<res.data.data.result.list.length;i++){
                        that.list2.push(res.data.data.result.list[i])
                      }
                      that.number = 1
                    }
          }).catch(function(err){})
  },
      fanhui(){
        this.$router.go(-1)
      },
       //图片查看
      imglook(i,list){
        
        this.list5 = list[i]
        this.skimg = true;
      },
      guanbi(){
         this.skimg = !this.skimg
      },
       tabClick(index,name){
        this.i = 1;
        this.list2 = "";
        this.nowIndex = index
        this.name = name
        var url2 = this.base_URL + "/pub/permissions/toauditquestions";//审核提问
        var url3 = this.base_URL + "/pub/permissions/toauditanswer";//审核回复
        var url4 = this.base_URL + "/pub/permissions/toauditcomments";//审核评论
        var that = this
      if(name == '审核提问'){
              axios.post(url2,`userid=${that.userid}`).then(function(data){
                that.list2 = data.data.data.result.list
                if(that.list2.length < 10){
                      that.number = 3
                    }else{
                      this.number = 1
                    }
          }).catch(function(err){})
          }else if(name == '审核回复'){
            axios.post(url3,`userid=${that.userid}`).then(function(data){
                that.list2 = data.data.data.result.list
                console.log(that.list2)
                if(that.list2.length < 10){
                      that.number = 3
                    }else{
                      this.number = 1
                    }
          }).catch(function(err){})
          }else if(name == '发布评论'){
                axios.post(url4,`userid=${that.userid}`).then(function(data){
                      that.list2 = data.data.data.result.list
                      console.log(that.list2)
                      if(that.list2.length < 10){
                      that.number = 3
                    }else{
                      this.number = 1
                    }
                              }).catch(function(err){})
          }
      },
      //打开详情
      xq(id,userid,i){
        this.xqx = true
        this.headportrait = ""
        this.questionid = id
        this.index = i
        var that = this
        var url = that.base_URL + "/pub/api/info/useridinfo"; //获取资料
            axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&userid=${userid}`).then(function(res){
      console.log(res)
      if(res.data.code == 100){
        that.headportrait = res.data.data.result.headportrait
      }
    }).catch(function(){
    });
    if(that.name == '审核提问'){
      var url1 = that.base_URL + "/pub/api/question/getquestionpic"; //获取问题附件
    }else if(that.name == '审核回复'){
      var url1 = that.base_URL + "/pub/api/answer/getanswerpic"; //获取回复附件
    }else if(that.name == '发布评论'){
      var url1 = that.base_URL + "/pub/permissions/commentDet";
    }
    that.list3 = ""
    if(that.name != '发布评论'){
      axios.post(url1,`wechatid=${sessionStorage.getItem('skopenid')}&qid=${id}`).then(function(res){
      console.log(res,"66")
      if(res.data.code == 100){
       that.list3 = res.data.data.result
      }
    }).catch(function(){
    });
    }else{//评论详情
      axios.post(url1,`userid=${userid}&commentid=${id}`).then(function(res){
      console.log(res,"6")
      if(res.data.msg == '成功'){
       that.list4 = res.data.data.result
       console.log(that.list4)
      }
    }).catch(function(){
    });
    }   
      },
       //关闭详情
      gb(){
          this.xqx = false 
          this.title = ""
      },
      fabu(i){
        if(i == true){
          var state = 1
          var xstate = 1
          var xxstate = 1
        }else{
          var state = 7
          var xstate = 2
          var xxstate = 2
        }
        var that = this;
        var url2 = this.base_URL + "/pub/permissions/auditquestion";//发布提问
        var url3 = this.base_URL + "/pub/permissions/auditanswer";//发布回复
        var url4 = this.base_URL + "/pub/permissions/auditcomments";//发布评论
        this.xqx = false
        if(that.title != ''){
           that.title = encodeURI(JSON.stringify(that.title));
        }
      if(that.name == '审核提问'){
              axios.post(url2,`userid=${that.userid}&questionid=${that.questionid}&quesnote=${that.title}&state=${state}`).then(function(data){
                console.log(data)
        if(data.data.code == 100){
            that.gb()
            that.list2.splice(that.index,1)
            let instance = Toast("发布成功");
              setTimeout(() => {
                instance.close();
              }, 500);
        }else if(data.data.code == 200){
            that.gb() 
            that.list2.splice(that.index,1)
            let instance = Toast("废弃成功");
              setTimeout(() => {
                instance.close();
              }, 500);
        }  
          }).catch(function(err){
            
          })

          }else if(that.name == '审核回复'){
            axios.post(url3,`userid=${that.userid}&answerid=${that.questionid}&answernote=${that.title}&state=${xstate}`).then(function(data){
        console.log(data)
               if(data.data.code == 100){
            that.gb() 
            that.list2.splice(that.index,1)
            let instance = Toast("发布成功");
              setTimeout(() => {
                instance.close();
              }, 500);
        }else if(data.data.code == 200){
            that.gb() 
            that.list2.splice(that.index,1)
            let instance = Toast("废弃成功");
              setTimeout(() => {
                instance.close();
              }, 500);
        } 
          }).catch(function(err){})

          }else if(that.name == '发布评论'){
               axios.post(url4,`userid=${that.userid}&commentid=${that.questionid}&state=${xxstate}`).then(function(data){
             console.log(data)
                    if(data.data.code == 100){
            that.gb() 
            that.list2.splice(that.index,1)
            let instance = Toast("发布成功");
              setTimeout(() => {
                instance.close();
              }, 500);
             }else if(data.data.code == 200){
            that.gb() 
            that.list2.splice(that.index,1)
            let instance = Toast("废弃成功");
              setTimeout(() => {
                instance.close();
              }, 500);
        } 
             
             }).catch(function(err){})
           
          }
      },
  },
    mounted(){
        this.userid = this.$route.params.id
        var url = this.base_URL + "/pub/permissions/touseractionkey";//板块
        var url2 = this.base_URL + "/pub/permissions/toauditquestions";//审核提问
        var url3 = this.base_URL + "/pub/permissions/toauditanswer";//审核回复
        var url4 = this.base_URL + "/pub/permissions/toauditcomments";//审核评论
        var that = this

axios.post(url,`userid=${that.userid}`).then(function(data){
          console.log(data)
                  that.list = data.data.data.result
                  that.name = that.list[0].name
                  console.log(that.name)
              if(that.name == '审核提问'){
                  axios.post(url2,`userid=${that.userid}`).then(function(data){
            console.log(data,"22")
                    that.list2 = data.data.data.result.list
                    if(that.list2.length < 10){
                      that.number =3
                    }
              }).catch(function(err){})
              }else if(that.name == '审核回复'){
                axios.post(url3,`userid=${that.userid}`).then(function(data){
            console.log(data,"22")
                    that.list2 = data.data.data.result.list
                    if(that.list2.length < 10){
                      that.number =3
                    }
              }).catch(function(err){})
              }else if(that.name == '发布评论'){
                    axios.post(url4,`userid=${that.userid}`).then(function(data){
                                console.log(data,"22")
                        that.list2 = data.data.data.result.list
                        if(that.list2.length < 10){
                           that.number = 3
                            }
                                  }).catch(function(err){})
              }

              }).catch(function(err){
                 
              })

    },
}
</script>

<style scoped lang="scss">
img[lazy=loading] {
  margin: auto;
  background:#C8C8C8;
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
    z-index: 9;
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
      width:33.3%;
      float: left;
      font-size:1rem;
      line-height: 2.4rem;
      text-align:center;  
      color:#666666;
    }
    .li1{
      width:100%;
    }
    .li2{
      width:50%;
    }
  }
}
.redd{
  color:#000000!important;
  border-bottom:.2rem solid #333333;
  }
  #section{
    padding-top:5.2rem;
    >p{
       text-align: center;
    font-size:.88rem;
    line-height: 3rem;
    width:100%;
    height:3rem;
    color:#999999;
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
    li{
      padding:.5rem;
      background:#fff;
      overflow: hidden;
      border-bottom:1px solid #ccc;
      >div:nth-child(1){
        float:left;
        width:90%;
        p:nth-child(1){
          color:#000;
          font-size:.75rem;
          padding-bottom:.5rem;
        }
        p:nth-child(2),p:nth-child(3){
          color:#999999;
          font-size:.6rem;
          line-height: 1rem;
        }
      }
      >div:nth-child(2){
        float:left;
        width:10%;
        height:100%;
        overflow: hidden;
        span{
          position: absolute;
          padding:.5rem;
          transform:rotate(270deg);
        }
      }
    }
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
       .plxqmin{
         padding:.8rem;
        padding-top:4rem;
        color:#000;
        ul{
             overflow: hidden;
              >li{
              width:31%;
              height:7rem;
              margin: .5rem 1%;
              float: left;
              >img{
                width:100%;
                height:100%;
                border-radius: .6rem;
              }
            }
           }
           >div{
              p:nth-child(1){
           img{
             width:2rem;
             height:2rem;
             border-radius: 50%;
             margin-right:.5rem;
           }
          }
           }
        .mintw{
          p:nth-child(1){
            color:#000000;
            font-size:.75rem;
            font-weight: 900;
            padding-bottom:1rem;
          }
          p:nth-child(2){
            color:#111;
            font-size:1rem;
            font-weight: 900;
            padding-bottom:.5rem;
            line-height: 1.4rem;
          }
          p:nth-child(3){
            color:#666;
            font-size:.85rem;
            padding-bottom:.5rem;
            line-height: 1.2rem;
          }
           p:nth-child(4),p:nth-child(5){
            color:#ccc;
            font-size:.65rem;
            padding-bottom:.2rem;
            line-height: 1rem;
          }
        }
        .minhf{
          p:nth-child(1){
            line-height:1rem;
            color:#000000;
            font-size:.8rem;
            padding-bottom:1rem;
          }
          p:nth-child(2){
            color:#000000;
            font-size:.75rem;
            font-weight: 900;
            padding-bottom:1rem;
            line-height:1rem;
             img{
             width:2rem;
             height:2rem;
             border-radius: 50%;
             margin-right:.5rem;
           }
          }
          p:nth-child(3){
            color:#666;
            font-size:.85rem;
            padding-bottom:.5rem;
            line-height: 1.2rem;
          }
        }
     
        .minpl{
          >div{
            span{
             color:#000;
            font-size:.9rem;
            }
            p{
            line-height:1.2rem;
            color:#666;
            font-size:.85rem;
            padding-bottom:1rem;
          }
          }
          >p:nth-child(2){
             img{
             width:2rem;
             height:2rem;
             border-radius: 50%;
             margin-right:.5rem;
           }
            color:#000000;
            font-size:.75rem;
            font-weight: 900;
            padding-bottom:1rem;
          }
          >p:nth-child(3){
            color:#666;
            font-size:.85rem;
            padding-bottom:.5rem;
            line-height: 1.2rem;
          }
        }
       }
       .plxqfoot{
         border-radius: 0 0 1rem 1rem ;
         position: fixed;
         bottom:0;
         width:100%;
         height:6rem;
         background:#fff;
         border-top:1px dashed #E9E9E9;
         textarea{
           width:70%;
           height:2.8rem;
           padding:0 5%;
           margin:.1rem 10%;
           border:1px solid #e0e0e0;
           border-radius: .5rem;
           font-size:.8rem;
           color:#666666;
         }
         span{
           width:100%;
           display:inline-block;
           text-align: center;
            line-height:3rem;
            border-top:1px solid #E9E9E9;
         }
         .footbtn{
           border-top:1px solid #E9E9E9;
           span{
           display:inline-block;
           box-sizing:border-box;
           width:49%;
           height:100%;
            text-align: center;
            line-height:3rem;
         }
         span:nth-child(1){
           border-right:1px solid #ccc;
         }
         }
       }
       .plxqfoott{
         height:3rem;
       }
    }
    }
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
</style>