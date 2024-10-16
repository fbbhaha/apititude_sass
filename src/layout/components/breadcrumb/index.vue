<template>
  <div class="breadcrumb">{{ $route.meta.zhTitle }}</div>
</template>

<script>
export default {
  name: "breadcrumb",
  data() {
    return {};
  },
  components: {},
  mounted() {
    console.log(this.$route.meta.zhTitle);
  }
};
</script>

<style scpoed>
.breadcrumb {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 16px;
  color: #242425;
  letter-spacing: 0.25px;
  margin: 15px 20px;
}
</style>
