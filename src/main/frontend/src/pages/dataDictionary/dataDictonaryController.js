import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';
import YAMLData from './content.yaml';
import DataDictBody from './dataDictonaryView';

const About = () => {
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      let resultData = [];
      let result = [];
      result = await axios.get(YAMLData);
      resultData = yaml.safeLoad(result.data);
      setData(resultData);
    };
    fetchData();
  }, []);

  return (
    <>
      <DataDictBody data={data} />
    </>
  );
};
export default About;
