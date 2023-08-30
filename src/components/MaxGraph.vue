<template>
  <div id="graph-container" ref="graphContainer"></div>
</template>

<script setup lang="ts">
import { Graph, InternalEvent } from '@maxgraph/core'
import { onMounted, ref } from 'vue'
import useMxGraph from '@/util/mx-graph'
const graphContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  if (graphContainer.value == null) {
    console.error('组件需要一个容器')
    return
  }

  const { graph } = useMxGraph(graphContainer.value)
  // Gets the default parent for inserting new cells. This
  // is normally the first child of the root (ie. layer 0).
  const parent = graph.getDefaultParent()
  // Adds cells to the model in a single step
  graph.batchUpdate(() => {
    const vertex01 = graph.insertVertex({
      parent,
      position: [10, 10],
      size: [100, 100],
      value: 'rectangle'
    })
    const vertex02 = graph.insertVertex({
      parent,
      position: [350, 90],
      size: [50, 50],
      style: {
        fillColor: 'orange',
        shape: 'ellipse',
        verticalAlign: 'top',
        verticalLabelPosition: 'bottom'
      },
      value: 'ellipse'
    })
    graph.insertEdge({
      parent,
      source: vertex01,
      target: vertex02,
      value: 'edge',
      style: {
        edgeStyle: 'orthogonalEdgeStyle',
        rounded: true
      }
    })
  })
})
</script>

<style scoped></style>
