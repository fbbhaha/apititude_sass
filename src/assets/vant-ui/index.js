import {
  Tabs, Tab, List, Row, Col, CellGroup, Cell, Button, Form, Field, Icon, DatetimePicker,
  Popup, Dialog, RadioGroup, Radio, Uploader, TreeSelect, Collapse, CollapseItem, Picker, Divider, Steps, Step,
  Empty,Checkbox,CheckboxGroup
} from 'vant'
const vant = {
  install: function (Vue) {
    Vue.use(Tabs)
    Vue.use(Tab)
    Vue.use(List)
    Vue.use(Row)
    Vue.use(Col)
    Vue.use(CellGroup)
    Vue.use(Cell)
    Vue.use(Button)
    Vue.use(Form)
    Vue.use(Field)
    Vue.use(Icon)
    Vue.use(DatetimePicker)
    Vue.use(Popup)
    Vue.use(Dialog)
    Vue.use(RadioGroup)
    Vue.use(Radio)
    Vue.use(Uploader)
    Vue.use(TreeSelect)
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Picker)
    Vue.use(Divider)
    Vue.use(Steps)
    Vue.use(Step)
    Vue.use(Empty)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
  }
}

export default vant