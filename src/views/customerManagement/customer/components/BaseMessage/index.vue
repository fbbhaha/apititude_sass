<template>
  <el-drawer
    :title="'新增客户'"
    :visible.sync="showDrawer"
    direction="rtl"
    size="calc(100% - 240px)"
    show-close
    class="baseMessage"
  >
    <Tabs v-model="activeName">
      <TabPane label="客户信息" name="1">
        <Information />
      </TabPane>
      <TabPane label="联系人" name="2">
        <Contact />
      </TabPane>
    </Tabs>
  </el-drawer>
</template>

<script>
import TabPane from "@/components/Common/Tab/TabPane.vue";
import Tabs from "@/components/Common/Tab/Tabs.vue";
import Information from "./Information.vue";
import Contact from "./Contact.vue";
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
  components: { TabPane, Tabs, Information, Contact }
};
</script>

<style lang="scss">
.baseMessage {
  .el-drawer__header {
    height: 60px;
    line-height: 60px;
    background: #f5f7fc !important;
    margin-bottom: 0;
    padding-top: 0;
  }
}
</style>
