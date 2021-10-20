import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import React from 'react'

import { Template } from 'devextreme-react/core/template'
import TreeList, {
  Column,
  ColumnChooser,
  HeaderFilter,
  SearchPanel,
  Selection,
  Lookup,
} from 'devextreme-react/tree-list'

import { tasks } from './data.js'
import EmployeeCell from './EmployeeCell.js'

const expandedKeys = [1, 2]
const selectedKeys = [1, 29, 42]

class App extends React.Component {
  render() {
    return (
      <TreeList
        dataSource={dataSourceOptions}
        showBorders={true}
        columnAutoWidth={true}
        wordWrapEnabled={true}
        defaultExpandedRowKeys={expandedKeys}
        defaultSelectedRowKeys={selectedKeys}
        keyExpr="Task_ID"
        parentIdExpr="Task_Parent_ID"
        id="tasks">
        <SearchPanel visible={true} width={250} />
        <HeaderFilter visible={true} />
        <Selection mode="multiple" />

        <Column dataField="Task_Subject" width={300} />

        <Column dataField="Task_Status" caption="Status" minWidth={100}>
          <Lookup dataSource={statuses} />
        </Column>

        <Template name="employeeTemplate" render={EmployeeCell} />
      </TreeList>
    )
  }
}

const dataSourceOptions = {
  store: tasks,
}

function customizeTaskCompletionText(cellInfo) {
  return `${cellInfo.valueText}%`
}

const statuses = ['Active', 'Deactive']

export default App
