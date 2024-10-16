<template>
  <el-card shadow="never" class="todo-box" :style="cardStyle">
    <div :slot="headerSlot" class="portal-common-title" :style="titleStyle">
      <div class="left">
        <div v-if="showBlock" class="block" :style="blockStyle"></div>
        <i v-if="showIcon" :class="icon" style="font-size: 18px"></i>
      <span v-if="showTitle">{{title}}</span>
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
    <div class="todo-box-body" :style="bodyStyle">
      <router-link class="item" to="/workFlow/flowTodo">
        <i class="icon-ym icon-ym-flowTodo"></i>
        <div class="text">
          <p class="num">{{toBeReviewed}}</p>
          <p class="name">待我审核</p>
        </div>
      </router-link>
      <router-link class="item" to="/workFlow/entrust">
        <i class="icon-ym icon-ym-flowEntrust"></i>
        <div class="text">
          <p class="num">{{entrust}}</p>
          <p class="name">流程委托</p>
        </div>
      </router-link>
      <router-link class="item" to="/workFlow/flowDone">
        <i class="icon-ym icon-ym-flowDone"></i>
        <div class="text">
          <p class="num">{{flowDone}}</p>
          <p class="name">已办事宜</p>
        </div>
      </router-link>
    </div>
  </el-card>
</template>
<script>
import { getFlowTodoCount } from '@/api/home'
import { mixin } from "../visualPortalMixin";
export default {
  mixins: [mixin],
  data() {
    return {
      entrust: 0,
      flowDone: 0,
      toBeReviewed: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getFlowTodoCount().then(res => {
        this.entrust = res.data.entrust || 0
        this.flowDone = res.data.flowDone || 0
        this.toBeReviewed = res.data.toBeReviewed || 0
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.todo-box {
  >>> .el-card__body {
    width: 100%;
    height: 100%;
  }
  .todo-box-body {
    padding: 0 30px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      i {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        color: #fff;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        line-height: 56px;
        font-size: 30px;
        &.icon-ym-flowTodo {
          background: #f68900;
        }
        &.icon-ym-flowEntrust {
          background: #1890ff;
        }
        &.icon-ym-flowDone {
          background: #7b1ae1;
        }
      }
      .text {
        display: inline-block;
        height: 56px;
        .num {
          font-size: 20px;
          line-height: 36px;
          text-align: center;
        }
        .name {
          font-size: 14px;
          color: #666;
        }
      }
    }
  }
}
</style>