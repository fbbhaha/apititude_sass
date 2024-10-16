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
      <el-row :gutter="10" class="dataBoard">
        <el-col
          :span="6"
          class="dataBoard-item"
          v-for="(item, i) in menuList"
          :key="i"
          :style="{
            width:
              menuList.length == 4
                ? '25%'
                : menuList.length == 3
                ? '33.3%'
                : menuList.length == 2
                ? '50%'
                : '100%',
          }"
        >
          <el-card shadow="never">
            <div class="dataBoard-body">
              <i
                :class="
                  item.icon +
                  ' dataBoard-body-item dataBoard-body-item' +
                  (i + 1)
                "
              ></i>
              <div class="text">
                <p class="num">{{ item.num }}</p>
                <p class="name">{{ item.fullName }}</p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>
<script>
import { getDataInterfaceRes } from "@/api/systemData/dataInterface";
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
      menuList: [],
    };
  },
  created() {
    this.menuList = this.list;
    this.getData(this.dataInterface);
  },
  watch: {
    list: {
      handler(val) {
        this.menuList = val;
      },
      deep: true,
    },
    dataInterface: {
      handler(val) {
        if (!val) {
          this.$message.warning("数据接口不能为空！");
          return;
        }
        this.getData(val);
      },
      deep: true,
    },
  },
  methods: {
    getData(dataInterface) {
      if (!dataInterface) {
        return;
      }
      getDataInterfaceRes(dataInterface).then((res) => {
        if (this.menuList.length == res.data.length) {
          for (let i = 0; i < this.menuList.length; i++) {
            this.menuList[i].num = res.data[i].num;
          }
        } else {
          this.$message.warning("接口返回数据与控件需要数据不匹配！");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.dataBoard {
  height: 100%;
  overflow: hidden;
  .dataBoard-item {
    height: 100%;
  }
  >>> .el-card {
    width: 100%;
    height: 100%;
    .el-card__body {
      padding: 0;
      height: 100%;
    }
  }
  .dataBoard-body {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .dataBoard-body-item {
      width: 66px;
      height: 66px;
      margin-right: 16px;
      border-radius: 50%;
      text-align: center;
      line-height: 66px;
      font-size: 36px;
      flex-shrink: 0;
      &.dataBoard-body-item1 {
        background: #f2ebfb;
        color: #7b1ae1;
      }
      &.dataBoard-body-item2 {
        background: #edf8fe;
        color: #4ab8ff;
      }
      &.dataBoard-body-item3 {
        background: #fff7e4;
        color: #ff8b58;
      }
      &.dataBoard-body-item4 {
        background: #fff2f5;
        color: #fc5b87;
      }
    }
    .text {
      display: inline-block;
      height: 56px;
      .num {
        font-size: 20px;
        line-height: 36px;
      }
      .name {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>
