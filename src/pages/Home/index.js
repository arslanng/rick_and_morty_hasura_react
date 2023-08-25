import { useQuery } from "@apollo/client";
import { Col, Row, Card, Pagination, Input, Radio, Space, Button } from "antd";
import React, { useState } from "react";
import { GET_ALL_CHAR } from "./queries";

const { Meta } = Card;

function Home() {
  const [current, setCurrent] = useState(1);
  const [gender, setGender] = useState(null);
  const [name, setName] = useState(null);
  const [filteredName, setFilteredName] = useState(null);
  const [species, setSpecies] = useState(null);

  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };

  const { data, loading, error } = useQuery(GET_ALL_CHAR, {
    variables: {
      page: current,
      filter: {
        gender,
        name: filteredName,
        species,
      },
    },
  });

  const handleSubmit = () => {
    setFilteredName(name);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data.characters.info.pages);
  const chars = data.characters.results;
  const countChars = data.characters.info.count;

  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <Space.Compact style={{ width: "100%" }}>
            <Input defaultValue="Combine input and button" value={name} onChange={e => setName(e.target.value)}/>
            <Button type="primary" onClick={handleSubmit}>Submit</Button>
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <div>
            <h1>Gender</h1>
            <Radio.Group
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            >
              <Space direction="vertical">
                <Radio value={"Male"}>Male</Radio>
                <Radio value={"Female"}>Female</Radio>
                <Radio value={"unknown"}>unknown</Radio>
                <Radio value={"Genderless"}>Genderless</Radio>
                <Radio value={null}>no filter</Radio>
              </Space>
            </Radio.Group>
          </div>
          <div>
            <h1>Species</h1>
            <Radio.Group
              onChange={(e) => setSpecies(e.target.value)}
              value={species}
            >
              <Space direction="vertical">
                <Radio value={"Alien"}>Alien</Radio>
                <Radio value={"Animal"}>Animal</Radio>
                <Radio value={"Disease"}>Disease</Radio>
                <Radio value={"Human"}>Human</Radio>
                <Radio value={"Humanoid"}>Humanoid</Radio>
                <Radio value={"Robot"}>Robot</Radio>
                <Radio value={"unknown"}>unknown</Radio>
                <Radio value={null}>no filter</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Col>
        <Col span={20}>
          <Row>
            {chars &&
              chars.map((char) => (
                <div key={char.id}>
                  <Col span={8}>
                    <Card
                      hoverable
                      style={{
                        width: 240,
                        margin: 12,
                      }}
                      cover={<img alt={char.name} src={char.image} />}
                    >
                      <Meta
                        title={char.name}
                        // description="www.instagram.com"
                      />
                    </Card>
                  </Col>
                </div>
              ))}
          </Row>
          <Pagination
            total={countChars}
            current={current}
            onChange={onChange}
            showSizeChanger={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
