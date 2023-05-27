<script setup>
import { ref, reactive, watch, toRefs } from "vue";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
  View,
} from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus'
function uuid(len, radix) {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}
let isshowreact = ref(false);
let reactConfig = reactive({});
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const settingform = reactive({
  width: 800,
  height: 800,
  backgroundColor: "#e2e1e1",
  margin: 5,
  padding: 5,
  fontfamily: "微软雅黑",
  fontSize: 20,
  color: "black",
});

const onSubmit = () => {
  console.log("submit!");
};
const lists = ref("A");
let selectedId = "111";
let selectedComponent = ref({
  id: "",
});
//看板接受到元素
const drop = (event) => {
  selectedComponent.value = {
    id: uuid(32, ""),
    x: event.offsetX,
    y: event.offsetY,
    text: "请输入内容",
    width: 100,
    height: 50,
    fontSize: settingform.fontSize,
    fill: "green",
    
  };
  
  componnetslist.push(selectedComponent.value);
};
//左侧元素 -拖动
const dragstart = (event, item) => {};
let componnetslist = reactive([]); //所有的元素

const configKonva = reactive({
  width: 1314,
  height: 750,
  fill: "red",
});
const activeName = ref("first");
const handleTabClick = (tab, event) => {
  console.log(tab, event);
};
//看板中的元素拖动
const handlecomponentdragstart = (event, id) => {
  var result = componnetslist.find((item) => item.id == id);
  result.x = event.evt.clientX;
  result.y = event.evt.clientY;
  selectedComponent.value = { ...result };
};

const handlecomponentdragend = () => {};

const dragover = () => {
  // console.log("dragover");
};
const dragleave = () => {
  // console.log("dragleave");
};
const handleClick = (event, id) => {
  var result = componnetslist.find((item) => item.id == id);
  selectedComponent.value = { ...result };
 
  // reactConfig.x = selectedComponent.value.x;
  // reactConfig.y = selectedComponent.value.y;
  // reactConfig.width = selectedComponent.value.width;
  // reactConfig.height = selectedComponent.value.height;
  reactConfig={...selectedComponent.value};
};

const handleSave = () => {
   let data={
      settingform:settingform,
      componentslist:componnetslist
   }
   ElMessage('保存成功!数据如下：'+JSON.stringify(data));
};

const handleFresh = () => {
   componnetslist.length =0;
   ElMessage('清空成功！')
};
const handleView = () => {
   ElMessage('开始预览！')
};
watch(
  selectedComponent,
  (newvalue, oldvalue) => {
    var result = componnetslist.find((item) => item.id === newvalue.id);
    result.x = newvalue.x;
    result.text = newvalue.text;
  },
  { deep: true }
);
</script>

<template>
  <div style="" class="wf_tools">
    <el-divider content-position="center">拖拽元素</el-divider>
    <div
      @dragstart="dragstart($event, '111')"
      @dragover.prevent
      class="tools_item"
    >
      <img src="./assets/txt_input.png" draggable="true" />
      <p>文本框</p>
    </div>
  </div>
  <div class="wf_drawer">
    <div style="padding: 10px 5px">
      <div style="text-align: left; width: 35%; display: inline-block">
        <el-tag :size="large">看板数据：</el-tag>
      </div>
      <div style="text-align: right; width: 64%; display: inline-block">
        <el-tooltip content="保存" placement="bottom" effect="light">
          <el-button type="success" :icon="Check" circle @click="handleSave" />
        </el-tooltip>
        <el-tooltip content="清空" placement="bottom" effect="light">
          <el-button type="danger" :icon="Delete" circle @click="handleFresh" />
        </el-tooltip>
        <el-tooltip content="预览" placement="bottom" effect="light" >
          <el-button type="primary" :icon="View" circle @click="handleView" />
        </el-tooltip>
      </div>
    </div>

    <div style="overflow: hidden; overflow-x: auto">
      <div
        @drop="drop"
        @dragover="dragover"
        @dragleave="dragleave"
        @dragover.prevent
        :style="{
          'background-color': settingform.backgroundColor,
          width: settingform.width + 'px',
          height: settingform.height + 'px',
          border: '1px solid black',
          padding: settingform.padding + 'px',
          overflow: 'hidden',
          margin: '0 auto',
          'font-family': settingform.fontfamily,
          'font-size': settingform.fontSize + 'px',
          color: settingform.color,
        }"
        id="container"
      >
        <v-stage :config="configKonva" ref="stage">
          <v-layer>
            <v-rect
              :config="{
                x: reactConfig.x,
                y: reactConfig.y,
                width: reactConfig.width,
                height: reactConfig.height,
                fill: 'red',
              }"
              v-if="isshowreact"
            />
            <v-text
              v-for="item in componnetslist"
              :config="item"
              draggable="true"
              @dragstart="handlecomponentdragstart($event, item.id)"
              @dragend="handlecomponentdragend"
              @click="handleClick($event, item.id)"
              style="cursor: pointer"
            />
          </v-layer>
        </v-stage>
        <!-- {{ JSON.stringify(componnetslist) }} -->
      </div>
    </div>
  </div>
  <div
    style="width: 20%; display: inline-block; float: left; text-align: center"
    class="wf_setting"
  >
    <el-divider content-position="center">配置</el-divider>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleTabClick">
      <el-tab-pane label="元素配置" name="first">
        <el-form :model="form" label-width="120px">
          <el-form-item label="组件Id">
            {{ selectedComponent.id }}
          </el-form-item>
          <el-form-item label="背景色">
            <el-select v-model="form.region" placeholder="请选择颜色">
              <el-option label="红色" value="红色" />
              <el-option label="蓝色" value="蓝色" />
            </el-select>
          </el-form-item>
               <el-form-item label="文字大小">
            <el-input v-model="selectedComponent.fontSize" type="number"/>
          </el-form-item>
          <el-form-item label="组件内容">
            <el-input v-model="selectedComponent.text" />
          </el-form-item>
          <el-form-item label="组件宽度">
            <el-input v-model="selectedComponent.width" />
          </el-form-item>
          <el-form-item label="组件高度">
            <el-input v-model="selectedComponent.height" />
          </el-form-item>
          <el-form-item label="组件位置：x轴">
            <el-input v-model="selectedComponent.x" />
          </el-form-item>
          <el-form-item label="组件位置：y轴">
            <el-input v-model="selectedComponent.y" />
          </el-form-item>
        
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="表单配置" name="second">
        <el-form :model="settingform" label-width="80px">
          <el-form-item label="表单宽度">
            <el-input v-model="settingform.width" />
          </el-form-item>
          <el-form-item label="表单高度">
            <el-input v-model="settingform.height" />
          </el-form-item>
          <el-form-item label="背景色">
            <el-input v-model="settingform.backgroundColor" />
          </el-form-item>
          <el-form-item label="边距">
            <el-input v-model="settingform.margin" />
          </el-form-item>
          <el-form-item label="字体">
            <el-input v-model="settingform.fontfamily" />
          </el-form-item>
          <el-form-item label="字体大小">
            <el-input v-model="settingform.fontSize" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.wf_tools {
  text-align: center;
  min-height: 800px;
  border-right: 1px solid gray !important;
  width: 10%;
  display: inline-block;
  border-right: 1px solid black;
  float: left;
  ul {
    list-style: none;
    padding: 0px;
  }
  .tools_item img {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .tools_item p {
    padding: 0px;
    margin: 0px;
    font-size: 12px;
  }
}
.wf_drawer {
  width: 69%;
  display: inline-block;
  border-right: 1px solid gray !important;
  min-height: 800px;
  float: left;
}
.wf_setting {
  width: 20%;
  display: inline-block;
  min-height: 800px;
  float: left;
}
.demo-tabs {
  padding: 0px 10px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
