import React, { Fragment } from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

export default function(propNames, Component) {
  return function(props) {
    const transcludedContent = {};
    const childComponents = {};
    const propNameMap = {};
    Object.keys(propNames).forEach(function(prop) {
      propNameMap[propNames[prop]] = prop;
      return (childComponents[propNames[prop]] = function(p) {
        return p.children;
      });
    });
    if (typeof props.children === "function") {
      const wrapper = mount(props.children(childComponents));
      Object.keys(childComponents).forEach(function(name) {
        return (transcludedContent[propNameMap[name]] = wrapper
          .find(childComponents[name])
          .first()
          .getElement());
      });
    }
    return React.createElement(
      Component,
      Object.assign({}, transcludedContent, props)
    );
  };
}
