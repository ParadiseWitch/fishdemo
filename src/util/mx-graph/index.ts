import { Graph, InternalEvent, Client, utils, MaxWindow, error } from '@maxgraph/core'

const useMxGraph = (container: HTMLElement) => {
  Client.setImageBasePath('./src/assets/mx/images')
  Client.setBasePath('./src/assets/mx')
  
  
  if(!Client.isBrowserSupported()){
    // error('Browser is not supported!', 200, false)
  }
  

  const graph = new Graph(container as HTMLElement)
  InternalEvent.disableContextMenu(container)
  graph.setPanning(true) // Use mouse right button for panning


  return {
    graph
  }
}
  
export default useMxGraph