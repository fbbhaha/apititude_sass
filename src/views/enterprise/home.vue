 <template>
    <div class="dashboard  bg-w">
      <el-row  :gutter="20" class="padding-2" >
        <el-col :span="12"> 
            <div class="flex justify-start align-start  column width border-solid ">
                <div class="flex justify-space-between align-items  padding-2 width border-bottom-solid">
                    <div  class="flex justify-start align-items width-80  ">
                        <div v-for="(item,i) in headList" :key="i" class="font-14 pointer padding-left-2 padding-right-2 border-right text-cente headList" :class="[i == curren?'blue':'black']" @click="changeCurren(i,item.value)">
                            {{item.title}}
                        </div>
                    </div>
                    <div  class="flex justify-end width-20 font-14 black pointer"> 
                        更多
                    </div>
                </div>
                <div class="width padding-2 height-147">
                    <div  v-if="curren!=1" class="line-height">
                        <div v-for="(list,i) in newList" :key="i" class=" padding-bottom-2 hover flex justify-space-between align-items pointer width newsLists " @click="gotoMsg">
                            <div class="black font-14 width-76 overHiden pointer changefont-color-blue">
                                {{list.content}}
                            </div>
                            <div class="grey font-14 width-20 text-cente">
                                {{list.time}}
                            </div>
                        </div>
                    </div> 
                    <div v-else class="padding">
                        <p class="text-left font-14 black line-height">
                            省科技厅为支持小微企业加强研发创新，在全面执行企业研发费用税前加计扣除政策基础上，鼓励有条件的市、县（市、区）对小微企业再按25%研发费用税前加计扣除标准给予奖补，支持小微企业开展研发创新活动。
                        </p>
                        <p class="text-right font-14 black">
                            截止期：2021-12-31
                        </p>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="12"> 
            <div class="flex justify-start align-start  column width border-solid  ">
                <div class="flex justify-space-between align-items  padding-2 width border-bottom-solid">
                    <div  class="flex justify-start align-items width-80 font-14 black"> 
                        企业研发投入
                    </div> 
                </div>
                <div class="width  flex justify-center align-items padding-top-bottom-4 padding-left-right-6 height-147"> 
                    <div class="width-16">
                        <img src="../../assets/images/icon/topRightIcon.png" alt="" class="img">  
                    </div>
                    <div  class="width-80"> 
                        <p class="text-cente black font-18 font-weighwt padding-bottom-2">
                            安徽穹极信息科技有限公司
                        </p>
                        <p class="text-cente black font-14 line-height">
                            税务归口:国家税务总局合肥市高新区税务局
                            <br>
                            科技归口:高新区科技局
                        </p>
                    </div>
                </div>
            </div>
        </el-col>
      </el-row>
      <el-row  class="margin-top-2 mainBg padding-2" :style="backgroundMain"> 
        <el-col :span="24"> 
            <div class="flex justify-start align-start width border-solid">
                <div class="flex justify-start align-start column padding-2 width-20 border-bottom-solid bg-lefts height-270" :style="backgroundLeft">
                    <div class="font-14 white">
                        业务提醒
                    </div>
                    <div class="font-16 white padding-top-24 padding-bottom-14">
                        安徽企业请按时填写企业统计月报
                    </div>
                    <div class="font-14 blue padding bg-w border-radius"> 
                        点击填报
                    </div>
                </div>
                <div class="width-80 bg-w  height-270   flex justify-center align-items padding-top-bottom-2 flex-wrap row padding-left-right-2"> 
                    <div v-for="(list,i) in stepList" @click="gotoPath(list,i+1)" :key="i" class="checkLists flex border-radius-sm padding-2 border-solid border-colo-opcity  margin-bottom-1 justify-space-between align-items  margin-right-2 stepList width-30" >
                        <div class="flex justify-start align-items width-80">
                            <div>
                                <img :src="list.icon" alt="" class="icon">
                            </div>
                            <div class="font-14 font-weighwt margin-left-sm margin-right-2 black">
                                {{list.content}}
                            </div>
                        </div>   
                        <div>
                            <img src="../../assets/images/icon/listGoto.png" alt="" class="icon show">    
                            <img src="../../assets/images/icon/listGoto1.png" alt="" class="icon hiden">    
                        </div>
                    </div>
                </div>
            </div>
        </el-col> 
        <el-col :span="24"> 
            <div class="flex justify-start align-start width border-solid padding-top-bottom-3 "> 
                <div v-for="(list,i) in stepInfo" :key="i" class="hoverStep">
                    <div class="flex justify-center align-items">
                        <img :src="list.icon" alt="" class="step-icon">
                    </div>
                    <div class="flex justify-center align-items relative" style="height:39px">
                        <div class="disc disc-hr margin-top-bottom-2 changeStep"></div>
                    </div>
                    <div class="padding-left-right-4">
                        <p class="text-left black margin-bottom-3 font-15">
                            {{list.title}}
                        </p>
                        <p class="text-left black font-12 line-height">
                            {{list.content}}   
                        </p>
                    </div>
                </div>
            </div>
        </el-col> 
      </el-row> 
    </div>
  </template>
  
  <script> 
  import {noticeList} from '@/api/message'
  export default {
    name: 'Index',
    components: {
    },
    data() {
      return { 
        pageInfo:{
            currentPage:'1',
            pageSize:'3',
            sort:'desc'
        },
        backgroundMain:{
            backgroundImage : 'url(' + require('../../assets/images/bg-backstage.png') + ')',
        },
        backgroundLeft:{
            backgroundImage : 'url(' + require('../../assets/images/leftImgsBg.png') + ')',    
        },
        curren:0,
        headList:[
            {
                title:'加计扣除攻策',
                value:'desc'
            },
            {
                title:'奖补政策',
                value:''
            }
        ],
        newList:[],
        stepList:[
            {
                content:'企业信息维护',
                value:'',
                icon: require('../../assets/images/icon/listIcon.png'),
                path:'/EnterpriseInformation'
            },
            {
                content:'项目信息采集',
                value:'',
                icon: require('../../assets/images/icon/listIcon1.png')
                , path:'/ProjectInformation'
            },  
            {
                content:'项目按年度管理 ',
                value:'',
                icon: require('../../assets/images/icon/listIcon2.png')
                ,path:'/ProjectInformationYear'
            },  
            {
                content:'明细账科目匹配',
                value:'4',
                icon: require('../../assets/images/icon/listIcon3.png')
                , path:'/EnterpriseInformations'
            },  
            {
                content:'项目明细账管理',
                value:'5',
                icon: require('../../assets/images/icon/listIcon4.png')
                , path:'/EnterpriseInformations'
            },    
            {
                content:'研发支出辅助账',
                value:'6',
                icon: require('../../assets/images/icon/listIcon5.png')
                , path:'/EnterpriseInformations'
            },  
            {
                content:'研发辅助帐汇总',
                value:'',
                icon: require('../../assets/images/icon/listIcon6.png') 
                , path:'/EnterpriseInformations'
            },  
            {
                content:'优惠明细表',
                value:'',
                icon: require('../../assets/images/icon/listIcon7.png')
                , path:'/DiscountList'
            },  
            
            {
                content:'异议处理', 
                value:'',
                icon: require('../../assets/images/icon/listIcon8.png')
            },   
        ],
        stepInfo:[
            {
                content:'系统自动提取企业基本信息和归口科技、税务主管部门',
                title:'1、企业信息管理',
                icon: require('../../assets/images/icon/step1.png')
            },
            {
                content:'设置项目年度信息、按年度归集研发支出',
                title:'2、项目信息采集',
                icon: require('../../assets/images/icon/step2.png')
            },
            {
                content:'设置企业财务明细账科目和加计扣除优惠科目之间的对应关系',
                title:'3、项目按年度管理',
                icon: require('../../assets/images/icon/step3.png')
            },
            {
                content:'系统自动采集企业立项的省级科技计划项目、手工添加企业其他自研项目',
                title:'4、明细账科目匹配',
                icon: require('../../assets/images/icon/step4.png')
            },
            {
                content:'将财务明细账导出到模板后，导入到系统中',
                title:'5、项目明细账管理',
                icon: require('../../assets/images/icon/step5.png')
            },
            {
                content:'自动生成研发支出辅助账、辅助账汇总表、优惠明细表',
                title:'6、研发辅助账汇总 ',
                icon: require('../../assets/images/icon/step6.png')
            },
        ]
      }
    },
    computed: {
    },
    created() {
        this.noticeList()
    },
    methods: {
        gotoPath(list,i){
            if(i == 4 ||i == 5||i == 6){
                this.$router.push({path:list.path,query: {num:i}})
            }else{
                this.$router.push(list.path)
            } 
        },
        changeCurren(i,v){
            this.curren = i
            if(v == 'desc') {
                this.noticeList()
            }
        },
        gotoMsg(){
            this.$router.push('/system/notice') 
        },
        noticeList(){
            noticeList().then(res=>{
                if(res.code != 200){
                    this.$message.warning(res.msg);
                }
                this.newList = res.data.list.map((item,i)=>{
                    return {
                        content : item.title,
                        time:item.lastModifyTime? this.getTime(item.lastModifyTime) :'2022-9-20'
                    }
                }) 
            })
        },
        getTime(times){
            let time = new Date(times),
                year = time.getFullYear(),
                month = time.getMonth(),
                day = time.getDay()
                return `${year}-${month}-${day}` 
        }
    }
  }
  </script>
  
  <style lang="scss"> 
  .headList:last-child{
    border: 0;
  } 
  .mainBg{
    background-size: cover;
    background-repeat: no-repeat;
  }
  .bg-lefts{
    background-size: cover;
    background-repeat: no-repeat;
    // height: 240px;
  }
  .stepList:nth-child(3n){
    margin-right: 0;
  } 
  .disc-hr::after{
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 45%;
    height: 1px;
    border:2px dashed #6a7a8e;
  }
  .disc-hr::before{
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 45%;
    height: 1px;
    border: 2px dashed #6a7a8e;
  }
  .hoverStep:hover .changeStep{
    background-color: #0F8CF2;
  }
  .border-colo-opcity{
    color:#0f8cf25e
  }
  .hiden{
    display: none;
  }
  .show{
    display: inline-block;
  } 
  .checkLists:hover .show{
    display: none;
  }
  .checkLists:hover .hiden{
    display: inline-block;
  }
  </style>
  