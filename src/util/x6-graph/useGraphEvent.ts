import { EdgeView, Graph } from '@antv/x6'


export const useGraphEvent = (graph: Graph) => {

  graph.bindKey('ctrl+c', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  }).bindKey('ctrl+v', () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  }).bindKey('ctrl+z', () => {
    graph.undo()
  }).bindKey('ctrl+y', () => {
    graph.redo()
  }).bindKey(['delete', 'backspace'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  }).bindKey('ctrl+0', () => {
    // graph.zoomToRect()
    graph.zoomTo(1)
    // graph.translate(0, 0)
    graph.center()
  }).bindKey('=', () => {
    graph.zoom(0.1)
    graph.transform.centerContent()
  }).bindKey('-', () => {
    graph.resize(0, 0)
    graph.zoom(-0.1)
    graph.transform.centerContent()
  })


  graph.on('cell:selected', ({ cell }) => {
    if (cell.isNode()) {
      cell.setAttrs({ body: { stroke: '#65b6ff', } })
    } else if (cell.isEdge()) {
      cell.setAttrs({ line: { stroke: "#65b6ff", } })
      cell.addTools({
        name: 'segments',
        args: {
          snapRadius: 20,
          // threshold: 0,
          precision: 1,
          attrs: {
            fill: '#444',
          },
        },
      })
    }
  })

  graph.on('cell:unselected', ({ cell }) => {
    if (cell.isNode()) {
      cell.setAttrs({ body: { stroke: '#A2B1C3', } })
    } else if (cell.isEdge()) {
      cell.setAttrs({ line: { stroke: "#A2B1C3", } })
      cell.removeTool('segments')
    }
  })



  graph.on("node:mousedown", (e) => {
    const connectedEdges = graph.getConnectedEdges(e.cell)
    connectedEdges.forEach(edge => {
      edge.setVertices([])
    })
  })

  graph.on("node:mouseup", (e) => {
    const connectedEdges = graph.getConnectedEdges(e.cell)
    connectedEdges.forEach(edge => {
      edge.setVertices((graph.findViewByCell(edge) as EdgeView).routePoints)
    })
  })

}