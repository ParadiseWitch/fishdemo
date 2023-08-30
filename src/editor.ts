import { NodeEditor, type GetSchemes, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import { VuePlugin, Presets, type VueArea2D } from "rete-vue-plugin";

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = VueArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
  const socket = new ClassicPreset.Socket("socket");

  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new VuePlugin<Schemes, AreaExtra>();

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl()
  });

  render.addPreset(Presets.classic.setup());

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  AreaExtensions.simpleNodesOrder(area);

  const a = new ClassicPreset.Node("A");
  a.addControl(
    "a",
    new ClassicPreset.InputControl("text", { initial: "hello" })
  );
  a.addInput('a1', new ClassicPreset.Input(socket))
  a.addOutput("a", new ClassicPreset.Output(socket));
  await editor.addNode(a);

  const b = new ClassicPreset.Node("B");
  b.addControl(
    "b",
    new ClassicPreset.InputControl("text", { initial: "hello" })
  );

  b.addInput("b", new ClassicPreset.Input(socket));
  // b.addOutput("b2", new ClassicPreset.Output(socket));
  await editor.addNode(b);

  await area.translate(b.id, { x: 320, y: -100 });

  await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "b"));

  
  const c = new ClassicPreset.Node("C");
  c.addControl(
    "c",
    new ClassicPreset.InputControl("text", { initial: "hello" })
  );
  c.addInput("c", new ClassicPreset.Input(socket));
  await editor.addNode(c);

  await area.translate(c.id, { x: 320, y: 100 });

  await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "b"));
  await editor.addConnection(new ClassicPreset.Connection(a, "a", c, "c"));

  

  AreaExtensions.zoomAt(area, editor.getNodes());

  return () => area.destroy();
}

