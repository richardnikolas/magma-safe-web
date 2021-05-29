/* eslint-disable sonarjs/no-identical-functions */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { getDateFormatted } from 'src/shared/constants/functions';

const useStyles = makeStyles(() => ({
  tableColumn: {
    textAlign: 'center'
  }
}));

const getTableData = (userSecrets) => {
  const data = [];

  if (userSecrets.length > 0) {
    userSecrets.forEach(secret => {
      data.push({
        secretName: secret.name,
        serverName: secret.serverName,
        userLastAccessed: secret.lastAccessedByUser,
        updatedAt: getDateFormatted(secret.updatedAt)
      })
    });
  }

  return data;
};

const SecretsTable = ({ userSecrets }) => {
  const classes = useStyles();

  const tableColumns = [
    {
      name: 'secretName',
      label: 'Nome',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'serverName',
      label: 'Server',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: {
            textAlign: 'center'
          }
        })
      }
    },
    {
      name: 'userLastAccessed',
      label: 'Último visitante',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          className: classes.tableColumn
        })
      }
    },
    {
      name: 'updatedAt',
      label: 'Última atualização',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          className: classes.tableColumn
        })
      }
    }
  ];

  const tableData = getTableData(userSecrets);

  const tableOptions = {
    download: false,
    print: false,
    filter: false,
    fixedHeader: true,
    selectableRowsHideCheckboxes: true,
    responsive: 'standard',
    tableBodyMaxHeight: '70vh',
    searchPlaceholder: 'Digite o nome do Secret desejado',
    textLabels: {
      body: {
        noMatch: "Nenhum Secret encontrado. Você pode criar um novo Secret a partir de um Server que você tenha acesso."
      },
      pagination: {
        next: "Próxima página",
        previous: "Página anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de"
      },
      viewColumns: {
        title: "Mostrar colunas",
        titleAria: "Mostrar/Esconder colunas"
      }
    }
  };

  return (
    <MUIDataTable
      title="Secrets"
      data={tableData}
      columns={tableColumns}
      options={tableOptions}
    />
  );
};

SecretsTable.propTypes = {
  userSecrets: PropTypes.array
};

SecretsTable.defaultProps = {
  userSecrets: []
};

export default SecretsTable;