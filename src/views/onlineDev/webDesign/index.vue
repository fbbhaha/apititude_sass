<template>
  <div class="CCIT-common-layout">
    <div class="CCIT-common-layout-center">
      <el-row class="CCIT-common-search-box" :gutter="16">
        <el-form @submit.native.prevent>
          <el-col :span="6">
            <el-form-item label="关键词">
              <el-input v-model="query.keyword" placeholder="请输入关键词查询" clearable
                @keyup.enter.native="search()" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属分类">
              <el-select v-model="category" placeholder="请选择所属分类" clearable>
                <el-option v-for="item in categoryList" :key="item.id" :label="item.fullName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">
                {{$t('common.search')}}</el-button>
              <el-button icon="el-icon-refresh-right" @click="reset()">{{$t('common.reset')}}
              </el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div class="CCIT-common-layout-main CCIT-flex-main">
        <div class="CCIT-common-head">
          <topOpts @add="openAddBox()">
            <upload-btn url="/api/visualdev/OnlineDev/Model/Actions/ImportData"
              @on-success="initData" />
          </topOpts>
          <div class="CCIT-common-head-right">
            <el-tooltip effect="dark" :content="$t('common.refresh')" placement="top">
              <el-link icon="icon-ym icon-ym-Refresh CCIT-common-head-icon" :underline="false"
                @click="initData()" />
            </el-tooltip>
          </div>
        </div>
        <CCIT-table v-loading="listLoading" :data="list">
          <el-table-column prop="fullName" label="名称" show-overflow-tooltip min-width="200" />
          <el-table-column prop="enCode" label="编码" width="200" />
          <el-table-column prop="category" label="分类" width="150" />
          <el-table-column prop="webType" label="模式" width="70" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.webType == 1">表单</span>
              <span v-if="scope.row.webType == 2">列表</span>
              <span v-if="scope.row.webType == 3">流程</span>
            </template>
          </el-table-column>
          <el-table-column prop="creatorUser" label="创建人" width="120" />
          <el-table-column prop="creatorTime" label="创建时间" :formatter="ccit.tableDateFormat"
            width="120" />
          <el-table-column prop="lastModifyTime" label="最后修改时间" :formatter="ccit.tableDateFormat"
            width="120" />
          <el-table-column prop="sortCode" label="排序" width="70" align="center" />
          <el-table-column prop="state" label="状态" width="70" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.state == 1 ? 'success' : 'danger'" disable-transitions>
                {{scope.row.state==1?'正常':'停用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <tableOpts @edit="addOrUpdateHandle(scope.row.id)" @del="handleDel(scope.row.id)">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <el-button type="text" size="mini">{{$t('common.moreBtn')}}<i
                        class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="toggleWebType(scope.row)">更改模式
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="openReleaseDialog(scope.row)">同步菜单
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="preview(scope.row.id)">预览模板</el-dropdown-item>
                    <el-dropdown-item @click.native="copy(scope.row.id)">复制模板</el-dropdown-item>
                    <el-dropdown-item @click.native="exportModel(scope.row.id)">导出模板
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </tableOpts>
            </template>
          </el-table-column>
        </CCIT-table>
        <pagination :total="total" :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize" @pagination="initData" />
      </div>
    </div>
    <Form v-if="formVisible" ref="Form" @close="closeForm" />
    <AddBox :visible.sync="addVisible" :webType="currWebType" @add="handleAdd" />
    <el-dialog title="同步菜单" :visible.sync="releaseDialogVisible"
      class="CCIT-dialog CCIT-dialog_center release-dialog" lock-scroll width="600px">
      <el-alert title="将该功能的按钮、列表、表单及数据权限同步至系统菜单" type="warning" :closable="false" show-icon />
      <div class="dialog-main">
        <div class="item" :class="{'active':releaseQuery.pc===1}" @click="selectToggle('pc')">
          <i class="item-icon icon-ym icon-ym-pc"></i>
          <p class="item-title">同步Web端菜单</p>
          <div class="icon-checked">
            <i class="el-icon-check"></i>
          </div>
        </div>
        <div class="item" :class="{'active':releaseQuery.app===1}" @click="selectToggle('app')">
          <i class="item-icon icon-ym icon-ym-mobile"></i>
          <p class="item-title">同步APP端菜单</p>
          <div class="icon-checked">
            <i class="el-icon-check"></i>
          </div>
        </div>
      </div>
      <el-form class="dialog-form-main" :model="releaseQuery" :rules="releaseQueryRule"
        label-position="right" label-width="50px" ref="releaseForm">
        <template v-if="!currRow.pcIsRelease">
          <el-form-item label="上级" prop="pcModuleParentId" v-if="releaseQuery.pc">
            <CCIT-TreeSelect v-model="releaseQuery.pcModuleParentId" :options="treeData"
              placeholder="选择上级菜单" />
          </el-form-item>
        </template>
        <template v-if="!currRow.appIsRelease">
          <el-form-item label="" v-if="(!releaseQuery.pc||currRow.pcIsRelease) && releaseQuery.app">
          </el-form-item>
          <el-form-item label="上级" prop="appModuleParentId" v-if="releaseQuery.app">
            <CCIT-TreeSelect v-model="releaseQuery.appModuleParentId" :options="appTreeData"
              placeholder="选择上级菜单" />
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="releaseDialogVisible = false">{{$t('common.cancelButton')}}</el-button>
        <el-button type="primary" :loading="releaseBtnLoading" @click="release">
          {{$t('common.confirmButton')}}</el-button>
      </span>
    </el-dialog>
    <previewDialog :visible.sync="previewDialogVisible" :id="currId" type="webDesign" />
  </div>
</template>

<script>
import Form from './Form'
import AddBox from '@/views/generator/AddBox'
import mixin from '@/mixins/generator/index'
import previewDialog from '@/components/PreviewDialog'
import { Release } from '@/api/onlineDev/visualDev'
import { getMenuSelector } from '@/api/system/menu'
export default {
  name: 'onlineDev-webDesign',
  mixins: [mixin],
  components: { Form, AddBox, previewDialog },
  data() {
    return {
      query: { keyword: '', type: 1 },
      sort: 'webDesign',
      previewDialogVisible: false,
      releaseDialogVisible: false,
      releaseBtnLoading: false,
      currRow: {},
      releaseQuery: {
        pc: 1,
        app: 1,
        pcModuleParentId: '',
        appModuleParentId: '',
      },
      releaseQueryRule: {
        pcModuleParentId: [
          { required: true, message: '上级菜单不能为空', trigger: 'change' }
        ],
        appModuleParentId: [
          { required: true, message: '上级菜单不能为空', trigger: 'change' }
        ],
      },
      treeData: [],
      appTreeData: []
    }
  },
  methods: {
    preview(id) {
      this.currId = id
      this.$nextTick(() => {
        this.previewDialogVisible = true
      })
    },
    openReleaseDialog(row) {
      this.currRow = row
      this.releaseDialogVisible = true
      this.releaseQuery = {
        pc: 1,
        app: 1,
        pcModuleParentId: '',
        appModuleParentId: '',
      }
      this.$nextTick(() => {
        this.$refs['releaseForm'].resetFields()
      })
      this.getMenuSelector()
      this.getAPPMenuSelector()
    },
    selectToggle(key) {
      this.releaseQuery[key] = this.releaseQuery[key] === 1 ? 0 : 1
    },
    // 发布菜单
    release() {
      this.$refs['releaseForm'].validate((valid) => {
        if (!valid) return
        if (!this.releaseQuery.pc && !this.releaseQuery.app) return this.$message.error('请至少选择一种菜单同步方式')
        this.releaseBtnLoading = true
        Release(this.currRow.id, this.releaseQuery).then(res => {
          this.releaseBtnLoading = false
          this.releaseDialogVisible = false
          this.initData()
          this.$message({
            type: 'success',
            message: res.msg,
            duration: 1000,
          });
        }).catch(() => { this.releaseBtnLoading = false })
      })
    },
    getMenuSelector() {
      getMenuSelector({ category: 'Web' }, 0).then(res => {
        let topItem = {
          fullName: "顶级节点",
          hasChildren: true,
          id: "-1",
          children: res.data.list
        }
        this.treeData = [topItem]
      })
    },
    getAPPMenuSelector() {
      getMenuSelector({ category: 'App' }, 0).then(res => {
        let topItem = {
          fullName: "顶级节点",
          hasChildren: true,
          id: "-1",
          children: res.data.list
        }
        this.appTreeData = [topItem]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.release-dialog {
  >>> .el-dialog {
    .el-dialog__body {
      padding: 12px 55px;
    }
  }
  .dialog-form-main {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    >>> .el-form-item {
      width: 215px;
    }
  }
  .dialog-main {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .item {
      position: relative;
      width: 215px;
      height: 127px;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      border-radius: 6px;
      text-align: center;
      padding-top: 20px;
      color: #606266;
      &.active {
        border-color: #1890ff;
        color: #1890ff;
        box-shadow: 0 0 6px rgba(6, 58, 108, 0.1);
        .item-icon {
          border-color: #1890ff;
        }
        .icon-checked {
          display: block;
        }
      }
      .item-icon {
        display: inline-block;
        width: 44px;
        height: 44px;
        margin-bottom: 16px;
        border: 2px solid #606266;
        line-height: 40px;
        font-size: 24px;
        text-align: center;
        border-radius: 50%;
      }
      .item-title {
        font-size: 16px;
        font-weight: 400;
      }
      .icon-checked {
        display: none;
        width: 18px;
        height: 18px;
        border: 18px solid #1890ff;
        border-left: 18px solid transparent;
        border-top: 18px solid transparent;
        border-bottom-right-radius: 4px;
        position: absolute;
        right: 0px;
        bottom: 0px;

        i {
          font-size: 16px;
          position: absolute;
          top: 0;
          left: -2px;
          color: #fff;
        }
      }
    }
  }
}
</style>