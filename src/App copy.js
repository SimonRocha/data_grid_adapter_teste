import React from 'react';

import DataGridAdapter from './components/DataGridAdapter'
import { Background } from 'devextreme-react/range-selector';
import { dados } from './assets/data/data'

class App extends React.Component {
  constructor(props) {
    super(props)

    this._rowClicked = this._rowClicked.bind(this);
  }
  

  state = {
    collapsed: false,
    dados: [
      {
        teste: 1,
        codigo: 1,
        descricao: 'Camiseta',
        descricao2: 'Meia',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
  
        descricao_text_color: '#4f4',
        descricao_background_color: '#f44',
      },
      {
        teste: 1,
        codigo: 2,
        descricao: 'Calca',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
        row_text_color: '#f4f',
        row_background_color: '#4ff'
      },
      {
        teste: 2,
        codigo: 3,
        descricao: 'Bermuda',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
        row_text_color: '#f4f',
        row_background_color: '#4ff'
      },
      {
        teste: 2,
        codigo: 4,
        descricao: 'Camisa',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 5,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 14,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
        check: false
      },
      {
        teste: 2,
        codigo: 15,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 6,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 7,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 8,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 9,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 10,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 11,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 12,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 13,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
      {
        teste: 2,
        codigo: 14,
        descricao: 'Meia',
        descricao2: 'Camiseta',
        descricao3: 'Camiseta',
        descricao4: 'Camiseta',
        descricao5: 'Camiseta',
        descricao6: 'Camiseta',
      },
    ],
    colunas: [
      {
        name: 'codigo',
        index: 1,
        dataType: "number",
        valueFormat: "currency",
        alignment: "right",
        // column_text_color: "#44f",
        // column_background_color: "#ff4",
        is_summary: true,
        summaryType: "count",
        tooltip: "esta é a coluna código, que legal\nteste"
      },
      {
        name: 'descricao',
        index: 2,
        dataType: "string",
        allowEditing: true,
      },
      {
        name: 'descricao2',
        index: 3,
        dataType: "string",
      },
      {
        name: 'descricao3',
        index: 4,
        dataType: "string4",
      },
      {
        name: 'descricao5',
        index: 5,
        dataType: "string",
      },
      {
        name: 'descricao6',
        index: 6,
        dataType: "string",
      },
      {
        name: 'check',
        index: 7,
        dataType: "boolean",
        allowEditing: true,
      },
    ],
    padrao_usuario: '{"columns":[{"visibleIndex":1,"dataField":"codigo","name":"codigo","dataType":"number","visible":true},{"visibleIndex":0,"dataField":"descricao","name":"descricao","dataType":"string","visible":true}],"allowedPageSizes":[10,20,40],"filterPanel":{"filterEnabled":true},"filterValue":null,"searchText":"","pageIndex":0,"pageSize":20}',
    focus_key: 3
  };

  dados = [
    {
      teste: 1,
      codigo: 1,
      descricao: 'Camiseta',
      descricao2: 'Meia',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',

      descricao_text_color: '#4f4',
      descricao_background_color: '#f44',
    },
    {
      teste: 1,
      codigo: 2,
      descricao: 'Calca',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
      row_text_color: '#f4f',
      row_background_color: '#4ff'
    },
    {
      teste: 2,
      codigo: 3,
      descricao: 'Bermuda',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
      row_text_color: '#f4f',
      row_background_color: '#4ff'
    },
    {
      teste: 2,
      codigo: 4,
      descricao: 'Camisa',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 5,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 14,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 15,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 6,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 7,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 8,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 9,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 10,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 11,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 12,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 13,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
    {
      teste: 2,
      codigo: 14,
      descricao: 'Meia',
      descricao2: 'Camiseta',
      descricao3: 'Camiseta',
      descricao4: 'Camiseta',
      descricao5: 'Camiseta',
      descricao6: 'Camiseta',
    },
  ]

  _rowClicked(e) {
    this.setState({ dados: this.dados });
  }
  
  render() {
    return (
      <div>

      <DataGridAdapter 
        id="grid_teste"
        key_pk={"codigo"}
        grid_columns={this.state.colunas}
        data={this.state.dados}
        //focus_key={this.state.focus_key}
        
        // Mudar layout do grid
        //hide_header_filters={true}
        //hide_column_filters={true}
        //disable_column_sort={true} 
        is_editable={true}
        selection_type={"single"}
        scroll_mode={"standard"}

        // Permissoes
        has_excel_permission={true}

        // Salvar, Carregar e Limpar configuracoes do grid
        user_pattern={this.state.padrao_usuario}
        save_user_pattern={(gridState) => {debugger; console.log(gridState)}}
        clear_user_pattern={() => this}

        // Eventos
        onSelectionChanged={this._rowClicked}

        // Eventos de edicao
        onEditingStart={() => null}
        onInitNewRow={() => alert(2)}
        onRowInserting={() => alert(3)}
        onRowInserted={() => alert(4)}
        onRowUpdating={() => alert(5)}
        onRowUpdated={() => alert(6)}
        onRowRemoving={() => alert(7)}
        onRowRemoved={() => alert(8)}
      
        // Coloracao
        is_colored={true}
        coloring_conditions={[ 
          {
            column: 'descricao',
            color_type: 'row',
            true_background_color: '#f4f',
            false_background_color: '#4f4',
            true_text_color: '#fff',
            false_text_color: '#000',
            expression: (valor) => {return valor == "Meia"}
          }
        ]}

        coloring_conditions_obj={[ 
          {
            column: 'descricao2',
            color_type: 'cell',
            expression: (valor) => {
              var cores = {}
              
              cores.background_color = '#000'
              cores.text_color = '#fff'

              if (valor == "Meia") {
                cores.background_color = '#f4f'
                cores.text_color = '#fff'
              } 
              
              return cores;
            }
          }
        ]}
      />
      </div>
    );
  }

  
}

export default App;
