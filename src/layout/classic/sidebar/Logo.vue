<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <el-image
          class="sidebar-logo"
          :src="define.comUrl + sysConfig.logoIcon"
          v-if="sysConfig && sysConfig.logoIcon"
        >
          <template slot="error">
            <img class="sidebar-logo" src="@/assets/images/ccit.png" alt="" />
          </template>
        </el-image>
        <img src="@/assets/images/ccit.png" class="sidebar-logo" v-else />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <el-image
          class="sidebar-logo"
          :src="define.comUrl + sysConfig.navigationIcon"
          v-if="sysConfig && sysConfig.navigationIcon"
        >
          <template slot="error">
            <img class="sidebar-logo" src="@/assets/images/ccit1.png" alt="" />
          </template>
        </el-image>
        <div class="logo-box" v-else>
          <img src="@/assets/images/ccit.png" class="sidebar-logo" />
          <span>{{ title }}</span>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
import { title } from "@/settings";

export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    sysConfig() {
      return this.$store.state.settings.sysConfig;
    }
  },
  data() {
    return {
      title: title
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #031e39;
  text-align: center;
  overflow: hidden;
  .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .logo-box {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 16px;
      color: #000;
    }
    .sidebar-logo {
      height: 38px;
      width: 45px;
    }
  }
}
</style>
