import * as React from "react";
import * as ReactDOM from "react-dom";

import Logo from "./components/Logo";

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.render(
  <Logo />,
  root
);