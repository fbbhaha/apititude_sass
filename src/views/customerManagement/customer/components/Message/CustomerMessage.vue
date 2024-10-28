<template>
  <div class="CustomerMessage">
    <el-form class="formBox">
      <CommonInput label="客户名称" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="回落公海" :prop="'name'">
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
      <CommonInput label="所在省市区" :prop="'name'">
        <el-input />
      </CommonInput>

      <CommonInput label="工作地址" :prop="'name'">
        <el-input />
      </CommonInput>

      <!-- <CommonInput
        label="备注"
        :prop="'name'"
        style="grid-column: 1 / 3;height:76px"
      >
        <el-input type="textarea" />
      </CommonInput> -->
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
      <tips-title text="投资规划(万元)" style="grid-column: 1 / 3;" />
      <CommonInput
        label="近三年总投资"
        :prop="'name'"
        style="grid-column: 1 / 3;"
      >
        <el-input />
      </CommonInput>
      <CommonInput label="近三年软件投资" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="近三年设备投资" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput
        label="未来几年总投资"
        :prop="'name'"
        style="grid-column: 1 / 3;"
      >
        <el-input />
      </CommonInput>
      <CommonInput label="未来几年软件投资" :prop="'name'">
        <el-input />
      </CommonInput>
      <CommonInput label="未来几年设备投资" :prop="'name'">
        <el-input />
      </CommonInput>
      <tips-title text="荣誉、体系、标准、案例" style="grid-column: 1 / 3;" />
      <CommonInput
        label="已获得荣誉"
        :prop="'name'"
        style="grid-column: 1 / 3;"
      >
        <el-input />
      </CommonInput>
      <CommonInput label="体系建设" :prop="'name'" style="grid-column: 1 / 3;">
        <el-checkbox-group v-model="formData.txjs">
          <el-checkbox
            :label="item.fullName"
            v-for="item in dictionary.txjs"
            :key="item.id"
          ></el-checkbox>
        </el-checkbox-group>
      </CommonInput>
      <CommonInput label="知识产权" :prop="'name'" style="grid-column: 1 / 3;">
        <el-checkbox-group v-model="formData.txjs">
          <el-checkbox
            :label="item.fullName"
            v-for="item in dictionary.txjs"
            :key="item.id"
          ></el-checkbox>
        </el-checkbox-group>
      </CommonInput>
      <CommonInput label="标准情况" :prop="'name'" style="grid-column: 1 / 3;">
        <el-checkbox-group v-model="formData.txjs">
          <el-checkbox
            :label="item.fullName"
            v-for="item in dictionary.txjs"
            :key="item.id"
          ></el-checkbox>
        </el-checkbox-group>
      </CommonInput>
      <tips-title text="智能制造" style="grid-column: 1 / 3;" />
      <CommonInput
        label="信息化建设"
        :prop="'name'"
        style="grid-column: 1 / 3;"
      >
        <el-checkbox-group v-model="formData.txjs">
          <el-checkbox
            :label="item.fullName"
            v-for="item in dictionary.txjs"
            :key="item.id"
          ></el-checkbox>
        </el-checkbox-group>
      </CommonInput>
      <CommonInput
        label="自动化建设"
        :prop="'name'"
        style="grid-column: 1 / 3;"
      >
        <el-checkbox-group v-model="formData.txjs">
          <el-checkbox
            :label="item.fullName"
            v-for="item in dictionary.txjs"
            :key="item.id"
          ></el-checkbox>
        </el-checkbox-group>
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
import getDictionaryTypeById from "@/api/systemData/dictionary";
export default {
  name: "CustomerMessage",
  props: {
    companyId: [Number, String]
  },
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
        ],
        txjs: [
          {
            id: "614925127691277765",
            parentId: null,
            fullName: "质量管理体系",
            enCode: "zlgltx"
          },
          {
            id: "614925243705726405",
            parentId: null,
            fullName: "环境管理体系",
            enCode: "hjgltx"
          },
          {
            id: "614925358843565509",
            parentId: null,
            fullName: "职业健康管理体系",
            enCode: "zyjkgltx"
          },
          {
            id: "614925543652988357",
            parentId: null,
            fullName: "两化融合贯标",
            enCode: "lhrhgb"
          }
        ]
      },
      formData: {
        txjs: []
      }
    };
  },
  components: { CommonInput, TipsTitle },
  mounted() {
    getDictionaryTypeById(
      "614929708089349573,614928979719099845,616358168754132613,038d293fca544c86afa3f2bc65421fd7"
    ).then(res => {});
  }
};
</script>

<style scpoed lang="scss">
.CustomerMessage {
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
