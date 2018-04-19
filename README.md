[![CircleCI](https://circleci.com/gh/brysgo/react-transclude.svg?style=svg)](https://circleci.com/gh/brysgo/react-transclude)

# React Transclude

This is a POC of bringing a neat syntax from angular for including multiple
named child trees as children. The way it is done now in react is by passing
JSX through props, but this kinda breaks the XML analogy.

# Usage

`npm install --save react-transclude`

or

`yarn add react-transclude`

Then, see the example from the test:

```jsx
import React from "react";
import renderer from "react-test-renderer";

import transclude from "react-transclude";

const Card = transclude(
  { header: "Header", body: "Body", footer: "Footer" },
  ({ header, body, footer }) => (
    <div>
      <div>{header}</div>
      <div>{body}</div>
      <div>{footer}</div>
    </div>
  )
);

describe("react-transclude", () => {
  it("works with good old jsx props", () => {
    const component = renderer.create(
      <Card
        header={<div>this is the header</div>}
        body={<div>this is the body</div>}
        footer={<div>this is the footer</div>}
      />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("makes composing children more XML-like", () => {
    const component = renderer.create(
      <Card>
        <Card.Header>
          <div>this is the header</div>
        </Card.Header>
        <Card.Body>
          <div>this is the body</div>
        </Card.Body>
        <Card.Footer>
          <div>this is the footer</div>
        </Card.Footer>
      </Card>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
```
