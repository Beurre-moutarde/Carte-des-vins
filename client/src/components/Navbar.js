// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// import SignUpForm from './SignupForm';
// import LoginForm from './LoginForm';

// import Auth from '../utils/auth';

// const AppNavbar = () => {
//   // set modal display state
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <Navbar bg='dark' variant='dark' expand='lg'>
//         <Container fluid>
//           <Navbar.Brand as={Link} to='/'>
//             Plants & Co
//           </Navbar.Brand>
//           <Navbar.Toggle aria-controls='navbar' />
//           <Navbar.Collapse id='navbar'>
//             <Nav className='ml-auto'>
//               <Nav.Link as={Link} to='/'>
//                 Search For Plants
//               </Nav.Link>
//               {/* if user is logged in show saved plants and logout */}
//               {Auth.loggedIn() ? (
//                 <>
//                   <Nav.Link as={Link} to='/saved'>
//                     See Your Plants
//                   </Nav.Link>
//                   <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
//                 </>
//               ) : (
//                 <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//       {/* set modal data up */}
//       <Modal
//         size='lg'
//         show={showModal}
//         onHide={() => setShowModal(false)}
//         aria-labelledby='signup-modal'>
//         {/* tab container to do either signup or login component */}
//         <Tab.Container defaultActiveKey='login'>
//           <Modal.Header closeButton>
//             <Modal.Title id='signup-modal'>
//               <Nav variant='pills'>
//                 <Nav.Item>
//                   <Nav.Link eventKey='login'>Login</Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item>
//                   <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
//                 </Nav.Item>
//               </Nav>
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Tab.Content>
//               <Tab.Pane eventKey='login'>
//                 <LoginForm handleModalClose={() => setShowModal(false)} />
//               </Tab.Pane>
//               <Tab.Pane eventKey='signup'>
//                 <SignUpForm handleModalClose={() => setShowModal(false)} />
//               </Tab.Pane>
//             </Tab.Content>
//           </Modal.Body>
//         </Tab.Container>
//       </Modal>
//     </>
//   );
// };

// export default AppNavbar;

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