import React from "react";

module.exports = function(propNames, Component) {
  const componentMap = new Map();
  const resultComponent = function(props) {
    const transcludedContent = {};
    if (props.children && Array.isArray(props.children)) {
      props.children.forEach(function(child) {
        let propName;
        if ((propName = componentMap.get(child.type))) {
          transcludedContent[propName] = child;
        }
      });
    }
    return React.createElement(
      Component,
      Object.assign({}, transcludedContent, props)
    );
  };
  Object.keys(propNames).forEach(function(prop) {
    const fn = function(p) {
      return p.children;
    };
    componentMap.set(fn, prop);
    resultComponent[propNames[prop]] = fn;
  });
  return resultComponent;
};
