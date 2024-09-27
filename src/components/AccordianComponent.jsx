import React from "react";
import Accordion from "react-bootstrap/Accordion";

export const AccordianComponent = ({title,children}) => {
  return (
    <div className="accord-con">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>{title}</Accordion.Header>
          <Accordion.Body>
            {children}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export const AccordianWithInput = () => {
  return (
    <div className="accord-con-with-input">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Enter the name of your QR code</Accordion.Header>
          <Accordion.Body>
            <input type="text" name="" id="" placeholder="e.g My QR code" />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
