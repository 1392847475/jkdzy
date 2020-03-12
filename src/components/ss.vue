<template>
  <div class="box">
    <div id="header">
      <div class="sk-header1">
        <i class="iconfont icon-fangdajing"></i>
        <form action="javascript:return true;">
          <input @keyup.13="show()" type="search" placeholder="搜索您想问的内容" ref="input1" v-model="inpt"/>
        </form>
        
      </div>
      <div class="sk-header2">
        <router-link :to="'/index'" >
          <span>取消</span>
        </router-link>
      </div>
    </div>

    <div id="section">
        <ul v-if = "list != ''" class="section-list1"  >
          <li v-for="(item , i) in list" :key = "i" v-bind:id = item.id>
            <router-link :to="'/xxiangqing/'+item.id" >
              <h4>{{item.title}}</h4>
              <p v-html="item.content">{{item.content}}</p>

              <div class="listbot">
                <p></p>
                <p>
                  <span>{{item.createtime.slice(0,10)}}</span>
                  
                </p>
              </div>
            </router-link>
          </li>
    </ul>
    <p v-else>暂无数据</p>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import { Toast } from 'mint-ui';
export default {
  name: 'Ss',
  data () {
    return {
     inpt : "",
     list : "",
    }
  },
  mounted(){
    this.inpt = this.$route.params.id

    var base_URL = process.env.API_URL //获取环境变量配置
        var url = base_URL + "/pub/api/question/searchsameques";//查询提示
        var that = this
 console.log("匹配查询")
      axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&keywords=${encodeURI(that.inpt)}`).then(function(data){
                console.log(data)
                        that.list = data.data.data.result
                    }).catch(function(err){
                        console.log(err)
                    })
                    
  },
  methods:{
     show(){
        this.$refs.input1.blur();
        var base_URL = process.env.API_URL //获取环境变量配置
        var url = base_URL + "/pub/api/question/searchsameques";//查询提示
        var that = this
 console.log("匹配查询")
      if(that.inpt != ''){
      axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&keywords=${encodeURI(that.inpt)}`).then(function(data){
                console.log(data)
                        that.list = data.data.data.result
                    }).catch(function(err){
                        console.log(err)
                    })
                    }else{
                      let instance3 = Toast('请输入关键字');
                            setTimeout(() => {
                              instance3.close();
                            }, 800);
                    }
        
     },
  },
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
    border-bottom:1px solid #ccc;
  .sk-header1{
    border:1px solid #CCCCCC;
    float: left;
    height:2rem;
    margin:0 3%;
    background:#fff;
    border-radius: .1rem;
    width:78%;
    i{
     line-height:2rem;
     padding-left:5%;
     font-size:1rem;
    }
    form{
      display: inline-block;
       width:75%;
       height:1.4rem;
      input{
      width:100%;
      height:100%;
      background:#fff;
      margin-bottom:.3rem;
      font-size:.9rem;
    }
    }
    
  }
  .sk-header2{
    overflow: hidden;
    a{
    text-align:right;
    width:15%;
    line-height:2rem;
    font-size:1rem;
    color:#000;
  }
  }
}
#section{
    background:#f2f3f3;
    padding-top:4rem;
    >p{
      color:#999999;
      text-align: center;
      background:#fff;
    }
  }
.section-list1{
    z-index: 9999;
    border-top:1px solid #ccc;
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
</style>