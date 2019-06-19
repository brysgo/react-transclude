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

const Accordian = transclude({ sections: "Section" }, ({ sections }) => {
  return (
    <div className="App">
      <h1>Accordian Example</h1>
      {sections.map((section, i) => (
        <div key={i}>
          <h2>Section {i}</h2>
          {section}
        </div>
      ))}
    </div>
  );
});
const LazyAccordian = transclude({ sections: "Section" }, ({ sections }) => {
  return sections;
});

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
          <span foo="bar">this is the body</span>
        </Card.Body>
        <Card.Footer>
          <div>this is the footer</div>
        </Card.Footer>
      </Card>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("adds multiple of the same type into an array", () => {
    const component = renderer.create(
      <Accordian>
        <Accordian.Section>
          <div>first section</div>
        </Accordian.Section>
        <Accordian.Section>
          <div>second section</div>
        </Accordian.Section>
        <Accordian.Section>
          <div>third section</div>
        </Accordian.Section>
      </Accordian>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("sets a key prop so you can be lazy and just drop the array in", () => {
    const component = renderer.create(
      <LazyAccordian>
        <LazyAccordian.Section>
          <div>first section</div>
        </LazyAccordian.Section>
        <LazyAccordian.Section>
          <div>second section</div>
        </LazyAccordian.Section>
        <LazyAccordian.Section>
          <div>third section</div>
        </LazyAccordian.Section>
      </LazyAccordian>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
