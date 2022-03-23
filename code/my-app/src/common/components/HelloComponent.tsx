import { Col, Row } from "antd";
import React, { useEffect } from "react";

import js from "../images/js.jpg";
import css from "../images/css.jpg";
import html from "../images/html.jpg";
import react from "../images/react.jpg";

interface IHelloComponent {
  children?: React.ReactNode;
  name: string;
  age: number;
  gender: "male" | "female";
  img?: string;
}

export default function HelloComponent(props: IHelloComponent) {
  const { name, age, gender, img } = props;

  useEffect(() => {
    console.log("HelloComponent mounted");
  }, []);

  return (
    <div className="hello-component">
      <h2>My information</h2>
      <Row gutter={2}>
        <Col span={8} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img className="hello-component__img" src={img} alt="" />
        </Col>
        <Col span={16} style={{ paddingLeft: 10 }}>
          <div className="hello-component__content">
            <div className="hello-component__name">
              <span>My name:</span> {name}
            </div>
            <div className="hello-component__age">
              <span>My age:</span> {age}
            </div>
            <div className="hello-component__gender">
              <span>My gender:</span> {gender}
            </div>
            <div className="hello-component__description">
              <p>
                Hi guys, my name is Cuong. I'm a programmer. I'm passionate about programming language and really love
                frameworks JS such as: ReactJs, VueJs và Angular. My hobbit is usually reading and writing code in my
                free time
              </p>
              <p>
                I'm create this app to memorize all experiences and all my knowlegde during i'm studying. I'm really
                happy if you enjoy this app. If you liked app. you could contact to my social media above.
              </p>
            </div>
          </div>
        </Col>
      </Row>
      <h2>My Skills</h2>
      <Row>
        <Col span={6}>
          <img className="my-picture" src={js} alt="" />
        </Col>
        <Col span={6}>
          <img className="my-picture" src={css} alt="" />
        </Col>
        <Col span={6}>
          <img className="my-picture" src={react} alt="" />
        </Col>
        <Col span={6}>
          <img className="my-picture" src={html} alt="" />
        </Col>
      </Row>
    </div>
  );
}
