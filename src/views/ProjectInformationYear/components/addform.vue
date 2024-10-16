<template>
  <div class="content">
    <div class="main">
      <el-form label-position="left" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="项目名称">
              <el-select  v-model="infoform.projectname" @change='selectchange' style="width: 100%">
                <el-option v-for="(item,index) in list" :key="index" :label="item.projectname" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="扣除年度">
              <el-radio-group v-model="infoform.proyear">
                <el-radio
                  v-for="(item, index) in radiolist"
                  :label="item.value"
                  :key="index"
                  >{{ item.value }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="button">
      <el-button type="warning" @click="savefrom">保存</el-button>
      <el-button type="warning" @click="reject">返回</el-button>
    </div>
  </div>
</template>

<script>
import { getproject , getPyear} from "@/api/ProjectInformation";
import { mapGetters } from "vuex";
export default {
    computed: {
    ...mapGetters(["userInfo"]),
  },
  data() {
    return {
      checked: "",
   
      list :[],
      infoform:{
        projectname:'',
        proyear:'2019',
        yjxs:'',
        projectno:'',
        createby:''
      },
      radiolist: [
        { value: '2019' },
        { value: '2020' },
        { value: '2021' },
        { value: '2022' },
      ],
    };
  },
  created(){
    this.getproject()
  },
  methods: {
    selectchange(val){
        const id = this.infoform.projectname
        let list = this.list.filter((item)=>{
          return item.id == id
        })
        this.infoform.yjxs = list.yjxs
        this.infoform.projectno = list.projectno
        this.infoform.createby = list.createby
    },
    getproject(){
      getproject({ctreteby:this.userInfo.userId}).then((res=>{
        if(res.code == 200){
          this.list = res.data.list
        }
      }))
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    reject() {
      this.$emit("reject");
    },
    savefrom(){
      let savefrom = this.infoform
      getPyear(savefrom).then((res)=>{
       if(res.code == 200){
         this.$message.success('保存成功')
         this.reject()
       }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  .main {
    padding: 20px 10px;
  }
  .table-div {
    font-size: 16px;
    line-height: 46px;

    .centent {
      text-align: center;
    }
    .left {
      padding-left: 10px;
    }
    .red {
      color: red;
    }
  }
  .bg-purple-light {
    width: 100%;
    background: #e5e9f2;
  }
}
.el-checkbox__inner {
  width: 20px;
  height: 20px;
}
.button {
  width: 100%;
  padding: 10px;
  background: #0f8cf2;
  text-align: right;
}
</style>