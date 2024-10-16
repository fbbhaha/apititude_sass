<template>
  <transition name="el-zoom-in-center">
    <div class="CCIT-common-layout">
      <div class="CCIT-common-layout-left">
        <div class="CCIT-common-title" @click="goback">
          <div class="fhsj">返回上级</div>
        </div>
        <el-menu :default-active="bznum" active-text-color="#ffffff" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="checknum('1')">
            <i class="el-icon-menu"></i>
            <span slot="title">人员工时</span>
          </el-menu-item>
          <!-- <el-menu-item index="2" @click="checknum('2')">
            <i class="el-icon-menu"></i>
            <span slot="title">设备工时</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="3" @click="checknum('3')">
            <i class="el-icon-document"></i>
            <span slot="title">无形资产工时</span>
          </el-menu-item> -->
          <el-menu-item index="4" @click="checknum('4')">
            <i class="el-icon-setting"></i>
            <span slot="title">消耗材料</span>
          </el-menu-item>
          <el-menu-item index="5" @click="checknum('5')">
            <i class="el-icon-setting"></i>
            <span slot="title">消耗燃料</span>
          </el-menu-item>
          <el-menu-item index="6" @click="checknum('6')">
            <i class="el-icon-setting"></i>
            <span slot="title">消耗动力</span>
          </el-menu-item>
          <el-menu-item index="7" @click="checknum('7')">
            <i class="el-icon-setting"></i>
            <span slot="title">成果管理</span>
          </el-menu-item>
          <el-menu-item index="8" @click="checknum('8')">
            <i class="el-icon-setting"></i>
            <span slot="title">结题验收</span>
          </el-menu-item>
          <el-menu-item index="9" @click="checknum('9')">
            <i class="el-icon-setting"></i>
            <span slot="title">备查文件</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="xminfo">
        <div class="contenttwo" v-if="bznum == '1'">
          <div class="buttonline">
            <div class="leftbutton">
              <div class="itemry">
                <el-date-picker v-model="rydate" value-format="yyyy-MM" type="month" placeholder="选择查询月份">
                </el-date-picker>
              </div>
              <div class="itemry">
                <el-button type="primary" @click="getProjectMemberHourInfo">查询</el-button>
              </div>
            </div>
          </div>
          <div class="table-content">
            <table border="0" align="center" cellpadding="0" cellspacing="0" class="tableInfo">
              <tr>
                <th width="50">序号</th>
                <th width="100">部门</th>
                <th width="100">职务</th>
                <th width="200">研发人员</th>
                <th width="100">RD类型</th>
                <th v-for="(it, ind) in monthOfReport" :key="ind" width="110">{{ it.day }}
                </th>
              </tr>
              <tr v-for="(item, index) in rygstableData" :key="item.id">
                <td width="50">{{ index + 1 }}</td>
                <td width="100">{{ item.depart }}</td>
                <td width="100">{{ item.zhiwu }}</td>
                <td width="200">{{ item.rdPerson }}</td>
                <td width="100">{{ item.rdType }}</td>
                <td v-for="(it, ind) in item.memberHourEntitys" :key="ind" width="110" @click="editrygs(it.id)">
                  {{ it.workHour }}
                </td>
              </tr>
            </table>
          </div>
          <!-- <div>
            <template>
              <el-table :data="rygstableData" border style="width: 100%">
                <el-table-column prop="depart" label="部门" width="0" align="left" />
                <el-table-column prop="zhiwu" label="职务" width="0" align="left" />
                <el-table-column prop="rdPerson" label="研发人员" width="0" align="left" />
                <el-table-column prop="rdType" label="RD类型" width="0" align="left" />
                <el-table-column prop="workHour" label="工时" width="0" align="left" />
                <el-table-column prop="createTime" label="创建时间" width="0" align="left" />
                <el-table-column prop="updateTime" label="更新时间" width="0" align="left" />
                <el-table-column prop="operator" label="操作人" width="0" align="left" />
                <el-table-column prop="day" label="填报工时日期" width="0" align="left" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxmcy(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxmcy(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div> -->
        </div>
        <!-- <div class="contentone xmlxtwo" v-if="bznum == '2'">
        </div> -->
        <div class="contenttwo" v-if="bznum == '3'">

        </div>
        <div class="contenttwo" v-if="bznum == '4'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenxhcl">添加消耗材料</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="leftbutton">
              <div class="itemry">
                <el-input v-model="xhclform.materialName" placeholder="请输入材料名称" />
              </div>
              <div class="itemry">
                <el-button type="primary">查询</el-button>
              </div>
            </div>
          </div>
          <div>
            <template>
              <el-table :data="xhcltableData" border style="width: 100%">
                <el-table-column prop="documentNo" label="单据编号" width="0" align="left" />
                <el-table-column prop="materialName" label="材料名称" width="0" align="left" />
                <el-table-column prop="modelSpecification" label="型号规格" width="0" align="left" />
                <el-table-column prop="consumeTime" label="消耗日期" width="0" align="left" />
                <el-table-column label="单位" width="0" prop="unit" algin="left" />
                <el-table-column prop="consumeNum" label="消耗数量" width="0" align="left" />
                <el-table-column prop="uinitPrice" label="单价" width="0" align="left" />
                <el-table-column prop="money" label="金额" width="0" align="left" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxmxhcl(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxmxhcl(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="contenttwo" v-if="bznum == '5'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenxhrl">添加消耗燃料</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="leftbutton">
              <div class="itemry">
                <el-input v-model="xhrlform.fuelName" placeholder="请输入燃料名称" />
              </div>
              <div class="itemry">
                <el-button type="primary" @click="getProjectEquipmentInfo">查询</el-button>
              </div>
            </div>
          </div>
          <div>
            <template>
              <el-table :data="xhrltableData" border style="width: 100%">
                <el-table-column prop="documentNo" label="单据编号" width="0" align="left" />
                <el-table-column prop="fuelName" label="燃料名称" width="0" align="left" />
                <el-table-column prop="consumeTime" label="消耗日期" width="0" align="left" />
                <el-table-column label="单位" width="0" prop="unit" algin="left">
                  <template slot-scope="scope">
                    {{ scope.row.unit | dynamicText(unitOptions) }}
                  </template>
                </el-table-column>
                <el-table-column prop="consumeNum" label="消耗数量" width="0" align="left" />
                <el-table-column prop="uinitPrice" label="单价" width="0" align="left" />
                <el-table-column prop="money" label="金额" width="0" align="left" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxmrl(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxmrl(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="contenttwo" v-if="bznum == '6'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenxmxhdl">添加消耗动力</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="leftbutton">
              <div class="itemry">
                <el-input v-model="xhdlform.rdElectric" placeholder="请输入研发设备电度数" />
              </div>
              <div class="itemry">
                <el-button type="primary">查询</el-button>
              </div>
            </div>
          </div>
          <div>
            <template>
              <el-table :data="xhdltableData" border style="width: 100%">
                <el-table-column prop="adjustFactor" label="调整系数" width="0" align="left" />
                <el-table-column prop="rdElectric" label="研发设备电度数" width="0" align="left" />
                <el-table-column prop="checkTime" label="核算时间" width="0" align="left" />
                <el-table-column prop="assistElectric" label="辅助设备电度数" width="0" align="left" />
                <el-table-column prop="uinitPrice" label="单价" width="0" align="left" />
                <el-table-column prop="otherMoney" label="其它动力金额" width="0" align="left" />
                <el-table-column prop="totalMoney" label="动力总金额" width="0" align="left" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxhdl(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxhdl(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="contenttwo" v-if="bznum == '7'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenxmcg">添加成果</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="leftbutton">
              <div class="itemry">
                <el-input v-model="cgglform.achievementName" placeholder="请输入成果名称" />
              </div>
              <div class="itemry">
                <el-button type="primary">查询</el-button>
              </div>
            </div>
          </div>
          <div>
            <template>
              <el-table :data="xmcgtableData" border style="width: 100%">
                <el-table-column prop="achievementName" label="成果名称" width="0" align="left" />
                <el-table-column prop="achievementCertificateNo" label="成果证书号" width="0" align="left" />
                <el-table-column prop="achievementType" label="成果类型" width="0" align="left" />
                <el-table-column prop="achievementLevel" label="成果水平" width="0" align="left" />
                <el-table-column prop="getTime" label="获得时间" width="0" align="left" />
                <el-table-column prop="getWay" label="获得方式" width="0" align="left" />
                <el-table-column prop="filename" label="成果附件" width="0" align="left" />
                <el-table-column prop="createTime" label="创建时间" width="0" align="left" />
                <el-table-column prop="updateTime" label="更新时间" width="0" align="left" />
                <el-table-column prop="operator" label="操作人" width="0" align="left" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxmcg(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxmcg(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="contenttwo" v-if="bznum == '8'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenjtys">添加结题验收</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="leftbutton">
              <div class="itemry">
                <el-input v-model="jtysform.type" placeholder="请输入类型" />
              </div>
              <div class="itemry">
                <el-button type="primary" @clcik="getProjectFinalAcceptanceInfo">查询</el-button>
              </div>
            </div>
          </div>
          <div>
            <template>
              <el-table :data="jtystableData" border style="width: 100%">
                <el-table-column prop="type" label="类型" width="0" align="left" />
                <el-table-column prop="checkTime" label="验收时间" width="0" align="left" />
                <el-table-column prop="checkPerson" label="验收人员" width="0" align="left" />
                <el-table-column prop="checkContent" label="验收内容" width="0" align="left" />
                <el-table-column prop="checkConclusion" label="验收结论" width="0" align="left" />
                <el-table-column prop="filename" label="验收附件" width="0" align="left" />
                <el-table-column prop="operator" label="操作人" width="0" align="left" />
                <el-table-column prop="updateTime" label="更新时间" width="0" align="left" />
                <el-table-column prop="createTime" label="创建时间" width="0" align="left" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxmjtys(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxmjtys(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="contenttwo" v-if="bznum == '9'">
          <div class="buttonline">
            <div class="leftbutton">
              <div class="itemry">
                <el-date-picker v-model="yeardate" type="year" placeholder="选择年">
                </el-date-picker>
              </div>
              <div class="itemry">
                <el-button type="primary" @click="getReferenceDocumentInfo">查询</el-button>
              </div>
            </div>
            <div class="table-content">
              <template>
                <el-row>
                  <el-col :span="8" v-for="(o, index) in bcwjList" :key="o.id" :offset="index%4== 0 ? 0 : 1">
                    <el-card :body-style="{ padding: '0px' }">
                      <div class="topntitle">
                        <div class="imgicon">
                          <i class="el-icon-folder-remove" style="color:#1890ff"></i>
                        </div>
                        <div class="titleitem">{{o.name}}</div>
                      </div>
                      <div class="datetime">{{o.updateTime?o.updateTime:o.createTime}}</div>
                      <div class="footinfo">
                        <div class="bottomitem">
                          <el-button type="primary" plain @click="yulan(o)">预览</el-button>
                        </div>
                        <div class="bottomitem">
                          <el-button type="primary"  @click="download(o)">下载</el-button>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- 编辑消耗材料信息 -->
      <el-dialog title="编辑消耗材料信息" :close-on-click-modal="false" append-to-body :visible.sync="rygsformVisible"
        class="CCIT-dialog CCIT-dialog_center" lock-scroll width="600px">
        <el-row :gutter="15" class="">
          <el-form ref="elForm" :model="rylbform" :rules="rules" size="small" label-width="100px" label-position="right">
            <template>
              <el-col :span="24">
                <el-form-item label="当前时间" prop="documentNo">
                  <el-input v-model="rylbform.day" placeholder="请输入" clearable :style='{ "width": "100%" }'
                    :disabled="true">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="员工工时" prop="materialName">
                  <el-input v-model="rylbform.workHour" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                  </el-input>
                </el-form-item>
              </el-col>
            </template>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="xhdlformVisible = false"> 取 消</el-button>
          <el-button type="primary" @click="aadprojectMemberHour"> 确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增消耗材料信息 -->
      <el-dialog title="新增消耗材料信息" :close-on-click-modal="false" append-to-body :visible.sync="xhclformVisible"
        class="CCIT-dialog CCIT-dialog_center" lock-scroll width="600px">
        <el-row :gutter="15" class="">
          <el-form ref="elForm" :model="xhclform" :rules="rules" size="small" label-width="100px" label-position="right">
            <template>
              <el-col :span="24">
                <el-form-item label="单据编号" prop="documentNo">
                  <el-input v-model="xhclform.documentNo" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="材料名称" prop="materialName">
                  <el-input v-model="xhclform.materialName" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="型号规格" prop="modelSpecification">
                  <el-input v-model="xhclform.modelSpecification" placeholder="请输入" clearable
                    :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="消耗日期" prop="consumeTime">
                  <el-date-picker v-model="xhclform.consumeTime" placeholder="请选择" clearable :style='{ "width": "100%" }'
                    type="date" format="yyyy-MM-dd" value-format="timestamp">

                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="单位" prop="unit">
                  <el-radio-group v-model="xhclform.unit" size="small">
                    <el-radio v-for="(item, index) in unitOptions" :key="index" :label="item.id"
                      :disabled="item.disabled">
                      {{ item.fullName }}
                    </el-radio>

                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="消耗数量" prop="consumeNum">
                  <el-input v-model="xhclform.consumeNum" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="单价" prop="uinitPrice">
                  <el-input v-model="xhclform.uinitPrice" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="金额" prop="money">
                  <el-input v-model="xhclform.money" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </template>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="xhclformVisible = false"> 取 消</el-button>
          <el-button type="primary" @click="aadprojectCostMaterial"> 确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增消耗燃料信息 -->
      <el-dialog title="新增消耗燃料信息" :close-on-click-modal="false" append-to-body :visible.sync="xhrlformVisible"
        class="CCIT-dialog CCIT-dialog_center" lock-scroll width="600px">
        <el-row :gutter="15" class="">
          <el-form ref="elForm" :model="xhrlform" :rules="rules" size="small" label-width="100px" label-position="right">
            <template>
              <el-col :span="24">
                <el-form-item label="单据编号" prop="documentNo">
                  <el-input v-model="xhrlform.documentNo" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="燃料名称" prop="fuelName">
                  <el-input v-model="xhrlform.fuelName" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="消耗日期" prop="consumeTime">
                  <el-date-picker v-model="xhrlform.consumeTime" placeholder="请选择" clearable :style='{ "width": "100%" }'
                    type="date" format="yyyy-MM-dd" value-format="timestamp">

                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="单位" prop="unit">
                  <el-radio-group v-model="xhrlform.unit" size="small">
                    <el-radio v-for="(item, index) in unitOptions" :key="index" :label="item.id"
                      :disabled="item.disabled">
                      {{ item.fullName }}
                    </el-radio>

                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="消耗数量" prop="consumeNum">
                  <el-input v-model="xhrlform.consumeNum" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="单价" prop="uinitPrice">
                  <el-input v-model="xhrlform.uinitPrice" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="金额" prop="money">
                  <el-input v-model="xhrlform.money" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </template>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="xhrlformVisible = false"> 取 消</el-button>
          <el-button type="primary" @click="aadprojectCostFuel"> 确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增消耗动力信息 -->
      <el-dialog title="新增消耗动力信息" :close-on-click-modal="false" append-to-body :visible.sync="xhdlformVisible"
        class="CCIT-dialog CCIT-dialog_center" lock-scroll width="600px">
        <el-row :gutter="15" class="">
          <el-form ref="elForm" :model="xhdlform" :rules="rules" size="small" label-width="100px" label-position="right">
            <template>
              <el-col :span="24">
                <el-form-item label="调整系数" prop="adjustFactor">
                  <el-input v-model="xhdlform.adjustFactor" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="研发设备电度数" prop="rdElectric">
                  <el-input v-model="xhdlform.rdElectric" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="核算时间" prop="checkTime">
                  <el-date-picker v-model="xhdlform.checkTime" placeholder="请选择" clearable :style='{ "width": "100%" }'
                    type="date" format="yyyy-MM-dd" value-format="timestamp">

                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="辅助设备电度数" prop="assistElectric">
                  <el-input v-model="xhdlform.assistElectric" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                    <template slot="append">度</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="单价" prop="uinitPrice">
                  <el-input v-model="xhdlform.uinitPrice" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="其它动力金额" prop="otherMoney">
                  <el-input v-model="xhdlform.otherMoney" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="动力总金额" prop="totalMoney">
                  <el-input v-model="xhdlform.totalMoney" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </template>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="xhdlformVisible = false"> 取 消</el-button>
          <el-button type="primary" @click="aadprojectCostPower"> 确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增成果信息 -->
      <el-dialog title="新增成果信息" :close-on-click-modal="false" append-to-body :visible.sync="cgglformVisible"
        class="CCIT-dialog CCIT-dialog_center" lock-scroll width="600px">
        <el-row :gutter="15" class="">
          <el-form ref="elForm" :model="cgglform" :rules="rules" size="small" label-width="100px" label-position="right">
            <template>
              <el-col :span="24">
                <el-form-item label="成果名称" prop="achievementName">
                  <el-input v-model="cgglform.achievementName" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成果证书号" prop="achievementCertificateNo">
                  <el-input v-model="cgglform.achievementCertificateNo" placeholder="请输入" clearable
                    :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成果类型" prop="achievementType">
                  <el-input v-model="cgglform.achievementType" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成果水平" prop="achievementLevel">
                  <el-input v-model="cgglform.achievementLevel" placeholder="请输入" clearable :style='{ "width": "100%" }'>

                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="获得时间" prop="getTime">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="cgglform.getTime" type="date" placeholder="选择获得时间">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="获得方式" prop="getWay">
                  <template>
                    <el-radio v-model="cgglform.getWay" label="自主研发">自主研发</el-radio>
                    <el-radio v-model="cgglform.getWay" label="合作研发">合作研发</el-radio>
                  </template>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="成果附件" prop="achievementAnnex">
                  <el-upload class="upload-demo" :headers="{ Authorization: $store.getters.token }" :action="fileUrl"
                    :on-preview="handlePreview" :on-remove="cgglhandleRemove" :before-remove="beforeRemove" :limit="1"
                    :on-exceed="handleExceed" :on-success="cgglhandleFileSuccess" :file-list="xmcgbg">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </template>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cgglformVisible = false"> 取 消</el-button>
          <el-button type="primary" @click="aadprojectAchievementManage"> 确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增结题验收信息 -->
      <el-dialog title="新增结题验收信息" :close-on-click-modal="false" append-to-body :visible.sync="jtysformVisible"
        class="CCIT-dialog CCIT-dialog_center" lock-scroll width="600px">
        <el-row :gutter="15" class="">
          <el-form ref="elForm" :model="jtysform" :rules="rules" size="small" label-width="100px" label-position="right">
            <template>
              <el-col :span="24">
                <el-form-item label="类型" prop="type">
                  <el-input v-model="jtysform.type" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="验收时间" prop="checkTime">
                  <el-date-picker v-model="jtysform.checkTime" placeholder="请选择" clearable :style='{ "width": "100%" }'
                    type="date" format="yyyy-MM-dd" value-format="timestamp">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="验收人员" prop="checkPerson">
                  <el-input v-model="jtysform.checkPerson" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="验收内容" prop="checkContent">
                  <el-input v-model="jtysform.checkContent" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="验收结论" prop="checkConclusion">
                  <el-input v-model="jtysform.checkConclusion" placeholder="请输入" clearable :style='{ "width": "100%" }'>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="验收附件" prop="checkAppendix">
                  <el-upload class="upload-demo" :headers="{ Authorization: $store.getters.token }" :action="fileUrl"
                    :on-preview="handlePreview" :on-remove="ysfjhandleRemove" :before-remove="beforeRemove" :limit="1"
                    :on-exceed="handleExceed" :on-success="ysfjhandleFileSuccess" :file-list="xmysfj">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </template>
          </el-form>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="jtysformVisible = false"> 取 消</el-button>
          <el-button type="primary" @click="aadprojectFinalAcceptance"> 确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </transition>
</template>
<script>
import {
  aadprojectEquipment,
  projectEquipmentdetail,
  projectEquipmentdelete,
  getProjectEquipmentInfo,
  aadvirtualAsset,
  virtualAssetdetail,
  virtualAssetdelete,
  getVirtualAssetInfo,
  aadprojectBuilding,
  projectBuildingdelete,
  projectBuildingdetail,
  getProjectBuildingInfo,
  getProjectMemberHourInfo,
  projectMemberHourdetail,
  aadprojectMemberHour,
  aadprojectAchievementManage,
  projectAchievementManagedetail,
  projectAchievementManagedelete,
  getProjectAchievementManageInfo,
  aadprojectCostPower,
  projectCostPowerdetail,
  projectCostPowerdelete,
  getProjectCostPowerInfo,
  aadprojectFinalAcceptance,
  projectFinalAcceptancedetail,
  projectFinalAcceptancedelete,
  getProjectFinalAcceptanceInfo,
  aadprojectCostMaterial,
  projectCostMaterialdetail,
  projectCostMaterialrdelete,
  getProjectCostMaterialInfo,
  aadprojectCostFuel,
  projectCostFueldetail,
  projectCostFueldelete,
  getProjectCostFuelInfo,
  getReferenceDocumentInfo
} from '@/api/yfxmgln/yfxmgln'
export default {
  name: 'permission-department',
  props: {
    projectinfo: { type: Object },
  },
  data() {
    return {
      yeardate:new Date().getFullYear()+'',
      bcwjList:[],//备查文件列表
      monthOfReport: [],//日期列表
      unitOptions: [{ "fullName": "个", "id": "个" }, { "fullName": "批", "id": "批" }, { "fullName": "组", "id": "组" }],
      xhclformVisible: false,//消耗材料弹框
      xhclform: {//消耗材料
        proId: this.projectinfo.projectNo,
        documentNo: '',
        materialName: '',
        modelSpecification: '',
        consumeTime: '',
        unit: '',
        consumeNum: '',
        uinitPrice: '',
        money: '',
      },
      xhcltableData: [],//消耗材料列表
      xhrlformVisible: false,//消耗燃料弹框
      xhrlform: {
        proId: this.projectinfo.projectNo,
        documentNo: '',
        fuelName: '',
        consumeTime: '',
        unit: "",
        consumeNum: '',
        uinitPrice: '',
        money: '',
      },
      xhrltableData: [],//消耗燃料列表
      xhdlformVisible: false,//消耗动力弹框
      rydate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)),
      rylbform: {
        "day": '',
        "proId": this.projectinfo.projectNo,
        "workHour": ''
      },
      xhdlform: {
        id: '',
        proId: this.projectinfo.projectNo,
        adjustFactor: '',
        rdElectric: '',
        checkTime: '',
        assistElectric: '',
        uinitPrice: '',
        otherMoney: '',
        totalMoney: '',
      },
      xhdltableData: [],//消耗动力列表
      rygsformVisible: false,//人员工时弹框
      rygstableData: [],//人员工时
      cgglformVisible: false,//成果管理弹框
      xmcgbg: [//成果列表
      ],
      cgglform: {
        achievementName: '',
        achievementCertificateNo: '',
        achievementType: '',
        achievementLevel: '',
        getWay: '',
        achievementAnnex: '',
        proId: this.projectinfo.projectNo,
        companyId: '',
      },
      xmcgtableData: [],//成果管理列表
      jtysformVisible: false,//结题验收弹框
      jtysform: {
        type: '',
        checkTime: '',
        checkPerson: '',
        checkContent: '',
        checkConclusion: '',
        checkAppendix: '',
        operator: '',
        proId: this.projectinfo.projectNo,
        companyId: '',
        updateTime: '',
        createTime: '',
      },
      jtystableData: [],//结题验收列表
      xmysfj: [],//结题验收附件列表
      bznum: '1',//项目管理步骤切换


      fileUrl: process.env.VUE_APP_BASE_API + "/api/extend/initInfo/Uploader",
      xmlxrws: [//项目计划任务书

      ],




      listLoading: true,
      companyId: '',

      // 表单校验
      rules: {
        // groupRegion: [
        //   { required: true, message: "所属地区不能为空", trigger: "blur" }
        // ],
        // groupVillage: [
        //   { required: true, message: "所属村不能为空", trigger: "blur" }
        // ],
        // name: [
        //   { required: true, message: "姓名不能为空", trigger: "blur" }
        // ],
        // phoneNumber:[{
        //   validator: cheackMobile, trigger: 'blur'
        // }],
        // idNo:[{
        //   validator: cheackIdcard, trigger: 'blur'
        // }],
      }
    }
  },
  watch: {
    projectinfo(val) {
      this.xhclform.proId = val.projectNo
      this.xhrlform.proId = val.projectNo
      this.xhdlform.proId = val.projectNo
      this.cgglform.proId = val.projectNo
      this.jtysform.proId = val.projectNo

      if (val.projectNo) {
        this.getProjectMemberHourInfo()
      }
    }
  },
  created() {
    if (this.projectinfo.id) {
      this.getProjectMemberHourInfo()
    }
  },
  methods: {
    goback() {//返回
      this.bznum = 1;
      this.$emit("closexmgc", false);
    },
    addopenxhcl() {
      this.cealxhclformData()
      this.xhclformVisible = true
    },
    addopenxhrl() {
      this.cealxhrlformData()
      this.xhrlformVisible = true
    },
    addopenxmxhdl() {
      this.cealxhdlformData()
      this.xhdlformVisible = true
    },
    addopenxmcg() {
      this.cealxmcgformData()
      this.cgglformVisible = true
    },
    addopenjtys() {
      this.cealjtysformData()
      this.jtysformVisible = true
    },
    editrygs(id) {
      let _this = this
      projectMemberHourdetail(id).then(response => {
        if (response.code == 200) {
          _this.rylbform = response.data
          this.rygsformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    aadprojectMemberHour() {//保存人员工时
      let _this = this
      aadprojectMemberHour(this.rylbform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          this.rygsformVisible = false
          this.getProjectMemberHourInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    getProjectMemberHourInfo() {//查询人员工时
      let _this = this
      let parm = {
        "currentPage": 1,
        "pageSize": 20,
        "month": this.rydate.replace('-', ''),
        "proId": this.projectinfo.projectNo,
      }
      this.rylbform.proId = this.projectinfo.projectNo
      getProjectMemberHourInfo(parm).then(response => {
        if (response.code == 200 && response.data) {
          _this.rygstableData = response.data.list
          _this.monthOfReport = _this.rygstableData[0].memberHourEntitys
          _this.monthOfReport.forEach(element => {
            element.day = element.day.replace('-', '')
          });
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getProjectAchievementManageInfo() {//成果管理查询列表
      let _this = this
      let parm = {
        "currentPage": 1,
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
      }
      getProjectAchievementManageInfo(parm).then(response => {
        if (response.code == 200) {
          _this.xmcgtableData = response.data.list
          _this.xmcgtableData.forEach(element => {
            if (element.achievementAnnex) {
              let dataarry = element.achievementAnnex.split(',')
              element.filename = dataarry[0]
            } else {
              element.filename = ''
            }
          });
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    aadprojectAchievementManage() {//添加成果
      let _this = this
      aadprojectAchievementManage(this.cgglform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          this.cgglformVisible = false
          this.getProjectAchievementManageInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    editxmcg(id) {//编辑成果
      let _this = this
      projectAchievementManagedetail(id).then(response => {
        if (response.code == 200) {
          _this.cgglform = response.data
          this.cgglformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    delxmcg(id) {//删除成果
      let _this = this
      projectAchievementManagedelete(id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          this.cgglformVisible = true
          this.getProjectAchievementManageInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },

    getProjectFinalAcceptanceInfo() {//结题验收查询列表
      let _this = this
      let parm = {
        "currentPage": 1,
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
      }
      getProjectFinalAcceptanceInfo(parm).then(response => {
        if (response.code == 200) {
          _this.jtystableData = response.data.list
          _this.jtystableData.forEach(element => {
            if (element.checkAppendix) {
              let dataarry = element.checkAppendix.split(',')
              element.filename = dataarry[0]
            } else {
              element.filename = ''
            }
          });
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    aadprojectFinalAcceptance() {//添加结题验收
      let _this = this
      aadprojectFinalAcceptance(this.jtysform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          this.jtysformVisible = false
          this.getProjectFinalAcceptanceInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    editxmjtys(id) {//编辑结题验收
      let _this = this
      projectFinalAcceptancedetail(id).then(response => {
        if (response.code == 200) {
          _this.jtysform = response.data
          if (_this.jtysform.checkAppendix) {
            let dataarry = _this.jtysform.checkAppendix.split(',')
            let parm = {
              name: dataarry[0],
              url: dataarry[1]
            }
          }
          this.jtysformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    delxmjtys(id) {//删除结题验收
      let _this = this
      projectFinalAcceptancedelete(id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          this.getProjectFinalAcceptanceInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },

    getProjectCostPowerInfo() {//消耗动力查询列表
      let _this = this
      let parm = {
        "currentPage": 1,
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
      }
      getProjectCostPowerInfo(parm).then(response => {
        if (response.code == 200) {
          _this.xhdltableData = response.data.list
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    aadprojectCostPower() {//添加消耗动力
      let _this = this
      aadprojectCostPower(this.xhdlform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          this.xhdlformVisible = false
          this.getProjectCostPowerInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    editxhdl(id) {//编辑消耗动力
      let _this = this
      projectCostPowerdetail(id).then(response => {
        if (response.code == 200) {
          _this.xhdlform = response.data
          this.xhdlformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    delxhdl(id) {//删除消耗动力
      let _this = this
      projectCostPowerdelete(id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          this.cgglformVisible = true
          this.getProjectCostPowerInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      })
    },
    checknum(num) {//切换项目tab
      this.bznum = num
      if (this.bznum == '2') {
        this.initInfodetaildata()
      } else if (this.bznum == '3') {
      } else if (this.bznum == '4') {
        this.getProjectCostMaterialInfo()
      } else if (this.bznum == '5') {
        this.getProjectEquipmentInfo()
      } else if (this.bznum == '6') {
        this.getProjectCostPowerInfo()
      } else if (this.bznum == '7') {
        this.getProjectAchievementManageInfo()
      } else if (this.bznum == '8') {
        this.getProjectFinalAcceptanceInfo()
      }else if (this.bznum == '9') {
        this.getReferenceDocumentInfo()
      }
    },
    getReferenceDocumentInfo() {//查询备查文件
      let _this = this
      let parm = {
        "currentPage": 1,
        "pageSize": 20,
        "year":this.yeardate,
        "proId": this.projectinfo.projectNo,
      }
      getReferenceDocumentInfo(parm).then(response => {
        if (response.code == 200) {
          _this.bcwjList = response.data.list
          _this.bcwjList.forEach(element => {
            if(element.fileUrl){
              let dataarry = element.fileUrl.split(',')
              if(dataarry.length==2){
                element.name=dataarry[0]
              element.url=dataarry[1]
              }else{
                element.name=''
                element.url=dataarry[0]
              }
             
            }
          });
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },

    aadprojectCostMaterial() {//保存消耗材料
      let _this = this
      aadprojectCostMaterial(this.xhclform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.xhclformVisible = false
          _this.getProjectCostMaterialInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getProjectCostMaterialInfo() {//查询项目消耗材料
      let _this = this
      let parm = {
        "currentPage": 1,
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
      }
      getProjectCostMaterialInfo(parm).then(response => {
        if (response.code == 200) {
          _this.xhcltableData = response.data.list
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },
    editxmxhcl(Id) {//查询项目消耗材料
      let _this = this
      projectCostMaterialdetail(Id).then(response => {
        if (response.code == 200) {
          _this.xhclform = response.data
          _this.xhclformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    delxmxhcl(Id) {//删除项目消耗材料
      let _this = this
      projectCostMaterialrdelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.getProjectCostMaterialInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    aadprojectCostFuel() {//保存消耗燃料信息
      let _this = this
      aadprojectCostFuel(this.xhrlform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.xhrlformVisible = false
          _this.getProjectCostFuelInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getProjectCostFuelInfo() {//查询消耗燃料列表
      let _this = this
      let parm = {
        "currentPage": 1,
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
      }
      getProjectCostFuelInfo(parm).then(response => {
        if (response.code == 200) {
          _this.xhrltableData = response.data.list
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    editxmrl(Id) {//项目消耗燃料详情
      let _this = this
      projectCostFueldetail(Id).then(response => {
        if (response.code == 200) {
          _this.xhrlform = response.data
          _this.xhrlformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    delxmrl(Id) {//删除消耗燃料
      let _this = this
      projectCostFueldelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.getProjectCostFuelInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },

    submitxmjzwfrom() {//保存建筑物项目
      let _this = this
      aadprojectBuilding(this.xmjzwform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.xmjzwformVisible = false
          _this.getProjectBuildingInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getProjectBuildingInfo() {//查询项目建筑物列表
      let _this = this
      let parm = {
        "buildingName": "",
        "buildingNo": "",
        "createTime": "",
        "currentPage": 1,
        "id": "",
        "joinTime": "",
        "keyword": "",
        "leaveTime": "",
        "operator": "",
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
        "sidx": "",
        "sort": "",
        "updateTime": "",
        "xmmc": ""
      }
      getProjectBuildingInfo(parm).then(response => {
        if (response.code == 200) {
          _this.xmjzwtableData = response.data.list
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },
    editxmjzw(Id) {//查询项目建筑物详情
      let _this = this
      projectBuildingdetail(Id).then(response => {
        if (response.code == 200) {
          _this.xmjzwform = response.data
          _this.xmjzwformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    delxmjzw(Id) {//删除项目建筑物
      let _this = this
      projectBuildingdelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.getProjectBuildingInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },

    submitxmwxzcfrom() {//保存无形资产项目
      let _this = this
      aadvirtualAsset(this.xmwxzcform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.xmwxzcformVisible = false
          _this.getVirtualAssetInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getVirtualAssetInfo() {//查询项目无形资产列表
      let _this = this
      let parm = {
        "assetName": "",
        "createTime": "",
        "currentPage": 1,
        "id": "",
        "joinTime": "",
        "keyword": "",
        "leaveTime": "",
        "operator": "",
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
        "purpose": "",
        "sidx": "",
        "sort": "",
        "type": "",
        "updateTime": "",
        "user": ""
      }
      getVirtualAssetInfo(parm).then(response => {
        if (response.code == 200) {
          _this.xmwxzctableData = response.data.list
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },
    editxmwxzc(Id) {//查询项目无形资产详情
      let _this = this
      virtualAssetdetail(Id).then(response => {
        if (response.code == 200) {
          _this.xmwxzcform = response.data
          _this.xmwxzcformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    delxmwxzc(Id) {//删除项目无形资产
      let _this = this
      virtualAssetdelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.getVirtualAssetInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },

    rwshandleFileSuccess(response, file, fileList) { // 文件上传成功处理
      this.form.planFilename = response.fullName
      this.form.planAssignment = response.filePath
    },
    handleFileSuccess(response, file, fileList) { // 文件上传成功处理
      this.form.resolutionFilename = response.fullName
      this.form.initiationResolution = response.filePath
    },
    ysfjhandleFileSuccess(response) {//验收附件文件上传成功处理
      this.jtysform.checkAppendix = response.fullName + ',' + response.filePath
    },
    ysfjhandleRemove() {//验收附件文件移除成功处理
      this.jtysform.checkAppendix = ''
      this.xmysfj = []
    },
    cgglhandleFileSuccess(response, file, fileList) {//成果附件文件上传成功处理
      this.cgglform.achievementAnnex = response.fullName + ',' + response.filePath
      this.xmcgbg = []
      let parm = {
        name: response.fullName,
        url: response.filePath
      }
      this.xmcgbg.push(parm)
    },
    cgglhandleRemove() {//成果附件文件移除成功处理
      this.cgglform.achievementAnnex = ''
      this.xmcgbg = []
    },
    handleRemove(file, fileList) {//文件移除操作
      console.log(file, fileList);
    },

    handlePreview(file) {//点击文件事件
      console.log(file);
    },
    handleExceed(files, fileList) {//提示限制文件个数
      this.$message.warning(`只允许上传一个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    fileuplod() {
      console.log(this.form.planAssignment)
    },
    cealxhclformData() {//消耗材料表单清空
      this.xhclform = {
        proId: this.projectinfo.projectNo,
        documentNo: '',
        materialName: '',
        modelSpecification: '',
        consumeTime: '',
        unit: '',
        consumeNum: '',
        uinitPrice: '',
        money: ''
      }
    },
    cealxhrlformData() {//消耗燃料表单清空
      this.xhrlform = {
        proId: this.projectinfo.projectNo,
        documentNo: '',
        fuelName: '',
        consumeTime: '',
        unit: "",
        consumeNum: '',
        uinitPrice: '',
        money: '',
      }
    },
    cealxhdlformData() {//消耗动力表单清空
      this.xhdlform = {
        proId: this.projectinfo.projectNo,
        adjustFactor: '',
        rdElectric: '',
        checkTime: '',
        assistElectric: '',
        uinitPrice: '',
        otherMoney: '',
        totalMoney: '',
      }
    },
    cealxmcgformData() {//项目成果表单清空
      this.cgglform = {
        achievementName: '',
        achievementCertificateNo: '',
        achievementType: '',
        achievementLevel: '',
        getWay: '',
        achievementAnnex: '',
        proId: this.projectinfo.projectNo,
        companyId: '',
      }
    },
    cealjtysformData() {//项目结题验收表单清空
      this.jtysform = {
        type: '',
        checkTime: '',
        checkPerson: '',
        checkContent: '',
        checkConclusion: '',
        checkAppendix: '',
        operator: '',
        proId: this.projectinfo.projectNo,
        companyId: '',
        updateTime: '',
        createTime: '',
      }
    },
  }
}
</script>
<style scoped lang="scss">
.fhsj {
  width: 160px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 2px;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
}

.xminfo {
  width: calc(100% - 220px);
  height: auto;
  background: #ffffff;

  .contentone {
    height: auto;
    width: 405px;
    margin-top: 120px;
    margin-left: 324px;

    &.xmlxtwo {
      width: 600px;
    }
  }

  .contenttwo {
    height: auto;
    width: auto;
    margin-top: 20px;
    margin-left: 30px;

    .table-content {
      overflow-x: auto;
      margin-left: 10px;
      margin-top: 50px;

      .tableInfo {
        width: 3000px;
        line-height: 36px;
        border-bottom: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        border-color: #ebeef5 currentcolor currentcolor #ebeef5;
        border-style: solid none none solid;
        border-width: 1px 0 0 1px;
        font-size: 14px;
        color: #555;

        th {
          height: 50px;
          text-align: center;
          border-right: 1px solid #ebeef5;
          border-bottom: 2px solid #e8e8e8;
          background: #fafafa;
        }

        td {
          height: 36px;
          text-align: center;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
        }
      }
    }

    .buttonline {
      height: auto;
      width: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;

      .titleinfo {
        color: #000;
        height: 32px;
        line-height: 32px;
        margin-left: 40%;
      }
    }

    .table-th {
      width: 100%;
      height: 32px;
      line-height: 32px;
      display: flex;
      background: #dcdfe6;

    }

    .table-tr {
      width: 100%;
      height: 32px;
      line-height: 32px;
      display: flex;
    }

    .item-cb {
      width: 12.5%;
      text-align: center;
      height: 32px;
      line-height: 32px;
      color: #666;
    }

    .leftbutton {
      height: auto;
      width: auto;
      display: flex;
      position: absolute;
      right: 10px;

      .itemry {
        margin-right: 10px;
      }
    }
  }
}

.tjrydia {
  width: 98%;
  height: 450px;
  margin-left: 5px;

  .tjry-top {
    width: 98%;
    height: 32px;
    display: flex;

    .marginleftry {
      margin-left: 46%;
    }
  }

  .tjry-content {
    width: 100%;
    display: flex;

    .tjry-itemA {
      height: 400px;
      width: 48%;
      border: 1px solid #cecdcd;
    }

    .tjry-itemB {
      width: 48%;
      border: 1px solid #cecdcd;
      margin-left: 10px;
      height: 400px;
      display: flex;
      flex-wrap: wrap;
      overflow-y: auto;

      .xzry {
        margin-top: 10px;
        margin-left: 20px;
      }
    }
  }
  
 
}
.table-content{
  width: 100%;
  margin-top: 50px;
  .topntitle{
    width: 100%;
    height: 32px;
    display: flex;
    margin-top: 5px;
    margin-left: 10px;
    .imgicon{
      width: auto;
      height: 32px;
      line-height: 32px;
    }
    .titleitem{
      width: auto;
      height: 32px;
      line-height: 32px;
      margin-left: 10px;
    }
  }
  .datetime{
    width: 100%;
    height: 32px;
    margin-top: 5px;
    margin-left: 10px;
  }
  .footinfo{
    width: 100%;
    height: 40px;
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    .bottomitem{
      height: 40px;
      line-height: 40px;
      width: 40%;
      margin-right: 10px;
    }
  }
  ::v-deep .el-col-8{
    width: 21.33333% !important;
    margin-bottom: 10px !important;
  }
}
</style>