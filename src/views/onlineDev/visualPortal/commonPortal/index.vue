<template>
  <div class="CCIT-common-layout">
    <div class="CCIT-common-layout-center">
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input
                v-model="query.keyword"
                placeholder="请输入关键词查询"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{ $t("common.search") }}</el-button
              >
              <el-button icon="el-icon-refresh-right" @click="reset()"
                >{{ $t("common.reset") }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="CCIT-common-layout-main CCIT-flex-main">
        <div class="CCIT-common-head">
          <div>
            <topOpts @add="dialogVisible=true" addText="新建门户">
            <upload-btn url="/api/visualdev/Portal/Model/Actions/ImportData"
              @on-success="initData" />
          </topOpts>
            <el-upload
              style="display: inline-block"
              :action="define.comUrl + '/api/visualdev/Portal/import'"
              multiple
              :show-file-list="false"
              :on-success="importSuccess"
              :headers="uploadHeaders"
            >
              <el-button
                v-has="'btn_import'"
                type="primary"
                icon="el-icon-upload2"
              >
                导入门户
              </el-button>
            </el-upload>
          </div>
          <div class="CCIT-common-head-right">
            <el-tooltip
              effect="dark"
              :content="$t('common.refresh')"
              placement="top"
            >
              <el-link
                icon="icon-ym icon-ym-Refresh CCIT-common-head-icon"
                :underline="false"
                @click="reset()"
              />
            </el-tooltip>
            <screenfull />
          </div>
        </div>
        <CCIT-table
          v-loading="listLoading"
          :data="listAll"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: '' }"
          default-expand-all
        >
          <el-table-column
            prop="fullName"
            label="名称"
            show-overflow-tooltip
            width="200"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.top" style="font-weight: bold"
                >{{ scope.row.fullName }}【{{ scope.row.count }}】</span
              >
              <span v-else>{{ scope.row.fullName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="enCode"
            label="编码"
            width="200"
          >
            <template slot-scope="scope" v-if="!scope.row.top">{{
              scope.row.enCode
            }}</template>
          </el-table-column>
          <el-table-column
            label="状态"
            width="70"
            align="center"
          >
            <template slot-scope="scope" v-if="!scope.row.top">
              <el-tag
                :type="scope.row.enabledMark == 1 ? 'success' : 'danger'"
                disable-transitions
              >
                {{ scope.row.enabledMark == 1 ? "正常" : "停用" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="creatorUser"
            label="创建人"
            width="120"
          />
          <el-table-column
            prop="creatorTime"
            label="创建时间"
            :formatter="ccit.tableDateFormat"
            width="120"
          />
          <el-table-column
            prop="lastmodifyuser"
            label="最后修改人"
            width="120"
          />
          <el-table-column
            prop="lastmodifytime"
            label="最后修改时间"
            :formatter="ccit.tableDateFormat"
            width="120"
          />
          <el-table-column
            prop="description"
            label="说明"
            show-overflow-tooltip
          />
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope" v-if="!scope.row.top">
              <tableOpts
                @edit="addOrUpdateHandle(scope.row.type, scope.row.id)"
                @del="handleDel(scope.$index, scope.row.id)"
              >
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini"
                      >{{ $t("common.moreBtn")
                      }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      @click.native="copy(scope.row.id)"
                      >复制
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="preview(scope.row)"
                    >
                      预览</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="distribute(scope.row.id)"
                      >权限分配</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="exportHandle(scope.row.id)"
                      >导出门户</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </CCIT-table>
      </div>
    </div>
    <Form
      v-if="formVisible"
      ref="form"
      @close="closeForm"
    />
    <Form1 v-if="form1Visible" ref="form1" @close="closeForm1" />
    <Preview :visible.sync="commonPreviewVisible" :portalId="portalId" />
    <Transfer ref="transfer" :visible.sync="transferShow" :id="transferId" />
    <el-dialog title="新建门户" :visible.sync="dialogVisible"
      class="CCIT-dialog CCIT-dialog_center dialog-add" lock-scroll width="600px">
      <div class="add-main">
        <div class="add-item add-item-sys" @click="addOrUpdateHandle(1)">
          <i class="add-icon icon-ym icon-ym-customUrl"></i>
          <div class="add-txt">
            <p class="add-title">自定义路径</p>
            <p class="add-desc">配置静态页面地址</p>
          </div>
        </div>
        <div class="add-item" @click="addOrUpdateHandle(0)">
          <i class="add-icon icon-ym icon-ym-pageDesign"></i>
          <div class="add-txt">
            <p class="add-title">页面设计</p>
            <p class="add-desc">拖拽生成门户</p>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPortalList,
  Delete,
  Copy,
  exportPortal,
  enablePortal,
} from "@/api/onlineDev/portal";
import Form from "./Form";
import Form1 from './Form1'
import Preview from "./Preview";
import Transfer from "../components/Transfer";
export default {
  name: "commonPortal",
  components: { Form, Form1, Preview, Transfer },
  data() {
    return {
      activeTab: "loginPortal",
      query: { keyword: ""},
      list: [],
      transferId: "",
      dialogVisible: false,
      transferShow: false,
      listLoading: false,
      formVisible: false,
      form1Visible: false,
      categoryList: [],
      listAll: [],
      uploadHeaders: { Authorization: this.$store.getters.token },
      loginPreviewVisible: false,
      commonPreviewVisible: false,
      portalId: "",
    };
  },
  created() {
    this.getDictionaryData();
  },
  methods: {
    search() {
      this.initData();
    },
    reset() {
      this.query.keyword = "";
      this.initData();
    },
    getDictionaryData() {
      this.$store.dispatch("base/getDictionaryData", { sort: 'commonPortalDesigner' }).then((res) => {
        this.categoryList = JSON.parse(JSON.stringify(res));
        this.initData();
      });
    },
    initData() {
      this.listLoading = true;
      getPortalList(this.query).then((res) => {
        this.list = res.data.list;
        this.listAll = JSON.parse(JSON.stringify(this.categoryList));
        for (let i = 0; i < this.listAll.length; i++) {
          let child = this.list.filter(
            (o) => this.listAll[i].id === o.category
          );
          let count = child.length;
          this.$set(this.listAll[i], "children", child);
          this.$set(this.listAll[i], "count", count);
          this.$set(this.listAll[i], "top", true);
        }
        this.listAll = this.listAll.filter((o) => o.children.length);
        this.listLoading = false;
      });
    },
    handleDel(index, id) {
      this.$confirm(this.$t("common.delTip"), this.$t("common.tipTitle"), {
        type: "warning",
      })
        .then(() => {
          Delete(id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1000,
              onClose: () => {
                this.initData();
              },
            });
          });
        })
        .catch(() => {});
    },
    copy(id) {
      this.$confirm("您确定要复制该门户, 是否继续?", "提示", {
        type: "warning",
      })
        .then(() => {
          Copy(id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1000,
              onClose: () => {
                this.initData();
              },
            });
          });
        })
        .catch(() => {});
    },
    preview(row) {
      if (!row.id) return;
      this.portalId = row.id;
      this.commonPreviewVisible = true;
    },
    distribute(id) {
      this.transferId = id;
      this.transferShow = true;
    },
    enablePortal(row) {
      row.enable = row.enable ? 0 : 1;
      if(!row.enabledMark) return
      if (row.enable) {
        let filter = this.list.filter((item) => item.enable);
        if (filter.length === 1) {
          this.$message.warning("登录门户必须有一个为默认登录页!");
          return;
        }
      }
      const txt = row.enable ? "取消" : "启用";
      this.$confirm(`您确定要${txt}当前门户作为默认登录页吗, 是否继续?`, "提示", {
        type: "warning",
      })
        .then(() => {
          enablePortal(row.id).then((res) => {
            this.$message({
              type: "success",
              message: res.msg,
              duration: 1000,
              onClose: () => {
                row.enable = row.enable ? 0 : 1;
                this.initData();
              },
            });
          });
        })
        .catch(() => {});
    },
    addOrUpdateHandle(type, id) {
      this.dialogVisible = false
      const key = type === 1 ? 'form1' : 'form'
      const time = type === 1 && !id ? 300 : 0
      setTimeout(() => {
        this[key + 'Visible'] = true
        this.$nextTick(() => {
          this.$refs[key].init(this.categoryList, id)
        })
      }, time);
    },

    closeForm(isRefresh) {
      this.formVisible = false;
      if (isRefresh) {
        this.query.keyword = "";
        this.initData();
      }
    },
    closeForm1(isRefresh) {
      this.form1Visible = false
      if (isRefresh) {
        this.query.keyword = "";
        this.initData();
      }
    },
    exportHandle(id) {
      exportPortal(id)
        .then((res) => {
          if (!res.data || !res.data.url) return;
          window.location.href = this.define.comUrl + res.data.url;
        })
        .catch((err) => {});
    },
    importSuccess() {
      this.$message.success("导入门户成功!");
      this.initData();
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-add {
  >>> .el-dialog__body {
    padding: 50px 30px !important;
  }
}
.add-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .add-item {
    width: 255px;
    height: 136px;
    background: #eff9ff;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 20px;
    &:hover {
      opacity: 0.9;
    }
    &.add-item-sys {
      background: #f1f5ff;
      .add-icon {
        background: #ccd9ff;
        color: #537eff;
      }
    }
    .add-icon {
      width: 56px;
      height: 56px;
      margin-right: 10px;
      background: #ceeaff;
      border-radius: 10px;
      color: #46adfe;
      flex-shrink: 0;
      font-size: 30px;
      line-height: 56px;
      text-align: center;
    }
    .add-txt {
      height: 56px;
      P {
        line-height: 28px;
      }
      .add-title {
        font-size: 18px;
        font-weight: bold;
      }
      .add-desc {
        color: #8d8989;
        font-size: 12px;
      }
    }
  }
}
</style>