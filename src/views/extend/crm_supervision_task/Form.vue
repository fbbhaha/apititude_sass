<template>
  <el-dialog
    :title="!dataForm.id ? '新建' : isDetail ? '详情' : '编辑'"
    :close-on-click-modal="false"
    :visible.sync="visible"
    class="CCIT-dialog CCIT-dialog_center"
    lock-scroll
    width="800px"
  >
    <el-row :gutter="15" class="" v-if="!loading">
      <el-form
        ref="elForm"
        :model="dataForm"
        :rules="rules"
        size="medium"
        label-width="100px"
        label-position="right"
        :disabled="!!isDetail"
      >
        <el-col :span="24">
          <el-form-item label-width="0"> </el-form-item>
        </el-col>

        <!-- <el-col :span="24">
        <el-form-item  label="任务编号" prop="number"  >
        <el-input  v-model=" dataForm.number" placeholder="请输入"  readonly  clearable  :style='{"width":"100%"}' >
    </el-input>
        </el-form-item>
    </el-col> -->
         <el-col :span="24">
          <el-form-item label="来源" prop="srctype">
            <el-input
              v-model="dataForm.srctype"
              placeholder="请输入"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="督办名称" prop="name">
            <el-input
              v-model="dataForm.name"
              placeholder="请输入"
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="督办内容" prop="remark">
            <el-input
              v-model="dataForm.remark"
              placeholder="请输入"
              :style="{ width: '100%' }"
              true
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="截止时间" prop="endtime">
            <el-date-picker
              v-model="dataForm.endtime"
              placeholder="请选择"
              clearable
              :style="{ width: '100%' }"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="timestamp"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="是否提醒" prop="isremind">
            <el-radio-group v-model="dataForm.isremind" size="medium">
              <el-radio
                v-for="(item, index) in isremindOptions"
                :key="index"
                :label="item.id"
                :disabled="item.disabled"
              >
                {{ item.fullName }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>

        <div v-if="dataForm.isremind == 1">
          <el-col :span="24">
            <el-form-item label="提醒周期">
              <el-radio-group
                v-model="dataForm.remindcycle"
                @change="dataForm.remindtime = undefined"
              >
                <el-radio label="每天">每天</el-radio>
                <el-radio label="每周">每周</el-radio>
                <el-radio label="每月">每月</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="dataForm.remindcycle == '每天'">
            <el-form-item label="每天几点">
              <el-time-picker
                v-model="dataForm.remindtime"
                placeholder="请选择"
                format="HH:mm"
                value-format="HH:mm"
              >
              </el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="dataForm.remindcycle == '每周'">
            <el-form-item label="每周几">
              <el-select v-model="dataForm.remindtime" placeholder="请选择">
                <el-option
                  v-for="item in week"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="dataForm.remindcycle == '每月'">
            <el-form-item label="每月几号">
              <el-date-picker
                v-model="dataForm.remindtime"
                type="date"
                format="dd"
                value-format="dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提醒对象">
              <el-checkbox-group v-model="remindtargetarr">
                <el-checkbox label="主办"></el-checkbox>
                <el-checkbox label="协办"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="提醒方式">
              <el-checkbox-group v-model="remindmodearr">
                <el-checkbox label="系统消息"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </div>

        <el-col :span="24">
          <el-form-item label="起草人" prop="drafter">
            <el-input
              v-model="dataForm.drafter"
              placeholder="请输入"
              readonly
              clearable
              :style="{ width: '100%' }"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="附件" prop="accessoryList">
            <CCIT-UploadFz
              v-model="accessoryList"
              :fileSize="2"
              sizeUnit="MB"
              :limit="9"
              buttonText="点击上传"
            >
            </CCIT-UploadFz>
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <!-- <el-form-item label-width="0"> -->
          <div class="CCIT-common-title">
            <h2>承办人信息</h2>
          </div>
          <el-table
            :data="dataForm.crm_supervision_task_itemEntityList"
            size="mini"
            :header-cell-class-name="must"
          >
            <el-table-column
              type="index"
              width="50"
              label="序号"
              align="center"
            />
            <el-table-column width="200" label="工作内容">
              <template slot-scope="scope">
                <el-form-item
                  label-width="0"
                  :prop="
                    'crm_supervision_task_itemEntityList.' +
                    scope.$index +
                    '.content'
                  "
                  :rules="rules.content"
                >
                  <el-input
                    v-model="scope.row.content"
                    placeholder="请输入"
                    clearable
                    :style="{ width: '100%' }"
                  >
                  </el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="230" label="开始时间">
              <template slot-scope="scope">
                <el-form-item
                  label-width="0"
                  :prop="
                    'crm_supervision_task_itemEntityList.' +
                    scope.$index +
                    '.starttime'
                  "
                  :rules="rules.starttime"
                >
                  <el-date-picker
                    v-model="scope.row.starttime"
                    placeholder="请选择"
                    clearable
                    :style="{ width: '100%' }"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="230" label="结束时间">
              <template slot-scope="scope">
                <el-form-item
                  label-width="0"
                  :prop="
                    'crm_supervision_task_itemEntityList.' +
                    scope.$index +
                    '.endtime'
                  "
                  :rules="rules.endtime"
                >
                  <el-date-picker
                    v-model="scope.row.endtime"
                    placeholder="请选择"
                    clearable
                    :style="{ width: '100%' }"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="200" label="主办部门">
              <template slot-scope="scope">
                <!-- <dep-select v-model="scope.row.hostdept" placeholder="请选择" >
                        </dep-select> -->
                <el-form-item
                  label-width="0"
                  :prop="
                    'crm_supervision_task_itemEntityList.' +
                    scope.$index +
                    '.hostdept'
                  "
                  :rules="rules.hostdept"
                >
                  <CCIT-TreeSelect
                    v-model="scope.row.hostdept"
                    :options="departmentTreeData"
                    lastLevel
                    lastLevelKey="type"
                    lastLevelValue="department"
                    placeholder="选择部门"
                    clearable
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="200" label="主办人">
              <template slot-scope="scope">
                <el-form-item
                  label-width="0"
                  :prop="
                    'crm_supervision_task_itemEntityList.' +
                    scope.$index +
                    '.sponsor'
                  "
                  :rules="rules.sponsor"
                >
                  <user-select
                    v-model="scope.row.sponsor"
                    placeholder="请选择"
                    :multiple="false"
                    v-if="isDetail"
                  >
                  </user-select>
                  <el-select
                    v-model="scope.row.sponsor"
                    filterable
                    :multiple="false"
                    placeholder="请选择"
                    @visible-change="getDeptMember(0, scope.row.hostdept)"
                    v-if="!isDetail"
                  >
                    <el-option
                      v-for="item in sponsorOptions"
                      :key="item.userId"
                      :label="item.realName"
                      :value="item.userId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="200" label="协办部门">
              <template slot-scope="scope">
                <!-- <dep-select v-model="scope.row.assistingdept" placeholder="请选择" >
                        </dep-select> -->
                <el-form-item
                  label-width="0"
                  :prop="
                    'crm_supervision_task_itemEntityList.' +
                    scope.$index +
                    '.assistingdept'
                  "
                  :rules="rules.assistingdept"
                >
                  <CCIT-TreeSelect
                    v-model="scope.row.assistingdept"
                    :options="departmentTreeData"
                    lastLevel
                    lastLevelKey="type"
                    lastLevelValue="department"
                    placeholder="选择部门"
                    clearable
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column width="200" label="协办人">
              <template slot-scope="scope">
                <el-form-item
                  label-width="0"
                  :prop="
                    'crm_supervision_task_itemEntityList.' +
                    scope.$index +
                    '.assistant'
                  "
                  :rules="rules.assistant"
                >
                  <el-select
                    v-model="scope.row.assistant"
                    filterable
                    :multiple="false"
                    placeholder="请选择"
                    @visible-change="getDeptMember(1, scope.row.assistingdept)"
                    v-if="!isDetail"
                  >
                    <el-option
                      v-for="item in assistantOptions"
                      :key="item.userId"
                      :label="item.realName"
                      :value="item.userId"
                    >
                    </el-option>
                  </el-select>
                  <user-select
                    v-if="isDetail"
                    v-model="scope.row.assistant"
                    placeholder="请选择"
                    :multiple="false"
                  >
                  </user-select>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="50" v-if="!isDetail">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  class="CCIT-table-delBtn"
                  @click="
                    handleDelcrm_supervision_task_itemEntityList(scope.$index)
                  "
                  >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div
            class="table-actions"
            @click="addHandlecrm_supervision_task_itemEntityList()"
          >
            <el-button type="text" v-if="!isDetail" icon="el-icon-plus"
              >新增</el-button
            >
          </div>
          <!-- </el-form-item> -->
        </el-col>

        <div class="block" v-if="isDetail">
          <h3>流转记录</h3>
          <el-divider></el-divider>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in operatingData"
              :key="index"
              :timestamp="activity.submittime"
            >
              <el-link
                v-if="activity.type == '3'"
                @click="
                  (feedbackVisible = true), feedbackDetails(activity.redeployid)
                "
                type="primary"
                >{{ activity.details
                }}<i class="el-icon-view el-icon--right"></i>
              </el-link>
              <span v-else>{{ activity.details }}</span>
            </el-timeline-item>
          </el-timeline>
        </div>

        <div v-if="isDetail && DecomposeTaskList.length > 0">
          <div class="CCIT-common-title">
            <h2>分解任务信息</h2>
          </div>
          <template>
            <el-table :data="DecomposeTaskList" stripe style="width: 100%">
              <!-- <el-table-column prop="date" label="日期" width="180">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column> -->
              <el-table-column prop="content" width="200" label="工作内容">
              </el-table-column>
              <el-table-column prop="starttime" width="230" label="开始时间">
              </el-table-column>
              <el-table-column prop="endtime" width="230" label="结束时间">
              </el-table-column>
              <el-table-column prop="hostdept" width="200" label="主办部门">
              </el-table-column>
              <el-table-column prop="sponsor" width="200" label="主办人"> </el-table-column>
              <el-table-column prop="assistingdept" width="200" label="协办部门">
              </el-table-column>
              <el-table-column prop="assistant" width="200" label="协办人">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-form>
    </el-row>

    <!-- 反馈 -->
    <el-dialog
      width="40%"
      title="反馈"
      :visible.sync="feedbackVisible"
      append-to-body
      @close="closeDialog"
    >
      <el-row :gutter="15" class="">
        <el-form
          ref="feedbackForm"
          :model="feedbackFormData"
          :rules="rules"
          size="medium"
          label-width="100px"
          label-position="right"
        >
          <el-col :span="24">
            <el-form-item label="反馈内容" prop="feedbackContent">
              <el-input
                v-model="feedbackFormData.feedbackContent"
                placeholder="请输入"
                :style="{ width: '100%' }"
                true
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :disabled="isFeedback"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="附件" prop="feedbackAccessory">
              <!-- feedbackFormData -->
              <CCIT-UploadFz
                v-model="feedbackAccessoryList"
                :fileSize="2"
                sizeUnit="MB"
                :limit="9"
                buttonText="点击上传"
                :disabled="isFeedback"
              >
              </CCIT-UploadFz>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="feedbackVisible = false">取 消</el-button>
        <el-button type="primary" @click="feedback()" v-if="!isFeedback"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 转派 -->
    <el-dialog
      width="40%"
      title="转派"
      :visible.sync="innerVisible"
      append-to-body
      @close="closeDialog"
    >
      <el-row :gutter="15" class="">
        <el-form
          ref="redeployForm"
          :model="dataForm"
          :rules="rules"
          size="medium"
          label-width="100px"
          label-position="right"
        >
          <el-col :span="24">
            <el-form-item label="承办人" prop="transfer">
              <user-select
                v-model="dataForm.transfer"
                placeholder="请选择"
                :multiple="true"
              >
              </user-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="redeploy()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分解 -->
    <el-dialog
      width="60%"
      title="分解"
      :visible.sync="decomposeVisible"
      append-to-body
      @close="closeDialog"
    >
      <el-row :gutter="15" class="">
        <el-form
          ref="decomposeForm"
          :model="decomposeDataForm"
          :rules="rules"
          size="medium"
          label-width="100px"
          label-position="right"
        >
          <el-col :span="24">
            <!-- <el-form-item label-width="0"> -->
              <el-table
                :data="decomposeDataForm.decomposeList"
                size="mini"
                :header-cell-class-name="must"
              >
                <el-table-column
                  type="index"
                  width="50"
                  label="序号"
                  align="center"
                />
                <el-table-column width="200" label="工作内容">
                  <template slot-scope="scope">
                    <el-form-item
                      label-width="0"
                      :prop="'decomposeList.' + scope.$index + '.content'"
                      :rules="rules.content"
                    >
                      <el-input
                        v-model="scope.row.content"
                        placeholder="请输入"
                        clearable
                        :style="{ width: '100%' }"
                      >
                      </el-input>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column width="230" label="开始时间">
                  <template slot-scope="scope">
                    <el-form-item
                      label-width="0"
                      :prop="'decomposeList.' + scope.$index + '.starttime'"
                      :rules="rules.starttime"
                    >
                      <el-date-picker
                        v-model="scope.row.starttime"
                        placeholder="请选择"
                        clearable
                        :style="{ width: '100%' }"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="timestamp"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column width="230" label="结束时间">
                  <template slot-scope="scope">
                    <el-form-item
                      label-width="0"
                      :prop="'decomposeList.' + scope.$index + '.endtime'"
                      :rules="rules.endtime"
                    >
                      <el-date-picker
                        v-model="scope.row.endtime"
                        placeholder="请选择"
                        clearable
                        :style="{ width: '100%' }"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="timestamp"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column width="200" label="主办部门">
                  <template slot-scope="scope">
                    <!-- <dep-select v-model="scope.row.hostdept" placeholder="请选择" >
                        </dep-select> -->
                    <el-form-item
                      label-width="0"
                      :prop="'decomposeList.' + scope.$index + '.hostdept'"
                      :rules="rules.hostdept"
                    >
                      <CCIT-TreeSelect
                        v-model="scope.row.hostdept"
                        :options="departmentTreeData"
                        lastLevel
                        lastLevelKey="type"
                        lastLevelValue="department"
                        placeholder="选择部门"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column width="200" label="主办人">
                  <template slot-scope="scope">
                    <el-form-item
                      label-width="0"
                      :prop="'decomposeList.' + scope.$index + '.sponsor'"
                      :rules="rules.sponsor"
                    >
                      <el-select
                        v-model="scope.row.sponsor"
                        filterable
                        :multiple="false"
                        placeholder="请选择"
                        @visible-change="getDeptMember(0, scope.row.hostdept)"
                      >
                        <el-option
                          v-for="item in sponsorOptions"
                          :key="item.userId"
                          :label="item.realName"
                          :value="item.userId"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column width="200" label="协办部门">
                  <template slot-scope="scope">
                    <!-- <dep-select v-model="scope.row.assistingdept" placeholder="请选择" >
                        </dep-select> -->
                    <el-form-item
                      label-width="0"
                      :prop="'decomposeList.' + scope.$index + '.assistingdept'"
                      :rules="rules.assistingdept"
                    >
                      <CCIT-TreeSelect
                        v-model="scope.row.assistingdept"
                        :options="departmentTreeData"
                        lastLevel
                        lastLevelKey="type"
                        lastLevelValue="department"
                        placeholder="选择部门"
                        clearable
                      />
                    </el-form-item>
                  </template>
                </el-table-column>
                <el-table-column width="200" label="协办人">
                  <template slot-scope="scope">
                    <el-form-item
                  label-width="0"
                  :prop="
                    'decomposeList.' +
                    scope.$index +
                    '.assistant'
                  "
                  :rules="rules.assistant"
                >
                 <el-select v-model="scope.row.assistant" filterable :multiple="false" placeholder="请选择"
                   @visible-change="getDeptMember(1,scope.row.assistingdept)">
                    <el-option
                      v-for="item in assistantOptions"
                      :key="item.userId"
                      :label="item.realName"
                      :value="item.userId">
                    </el-option>
                  </el-select>
                </el-form-item>
                    
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="50">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="text"
                      class="CCIT-table-delBtn"
                      @click="delDecomposeList(scope.$index)"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="table-actions" @click="addDecomposeList()">
                <el-button type="text" icon="el-icon-plus">新增</el-button>
              </div>
            <!-- </el-form-item> -->
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="decomposeVisible = false">取 消</el-button>
        <el-button type="primary" @click="decompose()">确 定</el-button>
      </div>
    </el-dialog>

    <span slot="footer" class="dialog-footer">
      <!-- <el-button type="primary" v-if="activeName == '2'" @click="acceptOrReject(0)">拒 绝</el-button> -->
      <el-button
        type="primary"
        v-if="
          (activeName == '2' || activeName == '5') && redeployData.status == '0'
        "
        @click="acceptOrReject(1)"
        >接 受</el-button
      >
      <el-button
        type="primary"
        v-if="
          (activeName == '2' || activeName == '5') && redeployData.status == '0'
        "
        @click="innerVisible = true"
        >转 派</el-button
      >

      <el-button
        type="primary"
        v-if="
          (activeName == '2' || activeName == '5') && redeployData.status == '0'
        "
        @click="decomposeVisible = true,decomposeDataForm.decomposeList = []"
        >分 解</el-button
      >

      <el-button
        type="primary"
        v-if="
          (activeName == '2' || activeName == '5') && redeployData.status == '1'
        "
        @click="feedbackVisible = true"
        >反 馈</el-button
      >
      <el-button
        type="primary"
        v-if="
          (activeName == '1' || activeName == '3' || activeName == '4') &&
          redeployData.status != '3' &&
          redeployData.status != '6'
        "
        @click="urge()"
        >催 办</el-button
      >

      <el-button
        type="primary"
        v-if="activeName == '1' && redeployData.status == '3'"
        @click="finish()"
        >办 结</el-button
      >
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" v-if="!isDetail"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<style>
.el-table th.must > .cell:before {
  content: "*";
  color: #ff1818;
}
</style>
<script>
import request from "@/utils/request";
import { getDictionaryDataSelector } from "@/api/systemData/dictionary";
import { previewDataInterface } from "@/api/systemData/dataInterface";
import { getDepartmentSelector ,getDepartmentList} from "@/api/permission/department";
import { getDepartmentMember } from "@/api/permission/userOrganize";

export default {
  components: {},
  props: [],
  data() {
    return {
      //协办人下拉数据
      assistantOptions: [],
      //主办人下拉数据
      sponsorOptions: [],
      remindtargetarr: [],
      remindmodearr: [],
      week: [
        {
          value: "1",
          label: "周一",
        },
        {
          value: "2",
          label: "周二",
        },
        {
          value: "3",
          label: "周三",
        },
        {
          value: "4",
          label: "周四",
        },
        {
          value: "5",
          label: "周五",
        },
        {
          value: "6",
          label: "周六",
        },
        {
          value: "7",
          label: "周日",
        },
      ],
      //分解任务列表list
      DecomposeTaskList: [],
      //分解数据
      decomposeDataForm: {
        decomposeList:[]
      },
      decomposeVisible: false,
      //分解提交数据
      decomposeLists:{decomposeList: []},
      //反馈页面是否查看
      isFeedback: false,
      operatingData: [],
      feedbackFormData: {
        feedbackContent: undefined,
        feedbackAccessory: undefined,
      },
      feedbackVisible: false,
      departmentTreeData: [],
      redeployData: {},
      innerVisible: false,
      activeName: undefined,
      loading: false,
      visible: false,
      isDetail: false,
      dataForm: {
        remindtime: undefined,
        remindmode: undefined,
        remindtarget: undefined,
        remindcycle: undefined,
        transfer: undefined,
        name: undefined,
        endtime: undefined,
        isremind: 0,
        srctype:undefined,
        drafter: this.$store.getters.userInfo.userName,
        accessory: [],
        remark: undefined,
        crm_supervision_task_itemEntityList: [],
      },
      rules: {
        srctype:[
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          }
        ],
        name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        endtime: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        isremind: [
          {
            required: true,
            message: "请至少选择一个",
            trigger: "blur",
          },
        ],
        feedbackContent: [
          {
            required: true,
            message: "请输入",
            trigger: "blur",
          },
        ],
        transfer: [
          {
            required: true,
            message: "请选择",
            trigger: "blur",
          },
        ],
        content: [
          {
            required: true,
            message: "请输入工作内容",
            trigger: ["change", "blur"],
          },
        ],
        starttime: [
          {
            required: true,
            message: "请输入开始时间",
            trigger: ["change", "blur"],
          },
        ],
        endtime: [
          {
            required: true,
            message: "请输入结束时间",
            trigger: ["change", "blur"],
          },
        ],
        hostdept: [
          {
            required: true,
            message: "请选择主办部门",
            trigger: ["change", "blur"],
          },
        ],
      },
      isremindOptions: [
        { fullName: "是", id: 1 },
        { fullName: "否", id: 0 },
      ],
      accessoryList: [],
      accessory: [],
      feedbackAccessoryList: [],
      feedbackAccessory: [],
    };
  },
  computed: {},
  watch: {
  },
  created() {},
  mounted() {},
  methods: {
    //部门人员联动
    getDeptMember(type, objectId) {
      this.sponsorOptions = [];
      this.assistantOptions = [];
      getDepartmentMember(objectId).then((res) => {
        if (type == 0) {
          this.sponsorOptions = res.data.list;
        } else if (type == 1) {
          this.assistantOptions = res.data.list;
        }
      });
    },
    must(obj) {
      if (
        obj.columnIndex == 1 ||
        obj.columnIndex == 2 ||
        obj.columnIndex == 3 ||
        obj.columnIndex == 4
      ) {
        return "must";
      }
    },
    //获取分解任务列表
    getDecomposeTaskList() {
      request({
        url:
          `/api/customer/api/system/Crm_supervision_task/getDecomposeTaskList/` +
          this.redeployData.taskItemId,
        method: "get",
      }).then((res) => {
        this.DecomposeTaskList = res.data;
      });
    },
    //分解任务
    decompose() {
      if(this.decomposeDataForm.decomposeList < 1){
        this.$message({
          message: "请添加承办人",
          type: "warning",
        });
        return;
      }
      this.decomposeDataForm.crm_supervision_task_itemEntityList =
        this.decomposeDataForm.decomposeList;
      this.decomposeDataForm.activeName = this.activeName;
      this.decomposeDataForm.taskId = this.redeployData.id;
      (this.decomposeDataForm.redeployId = this.redeployData.redeployId),
        (this.decomposeDataForm.taskItemId = this.redeployData.taskItemId),
        this.$refs["decomposeForm"].validate((valid) => {
          if (valid) {
            request({
              url: `/api/customer/api/system/Crm_supervision_task/decompose`,
              method: "post",
              data: this.decomposeDataForm,
            }).then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1000,
                onClose: () => {
                  (this.decomposeVisible = false), this.getDecomposeTaskList();
                },
              });
            });
          }
        });
    },
    //查询反馈详情
    feedbackDetails(redeployid) {
      request({
        url: `/api/customer/api/system/Crm_redeploy_record/` + redeployid,
        method: "get",
      }).then((res) => {
        this.feedbackFormData = res.data;
        this.feedbackAccessoryList = this.feedbackFormData.feedbackAccessory
          ? JSON.parse(this.feedbackFormData.feedbackAccessory)
          : [];
        this.isFeedback = true;
      });
    },
    //查询操作记录
    getListByActiveName() {
      request({
        url: `/api/customer/api/system/Crm_supervise_task_operating_record/getListByActiveName`,
        method: "post",
        data: {
          activeName: this.activeName,
          taskId: this.redeployData.id,
          redeployId: this.redeployData.redeployId,
          taskItemId: this.redeployData.taskItemId,
        },
      }).then((res) => {
        this.operatingData = res.data;
      });
    },
    //完结
    finish() {
      request({
        url: `/api/customer/api/system/Crm_supervision_task/finish`,
        method: "post",
        data: {
          activeName: this.activeName,
          taskId: this.redeployData.id,
          redeployId: this.redeployData.redeployId,
          taskItemId: this.redeployData.taskItemId,
        },
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {
            (this.visible = false), this.$emit("refresh", true);
          },
        });
      });
    },
    //催办
    urge() {
      request({
        url: `/api/customer/api/system/Crm_supervision_task/urge`,
        method: "post",
        data: {
          activeName: this.activeName,
          taskId: this.redeployData.id,
          redeployId: this.redeployData.redeployId,
          taskItemId: this.redeployData.taskItemId,
        },
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {},
        });
      });
    },
    //提交反馈
    feedback() {
      this.$set(
        this.feedbackFormData,
        "feedbackAccessory",
        this.feedbackAccessoryList.length
          ? JSON.stringify(this.feedbackAccessoryList)
          : ""
      );
      this.$refs["feedbackForm"].validate((valid) => {
        if (valid) {
          request({
            url: `/api/customer/api/system/Crm_redeploy_record/feedback`,
            method: "post",
            data: {
              feedbackContent: this.feedbackFormData.feedbackContent,
              feedbackAccessory: this.feedbackFormData.feedbackAccessory,
              activeName: this.activeName, //2主办，5协办
              redeployId: this.redeployData.redeployId,
              taskItemId: this.redeployData.taskItemId,
              taskId: this.redeployData.id,
            },
          }).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 1000,
              onClose: () => {
                (this.feedbackVisible = false),
                  (this.visible = false),
                  this.$emit("refresh", true);
              },
            });
          });
        }
      });
    },
    //关闭Dialog时调用
    closeDialog() {
      // this.isDetail = true;
      this.isFeedback = false;
    },
    //接受或拒绝
    acceptOrReject(status) {
      request({
        url: `/api/customer/api/system/Crm_redeploy_record/acceptOrReject`,
        method: "post",
        data: {
          taskId: this.redeployData.id,
          activeName: this.activeName, //2主办，5协办
          status: status,
          redeployId: this.redeployData.redeployId,
          taskItemId: this.redeployData.taskItemId,
        },
      }).then((res) => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 1000,
          onClose: () => {
            (this.visible = false), this.$emit("refresh", true);
          },
        });
      });
    },
    //转派
    redeploy() {
      this.$refs["redeployForm"].validate((valid) => {
        if (valid) {
          request({
            url: `/api/customer/api/system/Crm_supervision_task/redeploy`,
            method: "post",
            data: {
              activeName: this.activeName, //2主办，5协办
              transfer: this.dataForm.transfer,
              redeployId: this.redeployData.redeployId,
              taskItemId: this.redeployData.taskItemId,
              taskId: this.redeployData.id,
            },
          }).then((res) => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 1000,
              onClose: () => {
                (this.innerVisible = false),
                  (this.visible = false),
                  this.$emit("refresh", true);
              },
            });
          });
        }
      });
    },
    init(data, isDetail, activeName) {
      this.redeployData = data;
      this.activeName = activeName;
      this.dataForm.id = data.id || 0;
      this.visible = true;
      this.isDetail = isDetail || false;
      this.$nextTick(() => {
        //新建时，初始化数据
        if (!isDetail) {
          this.dataForm = {
            remindtime: undefined,
            isremind: 0,
            drafter: this.$store.getters.userInfo.userName,
            crm_supervision_task_itemEntityList: [],
          };
        }

        this.$refs["elForm"].resetFields();
        if (this.dataForm.id) {
          this.loading = true;
          request({
            url:
              "/api/customer/api/system/Crm_supervision_task/" +
              this.dataForm.id +
              "/" +
              this.activeName +
              "/" +
              this.redeployData.redeployId,
            method: "get",
          }).then((res) => {
            this.dataForm = res.data;
            this.accessoryList = this.dataForm.accessory
              ? JSON.parse(this.dataForm.accessory)
              : [];
            this.remindmodearr = this.dataForm.remindmode
              ? this.dataForm.remindmode.split(",")
              : [];
            this.remindtargetarr = this.dataForm.remindtarget
              ? this.dataForm.remindtarget.split(",")
              : [];
            this.dataForm.crm_supervision_task_itemEntityList = this.dataForm
              .crm_supervision_task_itemEntityList
              ? this.dataForm.crm_supervision_task_itemEntityList
              : [];
            this.loading = false;
          });
        }
      });
      // 获取部门树
      // getDepartmentSelector("xz").then((res) => {
      //   this.departmentTreeData = res.data.list;
      // });
      
      getDepartmentList("96240625-934F-490B-8AA6-0BC775B18468").then((res) => {
        this.departmentTreeData = res.data.list;
      });
      this.getListByActiveName();
      //获取分解任务数据
      this.getDecomposeTaskList();
    },
    // 表单提交
    dataFormSubmit() {
      this.$set(
        this.dataForm,
        "accessory",
        this.accessoryList.length ? JSON.stringify(this.accessoryList) : ""
      );

      this.$set(
        this.dataForm,
        "remindmode",
        this.remindmodearr.length ? this.remindmodearr.toString() : ""
      );

      this.$set(
        this.dataForm,
        "remindtarget",
        this.remindtargetarr.length ? this.remindtargetarr.toString() : ""
      );
      this.$refs["elForm"].validate((valid) => {
        if (valid) {
          //承办人校验
          if (this.dataForm.crm_supervision_task_itemEntityList.length < 1) {
            this.$message({
              message: "请添加承办人",
              type: "warning",
            });
            return;
          }
          if (!this.dataForm.id) {
            request({
              url: `/api/customer/api/system/Crm_supervision_task`,
              method: "post",
              data: this.dataForm,
            }).then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1000,
                onClose: () => {
                  (this.visible = false), this.$emit("refresh", true);
                },
              });
            });
          } else {
            request({
              url:
                "/api/customer/api/system/Crm_supervision_task/" +
                this.dataForm.id,
              method: "PUT",
              data: this.dataForm,
            }).then((res) => {
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1000,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refresh", true);
                },
              });
            });
          }
        }
      });
    },
    addHandlecrm_supervision_task_itemEntityList() {
      let item = {
        content: undefined,
        starttime: undefined,
        endtime: undefined,
        hostdept: undefined,
        sponsor: undefined,
        assistingdept: undefined,
        assistant: undefined,
      };
      this.dataForm.crm_supervision_task_itemEntityList.push(item);
    },
    addDecomposeList() {
      let item = {
        content: undefined,
        starttime: undefined,
        endtime: undefined,
        hostdept: undefined,
        sponsor: undefined,
        assistingdept: undefined,
        assistant: undefined,
      };
      this.decomposeDataForm.decomposeList.push(item);
    },
    handleDelcrm_supervision_task_itemEntityList(index) {
      this.dataForm.crm_supervision_task_itemEntityList.splice(index, 1);
    },
    delDecomposeList(index) {
      this.decomposeDataForm.decomposeList.splice(index, 1);
    },
  },
};
</script>




