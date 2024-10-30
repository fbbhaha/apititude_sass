<template>
  <div class="PolicyType">
    <div class="topTitle">
      <div class="title">产品多级分类维护</div>
      <div class="detail">
        产品类型的排序是按照树枝从小到大的顺序进行的，您可以修改排序值更改产品类型的上下位置
      </div>
    </div>
    <div class="tableBox">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PolicyType",
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄"
            }
          ]
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  components: {}
};
</script>

<style scpoed lang="scss">
.PolicyType {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .topTitle {
    height: 105px;
    background: #ffffff;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-shrink: 0;
    padding: 0 20px;

    .title {
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 16px;
      color: #242425;
      letter-spacing: 0.25px;
      margin-bottom: 16px;
    }
    .detail {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #69696c;
      letter-spacing: 0.25px;
    }
  }
  .tableBox {
    flex-grow: 1;
    background: #ffffff;
    border-radius: 6px;
    padding: 30px 20px;
  }
}
</style>
