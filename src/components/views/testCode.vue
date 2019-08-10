<template>
  <div>
    <breadNav :nowLocation="nowLocation" />
    <!-- 操作栏 -->
    <el-form :inline="true" class="operate">
      <el-form-item>
        <el-select v-model="state" placeholder="激活码状态">
          <el-option label="全部" value="0"></el-option>
          <el-option label="未激活" value="1"></el-option>
          <el-option label="已激活" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="rootState" placeholder="root状态">
          <!-- <el-option
            v-for="item in rootOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>-->
          <el-option label="root" value="1"></el-option>
          <el-option label="非root" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查看</el-button>
        <el-button type="primary" @click="exportExcel">导出</el-button>
        <el-button type="primary" @click="createCode">生成测试码</el-button>
        <el-button type="danger" @click="deleteSome">批量删除</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :highlight-current-row="true"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="code" label="激活码" min-width="100" width="150"></el-table-column>
      <el-table-column prop="rootType" label="root状态" min-width="100" width="150"></el-table-column>
      <el-table-column prop="gnkg" label="功能开关" min-width="100" width="150"></el-table-column>
      <el-table-column
        prop="expireTime"
        label="到期时间"
        min-width="100"
        width="150"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 导出功能弹出层 -->
    <el-dialog title="导出" :visible.sync="exportdiaVisible" width="20%">
      <el-form :model="exportform">
        <el-form-item label="导出状态" label-width="200">
          <el-select v-model="exportform.exportType">
            <el-option label="导出全部" value="0"></el-option>
            <el-option label="导出全部已激活" value="1"></el-option>
            <el-option label="导出全部未激活" value="2"></el-option>
            <el-option label="导出当前页" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="root状态" label-width="200">
          <el-select v-model="exportform.rootType">
            <el-option label="root" value="1"></el-option>
            <el-option label="非root" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="激活状态" label-width="200" v-if="exportform.exportType==3">
          <el-select v-model="exportform.state">
            <el-option label="全部" value="0"></el-option>
            <el-option label="未激活" value="1"></el-option>
            <el-option label="已激活" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportdiaVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportSuc">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生成季卡弹出层 -->
    <el-dialog title="生成测试码" :visible.sync="testVisible" width="40%">
      <el-form :model="seasonform">
        <el-form-item label="root状态" label-width="200">
          <el-select v-model="seasonform.rootType" placeholder="非ROOT /ROOT">
            <el-option label="root" value="1"></el-option>
            <el-option label="非root" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能开关">
          <el-checkbox-group v-model="seasonform.gnkg" size="middle">
            <el-checkbox-button v-for="item in gnOptions" :label="item" :key="item">{{item}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="生成数量" label-width="200">
          <el-input-number v-model="seasonform.size" :min="1" :max="500"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="testVisible = false">取 消</el-button>
        <el-button type="primary" @click="testSuc">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { http } from "../../api/http";
import globalFunc from "../../util/globalFunction";
export default {
  components: {
    breadNav: () => import("../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["测试码列表"],
      type: "2", //2 -测试码
      state: "0", //el-optinos
      rootState: "1", //el-optinos
      multipleSelection: [],
      tableData: [],
      currentPage: 1,
      pageSize: 10, //当前页展示条数
      total: 10,
      /**导出模态框数据 */
      exportdiaVisible: false,
      exportform: {
        exportType: "0",
        rootType: "1",
        state: "0"
      },
      /**生成测试码模态框数据 */
      testVisible: false,
      seasonform: {
        rootType: "1",
        gnkg: [],
        size: 0
      },
      checkList: {},
      gnOptions: [1, 2, 3, 4, 5, 6, 7, 8]
    };
  },
  created() {
    this.getTestCodeList();
  },
  methods: {
    /**
     * @method {handleSelectionChange} checkbox勾选回调
     * @method {handleEdit}
     * @method {handleSizeChange} 切换当前页展示最多条数
     * @method {handleCurrentChange} 切换页码
     * @method {getTestCodeList} 获取测试码列表
     * @method {search} 筛选查看测试码
     * @method {createCode} 生成测试码
     * @method {exportExcel} 导出
     * @method {deleteSome} 批量删除测试码
     * @method {exportSuc} 导出的模态框确认按钮
     * @method {testSuc} 生成测试码模态框确认按钮
     * @method
     * @method
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit() {},
    handleDelete() {},
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTestCodeList(1, val);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTestCodeList(val, this.pageSize);
    },
    getTestCodeList(currentPage = 1, pageSize = 10) {
      http("/manager/codeList", "post", {
        page: currentPage,
        pageSize: pageSize,
        type: this.type,
        state: this.state, //激活状态
        rootType: this.rootState
      }).then(res => {
        for (let item of res.list) {
          item.expireTime === null
            ? (item.expireTime = "未激活")
            : item.expireTime;
        }
        this.tableData = res.list;
        this.total = res.total;
      });
    },
    search() {
      this.getTestCodeList();
    },
    createCode() {
      this.testVisible = !this.testVisible;
    },
    exportExcel() {
      this.exportdiaVisible = !this.exportdiaVisible;
    },
    deleteSome() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning("请勾选要删除的设备");
      } else {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          //整理出 要删除的设备
          let delcodes = [];
          for (let val of this.multipleSelection) {
            delcodes.push(val.code);
          }
          let codes = { codes: delcodes.join(",") };
          http("/manager/delCodes", "get", codes).then(res => {
            this.$message.success("删除成功");
            this.getTestCodeList();
          });
        });
      }
    },
    exportSuc() {
      let obj = {};
      if (this.exportform.exportType == 3) {
        //当前页
        obj = {
          page: this.currentPage,
          pageSize: this.pageSize,
          type: this.type,
          rootType: this.exportform.rootType,
          state: this.state,
          exportType: 3
        };
      } else {
        //导出全部
        obj = {
          type: this.type,
          rootType: this.exportform.rootType,
          exportType: this.exportform.exportType
        };
      }
      http("/file/exportCode", "get", obj, "blob");
    },
    testSuc() {
      let cloneData = JSON.parse(JSON.stringify(this.seasonform));
      cloneData.gnkg = globalFunc.binary(cloneData.gnkg);
      cloneData["type"] = this.type;
      http("/manager/createCode", "post", cloneData).then(res => {
        this.$message.success("生成测试码成功");
        this.testVisible=!this.testVisible;
        this.getTestCodeList();
      });
    }
  }
};
</script>

<style lang="less">
.operate {
  margin-top: 10px;
}
.page {
  margin-top: 10px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
</style>

