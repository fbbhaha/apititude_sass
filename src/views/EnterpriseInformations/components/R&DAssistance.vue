<template> 
    <div >
        <div class="main-title">研发辅助账汇总</div>
        <div class="main"> 
          <div class="portlet box green ng-scope">
    <!-- <div class="portlet-title">
        <div class="caption">
            <i class="fa fa-list"></i><small class="ng-binding">辅助账汇总表</small></div>
        <div class="actions">
            <a class="btn yellow-lemon btn-sm hidden-xs">
                <i class="fa fa-file-excel-o"></i> 导出 </a>
            ngIf: enterpriseId -->
            <!-- <a class="btn btn-circle btn-icon-only btn-default btn-sm fullscreen hidden-xs" href="#" data-ng-click="addHeight()"> </a>
        </div> -->
    <!-- </div> -->
    <div class="portlet-body">
        <div id="table-content" class="table-responsive" style="position: relative; overflow: scroll; height: 692px;" get-height="">
            <table class="table table-bordered" border="1" cellspacing="0">
                <thead class="table-header">
                <tr>
                    <th colspan="2">
                        加计扣除年度：
                    </th>
                    <th colspan="4" class="text-center">
                        <select class="form-control ng-pristine ng-untouched ng-valid" data-ng-model="summaryLedger" data-ng-options="summaryLedger as summaryLedger.year for summaryLedger in summaryLedgers" data-ng-change="changeSelectYear()"><option label="2022" value="object:1214" selected="selected">2022</option><option label="2020" value="object:1215">2020</option><option label="2019" value="object:1216">2019</option></select>
                    </th>
                    <th colspan="4">
                        纳税人识别号：
                    </th>
                    <th colspan="7" class="ng-binding"></th>
                    <th style="white-space: pre-wrap !important;" colspan="4">
                        纳税人名称（盖章）：
                    </th>
                    <th style="white-space: pre-wrap !important;" colspan="7" class="ng-binding">杭州蔚芸科技有限公司</th>
                    <th style="white-space: pre-wrap !important;" colspan="14">金额单位：元（列至角分）</th>
                </tr>
                <tr>
                    <td style="white-space: pre-wrap !important;" rowspan="3"><div class="th-inner">项目</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">序号</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">项目名称</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">项目编号</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">研发形式</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">资本化、费用化支出选项</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">项目实施状态选项</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">委托方与受托方是否存在关联关系选项</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">是否委托境外选项</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">研发成果</div></td>
                    <td style="white-space: pre-wrap !important;" rowspan="4"><div class="th-inner">研发成果证书号</div></td>
                    <td style="white-space: pre-wrap !important;" colspan="3"><div class="th-inner">一、人员人工费用</div></td>
                    <td style="white-space: pre-wrap !important;" colspan="8"><div class="th-inner">二、直接投入费用</div></td>
                    <td style="white-space: pre-wrap !important;" colspan="2"><div class="th-inner">三、折旧费用</div></td>
                    <td style="white-space: pre-wrap !important;" colspan="3"><div class="th-inner">四、无形资产摊销</div></td>
                    <td style="white-space: pre-wrap !important;" colspan="4"><div class="th-inner">五、新产品设计费等</div></td>
                    <td style="white-space: pre-wrap !important;" colspan="5"><div class="th-inner">六、其他相关费用</div></td>
                    <td rowspan="3"><div class="th-inner" style="white-space: pre-wrap !important;">七、委托外部机构或个人进行研发活动所发生的费用</div></td>
                    <td rowspan="3"><div class="th-inner" style="white-space: pre-wrap !important;">其中：委托境外进行研发活动所发生的费用（包括存在关联关系的委托研发）</div></td>
                    <td rowspan="3" style="min-width:90px;"><div class="th-inner" style="white-space: pre-wrap !important;">八、允许加计扣除的研发费用中的第1至5类费用合计</div></td>
                    <td rowspan="3" style="min-width:90px;"><div class="th-inner" style="white-space: pre-wrap !important;">其他相关费用限额=序号8×10％/(1-10％)</div></td>
                    <td rowspan="3" style="min-width:90px;"><div class="th-inner" style="white-space: pre-wrap !important;">九、当期费用化支出可加计扣除总额</div></td>
                    <td rowspan="3"><div class="th-inner" style="white-space: pre-wrap !important;">当期资本化可加计扣除的研发费用率</div></td>
                </tr>
                <tr>
                    <td colspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">直接从事研发活动人员</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">外聘研发人员的劳务费用</div></td>
                    <td colspan="3"><div class="th-inner" style="white-space: pre-wrap !important;">研发活动直接消耗</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">用于中间试验和产品试制的模具、工艺装备开发及制造费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">用于不构成固定资产的样品、样机及一般测试手段购置费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">用于试制产品的检验费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">用于研发活动的仪器、设备的运行维护、调整、检验、维修等费用</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">通过经营租赁方式租入的用于研发活动的仪器、设备租赁费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">用于研发活动的仪器的折旧费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">用于研发活动的设备的折旧费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">用于研发活动的软件的摊销费用</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">用于研发活动的专利权的摊销费用</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">用于研发活动的非专利技术（包括许可证、专有技术、设计和计算方法等）的摊销费用</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">新产品设计费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">新工艺规程制定费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">新药研制的临床试验费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">勘探开发技术的现场试验费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">技术图书资料费、资料翻译费、专家咨询费、高新科技研发保险费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">研发成果的检索、分析、评议、论证、鉴定、评审、评估、验收费用</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">知识产权的申请费、注册费、代理费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">职工福利费、补充养老保险费、补充医疗保险费</div></td>
                    <td rowspan="2"><div class="th-inner" style="white-space: pre-wrap !important;">差旅费、会议费</div></td>
                </tr>
                <tr>
                    <td><div class="th-inner">工资薪金</div></td>
                    <td><div class="th-inner">五险一金</div></td>
                    <td><div class="th-inner">材料</div></td>
                    <td><div class="th-inner">燃料</div></td>
                    <td><div class="th-inner">动力费用</div></td>
                </tr>
                <tr>
                    <td style="max-width: 75px;min-width: 75px;"><div class="th-inner">行次、序号</div></td>
                    <td><div class="th-inner">1.1</div></td>
                    <td><div class="th-inner">1.2</div></td>
                    <td><div class="th-inner">1.3</div></td>
                    <td><div class="th-inner">2.1</div></td>
                    <td><div class="th-inner">2.2</div></td>
                    <td><div class="th-inner">2.3</div></td>
                    <td><div class="th-inner">2.4</div></td>
                    <td><div class="th-inner">2.5</div></td>
                    <td><div class="th-inner">2.6</div></td>
                    <td><div class="th-inner">2.7</div></td>
                    <td><div class="th-inner">2.8</div></td>
                    <td><div class="th-inner">3.1</div></td>
                    <td><div class="th-inner">3.2</div></td>
                    <td><div class="th-inner">4.1</div></td>
                    <td><div class="th-inner">4.2</div></td>
                    <td><div class="th-inner">4.3</div></td>
                    <td><div class="th-inner">5.1</div></td>
                    <td><div class="th-inner">5.2</div></td>
                    <td><div class="th-inner">5.3</div></td>
                    <td><div class="th-inner">5.4</div></td>
                    <td><div class="th-inner">6.1</div></td>
                    <td><div class="th-inner">6.2</div></td>
                    <td><div class="th-inner">6.3</div></td>
                    <td><div class="th-inner">6.4</div></td>
                    <td><div class="th-inner">6.5</div></td>
                    <td><div class="th-inner">7</div></td>
                    <td><div class="th-inner">7.1</div></td>
                    <td><div class="th-inner">8</div></td>
                    <td><div class="th-inner">8.1</div></td>
                    <td><div class="th-inner">9</div></td>
                    <td><div class="th-inner">9.1</div></td>
                </tr>
                </thead>
                <tbody class="table-body" style="display: block; margin-top: 253.889px;">
                <!-- ngRepeat: yearOriginalAmount in summaryLedger.yearOriginalAmounts -->
                    <tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                    <td style="max-width: 75px;min-width: 75px;" class="ng-binding">1</td>
                    <!-- ngIf: $index==0 --><td data-ng-if="$index==0" colspan="10" class="left ng-scope" style="white-space: pre-wrap !important;">期初余额</td><!-- end ngIf: $index==0 -->
                    <!-- ngIf: $index==1 -->
                    <!-- ngIf: $index==2 -->
                    <!-- ngIf: $index==3 -->
                    <!-- ngIf: $index==4 -->
                    <!-- ngIf: $index==5 -->
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">*</td>
                    <td>*</td>
                </tr><!-- end ngRepeat: yearOriginalAmount in summaryLedger.yearOriginalAmounts --><tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                    <td style="max-width: 75px;min-width: 75px;" class="ng-binding">2</td>
                    <!-- ngIf: $index==0 -->
                    <!-- ngIf: $index==1 --><td data-ng-if="$index==1" colspan="10" class="left ng-scope" style="white-space: pre-wrap !important;">本期借方发生额</td><!-- end ngIf: $index==1 -->
                    <!-- ngIf: $index==2 -->
                    <!-- ngIf: $index==3 -->
                    <!-- ngIf: $index==4 -->
                    <!-- ngIf: $index==5 -->
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">*</td>
                    <td>*</td>
                </tr><!-- end ngRepeat: yearOriginalAmount in summaryLedger.yearOriginalAmounts --><tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                    <td style="max-width: 75px;min-width: 75px;" class="ng-binding">3</td>
                    <!-- ngIf: $index==0 -->
                    <!-- ngIf: $index==1 -->
                    <!-- ngIf: $index==2 --><td data-ng-if="$index==2" colspan="10" class="left ng-scope" style="white-space: pre-wrap !important;">本期贷方发生额</td><!-- end ngIf: $index==2 -->
                    <!-- ngIf: $index==3 -->
                    <!-- ngIf: $index==4 -->
                    <!-- ngIf: $index==5 -->
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">*</td>
                    <td>*</td>
                </tr><!-- end ngRepeat: yearOriginalAmount in summaryLedger.yearOriginalAmounts --><tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                    <td style="max-width: 75px;min-width: 75px;" class="ng-binding">4</td>
                    <!-- ngIf: $index==0 -->
                    <!-- ngIf: $index==1 -->
                    <!-- ngIf: $index==2 -->
                    <!-- ngIf: $index==3 --><td data-ng-if="$index==3" colspan="10" class="left ng-scope" style="white-space: pre-wrap !important;">其中：结转管理费用</td><!-- end ngIf: $index==3 -->
                    <!-- ngIf: $index==4 -->
                    <!-- ngIf: $index==5 -->
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td>*</td>
                </tr><!-- end ngRepeat: yearOriginalAmount in summaryLedger.yearOriginalAmounts --><tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                    <td style="max-width: 75px;min-width: 75px;" class="ng-binding">5</td>
                    <!-- ngIf: $index==0 -->
                    <!-- ngIf: $index==1 -->
                    <!-- ngIf: $index==2 -->
                    <!-- ngIf: $index==3 -->
                    <!-- ngIf: $index==4 --><td data-ng-if="$index==4" colspan="10" class="left ng-scope" style="white-space: pre-wrap !important;">结转无形资产</td><!-- end ngIf: $index==4 -->
                    <!-- ngIf: $index==5 -->
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">*</td>
                    <td>*</td>
                </tr><!-- end ngRepeat: yearOriginalAmount in summaryLedger.yearOriginalAmounts --><tr data-ng-repeat="yearOriginalAmount in summaryLedger.yearOriginalAmounts" class="ng-scope">
                    <td style="max-width: 75px;min-width: 75px;" class="ng-binding">6</td>
                    <!-- ngIf: $index==0 -->
                    <!-- ngIf: $index==1 -->
                    <!-- ngIf: $index==2 -->
                    <!-- ngIf: $index==3 -->
                    <!-- ngIf: $index==4 -->
                    <!-- ngIf: $index==5 --><td data-ng-if="$index==5" colspan="10" class="left ng-scope" style="white-space: pre-wrap !important;">期末余额</td><!-- end ngIf: $index==5 -->
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">0</td>
                    <td style="min-width:90px;" class="ng-binding">*</td>
                    <td>*</td>
                </tr><!-- end ngRepeat: yearOriginalAmount in summaryLedger.yearOriginalAmounts -->
                <!-- ngRepeat: totalProject in summaryLedger.totalProjects track by $index --><tr data-ng-repeat="totalProject in summaryLedger.totalProjects track by $index" class="ng-scope">
                    <!-- ngIf: $index==0 --><td style="max-width: 75px;min-width: 75px;white-space: pre-wrap !important;" data-ng-if="$index==0" rowspan="4" class="ng-scope">项目明细（填写项目贷方发生额）</td><!-- end ngIf: $index==0 -->
                    <td class="ng-binding">1</td>
                    <td style="white-space: pre-wrap !important;" class="ng-binding">{{dataLat[0].projectname?dataTwo[0].projectname:'暂无'}}</td>
                    <td style="white-space: pre-wrap !important;word-break: break-all !important;" class="ng-binding">{{dataLat[0].projectno?dataTwo[0].projectno:'暂无'}}</td>
                    <td style="white-space: pre-wrap !important;" class="ng-binding">{{dataLat[0].yjxs?dataTwo[0].yjxs:'暂无'}}</td>
                    <td style="white-space: pre-wrap !important;" class="ng-binding">费用化</td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding">{{dataTwo[0].actualAmount?dataTwo[0].actualAmount:'暂无'}}</td>
                    <td class="ng-binding">{{dataTwo[0].threeAccount?dataTwo[0].threeAccount:'暂无'}}</td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                </tr><!-- end ngRepeat: totalProject in summaryLedger.totalProjects track by $index --><tr data-ng-repeat="totalProject in summaryLedger.totalProjects track by $index" class="ng-scope">
                    <!-- ngIf: $index==0 -->
                    <td class="ng-binding">2</td>
                    <td style="white-space: pre-wrap !important;" class="ng-binding">{{dataLat[1].projectname?dataTwo[1].projectname:'暂无'}}</td>
                    <td style="white-space: pre-wrap !important;word-break: break-all !important;" class="ng-binding">{{dataLat[1].projectno?dataTwo[1].projectno:'暂无'}}</td>
                    <td style="white-space: pre-wrap !important;" class="ng-binding">{{dataLat[1].yjxs?dataTwo[1].yjxs:'暂无'}}</td>
                    <td style="white-space: pre-wrap !important;" class="ng-binding">费用化</td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding">{{dataTwo[1].actualAmount?dataTwo[1].actualAmount:'暂无'}}</td>
                    <td class="ng-binding">{{dataTwo[1].threeAccount?dataTwo[1].threeAccount:'暂无'}}</td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                </tr><!-- end ngRepeat: totalProject in summaryLedger.totalProjects track by $index --><tr data-ng-repeat="totalProject in summaryLedger.totalProjects track by $index" class="ng-scope">
                    <!-- ngIf: $index==0 -->
                    <td class="ng-binding">3</td>
                    <td style="white-space: pre-wrap !important;" class="ng-binding">{{dataLat[2].projectname?dataTwo[2].projectname:'暂无'}}</td>
                    <td style="white-space: pre-wrap !important;word-break: break-all !important;" class="ng-binding">{{dataLat[2].projectno?dataTwo[2].projectno:'暂无'}}</td>
                    <td style="white-space: pre-wrap !important;" class="ng-binding">{{dataLat[2].yjxs?dataTwo[2].yjxs:'暂无'}}</td>
                    <td style="white-space: pre-wrap !important;" class="ng-binding">费用化</td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding">{{dataTwo[2].actualAmount?dataTwo[2].actualAmount:'暂无'}}</td>
                    <td class="ng-binding">{{dataTwo[2].threeAccount?dataTwo[2].threeAccount:'暂无'}}</td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                    <td class="ng-binding"></td>
                </tr><!-- end ngRepeat: totalProject in summaryLedger.totalProjects track by $index --><tr data-ng-repeat="totalProject in summaryLedger.totalProjects track by $index" class="ng-scope">
                    <!-- ngIf: $index==0 --> 
                </tr><!-- end ngRepeat: totalProject in summaryLedger.totalProjects track by $index -->
                </tbody>
            </table>
        </div>
    </div>
</div>
        </div>
    </div> 
  </template> 
  <script> 
  import {getProAccount} from'@/api/detail'
  export default {
    data() {
      return { 
        dataLat:[
          {
            accountMatching: "",
            actualAmount: "",
            adjustmentAmount: "",
            bookAmount: "",
            createBy: "",
            createTime: 1663689205000,
            deleted: null,
            direction: "",
            documentDate: "",
            documentNumber: "1",
            firstAccount: "",
            id: "",
            projectYear: "",
            remark: "",
            secondAccount: "",
            threeAccount: "",
            updateTime: 1663689205000
          },
          {
            accountMatching: "",
            actualAmount: "",
            adjustmentAmount: "",
            bookAmount: "",
            createBy: "",
            createTime: 1663689205000,
            deleted: null,
            direction: "",
            documentDate: "",
            documentNumber: "1",
            firstAccount: "",
            id: "",
            projectYear: "",
            remark: "",
            secondAccount: "",
            threeAccount: "",
            updateTime: 1663689205000
          },
          {
            accountMatching: "",
            actualAmount: "",
            adjustmentAmount: "",
            bookAmount: "",
            createBy: "",
            createTime: 1663689205000,
            deleted: null,
            direction: "",
            documentDate: "",
            documentNumber: "1",
            firstAccount: "",
            id: "",
            projectYear: "",
            remark: "",
            secondAccount: "",
            threeAccount: "",
            updateTime: 1663689205000
          },
        ],
        dataTwo:[
          {
            createby: "",
            createtime: 1663673243000,
            id: "",
            projectname: "",
            projectno: "",
            proyear: "",
            yjxs: "",
          },
          {
            createby: "",
            createtime: 1663673243000,
            id: "",
            projectname: "",
            projectno: "",
            proyear: "",
            yjxs: "",
          },
          {
            createby: "",
            createtime: 1663673243000,
            id: "",
            projectname: "",
            projectno: "",
            proyear: "",
            yjxs: "",
          },
        ],
        dataTable: [],
        typeNameArr: [],
        typeNamePos: 0,
        storeArr: [],
        storePos: 0,
        feeArr: [],
        feePos: 0,
        hoverOrderArr: [],
      };   
    }, 
    mounted() { 
    },
    created(){
      this.getProAccount()
    },
    methods: {
      changeType(row) {
        row.status = 1
      },
      getProAccount(){
        let data={
          createby:localStorage.getItem('userId')
        }
        getProAccount(data).then(res=>{ 
          this.dataLat = res.data.projectYearEntities?res.data.projectYearEntities :[]
          this.dataTwo = res.data.projectDetailEntities?res.data.projectDetailEntities:[]
        })
      },
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          if (data[i].normType === data[i - 1].normType) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
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
    padding:2%; 
    background-color: #fff; 
  }
  .main-title {
    font-size: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      padding-left:1% ;
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
    .headerColor,.portlet-title,.page-sidebar .page-sidebar-menu .sub-menu>li.active>a, .page-sidebar .page-sidebar-menu .sub-menu>li.open>a, .page-sidebar .page-sidebar-menu .sub-menu>li:hover>a, .page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu .sub-menu>li.active>a, .page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu .sub-menu>li.open>a, .page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu .sub-menu>li:hover>a
    ,.page-sidebar .page-sidebar-menu>li.active.open>a:hover, .page-sidebar .page-sidebar-menu>li.active>a:hover, .page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu>li.active.open>a:hover, .page-sidebar-closed.page-sidebar-fixed .page-sidebar:hover .page-sidebar-menu>li.active>a:hover{
        /* background-color: rgb(0 146 255) !important; */
    }
    #bgColor{
        background-color: #fff;

    }
    .page-header.navbar {
        height:110px!important;
        background-color: rgb(0 146 255) !important;
    }
    .page-header-fixed .page-container{
        margin-top:110px!important;
    }
    .page-sidebar-fixed .page-sidebar{
        top:110px!important;
    }
    @media screen and (max-width: 768px) {
        body{
            background-color: #eee !important;
        }
        .page-content-wrapper .page-content{
            padding-top: 0 !important;
        }
        .page-header.navbar {
            height:50px!important;
        }
        .page-header-fixed .page-container{
            margin-top:0px!important;
        }
        .page-sidebar-fixed .page-sidebar{
            top:50px!important;
        }
    }

</style>
<style class="ng-scope">
  .portlet{
      margin-top: 20px;
  }
  .table>thead>tr>th,.table>thead>tr>td{
      min-width: 70px;
      max-width: 70px;
  }
  .table>tbody>tr>td{
      min-width: 70px;
      max-width: 70px;
  }
  .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th{
      text-align: center;
      padding: 5px;
      vertical-align: middle;
      font-size: 12px;
      font-family: sans-serif;
  }
  .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
      border-bottom-width: 1px;
  }
  .left{
      text-align: left!important;
  }
  .table-header{
      position: absolute;
      top: 0;
      background-color: #fff;
      border-top: 1px solid #eee;
  }
  .th-inner{
    color: #333;
  }
  th{
    color: #333;
  }
  .ng-binding{
    color: #333;
  }
  td{
    color: #333;
  }
</style>
