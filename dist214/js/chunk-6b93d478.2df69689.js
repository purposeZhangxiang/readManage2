(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b93d478"],{"02f4":function(t,e,o){var r=o("4588"),n=o("be13");t.exports=function(t){return function(e,o){var i,a,l=String(n(e)),s=r(o),c=l.length;return s<0||s>=c?t?"":void 0:(i=l.charCodeAt(s),i<55296||i>56319||s+1===c||(a=l.charCodeAt(s+1))<56320||a>57343?t?l.charAt(s):i:t?l.slice(s,s+2):a-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,o){"use strict";var r=o("02f4")(!0);t.exports=function(t,e,o){return e+(o?r(t,e).length:1)}},"0bfb":function(t,e,o){"use strict";var r=o("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"11e9":function(t,e,o){var r=o("52a7"),n=o("4630"),i=o("6821"),a=o("6a99"),l=o("69a8"),s=o("c69a"),c=Object.getOwnPropertyDescriptor;e.f=o("9e1e")?c:function(t,e){if(t=i(t),e=a(e,!0),s)try{return c(t,e)}catch(o){}if(l(t,e))return n(!r.f.call(t,e),t[e])}},"214f":function(t,e,o){"use strict";o("b0c5");var r=o("2aba"),n=o("32e9"),i=o("79e5"),a=o("be13"),l=o("2b4c"),s=o("520a"),c=l("species"),u=!i(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),p=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var o="ab".split(t);return 2===o.length&&"a"===o[0]&&"b"===o[1]}();t.exports=function(t,e,o){var f=l(t),d=!i(function(){var e={};return e[f]=function(){return 7},7!=""[t](e)}),h=d?!i(function(){var e=!1,o=/a/;return o.exec=function(){return e=!0,null},"split"===t&&(o.constructor={},o.constructor[c]=function(){return o}),o[f](""),!e}):void 0;if(!d||!h||"replace"===t&&!u||"split"===t&&!p){var b=/./[f],v=o(a,f,""[t],function(t,e,o,r,n){return e.exec===s?d&&!n?{done:!0,value:b.call(e,o,r)}:{done:!0,value:t.call(o,e,r)}:{done:!1}}),g=v[0],m=v[1];r(String.prototype,t,g),n(RegExp.prototype,f,2==e?function(t,e){return m.call(t,this,e)}:function(t){return m.call(t,this)})}}},"23a6":function(t,e,o){"use strict";o("c5f6"),o("28a5"),o("55dd");e["a"]={binary:function(t){t.sort(function(t,e){return t-e});for(var e=0;e<8;e++)t[e]!==e+1?t.splice(e,0,0):t.splice(e,1,1);return t.reverse().join("")},original:function(t){if(t){var e=t.split("").reverse(),o=[];for(var r in e)"0"!=e[r]&&o.push(Number(r)+1);return o}}}},"28a5":function(t,e,o){"use strict";var r=o("aae3"),n=o("cb7c"),i=o("ebd6"),a=o("0390"),l=o("9def"),s=o("5f1b"),c=o("520a"),u=o("79e5"),p=Math.min,f=[].push,d="split",h="length",b="lastIndex",v=4294967295,g=!u(function(){RegExp(v,"y")});o("214f")("split",2,function(t,e,o,u){var m;return m="c"=="abbc"[d](/(b)*/)[1]||4!="test"[d](/(?:)/,-1)[h]||2!="ab"[d](/(?:ab)*/)[h]||4!="."[d](/(.?)(.?)/)[h]||"."[d](/()()/)[h]>1||""[d](/.?/)[h]?function(t,e){var n=String(this);if(void 0===t&&0===e)return[];if(!r(t))return o.call(n,t,e);var i,a,l,s=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,d=void 0===e?v:e>>>0,g=new RegExp(t.source,u+"g");while(i=c.call(g,n)){if(a=g[b],a>p&&(s.push(n.slice(p,i.index)),i[h]>1&&i.index<n[h]&&f.apply(s,i.slice(1)),l=i[0][h],p=a,s[h]>=d))break;g[b]===i.index&&g[b]++}return p===n[h]?!l&&g.test("")||s.push(""):s.push(n.slice(p)),s[h]>d?s.slice(0,d):s}:"0"[d](void 0,0)[h]?function(t,e){return void 0===t&&0===e?[]:o.call(this,t,e)}:o,[function(o,r){var n=t(this),i=void 0==o?void 0:o[e];return void 0!==i?i.call(o,n,r):m.call(String(n),o,r)},function(t,e){var r=u(m,t,this,e,m!==o);if(r.done)return r.value;var c=n(t),f=String(this),d=i(c,RegExp),h=c.unicode,b=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(g?"y":"g"),x=new d(g?c:"^(?:"+c.source+")",b),y=void 0===e?v:e>>>0;if(0===y)return[];if(0===f.length)return null===s(x,f)?[f]:[];var T=0,w=0,S=[];while(w<f.length){x.lastIndex=g?w:0;var k,E=s(x,g?f:f.slice(w));if(null===E||(k=p(l(x.lastIndex+(g?0:w)),f.length))===T)w=a(f,w,h);else{if(S.push(f.slice(T,w)),S.length===y)return S;for(var _=1;_<=E.length-1;_++)if(S.push(E[_]),S.length===y)return S;w=T=k}}return S.push(f.slice(T)),S}]})},"2f21":function(t,e,o){"use strict";var r=o("79e5");t.exports=function(t,e){return!!t&&r(function(){e?t.call(null,function(){},1):t.call(null)})}},"469f":function(t,e,o){o("6c1c"),o("1654"),t.exports=o("7d7b")},"520a":function(t,e,o){"use strict";var r=o("0bfb"),n=RegExp.prototype.exec,i=String.prototype.replace,a=n,l="lastIndex",s=function(){var t=/a/,e=/b*/g;return n.call(t,"a"),n.call(e,"a"),0!==t[l]||0!==e[l]}(),c=void 0!==/()??/.exec("")[1],u=s||c;u&&(a=function(t){var e,o,a,u,p=this;return c&&(o=new RegExp("^"+p.source+"$(?!\\s)",r.call(p))),s&&(e=p[l]),a=n.call(p,t),s&&a&&(p[l]=p.global?a.index+a[0].length:e),c&&a&&a.length>1&&i.call(a[0],o,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(a[u]=void 0)}),a}),t.exports=a},"55dd":function(t,e,o){"use strict";var r=o("5ca1"),n=o("d8e8"),i=o("4bf8"),a=o("79e5"),l=[].sort,s=[1,2,3];r(r.P+r.F*(a(function(){s.sort(void 0)})||!a(function(){s.sort(null)})||!o("2f21")(l)),"Array",{sort:function(t){return void 0===t?l.call(i(this)):l.call(i(this),n(t))}})},"5d73":function(t,e,o){t.exports=o("469f")},"5dbc":function(t,e,o){var r=o("d3f4"),n=o("8b97").set;t.exports=function(t,e,o){var i,a=e.constructor;return a!==o&&"function"==typeof a&&(i=a.prototype)!==o.prototype&&r(i)&&n&&n(t,i),t}},"5f1b":function(t,e,o){"use strict";var r=o("23c6"),n=RegExp.prototype.exec;t.exports=function(t,e){var o=t.exec;if("function"===typeof o){var i=o.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return n.call(t,e)}},"7bef":function(t,e,o){},"7d7b":function(t,e,o){var r=o("e4ae"),n=o("7cd6");t.exports=o("584a").getIterator=function(t){var e=n(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},"8b97":function(t,e,o){var r=o("d3f4"),n=o("cb7c"),i=function(t,e){if(n(t),!r(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,r){try{r=o("9b43")(Function.call,o("11e9").f(Object.prototype,"__proto__").set,2),r(t,[]),e=!(t instanceof Array)}catch(n){e=!0}return function(t,o){return i(t,o),e?t.__proto__=o:r(t,o),t}}({},!1):void 0),check:i}},9093:function(t,e,o){var r=o("ce10"),n=o("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,n)}},9506:function(t,e,o){"use strict";var r=o("7bef"),n=o.n(r);n.a},a21f:function(t,e,o){var r=o("584a"),n=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return n.stringify.apply(n,arguments)}},aa77:function(t,e,o){var r=o("5ca1"),n=o("be13"),i=o("79e5"),a=o("fdef"),l="["+a+"]",s="​",c=RegExp("^"+l+l+"*"),u=RegExp(l+l+"*$"),p=function(t,e,o){var n={},l=i(function(){return!!a[t]()||s[t]()!=s}),c=n[t]=l?e(f):a[t];o&&(n[o]=c),r(r.P+r.F*l,"String",n)},f=p.trim=function(t,e){return t=String(n(t)),1&e&&(t=t.replace(c,"")),2&e&&(t=t.replace(u,"")),t};t.exports=p},aae3:function(t,e,o){var r=o("d3f4"),n=o("2d95"),i=o("2b4c")("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==n(t))}},b0c5:function(t,e,o){"use strict";var r=o("520a");o("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},c5f6:function(t,e,o){"use strict";var r=o("7726"),n=o("69a8"),i=o("2d95"),a=o("5dbc"),l=o("6a99"),s=o("79e5"),c=o("9093").f,u=o("11e9").f,p=o("86cc").f,f=o("aa77").trim,d="Number",h=r[d],b=h,v=h.prototype,g=i(o("2aeb")(v))==d,m="trim"in String.prototype,x=function(t){var e=l(t,!1);if("string"==typeof e&&e.length>2){e=m?e.trim():f(e,3);var o,r,n,i=e.charCodeAt(0);if(43===i||45===i){if(o=e.charCodeAt(2),88===o||120===o)return NaN}else if(48===i){switch(e.charCodeAt(1)){case 66:case 98:r=2,n=49;break;case 79:case 111:r=8,n=55;break;default:return+e}for(var a,s=e.slice(2),c=0,u=s.length;c<u;c++)if(a=s.charCodeAt(c),a<48||a>n)return NaN;return parseInt(s,r)}}return+e};if(!h(" 0o1")||!h("0b1")||h("+0x1")){h=function(t){var e=arguments.length<1?0:t,o=this;return o instanceof h&&(g?s(function(){v.valueOf.call(o)}):i(o)!=d)?a(new b(x(e)),o,h):x(e)};for(var y,T=o("9e1e")?c(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;T.length>w;w++)n(b,y=T[w])&&!n(h,y)&&p(h,y,u(b,y));h.prototype=v,v.constructor=h,o("2aba")(r,d,h)}},e5b7:function(t,e,o){"use strict";o.r(e);var r=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("breadNav",{attrs:{nowLocation:t.nowLocation}}),o("el-form",{staticClass:"operate",attrs:{inline:!0,size:"small"}},[o("el-form-item",[o("el-select",{attrs:{placeholder:"激活码状态"},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}},[o("el-option",{attrs:{label:"全部",value:"0"}}),o("el-option",{attrs:{label:"未激活",value:"1"}}),o("el-option",{attrs:{label:"已激活",value:"2"}})],1)],1),o("el-form-item",[o("el-select",{attrs:{placeholder:"root状态"},model:{value:t.rootState,callback:function(e){t.rootState=e},expression:"rootState"}},[o("el-option",{attrs:{label:"root",value:"1"}}),o("el-option",{attrs:{label:"非root",value:"2"}})],1)],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:t.search}},[t._v("查看")]),o("el-button",{attrs:{type:"primary"},on:{click:t.exportExcel}},[t._v("导出")]),o("el-button",{attrs:{type:"primary"},on:{click:t.createCode}},[t._v("生成测试码")]),o("el-button",{attrs:{type:"danger"},on:{click:t.deleteSome}},[t._v("批量删除")])],1)],1),o("el-table",{ref:"multipleTable",attrs:{data:t.tableData,"tooltip-effect":"dark","highlight-current-row":!0,stripe:""},on:{"selection-change":t.handleSelectionChange}},[o("el-table-column",{attrs:{type:"selection",width:"55"}}),o("el-table-column",{attrs:{prop:"code",label:"激活码","min-width":"100",width:"150"}}),o("el-table-column",{attrs:{prop:"rootType",label:"root状态","min-width":"100",width:"150"}}),o("el-table-column",{attrs:{prop:"gnkg",label:"功能开关","min-width":"100",width:"150"}}),o("el-table-column",{attrs:{prop:"activeTime",label:"激活时间","min-width":"100",width:"180"}}),o("el-table-column",{attrs:{prop:"expireTime",label:"到期时间","min-width":"100",width:"180","show-overflow-tooltip":""}})],1),o("div",{staticClass:"page"},[o("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),o("el-dialog",{attrs:{title:"导出",visible:t.exportdiaVisible,width:"20%"},on:{"update:visible":function(e){t.exportdiaVisible=e}}},[o("el-form",{attrs:{model:t.exportform}},[o("el-form-item",{attrs:{label:"导出状态","label-width":"200"}},[o("el-select",{model:{value:t.exportform.exportType,callback:function(e){t.$set(t.exportform,"exportType",e)},expression:"exportform.exportType"}},[o("el-option",{attrs:{label:"导出全部",value:"0"}}),o("el-option",{attrs:{label:"导出全部已激活",value:"1"}}),o("el-option",{attrs:{label:"导出全部未激活",value:"2"}}),o("el-option",{attrs:{label:"导出当前页",value:"3"}})],1)],1),o("el-form-item",{attrs:{label:"root状态","label-width":"200"}},[o("el-select",{model:{value:t.exportform.rootType,callback:function(e){t.$set(t.exportform,"rootType",e)},expression:"exportform.rootType"}},[o("el-option",{attrs:{label:"root",value:"1"}}),o("el-option",{attrs:{label:"非root",value:"2"}})],1)],1),3==t.exportform.exportType?o("el-form-item",{attrs:{label:"激活状态","label-width":"200"}},[o("el-select",{model:{value:t.exportform.state,callback:function(e){t.$set(t.exportform,"state",e)},expression:"exportform.state"}},[o("el-option",{attrs:{label:"全部",value:"0"}}),o("el-option",{attrs:{label:"未激活",value:"1"}}),o("el-option",{attrs:{label:"已激活",value:"2"}})],1)],1):t._e()],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.exportdiaVisible=!1}}},[t._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:t.exportSuc}},[t._v("确 定")])],1)],1),o("el-dialog",{attrs:{title:"生成测试码",visible:t.testVisible,width:"40%"},on:{"update:visible":function(e){t.testVisible=e}}},[o("el-form",{attrs:{model:t.seasonform}},[o("el-form-item",{attrs:{label:"root状态","label-width":"200"}},[o("el-select",{attrs:{placeholder:"非ROOT /ROOT"},model:{value:t.seasonform.rootType,callback:function(e){t.$set(t.seasonform,"rootType",e)},expression:"seasonform.rootType"}},[o("el-option",{attrs:{label:"root",value:"1"}}),o("el-option",{attrs:{label:"非root",value:"2"}})],1)],1),o("el-form-item",{attrs:{label:"功能开关"}},[o("el-checkbox-group",{attrs:{size:"middle"},model:{value:t.seasonform.gnkg,callback:function(e){t.$set(t.seasonform,"gnkg",e)},expression:"seasonform.gnkg"}},t._l(t.gnOptions,function(e){return o("el-checkbox-button",{key:e,attrs:{label:e}},[t._v(t._s(e))])}),1)],1),o("el-form-item",{attrs:{label:"生成数量","label-width":"200"}},[o("el-input-number",{attrs:{min:1,max:500},model:{value:t.seasonform.size,callback:function(e){t.$set(t.seasonform,"size",e)},expression:"seasonform.size"}})],1)],1),o("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(e){t.testVisible=!1}}},[t._v("取 消")]),o("el-button",{attrs:{type:"primary"},on:{click:t.testSuc}},[t._v("确 定")])],1)],1)],1)},n=[],i=o("f499"),a=o.n(i),l=o("5d73"),s=o.n(l),c=o("c1fb"),u=o("23a6"),p={components:{breadNav:function(){return o.e("chunk-6e760db3").then(o.bind(null,"76e3"))}},data:function(){return{nowLocation:["测试码列表"],type:"2",state:"0",rootState:"1",multipleSelection:[],tableData:[],currentPage:1,pageSize:10,total:10,exportdiaVisible:!1,exportform:{exportType:"0",rootType:"1",state:"0"},testVisible:!1,seasonform:{rootType:"1",gnkg:[],size:0},checkList:{},gnOptions:[1,2,3,4,5,6,7,8]}},created:function(){this.getTestCodeList()},methods:{handleSelectionChange:function(t){this.multipleSelection=t},handleEdit:function(){},handleDelete:function(){},handleSizeChange:function(t){this.pageSize=t,this.getTestCodeList(1,t)},handleCurrentChange:function(t){this.currentPage=t,this.getTestCodeList(t,this.pageSize)},getTestCodeList:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;Object(c["a"])("/manager/codeList","post",{page:e,pageSize:o,type:this.type,state:this.state,rootType:this.rootState}).then(function(e){var o=!0,r=!1,n=void 0;try{for(var i,a=s()(e.list);!(o=(i=a.next()).done);o=!0){var l=i.value;null===l.activeTime?l.activeTime="未激活":l.activeTime,1==l.rootType?l.rootType="root":l.rootType="非root"}}catch(c){r=!0,n=c}finally{try{o||null==a.return||a.return()}finally{if(r)throw n}}t.tableData=e.list,t.total=e.total})},search:function(){this.getTestCodeList()},createCode:function(){this.testVisible=!this.testVisible},exportExcel:function(){this.exportdiaVisible=!this.exportdiaVisible},deleteSome:function(){var t=this;0==this.multipleSelection.length?this.$message.warning("请勾选要删除的设备"):this.$confirm("确认删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var e=[],o=!0,r=!1,n=void 0;try{for(var i,a=s()(t.multipleSelection);!(o=(i=a.next()).done);o=!0){var l=i.value;e.push(l.code)}}catch(p){r=!0,n=p}finally{try{o||null==a.return||a.return()}finally{if(r)throw n}}var u={codes:e.join(",")};Object(c["a"])("/manager/delCodes","get",u).then(function(e){t.$message.success("删除成功"),t.getTestCodeList()})})},exportSuc:function(){var t={};t=3==this.exportform.exportType?{page:this.currentPage,pageSize:this.pageSize,type:this.type,rootType:this.exportform.rootType,state:this.exportform.state,exportType:3}:{type:this.type,rootType:this.exportform.rootType,exportType:this.exportform.exportType},Object(c["a"])("/file/exportCode","get",t,"blob")},testSuc:function(){var t=this,e=JSON.parse(a()(this.seasonform));e.gnkg=u["a"].binary(e.gnkg),e["type"]=this.type,Object(c["a"])("/manager/createCode","post",e).then(function(e){t.$message.success("生成测试码成功"),t.testVisible=!t.testVisible,t.getTestCodeList()})}}},f=p,d=(o("9506"),o("2877")),h=Object(d["a"])(f,r,n,!1,null,null,null);e["default"]=h.exports},f499:function(t,e,o){t.exports=o("a21f")},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);
//# sourceMappingURL=chunk-6b93d478.2df69689.js.map