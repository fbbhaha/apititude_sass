
<template>
  <el-dialog :title="title" :close-on-click-modal="false"
    class="CCIT-dialog CCIT-dialog_center transfer-dialog" lock-scroll append-to-body
    v-bind="$attrs" width="800px" :modal-append-to-body="false" v-on="$listeners" @open="onOpen">
    <userTransfer v-model="selectedData" ref="userTransfer" multiple v-if="type==='user'" />
    <roleTransfer v-model="selectedData" ref="roleTransfer" multiple v-else-if="type==='role'" />
    <CCITTransfer :loading="loading" :treeData="treeData" v-model="selectedData" :type="type"
      ref="CCITTransfer" v-else />
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeTransfer">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" @click="confirm">{{$t('common.confirmButton')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import CCITTransfer from '@/components/CCIT-transfer'
import userTransfer from '@/components/CCIT-userTransfer'
import roleTransfer from './roleTransfer'

export default {
  name: 'org-transfer',
  components: { CCITTransfer, userTransfer, roleTransfer },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'user'
    },
    title: {
      type: String,
      default: '组织机构'
    },
  },
  data() {
    return {
      loading: false,
      treeData: [],
      selectedData: []
    }
  },
  methods: {
    onOpen() {
      this.dataInit()
    },
    closeTransfer() {
      this.$emit('update:visible', false)
    },
    confirm() {
      this.$emit('confirm', this.selectedData)
      this.closeTransfer()
    },
    dataInit() {
      this.loading = true
      this.selectedData = []
      this.$nextTick(async () => {
        if (this.type === 'user') {
          this.selectedData = JSON.parse(JSON.stringify(this.value))
          this.$nextTick(() => {
            this.$refs.userTransfer && this.$refs.userTransfer.init()
          })
        } else if (this.type === 'role') {
          this.selectedData = JSON.parse(JSON.stringify(this.value))
          this.$nextTick(() => {
            this.$refs.roleTransfer && this.$refs.roleTransfer.init()
          })
        } else {
          let res = await this.$store.dispatch('base/getPositionTree')
          this.$refs.CCITTransfer && (this.$refs.CCITTransfer.filterText = '')
          this.treeData = res
          this.selectedData = this.value
        }
        this.loading = false
      })
    }
  }
}
</script>