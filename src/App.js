import React from 'react'
import {
  TreeList,
  HeaderFilter,
  Selection,
  Sorting,
  Paging,
  Pager,
  Scrolling,
  SearchPanel,
  Editing,
  Column,
  Popup,
  Form,
  ValidationRule,
  Lookup,
  Button,
} from 'devextreme-react/tree-list'
import { Item } from 'devextreme-react/form'
import { Switch } from 'devextreme-react/switch'

import { tasks } from './data.js'
import LocalStore from 'devextreme/data/local_store'

const expandedRowKeys = [1]
const allowedPageSizes = [5, 7, 9]

const popupOptions = {
  title: 'Task Info',
  showTitle: true,
  width: 700,
  height: 525,
}

// const store = new LocalStore({
//   key: 'id',
//   data: tasks,
//   name: 'myLocalData',
// })

const lookupData = {
  store: tasks,
  sort: 'Task_Subject',
}

function App() {
  const onEditorPreparing = (e) => {
    if (e.dataField === 'Task_Parent_ID' && e.row.data.Task_ID === 1) {
      e.editorOptions.disabled = true
      e.editorOptions.value = null
    }
  }

  const onInitNewRow = (e) => {
    e.data.Task_Parent_ID = 0
  }

  const onRowPrepared = (e) => {
    e.rowElement.style.height = '24px'
  }

  return (
    <div id="tree-list-demo">
      <TreeList
        dataSource={tasks}
        columnAutoWidth={true}
        showRowLines={true}
        showBorders={true}
        defaultExpandedRowKeys={expandedRowKeys}
        keyExpr="Task_ID"
        parentIdExpr="Task_Parent_ID"
        onEditorPreparing={onEditorPreparing}
        onInitNewRow={onInitNewRow}
        onRowPrepared={onRowPrepared}
        id="tree-list">
        <Editing
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          // popup={popupOptions}
          mode="row"
        />

        <HeaderFilter visible={true} />
        <Sorting mode="multiple" />
        <Scrolling mode="standard" />
        <Paging enabled={true} defaultPageSize={5} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={allowedPageSizes}
          showInfo={true}
        />
        <Selection mode="single" />
        <SearchPanel visible={true} />

        <Column
          visible={false}
          dataField="Task_ID"
          caption="Task ID"
          width={100}>
          {/* <ValidationRule type="required" /> */}
        </Column>

        <Column dataField="Task_Subject" caption="Task Name" width={260}>
          <ValidationRule type="required" />
        </Column>

        <Column visible={true} dataField="Task_Parent_ID" caption="Task Parent">
          <Lookup
            dataSource={lookupData}
            valueExpr="Task_ID"
            displayExpr="Task_Subject"
          />
          <ValidationRule type="required" />
        </Column>

        <Column dataField="Task_Status" caption="Status" width={140}>
          <ValidationRule type="required" />
        </Column>

        <Column type="buttons" width={200}>
          <Button cssClass="icon-bin" name="delete" />
          <Button cssClass="icon-pencil" name="edit" />
        </Column>
      </TreeList>
      {/* <Switch defaultValue={true} /> */}
    </div>
  )
}

export default App
