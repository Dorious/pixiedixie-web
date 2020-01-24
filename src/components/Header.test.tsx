import React from "react";
import Header from "./Header";
import { shallow, ShallowWrapper } from "enzyme";

describe("Header Component", () => {
  it("Should render", () => {
    const render = shallow(<Header/>);
    expect(render).toBeInstanceOf(ShallowWrapper);
  })
});