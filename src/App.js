import React from 'react';

import DataGridAdapter from './components/DataGridAdapter'
import { Background } from 'devextreme-react/range-selector';
import { generateData } from './Data'

class App extends React.Component {
  constructor(props) {
    super(props)

    this._rowClicked = this._rowClicked.bind(this);
    this._rowClicked2 = this._rowClicked2.bind(this);
    
    const data = generateData(80,60000);

    this.state = {
      collapsed: false,
      data,
      data2: [],
      data3: [],
      grid2_key: 'row0col0'
    };
  }

  _rowClicked(e) {
    debugger
    const data2 = generateData(Math.random() * (30 - 15) + 15,Math.random() * (30000 - 3000) + 3000);

    this.setState(
      { 
        data2, 
        grid2_key: this.state.grid2_key == 'row1col0' ? 'row0col0' : 'row1col0'
      }
    );
  }

  _rowClicked2(e) {
    debugger
    const data3 = generateData(Math.random() * (30 - 15) + 15,Math.random() * (30000 - 3000) + 3000);

    this.setState({ data3 });
  }
  
  render() {
    return (
      <div>

      <DataGridAdapter 
        id="grid_test1"
        key_pk={"col0"}
        grid_columns={this.state.data.columns}
        data={this.state.data.rows}
        is_editable={true}
        selection_type={"single"}
        scroll_mode={"virtual"}
        has_excel_permission={true}
        //user_pattern={this.state.padrao_usuario}
        save_user_pattern={(gridState) => {debugger; console.log(gridState)}}
        clear_user_pattern={() => this}
        onSelectionChanged={this._rowClicked}
        onEditingStart={() => null}
        onInitNewRow={() => alert(2)}
        onRowInserting={() => alert(3)}
        onRowInserted={() => alert(4)}
        onRowUpdating={() => alert(5)}
        onRowUpdated={() => alert(6)}
        onRowRemoving={() => alert(7)}
        onRowRemoved={() => alert(8)}
        is_colored={true}
      />

    <DataGridAdapter 
        id="grid_test2"
        key_pk={"col0"}
        grid_columns={this.state.data2.columns}
        data={this.state.data2.rows}
        is_editable={true}
        selection_type={"single"}
        scroll_mode={"infinite"}
        has_excel_permission={true}
        focus_key={this.state.grid2_key}
        //user_pattern={this.state.padrao_usuario}
        save_user_pattern={(gridState) => {debugger; console.log(gridState)}}
        clear_user_pattern={() => this}
        onFocusedRowChanged={this._rowClicked2}
        onEditingStart={() => null}
        onInitNewRow={() => alert(2)}
        onRowInserting={() => alert(3)}
        onRowInserted={() => alert(4)}
        onRowUpdating={() => alert(5)}
        onRowUpdated={() => alert(6)}
        onRowRemoving={() => alert(7)}
        onRowRemoved={() => alert(8)}
        is_colored={true}
      />

      <DataGridAdapter 
        id="grid_test3"
        key_pk={"col0"}
        grid_columns={this.state.data3.columns}
        data={this.state.data3.rows}
        is_editable={true}
        selection_type={"single"}
        scroll_mode={"infinite"}
        has_excel_permission={true}
        //user_pattern={this.state.padrao_usuario}
        save_user_pattern={(gridState) => {debugger; console.log(gridState)}}
        clear_user_pattern={() => this}
        onEditingStart={() => null}
        onInitNewRow={() => alert(2)}
        onRowInserting={() => alert(3)}
        onRowInserted={() => alert(4)}
        onRowUpdating={() => alert(5)}
        onRowUpdated={() => alert(6)}
        onRowRemoving={() => alert(7)}
        onRowRemoved={() => alert(8)}
        is_colored={true}
      />
      </div>
    );
  }

  
}

export default App;
