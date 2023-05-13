import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Modal, Tabs } from 'antd';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import "../index.css"; // Import the CSS file

import Auth from '../utils/auth';

const { Header } = Layout;

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header className='alibaba-header'>
        <div className='logo'>
          <Link to='/'>Plants & Co</Link>
        </div>
        <Menu theme='dark' mode='horizontal' className='menu'>
          <Menu.Item key='1'>
            <Link to='/'>Search For Plants</Link>
          </Menu.Item>
          {Auth.loggedIn() ? (
            <>
              <Menu.Item key='2'>
                <Link to='/saved'>See Your Plants</Link>
              </Menu.Item>
              <Menu.Item key='3' onClick={Auth.logout}>
                Logout
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key='3' onClick={() => setShowModal(true)}>
              Login/Sign Up
            </Menu.Item>
          )}
        </Menu>
      </Header>
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={480}
      >
        <Tabs defaultActiveKey='login'>
          <Tabs.TabPane tab='Login' key='login'>
            <LoginForm handleModalClose={() => setShowModal(false)} />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Sign Up' key='signup'>
            <SignUpForm handleModalClose={() => setShowModal(false)} />
          </Tabs.TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default AppNavbar;