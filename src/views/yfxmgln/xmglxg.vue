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
            <span slot="title">基础信息</span>
          </el-menu-item>
          <el-menu-item index="2" @click="checknum('2')">
            <i class="el-icon-menu"></i>
            <span slot="title">立项信息</span>
          </el-menu-item>
          <el-menu-item index="3" @click="checknum('3')">
            <i class="el-icon-document"></i>
            <span slot="title">项目筹备</span>
          </el-menu-item>
          <el-menu-item index="4" @click="checknum('4')">
            <i class="el-icon-setting"></i>
            <span slot="title">项目成员</span>
          </el-menu-item>
          <el-menu-item index="5" @click="checknum('5')">
            <i class="el-icon-setting"></i>
            <span slot="title">项目设备</span>
          </el-menu-item>
          <el-menu-item index="6" @click="checknum('6')">
            <i class="el-icon-setting"></i>
            <span slot="title">项目无形资产</span>
          </el-menu-item>
          <el-menu-item index="7" @click="checknum('7')">
            <i class="el-icon-setting"></i>
            <span slot="title">项目建筑物</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="xminfo">
        <div class="contentone" v-if="bznum == '1'">
          <el-form ref="baseform" :model="baseform" :rules="rules" label-width="130px">
            <el-form-item label="项目编号" prop="projectNo">
              <el-input v-model="baseform.projectNo" placeholder="请输入项目编号" :disabled="true" />
            </el-form-item>
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="baseform.projectName" placeholder="请输入项目名称" :disabled="true" />
            </el-form-item>
            <el-form-item label="项目来源" prop="projectSource">
              <el-select v-model="baseform.projectSource" placeholder="请输入项目来源">
                <el-option v-for="item in xmlyoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目类型" prop="projectType">
              <el-select v-model="baseform.projectType" placeholder="请输入项目类型">
                <el-option v-for="item in xmtypeoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="" prop="isEntrusted">
              <template>
                <el-radio v-model="baseform.isEntrusted" label="1">含委托研发</el-radio>
                <el-radio v-model="baseform.isEntrusted" label="0">不含委托研发</el-radio>
              </template>
            </el-form-item> -->
            <el-form-item label="技术领域" prop="technicalField">
              <el-input v-model="baseform.technicalField" placeholder="请输入技术领域" />
              <!-- <el-select v-model="form.technicalField" placeholder="请输入技术领域">
                <el-option v-for="item in jslxoptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="研发项目总预算" prop="projectBudget">
              <el-input v-model="baseform.projectBudget" placeholder="请输入">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="其中政府资金" prop="governmentFund">
              <el-input v-model="baseform.governmentFund" placeholder="请输入">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="项目负责人" prop="projectLeader">
              <el-input v-model="baseform.projectLeader" placeholder="请输入项目负责人" />
            </el-form-item>
            <el-form-item label="操作人" prop="operator">
              <el-input v-model="baseform.operator" placeholder="请输入操作人" />
            </el-form-item>
            <el-form-item label="" prop="">
              <el-row>
                <el-button type="primary" size="medium" @click="submitjcxxForm">确定</el-button>
                <el-button size="medium">取消</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="contentone xmlxtwo" v-if="bznum == '2'">
          <el-form ref="form" :model="form" :rules="rules" label-width="130px">
            <el-form-item label="项目名称" prop="xmmc">
              <el-input v-model="form.xmmc" placeholder="请输入项目名称" :disabled="true" />
            </el-form-item>
            <el-form-item label="申请人" prop="applicant">
              <el-input v-model="form.applicant" placeholder="请输入申请人" />
            </el-form-item>
            <el-form-item label="申请日期" prop="applyDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.applyDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="项目实施开始日期" prop="startDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.startDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="项目结束开始日期" prop="endDate">
              <el-date-picker value-format="yyyy-MM-dd" v-model="form.endDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="主要技术经济目标" prop="economyGoal">
              <el-input v-model="form.economyGoal" placeholder="请输入主要技术经济目标" />
            </el-form-item>
            <el-form-item label="项目主要研究内容" prop="researchContent">
              <el-input v-model="form.researchContent" type="textarea" placeholder="请输入内容" />
            </el-form-item>
            <el-form-item label="项目预期目标" prop="expectedTarget">
              <el-input v-model="form.expectedTarget" placeholder="请输入项目预期目标" />
            </el-form-item>
            <el-form-item label="操作人" prop="operator">
              <el-input v-model="form.operator" type="textarea" placeholder="请输入操作人" />
            </el-form-item>
            <el-form-item label="项目计划任务书" prop="year">
              <el-upload class="upload-demo" :headers="{ Authorization: $store.getters.token}" :action="fileUrl" :on-preview="handlePreview" :on-remove="handleRemove"
                :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="rwshandleFileSuccess"
                :file-list="xmlxrws">
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <!-- <CCIT-UploadFz v-model="form.planAssignment" @changle="fileuplod" /> -->
            </el-form-item>
            <el-form-item label="项目立项决议书" prop="year">
              <el-upload class="upload-demo"  :headers="{ Authorization: $store.getters.token}" :action="fileUrl" :on-preview="handlePreview" :on-remove="jyshandleRemove"
                :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="handleFileSuccess"
                :file-list="xmlxjys">
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <!-- <CCIT-UploadFz v-model="form.initiationResolution" /> -->
            </el-form-item>

            <el-form-item label="" prop="">
              <el-row>
                <el-button type="primary" size="medium" @click="submitlxxmForm">确定</el-button>
                <el-button size="medium">取消</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="contenttwo" v-if="bznum == '3'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenjsjl()">添加</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="titleinfo">检索记录</div>
          </div>
          <div>
            <template>
              <el-table :data="jsjltableData" border style="width: 100%">
                <el-table-column prop="searchPerson" label="检索人员">
                </el-table-column>
                <el-table-column prop="searchContent" label="检索内容">
                </el-table-column>
                <el-table-column prop="searchTime" label="检索时间">
                </el-table-column>
                <el-table-column prop="searchPlace" label="检索地点" >
                </el-table-column>
                <el-table-column prop="filename" label="检索报告">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="120">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" width="120">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editjsjl(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="deljsjl(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenlzzj()">添加</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="titleinfo">论证记录</div>
          </div>
          <div>
            <template>
              <el-table :data="lzjltableData" border style="width: 100%">
                <el-table-column prop="argumentExpert" label="论证专家">
                </el-table-column>
                <el-table-column prop="argumentContent" label="论证内容">
                </el-table-column>
                <el-table-column prop="projectConclusion" label="立项结论">
                </el-table-column>
                <el-table-column prop="argumentTime" label="论证时间" width="180">
                </el-table-column>
                <el-table-column prop="argumentPlace" label="论证地点">
                </el-table-column>
                <el-table-column prop="filename" label="论证报告">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="140">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间" width="140">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editlzjl(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="dellzjl(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopendyjl">添加</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="titleinfo">调研记录</div>
          </div>
          <div>
            <template>
              <el-table :data="dyjltableData" border style="width: 100%">
                <el-table-column prop="surveyPerson" label="调研人员">
                </el-table-column>
                <el-table-column prop="surveyPerson" label="调研内容">
                </el-table-column>
                <el-table-column prop="surveyPlace" label="调研地点">
                </el-table-column>
                <el-table-column prop="surveyTime" label="调研时间" width="180">
                </el-table-column>
                <el-table-column prop="filename" label="调研报告">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editdyjl(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="deldyjl(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="contenttwo" v-if="bznum == '4'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenxmcy">添加成员</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="leftbutton">
              <div class="itemry">
                <el-input v-model="xmcyform.name" placeholder="请输入姓名" />
              </div>
              <div class="itemry">
                <el-button type="primary">查询</el-button>
              </div>
            </div>
          </div>
          <div>
            <template>
              <el-table :data="xmcytableData" border style="width: 100%">
                <el-table-column prop="xmmc" label="项目名称">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="jobNo" label="工号" width="180">
                </el-table-column>
                <el-table-column prop="depart" label="部门">
                </el-table-column>
                <el-table-column prop="joinTime" label="加入项目时间">
                </el-table-column>
                <el-table-column prop="leaveTime" label="离开项目时间">
                </el-table-column>
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxmcy(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxmcy(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="contenttwo" v-if="bznum == '5'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenxmsb">添加设备</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="leftbutton">
              <div class="itemry">
                <el-input v-model="xmsbform.equipmentName" placeholder="请输入设备名称" />
              </div>
              <div class="itemry">
                <el-button type="primary" @click="getProjectEquipmentInfo">查询</el-button>
              </div>
            </div>
          </div>
          <div>
            <template>
              <el-table :data="xmsbtableData" border style="width: 100%">
                <el-table-column prop="equipmentName" label="设备名称">
                </el-table-column>
                <el-table-column prop="equipmentNo" label="设备编号">
                </el-table-column>
                <el-table-column prop="equipmentSpecification" label="设备规格" width="180">
                </el-table-column>
                <el-table-column prop="joinTime" label="加入项目时间">
                </el-table-column>
                <el-table-column prop="leaveTime" label="离开项目时间">
                </el-table-column>
                <el-table-column prop="purpose" label="用途">
                </el-table-column>
                <el-table-column prop="user" label="使用人">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxmsb(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxmsb(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="contenttwo" v-if="bznum == '6'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenxmwxzc">添加无形资产</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="leftbutton">
              <div class="itemry">
                <el-input v-model="xmsbform.assetName" placeholder="请输入无形资产名称" />
              </div>
              <div class="itemry">
                <el-button type="primary">查询</el-button>
              </div>
            </div>
          </div>
          <div>
            <template>
              <el-table :data="xmwxzctableData" border style="width: 100%">
                <el-table-column prop="assetName" label="无形资产名称">
                </el-table-column>
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="purpose" label="用途" width="180">
                </el-table-column>
                <el-table-column prop="user" label="使用人">
                </el-table-column>
                <el-table-column prop="joinTime" label="加入项目时间">
                </el-table-column>
                <el-table-column prop="leaveTime" label="离开项目时间">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxmwxzc(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxmwxzc(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
        <div class="contenttwo" v-if="bznum == '7'">
          <div class="buttonline">
            <el-row>
              <el-button type="primary" plain @click="addopenxmwjzw">添加建筑物</el-button>
              <el-button type="info" plain>批量导入</el-button>
            </el-row>
            <div class="leftbutton">
              <div class="itemry">
                <el-input v-model="xmjzwform.buildingName" placeholder="请输入建筑物名称" />
              </div>
              <div class="itemry">
                <el-button type="primary">查询</el-button>
              </div>
            </div>
          </div>
          <div>
            <template>
              <el-table :data="xmjzwtableData" border style="width: 100%">
                <el-table-column prop="xmmc" label="建筑物名称">
                </el-table-column>
                <el-table-column prop="name" label="建筑物编号">
                </el-table-column>
                <el-table-column prop="joinTime" label="加入项目时间">
                </el-table-column>
                <el-table-column prop="leaveTime" label="离开项目时间">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间">
                </el-table-column>
                <el-table-column prop="updateTime" label="更新时间">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editxmjzw(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delxmjzw(scope.row.id)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>

      <el-dialog title="选择组员" :visible.sync="zyVisible" width="30%">
        <div class="tjrydia">
          <div class="tjry-top">
            <div class="top-item">全部</div>
            <div class="top-item marginleftry">已选</div>
          </div>
          <div class="tjry-content">
            <div class="tjry-itemA">
              <div>
                <el-tree :data="yrtreedata" @node-click="ryhandleNodeClick"></el-tree>
              </div>
            </div>
            <div class="tjry-itemB">
              <div class="xzry" v-for="item in yxzrydata">
                <el-badge value="x" class="item" type="primary">
                  <el-button size="small">欧阳上官</el-button>
                </el-badge>
              </div>
            </div>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="zyVisible = false">取 消</el-button>
          <el-button type="primary" @click="zyVisible = false">确 定</el-button>
          <el-button @click="zyVisible = false">重置</el-button>
        </span>
      </el-dialog>
      <el-dialog title="选择设备" :visible.sync="sbVisible" width="30%">
        <div class="tjrydia">
          <div class="tjry-top">
            <div class="top-item">全部</div>
            <div class="top-item marginleftry">已选</div>
          </div>
          <div class="tjry-content">
            <div class="tjry-itemA">
              <div>
                <el-tree :data="yrtreedata" @node-click="ryhandleNodeClick"></el-tree>
              </div>
            </div>
            <div class="tjry-itemB">
              <div class="xzry" v-for="item in yxzrydata">
                <el-badge value="x" class="item" type="primary">
                  <el-button size="small">欧阳上官</el-button>
                </el-badge>
              </div>
            </div>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="sbVisible = false">取 消</el-button>
          <el-button type="primary" @click="sbVisible = false">确 定</el-button>
          <el-button @click="sbVisible = false">重置</el-button>
        </span>
      </el-dialog>
      <el-dialog title="选择无形资产" :visible.sync="wxzcVisible" width="30%">
        <div class="tjrydia">
          <div class="tjry-top">
            <div class="top-item">全部</div>
            <div class="top-item marginleftry">已选</div>
          </div>
          <div class="tjry-content">
            <div class="tjry-itemA">
              <div>
                <el-tree :data="yrtreedata" @node-click="ryhandleNodeClick"></el-tree>
              </div>
            </div>
            <div class="tjry-itemB">
              <div class="xzry" v-for="item in yxzrydata">
                <el-badge value="x" class="item" type="primary">
                  <el-button size="small">欧阳上官</el-button>
                </el-badge>
              </div>
            </div>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="sbVisible = false">取 消</el-button>
          <el-button type="primary" @click="sbVisible = false">确 定</el-button>
          <el-button @click="sbVisible = false">重置</el-button>
        </span>
      </el-dialog>
      <el-dialog title="选择项目建筑物" :visible.sync="xmjzwVisible" width="30%">
        <div class="tjrydia">
          <div class="tjry-top">
            <div class="top-item">全部</div>
            <div class="top-item marginleftry">已选</div>
          </div>
          <div class="tjry-content">
            <div class="tjry-itemA">
              <div>
                <el-tree :data="yrtreedata" @node-click="ryhandleNodeClick"></el-tree>
              </div>
            </div>
            <div class="tjry-itemB">
              <div class="xzry" v-for="item in yxzrydata">
                <el-badge value="x" class="item" type="primary">
                  <el-button size="small">欧阳上官</el-button>
                </el-badge>
              </div>
            </div>
          </div>

        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="sbVisible = false">取 消</el-button>
          <el-button type="primary" @click="sbVisible = false">确 定</el-button>
          <el-button @click="sbVisible = false">重置</el-button>
        </span>
      </el-dialog>

      <!-- 新增检索记录信息 -->
      <el-dialog :title="!jsjlform.id?'新增':'修改'+'检索记录信息'" :visible.sync="jsjuformVisible" width="600px" append-to-body>
        <el-form ref="jsjlform" :model="jsjlform" :rules="rules" label-width="130px">
          <el-form-item label="检索人员" prop="searchPerson">
            <el-input v-model="jsjlform.searchPerson" placeholder="请输入检索人员" />
          </el-form-item>
          <el-form-item label="检索内容" prop="searchContent">
            <el-input v-model="jsjlform.searchContent" placeholder="请输入检索内容号" />
          </el-form-item>
          <el-form-item label="检索时间" prop="searchTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="jsjlform.searchTime" type="date" placeholder="选择检索时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="检索地点" prop="searchPlace">
            <el-input v-model="jsjlform.searchPlace" placeholder="请输入检索地点" />
          </el-form-item>
          <el-form-item label="检索报告" prop="searchReport">
            <!-- <el-input v-model="jsjlform.searchReport" placeholder="请输入检索报告" /> -->
            <el-upload class="upload-demo" :headers="{ Authorization: $store.getters.token}" :action="fileUrl" :on-preview="handlePreview" :on-remove="jsbghandleRemove"
                :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="jsbghandleFileSuccess"
                :file-list="xmjsbg">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
          </el-form-item>
          <el-form-item label="操作人" prop="operator">
            <el-input v-model="jsjlform.operator" placeholder="请输入操作人" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitjsjlfrom">确 定</el-button>
          <el-button @click="jsjuformVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 新增论证记录信息 -->
      <el-dialog :title="!dyjlform.id?'新增':'修改'+'论证记录信息'" :visible.sync="lzjuformVisible" width="600px" append-to-body>
        <el-form ref="lzjlform" :model="dyjlform" :rules="rules" label-width="130px">
          <el-form-item label="论证专家" prop="argumentExpert">
            <el-input v-model="lzjlform.argumentExpert" placeholder="请输入论证专家" />
          </el-form-item>
          <el-form-item label="论证内容" prop="argumentContent">
            <el-input v-model="lzjlform.argumentContent" placeholder="请输入论证内容" />
          </el-form-item>
          <el-form-item label="立项结论" prop="projectConclusion">
            <el-input v-model="lzjlform.projectConclusion" placeholder="请输入立项结论" />
          </el-form-item>
          <el-form-item label="论证时间" prop="argumentTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="lzjlform.argumentTime" type="date" placeholder="选择论证时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="论证地点" prop="argumentPlace">
            <el-input v-model="lzjlform.argumentPlace" placeholder="请输入论证地点" />
          </el-form-item>
          <el-form-item label="论证报告" prop="argumentReport">
            <!-- <el-input v-model="lzjlform.argumentReport" placeholder="请输入论证报告" /> -->
            <el-upload class="upload-demo" :headers="{ Authorization: $store.getters.token}" :action="fileUrl" :on-preview="handlePreview" :on-remove="lzbghandleRemove"
            :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="lzbghandleFileSuccess"
            :file-list="xmlzbg">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          </el-form-item>
          <el-form-item label="操作人" prop="operator">
            <el-input v-model="lzjlform.operator" placeholder="请输入操作人" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitLZjlfrom">确 定</el-button>
          <el-button @click="lzjuformVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 新增调研记录信息 -->
      <el-dialog :title="!dyjlform.id?'新增':'修改'+'调研记录信息'" :visible.sync="dyjuformVisible" width="600px" append-to-body>
        <el-form ref="dyjlform" :model="dyjlform" :rules="rules" label-width="130px">
          <el-form-item label="调研人员" prop="surveyPerson">
            <el-input v-model="dyjlform.surveyPerson" placeholder="请输入调研人员" />
          </el-form-item>
          <el-form-item label="调研内容" prop="surveyContent">
            <el-input v-model="dyjlform.surveyContent" placeholder="请输入调研内容" />
          </el-form-item>
          <el-form-item label="调研地点" prop="surveyPlace">
            <el-input v-model="dyjlform.surveyPlace" placeholder="请输入调研地点" />
          </el-form-item>
          <el-form-item label="调研时间" prop="surveyTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="dyjlform.surveyTime" type="date" placeholder="选择调研时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="调研报告" prop="surveyReport">
            <!-- <el-input v-model="dyjlform.surveyReport" placeholder="请输入调研报告" /> -->
            <el-upload class="upload-demo" :headers="{ Authorization: $store.getters.token}" :action="fileUrl" :on-preview="handlePreview" :on-remove="dybghandleRemove"
            :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed" :on-success="dybghandleFileSuccess"
            :file-list="xmdybg">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          </el-form-item>
          <el-form-item label="操作人" prop="operator">
            <el-input v-model="dyjlform.operator" placeholder="请输入操作人" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitdyjlfrom">确 定</el-button>
          <el-button @click="dyjuformVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 新增项目成员信息 -->
      <el-dialog :title="!xmcyform.id?'新增':'修改'+'项目成员信息'" :visible.sync="xmcyformVisible" width="600px" append-to-body>
        <el-form ref="xmcyform" :model="xmcyform" :rules="rules" label-width="130px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="xmcyform.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="工号" prop="job_no">
            <el-input v-model="xmcyform.jobNo" placeholder="请输入工号" />
          </el-form-item>
          <el-form-item label="部门" prop="depart">
            <el-input v-model="xmcyform.depart" placeholder="请输入部门" />
          </el-form-item>
          <el-form-item label="加入项目时间" prop="joinTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="xmcyform.joinTime" type="date" placeholder="选择加入项目时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离开项目时间" prop="leaveTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="xmcyform.leaveTime" type="date" placeholder="选择离开项目时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型" prop="surveyReport">
            <el-input v-model="xmcyform.type" placeholder="请输入类型" />
          </el-form-item>
          <el-form-item label="操作人" prop="operator">
            <el-input v-model="xmcyform.operator" placeholder="请输入操作人" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitxmcyrom">确 定</el-button>
          <el-button @click="xmcyformVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 新增项目设备信息 -->
      <el-dialog :title="!xmsbform.id?'新增':'修改'+'项目设备信息'" :visible.sync="xmsbformVisible" width="600px" append-to-body>
        <el-form ref="xmsbform" :model="xmsbform" :rules="rules" label-width="130px">
          <el-form-item label="设备名称" prop="equipmentName">
            <el-input v-model="xmsbform.equipmentName" placeholder="请输入设备名称" />
          </el-form-item>
          <el-form-item label="设备编号" prop="equipmentNo">
            <el-input v-model="xmsbform.equipmentNo" placeholder="请输入设备编号" />
          </el-form-item>
          <el-form-item label="设备规格" prop="equipmentSpecification">
            <el-input v-model="xmsbform.equipmentSpecification" placeholder="请输入设备规格" />
          </el-form-item>
          <el-form-item label="加入项目时间" prop="joinTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="xmsbform.joinTime" type="date" placeholder="选择加入项目时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离开项目时间" prop="leaveTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="xmsbform.leaveTime" type="date" placeholder="选择离开项目时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用途" prop="purpose">
            <el-input v-model="xmsbform.purpose" placeholder="请输入用途" />
          </el-form-item>
          <el-form-item label="使用人" prop="user">
            <el-input v-model="xmsbform.user" placeholder="请输入使用人" />
          </el-form-item>
          <el-form-item label="操作人" prop="operator">
            <el-input v-model="xmsbform.operator" placeholder="请输入操作人" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitxmsbrom">确 定</el-button>
          <el-button @click="xmsbformVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 新增项目无形资产信息 -->
      <el-dialog :title="!xmwxzcform.id?'新增':'修改'+'项目无形资产信息'" :visible.sync="xmwxzcformVisible" width="600px" append-to-body>
        <el-form ref="xmwxzcform" :model="xmwxzcform" :rules="rules" label-width="130px">
          <el-form-item label="无形资产名称" prop="assetName">
            <el-input v-model="xmwxzcform.assetName" placeholder="请输入无形资产名称" />
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-input v-model="xmwxzcform.type" placeholder="请输入类型" />
          </el-form-item>
          <el-form-item label="加入项目时间" prop="joinTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="xmwxzcform.joinTime" type="date" placeholder="选择加入项目时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离开项目时间" prop="leaveTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="xmwxzcform.leaveTime" type="date" placeholder="选择离开项目时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用途" prop="purpose">
            <el-input v-model="xmwxzcform.purpose" placeholder="请输入用途" />
          </el-form-item>
          <el-form-item label="使用人" prop="user">
            <el-input v-model="xmwxzcform.user" placeholder="请输入使用人" />
          </el-form-item>
          <el-form-item label="操作人" prop="operator">
            <el-input v-model="xmwxzcform.operator" placeholder="请输入操作人" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitxmwxzcfrom">确 定</el-button>
          <el-button @click="xmwxzcformVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 新增项目建筑物信息 -->
      <el-dialog :title="!xmjzwform.id?'新增':'修改'+'项目建筑物信息'" :visible.sync="xmjzwformVisible" width="600px" append-to-body>
        <el-form ref="xmjzwform" :model="xmjzwform" :rules="rules" label-width="130px">
          <el-form-item label="建筑物名称" prop="buildingName">
            <el-input v-model="xmjzwform.buildingName" placeholder="请输入建筑物名称" />
          </el-form-item>
          <el-form-item label="建筑物编号" prop="buildingNo">
            <el-input v-model="xmjzwform.buildingNo" placeholder="请输入建筑物编号" />
          </el-form-item>
          <el-form-item label="加入项目时间" prop="joinTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="xmjzwform.joinTime" type="date" placeholder="选择加入项目时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="离开项目时间" prop="leaveTime">
            <el-date-picker value-format="yyyy-MM-dd" v-model="xmjzwform.leaveTime" type="date" placeholder="选择离开项目时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="操作人" prop="operator">
            <el-input v-model="xmjzwform.operator" placeholder="请输入操作人" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitxmjzwfrom">确 定</el-button>
          <el-button @click="xmjzwformVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </transition>
</template>
<script>
import {
  aaddbasicInfo,
  basicInfodetail,
  aadinitInfo,
  initInfodetail,
  aadprepareSearch,
  prepareSearchdetail,
  prepareSearchdelete,
  getPrepareSearchInfo,
  aadprepareArgument,
  prepareArgumentdetail,
  prepareArgumentdelete,
  getPrepareArgumentInfo,
  aadprepareSurvey,
  prepareSurveydetail,
  prepareSurveydelete,
  getPrepareSurveyInfo,
  aadprojectMember,
  projectMemberdetail,
  projectMemberdelete,
  getProjectMemberInfo,
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
  getProjectBuildingInfo
} from '@/api/yfxmgln/yfxmgln'
export default {
  name: 'permission-department',
  props: {
    projectinfo: { type: Object },
  },
  data() {
    return {
      lzjuformVisible: false,//论证弹框
      jsjuformVisible: false,//设备弹框
      dyjuformVisible: false,//调研弹框
      xmcyformVisible: false,//项目成员弹框
      xmsbformVisible: false,//项目设备弹框
      xmwxzcformVisible: false,//项目无形资产弹框
      xmjzwformVisible: false,//项目建筑物弹框
      bznum: '1',//项目管理步骤切换
      formVisible: true,//是否进入项目添加页面
      xmlyoptions: [
        {
          label: '线上填报',
          value: '线上填报'
        },
        {
          label: '线下填报',
          value: '线下填报'
        }
      ],
      xmtypeoptions: [
        {
          label: '自主研发',
          value: '自主研发'
        },
        {
          label: '委托研发',
          value: '委托研发'
        },
        {
          label: '合作研发',
          value: '合作研发'
        },
        {
          label: '集体研发',
          value: '集体研发'
        }
      ],
      jslxoptions: [],
      fzroptions: [],
      rytableData: [],//人员列表
      zyVisible: false,//添加人员弹框显示
      yrtreedata: [],//添加人员树形列表
      yxzrydata: [41, 1, 1, 1, 11,],//已选择添加人员列表
      sbVisible: false,//选择设备弹框显示
      wxzcVisible: false,//选择无形资产弹框显示
      xmjzwVisible: false,//选择项目建筑物弹框显示
      baseform: {//基础信息
        proId: this.projectinfo.projectNo,
        projectName: this.projectinfo.projectName,
        id: "",
        projectSource: "",
        projectType: "",
        governmentFund: "",
        isEntrusted: "0",
        operator: "",
        projectBudget: "",
        projectLeader: "",
        projectNo: this.projectinfo.projectNo,
        technicalField: "",
      },
      form: {//项目立项
        proId: this.projectinfo.projectNo,
        xmmc: this.projectinfo.projectName,
        id: "",
        applicant: "",
        applyDate: "",
        createTime: "",
        economyGoal: "",
        endDate: "",
        expectedTarget: "",
        initiationResolution: "",
        operator: "",
        planAssignment: "",
        researchContent: "",
        startDate: ""
      },
      jsjlform: {//检索记录
        proId: this.projectinfo.projectNo,
        searchPerson: '',
        searchContent: '',
        searchTime: '',
        searchPlace: '',
        searchReport: '',
        operator: ''
      },
      dyjlform: {//调研记录
        proId: this.projectinfo.projectNo,
        surveyPerson: '',
        surveyContent: '',
        surveyTime: '',
        surveyPlace: '',
        surveyReport: '',
        operator: ''
      },
      lzjlform: {//论证记录
        proId: this.projectinfo.projectNo,
        argumentExpert: '',
        argumentContent: '',
        projectConclusion: '',
        argumentTime: '',
        argumentPlace: '',
        argumentReport: '',
        operator: ''
      },
      xmcyform: {//项目成员
        proId: this.projectinfo.projectNo,
        name: '',
        jobNo: '',
        depart: '',
        joinTime: '',
        leaveTime: '',
        xmmc: this.projectinfo.projectName,
        operator: ''
      },
      xmsbform: {//项目设备
        proId: this.projectinfo.projectNo,
        equipmentName: '',
        equipmentNo: '',
        equipmentSpecification: '',
        joinTime: '',
        leaveTime: '',
        purpose: '',
        user: '',
        operator: ''
      },
      xmwxzcform: {//无形资产
        proId: this.projectinfo.projectNo,
        assetName: '',
        type: '',
        joinTime: '',
        leaveTime: '',
        purpose: '',
        user: '',
        operator: ''
      },
      xmjzwform: {//建筑物
        proId: this.projectinfo.projectNo,
        buildingName: '',
        buildingNo: '',
        joinTime: '',
        leaveTime: '',
        operator: '',
        xmmc: this.projectinfo.projectName,
      },
      fileUrl: process.env.VUE_APP_BASE_API + "/api/extend/initInfo/Uploader",
      xmlxrws: [//项目计划任务书
    ],
      xmlxjys: [//项目立项决议书列表
      ],
      jsjltableData: [],//记录检索列表
      xmjsbg:[],//检索报告
      lzjltableData: [],//记录论证列表
      xmlzbg:[],//论证报告
      dyjltableData: [],//记录调研列表
      xmdybg:[],//论证报告
      xmcytableData: [],//记录项目成员列表
      xmsbtableData: [],//记录项目设备列表
      xmwxzctableData: [],//记录项目无形资产列表
      xmjzwtableData: [],//记录项目建筑物列表
      listLoading: true,
      companyId: '',
      listQuery: {
        keyword: ''
      },
      defaultProps: {
        children: 'children',
        label: 'fullName'
      },
      formVisible: false,
      diagramVisible: false,
      typeListVisible: false,
      typeVisible: false,
      gradeFormVisible: false,
      expands: true,
      refreshTree: true,
      filterText: '',

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

      console.log(val)
      this.form.proId = val.projectNo
      this.baseform.proId = val.projectNo
      this.jsjlform.proId = val.projectNo
      this.dyjlform.proId = val.projectNo
      this.lzjlform.proId = val.projectNo
      this.xmcyform.proId = val.projectNo
      this.xmsbform.proId = val.projectNo
      this.xmwxzcform.proId = val.projectNo
      this.xmjzwform.proId = val.projectNo
      if (val.projectNo) {
        this.basicInfodetaildata()
      }
    }
  },
  created() {
    if (this.projectinfo.projectNo) {
      this.basicInfodetaildata()
    }
  },
  methods: {
    goback() {//返回
      this.bznum = 1;
      this.cealfromData()
      this.cealbasefromData()
      this.$emit("closejcxx", false);
    },
    addopenxmwjzw() {
      this.cealxmwxzcformData()
      this.xmjzwformVisible = true
    },
    addopenxmwxzc() {
      this.cealxmjzwformData()
      this.xmwxzcformVisible = true
    },
    addopenxmsb() {
      this.cealxmsbformData()
      this.xmsbformVisible = true
    },
    addopenxmcy() {
      this.cealxmcyformData()
      this.xmcyformVisible = true
    },
    addopenjsjl() {
      this.cealjsjlformData()
      this.jsjuformVisible = true
    },
    addopenlzzj() {
      this.ceallzjlformData()
      this.lzjuformVisible = true
    },
    addopendyjl() {
      this.cealdyjlfromData()
      this.dyjuformVisible = true
    },
    handleNodeClick(data) {//点击人员树形事件
      console.log(data);
    },
    opentjry() {//打开添加人员
      this.zyVisible = true
    },
    checknum(num) {//切换项目tab
      this.bznum = num
      if(this.bznum == '1'){
        this.basicInfodetaildata()
      }else if (this.bznum == '2') {
        this.initInfodetaildata()
      } else if (this.bznum == '3') {
        this.getPrepareSearchInfo()
        this.getPrepareArgumentInfo()
        this.getPrepareSurveyInfo()
      } else if (this.bznum == '4') {
        this.getProjectMemberInfo()
      } else if (this.bznum == '5') {
        this.getProjectEquipmentInfo()
      } else if (this.bznum == '6') {
        this.getVirtualAssetInfo()
      } else if (this.bznum == '7') {
        this.getProjectBuildingInfo()
      }
    },
    submitjsjlfrom() {//保存检索记录
      let _this = this
      if(this.xmjsbg.length=0){
        this.jsjlform.searchReport=''
      }
      console.log(this.jsjlform)
      aadprepareSearch(this.jsjlform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.jsjuformVisible = false
          _this.getPrepareSearchInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getPrepareSearchInfo() {//查询检索记录列表
      let _this = this
      let parm = {
        currentPage: 1,
        pageSize: 20,
        proId: this.projectinfo.projectNo,
      }
      getPrepareSearchInfo(parm).then(response => {
        if (response.code == 200) {
          _this.jsjltableData = response.data.list
          _this.jsjltableData.forEach(element => {
            if(element.searchReport){
              let dataarry= element.searchReport.split(',')
              element.filename = dataarry[0]
            }else{
              element.filename =''
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
    editjsjl(Id) {//查询检索记录详情
      let _this = this
      prepareSearchdetail(Id).then(response => {
        if (response.code == 200) {
          _this.xmjsbg = []
          _this.jsjlform = response.data
          if(_this.jsjlform.searchReport){
            let dataarry = _this.jsjlform.searchReport.split(',')
            let parm = {
              name:dataarry[0],
              url:dataarry[1]
            }
            _this.xmjsbg.push(parm)
          }
          _this.jsjuformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    deljsjl(Id) {//删除检索记录
      let _this = this
      prepareSearchdelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.getPrepareSearchInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    submitLZjlfrom() {//保存论证记录
      let _this = this
      if(this.xmlzbg.length=0){
        this.lzjlform.argumentReport=''
      }
      aadprepareArgument(this.lzjlform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.lzjuformVisible = false
          _this.getPrepareArgumentInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getPrepareArgumentInfo() {//查询论证记录列表
      let _this = this
      let parm = {
        "argumentContent": "",
        "argumentExpert": "",
        "argumentPlace": "",
        "argumentReport": "",
        "argumentTime": "",
        "createTime": "",
        "currentPage": 1,
        "id": "",
        "keyword": "",
        "operator": "",
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
        "projectConclusion": "",
        "sidx": "",
        "sort": "",
        "updateTime": ""
      }
      getPrepareArgumentInfo(parm).then(response => {
        if (response.code == 200) {
          _this.lzjltableData = response.data.list
          _this.lzjltableData.forEach(element => {
            if(element.argumentReport){
              let dataarry= element.argumentReport.split(',')
              element.filename = dataarry[0]
            }else{
              element.filename =''
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
    editlzjl(Id) {//查询论证记录详情
      let _this = this
      prepareArgumentdetail(Id).then(response => {
        if (response.code == 200) {
          _this.lzjlform = response.data
          _this.xmlzbg=[]
          if(_this.lzjlform.argumentReport){
            let dataarry = _this.lzjlform.argumentReport.split(',')
            let parm = {
              name:dataarry[0],
              url:dataarry[1]
            }
            _this.xmlzbg.push(parm)
          }
          _this.lzjuformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    dellzjl(Id) {//删除论证记录
      let _this = this
      prepareArgumentdelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.getPrepareArgumentInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    submitdyjlfrom() {//保存调研记录
      let _this = this
      if(this.dyjlform.length=0){
        this.dyjlform.surveyReport=''
      }
      aadprepareSurvey(this.dyjlform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.dyjuformVisible = false
          _this.getPrepareSurveyInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getPrepareSurveyInfo() {//查询调研记录列表
      let _this = this
      let parm = {
        "createTime": "",
        "currentPage": 1,
        "id": "",
        "keyword": "",
        "operator": "",
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
        "sidx": "",
        "sort": "",
        "surveyContent": "",
        "surveyPerson": "",
        "surveyPlace": "",
        "surveyReport": "",
        "surveyTime": "",
        "updateTime": ""
      }
      getPrepareSurveyInfo(parm).then(response => {
        if (response.code == 200) {
          _this.dyjltableData = response.data.list
          _this.dyjltableData.forEach(element => {
            if(element.surveyReport){
              let dataarry= element.surveyReport.split(',')
              element.filename = dataarry[0]
            }else{
              element.filename =''
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
    editdyjl(Id) {//查询调研记录详情
      let _this = this
      prepareSurveydetail(Id).then(response => {
        if (response.code == 200) {
          _this.dyjlform = response.data
          _this.xmdybg=[]
          if(_this.dyjlform.surveyReport){
            let dataarry = _this.dyjlform.surveyReport.split(',')
            let parm = {
              name:dataarry[0],
              url:dataarry[1]
            }
            _this.xmdybg.push(parm)
          }
          _this.dyjuformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    deldyjl(Id) {//删除论证记录
      let _this = this
      prepareSurveydelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.getPrepareSurveyInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    submitxmcyrom() {//保存成员项目
      let _this = this
      aadprojectMember(this.xmcyform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.xmcyformVisible = false
          _this.getProjectMemberInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getProjectMemberInfo() {//查询项目成员列表
      let _this = this
      let parm = {
        "createTime": "",
        "currentPage": 1,
        "depart": "",
        "id": "",
        "jobNo": "",
        "joinTime": "",
        "keyword": "",
        "leaveTime": "",
        "name": "",
        "operator": "",
        "pageSize": 20,
        "proId": this.projectinfo.projectNo,
        "sidx": "",
        "sort": "",
        "type": "",
        "updateTime": "",
        "xmmc": ""
      }
      getProjectMemberInfo(parm).then(response => {
        if (response.code == 200) {
          _this.xmcytableData = response.data.list
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },
    editxmcy(Id) {//查询项目成员详情
      let _this = this
      projectMemberdetail(Id).then(response => {
        if (response.code == 200) {
          _this.xmcyform = response.data
          _this.xmcyformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    delxmcy(Id) {//删除项目成员
      let _this = this
      projectMemberdelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.getProjectMemberInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    submitxmsbrom() {//保存设备项目
      let _this = this
      aadprojectEquipment(this.xmsbform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.xmsbformVisible = false
          _this.getProjectEquipmentInfo()
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    getProjectEquipmentInfo() {//查询项目设备列表
      let _this = this
      let parm = {
        "createTime": "",
        "currentPage": 1,
        "equipmentName": "",
        "equipmentNo": "",
        "equipmentSpecification": "",
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
        "updateTime": "",
        "user": ""
      }
      getProjectEquipmentInfo(parm).then(response => {
        if (response.code == 200) {
          _this.xmsbtableData = response.data.list
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },
    editxmsb(Id) {//查询项目设备详情
      let _this = this
      projectEquipmentdetail(Id).then(response => {
        if (response.code == 200) {
          _this.xmsbform = response.data
          _this.xmsbformVisible = true
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    delxmsb(Id) {//删除项目设备
      let _this = this
      projectEquipmentdelete(Id).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
          _this.getProjectEquipmentInfo()
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
    submitjcxxForm() {//基础信息项目保存修改
      aaddbasicInfo(this.baseform).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },
    basicInfodetaildata() {//基础信息项目详情
      basicInfodetail(this.projectinfo.projectNo).then(response => {
        if (response.code == 200) {
          if (response.data) {
            this.baseform = response.data
            this.xmjzwform.xmmc = this.projectinfo.projectName
          } else {
            this.baseform.proId = this.projectinfo.projectNo
            this.baseform.projectName = this.projectinfo.projectName
            this.baseform.projectNo = this.projectinfo.projectNo
            this.xmjzwform.xmmc = this.projectinfo.projectName

          }
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },
    submitlxxmForm() {//立项项目信息项目保存修改
      if(this.xmlxrws.length==0){
        this.form.planFilename = ''
        this.form.planAssignment = ''
      }
      if(this.xmlxjys.length==0){
        this.form.resolutionFilename = ''
        this.form.initiationResolution = ''
      }
      aadinitInfo(this.form).then(response => {
        if (response.code == 200) {
          this.$message({
            message: response.msg,
            type: 'success',
            duration: 1500,
          })
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }
      });
    },
    initInfodetaildata() {//立项信息项目详情
      initInfodetail(this.projectinfo.projectNo).then(response => {
        if (response.code == 200) {
          if (response.data) {
            this.form = response.data
            this.xmlxrws = []
            this.xmlxjys=  []
            if(this.form.planAssignment){
              let rwsparm = {
                name: this.form.planFilename,
                url: this.form.planAssignment
              }
              this.xmlxrws.push(rwsparm)
            }
            // let num = this.xmlxrws.findIndex(element => element.url === this.form.planAssignment)
            // let jysnum = this.xmlxjys.findIndex(element => element.url === this.form.initiationResolution)
            if (this.form.resolutionFilename) {
              let jysparm = {
                name: this.form.resolutionFilename,
                url: this.form.initiationResolution
              }
              this.xmlxjys.push(jysparm)
            }
          }
        } else {
          this.$message({
            message: response.msg,
            type: 'error',
            duration: 1500,
          })
        }

      });
    },
    rwshandleFileSuccess(response, file, fileList) { //任务书 文件上传成功处理
      this.xmlxrws = []
      this.form.planFilename = response.fullName
      this.form.planAssignment = response.filePath
      let parm = {
        name:response.fullName,
        url:response.filePath
      }
      this.xmlxrws.push(parm)
      
    },
    handleFileSuccess(response, file, fileList) { //决议书 文件上传成功处理
      this.xmlxjys = []
      this.form.resolutionFilename = response.fullName
      this.form.initiationResolution = response.filePath
      let parm = {
        name:response.fullName,
        url:response.filePath
      }
      this.xmlxjys.push(parm)
    },
    handleRemove(file, fileList) {//任务书文件移除操作
      this.xmlxrws = []
      // let num = this.xmlxrws.findIndex(element => element.url === file.url)
      // if (num != -1) {
      //   this.xmlxrws.splice(num, 1)
      // }
      // console.log(file, fileList);
    },
    jyshandleRemove(file, fileList){//决议书文件移除操作
      this.xmlxjys=[]
      // let num = this.xmlxjys.findIndex(element => element.url === file.url)
      // if (num != -1) {
      //   this.xmlxjys.splice(num, 1)
      // }
    },
    jsbghandleRemove(){//检索报告文件移除操作
      this.xmjsbg=[]
    },
    jsbghandleFileSuccess(response){//检索报告文件上传成功处理
      this.xmjsbg = []
      this.jsjlform.searchReport = response.fullName+','+response.filePath
      let parm = {
        name:response.fullName,
        url:response.filePath
      }
      this.xmjsbg.push(parm)
    },
    
    dybghandleFileSuccess(response){//调研报告文件上传成功处理
      this.xmdybg = []
      this.dyjlform.surveyReport = response.fullName+','+response.filePath
      let parm = {
        name:response.fullName,
        url:response.filePath
      }
      this.xmdybg.push(parm)
    },
    dybghandleRemove(){//调研报告文件移除操作
      this.xmdybg=[]
    },
    lzbghandleRemove(){//论证报告文件移除操作
      this.xmlzbg=[]
    },
    lzbghandleFileSuccess(response){//论证报告文件上传成功处理
      this.xmlzbg = []
      this.lzjlform.argumentReport = response.fullName+','+response.filePath
      let parm = {
        name:response.fullName,
        url:response.filePath
      }
      this.xmlzbg.push(parm)
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
    cealfromData() {
      this.form = {
        proId: this.projectinfo.projectNo,
        xmmc: this.projectinfo.projectName,
        id: "",
        applicant: "",
        applyDate: "",
        createTime: "",
        economyGoal: "",
        endDate: "",
        expectedTarget: "",
        initiationResolution: "",
        operator: "",
        planAssignment: "",
        researchContent: "",
        startDate: ""
      }
    },
    cealbasefromData() {
      this.baseform = {
        proId: this.projectinfo.projectNo,
        projectName: this.projectinfo.projectName,
        id: "",
        projectSource: "",
        projectType: "",
        governmentFund: "",
        isEntrusted: "0",
        operator: "",
        projectBudget: "",
        projectLeader: "",
        projectNo: "",
        technicalField: "",
      }
    },
    cealjsjlformData() {//检索表单清空
      this.jsjlform = {
        proId: this.projectinfo.projectNo,
        searchPerson: '',
        searchContent: '',
        searchTime: '',
        searchPlace: '',
        searchReport: '',
        operator: ''
      }
      this.xmjsbg = []
    },
    cealdyjlfromData() {//调研表单情空
      this.dyjlform = {
        proId: this.projectinfo.projectNo,
        surveyPerson: '',
        surveyContent: '',
        surveyTime: '',
        surveyPlace: '',
        surveyReport: '',
        operator: ''
      }
      this.xmdybg = []
    },
    ceallzjlformData() {//论证表单清空
      this.lzjlform = {
        proId: this.projectinfo.projectNo,
        argumentExpert: '',
        argumentContent: '',
        projectConclusion: '',
        argumentTime: '',
        argumentPlace: '',
        argumentReport: '',
        operator: ''
      }
      this.xmlzbg = []
    },
    cealxmcyformData() {
      this.xmcyform = {
        proId: this.projectinfo.projectNo,
        name: '',
        jobNo: '',
        depart: '',
        joinTime: '',
        leaveTime: '',
        xmmc: this.projectinfo.projectName,
        operator: ''
      }
    },
    cealxmsbformData() {
      this.xmsbform = {
        proId: this.projectinfo.projectNo,
        equipmentName: '',
        equipmentNo: '',
        equipmentSpecification: '',
        joinTime: '',
        leaveTime: '',
        purpose: '',
        user: '',
        operator: ''
      }
    },
    cealxmwxzcformData() {
      this.xmwxzcform = {//无形资产
        proId: this.projectinfo.projectNo,
        assetName: '',
        type: '',
        joinTime: '',
        leaveTime: '',
        purpose: '',
        user: '',
        operator: ''
      }
    },
    cealxmjzwformData() {
      this.xmjzwform = {//建筑物
        proId: this.projectinfo.projectNo,
        buildingName: '',
        buildingNo: '',
        joinTime: '',
        leaveTime: '',
        operator: '',
        xmmc: this.projectinfo.projectName,
      }
    },
    ryhandleNodeClick() { },


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
</style>