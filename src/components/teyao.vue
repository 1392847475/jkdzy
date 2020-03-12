<template>
    <div class="wdgz">
       <div id="header">
      <span  class="iconfont icon-fanhui" @click="fanhui()"></span>
      <span>特邀问答</span>
      <span @click="tijiao()" v-if = "tiwen !=false">发送</span>
      <span v-else>发送</span>
    </div>
      <div class="nav">
      <ul class="nav-list">
            <li v-for="(item,i) in items" @click="sk_list(i)" :key="i" >
              <span v-bind:class="{redd:i==current}">{{item.select}}</span>
            </li> 
      </ul>
    </div>
    <div id="section">
      <mt-tab-container v-model="active" :swipeable="true">
        <mt-tab-container-item id="1">
        <ul class="section-list1">
          <li  v-for="(item,i) in list" :key="i">
            <router-link :to="'/yhzl/'+item.id">
              <img v-if="item.headportrait.length > 50" v-lazy="item.headportrait" alt="">
              <img v-else v-lazy="base_URL+item.headportrait" alt="">
              </router-link>
            <div>
              <p>{{item.nickname}}</p>
              <p>回答过相似问题</p>
            </div>
                <button  :class="{'color':item.sshow===true}" :key="i" :dataid="item.id"  @click="btn($event,i,item)">邀请</button>

          </li>
        </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul class="section-list2">
            <li v-for="(item,i) in list2" :key="i">
            <router-link  :to="'/yhzl/'+item.id" >
            <img v-if="item.headportrait.length > 50" v-lazy="item.headportrait" alt="">
            <img v-else v-lazy="base_URL+item.headportrait" alt="">
            </router-link>
            <div>
              <p>{{item.nickname}}</p>
              <p v-if="item.unit != undefined">{{item.unit}} | {{item.department}}</p>
            </div>
            <button  :class="{'color':item.sshow===true}" :key="i" :dataid="item.id"  @click="btn($event,i,item)">邀请</button>
          </li>
        </ul>
        </mt-tab-container-item>
       
       
    </mt-tab-container>
    </div>
    </div>
  </template>
  <script>
  import Vue from "vue"
  import axios from "axios";
  import { TabContainer, TabContainerItem ,MessageBox,Lazyload,Toast,Indicator} from 'mint-ui';
  Vue.use(Lazyload);
export default {
  name: 'Teyao',
  data () {
    return {
     active:"1",
     current:0,
     items: [
　　　　　　　　　{select:'推荐'},
　　　　　　　　　{select:'好友'},
　　　　　　　　],
    activee:["1","2"],
    list : [],
    list2 : [],
    qid : "",
    strr : "",
    base_URL : process.env.API_URL,
    tiwen : true,
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
  if(this.$route.params.id != sessionStorage.getItem('skqid')){
    this.qid = this.$route.params.id
  }
  let that = this;
  //获取专家列表
  var base_URL = process.env.API_URL //获取环境变量配置
  var url = base_URL + "/pub/api/info/expertslist";
  var url2 = base_URL + "/pub/api/info/myfous";//我的关注
  axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
            console.log(res)
             if(res.data.code == 100){
               for(var i=0;i<res.data.data.result.list.length;i++){
                 res.data.data.result.list[i].sshow = false;
               }
               that.list = res.data.data.result.list;
             }
          }).catch(function(){

          })

  axios.post(url2,`wechatid=${sessionStorage.getItem('skopenid')}`).then(function(res){
            console.log(res)
             if(res.data.code == 100){
               for(var i=0;i<res.data.data.result.length;i++){
                 res.data.data.result[i].sshow = false;
               }
               that.list2 = res.data.data.result;
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
      tijiao(){
          var that = this;
          if(that.qid != ""){
             var base_URL = process.env.API_URL //获取环境变量配置
          var url = base_URL + "/pub/api/question/invzjquestion";
          if(that.strr != ""){
              that.tiwen = false;
              that.strr = that.strr.slice(0,that.strr.length-1)
              axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&questionid=${that.qid}&userid=${that.strr}`).then(function(res){
            console.log(res)
                if(res.data.code == 100){
                  let instance3 = Toast('提交成功');
                  sessionStorage.setItem('skqid',String(that.qid))
                  setTimeout(() => {
                    instance3.close();
                      that.$router.push({path:'/wode'})
                  }, 600);
                }
              }).catch(function(){

              })
              }else{
                let instance3 = Toast('请选择专家');
                  setTimeout(() => {
                    instance3.close();
                  }, 600);
              }
          }else{
            let instance3 = Toast('请重新提交问题后再进行邀请');
                  setTimeout(() => {
                    instance3.close();
                  }, 1000);
          }
         
      },
      btn(event,i,item){
        console.log(this.list)
         item.sshow = !item.sshow;
        var el = event.target;
        if(item.sshow == true){
          if(this.strr.indexOf(el.getAttribute("dataid")) == -1)
          this.strr += el.getAttribute("dataid")+"|"
        }else if(this.strr.indexOf(el.getAttribute("dataid")+"|") != -1){
          this.strr =  this.strr.replace(el.getAttribute('dataid')+"|","")
         }
        
   console.log(this.strr)

      },
    }
}
</script>

<style scoped lang='scss'>
img[lazy=loading] {
  margin: auto;
  background:#C8C8C8;
}
.wdgz{
  height:100%;
  background:#F0F0F0;
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
      font-weight:900;
      font-size:1.2rem;
     }
   span:nth-child(3){
     padding-right:.2rem;
     color:#22AC38;
    }
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
    position: relative;
    top:6rem;
  }
  .section-list1,.section-list2{
    background:#fff;
    li{
      padding:.8rem;
      border-bottom:1px solid #CCCCCC;
      overflow: hidden;
      position: relative;
      img{
        float: left;
        width:2.7rem;
        height:2.7rem;
        border-radius:50%;
      }
      >div{
        float: left;
        margin-left:.5rem;
          p:nth-child(1){
            color:#000;
            font-size:1rem;
             padding-top:.3rem;
          }
          p:nth-child(2){
            padding-top:.5rem;
            font-size:.8rem;
            color:#666666;
        }
      }
      >button{
        position: absolute;
        right:.5rem;
        top:1.1rem;
        width:4.5rem;
        height:2rem;
        border-radius: .5rem;
        background:#22AC38;
        color:#fff;
        font-size:.8rem;

      }
      .color{
  background:red;
  color:#fff;
}
    }
   }
  
</style>