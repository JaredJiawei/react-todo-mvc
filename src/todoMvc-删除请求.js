import { Input, Table, Popconfirm } from 'antd'
import axios from 'axios'
import React from 'react'
import './App.css'
// 1.找到对应的组件，把页面搭建起来
// 2. table Xuanran chulai (发送请求(componentDidMount)， 拿到数据， 交给lsit （this.setState))
// 3.删除功能（点击哪个用哪个id ， 调用删除接口， 重新拉取列表）
// 4.搜索功能 （拿到关键词 调用接口获取列表数据）
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
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) =>
        (
          <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(text, record)}>
            <a>Delete</a>
          </Popconfirm>
        )
      }
    ]
  }

  // 搜索
  onSearch = async (value) => {
    console.log(value);
    // 搜索接口
    const res = await axios.get(`http://localhost:3001/data/?q=${value}`)
    console.log(res)
    this.setState({
      list: res.data
    })
  }
  // 删除
  handleDelete = async (text, record) => {
    console.log('开始删除',record) // record.id
    console.log(record.id);
    // 调用删除接口
    await axios.delete(`http://localhost:3001/data/${record.id}`)
    // 重新获取列表
    this.loadList()
  }
  
  // 加载列表
  loadList = async () => {
    const res = await axios.get('http://localhost:3001/data')
    //console.log(res)
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
