<template>
  <div class="Base">
    <el-form class="formBox">
      <CommonInput label="客户名称" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="关联客户" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="主联系人" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="手机号码" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="客户类型" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="客户来源" :prop="'name'">
        <el-input />
      </CommonInput>

      <CommonInput label="所在省份" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="所在城市" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="工作地址" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="回落公海" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput
        label="备注"
        :prop="'name'"
        style="grid-column: 1 / 3;height:76px"
      >
        <el-input type="textarea" />
      </CommonInput>
    </el-form>
  </div>
</template>

<script>
import CommonInput from "@/components/Common/Input/index.vue";

export default {
  name: "Base",
  data() {
    return {};
  },
  components: { CommonInput }
};
</script>

<style scpoed lang="scss">
.Base {
  .formBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 40px;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
}
</style>
