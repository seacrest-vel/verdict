import {Verdict} from "./verdict.js";


function add(a, b) {
  Verdict.Function(a, b);
  return a + b;
}


let n = null

Verdict.Array(["s", 0, "false"]).map = [Verdict.string, Verdict.number, Verdict.boolean]