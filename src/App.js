import React from 'react'
import {
  TreeList,
  Editing,
  Column,
  ValidationRule,
  Lookup,
  Button,
} from 'devextreme-react/tree-list'
import { tasks } from './data.js'
import LocalStore from 'devextreme/data/local_store'

const expandedRowKeys = [1]

const popupOptions = {
  title: 'Employee Info',
  showTitle: true,
  width: 700,
}

const store = new LocalStore({
  key: 'id',
  data: tasks,
  name: 'myLocalData',
})

const lookupData = {
  store: store,
  sort: 'Full_Name',
}

function App() {
  const onEditorPreparing = (e) => {
    if (e.dataField === 'Head_ID' && e.row.data.ID === 1) {
      e.editorOptions.disabled = true
      e.editorOptions.value = null
    }
    console.log(e.row.data.Task_Subject)
  }

  const onInitNewRow = (e) => {
    e.data.Head_ID = 1
  }

  return (
    <div id="tree-list-demo">
      <TreeList
        dataSource={store._array}
        columnAutoWidth={true}
        showRowLines={true}
        showBorders={true}
        defaultExpandedRowKeys={expandedRowKeys}
        keyExpr="Task_ID"
        parentIdExpr="Task_Parent_ID"
        onEditorPreparing={onEditorPreparing}
        onInitNewRow={onInitNewRow}
        id="tree-list">
        <Editing
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
          popup={popupOptions}
          mode="popup"
        />
        <Column dataField="Task_Subject" caption="Task Name" width={300}>
          <ValidationRule type="required" />
        </Column>
        <Column dataField="Task_Status" caption="Status" width={300}>
          <ValidationRule type="required" />
        </Column>

        {/* <Column dataField="Task_Subject" caption="Parent Name">
            <ValidationRule type="required" />
          </Column> */}

        <Column type="buttons" width={200}>
          <Button name="delete" />
          <Button name="edit" />
        </Column>
      </TreeList>
    </div>
  )
}

export default App
