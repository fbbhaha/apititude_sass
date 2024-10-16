<template>
  <div class="content">
    <el-row :gutter="5">
      <el-form label-position="left">
        <el-col :span="12">
          <el-form-item label-width="auto" label="加计扣除年度:">
            <el-select v-model="infofrom.yearrepord" @change="selectchange">
              <el-option label="2019" value="2019"> </el-option>
              <el-option label="2020" value="2020"> </el-option>
              <el-option label="2021" value="2021"> </el-option>
              <el-option label="2022" value="2022"> </el-option>
              <el-option label="2023" value="2023"> </el-option>
              <el-option label="2024" value="2024"> </el-option>
            </el-select>
            <el-button
              type="primary"
              style="margin-left: 10px"
              @click="openisframe"
              >补全年度数据
            </el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-table
      ref="dataTreeList"
      :data="tableData"
      style="width: 100%"
      default-expand-all
      row-key="id"
    >
      <el-table-column type="index" label="行次" width="50"> </el-table-column>
      <el-table-column prop="name" align="centent" label="项目">
      </el-table-column>
      <el-table-column prop="scalay" align="centent" label="金额">
      </el-table-column>
    </el-table>
    <el-dialog :destroy-on-close='true' title="请手动补全数据" width="53%" :visible.sync="isframe">
      <addfrom @reject="reject"></addfrom>
    </el-dialog>
  </div>
</template>

<script>
import addfrom from "./components/addfrom.vue";
import { yearrepord } from "@/api/EnterpriseInformation";
export default {
  components: {
    addfrom,
  },
  data() {
    return {
      isframe: false,
      infofrom: {
        yearrepord: "2022",
      },
      tableData: [],
    };
  },
  created() {
    this.yearrepord();
  },
  methods: {
    toggleRowExpansion() {
      this.toggleRowExpansionAll(this.tableData, true);
    },
    toggleRowExpansionAll(data, isExpansion) {
      data.forEach((item) => {
        this.$refs.dataTreeList.toggleRowExpansion(item, isExpansion);
        if (item.children !== undefined && item.children !== null) {
          this.toggleRowExpansionAll(item.children, isExpansion);
        }
      });
    },

    selectchange(val) {
      this.yearrepord();
    },
    yearrepord() {
      yearrepord(this.infofrom.yearrepord).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
          this.toggleRowExpansion();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    openisframe() {
      this.isframe = true;
    },
    reject() {
      this.isframe = false;
      this.yearrepord();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>