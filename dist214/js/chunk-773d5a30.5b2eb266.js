(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-773d5a30"],{"59f6":function(t,n,e){"use strict";var c=e("d027"),a=e.n(c);a.a},d027:function(t,n,e){},fc23:function(t,n,e){"use strict";e.r(n);var c=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("breadNav",{attrs:{nowLocation:t.nowLocation}}),e("el-form",{staticClass:"operate",attrs:{inline:!0}},[e("el-form-item",[e("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.backups}},[t._v("备份数据库")])],1)],1)],1)},a=[],o=e("c1fb"),s={components:{breadNav:function(){return e.e("chunk-6e760db3").then(e.bind(null,"76e3"))}},data:function(){return{nowLocation:["数据库管理"]}},methods:{backups:function(){var t=this;Object(o["a"])("/file/exportMySqlDB","get","","blob").then(function(n){t.$message.success("备份成功")})}}},i=s,r=(e("59f6"),e("2877")),u=Object(r["a"])(i,c,a,!1,null,"ecf86edc",null);n["default"]=u.exports}}]);
//# sourceMappingURL=chunk-773d5a30.5b2eb266.js.map