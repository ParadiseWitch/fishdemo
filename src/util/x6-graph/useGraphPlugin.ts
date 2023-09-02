import { Graph } from '@antv/x6'
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import { Selection } from '@antv/x6-plugin-selection'
import { Scroller } from '@antv/x6-plugin-scroller'
import { Snapline } from "@antv/x6-plugin-snapline";
import { Transform } from '@antv/x6-plugin-transform';
import { MiniMap } from '@antv/x6-plugin-minimap';
import { Stencil } from '@antv/x6-plugin-stencil';
import { Dnd } from '@antv/x6-plugin-dnd';

export const useGraphPlugin = (graph: Graph) => {
  graph.use(new Scroller({
    enabled: true,
    pageVisible: true,
    pageBreak: true,
    pannable: true,
  })).use(new Transform({
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
  })).use(new Snapline({ enabled: true }))
    .use(new Clipboard({ enabled: true }))
    .use(new Keyboard({ enabled: true }))
    .use(new History({ enabled: true }))
    .use(new Selection({
      enabled: true,
      multiple: false,
      rubberband: false,
      movable: true,
      showNodeSelectionBox: true,
    }))
}

export const useMiniMapPlunin = (container: HTMLElement, graph: Graph) => {
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

export const useDndPlugin = (dndContainer: HTMLElement, graph: Graph) => {
  return new Dnd({
    target: graph,
    scaled: false,
    dndContainer: dndContainer,
  })
}

export const useStencilPlugin = (stencilContainer: HTMLElement, graph: Graph) => {
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
