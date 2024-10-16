<template>
  <div class="content">
    <div class="main">
      <el-form>
        <div class="table-div">
          <el-row :gutter="1">
            <el-col :span="4">
              <div class="bg-purple-light centent">项目编号</div>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input v-model.trim="infoform.projectno"></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="bg-purple-light centent">项目名称</div>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input v-model.trim="infoform.projectname"></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1" style="margin-top: 1px">
            <el-col :span="4">
              <div class="bg-purple-light centent">项目简称</div>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input
                    v-model.trim="infoform.projectjc"
                    placeholder="【选填】"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="bg-purple-light centent">项目所属企业</div>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input v-model.trim="infoform.projectcomp"></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="1" style="margin-top: 1px">
            <el-col :span="4">
              <div class="bg-purple-light centent">项目负责人</div>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input v-model.trim="infoform.fzname"></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="bg-purple-light centent">联系电话</div>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input v-model.trim="infoform.phone"></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="1">
            <el-col :span="4">
              <div class="bg-purple-light centent">EMAIL</div>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input
                    v-model.trim="infoform.email"
                    placeholder="【选填】"
                  ></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="bg-purple-light centent">研发时间</div>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-date-picker
                    style="width: 100%"
                    v-model="yfyear"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    @change="yearchange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="1">
            <el-col :span="4">
              <div class="bg-purple-light centent">总预算金额（万元）</div>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input v-model.trim="infoform.zamount"></el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <div class="bg-purple-light centent">
                其中财政预算金额（万元）
              </div>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input v-model.trim="infoform.czamount"></el-input>
                </div>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <div class="bg-purple-light centent">其中自筹金额（万元）</div>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-input v-model.trim="infoform.zcamount"></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="1">
            <el-col :span="4">
              <div class="bg-purple-light centent textarea">项目概况</div>
            </el-col>
            <el-col :span="20">
              <div class="bg-purple-light left">
                <el-form-item>
                  <el-input
                    type="textarea"
                    :rows="3"
                    :maxlength="1000"
                    show-word-limit
                    v-model.trim="infoform.projectremark"
                    placeholder="【选填】"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="1">
            <el-col :span="4">
              <div class="bg-purple-light centent textarea">研发内容和目标</div>
            </el-col>
            <el-col :span="20">
              <div class="bg-purple-light left">
                <el-form-item>
                  <el-input
                    type="textarea"
                    :rows="3"
                    :maxlength="500"
                    show-word-limit
                    v-model.trim="infoform.targets"
                    placeholder="【选填】"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="1">
            <el-col :span="4">
              <div class="bg-purple-light centent textarea">
                现有研发条件和工作基础
              </div>
            </el-col>
            <el-col :span="20">
              <div class="bg-purple-light left">
                <el-form-item>
                  <el-input
                    type="textarea"
                    :rows="3"
                    :maxlength="500"
                    show-word-limit
                    v-model.trim="infoform.basics"
                    placeholder="【选填】"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="1" style="margin-top: 20px">
            <el-col :span="4">
              <div class="bg-purple-light centent">申报加计扣除</div>
            </el-col>
            <el-col :span="20">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-checkbox v-model="infoform.sbtype"></el-checkbox>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1" style="margin-top: 1px">
            <el-col :span="4">
              <div class="bg-purple-light centent">研究类别</div>
            </el-col>
            <el-col :span="20">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-radio-group v-model="infoform.categry">
                    <el-radio v-model="infoform.categry" label="0"
                      >基础研究</el-radio
                    >
                    <el-radio v-model="infoform.categry" label="1"
                      >应用研究</el-radio
                    >
                    <el-radio v-model="infoform.categry" label="2"
                      >开发研究</el-radio
                    >
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1" style="margin-top: 1px">
            <el-col :span="4">
              <div class="bg-purple-light centent">项目所处阶段</div>
            </el-col>
            <el-col :span="20">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-radio-group v-model="infoform.stage">
                    <el-radio v-model="infoform.stage" label="0"
                      >研究阶段</el-radio
                    >
                    <el-radio v-model="infoform.stage" label="1"
                      >小式阶段</el-radio
                    >
                    <el-radio v-model="infoform.stage" label="2"
                      >中式阶段</el-radio
                    >
                    <el-radio v-model="infoform.stage" label="3"
                      >试生产阶段</el-radio
                    >
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1" style="margin-top: 1px">
            <el-col :span="4">
              <div class="bg-purple-light centent">领域</div>
            </el-col>
            <el-col :span="20">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-select
                    v-model="infoform.territory"
                    @change="selectchange"
                    style="width: 25%; margin-right: 10px"
                  >
                    <el-option
                      v-for="(item, index) in list1"
                      :value="item.id"
                      :label="item.fullName"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-model="infoform.terrior"
                    @change="selectchangetwo"
                    style="width: 25%; margin-right: 10px"
                  >
                    <el-option
                      v-for="(item, index) in list2"
                      :value="item.id"
                      :label="item.fullName"
                      :key="index"
                    ></el-option>
                  </el-select>
                  <el-select
                    v-if="list3.length > 0"
                    v-model="infoform.terriors"
                    style="width: 25%"
                  >
                    <el-option
                      v-for="(item, index) in list3"
                      :value="item.id"
                      :label="item.fullName"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1" style="margin-top: 1px">
            <el-col :span="4">
              <div class="bg-purple-light centent">项目运行结果</div>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-radio-group v-model="infoform.status">
                    <el-radio v-model="infoform.status" label="0"
                      >未完成</el-radio
                    >
                    <el-radio v-model="infoform.status" label="1"
                      >已完成-研发成功</el-radio
                    >
                    <el-radio v-model="infoform.status" label="2"
                      >已完成-研发失败</el-radio
                    >
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <div class="bg-purple-light centent">项目成功应用状态</div>
            </el-col>
            <el-col :span="7">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-radio-group v-model="infoform.yystatus">
                    <el-radio label="0">未应用</el-radio>
                    <el-radio label="1">稳定应用</el-radio>
                    <el-radio label="2">应用后停用</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1" style="margin-top: 1px">
            <el-col :span="4">
              <div class="bg-purple-light centent">研究开发形式</div>
            </el-col>
            <el-col :span="20">
              <el-form-item>
                <div class="bg-purple-light left">
                  <el-select v-model="infoform.devlopform" style="width: 50%">
                    <el-option
                      v-for="(item, index) in list4"
                      :label="item.lable"
                      :value="item.value"
                      :key="index"
                    ></el-option>
                  </el-select></div
              ></el-form-item>
            </el-col>
          </el-row>
          <div style="margin-top: 20px">
            <el-row :gutter="1" style="margin-top: 1px">
              <el-col :span="6">
                <div class="bg-purple-light centent">
                  上传项目立项决议书：
                  <el-link type="primary">下载链接</el-link>
                </div>
              </el-col>
              <el-col :span="18">
                <el-col :span="6">
                  <div class="bg-purple-light left">
                    <el-upload
                      class="upload-demo"
                      ref="upload1"
                      :headers="headers"
                      :action="action"
                      :limit="5"
                      :on-change="onchange"
                      :file-list="fileList1"
                      :on-exceed="onexceed"
                      :on-success="onsuccess"
                      :auto-upload="false"
                      :show-file-list="false"
                    >
                      <el-button slot="trigger" size="small" type="primary"
                        >选择</el-button
                      >
                      <el-button
                        style="margin-left: 10px"
                        size="small"
                        type="success"
                        @click="submitUpload"
                        >上传</el-button
                      >
                    </el-upload>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="bg-purple-light red text">
                    <span
                      class="bule"
                      v-for="(item, index) in imglist"
                      :key="index"
                    >
                      {{ item.name }}
                    </span>
                    单次上传文件不应超过4M，最多允许上传5个文件，文件类型限定为pdf或者图片
                    <span>
                      <el-button
                        type="danger"
                        @click="imglistdel"
                        class="marginbutton"
                      >
                        删除
                      </el-button>
                    </span>
                  </div>
                </el-col>
              </el-col>
            </el-row>

            <el-row :gutter="1" style="margin-top: 1px">
              <el-col :span="6">
                <div class="bg-purple-light centent">
                  已上传项目立项决议书：
                </div>
              </el-col>
              <el-col :span="18">
                <div class="bg-purple-light left">
                  <template v-if="successimglist.length > 0">
                    <span
                      class="bule hove"
                      v-for="(item, index) in successimglist"
                      :key="index"
                    >
                      {{ item.name }}
                    </span>
                  </template>
                  <template v-else>
                    <span> 无 </span>
                  </template>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="1" style="margin-top: 1px">
              <el-col :span="6">
                <div class="bg-purple-light centent">
                  上传人员清单：
                  <el-link type="primary">下载链接</el-link>
                </div>
              </el-col>
              <el-col :span="18">
                <el-col :span="6">
                  <div class="bg-purple-light left">
                    <el-upload
                      class="upload-demo"
                      ref="upload2"
                      :headers="headers"
                      :action="action"
                      :limit="5"
                      :on-change="onchange2"
                      :file-list="fileList2"
                      :on-success="onsuccess2"
                      :auto-upload="false"
                      :show-file-list="false"
                    >
                      <el-button slot="trigger" size="small" type="primary"
                        >选择</el-button
                      >
                      <el-button
                        style="margin-left: 10px"
                        size="small"
                        type="success"
                        @click="submitUpload2"
                        >上传</el-button
                      >
                    </el-upload>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="bg-purple-light red text">
                    <span
                      class="bule"
                      v-for="(item, index) in imglist2"
                      :key="index"
                    >
                      {{ item.name }}
                    </span>
                    单次上传文件不应超过4M，文件类型限定为excet
                    <span>
                      <el-button
                        type="danger"
                        @click="imglistdel2"
                        class="marginbutton"
                      >
                        删除
                      </el-button>
                    </span>
                  </div>
                </el-col>
              </el-col>
            </el-row>
            <el-row :gutter="1" style="margin-top: 1px">
              <el-col :span="6">
                <div class="bg-purple-light centent">已上传人员清单：</div>
              </el-col>
              <el-col :span="18">
                <div class="bg-purple-light left">
                  <template v-if="successimglist2.length > 0">
                    <span
                      class="bule hove"
                      v-for="(item, index) in successimglist2"
                      :key="index"
                    >
                      {{ item.name }}
                    </span>
                  </template>
                  <template v-else>
                    <span> 无 </span>
                  </template>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-form>
    </div>
    <div class="button">
      <el-button type="warning" @click="SaveForm">保存</el-button>
      <el-button type="warning" @click="reject">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getList, getListTwo, saveproject } from "@/api/ProjectInformation";
import { getToken } from "@/utils/auth";
import { mapGetters } from "vuex"
export default {
      computed: {
    ...mapGetters(['userInfo'])
  },
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      fileList1: [],
      fileList2: [],
      yfyear: [],
      imglist: [],
      imglist2: [],
      successimglist: [],
      successimglist2: [],
      headers: { token: getToken() },
      action: process.env.VUE_APP_BASE_API + "/api/extend/project/uploadFile",
      list4: [
        {
          lable: "自主研发",
          value: "0",
        },
        {
          lable: "委托研发",
          value: "1",
        },
        {
          lable: "合作研发",
          value: "2",
        },
        {
          lable: "集中研发",
          value: "3",
        },
      ],
      infoform: {
        projectname: "",
        projectcomp: "",
        fzname: "",
        phone: "",
        email: "",
        yfsdate: "",
        zamount: "",
        czamount: "",
        zcamount: "",
        projectno: "",
        projectjc: "",
        yfedate: "",
        projectremark: "",
        targets: "",
        sbtype: true,
        basics: "",
        categry: "0",
        stage: "0",
        territory: "",
        terrior: "",
        terriors: "",
        status: "0",
        yystatus: "0",
        devlopform: "",
        lxfile: "",
        ryfile: "",
        createby: "",
        cteatetime: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onexceed() {
      this.$message.warning("最多上传5个文件");
    },
    yearchange(val) {
      console.log(val);
      this.infoform.yfsdate = val[0];
      this.infoform.yfedate = val[1];
    },
    getList() {
      getList().then((res) => {
        if (res.code == 200) {
          const datareport = res.data.list[0];
          this.list1 = datareport.children;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    imglistdel() {
      this.imglist = [];
      this.fileList1 = [];
    },
    onchange(file, fileList) {
      this.imglist = fileList;
      this.fileList1 = fileList;
    },
    selectchange(val) {
      let ids = this.infoform.territory;
      this.infoform.terrior = "";
      let list = this.list1.filter((item, index) => {
        return item.id == ids;
      });
      this.list2 = list[0].children;
    },
    selectchangetwo(val) {
      const id = this.infoform.terrior;
      this.infoform.terriors = "";
      getListTwo(id).then((res) => {
        if (res.code == 200) {
          this.list3 = res.data.list;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    onsuccess(response, file, fileList) {
      this.fileList1 = fileList;
      this.successimglist = fileList;
      this.imglist = [];
    },

    imglistdel2() {
      this.imglist2 = [];
      this.fileList2 = [];
    },
    onchange2(file, fileList) {
      this.imglist2 = fileList;
      this.fileList2 = fileList;
    },

    onsuccess2(response, file, fileList) {
      this.fileList2 = fileList;
      this.successimglist2 = fileList;
      this.imglist2 = [];
    },

    submitUpload() {
      if (this.fileList1.length == 0) {
        this.$message.warning("请先选择要上传的文件");
      } else {
        this.$refs.upload1.submit();
      }
    },
    submitUpload2() {
      if (this.fileList2.length == 0) {
        this.$message.warning("请先选择要上传的文件");
      } else {
        this.$refs.upload2.submit();
      }
    },
    reject() {
      this.$emit("reject");
    },
    SaveForm() {
      let from = this.infoform;
     

      from.lxfile = this.successimglist[0]?this.successimglist[0].name:'';
      from.ryfile = this.successimglist2[0]?this.successimglist2[0].name:'';
      from.createby = this.userInfo.userId
      saveproject(from).then((res) => {
        if(res.code == 200){
          this.$message.success('保存成功')
          this.reject()
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  .main {
    padding: 20px 10px;
  }
  .table-div {
    font-size: 12px;

    .centent {
      text-align: center;
    }
    .left {
      padding-left: 10px;
    }
    .red {
      color: red;
    }
  }
  .bg-purple-light {
    width: 100%;
    line-height: 46px;
    background: #e5e9f2;
    padding: 0 5px;
  }
}
.el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.textarea {
  height: 70.5px;
  line-height: 70.5px !important;
}
.button {
  width: 100%;
  padding: 10px;
  background: #0f8cf2;
  text-align: right;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 0px;
}
.text {
  font-size: 12px !important;
}
.bule {
  color: #0f8cf2;
  font-size: 12px;
  margin: 0 10px;
}
.hove {
  position: relative;
  cursor: pointer;
  &:hover {
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      left: 50%;
      transform: translateX(-50%);
      bottom: -14px;
      background: #0f8cf2;
    }
  }
}
.marginbutton {
  margin-left: 20px;
}
::v-deep .el-radio, .el-radio--medium.is-bordered .el-radio__label{
  font-size: 12px;
}
::v-deep .el-radio__label{
  font-size: 12px;
}
</style>