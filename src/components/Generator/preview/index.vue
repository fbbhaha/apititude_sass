<template>
  <el-dialog
    v-bind="$attrs"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    append-to-body
    v-on="$listeners"
    @open="onOpen"
    @close="onClose"
    title="预览"
    :class="['CCIT-dialog', 'CCIT-dialog_center', showType === 'app' ? 'app-preview': '']"
    :width="showType === 'pc' ? formConf.generalWidth : '350px'"
  >
    <parser
      v-if="showType === 'pc'"
      :form-conf="formConf"
      @submit="submitForm"
      :key="key"
      ref="dynamicForm"
    />
    <iframe
      v-else
      width="100%"
      height="100%"
      ref="mainIframe"
      :src="previewUrl"
      frameborder="0"
    ></iframe>
    <div slot="footer">
      <el-button @click="close">{{
        formConf.cancelButtonText || "取 消"
      }}</el-button>
      <el-button type="primary" @click="handelConfirm"
        >{{ formConf.confirmButtonText || "确 定" }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import Parser from "@/components/Generator/parser/Parser";
export default {
  components: { Parser },
  props: ["formData", "showType"],
  data() {
    return {
      key: +new Date(),
      formConf: {},
      previewUrl: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {
      this.key = +new Date();
      this.formConf = this.formData;
      if (this.showType === "app") {
        this.previewUrl = `${this.define.APPURI}/pages/apply/dynamicModel/form?isPreview=1&formTitle=功能预览&token=${this.$store.getters.token}&from=web`;
        this.$nextTick(() => {
          // 使用ref 获取 dom
          const mapFrame = this.$refs["mainIframe"];
          let _this = this;
          if (mapFrame.attachEvent) {
            // 兼容浏览器判断 // iframe的加载完成函数
            mapFrame.attachEvent("onload", function () {
              const iframeWin = mapFrame.contentWindow;
              iframeWin.postMessage(
                {
                  formConf: _this.formConf,
                },
                "*"
              );
            });
          } else {
            mapFrame.onload = function () {
              const iframeWin = mapFrame.contentWindow;
              iframeWin.postMessage(
                {
                  formConf: _this.formConf,
                },
                "*"
              );
            };
          }
        });
      }
    },
    onClose() {},
    close(e) {
      this.$emit("update:visible", false);
    },
    handelConfirm() {
      this.$refs.dynamicForm && this.$refs.dynamicForm.submitForm();
    },
    fillFormData(form, data) {
      const loop = (list) => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          if (item.__vModel__) {
            const val = data[item.__vModel__];
            if (val !== undefined) item.__config__.defaultValue = val;
          }
          if (
            item.__config__ &&
            item.__config__.ccitKey !== "table" &&
            item.__config__.children &&
            Array.isArray(item.__config__.children)
          ) {
            loop(item.__config__.children);
          }
        }
      };
      loop(form.fields);
    },
    submitForm(data, callback) {
      console.log("submitForm提交数据：", data);
      if (callback && typeof callback === "function") {
        callback();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app-preview {
  >>> .el-dialog__body {
    height: 500px !important;
    padding: 0 !important;
    overflow: hidden !important;
  }
}
</style>