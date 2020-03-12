import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index'
// import Xiaoxi from '@/components/xiaoxi'
// import Wode from '@/components/wode'
// import Tiwen from '@/components/tiwen'
// import Huida from '@/components/huida'
// import Xiangqing from '@/components/xiangqing'
// import Tjbq from '@/components/tjbq'
// import Wszl from '@/components/wszl'
// import Bdsj from '@/components/bdsj'
// import Wdgz from '@/components/wdgz'
//  import Wdsc from '@/components/wdsc'
//  import Wdcg from '@/components/wdcg'
//  import Wdhd from '@/components/wdhd'
//  import Wdtw from '@/components/wdtw'
//  import Xxiangqing from "@/components/xxiangqing"
//  import Yhzl from "@/components/yhzl"
//  import Tzxiangqing from "@/components/tzxiangqing"
//  import Swiper from "@/components/swiper"
//  import Tjbk from "@/components/tjbk"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
    },
    {
      path:"/index",
      name: 'Index',
      component:()=> import('@/components/index'),
    },
    {
      path:"/xiaoxi",
      name: 'Xiaoxi',
      component: ()=> import('@/components/xiaoxi'),
    },
    {
      path:"/wode",
      name: 'Wode',
      component: ()=> import('@/components/wode'),
    },
    {
      path:"/tiwen/:id",
      name: 'Tiwen',
      component: ()=> import('@/components/tiwen'),
    },
    {
      path:"/huida/:qid",
      name: 'Huida',
      component: ()=> import('@/components/huida'),
    },
    {
      path:"/xiangqing/:id",
      name: 'Xiangqing',
      component: ()=> import('@/components/xiangqing'),
    },
     {
      path:"/wszl",
      name:"Wszl",
      component:()=> import('@/components/wszl'),
    },
    {
      path:"/bdsj",
      name:"Bdsj",
      component:()=> import('@/components/bdsj'),
    },
      {
        path:"/wdgz",
        name:"Wdgz",
        component:()=> import('@/components/wdgz'),
      },
      {
        path:"/tdgz/:id",
        name:"Tdgz",
        component:()=> import('@/components/tdgz'),
      },
    {
      path:"/wdsc",
      name:"Wdsc",
      component:()=> import('@/components/wdsc'),
    },
    {
      path:"/wdcg",
      name:"Wdcg",
      component:()=> import('@/components/wdcg'),
    },
    {
      path:"/wdhd",
      name:"Wdhd",
      component:()=> import('@/components/wdhd'),
    },
    {
      path:"/wdtw",
      name:"Wdtw",
      component:()=> import('@/components/wdtw'),
    },
    {
      path:"/xxiangqing/:id",
      name:"Xxiangqing",
      component:()=> import('@/components/xxiangqing')
    },
    {
      path:"/yhzl/:id",
      name:"Yhzl",
      component:()=> import('@/components/yhzl')
    },
    {
      path:"/tzxiangqing",
      name:"Tzxiangqing",
      component:()=> import('@/components/tzxiangqing')
    },
    {
      path:"/swiper",
      name:"Swiper",
      component:()=> import('@/components/swiper')
    },
    {
      path:"/jfxq",
      name:"jfxq",
      component:()=> import('@/components/jfxq')
    },
    {
      path:"/refresh",
      name:"refresh",
      component:()=> import('@/components/refresh')
    },
    {
      path:"/teyao/:id",
      name:"Teyao",
      component:()=> import('@/components/teyao')
    },
    {
      path:"/dwhd",
      name:"Dwhd",
      component:()=> import('@/components/dwhd')
    },
    {
      path:"/ss/:id",
      name:"Ss",
      component:()=> import('@/components/ss')
    },
    {
      path:"/yhfk",
      name:"Yhfk",
      component:()=> import('@/components/yhfk')
    },
    {
      path:"/shenhe/:id",
      name:"Shenhe",
      component:()=> import('@/components/shenhe')
    },
  ]
})
