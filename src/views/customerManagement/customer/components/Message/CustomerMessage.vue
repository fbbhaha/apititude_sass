<template>
  <div class="CustomerMessage">
    <el-form class="formBox">
      <CommonInput label="客户名称" :prop="'companyName'">
        <el-input v-model="formData.companyName" />
      </CommonInput>
      <CommonInput label="回落公海" :prop="'prospectPool'">
        <el-input v-model="formData.prospectPool" />
      </CommonInput>
      <CommonInput label="主联系人" :prop="'linkMan'">
        <el-input v-model="formData.linkMan" />
      </CommonInput>
      <CommonInput label="手机号码" :prop="'mobile'">
        <el-input v-model="formData.mobile" />
      </CommonInput>
      <CommonInput label="客户类型" :prop="'companyType'">
        <el-select v-model="formData.companyType" placeholder="请选择客户类型">
          <el-option
            v-for="item in dictionary['038d293fca544c86afa3f2bc65421fd7']"
            :key="item.enCode"
            :label="item.fullName"
            :value="item.enCode"
          >
          </el-option>
        </el-select>
      </CommonInput>
      <CommonInput label="客户来源" :prop="'source'">
        <el-select v-model="formData.source" placeholder="请选择客户来源">
          <el-option
            v-for="item in dictionary['616358168754132613']"
            :key="item.enCode"
            :label="item.fullName"
            :value="item.enCode"
          >
          </el-option>
        </el-select>
      </CommonInput>
      <CommonInput label="所在省市区">
        <el-cascader
          size="large"
          :options="regionData"
          v-model="areaCode"
          @change="handleAddressChange"
        >
        </el-cascader>
      </CommonInput>

      <CommonInput label="工作地址" :prop="'address'">
        <el-input v-model="formData.address" />
      </CommonInput>

      <!-- <CommonInput
        label="备注"
        :prop="'name'"
        style="grid-column: 1 / 3;height:76px"
      >
        <el-input type="textarea" />
      </CommonInput> -->
      <tips-title text="客户基础信息" tips="测试" style="grid-column: 1 / 3;" />
      <CommonInput label="组织机构代码" :prop="'organizationCode'">
        <el-input v-model="formData.organizationCode" />
      </CommonInput>
      <CommonInput label="注册时间" :prop="'registerTime'">
        <el-date-picker
          v-model="formData.registerTime"
          type="date"
          placeholder="选择注册时间"
        >
        </el-date-picker>
      </CommonInput>
      <!-- <CommonInput label="所属区域" :prop="'areacode'">
        <el-select
          v-model="formData.areacode"
          placeholder="请选择所属区域"
          @change="handleAreaChange"
        >
          <el-option
            v-for="item in dictionary.kehuleixing"
            :key="item.enCode"
            :label="item.fullName"
            :value="item.enCode"
          >
          </el-option>
        </el-select>
      </CommonInput> -->
      <CommonInput label="员工总数" :prop="'empTotal'">
        <el-input v-model="formData.empTotal" />
      </CommonInput>
      <CommonInput label="上一年度销售收入" :prop="'lastSales'">
        <el-input v-model="formData.lastSales" />
      </CommonInput>
      <CommonInput label="本年销售收入(预计)" :prop="'currentSales'">
        <el-input v-model="formData.currentSales" />
      </CommonInput>
      <CommonInput label="主营产品" :prop="'coreProduct'">
        <el-input v-model="formData.coreProduct" />
      </CommonInput>
      <tips-title text="投资规划(万元)" style="grid-column: 1 / 3;" />
      <CommonInput
        label="近三年总投资"
        :prop="'totalInvestment'"
        style="grid-column: 1 / 3;"
      >
        <el-input v-model="formData.totalInvestment" />
      </CommonInput>
      <CommonInput label="近三年软件投资" :prop="'totalSoftwareInvestment'">
        <el-input v-model="formData.totalSoftwareInvestment" />
      </CommonInput>
      <CommonInput label="近三年设备投资" :prop="'totalDeviceInvestment'">
        <el-input v-model="formData.totalDeviceInvestment" />
      </CommonInput>
      <CommonInput
        label="未来几年总投资"
        :prop="'futureInvestment'"
        style="grid-column: 1 / 3;"
      >
        <el-input v-model="formData.futureInvestment" />
      </CommonInput>
      <CommonInput label="未来几年软件投资" :prop="'futureSoftwareInvestment'">
        <el-input v-model="formData.futureSoftwareInvestment" />
      </CommonInput>
      <CommonInput label="未来几年设备投资" :prop="'futureDeviceInvestment'">
        <el-input v-model="formData.futureDeviceInvestment" />
      </CommonInput>
      <tips-title text="荣誉、体系、标准、案例" style="grid-column: 1 / 3;" />
      <!-- <CommonInput
        label="已获得荣誉"
        :prop="'name'"
        style="grid-column: 1 / 3;"
      >
        <el-input  v-model="formData.lastSales"/>
      </CommonInput> -->
      <CommonInput
        label="体系建设"
        :prop="'systemConstruction'"
        style="grid-column: 1 / 3;"
      >
        <el-checkbox-group v-model="formData.systemConstruction">
          <el-checkbox
            :label="item.id"
            v-for="item in dictionary['614924958472082885']"
            :key="item.id"
            >{{ item.fullName }}</el-checkbox
          >
        </el-checkbox-group>
      </CommonInput>
      <CommonInput
        label="知识产权"
        :prop="'intellectualProperty'"
        style="grid-column: 1 / 3;"
      >
        <el-checkbox-group v-model="formData.intellectualProperty">
          <el-checkbox
            :label="item.id"
            v-for="item in dictionary['614926008448980421']"
            :key="item.id"
            >{{ item.fullName }}</el-checkbox
          >
        </el-checkbox-group>
      </CommonInput>
      <CommonInput
        label="标准情况"
        :prop="'standardSituation'"
        style="grid-column: 1 / 3;"
      >
        <el-checkbox-group v-model="formData.standardSituation">
          <el-checkbox
            :label="item.id"
            v-for="item in dictionary['614927208619709893']"
            :key="item.id"
            >{{ item.fullName }}</el-checkbox
          >
        </el-checkbox-group>
      </CommonInput>
      <tips-title text="智能制造" style="grid-column: 1 / 3;" />
      <CommonInput
        label="信息化建设"
        :prop="'informationizationConstruction'"
        style="grid-column: 1 / 3;"
      >
        <el-checkbox-group v-model="formData.informationizationConstruction">
          <el-checkbox
            :label="item.id"
            v-for="item in dictionary['614928979719099845']"
            :key="item.id"
            >{{ item.fullName }}</el-checkbox
          >
        </el-checkbox-group>
      </CommonInput>
      <CommonInput
        label="自动化建设"
        :prop="'automationConstruction'"
        style="grid-column: 1 / 3;"
      >
        <el-checkbox-group v-model="formData.automationConstruction">
          <el-checkbox
            :label="item.id"
            v-for="item in dictionary['614929708089349573']"
            :key="item.id"
            >{{ item.fullName }}</el-checkbox
          >
        </el-checkbox-group>
      </CommonInput>
    </el-form>
    <div class="bottomButton">
      <el-button>取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
import CommonInput from "@/components/Common/Input/index.vue";
import TipsTitle from "@/views/customerManagement/components/TipsTitle.vue";
import getDictionaryTypeById from "@/api/systemData/dictionary";
import { regionData } from "element-china-area-data";
import { addCustomer } from "@/api/customter";

export default {
  name: "CustomerMessage",
  props: {
    companyId: [Number, String]
  },
  data() {
    this.regionData = regionData;
    return {
      dictionary: {
        // 客户类型
        "038d293fca544c86afa3f2bc65421fd7": [
          {
            id: "a38f2c7ea51b49e4ba3bcf9df8ea2394",
            fullName: "公海客户",
            enCode: "4",
            enabledMark: 1,
            hasChildren: false,
            parentId: "038d293fca544c86afa3f2bc65421fd7",
            children: null,
            sortCode: 0
          },
          {
            id: "bcf16235c3a845ee89b77de0dc2d4e5e",
            fullName: "预签约客户",
            enCode: "3",
            enabledMark: 1,
            hasChildren: false,
            parentId: "038d293fca544c86afa3f2bc65421fd7",
            children: null,
            sortCode: 0
          },
          {
            id: "06daee5aa4ce4c4595c654e37b0c1b0c",
            fullName: "新增意向客户",
            enCode: "2",
            enabledMark: 1,
            hasChildren: false,
            parentId: "038d293fca544c86afa3f2bc65421fd7",
            children: null,
            sortCode: 0
          },
          {
            id: "25c403a66a7a43cab1f85f105e5ba394",
            fullName: "商机",
            enCode: "1",
            enabledMark: 1,
            hasChildren: false,
            parentId: "038d293fca544c86afa3f2bc65421fd7",
            children: null,
            sortCode: 0
          }
        ],
        // 客户来源
        "616358168754132613": [
          {
            id: "616358286026872453",
            parentId: "0",
            fullName: "公司分配",
            enCode: "gsfp",
            enabledMark: 1,
            sortCode: 0
          },
          {
            id: "616358377760495237",
            parentId: "0",
            fullName: "网络推广",
            enCode: "wltg",
            enabledMark: 1,
            sortCode: 1
          },
          {
            id: "616358440784107141",
            parentId: "0",
            fullName: "渠道",
            enCode: "qd",
            enabledMark: 1,
            sortCode: 2
          },
          {
            id: "616358524540163717",
            parentId: "0",
            fullName: "转介绍",
            enCode: "zjs",
            enabledMark: 1,
            sortCode: 3
          }
        ],
        // 体系建设
        "614924958472082885": [
          {
            id: "614925127691277765",
            parentId: null,
            fullName: "质量管理体系",
            enCode: "zlgltx"
          },
          {
            id: "614925243705726405",
            parentId: null,
            fullName: "环境管理体系",
            enCode: "hjgltx"
          },
          {
            id: "614925358843565509",
            parentId: null,
            fullName: "职业健康管理体系",
            enCode: "zyjkgltx"
          },
          {
            id: "614925543652988357",
            parentId: null,
            fullName: "两化融合贯标",
            enCode: "lhrhgb"
          }
        ],
        // 知识产权
        "614926008448980421": [
          {
            id: "614926629113697733",
            parentId: "0",
            fullName: "实用新型专利",
            enCode: "syxxzl",
            enabledMark: 1,
            sortCode: 0
          },
          {
            id: "614926832440972741",
            parentId: "0",
            fullName: "发明专利",
            enCode: "fmzl",
            enabledMark: 1,
            sortCode: 1
          },
          {
            id: "614926901206586821",
            parentId: "0",
            fullName: "外观专利",
            enCode: "wgzl",
            enabledMark: 1,
            sortCode: 2
          },
          {
            id: "614927047415829957",
            parentId: "0",
            fullName: "软件著作权",
            enCode: "rjzzq",
            enabledMark: 1,
            sortCode: 3
          }
        ],
        // 标准情况
        "614927208619709893": [
          {
            id: "614927337691026885",
            parentId: "0",
            fullName: "国际标准",
            enCode: "sjbz",
            enabledMark: 1,
            sortCode: 0
          },
          {
            id: "614928398812190149",
            parentId: "0",
            fullName: "国家标准",
            enCode: "gjbz",
            enabledMark: 1,
            sortCode: 1
          },
          {
            id: "614928523626288581",
            parentId: "0",
            fullName: "行业标准",
            enCode: "hybz",
            enabledMark: 1,
            sortCode: 2
          },
          {
            id: "614928622045631941",
            parentId: "0",
            fullName: "地方标准",
            enCode: "dfbz",
            enabledMark: 1,
            sortCode: 3
          },
          {
            id: "614928724734776773",
            parentId: "0",
            fullName: "团体标准",
            enCode: "tlbz",
            enabledMark: 1,
            sortCode: 4
          }
        ],
        // 信息化建设
        "614928979719099845": [
          {
            id: "614929818059806149",
            parentId: "0",
            fullName: "PLM",
            enCode: "PLM",
            enabledMark: 1,
            sortCode: 0
          },
          {
            id: "614929872329905605",
            parentId: "0",
            fullName: "ERP",
            enCode: "ERP",
            enabledMark: 1,
            sortCode: 1
          },
          {
            id: "614929934854395333",
            parentId: "0",
            fullName: "MES",
            enCode: "MES",
            enabledMark: 1,
            sortCode: 2
          },
          {
            id: "614930000449115589",
            parentId: "0",
            fullName: "CRM",
            enCode: "CRM",
            enabledMark: 1,
            sortCode: 3
          }
        ],
        // 自动化建设
        "614929708089349573": [
          {
            id: "614929094169073093",
            parentId: "0",
            fullName: "AGV",
            enCode: "AGV",
            enabledMark: 1,
            sortCode: 0
          },
          {
            id: "614929230790137285",
            parentId: "0",
            fullName: "自动立体化仓库",
            enCode: "zdltck",
            enabledMark: 1,
            sortCode: 1
          }
        ]
      },
      formData: {
        authorId: "", //- 客户负责人id
        authorName: "", //- 客户负责人
        province: "", //- 省
        city: "", //- 市
        county: "", //- 区/县
        address: "", //- 地址
        areacode: "", //- 区域编码
        areaname: "", //- 区域名称
        companyName: "", //- 公司名称
        companyType: "", //- 企业类型
        coreProduct: "", //- 主营产品
        currentSales: "", //- 本年销售收入（预计）
        empTotal: "", //- 员工总数
        enterpriseScale: "", //- 企业规模
        futureDeviceInvestment: "", //- 未来几年设备投资
        futureInvestment: "", //- 未来几年投资
        futureSoftwareInvestment: "", //- 未来几年软件投资
        industrySector: "", //- 行业领域
        insuranceProgram: "", //- 参保人数
        lastSales: "", //- 上一年度销售收入
        linkMan: "", //- 联系人
        mobile: "", //- 联系电话
        organizationCode: "", //- 组织机构代码
        paidCapital: "", //- 实缴资本
        phone: "", //- 手机号码
        prospectPool: "", //- 公海池
        registerTime: "", //- 注册时间
        registeredCapital: "", //- 注册资本
        registrationNumber: "", //- 纳税人识别号
        remark: "", //- 备注
        source: "", //- 客户来源
        totalDeviceInvestment: "", //- 近三年设备投资
        totalInvestment: "", //- 近三年总投资
        totalSoftwareInvestment: "", //- 近三年软件投资
        unifiedCredit: "", //- 统一社会信用代码
        website: "", //- 公司网站
        standardSituation: [], //- 标准情况
        intellectualProperty: [], //- 知识产权
        systemConstruction: [], //- 体系建设
        automationConstruction: [], //- 自动化建设
        informationizationConstruction: [] //- 信息化建设
      },
      areaCode: []
    };
  },
  components: { CommonInput, TipsTitle },
  mounted() {
    // getDictionaryTypeById(
    //   "614929708089349573,614928979719099845,616358168754132613,038d293fca544c86afa3f2bc65421fd7"
    // ).then(res => {});
  },
  methods: {
    handleAreaChange(v) {
      console.log(v);
    },
    handleAddressChange() {
      this.formData.province = this.areaCode[0];
      this.formData.city = this.areaCode[1];
      this.formData.county = this.areaCode[2];
    },
    handleSubmit() {
      console.log(this.formData);

      addCustomer(this.formData).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scpoed lang="scss">
.CustomerMessage {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .formBox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 40px;
  }
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  .bottomButton {
    border-top: 1px solid #d9d9d9;
    padding: 15px 0 0;
    display: flex;
    justify-content: center;
  }
}
</style>
