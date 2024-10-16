<template>
  <el-dialog
    v-bind="$attrs"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    v-on="$listeners"
    @open="onOpen"
    fullscreen
    lock-scroll
    class="CCIT-full-dialog"
    :show-close="false"
    :modal="false"
  >
    <div class="CCIT-full-dialog-header">
      <div class="header-title">
        <img src="@/assets/images/ccit.png" class="header-logo" />
        <p class="header-txt">· 门户预览</p>
      </div>
      <div class="options">
        <el-button @click="closeDialog()">{{
          $t("common.cancelButton")
        }}</el-button>
      </div>
    </div>
    <div
      class="main"
      style="padding: 0"
      v-loading="loading"
      :element-loading-text="$t('common.loadingText')"
    >
      <PortalLayout
        :layout="layoutSelf"
        :config="formData"
        :portal-style="initStyleForm"
        mask
        parentComp="preview"
        v-if="type == 0"
      />
      <div class="custom-page" v-else>
        <component :is="currentView" v-if="linkType == 0" />
        <embed
          :src="url"
          width="100%"
          height="100%"
          type="text/html"
          v-if="linkType == 1"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import PortalLayout from "@/components/VisualPortal/Layout";
import { getPortalInfo } from "@/api/onlineDev/portal";
export default {
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
    layout: {
      type: Array,
      default: () => {},
    },
    portalId: {
      type: String,
      default: "",
    },
    portalStyle: {
      type: Object,
      default: () => {},
    },
  },
  components: { PortalLayout },
  data() {
    return {
      formData: {},
      initStyleForm: {},
      loading: false,
      layoutSelf: [],
      layoutBg: "",
      bgColor: "",
      type: 0,
      linkType: 0,
      url: "",
    };
  },
  methods: {
    onOpen() {
      if (JSON.stringify(this.config) !== "{}") {
        this.formData = this.config;
        this.initStyleForm = this.portalStyle;
        return;
      }
      this.loading = true;
      getPortalInfo(this.portalId)
        .then((res) => {
          if (res.data) {
            this.type = res.data.type;
            this.linkType = res.data.linkType || 0;
            this.url = res.data.customUrl;
            if (res.data.type === 1) {
              if (res.data.customUrl && res.data.customUrl !== 1) {
                this.currentView = (resolve) =>
                  require([`@/views/${res.data.customUrl}`], resolve);
              }
            } else {
              if (res.data.formData) {
                this.formData = JSON.parse(res.data.formData);
                let { layout, layoutBg, layouyId, ...styleForm } =
                  this.formData;
                this.initStyleForm = styleForm;
              }
            }
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    closeDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-page {
  width: 100%;
  height: 100%;
}
</style>