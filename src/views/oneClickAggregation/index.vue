<template>
  <div class="content  ">
    <div class="bg-w">
      <steps :active="active" :infoList="infoList" @changeStep="changeStep"></steps>
    </div>
    <div class="width   padding-left-right-0">
      <CCIT-table :data="tableDataList" has-c v-if="active == 1">
        <el-table-column prop="projectName" label="项目名称" width="180" />
        <el-table-column prop="projectNo" label="项目编号" width="160" />
        <el-table-column prop="projectYear" label="项目年度" />
        <el-table-column label="明细账">
          <template slot-scope="scope">
            <el-button slot="reference" type="primary" @click="openmxz(scope.row)">
              明细账
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="辅助帐汇总">
          <template slot-scope="scope">
            <el-button slot="reference" type="primary" @click="openfzzzb(scope.row)">
              辅助帐汇总
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="优惠明细表">
          <template slot-scope="scope">
            <el-button slot="reference" type="primary" @click="openyhmx(scope.row.id)">
              优惠明细表
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button slot="reference" type="primary" @click="openyjgj(scope.row)">
              一键归集
            </el-button>
          </template>
        </el-table-column>
      </CCIT-table>
      <fzzzbAssistance v-if="active == 2" :datainfo.sync="datainfo"></fzzzbAssistance>
      <RDAssistance v-if="active == 3" :datainfo.sync="datainfo"></RDAssistance>
      <discountList v-if="active == 4" :datainfo.sync="datainfo"></discountList>
    </div>
    <!-- 添加文件信息 -->
    <el-dialog title="一键归集" :visible.sync="formVisible" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目年度" prop="projectType">
          <el-input v-model="form.projectYear" placeholder="请输入项目类型" />
        </el-form-item>
        <el-form-item label="导入明细账">
          <el-upload class="upload-demo" :headers="{ Authorization: $store.getters.token }" :action="fileUrl"
            :on-remove="handleRemove" :limit="1" :on-exceed="handleExceed" :on-success="rwshandleFileSuccess"
            :file-list="xmmxzwj">
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="下载明细模板">
          <el-button type="primary" @click="downloadSubexecl">下载明细模板</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getSumInfo">一键归集</el-button>
        <el-button @click="formVisible = !formVisible">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template> 
<script>
import RDAssistance from './components/R&DAssistance.vue'
import discountList from './components/discountList.vue'
import fzzzbAssistance from './components/fzzzbAssistance.vue'
import steps from './components/step.vue'
import { getProjectInfo, getSumInfo,getCountDetail } from '@/api/Archives/archivesinfo'

export default {
  components: {
    RDAssistance,
    discountList,
    fzzzbAssistance,
    steps
  },
  data() {
    return {
      datainfo: {},
      infoList: [
        {
          title: '一键归集'
        },
        {
          title: '明细账',
        }, {
          title: '辅助帐汇总'
        }, {
          title: '优惠明细表'
        }
      ],
      active: '1',
      formVisible: false,
      xmmxzwj: [],
      fileUrl: process.env.VUE_APP_BASE_API + "/api/extend/projectDetail/CompanyDetailUpload",
      tableDataList: [],
      form: {
        projectName: '',
        projectNo: '',
      }
    };
  },
  mounted() {
    this.initdata()
  },
  created() {
   
  },
  methods: {
    initdata() {
      let _this = this
      getProjectInfo().then(res => {
        _this.tableDataList = res.data

      })
    },
    getSumInfo() {
      let _this = this
      getCountDetail(this.form.projectYear).then(res => {
        let code = res.code
        if (code == 200) {
          // this.$message({
          //   message: '操作成成',
          //   type: 'success',
          //   duration: 1500,
          // })
        }
      })
      getSumInfo(this.form.projectYear).then(res => {
        let code = res.code
        if (code == 200) {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
          })
          this.formVisible=false
        }

      })
    },

    downloadSubexecl() {
      let url = process.env.VUE_APP_BASE_API + '/api/extend/Companysubjectdetailed/downloadSubexecl';
      window.open(url, '_blank');
    },
    changeStep(e) {
      this.active = e
      if(this.active==1){
        this.initdata()
      }
    },
    handleRemove(file, fileList) {//任务书文件移除操作
      this.xmmxzwj = []
    },
    rwshandleFileSuccess(response, file, fileList) { // 文件上传成功处理
      this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
          })
      // this.form.planFilename = response.fullName
      // this.form.planAssignment = response.filePath
      // let parm = {
      //   name:response.fullName,
      //   url:response.filePath
      // }
      // this.xmmxzwj.push(parm)
    },
    openyjgj(parm) {
      this.formVisible = true
      this.form = parm
    },
    openmxz(parm) {
      this.datainfo = parm
      this.active = 2
    },
    openfzzzb(parm) {
      this.datainfo = parm
      this.active = 3
    },
    openyhmx(id) {
      this.active = 4
    }
  }
};
</script>
  
<style lang="scss" scoped>
.bg-w {
  margin-bottom: 30px;
}
</style>