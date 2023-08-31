import { Graph, Model } from '@antv/x6'
import { Transform } from '@antv/x6-plugin-transform'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { History } from '@antv/x6-plugin-history'
import { Selection } from '@antv/x6-plugin-selection'
import { Scroller } from '@antv/x6-plugin-scroller'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Stencil } from '@antv/x6-plugin-stencil'





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

    graph.use(
      new Transform({
        resizing: {
          enabled: true,
          minWidth: 1,
          maxWidth: 200,
          minHeight: 1,
          maxHeight: 150,
          orthogonal: false,
          restrict: false,
          preserveAspectRatio: false
        },
        rotating: {
          enabled: true,
          grid: 90
        }
      })
    )
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


  const showGraph = (data: Model.FromJSONData, options?: Model.FromJSONOptions | undefined) => {
    graph.fromJSON(data, options)
    // graph.centerContent()
  }

  const toggleHandTool = (isHandTool: boolean = true) => {
    if (isHandTool) {
      // graph.panning.enablePanning()
      graph.disableMultipleSelection()
      graph.disableRubberband()
    } else {
      // graph.panning.disablePanning()
      graph.disablePanning()
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

  const useDnd = (dndContainer: HTMLElement) => {
    return new Dnd({
      target: graph,
      scaled: false,
      dndContainer: dndContainer,
    })
  }

  const useStencil = (stencilContainer: HTMLElement) => {
    const stencil = new Stencil({
      title: 'Stencil',
      target: graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1
      },
      placeholder: 'Search by shape name',
      notFoundText: 'Not Found',
      collapsable: true,
      stencilGraphHeight: 0,
      groups: [
        {
          name: 'group1',
          title: 'Group(Collapsable)',
        },
        {
          name: 'group2',
          title: 'Group',
          collapsable: false,
        },
      ],
    })
    stencilContainer.appendChild(stencil.container)


    const commonAttrs = {
      body: {
        fill: '#fff',
        stroke: '#8f8f8f',
        strokeWidth: 1,
      },
    }

    const n1 = graph.createNode({
      shape: 'rect',
      x: 40,
      y: 40,
      width: 80,
      height: 40,
      label: 'rect',
      attrs: commonAttrs,
    })

    const n2 = graph.createNode({
      shape: 'circle',
      x: 180,
      y: 40,
      width: 40,
      height: 40,
      label: 'circle',
      attrs: commonAttrs,
    })

    const n3 = graph.createNode({
      shape: 'ellipse',
      x: 280,
      y: 40,
      width: 80,
      height: 40,
      label: 'ellipse',
      attrs: commonAttrs,
    })

    const n4 = graph.createNode({
      shape: 'path',
      x: 420,
      y: 40,
      width: 40,
      height: 40,
      // https://www.svgrepo.com/svg/13653/like
      path: 'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
      attrs: commonAttrs,
      label: 'path',
    })

    stencil.load([n1, n2], 'group1')
    stencil.load([n3, n4], 'group2')

    return stencil
  }

  return {
    useGraph,
    showGraph,
    toggleHandTool,
    useMiniMap,
    useDnd,
    useStencil,
  }
}




export default useX6Graph