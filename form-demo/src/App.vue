<script setup>
import { ref, reactive, watch, toRefs } from "vue";
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
    fontSize: 15,
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

//看板中的元素拖动
const handlecomponentdragstart = (event,id) => {
    var result = componnetslist.find((item) => item.id == id);
   result.x=event.evt.clientX;
     result.y=event.evt.clientY;
  selectedComponent.value = { ...result }; 
   console.log(JSON.stringify(selectedComponent.value));
};

const handlecomponentdragend = () => {};


const dragover = () => {
  // console.log("dragover");
};
const dragleave = () => {
  // console.log("dragleave");
};
function handleClick(event, id) {
  var result = componnetslist.find((item) => item.id == id);
  selectedComponent.value = { ...result };

  console.log(selectedComponent.value);
  // selectedComponent.node = reactive();
}
watch(
  selectedComponent,
  (newvalue, oldvalue) => {
     var result=componnetslist.find((item)=>item.id===newvalue.id); 
     result.x=newvalue.x;
       result.text=newvalue.text;
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
    <el-divider content-position="center">看板</el-divider>

    <div
      @drop="drop"
      @dragover="dragover"
      @dragleave="dragleave"
      @dragover.prevent
      style="border: 1px solid gray; min-height: 750px; margin: 5px"
    >
      <v-stage :config="configKonva">
        <v-layer>
          <v-text
            v-for="item in componnetslist"
            :config="item"
            draggable="true"
            @dragstart="handlecomponentdragstart($event, item.id)"
            @dragend="handlecomponentdragend"
            @click="handleClick($event, item.id)"
          />
        </v-layer>
      </v-stage>
      <!-- {{ JSON.stringify(componnetslist) }} -->
    </div>
  </div>
  <div
    style="width: 20%; display: inline-block; float: left; text-align: center"
    class="wf_setting"
  >
    <el-divider content-position="center">元素属性</el-divider>

    <el-form :model="form" label-width="120px">
      <el-form-item label="组件Id"> {{ selectedComponent.id }} </el-form-item>
      <el-form-item label="背景色">
        <el-select v-model="form.region" placeholder="请选择颜色">
          <el-option label="红色" value="红色" />
          <el-option label="蓝色" value="蓝色" />
        </el-select>
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
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
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
</style>
