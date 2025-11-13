import BruteForce from "./modules/BruteForce.js";
import Form from "./modules/Form.js"
import Output from "./modules/Output.js";
import FlowController from "./modules/FlowController.js";
import FlowControls from "./modules/FlowControls.js";

const output = new Output();

const flowController = new FlowController();
const bruteForce = new BruteForce(output.log, flowController);
const flowControls = new FlowControls(flowController);

const form = new Form(bruteForce.findLocalExtremum, output, flowControls);
