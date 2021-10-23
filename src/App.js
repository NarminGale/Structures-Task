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
  Lookup,
  Button,
  StateStoring,
} from 'devextreme-react/tree-list'

import {
  Validator,
  RequiredRule,
  NumericRule,
  PatternRule,
  StringLengthRule,
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

        {/* Sort and filter data, reorder columns, select rows. Once you are done, refresh the web page to see that the grid’s state is automatically persisted to continue working from where you stopped*/}
        <StateStoring
          enabled={true}
          type="localStorage"
          storageKey="treeListStorage"
        />
        {/* Task Id Component Column*/}
        <Column
          visible={false}
          dataField="Task_ID"
          caption="Task ID"
          width={100}></Column>

        {/* Task Name Component Column*/}
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
            />
            <StringLengthRule
              message="Task name must have max 30 symbols"
              max={30}
            />
          </Validator>
        </Column>

        {/* Task Parent Name Component Column*/}
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

        {/* Task Status Component Column*/}
        <Column dataField="Task_Status" caption="Status" width={140}></Column>

        {/* Edit and Delete Buttons Components */}
        <Column type="buttons" width={200}>
          <Button cssClass="icon-pencil" name="edit" text="" />
          <Button cssClass="icon-bin" name="delete" text="" />
        </Column>
      </TreeList>
    </div>
  )
}

export default App
