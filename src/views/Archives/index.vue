<template>
  <div class="CCIT-common-layout CCIT-flex-main">
    <div class="CCIT-common-layout-center">
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item :label="$t('common.keyword')">
              <el-input v-model="listQuery.fileName" :placeholder="$t('common.enterKeyword')" clearable
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
          <el-table-column prop="fileName" label="文件名称" />
          <el-table-column prop="fileType" label="文件类型" width="180" />
          <el-table-column prop="year" label="文件年份" width="180" />
          <el-table-column prop="createTime" label="文件新增时间" width="180" />
          <el-table-column prop="filePath" label="文件路径" />
          <el-table-column label="操作" width="90">
            <template slot-scope="scope">
              <el-button slot="reference" type="text" @click="handleedit(scope.row.id)">
                修改
              </el-button>
              <el-button slot="reference" type="text" class="CCIT-table-delBtn" @click="handleDel(scope.row.id)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </CCIT-table>
      </div>
    </div>

    <!-- 添加文件信息 -->
    <el-dialog title="新增档案库信息" :visible.sync="formVisible" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-form-item label="文件名称" prop="fileName">
          <el-input v-model="form.fileName" placeholder="请输入文件名称" />
        </el-form-item>
        <el-form-item label="文件路径" prop="filePath">
          <el-input v-model="form.filePath" placeholder="请输入文件路径" :disabled="true"/>
        </el-form-item>
        <el-form-item label="文件类型" prop="fileType">
          <el-input v-model="form.fileType" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="文件年份" prop="year">
          <el-input v-model="form.year" placeholder="请输入文件年份" />
        </el-form-item>
        <el-form-item label="上传文件" prop="year">
          <el-upload class="upload-demo" :action="fileUrl" :on-preview="handlePreview" :on-remove="handleRemove"
            :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="handleFileSuccess"
            :file-list="filedata">
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
          <!-- <CCIT-UploadFz v-model="form.planAssignment" @changle="fileuplod" /> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFileList,
  fileArchivesadd,
  fileArchivesupdate,
  fileArchivesinfo,
  fileArchivesdelete
} from '@/api/Archives/archivesinfo'
export default {
  name: 'Archives',
  data() {
    return {
      isedit: false,
      formVisible: false,
      tableDataList: [],
      listLoading: true,
      multipleSelection: [],
      listQuery: {
        createTime: 0,
        fileName: "",
        filePath: "",
        fileType: "",
        operator: "",
        updateTime: 0,
        uploadTime: "",
        year: ""
      },
      fileUrl: process.env.VUE_APP_BASE_API + "/api/system/fileArchives/Uploader",
      filedata: [//文件回显数据
      ],
      form: {
        createTime: 0,
        fileName: "",
        filePath: "",
        fileType: "",
        operator: "",
        updateTime: 0,
        uploadTime: "",
        year: ""
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

    handleFileSuccess(response, file, fileList) { // 文件上传成功处理
      this.form.fileName = response.data.fullName
      this.form.filePath = response.data.filePath
    },
    handleRemove(file, fileList) {//文件移除操作
      console.log(file, fileList);
    },
    handlePreview(file) {//点击文件事件
      console.log(file);
    },
    handleExceed(files, fileList) {//提示限制文件个数
      this.$message.warning(`只允许上传一个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    reset() {
      this.listQuery.fileName = ''
      this.initData()
    },
    initData() {
      this.listLoading = true
      getFileList(this.listQuery).then(res => {
        this.tableDataList = res.data.list
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleSelectionChange(val) {

    },
    batchAdd() {
      this.formVisible = true
    },
    handleedit(Id) {
      fileArchivesinfo(Id).then(response => {
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
      fileArchivesdelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          this.initData()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
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
      if (this.isedit) {
        fileArchivesupdate(this.form).then(response => {
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
      } else {
        fileArchivesadd(this.form).then(response => {
          if (response.code == 200) {
            this.$message({
              message: response.msg,
              type: 'success',
              duration: 1500,
            })
            this.formVisible = false;
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
}
</script>
