<template> 
    <div >
        <div class="main-title">项目明细账管理</div>
        <div class="main">
            <div>
                <el-form :model="serchInfo" label-position="right" label-width="100px" >
                    <el-row  >
                        <el-col :span="10">
                            <el-form-item label="凭征日期:">
                                <el-date-picker
                                    v-model="value1"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="起始日期"
                                    end-placeholder="截至日期">
                                </el-date-picker> 
                            </el-form-item>
                        </el-col> 
                        <el-col :span="8">
                            <el-form-item label="凭证编号:">
                                <el-input v-model="serchInfo.documentNumber" placeholder="请输入凭证编号"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="10">
                            <el-form-item label="项目加计扣除年度：" label-width="150px">
                                <el-select style="width:100%" v-model="serchInfo.year" placeholder="请选择年度" clearable>
                                    <el-option label="2022年" value="0"></el-option> 
                                </el-select>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="6">
                            <el-form-item label="二级科目:">
                                <el-input v-model="serchInfo.secondAccount" placeholder="二级科目"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="6">
                            <el-form-item label="三级科目:">
                                <el-input v-model="serchInfo.code" placeholder="三级科目:"></el-input>
                            </el-form-item>
                        </el-col> 
                        <el-col :span="6">
                            <el-button type="primary" @click="getList">搜索</el-button>
                            <el-button type="primary" plain @click="reset">重置</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div> 
            <div>
                <div class="margin-top-bottom-2 flex justify-start">
                    <!-- <el-button type="danger" icon="el-icon-download" class="margin-bottom-2" @click="dowload1">下载项目导入明细账模板</el-button>
                    <el-button type="danger" icon="el-icon-upload2" class="margin-bottom-2" @click="dowload2">按项目导入明细账</el-button>
                    <el-button type="danger" icon="el-icon-download" class="margin-bottom-2" @click="dowload3">下载批量导入明细账模板</el-button> -->
                   <div class=" margin-left-xs margin-right-1">
                    <el-upload 
                      :action="upload.action"  
                      :on-success="handleFileSuccess"
                      :headers="upload.headers"
                      :show-file-list="false" 
                      >
                      <el-button type="danger" icon="el-icon-upload2"    style='height:52px' class="margin-bottom-2 margin-left-sm margin-right-2 padding" >下载项目导入明细账模板</el-button> 
                    </el-upload> 
                   </div> 
<div class=" margin-left-xs margin-right-1">
  <el-upload 
                      :action="upload.action"  
                      :on-success="handleFileSuccess"
                      :headers="upload.headers"
                      :show-file-list="false" 
                      >
                      <el-button type="danger" icon="el-icon-upload2"    style='height:52px' class="margin-bottom-2 margin-left-sm margin-right-2 padding" >下载批量导入明细账模板</el-button> 
                    </el-upload> 
</div>
<div class=" margin-left-xs margin-right-1">
  <el-upload 
                      :action="upload.action"  
                      :on-success="handleFileSuccess"
                      :headers="upload.headers"
                      :show-file-list="false" 
                      >
                      <el-button type="danger" icon="el-icon-upload2"    style='height:52px' class="margin-bottom-2 margin-left-sm margin-right-2 padding" >批量导入明细账</el-button> 
                    </el-upload> 
</div>
<div class=" margin-left-xs margin-right-1">
  <el-upload 
                      :action="upload.action"  
                      :on-success="handleFileSuccess"
                      :headers="upload.headers"
                      :show-file-list="false" 
                      >
                      <el-button type="danger" icon="el-icon-upload2"    style='height:52px' class="margin-bottom-2 margin-left-sm margin-right-2 padding" >批量导入明细账</el-button> 
                    </el-upload> 
</div>               
<div class=" margin-left-xs margin-right-1">
  <el-button type="danger" icon="el-icon-download" class="margin-bottom-2"  style='height:52px'  @click="dowload5">导出列表内的明细账</el-button>
                   
</div>
                  
<div class=" margin-left-xs margin-right-1">
  <el-button type="danger" icon="el-icon-delete" class="margin-bottom-2"  style='height:52px' @click="deleteAll">批星删除明细账 </el-button> 
               
</div>
                   </div>
            </div>   
            <div>
                <el-table 
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection" >
                    </el-table-column>
                    <el-table-column
                    prop="createTime"
                    label="凭证曰期" > 
                    </el-table-column>
                    <el-table-column
                    prop="documentNumber"
                    label="凭证编号" >
                    </el-table-column>
                    <el-table-column
                    prop="firstAccount"
                    label="一级科目" >
                    </el-table-column>
                    <el-table-column
                    prop="secondAccount"
                    label="二级科目" >
                    </el-table-column>
                    <el-table-column
                    prop="direction"
                    label="方向" >
                    </el-table-column>
                    <el-table-column
                    prop="projectYear"
                    label="项目年度" >  
                  </el-table-column>
                    <el-table-column
                    prop="bookAmount"
                    label="账面金额" >
                    </el-table-column>
                    <el-table-column
                    prop="adjustmentAmount"
                    label="调整额" >
                    </el-table-column>
                    <el-table-column
                    prop="actualAmount"
                    label="实际申报金额" >
                    </el-table-column>
                    <el-table-column
                    prop="accountMatching"
                    label="科目匹配情况" >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="操作" >
                    <template slot-scope="scope">
                        <div>
                            <el-button type="text" class="blue" @click="changeMoney(scope.row)">调整金额</el-button>
                            <el-button type="text"  class="red" @click="deleteInfo(scope.row.id)">删除</el-button>
                        </div> 
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog
          title="调整金额"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <div>
            <div> 
              请输入调整金额
            </div>
            <div> 
              <el-input v-model="changeMoneys.adjustmentAmount" :placeholder="'当前调整额为'+changeMoneys.adjustmentAmount"></el-input>
            </div> 
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="changeConfig">确 定</el-button>
          </span>
        </el-dialog>
    </div> 
  </template>   
  <script> 
  import {getList,updateMoney,batchRemove,deleteDetail,Export,templateDownload,ActionsExport} from'@/api/detail'
  import define from '@/utils/define'
  import { getToken } from '@/utils/auth'
  export default {
    data() {
      return {   
        changeMoneys:{
          id:'',
          adjustmentAmount:'',
          bookAmount:''
        },
        dialogVisible:false,
        upload: {
          loading: true,
          action:define.APPURI + "/api/extend/projectDetail/ImportData ",
          headers: { 'Authorization': 'bearer'+ getToken() }
         },
        pageInfo:{
          currentPage:'1',
          pageSize:'10'
        },
        typeNameArr: [],
        tableData: [],
        multipleSelection: [] ,
        typeNamePos: 0,
        storeArr: [],
        storePos: 0,
        feeArr: [],
        feePos: 0,
        value1:[],
        serchInfo:{
            code:'',
            year:'',
        },
        ids:[],
        hoverOrderArr: [],
      };   
    }, 
    mounted() { 
    },
    created(){
      this.getList()
    },
    methods: { 
      handleSelectionChange(e){
        this.ids = e.map((item,i)=>{
          return item.id
        }) 
      },
      changeConfig(){
        updateMoney(this.changeMoneys).then(res=>{  
          if(res.code !=200){
            this.$message.warning(res.msg);
          }
            this.getList() 
            this.dialogVisible = false
            this.restMoneyInfo()
        })
      },
      restMoneyInfo(){
        this.changeMoneys = this.$options.data().changeMoneys
      },
      handleClose(){
        this.dialogVisible=false
        this.restMoneyInfo()
      },
      changeMoney(row){
        Object.keys(this.changeMoneys).forEach(key=>{this.changeMoneys[key]=row[key]})  
        this.dialogVisible = true
      },
      handleFileSuccess(response, file, fileList) {  
      },
      deleteInfo(id){
        deleteDetail(id).then(res=>{
          if(res.code !=200){
            this.$message.warning(res.msg);
          }
          this.getList() 
        })
      },
      dowload1(){},
      dowload2(){},
      dowload3(){ 
        templateDownload().then(res=>{
          // this.ccit.downloadFile(res.data.url,res.data.name)
          this.fileDown(res,'模板.xlsx')  
        })
      },
      dowload4(){},
      dowload5(){
        ActionsExport().then(res=>{ 
          console.log(res)
          this.fileDown(res,'模板.xlsx')  
        })
      },
      deleteAll(){
        if(this.ids.length==0){
          this.$message.warning('请选择数据');
          return
        }
        batchRemove(this.ids).then(res=>{
          if(res.code !=200){
            this.$message.warning(res.msg);
          }
          this.getList() 
        })
      },
      getTime(times){
        console.log(times)
            let time = new Date(times),
                year = time.getFullYear(),
                month = time.getMonth(),
                day = time.getDay()
                return `${year}-${month}-${day}` 
      },
      getList(){
          getList(this.pageInfo).then(res=>{
            console.log(res.data.list )
            this.tableData  = res.data.list 
             this.tableData.map((item,i)=>{
              this.tableData[i].createTime = this.getTime(item.createTime)
              console.log(item.createTime)
            })
          })
        },
      reset(){}
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
  }
  .steps {
    width: 100%;
    height: 100%;
  }
  .main {
    width: 100%;
    height: 100%; 
    padding:2%; 
    background-color: #fff; 
  }
  .main-title {
    font-size: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      padding-left:1% ;
      margin: 2% 0;
      border-left: 3px solid #409EFF;
      text-align: left;
      color: #333333;
      position: relative; 
    }
  </style>