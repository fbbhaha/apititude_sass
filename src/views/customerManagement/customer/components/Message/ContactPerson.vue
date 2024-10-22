<template>
  <div class="ContactPerson">
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
      <el-table-column prop="name" label="客户名称"> </el-table-column>
      <el-table-column prop="code" label="客户类型"> </el-table-column>
      <el-table-column prop="customerName" label="业务员"> </el-table-column>
      <el-table-column prop="customerName" label="联系人"> </el-table-column>
      <el-table-column prop="contactTel" label="手机号"> </el-table-column>
      <el-table-column prop="address" label="城市"> </el-table-column>
      <el-table-column prop="code" label="最后行动时间"> </el-table-column>
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
  data() {
    return {
      showDialog: false
    };
  },
  components: {},
  methods: {
    patchDelete() {}
  }
};
</script>

<style scpoed lang="scss">
.ContactPerson {
  .topButtons {
    margin-bottom: 20px;
  }
}
</style>
