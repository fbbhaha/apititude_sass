<template> 
      <div class="steps">
        <el-steps :active="active" finish-status="success" simple>
          <el-step :title="item.title" v-for="(item,i) in infoList " @click.native="getNum(i)" :key='i'></el-step> 
        </el-steps>
      </div>  
</template>
  
  <script>
  export default {
    props: {
        active: {
            type: Number,
            default:0
        },
        infoList: {
            type: Array,
            default: []
        }, 
    },
    data() {
      return { 
      };
    },
    methods:{
      getNum(i){ 
        this.$emit('changeStep',i+1)
      }
    }
  };
  </script>
  
  <style  > 
   .content {
    width: 100%;
    height: 100%;
  }
  .steps   {
    width: 100%;
    height: 100%; 
  }
  .steps /deep/ .el-steps--simple { 
    background-color: #fff !important;
  }
  .steps /deep/ .el-step.is-simple .el-step__title{
    font-size: 15px !important;
    font-weight: 700;
  }
  </style>