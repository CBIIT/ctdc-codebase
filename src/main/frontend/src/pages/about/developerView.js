import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import axios from 'axios';
import YAMLData from '../../content/prod/aboutPagesContent.yaml';
import stockImg from '../../assets/about/About_Developers.png';
import AboutBody from '../../components/About/AbouBodyView';

const ABOUT_CONTENT_URL = process.env.REACT_APP_ABOUT_CONTENT_URL;


const DeveloperView = () => {
  const [data1, setData] = useState([]);


  useEffect(async () => {
    let resultData = [];
    try {
      const result = await axios.get(ABOUT_CONTENT_URL);
      resultData = yaml.safeLoad(result.data);
    } catch (error) {
      const result = await axios(YAMLData);
      resultData = yaml.safeLoad(result.data);
    }
    const supportObj = resultData.find(({ page }) => page === '/developers');
    setData(supportObj);
  }, []);

  return (
    <>
      <AboutBody data={{
        img: stockImg,
        title: data1.title,
        content: data1.content,
        table: data1.table,
      }}
      />
    </>
  );
};
export default DeveloperView;
