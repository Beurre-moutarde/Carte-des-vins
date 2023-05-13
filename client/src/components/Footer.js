import React from 'react';
import { Row, Col } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f5f5f5', padding: '60px 0' }}>
      <Row justify="center">
        <Col span={12}>
          <div style={{ textAlign: 'center' }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              {/* <FontAwesomeIcon icon={faGithub} style={{ fontSize: '24px', marginRight: '10px' }} /> */}
              Donation
            </a>
          </div>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={12}>
          <div style={{ textAlign: 'center', fontSize: '12px' }}>
            © 2023 Plants & Co Limited and/or its affiliates. All rights reserved.
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;