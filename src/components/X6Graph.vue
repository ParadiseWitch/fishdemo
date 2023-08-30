<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div id="x6-container" style="width: 100%; height: 100%"></div>
    <div
      id="minimap"
      style="
        position: absolute;
        bottom: 25px;
        right: 25px;
        border-radius: 10px;
        border: 2px rgb(197, 194, 194) solid;
        box-shadow: 5px 5px 20px rgb(199, 199, 199);
      "
    ></div>
    <!-- <button @click="btnOnClick">button</button> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useX6Graph from '@/util/x6-graph'
import type { Graph } from '@antv/x6'
const { useGraph, showGraph, toggleHandTool, useMiniMap } = useX6Graph()

const graphRef = ref<Graph>()

const data = {
  nodes: [
    {
      id: 'node1',
      shape: 'rect',
      x: 40,
      y: 40,
      width: 100,
      height: 40,
      label: 'hello',
      attrs: {
        // body 是选择器名称，选中的是 rect 元素
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6
        }
      }
    },
    {
      id: 'node2',
      shape: 'rect',
      x: 160,
      y: 180,
      width: 100,
      height: 40,
      label: 'world',
      attrs: {
        body: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          fill: '#fff',
          rx: 6,
          ry: 6
        }
      }
    }
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      target: 'node2',
      label: 'x6',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1
        }
      }
    }
  ]
}

const btnOnClick = () => {
  const graph = graphRef.value
  if (graph == undefined) {
    throw new Error('graph is undefined')
  }
  toggleHandTool(false)
}

onMounted(() => {
  const container = document.getElementById('x6-container') as HTMLDivElement
  const graph = useGraph(container)
  graphRef.value = graph
  useMiniMap(document.getElementById('minimap') as HTMLDivElement)
  showGraph(data)
})
</script>

<style>
.x6-widget-minimap {
  border-radius: 10px;
}
</style>
