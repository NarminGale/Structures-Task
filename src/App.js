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

import {
  Validator,
  RequiredRule,
  CompareRule,
  NumericRule,
  PatternRule,
  StringLengthRule,
  RangeRule,
  AsyncRule,
} from 'devextreme-react/validator'

import { tasks } from './data.js'

const expandedRowKeys = [1]
const allowedPageSizes = [5, 7, 9]

const lookupData = {
  store: tasks,
  sort: 'Task_Subject',
}

function App() {
  const namePattern = /^[^0-9]+$/

  const onEditorPreparing = (e) => {
    if (e.dataField === 'Task_Parent_ID' && e.row.data.Task_ID === 1) {
      e.editorOptions.disabled = true
      e.editorOptions.value = null
    }
  }

  const onInitNewRow = (e) => {
    e.data.Task_Parent_ID = 0
    console.log(e.element)
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
          width={100}></Column>

        <Column dataField="Task_Subject" caption="Task Name" width={260}>
          <Validator>
            <RequiredRule type="required" message="Task name is required" />
            <PatternRule
              ignoreEmptyValue={false}
              message="Do not use digits in the Task Name"
              pattern={namePattern}
            />
            <StringLengthRule
              message="Task name must have at least 3 symbols"
              min={3}
              max={30}
            />
          </Validator>
        </Column>

        <Column visible={true} dataField="Task_Parent_ID" caption="Task Parent">
          <Lookup
            dataSource={lookupData}
            valueExpr="Task_ID"
            displayExpr="Task_Subject"
          />
          <Validator>
            <NumericRule type="numeric" />
          </Validator>
        </Column>

        <Column dataField="Task_Status" caption="Status" width={140}></Column>

        <Column type="buttons" width={200}>
          <Button cssClass="icon-bin" name="delete" />
          <Button cssClass="icon-pencil" name="edit" />
        </Column>
      </TreeList>
    </div>
  )
}

export default App
