<template>
  <div>
    <bread :nowLocation="nowLocation"></bread>
    <!-- 表头操作栏 -->
    <div class="operate">
      <div class="btn">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-form :inline="true" class="search">
        <el-form-item>
          <el-input v-model="content" placeholder="请输入搜索内容" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" circle @click="onSubmit"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格主体 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleLook(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    bread: () => import("./bread.vue")
  },
  data() {
    return {
      nowLocation: ["表格"],
      content: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄2143"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: [],
      currentPage: 1
    };
  },

  methods: {
    /**
     *  @method handleSelectionChange
     *  @method handleLook
     *  @method handleEdit
     *  @method handleDelete
     *  @method handleSizeChange
     *
     *  */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleLook(index, row) {},
    handleEdit(index, row) {},
    handleDelete(index, row) {},
    handleSizeChange(val) {},
    handleCurrentChange(val) {},
    onSubmit() {}
  }
};
</script>

<style lang="less" scoped>
.operate {
  margin: 10px 0;
  height: 40px;
  // background: #c0c0c0;
  display: flex;
  justify-content: space-between;
}
.page {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  // background: #c0c0c0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
