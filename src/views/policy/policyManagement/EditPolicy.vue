<template>
  <div class="EditPolicy">
    <el-form ref="form" class="formBox" :model="form" label-position="top">
      <el-form-item label="产品编号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="产品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="产品类型">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="补贴金额">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="产品售价">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="名额数量">
        <el-input-number
          v-model="form.name"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="发布机构/主管部门">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="政策文件编号">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="政策解读/申报主要条件">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="项目支持领域">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="政策网址">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="政策发布时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="政策截止时间">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="里程碑方案">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="销售岗提成方案">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目岗提成方案">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提成基础费用">
        <el-input-number
          v-model="form.name"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="工作时长（天）">
        <el-input-number
          v-model="form.name"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="付款节点预设模版">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目级别/权重">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input type="textarea" v-model="form.desc" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="政策文件">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="bottomButton">
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPolicy",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="scss" scoped>
.EditPolicy {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 12% 20px 50px;
  .formBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px 25%;

    >>> .el-select {
      width: 100%;
      height: 100%;
    }
  }
  .bottomButton {
    margin-top: 20px;
    border-top: 1px solid #d9d9d9;
    padding: 15px 0 0;
    display: flex;
    justify-content: center;
  }
}
</style>
