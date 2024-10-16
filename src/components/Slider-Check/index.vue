<template>
  <div class="slider-check-box" :style="{'--color': color}">
    <div class="slider-check" :class="rangeStatus ? 'success' : ''">
      <div class="mask" :style="maskStyle"></div>
      <i
        @mousedown="rangeMove"
        :class="rangeStatus ? successIcon : startIcon"
      ></i>
      {{ rangeStatus ? successText : startText }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    //成功图标
    successIcon: {
      type: String,
      default: "el-icon-success",
    },
    //成功文字
    successText: {
      type: String,
      default: "验证成功",
    },
    //开始的图标
    startIcon: {
      type: String,
      default: "el-icon-d-arrow-right",
    },
    //开始的文字
    startText: {
      type: String,
      default: "请拖住滑块，拖动到最右边",
    },
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      disX: 0,
      rangeStatus: false,
    };
  },
  computed: {
    maskStyle() {
      return {
        width: this.disX ? this.disX + 34 + "px" : "0px",
        transition: this.disX ? ".1s all" : ".5s all",
      };
    },
  },
  methods: {
    //滑块移动
    rangeMove(e) {
      let ele = e.target;
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth = ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      if (this.rangeStatus) {
        //不运行
        return false;
      }
      document.onmousemove = (e) => {
        if (this.rangeStatus) {
          e.preventDefault();
          return;
        }
        let endX = e.clientX;
        this.disX = endX - startX;
        if (this.disX <= 0) {
          this.disX = 0;
        }
        if (this.disX >= MaxX - eleWidth) {
          //减去滑块的宽度,体验效果更好
          this.disX = MaxX;
        }
        ele.style.transition = ".1s all";
        ele.style.transform = "translateX(" + this.disX + "px)";
        e.preventDefault();
      };
      document.onmouseup = () => {
        if (this.disX !== MaxX) {
          ele.style.transition = ".5s all";
          ele.style.transform = "translateX(0)";
          this.disX = 0;
          this.$emit('on-error')
        } else {
          this.rangeStatus = true;
          this.$emit('on-success')
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
  },
};
</script>
<style lang="scss" scoped>
@mixin jc-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.slider-check-box {
  .slider-check {
    background-color: #e9e9e9;
    position: relative;
    transition: all 1s;
    user-select: none;
    color: #585858;
    height: 40px;
    border-radius: 4px;
    text-align: center;
    line-height: 40px;
    @include jc-flex;
    height: 40px;
    font-size: 13px;
    .mask {
      height: 100%;
      background: var(--color);
      position: absolute;
      top: 0;
      left: 0;
    }
    &.success {
      background-color: var(--color);
      color: #fff;
      i {
        color: var(--color);
      }
    }
    i {
      position: absolute;
      top: 3px;
      left: 4px;
      right: 4px;
      width: 34px;
      height: 34px;
      color: #ccc;
      background-color: #fff;
      cursor: pointer;
      font-size: 15px;
      border-radius: 4px;
      @include jc-flex;
    }
  }
}
</style>
