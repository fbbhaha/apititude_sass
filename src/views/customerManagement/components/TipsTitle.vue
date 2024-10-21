<template>
  <div class="TipsTitle">
    {{ text }}
    <el-popover
      v-if="tips"
      placement="top"
      width="200"
      trigger="hover"
      :content="tips"
    >
      <i class="el-icon-question" slot="reference"></i>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "TipsTitle",
  props: {
    text: String,
    tips: String
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style scpoed lang="scss">
.TipsTitle {
  width: 100%;
  height: 44px;
  background: #f5f7fc;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: PingFangSC-SNaNpxibold;
  font-weight: 600;
  font-size: 14px;
  color: #242425;
  margin-bottom: 18px;
}
</style>
