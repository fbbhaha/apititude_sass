<template>
  <div
    class="dashboard-container"
    v-loading="loading"
    :element-loading-text="$t('common.loadingText')"
  >
    <template v-if="!ajaxing">
      <template v-if="portalId">
        <PortalLayout
          :config="formData"
          :portal-style="initStyleForm"
          v-if="type === 0"
          parentComp="dashboard"
        />
        <div class="custom-page" v-if="type === 1">
          <component :is="currentView" v-if="linkType == 0" />
          <embed
            :src="url"
            width="100%"
            height="100%"
            type="text/html"
            v-if="linkType == 1"
          />
        </div>
      </template>
      <div class="portal-layout-nodata" v-else>
        <img
          src="@/assets/images/dashboard-nodata.png"
          alt=""
          class="layout-nodata-img"
        />
        <p class="layout-nodata-txt">暂无数据</p>
      </div>
    </template>
    <Setting ref="Setting" @refresh="refresh" />
    <div v-if="showPortalToolbar === '1'" class="tools">
      <div class="arrow">
        <i class="el-icon-arrow-left"></i>
      </div>
      <span title="切换门户">
        <el-button
          class="btn"
          icon="el-icon-setting"
          @click="$refs.Setting.init(portalId)"
        ></el-button>
      </span>
      <span title="修改工作台">
        <el-button
          class="btn"
          :disabled="btnDisabled"
          icon="el-icon-edit-outline"
          @click="designerVisible = true"
        ></el-button
      ></span>
      <span title="恢复默认">
        <el-button
          class="btn"
          :disabled="btnDisabled"
          icon="el-icon-refresh"
          @click="recover"
        ></el-button
      ></span>
    </div>
    <Designer
      v-if="designerVisible"
      :formData="formData"
      @close="designerVisible = false"
      @on-submit="getData"
    ></Designer>
  </div>
</template>

<script>
import {
  getAuthPortal,
  updateUserPortal,
  recover,
  getPortalSelector,
  getPortalInfo,
} from "@/api/onlineDev/portal";
import Setting from "./Setting";
import Designer from "./Designer";
import PortalLayout from "@/components/VisualPortal/Layout";
import { mapState, mapGetters } from "vuex";
export default {
  name: "dashboard",
  components: { Setting, PortalLayout, Designer },
  data() {
    return {
      portalId: "",
      ajaxing: true,
      loading: false,
      formData: {},
      initFormData: "", //初始化的表单数据
      initStyleForm: {},
      updateMark: false,
      showToolBar: false,
      designerVisible: false,
      type: null,
      linkType: null,
      currentView: null,
      url: "",
    };
  },
  computed: {
    ...mapState({
      showPortalToolbar: (state) => state.settings.showPortalToolbar,
      layoutType: (state) => state.settings.layoutType,
    }),
    ...mapGetters(["userInfo"]),
    btnDisabled() {
      return this.portalId == "" || this.type === 1;
    },
  },
  created() {
    if (this.userInfo.portalId) {
      this.portalId = this.userInfo.portalId;
      this.getData();
    } else {
      getPortalSelector(0)
        .then((res) => {
          if (res.data.list.length) {
            if (res.data.list[0].children.length) {
              this.portalId = res.data.list[0].children[0].id;
              this.getData();
            }
          }
        })
        .catch(() => {});
    }
  },
  methods: {
    getData() {
      this.loading = true;
      this.formData = {};
      if (!this.portalId) {
        this.loading = false;
        this.ajaxing = false;
        return;
      }
      getAuthPortal(this.portalId)
        .then((res) => {
          this.type = res.data.type || 0;
          this.linkType = res.data.linkType || 0;
          this.url = res.data.customUrl;
          if (res.data) {
            if (res.data.type === 1) {
              if (res.data.customUrl && res.data.customUrl !== 1) {
                this.currentView = (resolve) =>
                  require([`@/views/${res.data.customUrl}`], resolve);
              }
            } else {
              if (res.data.formData) {
                let formData = JSON.parse(res.data.formData);
                this.layout = formData.layout || [];
                if (res.data.updateMark) {
                  this.$alert(
                    "系统管理员已修改了该门户, 将同步更新页面！",
                    "提示",
                    {
                      confirmButtonText: "确定",
                      callback: () => {
                        recover(this.portalId)
                          .then((res) => {
                            this.$message({
                              message: res.msg,
                              type: "success",
                              duration: 1500,
                            });
                            this.getData();
                          })
                          .catch((err) => {});
                      },
                    }
                  );
                } else {
                  this.formData = JSON.parse(res.data.formData);
                  if (!this.formData.layout) {
                    this.$set(this.formData, "layout", []);
                  }
                  let { layout, layoutBg, layouyId, ...styleForm } =
                    this.formData;
                  this.initStyleForm = styleForm;
                  this.initFormData = res.data.formData;
                }
              }
            }
          }
          this.ajaxing = false;
          setTimeout(() => {
            this.loading = false;
          }, 500);
        })
        .catch(() => {
          this.loading = false;
          this.ajaxing = false;
        });
    },
    refresh(id) {
      if (!id) return;
      this.portalId = id;
      this.getData();
    },
    recover() {
      this.$confirm("确定恢复为默认门户吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          recover(this.portalId)
            .then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1500,
              });
              this.getData();
            })
            .catch((err) => {});
        })
        .catch(() => {});
    },
    submit() {
      let _formData = JSON.stringify(this.formData);
      updateUserPortal(this.portalId, {
        formData: _formData,
      })
        .then((res) => {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 1500,
          });
        })
        .catch(() => {});
    },
    restore() {
      this.$confirm("确定还原当前所有修改吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.formData = JSON.parse(this.initFormData);
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #ebeef5;
  .custom-page {
    width: 100%;
    height: 100%;
  }
  .toolbar {
    background-color: #f4f4f5;
    color: #909399;
    height: 30px;
    margin-bottom: 10px;
    .close-btn {
      position: absolute;
      top: 8px;
      right: 15px;
      cursor: pointer;
    }
  }
  .tools {
    transition: width 0.5s;
    width: 40px;
    height: 40px;
    position: absolute;
    right: -10px;
    top: 50%;
    transform: translate(0, -50%);
    display: flex;
    border-radius: 20px 0 0 20px;
    background-color: #1890ff;
    overflow: hidden;
    .arrow {
      font-size: 20px;
      font-weight: 580;
      color: #fff;
      width: 40px;
      text-align: center;
      height: 40px;
      line-height: 40px;
    }
    .btn {
      display: none;
      height: 100%;
      background-color: transparent;
      border: none;
      color: #fff;
      font-size: 20px;
    }
  }
  .tools:hover {
    width: 200px;
    .btn {
      display: block;
    }
  }
  // >>> .vue-grid-layout {
  //   margin: -10px;
  // }
}
</style>