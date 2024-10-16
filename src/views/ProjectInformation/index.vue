<template>
  <div class="content">
    <div class="steps">
      <el-steps :active="2" finish-status="success" simple>
            <el-step title="企业信息管理"  @click.native="$router.push('/EnterpriseInformation')"></el-step>
        <el-step title="项目信息采集"  @click.native="$router.push('/ProjectInformation')"></el-step>
        <el-step title="项目按年度管理" @click.native="$router.push('/ProjectInformationYear')"></el-step>
        <el-step title="明细账科目匹配" @click.native="$router.push({path:'/EnterpriseInformations',query: {num:'4'}})"></el-step>
        <el-step title="项目明细账管理" @click.native="$router.push({path:'/EnterpriseInformations',query: {num:'5'}})"></el-step>
        <el-step title="研发辅助账汇总" @click.native="$router.push({path:'/EnterpriseInformations',query: {num:'6'}})"></el-step>
     </el-steps>
    </div>
    <div class="main">
      <div class="main-title">项目信息采集</div>
      <div class="search" style="margin-top: 20px">
        <el-row :gutter="10">
          <el-form label-width="auto" label-position="left">
            <el-col :span="5">
              <el-form-item label="项目编号:">
                <el-input v-model="searchform.prono"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="项目名称:">
                <el-input v-model="searchform.proname"> </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <el-form-item label-width="1px">
                  <el-radio-group v-model="searchform.sbtype">
                    <el-radio label="true">申报加计扣除</el-radio>
                    <el-radio label="false">不申报加计扣除（1）</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" @click="serch"> 搜索 </el-button>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <div>
        <el-button type="warning" icon="el-icon-plus" @click="addproject">
          添加新项目</el-button
        >
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%; margin-top: 20px">
          <el-table-column prop="projectno" label="项目编号" width="180">
          </el-table-column>
          <el-table-column prop="projectname" label="项目名称" width="180">
          </el-table-column>
          <el-table-column prop="yfsdate" label="研发开始时间">
          </el-table-column>
          <el-table-column prop="yfedate" label="研发结束时间">
          </el-table-column>
          <el-table-column prop="sbtype" label="是否申报加计扣除">
              <template slot-scope="scope">
                  <div>
                    {{scope.row.sbtype == 'true'?'是':'否'}}
                  </div>
              </template>

          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :destroy-on-close='true' width="85%" :visible.sync="isframe" >
      <addform @reject="reject"> </addform>
    </el-dialog>
  </div>
</template>

<script>
import addform from "./components/addform.vue";
import { getproject, } from "@/api/ProjectInformation";

import { mapGetters } from "vuex";
export default {
  components: {
    addform,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      isframe: false,

      searchform: {
        sbtype: "true",
        proname: "",
        prono: "",
        ctreteby: "",
      },
      tableData: [],
    };
  },
  created() {
    this.serch();
  },
  methods: {
    addproject() {
      this.isframe = true;
    },
    reject() {
      this.isframe = false;
      this.serch();
    },
    serch() {
      let search = this.searchform;
      search.ctreteby = this.userInfo.userId;
      getproject(search).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data.list;
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