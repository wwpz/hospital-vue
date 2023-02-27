<template>
  <div class="app-container">

    <el-card>
      <div>医院设置列表</div>
      <el-table
        :data="hospTable"
        style="width: 100%;margin-top: 10px">
        <el-table-column type="index" label="编号"></el-table-column>
        <el-table-column prop="hosname" label="医院名称"></el-table-column>
        <el-table-column prop="hoscode" label="医院编号"></el-table-column>
        <el-table-column prop="apiUrl" label="api基础路径" width="200"></el-table-column>
        <el-table-column prop="contactsName" label="联系人"></el-table-column>
        <el-table-column prop="contactsPhone" label="联系人手机"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="success" size="mini">正常</el-tag>
            <el-tag v-if="scope.row.status === 1" type="danger" size="mini">禁用</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px;text-align: right;">
        <el-pagination
          :current-page="hospForm.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="hospForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
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
        page: 1,
        pageSize: 10
      },
      total: 0,
      hospTable: []
    }
  }, created() {
    this.getList()
  }, methods: {
    getList() {
      hospset.getHospsetList(this.hospForm).then(result => {
        this.total = result.total
        this.hospTable = result.objects
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
