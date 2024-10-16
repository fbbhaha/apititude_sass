<template>
  <div>
    <div class="main-title">明细账</div>
    <div class="main">
      <div class="portlet box green ng-scope">

        <div class="portlet-body">
          <div id="table-content" class="table-responsive" style="position: relative; overflow: scroll; height: 692px;"
            get-height="">
            <table class="table table-bordered" border="1" cellspacing="0">
              <thead class="table-header">
                <tr>
                  <th rowspan="2" colspan="4">凭证信息</th>
                  <th rowspan="3">会计凭证记载金额</th>
                  <th rowspan="3">税法规定的归集金额</th>
                  <th colspan="8">费用明细（税法规定）</th>
                </tr>
                <tr>
                  <th rowspan="2">人员人工费用</th>
                  <th rowspan="2">直接投入费用</th>
                  <th rowspan="2">折旧费用</th>
                  <th rowspan="2">无形资产摊销</th>
                  <th rowspan="2">新产品设计费等</th>
                  <th rowspan="2">其他相关费用</th>
                  <th colspan="2">委托研发费用</th>
                </tr>
                <tr>
                  <th>日期</th>
                  <th>种类</th>
                  <th>号数</th>
                  <th>摘要</th>
                  <th>委托境内机构或个人进行研发活动所发生的费用</th>
                  <th>委托境外机构进行研发活动所发生的费用</th>
                </tr>
              </thead>
              <tbody  class="table-body" style="display: block; margin-top: 146px;">
                <tr v-for="(item) in ryrgfy" data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td>{{item.document_date}}</td>
                  <td></td>
                  <td>{{item.document_number}}</td>
                  <td>{{item.three_account}}</td>
                  <td>{{item.book_amount}}</td>
                  <td>{{item.book_amount}}</td>
                  <td>{{item.actual_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-for="(item) in zjtrfy" data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td>{{item.document_date}}</td>
                  <td></td>
                  <td>{{item.document_number}}</td>
                  <td>{{item.three_account}}</td>
                  <td>{{item.book_amount}}</td>
                  <td>{{item.book_amount}}</td>
                  <td></td>
                  <td>{{item.actual_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-for="(item) in zjfy" data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td>{{item.document_date}}</td>
                  <td></td>
                  <td>{{item.document_number}}</td>
                  <td>{{item.three_account}}</td>
                  <td>{{item.book_amount}}</td>
                  <td>{{item.book_amount}}</td>
                  <td></td>
                  <td></td>
                  <td>{{item.actual_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-for="(item) in wxzctx" data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td>{{item.document_date}}</td>
                  <td></td>
                  <td>{{item.document_number}}</td>
                  <td>{{item.three_account}}</td>
                  <td>{{item.book_amount}}</td>
                  <td>{{item.book_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{item.actual_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-for="(item) in xcpsjf" data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td>{{item.document_date}}</td>
                  <td></td>
                  <td>{{item.document_number}}</td>
                  <td>{{item.three_account}}</td>
                  <td>{{item.book_amount}}</td>
                  <td>{{item.book_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{item.actual_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-for="(item) in qtfy" data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td>{{item.document_date}}</td>
                  <td></td>
                  <td>{{item.document_number}}</td>
                  <td>{{item.three_account}}</td>
                  <td>{{item.book_amount}}</td>
                  <td>{{item.book_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{item.actual_amount}}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr v-for="(item) in wtjnfy" data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td>{{item.document_date}}</td>
                  <td></td>
                  <td>{{item.document_number}}</td>
                  <td>{{item.three_account}}</td>
                  <td>{{item.book_amount}}</td>
                  <td>{{item.book_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{item.actual_amount}}</td>
                  <td></td>
                </tr>
                <tr v-for="(item) in wtjwfy" data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td>{{item.document_date}}</td>
                  <td></td>
                  <td>{{item.document_number}}</td>
                  <td>{{item.three_account}}</td>
                  <td>{{item.book_amount}}</td>
                  <td>{{item.book_amount}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{{item.actual_amount}}</td>
                </tr>
                <tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                  <td colspan="4">合计金额</td>
                  <td>{{zjfydata.book_amount}}</td>
                  <td>{{zjfydata.book_amount}}</td>
                  <td>{{zjfydata.ryrgfy}}</td>
                  <td>{{zjfydata.zjtrfy}}</td>
                  <td>{{zjfydata.zjfy}}</td>
                  <td>{{zjfydata.wxzctx}}</td>
                  <td>{{zjfydata.xcpsjf}}</td>
                  <td>{{zjfydata.qtfy}}</td>
                  <td>{{zjfydata.wtjnfy}}</td>
                  <td>{{zjfydata.wtjwfy}}</td>
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
import { getAssistrecord } from '@/api/Archives/archivesinfo'

export default {
  props: {
    datainfo: { type: Object },
  },
  data() {
    return {
      ryrgfy:[],
      qtfy :[],
      xcpsjf:[],
      wtjnfy :[],
      wtjwfy :[],
      wxzctx :[],
      xmxx :{},
      zjfy :[],
      zjtrfy :[],
      zjfydata:{
        book_amount:0,
        ryrgfy:0,
        zjtrfy:0,
        zjfy:0,
        wxzctx:0,
        xcpsjf:0,
        qtfy:0,
        wtjnfy:0,
        wtjwfy:0
      }
    };
  },
  mounted() {
    this.getAssistrecorddata(this.datainfo.projectYear, this.datainfo.projectNo)
  },
  created() {

  },
  methods: {
   
    getAssistrecorddata(yearrepord, proid) {
      let _this = this
      getAssistrecord(yearrepord, proid).then(res => {
        let data = res.data
        _this.ryrgfy = data.ryrgfy
        _this.qtfy = data.qtfy
        _this.xcpsjf = data.xcpsjf
        _this.wtjnfy = data.wtjnfy
        _this.wtjwfy = data.wtjwfy
        _this.wxzctx = data.wxzctx
        _this.xmxx = data.xmxx
        _this.zjfy = data.zjfy
        _this.zjtrfy = data.zjtrfy
        _this.ryrgfy.forEach(element => {
          this.zjfydata.book_amount +=element.book_amount
          this.zjfydata.ryrgfy += element.actual_amount
        })
        _this.qtfy.forEach(element => {
          this.zjfydata.book_amount +=element.book_amount
          this.zjfydata.qtfy += element.actual_amount
        })
        _this.xcpsjf.forEach(element => {
          this.zjfydata.book_amount +=element.book_amount
          this.zjfydata.xcpsjf += element.actual_amount
        })
        _this.wtjnfy.forEach(element => {
          this.zjfydata.book_amount +=element.book_amount
          this.zjfydata.wtjnfy += element.actual_amount
        })
        _this.wtjwfy.forEach(element => {
          this.zjfydata.book_amount +=element.book_amount
          this.zjfydata.wtjwfy += element.actual_amount
        })
        _this.zjfy.forEach(element => {
          this.zjfydata.book_amount +=element.book_amount
          this.zjfydata.zjfy += element.actual_amount
        })
        _this.wxzctx.forEach(element => {
          this.zjfydata.book_amount +=element.book_amount
          this.zjfydata.wxzctx += element.actual_amount
        })
        _this.zjtrfy.forEach(element => {
          this.zjfydata.book_amount +=element.book_amount
          this.zjfydata.zjtrfy += element.actual_amount
        })
        // ryrgfy.forEach(element => {
        //   let num = qtfy.findIndex(elet => elet.document_date === element.document_date)
        //   if(num!=-1){
        //     element.qtfy = qtfy[num].actual_amount
        //     qtfy.splice(num, 1)
        //   }
        //   let num1 = xcpsjf.findIndex(elet => elet.document_date === element.document_date)
        //   if(num1!=-1){
        //     element.xcpsjf = xcpsjf[num1].actual_amount
        //     xcpsjf.splice(num1, 1)
        //   }
        //   let num2 = wtjnfy.findIndex(elet => elet.document_date === element.document_date)
        //   if(num2!=-1){
        //     element.wtjnfy = wtjnfy[num2].actual_amount
        //     wtjnfy.splice(num2, 1)
        //   }
        //   let num3 = wtjwfy.findIndex(elet => elet.document_date === element.document_date)
        //   if(num3!=-1){
        //     element.wtjwfy = wtjwfy[num3].actual_amount
        //     wtjwfy.splice(num3, 1)
        //   }
        //   let num4 = wxzctx.findIndex(elet => elet.document_date === element.document_date)
        //   if(num4!=-1){
        //     element.wxzctx = wxzctx[num4].actual_amount
        //     wxzctx.splice(num4, 1)
        //   }
        //   let num5 = xmxx.findIndex(elet => elet.document_date === element.document_date)
        //   if(num5!=-1){
        //     element.xmxx = xmxx[num5].actual_amount
        //     xmxx.splice(num5, 1)
        //   }
        //   let num6 = zjfy.findIndex(elet => elet.document_date === element.document_date)
        //   if(num6!=-1){
        //     element.zjfy = zjfy[num6].actual_amount
        //     zjfy.splice(num6, 1)
        //   }
        //   let num7 = zjtrfy.findIndex(elet => elet.document_date === element.document_date)
        //   if(num7!=-1){
        //     element.zjtrfy = zjtrfy[num7].actual_amount
        //     zjtrfy.splice(num7, 1)
        //   }
        // });
        // this.datatable = ryrgfy.concat(qtfy, xcpsjf,wtjnfy,wtjwfy,wxzctx,xmxx,zjfy,zjtrfy);
      })
    },
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
  max-width: 70px;
}

.table>tbody>tr>td {
  min-width: 70px;
  max-width: 70px;
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
}
</style>
