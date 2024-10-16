<template>
    <div class="CCIT-common-layout">

        <div class="CCIT-common-layout-center">
            <el-row class="CCIT-common-search-box" :gutter="16">
                <el-form @submit.native.prevent>
                    <el-col :span="6">
                        <el-form-item label="公司ID">
                            <el-input v-model="query.companyId" placeholder="请输入" clearable> </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="上班考勤时间">
                            <el-input v-model="query.adtInTime" placeholder="请输入" clearable> </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                            <el-button icon="el-icon-refresh-right" @click="reset()">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-form>
            </el-row>
            <div class="CCIT-common-layout-main CCIT-flex-main">
                <div class="CCIT-common-head">
                    <div>
                        <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()">新增
                        </el-button>
                        <el-button type="text" icon="el-icon-download" @click="exportData()">导出
                        </el-button>
                    </div>
                    <div class="CCIT-common-head-right">
                        <el-tooltip effect="dark" content="刷新" placement="top">
                            <el-link icon="icon-ym icon-ym-Refresh CCIT-common-head-icon" :underline="false"
                                @click="reset()" />
                        </el-tooltip>
                        <screenfull isContainer />
                    </div>
                </div>

                <div class="table-content">
                    <table border="0" align="center" cellpadding="0" cellspacing="0" class="tableInfo">
                        <tr>
                            <th width="50">序号</th>
                            <th width="100">姓名</th>
                            <th width="100">工号</th>
                            <th width="200">部门</th>
                            <th width="100">手机</th>
                            <th v-for="(it, ind) in monthOfReport" :key="ind" width="110">{{ attendInfo.month }}/{{ ind + 1
                            }}
                            </th>
                        </tr>
                        <tr v-for="(item, index) in baseData" :key="item.id">
                            <td width="50">{{ index }}</td>
                            <td width="100">{{ item.username }}</td>
                            <td width="100">{{ item.workNumber }}</td>
                            <td width="200">{{ item.departmentName }}</td>
                            <td width="100">{{ item.mobile }}</td>
                            <td v-for="(it, ind) in item.attendanceRecord" @click="handleOver(item, ind, it)" :key="ind"
                                width="110">
                                <span v-if="it.adtStatu === 1">√</span>
                                <span v-if="it.adtStatu === 2">旷工</span>
                                <span v-if="it.adtStatu === 3">迟到</span>
                                <span v-if="it.adtStatu === 4">早退</span>
                                <span v-if="it.adtStatu === 5">外出</span>
                                <span v-if="it.adtStatu === 6">出差</span>
                                <span v-if="it.adtStatu === 7">年假</span>
                                <span v-if="it.adtStatu === 8">事假</span>
                                <span v-if="it.adtStatu === 9">病假</span>
                                <span v-if="it.adtStatu === 10">婚假</span>
                                <span v-if="it.adtStatu === 11">丧假</span>
                                <span v-if="it.adtStatu === 12">产假</span>
                                <span v-if="it.adtStatu === 13">奖励产假</span>
                                <span v-if="it.adtStatu === 14">陪产假</span>
                                <span v-if="it.adtStatu === 15">探亲假</span>
                                <span v-if="it.adtStatu === 16">工伤假</span>
                                <span v-if="it.adtStatu === 17">调休</span>
                                <span v-if="it.adtStatu === 18">产检假</span>
                                <span v-if="it.adtStatu === 19">流产假2</span>
                                <span v-if="it.adtStatu === 20">长期病假</span>
                                <span v-if="it.adtStatu === 21">测试架</span>
                                <span v-if="it.adtStatu === 22">补签</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <pagination :total="total" :page.sync="listQuery.currentPage" :limit.sync="listQuery.pageSize"
                    @pagination="initData" />
            </div>
        </div>
        <CCIT-Form v-if="formVisible" ref="CCITForm" @refresh="refresh" />
        <ExportBox v-if="exportBoxVisible" ref="ExportBox" @download="download" />
        <Detail v-if="detailVisible" ref="Detail" @refresh="detailVisible = false" />
    </div>
</template>

<script>
import { getkqPage } from '@/api/Archives/archivesinfo'
import request from '@/utils/request'
import { getDictionaryDataSelector } from '@/api/systemData/dictionary'
import CCITForm from './Form'
import ExportBox from './ExportBox'
import { getDataInterfaceRes } from '@/api/systemData/dataInterface'
import Detail from './Detail'

export default {
    components: { CCITForm, ExportBox, Detail },
    data() {
        return {
            kqlist: [],
            monthOfReport: "",
            baseData: [],
            month: "",
            yearMonth: "",
            attendInfo: {
                month: "",
                getDate: "",
                getInfo: "",
                name: "",
                counts: "",
                tobeTaskCount: ""
            },
            detailVisible: false,
            query: {
                companyId: undefined,
                adtInTime: undefined,
            },
            treeProps: {
                children: 'children',
                label: 'fullName',
                value: 'id'
            },
            list: [],
            listLoading: true,
            total: 0,
            listQuery: {
                currentPage: 1,
                pageSize: 20,
                sort: "desc",
                sidx: "createDate",
            },
            formVisible: false,
            exportBoxVisible: false,
            columnList: [
                { prop: 'companyId', label: '公司ID' },
                { prop: 'adtInTime', label: '上班考勤时间' },
                { prop: 'userId', label: '用户ID' },
                { prop: 'departmentId', label: '部门ID' },
                { prop: 'createDate', label: '单行输入' },
                { prop: 'updateDate', label: '单行输入' },
                { prop: 'day', label: '单行输入' },
                { prop: 'username', label: '单行输入' },
                { prop: 'departmentName', label: '单行输入' },
                { prop: 'adtStatu', label: '考情状态 1正常2旷工3迟到4早退5外出6出差7年假8事假9病假10婚假11丧假12产假13奖励产假14陪产假15探亲假16工伤假17调休18产检假19流产假20长期病假21测试架22补签' },
                { prop: 'jobStatu', label: '职位状态 1在职2离职' },
                { prop: 'adtInHourse', label: '考勤办公室' },
                { prop: 'adtInPlace', label: '考勤地点' },
                { prop: 'adtOutTime', label: '下班考勤时间' },
                { prop: 'adtOutPlace', label: '下班考情地点' },
            ],
        }
    },
    computed: {
        menuId() {
            return this.$route.meta.modelId || ''
        }
    },
    created() {
        this.initData()
    },
    methods: {
        goDetail(id) {
            this.detailVisible = true
            this.$nextTick(() => {
                this.$refs.Detail.init(id)
            })
        },
        sortChange({ column, prop, order }) {
            this.listQuery.sort = order == 'ascending' ? 'asc' : 'desc'
            this.listQuery.sidx = !order ? '' : prop
            this.initData()
        },
        initData() {
            this.listLoading = false;
            let _query = {
                ...this.listQuery,
                ...this.query,
                menuId: this.menuId
            };
            getkqPage(this.listQuery).then(res => {
                let data = res.data
                this.listLoading = false
                if (data === null) {
                    this.baseData = [];
                } else {
                    this.baseData = data.data.records;
                    this.total =  data.data.total
                    this.attendInfo.counts = data.data.total;
                    var date = new Date();
                    var year = date.getFullYear();
                    var month = data.monthOfReport;
                    this.attendInfo.month = data.monthOfReport;
                    this.attendInfo.tobeTaskCount = data.tobeTaskCount;
                    var d = new Date(year, month, 0);
                    this.monthOfReport = d.getDate();

                    this.yearMonth = year + ("" + month < 10 ? "0" + month : month);
                    this.month = data.monthOfReport;
                }
            }).catch(() => {
                this.listLoading = false
            })
        },
        handleDel(id) {
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                type: 'warning'
            }).then(() => {
                request({
                    url: `/api/example/Atte_attendance/${id}`,
                    method: 'DELETE'
                }).then(res => {
                    this.$message({
                        type: 'success',
                        message: res.msg,
                        onClose: () => {
                            this.initData()
                        }
                    });
                })
            }).catch(() => {
            });
        },
        addOrUpdateHandle(id, isDetail) {
            this.formVisible = true
            this.$nextTick(() => {
                this.$refs.CCITForm.init(id, isDetail)
            })
        },
        exportData() {
            this.exportBoxVisible = true
            this.$nextTick(() => {
                this.$refs.ExportBox.init(this.columnList)
            })
        },
        download(data) {
            let query = { ...data, ...this.listQuery, ...this.query, menuId: this.menuId }
            request({
                url: `/api/example/Atte_attendance/Actions/Export`,
                method: 'GET',
                data: query
            }).then(res => {
                if (!res.data.url) return
                this.ccit.downloadFile(res.data.url)
                this.$refs.ExportBox.visible = false
                this.exportBoxVisible = false
            })
        },
        search() {
            this.listQuery = {
                currentPage: 1,
                pageSize: 20,
                sort: "desc",
                sidx: "createDate",
            }
            this.initData()
        },
        refresh(isrRefresh) {
            this.formVisible = false
            if (isrRefresh) this.reset()
        },
        reset() {
            for (let key in this.query) {
                this.query[key] = undefined
            }
            this.search()
        }
    }
}
</script>
<style scoped lang="scss">
.table-content{
    overflow-x: auto;
    margin-left: 10px;
    margin-top: 10px;
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

</style>