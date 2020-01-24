import React from "react";
import Logo from "./Logo";
import { shallow, ShallowWrapper } from "enzyme";

describe("Logo Component", () => {
  it("Should render", () => {
    const render = shallow(<Logo/>);
    expect(render).toBeInstanceOf(ShallowWrapper);
  })
});