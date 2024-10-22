<template>
  <div class="ActionHistory">
    <div class="leftContent"></div>
    <div class="rightContent">
      <div class="searchBox">
        <div class="left">
          <el-button
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="showMessageDialog = true"
            >新增行动记录</el-button
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
        <div class="cardList">
          <div class="cardItem" v-for="item in recordList" :key="item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionHistory",
  data() {
    return {
      searchParams: {
        companyName: "",
        companyType: null,
        currentPage: 1,
        pageSize: 10
      },
      recordList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    };
  },
  components: {}
};
</script>

<style scpoed lang="scss">
.ActionHistory {
  height: 100%;
  display: flex;
  gap: 20px;
  .leftContent {
    width: 244px;
    height: 100%;
    background: #f5f7fc;
    border: 1px solid #e5e6e8;
  }
  .rightContent {
    height: 100%;
    flex-grow: 1;
    .searchBox {
      margin: 0 0 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .right {
        display: flex;
        align-items: center;
      }
    }
    .content {
      height: calc(100% - 47px);
      overflow: auto;
      padding: 0 0;
      box-sizing: border-box;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

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

      .cardList {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        padding: 0 20px;
        gap: 20px;
        .cardItem {
          height: 153px;
          background: #f5f7fc;
          box-shadow: 0 2px 4px 0 #0000000d, 0 1px 2px 0 #190f0f12,
            0 0 1px 0 #00000014;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
