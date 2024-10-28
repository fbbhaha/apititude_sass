<template>
  <div class="ContactPerson">
    <div class="companyName">
      <img
        src="../../../../../assets/images/customer/company.png"
        alt=""
        style="grid-row: 1 / 3; "
      />
      <span>企业</span>
      <div class="name">{{ companyMessage.name }}</div>
    </div>
    <div class="companyData">
      <div class="item">
        <div class="name">企业状态</div>
        <el-tag type="success">{{ companyMessage.status }}</el-tag>
      </div>
      <div class="item">
        <div class="name">所属领域</div>
        <div class="data">{{ companyMessage.fields }}</div>
      </div>
      <div class="item">
        <div class="name">更新时间</div>
        <div class="data">{{ companyMessage.updateTime }}</div>
      </div>
    </div>
    <div class="topButtons">
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="showDialog = true"
        >新增联系人</el-button
      >
      <el-button type="danger" icon="el-icon-delete" @click="patchDelete()"
        >批量删除</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%" height="calc(100% - 70px)">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="code" label="性别"> </el-table-column>
      <el-table-column prop="customerName" label="职位"> </el-table-column>
      <el-table-column prop="customerName" label="手机号"> </el-table-column>
      <el-table-column prop="contactTel" label="邮箱"> </el-table-column>
      <el-table-column prop="address" label="关键决策人"> </el-table-column>
      <el-table-column label="操作" align="center" width="140">
        <template slot-scope="scope">
          <div class="operationButtons">
            <i class="el-icon-edit" @click="editBaseMessage(scope.row)">
              编辑</i
            >
            <i class="el-icon-delete">删除</i>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ContactPerson",
  props: {
    companyId: [Number, String]
  },
  data() {
    return {
      showDialog: false,
      companyMessage: {
        name: "无锡市晒福智能电子科技有限公司",
        status: "签约",
        fields: "网络设备设计与制造技术",
        updateTime: "2024-05-02"
      },
      tableData: [],
      dialogData: {}
    };
  },
  components: {},
  methods: {
    patchDelete() {},
    editBaseMessage(data) {
      this.showDialog = true;
      this.dialogData = data;
    }
  }
};
</script>

<style scpoed lang="scss">
.ContactPerson {
  .companyName {
    display: grid;
    grid-template-columns: 50px auto;
    align-items: center;
    gap: 0 10px;
    .name {
      font-weight: 500;
      font-size: 18px;
      color: #242425;
    }
  }
  .companyData {
    height: 94px;
    background: #f5f7fc;
    padding: 0 50px;
    display: flex;
    align-items: center;
    gap: 0 60px;
    margin: 30px 0;
    .item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .name {
        margin-bottom: 10px;
        font-weight: 400;
        font-size: 14px;
        color: #242425;
      }
      .data {
        height: 24px;
        font-weight: 400;
        font-size: 14px;
        color: #54585a;
      }
    }
  }
  .topButtons {
    margin-bottom: 20px;
  }
}
</style>
