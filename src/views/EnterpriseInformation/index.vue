<template>
  <div class="content">
    <div class="steps">
      <el-steps :active="1" finish-status="success" simple>
        <el-step title="企业信息管理"  @click.native="$router.push('/EnterpriseInformation')"></el-step>
        <el-step title="项目信息采集"  @click.native="$router.push('/ProjectInformation')"></el-step>
        <el-step title="项目按年度管理" @click.native="$router.push('/ProjectInformationYear')"></el-step>
        <el-step title="明细账科目匹配" @click.native="$router.push({path:'/EnterpriseInformations',query: {num:'4'}})"></el-step>
        <el-step title="项目明细账管理" @click.native="$router.push({path:'/EnterpriseInformations',query: {num:'5'}})"></el-step>
        <el-step title="研发辅助账汇总" @click.native="$router.push({path:'/EnterpriseInformations',query: {num:'6'}})"></el-step>
      </el-steps>
    </div>
    <div class="main">
      <div class="main-title">企业信息</div>
      <div style="margin-top: 20px">
        <el-form :model="infoform" label-position="top">
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="企业名称">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.companyName"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="统一社会信用代码">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.socialCreditCode"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="组织机构代码">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.organizationCode"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="纳税人识别号">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.taxpayerIdentificationNumber"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="营业执照注册号">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.businessLicenseNo"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="登记注册类型">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.registerType"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="企业类型">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.companyType"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="10">
                <el-form-item label="省市区">
                  <el-col :span="8">
                    <el-select
                      style="width: 100%"
                      v-model.trim="infoform.province"
                      placeholder="省"
                    >
                      <el-option
                        v-for="item in provinces"
                        size="small"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        @click.native="changeProvince()"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="8">
                    <el-select
                      style="width: 100%"
                      v-model.trim="infoform.city"
                      placeholder="市"
                    >
                      <el-option
                        v-for="item in cities"
                        size="small"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        @click.native="changeCity"
                      >
                      </el-option>
                    </el-select> </el-col
                  ><el-col :span="8">
                    <el-select
                      style="width: 100%"
                      v-model.trim="infoform.county"
                      placeholder="区"
                    >
                      <el-option
                        v-for="item in area"
                        size="small"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="邮编">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.postalCode"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="注册地址">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.registerPlace"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="经营地址">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.businessAddress"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人">
                <el-input style="width: 100%" v-model.trim="infoform.contacts">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="联系电话">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.contactNumber"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机">
                <el-input style="width: 100%" v-model.trim="infoform.mobile">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="工商登记日期">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.industrialRegistrationDate"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="税务登记日期">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.taxRegistrationDate"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="法定代表人">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.legalPerson"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="企业状态">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.companyStatus"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="纳税银行账号">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.taxpayerBankAccount"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="行业">
                <el-input style="width: 100%" v-model.trim="infoform.industry">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="24">
              <el-form-item label="经营范围">
                <el-input
                  type="textarea"
                  :rows="3"
                  style="width: 100%"
                  v-model.trim="infoform.businessScope"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="12">
              <el-form-item label="主管科技部门">
                <el-input
                  style="width: 100%"
                  v-model.trim="infoform.technologyDepart"
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="主管税务部门">
                <el-input style="width: 100%" v-model.trim="infoform.taxDepart">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="button">
        <el-button type="warning" @click="savefrom">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import { getinfoList, saveinfoList } from "@/api/EnterpriseInformation";
export default {
  data() {
    return {
      //省市区联动下拉框
      provinces: regionData,
      cities: [],
      area: [],
      infoform: {
        companyName: "",
        socialCreditCode: "",
        organizationCode: "",
        taxpayerIdentificationNumber: "",
        businessLicenseNo: "",
        registerType: "",
        companyType: "",
        province: "",
        city: "",
        county: "",
        postalCode: "",
        registerPlace: "",
        businessAddress: "",
        contacts: "",
        contactNumber: "",
        mobile: "",
        industrialRegistrationDate: "",
        taxRegistrationDate: "",
        legalPerson: "",
        companyStatus: "",
        taxpayerBankAccount: "",
        industry: "",
        businessScope: "",
        technologyDepart: "",
        taxDepart: "",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
 
    getList() {
      getinfoList().then((res) => {
        console.log(res);
        const datalist = res.data.list;
        if (Array.isArray(datalist) && datalist.length > 0) {
          this.infoform = datalist[0];
          this.seechangeProvince();
          this.seechangeCity();
        } else {
          this.reset();
        }
      });
    },
    seechangeProvince() {
      let cityItem = this.provinces.filter(
        (item) => item.value === this.infoform.province
      );
      if (cityItem[0]) {
        this.cities = cityItem[0].children;
      }
    },
    seechangeCity() {
      let areaItem = this.cities.filter(
        (item) => item.value === this.infoform.city
      );

      if (areaItem[0]) {
        this.area = areaItem[0].children;
      }
    },
    changeProvince() {
      //console.log(this.provinces)
      //console.log(this.selectProvince)
      this.cities = [];
      this.area = [];
      this.infoform.city = "";
      this.infoform.county = "";
      let cityItem = this.provinces.filter(
        (item) => item.value === this.infoform.province
      );
      if (cityItem[0]) {
        this.cities = cityItem[0].children;
      }
    },
    changeCity() {
      this.area = [];
      this.infoform.county = "";

      let areaItem = this.cities.filter(
        (item) => item.value === this.infoform.city
      );

      if (areaItem[0]) {
        this.area = areaItem[0].children;
      }
    },
    savefrom() {
      let froms = this.infoform;
      saveinfoList(froms).then((res) => {
        if (res.code == 200) {
          this.$message.success("保存成功");
          this.getList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    reset() {
      this.infoform = {
        companyName: "",
        socialCreditCode: "",
        organizationCode: "",
        taxpayerIdentificationNumber: "",
        businessLicenseNo: "",
        registerType: "",
        companyType: "",
        province: "",
        city: "",
        county: "",
        postalCode: "",
        registerPlace: "",
        businessAddress: "",
        contacts: "",
        contactNumber: "",
        mobile: "",
        industrialRegistrationDate: "",
        taxRegistrationDate: "",
        legalPerson: "",
        companyStatus: "",
        taxpayerBankAccount: "",
        industry: "",
        businessScope: "",
        technologyDepart: "",
        taxDepart: "",
      };
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
.button {
  width: 100%;
  padding: 10px;
  background: #0f8cf2;
  text-align: right;
}
v-deep .el-step.is-simple .el-step__title{
  font-size: 12px;
}
</style>