<template>
  <el-drawer
    :visible.sync="showDrawer"
    direction="rtl"
    size="calc(100% - 240px)"
    :show-close="false"
    class="extraMessage"
    append-to-body
  >
    <Tabs v-model="activeName">
      <TabPane label="客户信息" name="1">
        <CustomerMessage />
      </TabPane>
      <TabPane label="行动历史" name="2">
        <ActionHistory />
      </TabPane>
      <TabPane label="联系人信息" name="3">
        <ContactPerson />
      </TabPane>
      <TabPane label="销售机会" name="4">
        <SalesOpportunity />
      </TabPane>
      <TabPane label="合同信息" name="5">
        <ContractInformation />
      </TabPane>
      <TabPane label="产品信息" name="6">
        <ProductMessage />
      </TabPane>
      <TabPane label="项目信息" name="7">
        <ProjectMessage />
      </TabPane>
    </Tabs>
  </el-drawer>
</template>

<script>
import TabPane from "@/components/Common/Tab/TabPane.vue";
import Tabs from "@/components/Common/Tab/Tabs.vue";
import CustomerMessage from "./CustomerMessage.vue";
import ActionHistory from "./ActionHistory.vue";
import ContactPerson from "./ContactPerson.vue";
import SalesOpportunity from "./SalesOpportunity/index.vue";
import ContractInformation from "./ContractInformation/index.vue";
import ProductMessage from "./ProductMessage/index.vue";
import ProjectMessage from "./ProjectMessage.vue";

export default {
  name: "BaseMessage",
  props: {
    show: Boolean
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
    ActionHistory,
    ContactPerson,
    SalesOpportunity,
    ContractInformation,
    ProductMessage,
    ProjectMessage
  }
};
</script>

<style lang="scss">
.extraMessage {
  .el-drawer {
    background: #f5f7fc;
    .el-drawer__header {
      margin-bottom: 0;
    }
  }
}
</style>
