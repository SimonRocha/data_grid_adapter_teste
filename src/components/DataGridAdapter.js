import React from 'react';

import ODataStore from 'devextreme/data/odata/store';

import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import DataGrid, {
  Column,
  HeaderFilter,
  Summary,
  ColumnFixing,
  StateStoring,
  Scrolling,
  TotalItem,
  Editing,
  Selection,
  FilterRow,
  FilterPanel,
  LoadPanel,
  ColumnChooser
} from 'devextreme-react/data-grid';

// Menu de contexto -> so fuincionou com esta importacao
import ContextMenu from 'devextreme-react/context-menu';

// Idioma
import { locale, loadMessages } from 'devextreme/localization';
import ptMessages from './dx.messages.pt.json'

// Excel
import ExcelJS from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import saveAs from 'file-saver';


export default class DataGridAdapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      user_pattern: this.props.user_pattern,
      hide_column_filters: false,
      hide_filter_panel: true,
      hide_column_chooser: true,
      context_menu_itens: []
    };

    this.state.hide_column_filters = props.hide_column_filters

    locale(navigator.language);
    loadMessages(ptMessages);

    // Botoes do menu de contexto
    this.state.context_menu_itens = [
      { 
        text: 'Limpar filtros',
        action: () => this.clearFilter()
      },
      { 
        text: 'Salvar configuração do grid',
        action: () => this.saveGridState()
      },
      { 
        text: 'Restaurar configuração do grid',
        action: () => this.clearFilter()  
      }
    ];

    if (props.has_excel_permission) {
      this.state.context_menu_itens.push(
        { 
          text: 'Salvar excel',
          action: () => this.exportExcel(false)
    
        }
      );
    }

    if (!props.disable_context_column_chooser_option) {
      this.state.context_menu_itens.push(
        { 
          id: 3,
          text: 'Exibir painel de seleção de colunas',
          action: () => this.setColumnChooser(true)
    
        }
      );
    }

    if (!props.disable_context_column_filters_option) {
      if (this.state.hide_column_filters) {
        this.state.context_menu_itens.push(
          { 
            id: 1,
            text: 'Exibir filtros de coluna',
            action: () => this.setColumnFilters(true)
      
          }
        );
      } else {
        this.state.context_menu_itens.push(
          { 
            id: 1,
            text: 'Esconder filtros de coluna',
            action: () => this.setColumnFilters(false)
          }
        );
      }
    }

    if (!props.disable_context_filter_panel_option) {
      if (this.state.hide_filter_panel) {
        this.state.context_menu_itens.push(
          { 
            id: 2,
            text: 'Exibir painel de filtros',
            action: () => this.setFilterPanel(true)
      
          }
        );
      } else {
        this.state.context_menu_itens.push(
          { 
            id: 2,
            text: 'Esconder painel de filtros',
            action: () => this.setFilterPanel(false)
          }
        );
      }
    }

    


    // if (props.has_excel_permission) {
    //   this.state.context_menu_itens.push(
    //     { 
    //       text: 'Salvar excel',
    //       action: () => this.exportExcel(false)
    
    //     }
    //   );
  
    // }

    
    this.dataGrid = null;
    this.onContentReady = this.onContentReady.bind(this);
    this.cellPainting = this.cellPainting.bind(this);
  }

  componentDidMount() {
    // Alteracoes em CSS
    const smaller_cells = ".dx-datagrid .dx-row > td { padding: 0px; font-size: 12px }"
    const header_filter_backgrond = ".dx-datagrid-headers .dx-texteditor-input, .dx-datagrid-rowsview .dx-texteditor-input {padding: 2px;min-height: 27px;background: #e8e8e8 !important;}"
    const smaller_check_box_edit_mode_position = ".dx-datagrid-checkbox-size {line-height: 1em;margin-top: -8px;}"
    const smaller_check_box_edid_mode_height = ".dx-datagrid-rowsview .dx-data-row td:not(.dx-cell-modified):not(.dx-validation-pending):not(.dx-datagrid-invalid) .dx-highlight-outline {padding: 0;height: 20px;}"
    const bigger_darker_header = ".dx-datagrid-headers .dx-datagrid-table .dx-row > td{background: #b8b7b7;border-bottom: 1px solid #ddd;color: #000;padding: 4px;}"
    const black_icon_filter_header = ".dx-datagrid .dx-column-indicators .dx-header-filter.dx-header-filter, .dx-datagrid .dx-column-indicators .dx-header-filter.dx-sort, .dx-datagrid .dx-column-indicators .dx-sort.dx-header-filter, .dx-datagrid .dx-column-indicators .dx-sort.dx-sort {display: inline-block;color: black;}"

    let styleElement = document.createElement('style');
    styleElement.type = "text/css"
    styleElement.innerHTML = smaller_cells+header_filter_backgrond+smaller_check_box_edit_mode_position+smaller_check_box_edid_mode_height+bigger_darker_header+black_icon_filter_header;
    document.getElementsByTagName("head")[0].appendChild(styleElement);
  }

  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(['EnviroCare']);
      this.setState({
        collapsed: true
      });
    }
  }

  cellPainting(row, props) {
    if (row.rowType != "header") {
      row.cells.map(e => {
        let text_color = null;
        let background_color = null;

        if (e.data) {

          if (e.column.column_background_color) {
            background_color = e.column.column_background_color
          } else if (e.data.row_background_color) {
            background_color = e.data.row_background_color
          } else if (Object.keys(e.data).includes(e.column.name+"_background_color")) {
            background_color = e.data[e.column.name+"_background_color"]
          } else if (props.coloring_conditions && props.coloring_conditions[0].column == e.column.name) {
            props.coloring_conditions.map((c) => {
              if (c.column == e.column.name) {
                if (c.expression(e.data[e.column.name])) {
                  background_color = c.true_background_color;
                } else if (c.false_background_color) {
                  background_color = c.false_background_color;
                }
              }
            });
          }

          if (e.column.column_text_color) {
            text_color = e.column.column_text_color
          } else if (e.data.row_text_color) {
            text_color = e.data.row_text_color
          } else if (Object.keys(e.data).includes(e.column.name+"_text_color")) {
            text_color = e.data[e.column.name+"_text_color"]
          } else if (props.coloring_conditions && props.coloring_conditions[0].column == e.column.name) {
            props.coloring_conditions.map((c) => {
              if (c.column == e.column.name) {
                if (c.expression(e.data[e.column.name])) {
                  text_color = c.true_text_color;
                } else if (c.false_text_color) {
                  text_color = c.false_text_color;
                }
              }
            });
          }
        }

        if (text_color) {
          e.cellElement.style.color = text_color
        }

        if (background_color) {
          e.cellElement.style.background = background_color
        }
      });
    }
  }

  itemClick(e) {
    if (!e.itemData.items) {
      e.itemData.action()
    }
  }

  setColumnChooser(is_visible) {
    this.dataGrid.instance.showColumnChooser()
  }

  setFilterPanel(is_visible) {
    let context_menu_itens = this.state.context_menu_itens.filter(c => c.id != 2)

    context_menu_itens.push(
      is_visible ?
      { 
        id: 2,
        text: 'Esconder painel de filtros',
        action: () => this.setFilterPanel(false)
      }
      :
      { 
        id: 2,
        text: 'Exibir painel de filtros',
        action: () => this.setFilterPanel(true)
      }
    );
    this.setState({ hide_filter_panel: !is_visible, context_menu_itens })
  }

  setColumnFilters(is_visible) {
    let context_menu_itens = this.state.context_menu_itens.filter(c => c.id != 1)

    context_menu_itens.push(
      is_visible ?
      { 
        id: 1,
        text: 'Esconder filtros de coluna',
        action: () => this.setColumnFilters(false)
      }
      :
      { 
        id: 1,
        text: 'Exibir filtros de coluna',
        action: () => this.setColumnFilters(true)
      }
    );
    this.setState({ hide_column_filters: !is_visible, context_menu_itens })
  }

  clearFilter() {
    this.dataGrid.instance.clearFilter();
  }

  exportExcel(selectionOnly = false) {
    this.dataGrid.instance.exportToExcel(selectionOnly);
  }

  onExporting(e) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');

    const grid_name = "grid_export_"+Date.now()+".xlsx";

    exportDataGrid({
        component: e.component,
        worksheet: worksheet
    }).then(function() {
        workbook.xlsx.writeBuffer()
            .then(function(buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), grid_name);
            });
    });
    e.cancel = true;
  }

  
  clearGridState() {
    if (this.props.clear_user_pattern) {
      this.props.clear_user_pattern();
    }
  }

  saveGridState() {
    if (this.props.save_user_pattern) {
      this.props.save_user_pattern(localStorage.getItem(this.props.id+"_storage"));
    }
  }

  customLoad = () => {
    if (this.state.user_pattern) {
      const pattern = this.state.user_pattern;
      this.state.user_pattern = false;
      return JSON.parse(pattern);
    }
  }

  customSave = (gridState) => {
    localStorage.setItem(this.props.id+"_storage", JSON.stringify(gridState))
  }

  renderGridCell = (e, props) => {
        let text_color = null;
        let background_color = null;

        if (e.data) {

          if (e.column.column_background_color) {

            background_color = e.column.column_background_color
          } else if (e.data.row_background_color) {
            background_color = e.data.row_background_color
          } else if (Object.keys(e.data).includes(e.column.name+"_background_color")) {
            background_color = e.data[e.column.name+"_background_color"]
          } else 

          if (e.column.column_text_color) {
            text_color = e.column.column_text_color
          } else if (e.data.row_text_color) {
            text_color = e.data.row_text_color
          } else if (Object.keys(e.data).includes(e.column.name+"_text_color")) {
            text_color = e.data[e.column.name+"_text_color"]
          } 
        }

        if (props.coloring_conditions && props.coloring_conditions) {
          props.coloring_conditions.map((c) => {
            if (c.color_type != "row") {  
              if (c.column == e.column.name) {
                if (c.expression(e.data[e.column.name])) {
                  background_color = c.true_background_color;
                  text_color = c.true_text_color;
                } else if (c.false_background_color) {
                  background_color = c.false_background_color;
                  text_color = c.false_text_color;
                }
              }
            } else {
              if (c.expression(e.data[c.column])) {
                background_color = c.true_background_color;
                text_color = c.true_text_color;
              } else if (c.false_background_color) {
                background_color = c.false_background_color;
                text_color = c.false_text_color;
              }
            }
          });
        } 

        if (props.coloring_conditions_obj) {
          props.coloring_conditions_obj.map((c) => {
            if (c.color_type != "row") {  
              if (c.column == e.column.name) {
                const colors = c.expression(e.data[e.column.name]);
                background_color = colors.background_color;
                text_color = colors.text_color;
              }
            } else {
              const colors = c.expression(e.data[c.column]);
              background_color = colors.background_color;
              text_color = colors.text_color;
            }
          });
        }

      
    return <div className="m-0 p-0" style={{ padding: '2px', fontSize: '12px', color: text_color, backgroundColor: background_color }}>{e.text}</div>;
  }

  handleHover(e) {
    if (e.rowType == "header") {  
      e.cellElement.title = e.column.tooltip ? e.column.tooltip : e.column.name;
    }  
 }  
  

  render() {
    const props = this.props;
    return (
      <React.Fragment>
      <ContextMenu
        dataSource={this.state.context_menu_itens}
        width={200}
      
        target={'#'+this.props.id}
        onItemClick={this.itemClick} />
      <div id="datagrid_adapter">
        
      <DataGrid
        // onRowPrepared={props.is_colored ? (e) => this.cellPainting(e, this.props) : null}
        // onCellPrepared={props.is_colored ? (e) => this.cellPainting(e, this.props) : null}
      
        height={300}
        id={this.props.id}
        key={this.props.id}
        ref={(ref) => this.dataGrid = ref}
        dataSource={this.props.data}
        allowColumnReordering={true}
        allowColumnResizing={true}
        onExporting={this.onExporting}
        repaintChangesOnly={true}
        showBorders={true}
        onContentReady={this.onContentReady} 
        keyExpr={props.key_pk}
        focusedRowEnabled={true}
        focusedRowKey={props.focus_key}
        cellHintEnabled={true}
        showCheckBoxesMode={"always"}

        columnAutoWidth={true}

        showColumnLines={true}
        showRowLines={true}
        showBorders={true}
        rowAlternationEnabled={true}

        onFocusedRowChanged={props.onSelectionChanged}

        //onCellHoverChanged={(e) => this.handleHover(e)}

        onEditingStart={props.is_editable ? props.onEditingStart : null}
        onInitNewRow={props.is_editable ? props.onInitNewRow : null}
        onRowInserting={props.is_editable ? props.onRowInserting : null}
        onRowInserted={props.is_editable ? props.onRowInserted : null}
        onRowUpdating={props.is_editable ? props.onRowUpdating : null}
        onRowUpdated={props.is_editable ? props.onRowUpdated : null}
        onRowRemoving={props.is_editable ? props.onRowRemoving : null}
        onRowRemoved={props.is_editable ? props.onRowRemoved : null}
      
        
        {...this.props}
      >
        {/* Grid Fixed Properties */}
        <LoadPanel enabled={false} visible={false} />
        <StateStoring enabled={true} type="custom" customLoad={() => this.customLoad()} customSave={(gridState) => this.customSave(gridState)}></StateStoring>
        {/* Grid Custom Properties */}
        <ColumnFixing enabled={true} />
        <HeaderFilter visible={!this.props.hide_header_filters} />
        <FilterRow visible={!this.state.hide_column_filters} />
        <FilterPanel visible={!this.state.hide_filter_panel} title={"Filtros avançados"}/>
        <Scrolling mode={this.props.scroll_mode ? this.props.scroll_mode : "infinite"} />
        <ColumnChooser enabled={!this.state.hide_column_chooser} mode={'select'} title={"Quais colunas deseja?"} />

        { /* Removidos por conta da ToolBar} 
          <Grouping autoExpandAll={false} />
          <SearchPanel visible={true} placeholder="Pesquisar..." highlightCaseSensitive={true} />
          <GroupPanel visible={true} />
          <Export enabled={true} allowExportSelectedData={true} />
        
          /* ToolBar Buttons 
          
        */}
        
        { props.is_editable ? 
          <Editing mode="cell" allowUpdating={true} allowDeleting={props.allowDeleting} allowAdding={props.allowAdding} /> 
        : null}
        { props.is_editable || props.selection_type ? 
          <Selection  mode={props.selection_type ? props.selection_type : "single"} />
        : null}

        {this.props.grid_columns ? 
        this.props.grid_columns.map(c => {
          return (
            <Column {...c} 
              dataField={c.name} 
              allowEditing={c.allowEditing ? c.allowAdding : false}
              cssClass={"solve-light"}
              width="auto"
              format={c.valueFormat ? c.valueFormat == 'currency' ? 'R$ #,##0.00' : c.valueFormat : null} 
              dataType={c.dataType ? c.dataType : "string"}  
              allowSorting={!this.props.disable_column_sort}
              headerCellRender={(e) => {
                return <div title={e.column.tooltip}>{e.column.caption}</div>;
              }}
              cellRender={c.dataType != "boolean" ? (e) => this.renderGridCell(e, props) : null}
            ></Column>
          );
        })
        :
        this.props.data && this.props.data.length > 0 ?
        Object.keys(this.props.data[0]).map(k => {
          if (k.includes("_background_color") || k.includes("_text_color")) {
            return
          }
          return (
            <Column 
              dataType={typeof this.props.data[0][k]} 
              dataField={k} 
              name={k} 
              
              allowSorting={!this.props.disable_column_sort} 
              cellRender={typeof this.props.data[0][k] != "boolean" ? (e) => this.renderGridCell(e, props) : null}>
            </Column>
          );
        })
        :null}

        <Summary>
          {this.props.grid_columns ? 
          this.props.grid_columns.map(c => {
            return (
              c.summaryType ? 
                <TotalItem {...c} 
                  column={c.name} 
                  summaryType={c.summaryType ? c.summaryType : "sum"} 
                  displayFormat={"{0}"} 
                  alignment={"right"} >
                </TotalItem>
              : null
            );
          })
          :null}
        </Summary>
        
      </DataGrid>
      </div>
      </React.Fragment>
    );
  }
}