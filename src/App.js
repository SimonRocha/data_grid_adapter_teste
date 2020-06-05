
import React from 'react';

import DataGridAdapter from './components/DataGridAdapter'
import { Background } from 'devextreme-react/range-selector';

class App extends React.Component {
  state = {
    collapsed: false,
    dados: [
      {
        codigo: 1,
        descricao: 'Camiseta',
        descricao_text_color: '#4f4',
        descricao_background_color: '#f44',
      },
      {
        codigo: 2,
        descricao: 'Calca',
        row_text_color: '#f4f',
        row_background_color: '#4ff'
      },
      {
        codigo: 3,
        descricao: 'Bermuda',
        row_text_color: '#f4f',
        row_background_color: '#4ff'
      },
    ],
    colunas: [
      {
        name: 'codigo',
        index: 1,
        dataType: "number",
        format: "currency",
        alignment: "right",
        column_text_color: "#44f",
        column_background_color: "#ff4",
      },
      {
        name: 'descricao',
        index: 2,
        dataType: "string",
      }
    ],
    padrao_usuario: null
  };

  render() {
    return (
      <DataGridAdapter 
        gird_columns={this.state.colunas}
        data={this.state.dados}
        user_pattern={this.state.padrao_usuario}
        save_user_pattern={(gridState) => true}
        onAlgoMudou={true}
      
        pintarCorCondicao={[ 
          {
            coluna_valor: 'codigo',
            cor_true: '#f4f',
            cor_false: '#4f4',
            expressao: (valor) => {return valor <= 100}
          },
          {
            coluna_valor: 'descricao',
            coluna_para_mudar: ['codigo', 'descricao'],
            cor_true: '#f4f',
            cor_false: '#4f4',
            expressao: (valor) => {return valor == 'Calca'}
          },
        ]}
      />
    );
  }

  
}

export default App;
