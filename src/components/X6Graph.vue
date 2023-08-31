<template>
  <div class="graph-comp" style="width: 100%; height: 100%; position: relative">
    <div id="stencil-container"></div>
    <div id="x6-container" style=""></div>
    <!-- <div id="dnd-container" class="dnd-wrap">
      <div data-type="rect" class="dnd-rect" @mousedown="startDrag">
        Rect
      </div>
      <div data-type="circle" class="dnd-circle" @mousedown="startDrag">
        Circle
      </div>
    </div>
    <div class="app-content" ref={this.refContainer} /> -->
  </div>
  <div id="minimap"></div>
  <button @click="e => btnOnClick('hand')">hand</button>
  <button @click="e => btnOnClick('select')">select</button>
</template>

<style scoped>
.graph-comp {
  display: flex;
  padding: 0;
  font-family: sans-serif;
}

#stencil-container {
  position: relative;
  width: 200px;
  border: 1px solid #f0f0f0;
}

#x6-container {
  width: 100%;
  height: 100%;
}

#minimap {
  position: absolute;
  bottom: 25px;
  right: 25px;
  border-radius: 10px;
  border: 2px rgb(197, 194, 194) solid;
  box-shadow: 5px 5px 20px rgb(199, 199, 199);
}

#dnd-container {
  height: 80vh;
  min-width: 200px;
  position: absolute;
  left: 10px;
  top: 20px;
  /* z-index: 100; */
  background-color: white;
  border-radius: 10px;
  border: 2px rgb(197, 194, 194) solid;
  box-shadow: 5px 5px 20px rgb(199, 199, 199);
}

.dnd-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 16px;
  border: 1px solid #f0f0f0;
  user-select: none;
}

.dnd-rect {
  width: 100px;
  height: 40px;
  margin: 16px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #8f8f8f;
  border-radius: 6px;
  cursor: move;
}

.dnd-circle {
  width: 60px;
  height: 60px;
  margin: 16px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #8f8f8f;
  border-radius: 100%;
  cursor: move;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import useX6Graph from '@/util/x6-graph'
import type { Graph, Model } from '@antv/x6'
import type { Dnd } from '@antv/x6-plugin-dnd';
import { Stencil } from '@antv/x6-plugin-stencil'

const { useGraph, showGraph, toggleHandTool, useMiniMap, useDnd, useStencil } = useX6Graph()

const graphRef = ref<Graph>()
const dndRef = ref<Dnd>()
const stencilRef = ref<Stencil>()

let isHand = true;

const data: Model.FromJSONData = {
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
      },
      tools: [{
        name: 'node-editor'
      }],
      ports: {
        groups: {
          in: {
            position: 'top',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#8f8f8f',
                r: 5,
              },
            },
          },
          out: {
            position: 'bottom',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#8f8f8f',
                r: 5,
              },
            },
          },
        },
        items: [
          {
            id: 'port1',
            group: 'in',
          },
          {
            id: 'port2',
            group: 'in',
          },
          {
            id: 'port3',
            group: 'out',
          },
          {
            id: 'port4',
            group: 'out',
          },
        ],
      },
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
      },
      ports: {
        groups: {
          in: {
            position: 'top',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#8f8f8f',
                r: 5,
              },
            },
          },
          out: {
            position: 'bottom',
            attrs: {
              circle: {
                magnet: true,
                stroke: '#8f8f8f',
                r: 5,
              },
            },
          },
        },
        items: [
          {
            id: 'port1',
            group: 'in',
          },
          {
            id: 'port2',
            group: 'in',
          },
          {
            id: 'port3',
            group: 'out',
          },
          {
            id: 'port4',
            group: 'out',
          },
        ],
      },
    }
  ],
  edges: [
    {
      shape: 'edge',
      source: 'node1',
      sourcePort: 'port4',
      target: 'node2',
      targetPort: 'port2',
      label: '×',
      // router: 'orth',
      // router: 'manhattan',
      attrs: {
        // line 是选择器名称，选中的边的 path 元素
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1
        }
      },
      tools: [
        {
          name: 'segments',
          args: {
            snapRadius: 20,
            attrs: {
              fill: '#444',
            },
          },
        },
        {
          name: 'button-remove',
          // args: { distance: -40 },
        },
      ],
      // {
      //   name: 'vertices',
      //   args: {
      //     attrs: { fill: '#666' },
      //   },

      // },


    }
  ]
}

const startDrag = (e: MouseEvent) => {
  const graph = graphRef.value
  if (graph == undefined) {
    throw new Error('graph is undefined')
  }
  const dnd = dndRef.value
  if (dnd == undefined) {
    throw new Error('dnd is undefined')
  }

  const target = e.currentTarget as HTMLElement
  if (target == null) return
  const type = target.getAttribute('data-type')
  const node =
    type === 'rect'
      ? graph.createNode({
        width: 100,
        height: 40,
        label: 'Rect',
        attrs: {
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
            rx: 6,
            ry: 6,
          },
        },
      })
      : graph.createNode({
        width: 60,
        height: 60,
        shape: 'circle',
        label: 'Circle',
        attrs: {
          body: {
            stroke: '#8f8f8f',
            strokeWidth: 1,
            fill: '#fff',
          },
        },
      })

  dnd.start(node, e)
}

const btnOnClick = (type: string) => {
  const graph = graphRef.value
  if (graph == undefined) {
    throw new Error('graph is undefined')
  }
  if (type == 'hand') {
    toggleHandTool(true)
  } else if (type == 'select') {
    toggleHandTool(false)
  } else {
    throw new Error('')
  }
}

onMounted(() => {
  const container = document.getElementById('x6-container') as HTMLDivElement
  const stencilContainer = document.getElementById("stencil-container") as HTMLElement
  const graph = useGraph(container)
  graphRef.value = graph
  useMiniMap(document.getElementById('minimap') as HTMLDivElement)
  dndRef.value = useDnd(document.getElementById('dnd-container') as HTMLDivElement)
  stencilRef.value = useStencil(stencilContainer)
  showGraph(data)
})
</script>
