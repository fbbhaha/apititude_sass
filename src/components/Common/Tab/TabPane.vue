<template>
  <div class="TabPane" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabPane",
  props: {
    label: [String, Number],
    name: [String, Number]
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$parent.activeTab === this.name; // 判断当前 Pane 是否被激活
    }
  },
  mounted() {
    this.$parent.addPane({ label: this.label, name: this.name }); // 注册 pane 到父组件
  }
};
</script>

<style scpoed lang="scss">
.TabPane {
}
</style>
