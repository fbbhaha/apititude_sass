<template>
  <div class="Tab">
    <div class="tabList">
      <div
        :class="{ tabItem: true, active: item.name === activeTab }"
        v-for="item in panes"
        :key="item.name"
        @click="() => (activeTab = item.name)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="tabContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    value: [String, Number]
  },
  data() {
    return {
      panes: [] // 存放 TabPane 的数组
    };
  },
  computed: {
    activeTab: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      }
    }
  },
  mounted() {
    if (!this.activeTab && this.panes.length > 0) {
      this.activeTab = this.panes[0].name; // 默认选中第一个 Tab
    }
  },
  methods: {
    addPane(pane) {
      this.panes.push(pane); // 将 TabPane 注册到父组件
    }
  }
};
</script>

<style scpoed lang="scss">
.Tab {
  padding: 20px 30px;
  height: 100%;
  box-sizing: border-box;

  .tabList {
    height: 30px;
    display: flex;
    align-items: center;
    gap: 0 35px;
    padding: 10px 20px 10px;
    box-sizing: content-box;
    .tabItem {
      padding: 0 0 10px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #242425;
      letter-spacing: 0.25px;
      position: relative;
      cursor: pointer;
      &::after {
        content: "";
        width: 28px;
        height: 4px;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
      }
      &.active {
        &::after {
          background: #237dfc;
        }
      }
    }
  }
  .tabContent {
    height: calc(100% - 50px);
  }
}
</style>
