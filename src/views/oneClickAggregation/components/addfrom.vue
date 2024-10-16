<template>
  <div class="content">
    <el-row>
      <el-col :span="24">
        <div class="bule">
          由于优惠明细表中部分数据无法自动生成，需要企业手动填写补全<br />金额单位：元（列至角分）
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-form>
        <el-col :span="24">
          <el-form-item label="本年形成无形资产摊销额[本表第43行]">
            <el-input v-model="infofrom.zichan"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="以前年度形成无形资产本年摊销额[本表第44行]">
            <el-input v-model="infofrom.zichan1"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="特殊收入部分[本表第46行]">
            <el-input v-model="infofrom.zichan2"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="当年销售研发活动直接形成产品（包括组成部分）对应的材料部分[本表第48行]"
          >
            <el-input v-model="infofrom.zichan3"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="以前年度销售研发活动直接形成产品（包括组成部分）对应的材料部分结转金额[本表第49行]"
          >
            <el-input v-model="infofrom.zichan4"> </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <div class="button">
            <el-button type="primary" @click="save">确定</el-button>
            <el-button type="warning" @click="reject">取消</el-button>
          </div>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { Subject } from "@/api/EnterpriseInformation";
export default {
  data() {
    return {
      infofrom: {
        zichan1: "",
        zichan2: "",
        zichan3: "",
        zichan4: "",
        zichan: "",
      },
    };
  },
  methods: {
    reject() {
      this.$emit("reject");
    },
    save() {
      let list = [];
      list[0] = {
        id: '294364406425362117',
        scalay: this.infofrom.zichan,
      };
      list[1] = {
        id: '294364406425362118',
        scalay: this.infofrom.zichan1,
      };
      list[2] = {
        id: '294433994517269062',
        scalay: this.infofrom.zichan2,
      };
      list[3] = {
        id: '294450356518144581',
        scalay: this.infofrom.zichan3,
      };
      list[4] = {
        id: '294450493885794885',
        scalay: this.infofrom.zichan4,
      };
      Subject(list).then((res) => {
        if (res.code == 200) {
          this.$message.success("保存成功");
          this.reject();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 10px;
}
.bule {
  padding: 5px;
  color: #0f8cf2;
  background: #3dd5fc;
  text-align: left;
}
.button {
  text-align: right;
  button {
    margin: 0 5px;
  }
}
</style>