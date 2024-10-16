<template>
  <el-card class="portal-box" :style="cardStyle">
    <div :slot="headerSlot" class="portal-common-title" :style="titleStyle">
      <div class="left">
        <div v-if="showBlock" class="block" :style="blockStyle"></div>
        <i v-if="showIcon" :class="icon" style="font-size: 18px"></i>
        <span v-if="showTitle">{{ title }}</span>
      </div>
      <div class="right">
        <span v-if="item.showFresh" title="刷新" class="item">
          <i class="el-icon-refresh-right" @click="getData"></i
        ></span>
        <span v-if="item.showMore" title="更多" class="item">
          <i class="el-icon-more more" @click="jumpToMore"></i
        ></span>
      </div>
    </div>
    <div class="portal-box-body" :style="bodyStyle" v-loading="loading">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in list"
          :key="index"
          :timestamp="activity.timestamp"
          :icon="activity.icon"
          :color="activity.color"
          :size="activity.size"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>
<script>
import { mixin } from "../visualPortalMixin";
import { getDataInterfaceRes } from "@/api/systemData/dataInterface";
export default {
  mixins: [mixin],
  data() {
    return {
      list: [],
      node: {},
      statusField: "",
      showHeader: true,
      reverse: true,
    };
  },
  watch: {
    dataInterface() {
      if (!val) {
          this.$message.warning("数据接口不能为空！");
          return;
        }
        this.getData(val);
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      if (!this.dataInterface) {
        if(this.list.length) {
          this.handleList();
        }
        return;
      }
      this.loading = true;
      getDataInterfaceRes(this.dataInterface).then((res) => {
        this.loading = false;
        if (this.listSize >= res.data.list) {
          this.list = res.data;
        } else {
          this.list = res.data.slice(0, this.listSize);
        }
        this.handleList();
        return;
      });
    },
    handleList() {
      if (this.node && this.statusField) {
        let noStart = this.node.noStart.value;
        let progress = this.node.progress.value;
        let finish = this.node.finish.value;
        let list = JSON.parse(JSON.stringify(this.list))
        list.forEach((item) => {
          if (noStart !== 0) {
            if (this.node.noStart.condition === -1) {
              if (item[this.statusField] < noStart) {
                item.icon = this.node.noStart.icon;
                item.color = this.node.noStart.color;
              }
            } else if (this.node.noStart.condition === 0) {
              if (item[this.statusField] == noStart) {
                item.icon = this.node.noStart.icon;
                item.color = this.node.noStart.color;
              }
            } else if (this.node.noStart.condition === -1) {
              if (item[this.statusField] > noStart) {
                item.icon = this.node.noStart.icon;
                item.color = this.node.noStart.color;
              }
            }
          }
           if (progress !== 0) {
            if (this.node.progress.condition === -1) {
              if (item[this.statusField] < progress) {
                item.icon = this.node.progress.icon;
                item.color = this.node.progress.color;
              }
            } else if (this.node.progress.condition === 0) {
              if (item[this.statusField] == progress) {
                item.icon = this.node.progress.icon;
                item.color = this.node.progress.color;
              }
            } else if (this.node.noStart.condition === -1) {
              if (item[this.statusField] > progress) {
                item.icon = this.node.progress.icon;
                item.color = this.node.progress.color;
              }
            }
          }
          if (finish !== 0) {
            if (this.node.finish.condition === -1) {
              if (item[this.statusField] < finish) {
                item.icon = this.node.finish.icon;
                item.color = this.node.finish.color;
              }
            } else if (this.node.finish.condition === 0) {
              if (item[this.statusField] == finish) {
                item.icon = this.node.finish.icon;
                item.color = this.node.finish.color;
              }
            } else if (this.node.noStart.condition === -1) {
              if (item[this.statusField] > finish) {
                item.icon = this.node.finish.icon;
                item.color = this.node.finish.color;
              }
            }
          }
        });
        this.list = list
      }
    },
  },
};
</script>