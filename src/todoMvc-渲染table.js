import { Button, Input, Table } from 'antd'
import axios from 'axios'
import React from 'react'
import './App.css'
// 1.找到对应的组件，把页面搭建起来
// 2. table Xuanran chulai (发送请求(componentDidMount)， 拿到数据， 交给lsit （this.setState))
const { Search } = Input;
class App extends React.Component {
  state = {
    // 表格数据
    list: [],
    // 列数据
    columns: [
      {
        title: '任务编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '任务描述',
        dataIndex: 'des',
        key: 'des',
      },
      {
        title: '操作',
        dataIndex: 'do',
        key: 'do',
      }
    ]
  }

  // 搜索
  onSearch = (value) => {
    console.log(value);
  }
  // 删除
  
  // 加载列表
  loadList = async () => {
    const res = await axios.get('http://localhost:3001/data')
    console.log(res)
    this.setState({
      list: res.data
    })
  }

  componentDidMount(){
    this.loadList()
  }

  render () {
    return (
      <div className="container">
      {/*搜索框 on 打头一般都是事件，看antd文档*/}
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={this.onSearch}
        />
        {/*table 表格组件 依赖两个必要 数据， 一个定义列，一个定义遍历数据渲染 */}
        <Table 
        dataSource={this.state.list} 
        columns={this.state.columns} 
        /> 
      </div>
    )
  }
}

export default App
