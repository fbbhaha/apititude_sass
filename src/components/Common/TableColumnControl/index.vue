<template>
  <div class="TableColumnControl">
    <el-popover placement="bottom" width="200" trigger="click">
      <el-link type="primary" slot="reference" :underline="false"
        >展开<i class="el-icon-arrow-down"></i
      ></el-link>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group
        v-model="checkedArr"
        @change="handleCheckedCitiesChange"
        style="display:flex;flex-direction: column;
    gap: 5px 0;"
      >
        <el-checkbox
          v-for="column in columns"
          :label="column"
          :key="column.name"
          >{{ column.name }}</el-checkbox
        >
      </el-checkbox-group>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "TableColumnControl",
  props: {
    columns: Array
  },
  data() {
    return {
      checkAll: true,
      checkedArr: [],
      isIndeterminate: false
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedArr = val ? this.columns : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.columns.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.columns.length;
    }
  },
  mounted() {
    this.checkedArr = this.columns;
  }
};
</script>

<style scpoed>
.TableColumnControl {
  flex-shrink: 0;
  margin: 0 20px 0 10px;
}
</style>
