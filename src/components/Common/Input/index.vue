<template>
  <div class="CommonInput">
    <div class="label">{{ label }}</div>
    <el-form-item :prop="prop">
      <slot></slot>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "CommonInput",
  props: {
    label: String,
    value: [String, Number],
    prop: String
  },
  data() {
    return {};
  },
  computed: {
    inputData: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  components: {}
};
</script>

<style lang="scss">
.CommonInput {
  display: flex;
  height: 43px;
  margin-bottom: 18px;
  .label {
    min-width: 213px;
    height: 100%;
    background: #f5f7fc;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 14px;
    color: #8f9091;
    letter-spacing: 0.22px;
  }
  .el-form-item {
    margin-bottom: unset;
    flex-grow: 1;
    height: 100%;
    .el-form-item__content {
      height: 100%;
    }
  }
  .el-input {
    height: 100%;
    .el-input__inner {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
  .el-textarea {
    height: 100%;

    .el-textarea__inner {
      height: 100%;
    }
  }
  .el-select {
    width: 100%;
    height: 100%;
  }
}
</style>
