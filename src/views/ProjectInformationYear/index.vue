<template>
  <div class="content">
    <div class="steps">
      <el-steps :active="3" finish-status="success" simple>
           <el-step title="企业信息管理"  @click.native="$router.push('/EnterpriseInformation')"></el-step>
        <el-step title="项目信息采集"  @click.native="$router.push('/ProjectInformation')"></el-step>
        <el-step title="项目按年度管理" @click.native="$router.push('/ProjectInformationYear')"></el-step>
        <el-step title="明细账科目匹配" @click.native="$router.push({path:'/EnterpriseInformations',query: {num:'4'}})"></el-step>
        <el-step title="项目明细账管理" @click.native="$router.push({path:'/EnterpriseInformations',query: {num:'5'}})"></el-step>
        <el-step title="研发辅助账汇总" @click.native="$router.push({path:'/EnterpriseInformations',query: {num:'6'}})"></el-step>
      </el-steps>
    </div>
    <div class="main">
      <div class="main-title">项目按年度管理</div>
      <div class="search" style="margin-top: 20px">
        <el-row :gutter="10">
          <el-form label-position="left">
            <el-col :span="6">
              <el-form-item label-width="80px" label="项目编号:">
                <el-input style="width:100%" v-model="searchfrom.prono"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label-width="80px" label="项目名称:">
                <el-input v-model="searchfrom.proname"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label-width="auto" label="项目加计扣除年度:">
                <el-select  v-model="searchfrom.proyear">
                  <el-option
                    v-for="(item, index) in nfOptions"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                    :key="index"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="search">搜索</el-button>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div>
        <el-button type="warning" icon="el-icon-plus" @click="addproject">
          选择加计扣除年度</el-button
        >
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%; margin-top: 20px">
          <el-table-column prop="proyear" label="项目加计扣除年度" width="180">
          </el-table-column>
          <el-table-column prop="projectno" label="项目编号" width="180">
          </el-table-column>
          <el-table-column prop="projectname" label="项目名称">
          </el-table-column>
          <el-table-column prop="yjxs" label="研究开发形式"> </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="text" style="color: red" @click="del(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="选择加计扣除年度" :visible.sync="isframe" width="80%">
      <addform @reject="reject"> </addform>
    </el-dialog>
  </div>
</template>

<script>
import addform from "./components/addform.vue";
import { PyeargetList, Pyeardel } from "@/api/ProjectInformation";

export default {
  components: {
    addform,
  },
  data() {
    return {
      isframe: false,
      radio: "1",
      searchfrom: {
        prono: "",
        proname: "",
        proyear: "",
      },
      value: "",
      nfOptions: [],
      tableData: [],
    };
  },
  created() {
    this.getNf();
    this.search();
  },
  methods: {
    getNf() {
      var nfOptionsArray = new Array();
      var years = new Date().getFullYear();
      for (var i = years - 20; i <= years + 20; i++) {
        var anOption = {};
        anOption.dictValue = i;
        anOption.dictLabel = i;
        nfOptionsArray.push(anOption);
      }
      this.nfOptions = nfOptionsArray;
    },
    addproject() {
      this.isframe = true;
    },
    del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        Pyeardel(row.id).then((res) => {
          if (res.code == 200) {
            this.$message.success("删除成功");
            this.search();
          } else {
            this.$message.warning(res.msg);
          }
        });
      });
    },
    search() {
      let sarchfrom = this.searchfrom;
      PyeargetList(sarchfrom).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
        }
      });
    },
    reject() {
      this.isframe = false;
      this.search();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
}
.steps {
  width: 100%;
  height: 20px;
}
.main {
  width: 100%;
  height: 100%;
padding: 70px 3%;
  .main-title {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #333333;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 3px;
      height: 16px;
      left: -10px;
      background: #0f8cf2;
    }
  }
}
</style>