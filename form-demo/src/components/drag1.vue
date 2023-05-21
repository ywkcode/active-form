<template>
    <div>
      <draggable v-model="list">
        <div v-for="item in list" :key="item.id">
          {{ item.text }}
        </div>
      </draggable>
11111111
      <draggable v-model="list2">
        <div v-for="item in list2" :key="item.id">
          {{ item.text }}
        </div>
      </draggable>
    </div>
  </template>
  
  <script >
  import { VueDraggableNext } from 'vue-draggable-next'
  
  export default {
    components: {
        draggable: VueDraggableNext
    },
    data() {
      return {
        list: [
          { id: 1, text: 'Item 1' },
          { id: 2, text: 'Item 2' },
          { id: 3, text: 'Item 3' }
        ],
        list2: [
          { id: 4, text: 'Item 4' },
          { id: 5, text: 'Item 5' },
          { id: 6, text: 'Item 6' }
        ]
      }
    }
  }
  </script>