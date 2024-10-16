<template>
    <div class="content  ">
        <div class="width   padding-left-right-8">
            <AccountLnitial></AccountLnitial> 
        </div>
    </div>
  </template> 
<script>
import AccountLnitial from './components/AccountLnitial.vue'
  export default {
    data() {
      return {
        active:4,
        infoList:[
            {
              title:'企业信息管理', 
              path:'/EnterpriseInformation'
            },{
              title:'项目信息采集', 
              path:'/ProjectInformation'
            },{
              title:'项目按年度管理', 
              path:'/ProjectInformationYear'
            },{
                title:'明细账科目匹配'
            },{
                title:'项目明细账管理'
            },{
                title:'研发辅助账汇总'
            } 
        ],
        infoform: {
          info: "",
        },
      };
    },
    created(){
      if(this.$route.query.num){
        this.active = this.$route.query.num
      } 
    },
    components:{
        AccountLnitial,
    },
    methods:{
      changeStep(e){ 
        console.log(e)
        if(Number(e) >= 4){ 
          this.active = e
        }else{
          this.infoList.forEach((item,i)=>{
            if(Number(e)-1 == i){ 
              this.$router.push(item.path)
            }
          })
        } 
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
//   .content {
//     width: 100%;
//     height: 100%;
//     background-color: #F5F8FD;
//   }
//   .steps {
//     width: 100%;
//     height: 100%;
//   }
//   .main {
//     width: 100%;
//     height: 100%;
//     padding: 70px 13%;
//     .main-title {
//       font-size: 16px;
//       font-family: Microsoft YaHei, Microsoft YaHei-Bold;
//       font-weight: 700;
//       padding-left:1% ;
//       border-left: 3px solid #409EFF;
//       text-align: left;
//       color: #333333;
//       position: relative; 
//     }
//   }
  </style>