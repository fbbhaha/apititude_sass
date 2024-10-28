<template>
  <el-drawer
    :visible.sync="showDrawer"
    direction="rtl"
    size="calc(100% - 240px)"
    :show-close="false"
    class="extraMessage"
    append-to-body
    destroy-on-close
  >
    <Tabs v-model="activeName">
      <TabPane label="客户信息" name="1">
        <CustomerMessage :companyId="data && data.id" />
      </TabPane>
      <TabPane label="联系人信息" name="2">
        <ContactPerson :companyId="data && data.id" />
      </TabPane>
      <template v-if="data">
        <TabPane label="行动记录" name="3">
          <ActionLog :companyId="data.id" />
        </TabPane>
        <TabPane label="销售机会" name="4">
          <SalesOpportunity :companyId="data.id" />
        </TabPane>
        <TabPane label="合同信息" name="5">
          <ContractInformation :companyId="data.id" />
        </TabPane>
        <!-- <TabPane label="产品信息" name="6">
          <ProductMessage :companyId="data.id" />
        </TabPane> -->
        <TabPane label="项目信息" name="7">
          <ProjectMessage :companyId="data.id" />
        </TabPane>
      </template>
    </Tabs>
  </el-drawer>
</template>

<script>
import TabPane from "@/components/Common/Tab/TabPane.vue";
import Tabs from "@/components/Common/Tab/Tabs.vue";
import CustomerMessage from "./CustomerMessage.vue";
import ContactPerson from "./ContactPerson.vue";
import ActionLog from "../../../actionLog/index.vue";
import SalesOpportunity from "../../../salesOpportunity/index.vue";
import ContractInformation from "../../../contractInformation/index.vue";
// import ProductMessage from "../../../productMessage/index.vue";
import ProjectMessage from "../../../projectMessage/index.vue";

export default {
  name: "BaseMessage",
  props: {
    show: Boolean,
    data: Object
  },
  data() {
    return { activeName: "1" };
  },
  computed: {
    showDrawer: {
      get() {
        return this.show;
      },
      set(value) {
        this.$emit("update:show", value);
      }
    }
  },
  components: {
    TabPane,
    Tabs,
    CustomerMessage,
    ActionLog,
    ContactPerson,
    SalesOpportunity,
    ContractInformation,
    // ProductMessage,
    ProjectMessage
  },
  watch: {
    showDrawer() {
      this.activeName = "1";
    }
  }
};
</script>

<style lang="scss">
.extraMessage {
  .el-drawer {
    background: #f5f7fc;
    .el-drawer__header {
      margin-bottom: 0;
      padding: unset;
    }
  }
}
</style>
