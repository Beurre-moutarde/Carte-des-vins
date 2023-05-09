import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout, Menu, Modal } from 'antd';
import Home from './pages/Home';
import SignupForm from './pages/SignUpForm'
import LoginForm from './components/LoginForm';
import Profile from "./pages/Profile"

// import ApolloProvider
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const { Header, Content, Footer } = Layout;
// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setIsModalVisible(true);
  };
  return (
    <ApolloProvider client={client}>
          <Layout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2" onClick={() => showModal('Sign Up', <SignupForm />)}>Sign Up</Menu.Item>
          <Menu.Item key="3" onClick={() => showModal('Log In', <LoginForm />)}>Log In</Menu.Item>
        </Menu>
      </Header>
      <Router>
        {/* <AppLayout> */}
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Routes>
        {/* </AppLayout> */}
      </Router>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Me</Footer>

      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        {modalContent}
      </Modal>
    </Layout>
    </ApolloProvider>
  );
}

export default App;

