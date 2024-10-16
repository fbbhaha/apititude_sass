<template>
  <div :class="'ccit-button ccit-button-'+align">
    <el-button v-bind="$attrs" v-on="$listeners">{{buttonText}}</el-button>
  </div>
</template>
<script>
export default {
  props: {
    align: {
      default: 'left'
    },
    buttonText: {
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.ccit-button {
  width: 100%;
  &.ccit-button-left {
    text-align: left;
  }
  &.ccit-button-center {
    text-align: center;
  }
  &.ccit-button-right {
    text-align: right;
  }
}
</style>