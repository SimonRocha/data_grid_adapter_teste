import React from 'react';

import ODataStore from 'devextreme/data/odata/store';
import DiscountCell from './DiscountCell';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
  HeaderFilter,
  Summary,ColumnChooser,ColumnFixing,StateStoring,
  TotalItem
} from 'devextreme-react/data-grid';

const pageSizes = [10, 25, 50, 100];

const dataSourceOptions = {
  store: new ODataStore({
    key: 'Amount',
    beforeSend: function(request) {
      request.params.startDate = '2018-05-10';
      request.params.endDate = '2018-05-15';
    }
  })
};

export default class DataGridAdapter extends React.Component {
  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(['EnviroCare']);
      this.setState({
        collapsed: true
      });
    }
  }

  cellPainting(e) {
    if (e.data) {
      let text_color = null;
      let background_color = null;

      if (e.column.column_background_color) {
        background_color = e.column.column_background_color
      } else if (e.data.row_background_color) {
        background_color = e.data.row_background_color
      } else if (Object.keys(e.data).includes(e.column.name+"_background_color")) {
        background_color = e.data[e.column.name+"_background_color"]
      }

      if (e.column.column_text_color) {
        text_color = e.column.column_text_color
      } else if (e.data.row_text_color) {
        text_color = e.data.row_text_color
      } else if (Object.keys(e.data).includes(e.column.name+"_text_color")) {
        text_color = e.data[e.column.name+"_text_color"]
      }

      if (text_color) {
        e.cellElement.style.color = text_color
      }

      if (background_color) {
        e.cellElement.style.background = background_color
      }
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
    this.onContentReady = this.onContentReady.bind(this);
  }


  render() {
    return (

      <DataGrid
        dataSource={this.props.data}
        stateStoring={{
          enabled: true,
          type: 'custom',
          customLoad: () => {
            let from_storage = JSON.parse(localStorage.getItem('storage_grid_state_web'))
            let from_props = this.props.user_pattern
            return from_props ? from_props : from_storage
          },
          customSave: (gridState) => {
            localStorage.setItem('storage_grid_state_web', JSON.stringify(gridState))
            if (this.props.save_user_pattern) {
              this.props.save_user_pattern(JSON.stringify(gridState))
            }
          }
        }}
        allowColumnReordering={true}
        onCellPrepared={this.batata}
        selection={{ mode: 'single' }}
        showBorders={true}
        onContentReady={this.onContentReady} 
        onCellPrepared={this.cellPainting}
        
        {...this.props}
      >
        <StateStoring></StateStoring>
        <ColumnChooser enabled={true} />
        <ColumnFixing enabled={true} />
        <GroupPanel visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <HeaderFilter visible={true} />
        <Grouping autoExpandAll={false} />


        {this.props.gird_columns ? 
        this.props.gird_columns.map(c => {
          return (
            <Column {...c} dataField={c.name} ></Column>
          );
        })
        :
        this.props.data && this.props.data.length > 0 ?
        Object.keys(this.props.data[0]).map(k => {
          return (
            <Column dataType="string"  dataField={k} ></Column>
          );
        })
        :null}

        <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
        <Paging defaultPageSize={10} />
      </DataGrid>
    );
  }

  
}