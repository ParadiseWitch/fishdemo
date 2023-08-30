import { Graph } from '@antv/x6'
import { Transform } from '@antv/x6-plugin-transform'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { History } from '@antv/x6-plugin-history'
import { Selection } from '@antv/x6-plugin-selection'
import { Scroller } from '@antv/x6-plugin-scroller'
import { MiniMap } from '@antv/x6-plugin-minimap'




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

    graph.use(
      new Scroller({
        enabled: true,
        pageVisible: true,
        pageBreak: true,
        pannable: true,
      })
    )


    // graph.use(
    //   new Transform({
    //     resizing: {
    //       enabled: true,
    //       minWidth: 1,
    //       maxWidth: 200,
    //       minHeight: 1,
    //       maxHeight: 150,
    //       orthogonal: false,
    //       restrict: false,
    //       preserveAspectRatio: false
    //     },
    //     rotating: {
    //       enabled: true,
    //       grid: 90
    //     }
    //   })
    // )
    graph.use(
      new Snapline({
        enabled: true
      })
    )
    graph.use(
      new Clipboard({
        enabled: true
      })
    )
    graph.use(
      new Keyboard({
        enabled: true
      })
    )
    graph.use(
      new History({
        enabled: true
      })
    )
    graph.use(
      new Selection({
        enabled: true,
        multiple: false,
        rubberband: false,
        movable: true,
        showNodeSelectionBox: true,
      })
    )

    graph.bindKey('ctrl+c', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    })

    graph.bindKey('ctrl+v', () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    })

    graph.bindKey('ctrl+z', () => {
      graph.undo()
    })

    graph.bindKey('ctrl+y', () => {
      graph.redo()
    })


    graph.bindKey('delete', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })

    graph.bindKey('ctrl+0', () => {
      // graph.zoomToRect()
      graph.zoomTo(1)
      // graph.translate(0, 0)
      graph.center()
    })

    graph.bindKey('=', () => {
      graph.zoom(0.1)
      graph.transform.centerContent()
    })

    graph.bindKey('-', () => {
      graph.resize(0, 0)
      graph.zoom(-0.1)
      graph.transform.centerContent()
    })

    // @ts-ignore
    window.__x6_instances__.push(graph);

    return graph
  }


  const showGraph = (data: any) => {
    graph.fromJSON(data)
    // graph.centerContent()
  }

  const toggleHandTool = (isHandTool: boolean = true) => {
    if (isHandTool) {
      // graph.panning.enablePanning()
      graph.disableMultipleSelection()
      graph.disableRubberband()
    } else {
      // graph.panning.disablePanning()
      graph.enableMultipleSelection()
      graph.enableRubberband()
    }
  }

  const useMiniMap = (container: HTMLElement) => {
    graph.use(
      new MiniMap({
        container: container,
        // width: 300,
        // height: 200,
        maxScale: 4,
        minScale: 0.2,
      })
    )
  }

  return {
    useGraph,
    showGraph,
    toggleHandTool,
    useMiniMap,
  }
}




export default useX6Graph