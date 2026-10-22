import "./styles/base.css";
import "./styles/layout.css";
import "./styles/canvas.css";
import "./styles/responsive.css";
import { createStore } from "./core/store.js";
import { HistoryManager } from "./core/history.js";
import { bindUI } from "./ui/bindings.js";
import { BoardController } from "./board/board-controller.js";
import { GeometryController } from "./geometry/geometry-controller.js";
import { CoordinateController } from "./coordinates/coordinate-controller.js";
import { FunctionGraphController } from "./graph/function-controller.js";
import { SolidScene } from "./three/solid-scene.js";
import { ConstructionPlayer } from "./animation/construction-player.js";
import { CommandRouter } from "./commands/command-router.js";
import { renderInspector } from "./ui/inspector.js";
import { ProjectStore } from "./persistence/project-store.js";
import { exportActiveSVG } from "./persistence/export.js";
import { AIClient } from "./ai/ai-client.js";

const store = createStore();
const history = new HistoryManager(store);
const board = new BoardController(store, history);
const geometry = new GeometryController(store, history);
const coordinates = new CoordinateController(store, history);
const graph = new FunctionGraphController();
const solid = new SolidScene();
const construction = new ConstructionPlayer();
const projects = new ProjectStore(store);
const ai = new AIClient();
const router = new CommandRouter({ store, board, geometry, coordinates, graph, solid, construction, ai });
const ui = bindUI({ store, history, board, geometry, coordinates, graph, solid, construction, projects, router });

function refresh() {
  board.render();
  geometry.render();
  coordinates.render();
  renderInspector(store.getState(), $("inspectorBody"), $("inspectorTitle"));
}
function $(id) { return document.getElementById(id); }

window.addEventListener("mathboard:changed", refresh);
window.addEventListener("resize", () => solid.resize());

document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => {
    const view = button.dataset.view;
    ui.switchView(view);
    if (view === "solid") solid.mount();
  });
});

$("menuToggle").addEventListener("click", () => $("sidebar").classList.toggle("open"));
$("themeToggle").addEventListener("click", () => document.body.classList.toggle("light-theme"));
$("undoBtn").addEventListener("click", () => history.undo());
$("redoBtn").addEventListener("click", () => history.redo());
$("clearBtn").addEventListener("click", () => ui.clearActive());
$("fullscreenBtn").addEventListener("click", () => ui.fullscreen());
$("saveBtn").addEventListener("click", () => projects.save());
$("loadBtn").addEventListener("click", () => projects.load());
$("exportBtn").addEventListener("click", () => exportActiveSVG(store.getState().activeView));
$("importBtn").addEventListener("click", () => $("importFile").click());
$("importFile").addEventListener("change", event => projects.importFile(event.target.files?.[0]));
$("runCommand").addEventListener("click", () => router.runFromInput());
$("commandInput").addEventListener("keydown", event => { if (event.key === "Enter") router.runFromInput(); });
document.querySelectorAll("[data-command]").forEach(button => button.addEventListener("click", () => router.run(button.dataset.command)));
document.querySelectorAll("[data-tool]").forEach(button => button.addEventListener("click", () => board.setTool(button.dataset.tool)));

$("boardTriangle").addEventListener("click", () => board.addTriangle());
$("boardCircle").addEventListener("click", () => board.addCircle());
$("boardText").addEventListener("click", () => board.addNote());
$("geomTriangle").addEventListener("click", () => geometry.addTriangle());
$("geomEquilateral").addEventListener("click", () => geometry.addEquilateralTriangle());
$("geomSquare").addEventListener("click", () => geometry.addSquare());
$("geomCircle").addEventListener("click", () => geometry.addCircle());
$("toggleAngles").addEventListener("click", () => geometry.toggleAngles());
$("plotPoint").addEventListener("click", () => coordinates.plot(Number($("coordX").value), Number($("coordY").value)));
$("clearPoints").addEventListener("click", () => coordinates.clear());
$("showCoords").addEventListener("change", () => coordinates.render());
$("plotFunction").addEventListener("click", () => graph.plotFromControls());
$("autoRotate").addEventListener("click", () => solid.toggleAutoRotate());
$("resetCamera").addEventListener("click", () => solid.resetCamera());
$("solidSize").addEventListener("input", event => solid.setSize(Number(event.target.value)));
$("solidLabels").addEventListener("change", () => solid.setLabels($("solidLabels").checked));
$("solidWire").addEventListener("change", () => solid.setEdges($("solidWire").checked));
$("startConstruction").addEventListener("click", () => construction.play());
$("pauseConstruction").addEventListener("click", () => construction.pause());
$("stepConstruction").addEventListener("click", () => construction.next());
$("resetConstruction").addEventListener("click", () => construction.reset());
$("constructionSpeed").addEventListener("input", event => construction.setSpeed(Number(event.target.value)));

window.addEventListener("mathboard:toast", event => ui.toast(event.detail));
window.addEventListener("mathboard:command-message", event => { $("commandFeedback").textContent = event.detail; });
window.addEventListener("mathboard:view", event => ui.switchView(event.detail));
window.addEventListener("mathboard:construction-step", event => construction.render(event.detail));
window.addEventListener("mathboard:graph", event => graph.plot(event.detail));
window.addEventListener("mathboard:solid", event => solid.setShape(event.detail));

board.render(); geometry.render(); coordinates.render(); graph.plotFromControls(); construction.render(0);
renderInspector(store.getState(), $("inspectorBody"), $("inspectorTitle"));
solid.mount();
ui.switchView("board");
