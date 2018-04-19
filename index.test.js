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
