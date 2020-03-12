<template>
  <div class="wszl">
    <div id="header">
      <span @click="fanhui()">取消</span>
      <span>完善我的资料</span>
      <span  @click="tijiao()" v-if = "tiwen !=false">提交</span>
      <span v-else>提交</span>
    </div>
    <div id="section">
      <div class="tx">
         <input type="file" name="" id="file" @change="upfile($event)" accept="image/*" >
        <span>头像</span>
        <img v-if="fileresult==''" v-bind:src="list.headportrait" alt="">
        <img v-else v-bind:src="fileresult" alt="">
      </div>

      <div class="jj">
        <div class="tjbk" @click="bankuai()">
        <p><span>添加板块</span></p>
        <p class="iconfont icon-jinru"></p>
      </div>
      <div class="tjbq" @click="biaoqian()">
        <p><span>添加标签</span></p>
        <p class="iconfont icon-jinru"></p>
      </div>
        <div>
          <span>昵称</span>
          <input type="text" placeholder="请输入..."  maxlength="8" v-model="name" >
        </div>
        <div class="jj2">
          <h3>简介</h3>
          <textarea name="" id="text1" placeholder="请输入...(1-40字)" maxlength="40" v-model="introduce"></textarea>
        </div>
        <div @click="actionSheet()">
          <span>性别</span>
          <span>{{xingbie}}</span>
          
        </div>
        <div @click="skpicker()">
          <span>所在地区</span>
          
          <p class="diqvvx">{{valuesss}}</p>
        </div>
      </div>
      <div class="gz">
        <div>
          <span>单位</span>
           <input type="text" placeholder="请输入..." v-model="unit">
        </div>
        <div>
          <span>部门</span>
           <input type="text" placeholder="请输入..." v-model="department">
        </div>
        <!-- <div>
          <span>职称</span>
           <input type="text" placeholder="请输入..." v-model="title">
        </div> -->
        <div>
          <span>联系方式</span>
           <input type="text" placeholder="请输入..." v-model="phone">
        </div>
        <!-- <router-link to="/bdsj" tag="div">
          <span>联系方式</span>
           <span>{{phone}}</span>
        </router-link> -->
      </div>
    </div>
    <div class="diqvv" v-if = "pickerrr">
        <div class="skdiqv" @click="skdiqvv()"></div>
        <div class="wancheng">
          <span @click="skdiqvv()">清空</span>
          <span @click="skquerenn()">确认</span>
        </div>
        <div class="picker" >
          <ul >
            <li v-for="(item,i) in list2" :key='i'  :class="{'color':item.sshow===true}" :dataid="item.id" :code="item.dictionaryCode" @click="sbiaoqian($event,i,item)">{{item.name}}</li>
          </ul>
        </div>
      </div>
    <!-- 地区选择 -->
      <div class="diqv" v-if = "pickerr">
        <div class="skdiqv" @click="skdiqv()"></div>
        <div class="wancheng">
          <span @click="skdiqv()">取消</span>
          <span @click="skqueren()">确认</span>
        </div>
      <mt-picker :slots="slots" value-key="name" class="picker" @change="onValuesChange"></mt-picker>
      </div>
      <!-- 性别选择弹出层 -->
    <mt-actionsheet
  :actions="actions"
  v-model="sheetVisible">
</mt-actionsheet>
  </div>
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs'
import { Actionsheet,Picker , Indicator,Toast} from 'mint-ui';
import {myaddress} from '../assets/js/address.js' ;
Vue.component(Actionsheet.name, Actionsheet,Picker.name, Picker);
export default {
  name: 'Wszl',
  
  data () {
    return {
      list:[],
      list2:[],
      pickerr : false,
      pickerrr : false,
      valuess : [],
      valuesss : "",
      name:"",
      introduce:"",
      unit:"",
      department:"",
      // title:"",
      phone:"",
      strr : "",
      strr2 : "",
      labels : "",
      plates : "",
      fileresult : "",
      tiwen : true,
      actions:[{
        name:"男",
        method:this.getnan
      },{
        name:"女",
        method:this.getnv
      }],
      sheetVisible:false,
      xingbie:"男",
      slots: [
        {
          flex: 1,
          values: myaddress,
          defaultIndex: 0,
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: myaddress[0].children,
          defaultIndex: 0,
          className: 'slot3',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: myaddress[0].children[0].children,
          defaultIndex: 0,
          className: 'slot5',
          textAlign: 'center'
        }
      ]
     }
  },
  mounted(){
    var base_URL = process.env.API_URL //获取环境变量配置
    var url = base_URL + "/pub/api/info/userinfo";
   var that = this
    axios.post(url+'?wechatid='+sessionStorage.getItem('skopenid')).then(function(data){
      console.log(data)
      if(data.data.code == 100){
        
        that.list = data.data.data.result
        that.name = that.list.nickname
        that.unit = that.list.unit 
        that.department  = that.list.department
        // that.title = that.list.certlevel
        that.phone =  that.list.phone
         that.valuesss = that.list.position
         that.introduce = that.list.signature
         that.xingbie = that.list.sex
         if(that.list.label != '' && that.list.label != undefined){
           that.strr2 = that.list.label+'|'
         }
         if(that.list.plate != '' && that.list.plate != undefined){
           that.strr = that.list.plate+'|'
         }
         if(that.list.headportrait.length < 50){
            that.list.headportrait = base_URL+that.list.headportrait
         }
        
         console.log(that.strr,that.strr2)
        }else if(data.data.code == 400){
        console.log(data.data.data.result)
      }
    }).catch(function(){

    })
  },
  watch:{
      name(a,b){
        
      },
      introduce(a,b){

      },
      unit(a,b){

      },
      department(a,b){

      },
      // title(a,b){

      // },
     
  },
methods:{
      fanhui(){
        this.$router.go(-1)
      },
      actionSheet(){
        this.sheetVisible = true;
      },
      getnan(){
        this.xingbie = "男"
      },
      getnv(){
        this.xingbie = "女"
      },
       skpicker(){
       this.pickerr = true;
   },
      skdiqv(){
    this.pickerr = false;
      },
       skqueren(){
         this.valuesss = this.valuess
          this.pickerr = false;
      },
      bankuai(){//板块
         var base_URL = process.env.API_URL //获取环境变量配置
          var url = base_URL + "/pub/api/info/datadic";
       this.pickerrr = true;
       var that = this;
        axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&dictype=platecode`).then(function(data){
            for(var a=0 ;a<data.data.data.result.length;a++){
                    data.data.data.result[a].sshow = false
                  }
                  that.list2 = data.data.data.result
                  console.log(that.list2)
                  for(var i=0;i<that.list2.length;i++){
                   if(that.strr.indexOf(that.list2[i].id)  != -1){
                     console.log("111")
                      that.list2[i].sshow = true;
                    }
                  }
                 
              }).catch(function(err){
                  console.log(err)
              })

   },
   biaoqian(){ //标签
      var base_URL = process.env.API_URL //获取环境变量配置
          var url = base_URL + "/pub/api/info/datadic";
       this.pickerrr = true;
       var that = this;
    axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&dictype=labelcode`).then(function(data){
                 for(var a=0 ;a<data.data.data.result.length;a++){
                    data.data.data.result[a].sshow = false
                  }
                  that.list2 = data.data.data.result
                  for(var i=0;i<that.list2.length;i++){
                    if(that.strr2.indexOf(that.list2[i].id)  != -1){
                      that.list2[i].sshow = true;
                    }
                  }
              }).catch(function(err){
                  console.log(err)
              })
   },
   skdiqvv(){
        this.strr = "",
        this.strr2 = "",
        this.pickerrr = false;
      },
      skquerenn(){
         this.pickerrr = false;
      },
     //双击取消选择
      sbiaoqian(event,i,item){
        item.sshow = !item.sshow;
        var el = event.target;
          if(item.dictionaryCode == "0001"){
          if(item.sshow == true){
          if(this.strr.indexOf(el.getAttribute("dataid")) == -1)
          this.strr += el.getAttribute("dataid")+"|"
        }else if(this.strr.indexOf(el.getAttribute("dataid")+"|") != -1){
          this.strr =  this.strr.replace(el.getAttribute('dataid')+"|","")
         }
        }else if(item.dictionaryCode == "0002"){
          if(item.sshow == true){
          if(this.strr2.indexOf(el.getAttribute("dataid")) == -1)
          this.strr2 += el.getAttribute("dataid")+"|"
        }else if(this.strr2.indexOf(el.getAttribute("dataid")+"|") != -1){
          this.strr2 =  this.strr2.replace(el.getAttribute('dataid')+"|","")
         }
        }
         console.log(this.strr,this.strr2)
        
          },
          upfile($event){
        let that = this
        let file = $event.target.files[0]
        console.log(file)
        if(file.size > 1024 * 1024 * 3){
           let instance3 = Toast('图片大小超过3M,请手动压缩后再次尝试');
              setTimeout(() => {
                 instance3.close();
               }, 1500);
        }else{
             let fd = new FormData();
        fd.append('file',file)
        let rd = new FileReader() //转base64
        rd.readAsDataURL(file)
        rd.onloadend = function(e){
         that.fileresult = this.result
        }
        console.log(fd)
        axios.defaults.withCredentials = true
         let instance = Toast('提交中。。。');
          var base_URL = process.env.API_URL //获取环境变量配置
           var url = base_URL + "/pub/api/info/headportrait";
				axios({
					method: 'post',
					headers: {
						'Content-Type': 'multipart/form-data'
					},
					url: url+'?wechatid='+sessionStorage.getItem('skopenid'),
					data: fd
				}).then(function(res) {
          
              console.log(res)
          if(res.data.code==100){
             instance.close();
              let instance2 = Toast('上传成功');
           }
				}).catch(function(error) {
					console.log(error);
				})
        }
      },
      tijiao(){
        var that = this
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(that.phone)&&that.phone != undefined&&that.phone != ""){
            let instance = Toast('请输入正确的手机');
              
              setTimeout(() => {
                instance.close();
               }, 600);
         }else if(that.name == ""){
            let instance = Toast('昵称不能为空');
              setTimeout(() => {
                instance.close();
               }, 600);
         }else{
             //去除字符串最后一个 “|”
            if(that.strr != ""){
              that.strr = that.strr.slice(0,that.strr.length-1)
              }

            if(that.strr2 != ""){
            that.strr2 = that.strr2.slice(0,that.strr2.length-1)
            }
              var beanjson = {
              "nickname" : that.name ,
              "gender" : that.xingbie,
              "unit" : that.unit,
              "department" :that.department,
              // "certlevel" : that.title,
              "position": that.valuesss,
               "sex" : that.xingbie,
               "signature" : that.introduce,
               "phone" : that.phone,
               "plate" : that.strr,
               "label" : that.strr2,
           }
            var base_URL = process.env.API_URL //获取环境变量配置
             var url = base_URL + "/pub/api/info/updateinfo";
           var data = encodeURI(JSON.stringify(beanjson))
                that.tiwen = false;
                axios.post(url,`wechatid=${sessionStorage.getItem('skopenid')}&beanjson=${data}`
                ).then(function(res){
          console.log(res)
          //    Indicator.open({
          //   text: '加载中...',
          //   spinnerType: 'fading-circle'
          // });
            if(res.data.code == 100){
              setTimeout(() => {
                 Indicator.close();
              }, 200);
             
               let instance = Toast('提交成功');
              
              setTimeout(() => {
                instance.close();
                that.$router.go(-1)
              }, 600);
            }
          })
         }
        
      },
         onValuesChange (picker, values) {
          
           this.valuess = values
        var b = '';
        for(var a = 0 ;a<this.valuess.length;a++){
                b += this.valuess[a].name
                if(a<this.valuess.length-1){
                  b = b+"-"
                }
                }
        this.valuess = b
      
      if (!values[0]) {
        this.$nextTick(() => {
          if (this.myAdress) {
            // 赋默认值
          } else {
            picker.setValues([myaddress[0], myaddress[0].children[0], myaddress[0].children[0].children[0]])
          }
        })
      } else {
        picker.setSlotValues(1, values[0].children)
        let town = []
        if (values[1]) {
          town = values[1].children
        }
        picker.setSlotValues(2, town)
      }
    },
   
  },
  
  
}
  
</script>

<style scoped lang="scss">
.diqv{
  width:100%;
  height:100%;
  background:rgba(0,0,0,.5);
  position: fixed;
  top:0;
  .skdiqv{
    width:100%;
    height:60%;
    position:absolute;
    top:0;
  }
  .wancheng{
    width:100%;
    height:2rem;
    background:#fff;
    color:red;
    font-size:.9rem;
    position:absolute;
    bottom:30%;
    border-bottom:1px solid #ddd;
    span{
      display:inline-block;
      width:47%;
      text-align: center;
      line-height:2rem;
    }

  }
  .picker{
    width:100%;
    height:30%;
    background:#fff;
    position:absolute;
    bottom:0;
  }
}
  .wszl{
    height:100%;
    background:#F2F2F2;
  }
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
     color:#666666;
    }
    span:nth-child(2){
      flex:1;
      text-align:center;
      font-weight:900;
      color:#333333;
      font-size:1.2rem;
    }
    span:nth-child(3){
     color:#22AC38;
    }
  }
  #section{
    div{
      background:#fff;
      
      overflow: hidden;
    }
    .tx{
       padding:.5rem .8rem;
      margin:.6rem 0;
   
      span{
        float:left;
        color:#333333;
        font-size:1.1rem;
        line-height:4rem;
      }
      img{
        float:right;
        width:4rem;
        height:4rem;
        border-radius:50%;
      }
       #file{
      position:absolute;
      width:100%;
      height:5rem;
      top:3.6rem;
      left:0;
      opacity: 0;
    }
    }
    .jj{
      margin-bottom:.8rem;
      >div{
         padding:.8rem .8rem;
        border-top:1px solid #CCCCCC;
        
         >span:nth-child(1){
          color:#333333;
          font-size:1.1rem;
          float:left;
        }
         >span:nth-child(2){
          color:#666666;
          font-size:1rem;
          float:right;
        }
         >input{
           height:1.1rem;
           width:30%;
         font-size:1rem;
          float:right;
          text-align : right;
        }
        p{
          float:right;
           color:#666666;
          font-size:1rem;
          span{
            padding-left:2rem;
          }
        }
      }
      >div:nth-child(1){
        border:none;
      }
      .tjbk,.tjbq{
    
    border-top:1px solid #E6E6E6;
    border-bottom:1px solid #E6E6E6;
    overflow:hidden;
    p:nth-child(1){
      float:left;
      position: relative;
      
      span{
       padding-left:0;
        font-size:1.2rem;
         color:#333333
      
      }
    }
    p:nth-child(2){
      float:right;
      font-size:1.1rem;
    }
  }
  .tjbq{
    border-bottom:none;
  }
  
      .jj2{
        h3{
          color:#333333;
          font-size:1.1rem;
          line-height:2rem;
        }
        #text1{
          width:100%;
          height:5rem;
          color:#666666;
          font-size:.9rem;
          resize : none;
              }
      }
     
    }
    .diqvvx{
      max-width: 15rem;
      overflow: hidden;
      white-space: nowrap;
text-overflow: ellipsis; /*超出部分用...代替*/
    }
    .gz{
        >div{
         padding:.8rem .8rem;
        border-top:1px solid #CCCCCC;
        >span:nth-child(1){
          color:#333333;
          font-size:1.1rem;
          float:left;
        }
        >span:nth-child(2){
          color:#666666;
          font-size:1rem;
          float:right;
        }
         >input{
          color:#666666;
          font-size:1rem;
          float:right;
          text-align:right;
          height:1rem;
        }
      }
      >div:nth-child(1){
        border:none;
      }
    }
  }
  .diqvv{
  width:100%;
  height:100%;
  background:rgba(0,0,0,.5);
  position: fixed;
  top:0;
  .skdiqv{
    width:100%;
    height:60%;
    position:absolute;
    top:0;
  }
  .wancheng{
    width:100%;
    height:2rem;
    background:#fff;
    color:red;
    font-size:.9rem;
    position:absolute;
    bottom:30%;
    border-bottom:1px solid #ddd;
    span{
      display:inline-block;
      width:47%;
      text-align: center;
      line-height:2rem;
    }
  }
  .picker{
    width:100%;
    height:30%;
    background:#fff;
    position:absolute;
    bottom:0;
    
    ul{
          overflow:hidden;
          li{
            float:left;
            padding:.4rem .4rem;
            background:#DCDCDC;
            color:#666666;
            border-radius:.3rem;
            margin:.5rem;
            margin-right:0;
          }
          .color{
  background:#22AC38;
  color:#fff;
}
        }
  }
}
</style>