import React from "react";

module.exports = function(propNames, Component) {
  const componentMap = new Map();
  const resultComponent = function(props) {
    const transcludedContent = {};
    if (props.children && Array.isArray(props.children)) {
      props.children.forEach(function(child) {
        let propName;
        if ((propName = componentMap.get(child.type))) {
          if (transcludedContent[propName]) {
            const setKey = (el, i) =>
              React.cloneElement(el, { ...el.props, key: i });
            if (!Array.isArray(transcludedContent[propName])) {
              transcludedContent[propName] = [
                setKey(transcludedContent[propName], 0)
              ];
            }
            transcludedContent[propName].push(
              setKey(child, transcludedContent[propName].length)
            );
          } else {
            transcludedContent[propName] = child;
          }
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
