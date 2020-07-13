import React from 'react';
import { Table } from 'antd'
import Utils from '../../utils/utils';


export default class BaseTable extends React.Component {

    onRowClick = (record, index) => {
        let rowSelectionType = this.props.rowSelectionType;
        let selectedRowKeys = this.props.selectedRowKeys;
        let selectedItem = this.props.selectedItem;
        let selectedRows = this.props.selectedRows;
        if (rowSelectionType == 'checkbox') {

            if (selectedRows.length > 0) {
                let ids = selectedRows.map(item => {
                    return item.id;
                })
                let id = ids.indexOf(record.id)
                if (id == -1) {
                    selectedRowKeys.push(index);
                    selectedItem = record;
                    selectedRows.push(record);
                } else {
                    selectedRowKeys.splice(id, 1);
                    selectedRows.splice(id, 1);
                }
            } else {
                selectedRowKeys.push(index);
                selectedItem = record;
                selectedRows.push(record);
            }

        } else {
            // radio
            selectedRowKeys = [index];
            selectedItem = record;
            selectedRows = [record];
        }
        this.props.updateSelectItem(selectedRowKeys, selectedItem, selectedRows);

    }
    initTable = () => {
        let rowSelectionType = this.props.rowSelectionType;
        let selectedRowKeys = this.props.selectedRowKeys;
        const rowSelection = {
            type: "radio",
            selectedRowKeys,
        }
        if (rowSelectionType === false || rowSelectionType === null) {
            rowSelectionType = false;
        } else if (rowSelectionType == 'checkbox') {
            rowSelection.type = 'checkbox';
        }
        return <Table
            bordered
            {...this.props}
            // columns={columns}
            // dataSource={this.state.list}
            // pagination={this.state.pagination}
            rowSelection={rowSelectionType ? rowSelection : null}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        if (!rowSelectionType) {
                            return;
                        }
                        this.onRowClick(record, index)
                    }
                };
            }}
        />
    }

    render() {
        return (
            <div>
                {this.initTable()}
            </div>
        );
    }
}
