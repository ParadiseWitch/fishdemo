import { Graph, Model, Shape } from '@antv/x6'
import { useGraphPlugin, useMiniMapPlunin, useDndPlugin, useStencilPlugin } from './useGraphPlugin'
import { useGraphEvent } from './useGraphEvent'





const useX6Graph = () => {
  let graph: Graph

  const useGraph = (container: HTMLElement) => {
    // @ts-ignore
    window.__x6_instances__ = []

    graph = new Graph({
      container: container,
      // width: 1200,
      // height: 800,
      background: {
        color: '#F2F7FA'
      },
      translating: {
        restrict: true,
      },
      connecting: {
        router: {
          name: 'manhattan',
          // name: 'orth',
          args: {
            padding: 10,
            // startDirections: ['top'],
            // endDirections: ['bottom'],
            // step: 20,
          },
        },
        // router: 'orth',
        connector: {
          name: 'rounded',
          args: {
            radius: 8,
          },
        },
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: false,
        snap: {
          radius: 20,
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#A2B1C3',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  width: 12,
                  height: 8,
                },
              },
            },
            tools: [
              { name: 'edge-editor' },
            ],
            zIndex: 0,
          })
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet
        },
      },
      grid: {
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#eee', // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: '#ddd', // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
      },
      panning: false,
      mousewheel: {
        enabled: true,
        maxScale: 4,
        minScale: 0.2,
      },
      // autoResize: true
    })


    useGraphPlugin(graph)
    useGraphEvent(graph)

    // @ts-ignore
    window.__x6_instances__.push(graph);

    const useMiniMap = (container: HTMLElement) => {
      useMiniMapPlunin(container, graph)
    }

    const useDnd = (container: HTMLElement) => {
      return useDndPlugin(container, graph)
    }

    const useStencil = (container: HTMLElement) => {
      return useStencilPlugin(container, graph)
    }

    return {
      graph,
      useMiniMap,
      useDnd,
      useStencil,
    }
  }

  const showGraph = (data: Model.FromJSONData, options?: Model.FromJSONOptions | undefined) => {
    graph.fromJSON(data, options)
    // graph.centerContent()
  }

  const toggleHandTool = (isHandTool: boolean = true) => {
    if (isHandTool) {
      // graph.panning.enablePanning()
      graph.enablePanning()
      graph.disableMultipleSelection()
      graph.disableRubberband()
    } else {
      // graph.panning.disablePanning()
      graph.disablePanning()
      graph.enableMultipleSelection()
      graph.enableRubberband()
    }
  }

  return {
    useGraph,
    showGraph,
    toggleHandTool,
  }
}

export default useX6Graph