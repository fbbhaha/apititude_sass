import CCITTreeSelect from '@/components/CCIT-treeSelect'
import topOperation from '@/components/CCIT-topOperation/index'
import tableOperation from '@/components/CCIT-tableOperation'
import Pagination from '@/components/Pagination'
import CCITTable from '@/components/CCIT-table'
import ccitFormTipItem from '@/components/ccit-form-tip-item'
import UserBox from '@/components/CCIT-userBox'
import Screenfull from '@/components/Screenfull'
import ColumnSettings from '@/components/ColumnSettings'
import CCITQuill from '@/components/CCITEditor/quill'
import UserSelect from '@/components/CCIT-userSelect'
import uploadBtn from '@/components/CCIT-uploadBtn'
// 代码生成器专供
import CCITText from '@/components/Generator/components/CCITText'
import CcitBarcode from '@/components/Generator/components/CcitBarcode'
import CcitQrcode from '@/components/Generator/components/CcitQrcode'
import CcitButton from '@/components/Generator/components/CcitButton'
import CCITUploadFz from '@/components/Generator/components/Upload/UploadFz'
import CCITUploadImg from '@/components/Generator/components/Upload/UploadImg'
import PopupSelect from '@/components/Generator/components/PopupSelect'
import PopupAttr from '@/components/Generator/components/PopupAttr'
import NumRange from '@/components/Generator/components/NumRange'
import ComSelect from '@/components/Generator/components/ComSelect'
import DepSelect from '@/components/Generator/components/DepSelect'
import PosSelect from '@/components/Generator/components/PosSelect'
import DicSelect from '@/components/Generator/components/DicSelect'
import BillRule from '@/components/Generator/components/BillRule'
import CCITInputTable from '@/components/Generator/components/InputTable'
import CCITAddress from '@/components/Generator/components/Address'
import GroupTitle from '@/components/Generator/components/GroupTitle'
import RelationForm from '@/components/Generator/components/RelationForm'
import RelationFormAttr from '@/components/Generator/components/RelationFormAttr'
import Calculate from '@/components/Generator/components/Calculate'

export default {
  install(Vue, options) {
    Vue.component('CCITTreeSelect', CCITTreeSelect)
    Vue.component('topOpts', topOperation)
    Vue.component('tableOpts', tableOperation)
    Vue.component('Pagination', Pagination)
    Vue.component('CCITTable', CCITTable)
    Vue.component('ccitFormTipItem', ccitFormTipItem)
    Vue.component('uploadBtn', uploadBtn)
    Vue.component('UserBox', UserBox)
    Vue.component('CCITText', CCITText)
    Vue.component('CcitBarcode', CcitBarcode)
    Vue.component('CcitQrcode', CcitQrcode)
    Vue.component('CcitButton', CcitButton)
    Vue.component('CCITUploadFz', CCITUploadFz)
    Vue.component('CCITUploadImg', CCITUploadImg)
    Vue.component('PopupSelect', PopupSelect)
    Vue.component('PopupAttr', PopupAttr)
    Vue.component('NumRange', NumRange)
    Vue.component('ComSelect', ComSelect)
    Vue.component('DepSelect', DepSelect)
    Vue.component('PosSelect', PosSelect)
    Vue.component('UserSelect', UserSelect)
    Vue.component('DicSelect', DicSelect)
    Vue.component('BillRule', BillRule)
    Vue.component('CCITInputTable', CCITInputTable)
    Vue.component('CCITAddress', CCITAddress)
    Vue.component('GroupTitle', GroupTitle)
    Vue.component('RelationForm', RelationForm)
    Vue.component('RelationFormAttr', RelationFormAttr)
    Vue.component('Calculate', Calculate)
    Vue.component('CCITQuill', CCITQuill)
    Vue.component('Screenfull', Screenfull)
    Vue.component('ColumnSettings', ColumnSettings)
  }
}