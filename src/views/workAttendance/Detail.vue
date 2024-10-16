<template>
<el-dialog title="详情"
           :close-on-click-modal="false" append-to-body
           :visible.sync="visible" class="CCIT-dialog CCIT-dialog_center" lock-scroll
           width="600px">
<el-row :gutter="15" class="">
<el-form ref="elForm" :model="dataForm" size="small" label-width="100px" label-position="right" >
    <template v-if="!loading">
            <el-col :span="24" >
                <el-form-item  label="公司ID"  
 prop="companyId" >
                        <p>{{dataForm.companyId}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="上班考勤时间"  
 prop="adtInTime" >
                        <p>{{dataForm.adtInTime}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="用户ID"  
 prop="userId" >
                        <p>{{dataForm.userId}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="部门ID"  
 prop="departmentId" >
                        <p>{{dataForm.departmentId}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="单行输入"  
 prop="createDate" >
                        <p>{{dataForm.createDate}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="单行输入"  
 prop="updateDate" >
                        <p>{{dataForm.updateDate}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="单行输入"  
 prop="day" >
                        <p>{{dataForm.day}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="单行输入"  
 prop="username" >
                        <p>{{dataForm.username}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="单行输入"  
 prop="departmentName" >
                        <p>{{dataForm.departmentName}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="考情状态 1正常2旷工3迟到4早退5外出6出差7年假8事假9病假10婚假11丧假12产假13奖励产假14陪产假15探亲假16工伤假17调休18产检假19流产假20长期病假21测试架22补签"  
 prop="adtStatu" >
                        <p>{{dataForm.adtStatu}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="职位状态 1在职2离职"  
 prop="jobStatu" >
                        <p>{{dataForm.jobStatu}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="考勤办公室"  
 prop="adtInHourse" >
                        <p>{{dataForm.adtInHourse}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="考勤地点"  
 prop="adtInPlace" >
                        <p>{{dataForm.adtInPlace}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="下班考勤时间"  
 prop="adtOutTime" >
                        <p>{{dataForm.adtOutTime}}</p>
                </el-form-item>
            </el-col>
            <el-col :span="24" >
                <el-form-item  label="下班考情地点"  
 prop="adtOutPlace" >
                        <p>{{dataForm.adtOutPlace}}</p>
                </el-form-item>
            </el-col>
    </template>
</el-form>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false"> 取 消</el-button>
    </span>
    </el-dialog>
</template>
<script>
    import request from '@/utils/request'
    import PrintBrowse from '@/components/PrintBrowse'
    import ccit from '@/utils/ccit'
    export default {
        components: {PrintBrowse},
        props: [],
        data() {
            return {
                visible: false,
                loading: false,
                printBrowseVisible: false,
                printId: '',
            dataForm: {
                id :'',
                            companyId : '',
                            adtInTime : '',
                            userId : '',
                            departmentId : '',
                            createDate : '',
                            updateDate : '',
                            day : '',
                            username : '',
                            departmentName : '',
                            adtStatu : '',
                            jobStatu : '',
                            adtInHourse : '',
                            adtInPlace : '',
                            adtOutTime : '',
                            adtOutPlace : '',
            },

        }
        },
        computed: {},
        watch: {},
        created() {

        },
        mounted() {},
        methods: {
            dataInfo(dataAll){
                let _dataAll =dataAll
                this.dataForm = _dataAll
            },

            init(id) {
                this.dataForm.id = id || 0;
                this.visible = true;
                this.$nextTick(() => {
                    if(this.dataForm.id){
                        this.loading = true
                        request({
                            url: '/api/example/Atte_attendance/detail/'+this.dataForm.id,
                            method: 'get'
                        }).then(res => {
                            this.dataInfo(res.data)
                            this.loading = false
                        })
                    }

                })
            },
        },
    }

</script>
