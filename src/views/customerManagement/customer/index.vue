<template>
  <div class="customer">
    <div class="searchBox">
      <div class="left">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="showBaseMessage()"
          >新增客户</el-button
        >
      </div>
      <div class="right">
        <el-input
          v-model="searchParams.companyName"
          placeholder="请输入客户信息"
          prefix-icon="el-icon-search"
          style="margin-right: 20px;"
        >
        </el-input>
        <el-button plain>重置</el-button>
        <el-button type="primary">搜索</el-button>
        <TableColumnControl :columns="tableColumn" />
      </div>
    </div>
    <div class="content">
      <div class="filterBox">
        <div class="filterItem selected">不做筛选</div>
        <div class="filterItem">未跟进</div>
        <div class="filterItem">建立过销售机会</div>
        <div class="filterItem">已成交</div>
        <div class="filterItem">今日要跟进</div>
        <div class="filterItem">公海</div>
        <div class="filterItem">筛选客户标识</div>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        height="calc(100% - 70px)"
      >
        <el-table-column
          v-for="item in tableColumn"
          :key="item.field"
          :prop="item.field"
          :label="item.name"
        >
        </el-table-column>
        <el-table-column label="操作" align="center" width="140">
          <template slot-scope="scope">
            <div class="operationButtons">
              <i class="el-icon-edit" @click="showBaseMessage(scope.row)"></i>
              <i class="el-icon-delete"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <Message :show.sync="showMessageDialog" :data="baseMessage" />
  </div>
</template>

<script>
import { getCustomerList } from "@/api/customter";
import Message from "./components/Message/index.vue";
import TableColumnControl from "@/components/Common/TableColumnControl/index.vue";
export default {
  name: "customer",
  data() {
    return {
      searchParams: {
        companyName: "",
        companyType: null,
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        { name: "客户名称", field: "companyName" },
        { name: "客户类型", field: "code" },
        { name: "业务员", field: "customerName1" },
        { name: "联系人", field: "customerName2" },
        { name: "手机号", field: "contactTel" },
        { name: "城市", field: "address" },
        { name: "最后行动时间", field: "datetime" }
      ],
      tableData: [],
      showMessageDialog: false,
      baseMessage: null
    };
  },
  components: { Message, TableColumnControl },
  mounted() {
    this.initTableList();
  },
  methods: {
    initTableList() {
      getCustomerList(this.searchParams).then(res => {
        this.tableData = res.data.list;
      });
    },
    showBaseMessage(data) {
      this.baseMessage = data;
      console.log(data);

      this.showMessageDialog = true;
    }
  }
};
</script>

<style scoped lang="scss">
.customer {
  height: 100%;
  .searchBox {
    // width: calc(100% - 20px);
    height: 84px;
    padding: 0 20px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 #0000000d, 0 1px 2px 0 #190f0f12,
      0 0 1px 0 #00000014;
    border-radius: 6px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right {
      display: flex;
      align-items: center;
    }
  }
  .content {
    height: calc(100% - 114px);
    padding: 16px 24px;
    box-sizing: border-box;
    background: #ffffff;
    margin: 20px 10px 10px;
    box-shadow: 0 2px 4px 0 #0000000d, 0 1px 2px 0 #190f0f12,
      0 0 1px 0 #00000014;
    border-radius: 6px;
    .filterBox {
      // padding: 16px 24px;
      padding: 0 20px;
      height: 56px;
      background: #f5f7fc;
      border: 1px solid #e7ebf1;
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 14px;
      .filterItem {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #242425;
        letter-spacing: 0.22px;
        padding: 10px 15px;
        &.selected {
          background: #c9d3ed;
          border-radius: 4px;
          font-weight: 800;
        }
      }
    }
    .operationButtons {
      display: flex;
      gap: 18px;
      justify-content: center;
      i {
        cursor: pointer;
        font-size: 16px;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
