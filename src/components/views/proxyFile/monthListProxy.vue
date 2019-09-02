<template>
  <div>
    <!-- 面包屑 -->
    <breadNav :nowLocation="nowLocation"></breadNav>
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
          <el-option label="root" value="1"></el-option>
          <el-option label="非root" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查看</el-button>
        <el-button type="primary" @click="exportExcel">导出</el-button>
        <el-button type="primary" @click="createCode">生成月卡</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :highlight-current-row="true"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="deviceNo" label="激活码" min-width="100" width="150"></el-table-column>
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

    <!-- 弹出层 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="40%" @close="handelClose">
      <el-form :model="monthForm">
        <el-form-item label="root状态" label-width="200">
          <el-select v-model="monthForm.rootType" placeholder="非ROOT /ROOT">
            <el-option label="root" value="1"></el-option>
            <el-option label="非root" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能开关">
          <el-checkbox-group v-model="monthForm.gnkg" size="middle">
            <el-checkbox-button v-for="item in gnOptions" :label="item" :key="item">{{item}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="生成数量" label-width="200">
          <el-input-number v-model="monthForm.size" :min="1" :max="500"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createMonth">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import proxy from "../../../util/proxy";
import globalFunction from "../../../util/globalFunction";
import { http } from "../../../api/http";
export default {
  mixins: [proxy],
  components: {
    breadNav: () => import("../../../components/common/bread.vue")
  },
  data() {
    return {
      nowLocation: ["代理月卡列表"],
      state: "",
      rootState: "",
      tableData: [],
      //dialog
      dialogTitle: "",
      dialogVisible: false,
      gnOptions: [1, 2, 3, 4, 5, 6, 7, 8],
      monthForm: {
        rootType: "",
        gnkg: [],
        size: ""
      }
    };
  },
  created() {
    this.getProxyMonthList();
  },
  methods: {
    getProxyMonthList() {
      http("/manager/deviceList", "post", {
        comId: sessionStorage.getItem("id")
      }).then(res => {
        this.tableData = res;
      });
    },
    search() {
      http().then(res => {});
    },
    exportExcel() {
      http().then(res => {});
    },
    createCode() {
      this.dialogTitle = "生成月卡";
      this.dialogVisible = !this.dialogVisible;
    },
    createMonth() {
      if (this.dialogTitle == "生成月卡") {
        let monthForm = JSON.parse(JSON.stringify(this.monthForm));
        monthForm.gnkg = globalFunction.binary(monthForm.gnkg);
        this.validate(monthForm);
      } else {
      }
    },
    handelClose() {
      for (let index in this.monthForm) {
        if (index == "gnkg") {
          this.monthForm[index] = [];
        } else {
          this.monthForm[index] == "";
        }
      }
    },
    validate(data) {
      let errInfo = "";
      let passValidate = false;
      if (data.rootType == "1") {
        if (this.globalRoot.length == 0) {
          this.$message.warning("你已使用完此类功能码或者你未购买此类码");
          return;
        }
        //valid gn & num
        this.globalRoot.forEach(ele => {
          if (ele.codeData.gnkg == data.gnkg) {
            //pass gn then valid num
            if (ele.codeData.remain >= data.size) {
              //pass num
              data.settingId = ele.settingId;
              this.passValidate(data);
              passValidate = true;
            } else {
              errInfo = "你输入的数量大于剩余数";
              this.errInfo(errInfo);
            }
          } else {
            errInfo = "你未购买此类码";
          }
        });
      } else if (data.rootType == "2") {
        if (this.globalFroot.length == 0) {
          this.$message.warning("你已使用完此类功能码或者你未购买此类码");
          return;
        }
        this.globalFroot.forEach(ele => {
          if (ele.codeData.gnkg == data.gnkg) {
            //pass gn then valid num
            if (ele.codeData.remain >= data.size) {
              //pass num
              data.settingId = ele.settingId;
              this.passValidate(data);
              passValidate = true;
            } else {
              errInfo = "你输入的数量大于剩余数";
              this.errInfo(errInfo);
            }
          } else {
            errInfo = "你未购买此类码";
          }
        });
      }

      //遍历完没找到此类码 未通过验证
      if (!passValidate && errInfo) {
        this.errInfo(errInfo);
      }
    },
    passValidate(data) {
      let obj = this.createJson(data, [data]);
      delete obj.gnkg;
      delete obj.rootType;
      delete obj.settingId;
      delete obj.size;
      http("/manager/createDeviceMonth", "post", obj).then(res => {
        this.dialogVisible = !this.dialogVisible;
        this.$message.success("操作成功");
        this.getProxyMonthList();
        //重新获取剩余码 很关键
        this.getRemain();
      });
    },
    errInfo(err) {
      this.$message.warning(err);
    },
    createJson(json, arr) {
      //代理必要的参数settingId
      for (let index in arr) {
        json["root[" + index + "].size"] = arr[index].size;
        json["root[" + index + "].type"] = arr[index].rootType;
        json["root[" + index + "].gnkg"] = arr[index].gnkg;
        json["root[" + index + "].settingId"] = arr[index].settingId;
      }
      return json;
    }
  }
};
</script>

<style lang="less" scoped>
.operate {
  margin-top: 10px;
}
</style>