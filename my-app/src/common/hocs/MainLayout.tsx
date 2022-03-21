import React from 'react'
import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

interface IMainLayout {
    children?: React.ReactNode
}

function MainLayout(props: IMainLayout) {
    return (
        <Layout className="layout">
            <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item>Homepage</Menu.Item>
                <Menu.Item>News</Menu.Item>
                <Menu.Item>About me</Menu.Item>
            </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}

export default MainLayout