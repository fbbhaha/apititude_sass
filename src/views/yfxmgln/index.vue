<template>
  <div class="CCIT-common-layout CCIT-flex-main">
    <div class="CCIT-common-layout-center">
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item :label="$t('common.keyword')">
              <el-input v-model="listQuery.keyword" :placeholder="$t('common.enterKeyword')" clearable
                @change="initData()" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="initData()">
                {{ $t('common.search') }}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{ $t('common.reset') }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="CCIT-common-layout-main CCIT-flex-main">
        <div class="CCIT-common-head">
          <div>
            <el-button type="primary" size="small" @click="batchAdd" icon="el-icon-plus">新增</el-button>
          </div>
          <div class="CCIT-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh CCIT-common-head-icon" :underline="false" @click="initData()" />
            </el-tooltip>
          </div>
        </div>
        <CCIT-table v-loading="listLoading" :data="tableDataList" has-c @selection-change="handleSelectionChange">
          <el-table-column prop="projectName" label="项目名称"  width="180"/>
          <el-table-column prop="projectNo" label="项目编号"  width="160"/>
          <el-table-column prop="projectYear" label="项目年度"/>
          <el-table-column prop="projectType" label="项目类型" />
          <el-table-column prop="projectMember" label="项目人数"  />
          <el-table-column prop="pointType" label="项目节点类型" />
          <el-table-column prop="yearBudget" label="年度预算" />
          <el-table-column prop="createTime" label="创建时间" width="160"/>
          <el-table-column prop="updateTime" label="更新时间" width="160"/>
          <el-table-column prop="operator" label="操作人"  />
          
         
          <el-table-column label="操作" width="250">
            <template slot-scope="scope">
              <el-button slot="reference" type="primary" @click="handlbaseedit(scope.row)">
                立项管理
              </el-button>
              <el-button slot="reference" type="primary" @click="handlprosessit(scope.row)">
                过程管理
              </el-button>
              <el-button slot="reference" type="text"  @click="handlepjedit(scope.row.id)">
                修改
              </el-button>
            </template>
          </el-table-column>
        </CCIT-table>
      </div>
    </div>

    <!-- 添加文件信息 -->
    <el-dialog :title="form.id?'编辑项目信息':'新增项目信息'" :visible.sync="formVisible" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目编号" prop="projectNo">
          <el-input v-model="form.projectNo" placeholder="请输入项目编号" :disabled="form.id"/>
        </el-form-item>
        <el-form-item label="项目类型" prop="projectType">
          <el-input v-model="form.projectType" placeholder="请输入项目类型" />
        </el-form-item>
        <el-form-item label="项目节点类型" prop="pointType">
          <el-input v-model="form.pointType" placeholder="请输入项目节点类型" />
        </el-form-item>
        <el-form-item label="项目年度" prop="projectYear">
          <el-input v-model="form.projectYear" placeholder="请输入项目年度" />
        </el-form-item>
        <el-form-item label="项目人数" prop="projectMember">
          <el-input v-model="form.projectMember" placeholder="请输入项目人数" />
        </el-form-item>
        <el-form-item label="项目年度预算" prop="yearBudget">
          <el-input v-model="form.yearBudget" placeholder="请输入项目年度预算" />
        </el-form-item>
        <el-form-item label="操作人" prop="operator">
          <el-input v-model="form.operator" placeholder="请输入操作人" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <xmglxg v-show="xmformVisible" :projectinfo.sync="projectinfo" ref="Form" @closejcxx="closeadd"  />
    <xmglgc v-show="gcformVisible" :projectinfo.sync="projectinfo" ref="Form" @closexmgc="closexmgc"  />
  </div>
</template>

<script>
import {
  addprojectOverview,
  fileArchivesadd,
  getProjectOverviewInfo,
} from '@/api/yfxmgln/yfxmgln'
import xmglxg from './xmglxg'
import xmglgc from './xmglgc'
export default {
  name: 'Archives',
  components: {xmglxg, xmglgc },
  data() {
    return {
      xmformVisible:false,//打开项目基础信息维护页面
      gcformVisible:false,//打开项目过程维护页面
      isedit: false,//是否修改项目信息
      formVisible: false,//打开项目新增弹框
      tableDataList: [],//项目列表
      listLoading: true,
      projectinfo:{},//项目信息
      listQuery: {
        createTime: "",
        operator: "",
        pointType: "",
        projectMember: "",
        projectName: "",
        projectNo: "",
        projectType: "",
        projectYear: "",
        updateTime: "",
        yearBudget: "",
        currentPage:1,
        endTime:'',
        keyword:'',
        pageSize: 20,
        sidx: "",
        sort: "",
        startTime: "",
      },
      form: {
        id:"",
        createTime: "",
        operator: "",
        pointType: "",
        projectMember: "",
        projectName: "",
        projectNo: "",
        projectType: "",
        projectYear: "",
        updateTime: "",
        yearBudget: ""
      },
      // 表单校验
      rules: {
        // groupRegion: [
        //   { required: true, message: "所属地区不能为空", trigger: "blur" }
        // ],
        // groupVillage: [
        //   { required: true, message: "所属村不能为空", trigger: "blur" }
        // ],
        // name: [
        //   { required: true, message: "姓名不能为空", trigger: "blur" }
        // ],
        // phoneNumber:[{
        //   validator: cheackMobile, trigger: 'blur'
        // }],
        // idNo:[{
        //   validator: cheackIdcard, trigger: 'blur'
        // }],
      }
    }
  },
  created() {
    this.initData()
  },
  methods: {
    closeadd(){
      this.projectinfo ={}
      this.xmformVisible=false
    },
    closexmgc(){
      this.projectinfo ={}
      this.gcformVisible=false
    },
    reset() {
      this.listQuery.keyword = ''
      this.initData()
    },
    initData() {
      this.listLoading = true
      getProjectOverviewInfo(this.listQuery).then(res => {
        this.tableDataList = res.data.list
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {

    },
    batchAdd() {//打开新增弹框
      this.formVisible = true
    },
    handlbaseedit(projectinfo){//项目立项管理
      this.xmformVisible = true
      this.projectinfo = projectinfo
    },
    handlprosessit(projectinfo){//项目过程
      this.gcformVisible = true
      this.projectinfo = projectinfo
    },
    handlepjedit(Id) {
      fileArchivesadd(Id).then(response => {
        if (response.code == 200) {
          this.form = response.data
          this.formVisible = true
          this.isedit = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },
    handleDel(Id) {
      // fileArchivesdelete(Id).then(response => {
      //   if (response.code == 200) {
      //     this.$message({
      //       message: response.msg,
      //       type: 'success',
      //       duration: 1500,
      //     })
      //     this.initData()
      //   } else {
      //     this.$message({
      //       message: response.msg,
      //       type: 'error',
      //       duration: 1500,
      //     })
      //   }

      // });
    },
    cancel() {
      this.formVisible = false;
      this.remodata()
    },
    remodata(){
      this.form = {
        createTime: 0,
        fileName: "",
        filePath: "",
        fileType: "",
        operator: "",
        updateTime: 0,
        uploadTime: "",
        year: ""
      }
    },
    submitForm() {
      addprojectOverview(this.form).then(response => {
          if (response.code == 200) {
            this.$message({
              message: response.msg,
              type: 'success',
              duration: 1500,
            })
            this.formVisible = false
            this.isedit = false
            this.remodata()
            this.initData();
          } else {
            this.$message({
              message: response.msg,
              type: 'error',
              duration: 1500,
            })
          }

        });

    }
  }
}
</script>
