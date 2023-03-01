<template>
  <div class="app-container">

    <el-card>
      <div>医院设置列表</div>

      <div slot="header">
        <!--搜索表单区域-->
        <el-form ref="form" :model="hospForm" :inline="true" size="mini">
          <el-form-item label="医院名称">
            <el-input v-model="hospForm.hosname" placeholder="请输入医院名称" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="医院编号">
            <el-input v-model="hospForm.hoscode" placeholder="请输入医院编号" size="mini"></el-input>
          </el-form-item>

<!--          <el-button type="primary" @click="addPage()" size="mini">新增</el-button>-->
            <el-button type="danger" @click="removeHospiters" size="mini">批量删除</el-button>
<!--          <el-button type="primary" @click="editInfo" size="mini">修改</el-button>-->
          <el-button type="primary" @click="getList" size="mini">查询</el-button>
        </el-form>
      </div>


      <el-table :data="hospTable" style="width: 100%;margin-top: 10px" @selection-change="selectionClick">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="hosname" label="医院名称"></el-table-column>
        <el-table-column prop="hoscode" label="医院编号"></el-table-column>
        <el-table-column prop="apiUrl" label="api基础路径" width="200"></el-table-column>
        <el-table-column prop="contactsName" label="联系人"></el-table-column>
        <el-table-column prop="contactsPhone" label="联系人手机"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="success" size="mini">正常</el-tag>
            <el-tag v-if="scope.row.status === 1" type="danger" size="mini">锁定</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="removeHospterById(scope.row.id)">删除</el-button>
            <el-button v-if="scope.row.status === 1" size="mini" type="success" @click="updateHospiter(scope.row.id,0)">取消锁定</el-button>
            <el-button v-else size="mini" type="info" @click="updateHospiter(scope.row.id,1)">锁定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;text-align: right;">
        <el-pagination
          @size-change="pageClick"
          @current-change="pageJump"
          :total="total"
          :current-page="hospForm.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="hospForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import hospset from '@/api/hospset'

export default {
  data() {
    return {
      hospForm: {
        ids:[],
        page: 1,
        pageSize: 10,
        hosname:'',
        hoscode:'',
      },
      hospTable: [],      // 用于接收后端请求返回的table数据
      total: 0,   // 分页条数
    }
  }, created() {
    this.getList()
  }, methods: {
    getList() {
      hospset.getHospsetList(this.hospForm).then(result => {
        this.total = result.total
        this.hospTable = result.objects
      }).catch(error => {
        this.$message({
          type: 'error',
          message: '查询失败!' + '{' + reason.message + '}'
        });
      })
    },
    /**
     * 页数点击事件
     * @param pageSize
     */
    pageClick(pageSize) {
      console.log(pageSize)
      this.hospForm.pageSize = pageSize;
      this.getList();
    },
    /**
     * 页数跳转事件
     * @param page
     */
    pageJump(page) {
      console.log(page)
      this.hospForm.page = page;
      this.getList();
    },
    /**
     * 表单选择事件,通过 <el-table-column type="selection" width="55"></el-table-column> 在表单前生成一个选择框
     * 并通过 @selection-change="selectionClick" 在表单头绑定
     * @param val 选中的值为 array【】
     */
    selectionClick(val){
      this.ids = [];
      for (let i = 0; i < val.length; i++) {
        this.ids.push(val[i].id);
      }
    },
    /**
     * 根据id删除事件
     * @param val id
     */
    removeHospterById:function(val){
      this.$confirm('此操作将删除选中的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospset.removeHospsetById(val).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        })
      }).catch(() => {

      });
    },
    /**
     * 更新 Hospiter
     * @param val
     */
    updateHospiter(val,status){
      let params = {
        id : val,
        status : status
      }
      hospset.updateHospset(params).then(result => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.getList();
      })
    },
    /**
     * 批量删除点击事件
     */
    removeHospiters(){
      this.$confirm('此操作将删除选中的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        hospset.removeHospsetByIds(this.ids).then(result => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        })
      }).catch(() => {

      });
    }
  }
}
</script>
