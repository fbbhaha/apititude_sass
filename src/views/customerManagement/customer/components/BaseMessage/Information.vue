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
        <el-select v-model="value" placeholder="请选择客户类型">
          <el-option
            v-for="item in dictionary.kehuleixing"
            :key="item.enCode"
            :label="item.fullName"
            :value="item.enCode"
          >
          </el-option>
        </el-select>
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
      <tips-title text="客户基础信息" tips="测试" style="grid-column: 1 / 3;" />
      <CommonInput label="组织机构代码" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="注册时间" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="所属区域" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="员工总数" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="上一年度销售收入" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="本年销售收入(预计)" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="主营产品" :prop="'name'">
        <el-input />
      </CommonInput>
    </el-form>
    <div class="bottomButton">
      <el-button>取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>

<script>
import CommonInput from "@/components/Common/Input/index.vue";
import TipsTitle from "@/views/customerManagement/components/TipsTitle.vue";

export default {
  name: "Base",
  data() {
    return {
      dictionary: {
        kehuleixing: [
          {
            id: "a38f2c7ea51b49e4ba3bcf9df8ea2394",
            fullName: "公海客户",
            enCode: "4",
            enabledMark: 1,
            hasChildren: false,
            parentId: "038d293fca544c86afa3f2bc65421fd7",
            children: null,
            sortCode: 0
          },
          {
            id: "bcf16235c3a845ee89b77de0dc2d4e5e",
            fullName: "预签约客户",
            enCode: "3",
            enabledMark: 1,
            hasChildren: false,
            parentId: "038d293fca544c86afa3f2bc65421fd7",
            children: null,
            sortCode: 0
          },
          {
            id: "06daee5aa4ce4c4595c654e37b0c1b0c",
            fullName: "新增意向客户",
            enCode: "2",
            enabledMark: 1,
            hasChildren: false,
            parentId: "038d293fca544c86afa3f2bc65421fd7",
            children: null,
            sortCode: 0
          },
          {
            id: "25c403a66a7a43cab1f85f105e5ba394",
            fullName: "商机",
            enCode: "1",
            enabledMark: 1,
            hasChildren: false,
            parentId: "038d293fca544c86afa3f2bc65421fd7",
            children: null,
            sortCode: 0
          }
        ]
      }
    };
  },
  components: { CommonInput, TipsTitle }
};
</script>

<style scpoed lang="scss">
.Base {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  .bottomButton {
    border-top: 1px solid #d9d9d9;
    padding: 15px 0 0;
    display: flex;
    justify-content: center;
  }
}
</style>
