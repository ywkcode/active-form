<script setup>
import { ref, reactive, watch } from "vue";

const configKonva = reactive({
  width: 1000,
  height: 1000,
});

const message = ref("");
const state = reactive({
  title: "hello",
  id: 1,
  items: [
    { name: "标题1", value: 1 },
    { name: "标题2", value: 2 },
    { name: "标题3", value: 3 },
  ],
}); //参数是一个普通对象
const configCircle = reactive({
  id: uuid(32, ""),
  type: "圆圈",
  x: 100,
  y: 100,
  radius: 10,
  fill: "red",
  stroke: "black",
  draggable: true,
  strokeWidth: 3,
});
const textConfig = reactive({
  x: 100,
  y: 150,
  text: "文本",
  fontSize: 20,
  fill: "red",
  draggable: true,
});
const handledragend = (event) => {};

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
const handledragstart = (event) => {
  configCircle.id = uuid(32, "");
  console.log(configCircle.id);
  configCircles.push(configCircle);
};
let configCircles = reactive([]);
configCircles.push(configCircle);

function handleClick(item) {
  selectItem.value = item.currentTarget.attrs;
}

let selectItem = ref({
  id: "",
  type: "",
  x: 0,
});

watch(
  selectItem,
  (newvalue, oldvalue) => {
    debugger;
  },
  { deep: true }
);
watch(
  message,
  (newvalue, oldvalue) => {
    debugger;
  },
  { deep: true }
);
</script>

<template>
  <v-stage :config="configKonva">
    <v-layer>
      <v-circle
        :config="item"
        v-for="item in configCircles"
        @dragend="handledragend"
        @dragstart="handledragstart"
        @click="handleClick"
      >
      </v-circle>
      <v-text :config="textConfig"></v-text>
    </v-layer>
  </v-stage>
  <div
    style="
      position: absolute;
      right: 100px;
      top: 10px;
      border: 1px solid red;
      width: 200px;
      height: 400px;
      text-align: left;
      padding: 5px;
    "
  >
    <p>选中元素Id:{{ selectItem.id }}</p>
    <p>元素类型:{{ selectItem.type }}</p>
    <p>影响元素</p>
    <!-- {{ message }}
    <Input v-model="message" placeholder="edit me"></Input> -->
    <p>Message is: {{ message }}</p>
	<input v-model="message" placeholder="edit me" />
  </div>
</template>

<style scoped></style>
