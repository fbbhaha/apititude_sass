<template>
  <div>
    <div class="main-title">研发辅助账汇总</div>
    <div class="main">
      <div class="portlet box green ng-scope">

        <div class="portlet-body">
          <div id="table-content" class="table-responsive" style="position: relative; overflow: scroll; height: 692px;"
            get-height="">
            <table class="table table-bordered" border="1" cellspacing="0">
              <thead class="table-header">
                <tr>
                  <th rowspan="3">项目编号</th>
                  <th rowspan="3">项目名称</th>
                  <th rowspan="3">完成情况</th>
                  <th rowspan="3">支出类型 </th>
                  <th rowspan="3">允许加计扣除金额合计</th>
                  <th rowspan="2">人员人工费用</th>
                  <th rowspan="2">直接投入费用</th>
                  <th rowspan="2">折旧费用</th>
                  <th rowspan="2">无形资产摊销</th>
                  <th rowspan="2">新产品设计费等</th>
                  <th rowspan="2">前五项小计</th>
                  <th colspan="2">其他相关费用及限额</th>
                  <th colspan="4">委托研发费用及限额</th>
                </tr>
                <tr>
                  <th>其他相关费用合计</th>
                  <th>经限额调整后的其他相关费用</th>
                  <th>委托境内机构或个人进行研发活动所发生的费用</th>
                  <th>允许加计扣除的委托境内机构或个人进行研发活动所发生的费用</th>
                  <th>委托境外机构进行研发活动所发生的费用</th>
                  <th>经限额调整后的委托境外机构进行研发活动所发生的费用</th>
                </tr>
                <tr>
                  <th>1</th>
                  <th>2</th>
                  <th>3</th>
                  <th>4</th>
                  <th>5</th>
                  <th>6</th>
                  <th>7.1</th>
                  <th>7.2</th>
                  <th>8.1</th>
                  <th>8.2</th>
                  <th>8.3</th>
                  <th>8.4</th>
                </tr>
              </thead>
              <tbody class="table-body" style="display: block; margin-top: 160px;">
                <tr v-for="(item) in datatable " data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td>{{item.projectName}}</td>
                  <td>{{item.proId}}</td>
                  <td>{{item.finishStatus}}</td>
                  <td>{{item.expenseType}}</td>
                  <td>{{item.allowAmount}}</td>
                  <td>{{item.memberExpense}}</td>
                  <td>{{item.directExpense}}</td>
                  <td>{{item.depreciationExpense}}</td>
                  <td>{{item.virtualAsset}}</td>
                  <td>{{item.newProductExpense}}</td>
                  <td>{{item.fiveTotal}}</td>
                  <td>{{item.otherExpense}}</td>
                  <td>{{item.adjustExpense}}</td>
                  <td>{{item.domesticExpense}}</td>
                  <td>{{item.allowDomestic}}</td>
                  <td>{{item.overseaExpense}}</td>
                  <td>{{item.allowOversea}}</td>
                </tr>
                <tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td colspan="4">资本化金额小计</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td colspan="4">费用化金额小计</td>
                  <td>{{fyzctj.allowAmount}}</td>
                  <td>{{fyzctj.memberExpense}}</td>
                  <td>{{fyzctj.directExpense}}</td>
                  <td>{{fyzctj.depreciationExpense}}</td>
                  <td>{{fyzctj.virtualAsset}}</td>
                  <td>{{fyzctj.newProductExpense}}</td>
                  <td>{{fyzctj.fiveTotal}}</td>
                  <td>{{fyzctj.otherExpense}}</td>
                  <td>{{fyzctj.adjustExpense}}</td>
                  <td>{{fyzctj.domesticExpense}}</td>
                  <td>{{fyzctj.allowDomestic}}</td>
                  <td>{{fyzctj.overseaExpense}}</td>
                  <td>{{fyzctj.allowOversea}}</td>
                </tr>
                <tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td colspan="4">其中：其他事项</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td colspan="4">金额合计</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template> 
<script>
import { getProjectAuxiliaryAccount } from '@/api/Archives/archivesinfo'

export default {
  props: {
    datainfo: { type: Object },
  },
  data() {
    return {
      datatable:[],
      fyzctj:{
        allowAmount:0,
        memberExpense:0,
        directExpense:0,
        depreciationExpense:0,
        virtualAsset:0,
        newProductExpense:0,
        fiveTotal:0,
        otherExpense:0,
        adjustExpense:0,
        domesticExpense:0,
        allowDomestic:0,
        overseaExpense:0,
        allowOversea:0
      }
    };
  },
  mounted() {
    let parm = {
      year:this.datainfo.projectYear,
      proId:this.datainfo.projectNo,
      pageSize:99999,
      currentPage:1
    }
    this.init(parm)
  },
  created() {

  },
  methods: {
init(data){
  getProjectAuxiliaryAccount(data).then(res => {
    this.datatable = res.data.list
    this.datatable.forEach(element => {
      this.fyzctj.allowAmount +=element.allowAmount
      this.fyzctj.memberExpense +=element.memberExpense
      this.fyzctj.directExpense +=element.directExpense
      this.fyzctj.depreciationExpense +=element.depreciationExpense
      this.fyzctj.virtualAsset +=element.virtualAsset
      this.fyzctj.newProductExpense +=element.newProductExpense
      this.fyzctj.fiveTotal +=element.fiveTotal
      this.fyzctj.otherExpense +=element.otherExpense
      this.fyzctj.adjustExpense +=element.adjustExpense
      this.fyzctj.domesticExpense +=element.domesticExpense
      this.fyzctj.allowDomestic +=element.allowDomestic
      this.fyzctj.overseaExpense +=element.overseaExpense
      this.fyzctj.allowOversea +=element.allowOversea
    });
  })
}
  }
};
</script>
  
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
}

.steps {
  width: 100%;
  height: 100%;
}

.main {
  width: 100%;
  height: 100%;
  padding: 2%;
  background-color: #fff;
}

.main-title {
  font-size: 24px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  font-weight: 700;
  padding-left: 1%;
  margin: 2% 0;
  border-left: 3px solid #409EFF;
  text-align: left;
  color: #333333;
  position: relative;
}
</style>
<style>
.ng-hide {
  display: none !important;
}

.headerColor,
.portlet-title,
.page-sidebar .page-sidebar-menu .sub-menu>li.active>a,
.page-sidebar .page-sidebar-menu .sub-menu>li.open>a,
.page-sidebar .page-sidebar-menu .sub-menu>li:hover>a,
.page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu .sub-menu>li.active>a,
.page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu .sub-menu>li.open>a,
.page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu .sub-menu>li:hover>a,
.page-sidebar .page-sidebar-menu>li.active.open>a:hover,
.page-sidebar .page-sidebar-menu>li.active>a:hover,
.page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu>li.active.open>a:hover,
.page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu>li.active>a:hover {
  /* background-color: rgb(0 146 255) !important; */
}

#bgColor {
  background-color: #fff;

}

.page-header.navbar {
  height: 110px !important;
  background-color: rgb(0 146 255) !important;
}

.page-header-fixed .page-container {
  margin-top: 110px !important;
}

.page-sidebar-fixed .page-sidebar {
  top: 110px !important;
}

@media screen and (max-width: 768px) {
  body {
    background-color: #eee !important;
  }

  .page-content-wrapper .page-content {
    padding-top: 0 !important;
  }

  .page-header.navbar {
    height: 50px !important;
  }

  .page-header-fixed .page-container {
    margin-top: 0px !important;
  }

  .page-sidebar-fixed .page-sidebar {
    top: 50px !important;
  }
}
</style>
<style class="ng-scope">
.portlet {
  margin-top: 20px;
}

.table>thead>tr>th,
.table>thead>tr>td {
  min-width: 70px;
  max-width: 100px;
}

.table>tbody>tr>td {
  min-width: 70px;
  max-width: 100px;
}

.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
  text-align: center;
  padding: 5px;
  vertical-align: middle;
  font-size: 12px;
  font-family: sans-serif;
}

.table-bordered>thead>tr>td,
.table-bordered>thead>tr>th {
  border-bottom-width: 1px;
}

.left {
  text-align: left !important;
}

.table-header {
  position: absolute;
  top: 0;
  background-color: #fff;
  border-top: 1px solid #eee;
}

.th-inner {
  color: #333;
}

th {
  color: #333;
}

.ng-binding {
  color: #333;
}

td {
  color: #333;
}</style>
