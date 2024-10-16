<template> 
    <div >
        <div class="main-title">账科目匹配</div>
        <div class="main">
            <div>
                <el-button type="primary" @click="difeInfo">加载默认值</el-button>
                <el-button type="danger">清空</el-button>
                <el-button type="warning" @click="sbumits">保存</el-button>
            </div>
            <div class="width bg-yellow padding-1 margin margin-top-bottom-2">
                <p class="font-14 margin-top-bottom-1 black">注:填写多条用户科目时用<span class="red">"中文逗号"</span> ， 或<span class="red">“英文逗号"</span>“进行分隔，例如:工资薪金</p>
            </div>
            <el-table :data="dataTable" :span-method="objectSpanMethod" class="padding-bottom-10" :header-cell-style="headerStyle">
              <el-table-column label="标准科目" >
                <el-table-column  prop="levelaccount" width="80"></el-table-column>
                <el-table-column  prop="itemname"></el-table-column>
              </el-table-column>  
              <el-table-column label="用户科目" prop="itempro">
                <template slot-scope="{row}">
                  <el-input v-model="row.itempro" placeholder=""  ></el-input>
                </template>
              </el-table-column>
          </el-table>
        </div>
    </div> 
  </template> 
  <script> 
  import {getProdetailList,ItemDetail,getItemList} from'@/api/detail'
  export default {
      data() {
      return { 
        dataTable: [], 
        spanArr: [],
        typeNameArr: [],
        typeNamePos: 0,
        storeArr: [],
        storePos: 0,
        feeArr: [],
        feePos: 0,
        hoverOrderArr: [],
      };   
    },  
    watch: { 
      dataTable(oldvlaue,newvalue){
        this.getSpanArr( this.dataTable)
      }
    },
    created(){
        this.getProdetailList() 
        // this.getItemList() 
    },  
    methods: {
      difeInfo(){
        this.spanArr=[]
        this.dataTable =   this.dataTable.map((item,i)=>{
              return {
                projectno: item.projectno,
                levelaccount: item.levelaccount, 
                feetype:item.feetype, 
                itemname: item.itemname,
                itempro: item.itemname,  
                proyear:'2022',
                createby:localStorage.getItem('userId') ,
                itemno:item.itemno,
                code:item.code,
              parentCode:item.parentCode
              }
        })
      },
      sbumits(){
        ItemDetail(this.dataTable).then(res=>{ 
          this.spanArr = []
          this.getProdetailList()
          // this.getItemList() 
        })
      },
      getItemList(){
        let data={
          proyear:'2022',
          createby:localStorage.getItem('userId'),
        }
        getItemList(data).then(res=>{
          this.spanArr = []  
          res.data.forEach((item,i) => {
            this.dataTable.forEach((list,j)=>{
              if( this.dataTable[j].projectno == item.projectno){
                this.dataTable[j] = item
              }
            })
          }); 
        })
      },
      getProdetailList(){
        getProdetailList().then(res=>{
          let data = res.data[0].children.map((item,i)=>{
            return { 
              projectno: item.id,
              levelaccount: '一级科目', 
              feetype: '1', 
              itemname: item.fullName,
              itempro:item.fullName,  
              proyear:'2022',
              createby:localStorage.getItem('userId') ,
              itemno:item.enCode,
              code:item.enCode,
              parentCode:item.simpleSpelling
            } 
          }),
          data1=res.data[1].children.map((item,i)=>{
            return { 
              projectno: item.id,
              levelaccount: '二级科目', 
              feetype: '2', 
              itemname: item.fullName,
              itempro: '',  
              proyear:'2022',
              createby:localStorage.getItem('userId'),
              itemno:item.enCode,
              code:item.enCode,
              parentCode:item.simpleSpelling
            } 
          }),
          data2=res.data[2].children.map((item,i)=>{
            return { 
              projectno: item.id,
              levelaccount: '三级科目', 
              feetype: '3', 
              proyear:'2022',
              itemname: item.fullName,
              itempro: '',  
              createby:localStorage.getItem('userId'),
              itemno:item.enCode,
              code:item.enCode,
              parentCode:item.simpleSpelling
            } 
          })
          let dataArry = []
          data.map(item=>{
            dataArry.push(item) 
            console.log(item)
          }) 
          data1.map(item=>{
            dataArry.push(item) 
          })
          data2.map(item=>{
            dataArry.push(item) 
          })
          this.dataTable = dataArry
          
          console.log()
          // console.log(data,data1,data2)
          // console.log(res)
        })
      },
      headerStyle ({ row, column, rowIndex, columnIndex }) {
        if(rowIndex === 0){
           if(columnIndex === 0){ 
             return column
           }
        }
        if(rowIndex === 1){
          if(columnIndex === 0 || (columnIndex === 1)){
            return {display:"none"}
          }
        }
      }, 
      getSpanArr(data) { 
        for (var i = 0; i < data.length; i++) { 
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0;
          } else { 
            if (data[i].feetype === data[i - 1].feetype) { 
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
          console.log(_row)
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