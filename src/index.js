import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, Icon, Tree, Tabs, Anchor } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TreeNode = Tree.TreeNode;
const TabPane = Tabs.TabPane;

class MyTab extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: <textarea/>, key: '1' },
            { title: 'Tab 2', content: <textarea/>, key: '2' },
            { title: 'Tab 3', content: <textarea/>, key: '3' },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    };
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: <textarea/>, key: activeKey });
        this.setState({ panes, activeKey });
    };
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    };
    render() {
        return (
            <Tabs
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
            >
                {this.state.panes.map(pane => <TabPane forceRender={true}
                    tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
            </Tabs>
        );
    }
}



class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (


            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <SubMenu
                            key="file_sub"
                            title={<span><Icon type="file" /><span>File Structure</span></span>}
                        >
                            <SubMenu
                                key="2"
                                title={<span><Icon type="file" /><span>File Structure</span></span>}
                            >
                                <SubMenu
                                    key="3"
                                    title={<span><Icon type="file" /><span>File Structure</span></span>}
                                >
                                </SubMenu>
                            </SubMenu>

                        </SubMenu>
                        <Menu.Item key="plugin">
                            <Icon type="desktop" />
                            <span>Plugin</span>
                        </Menu.Item>

                    </Menu>
                </Sider>

                <Layout>
                    <Content style={{ margin: '0 16px' }}>

                        <MyTab/>
                    </Content>
                </Layout>

            </Layout>

        );
    }
}

ReactDOM.render(<SiderDemo />, document.getElementById('container'));



