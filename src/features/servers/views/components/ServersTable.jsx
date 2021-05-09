/* eslint-disable sonarjs/no-identical-functions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import MUIDataTable from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { getDateFormatted } from 'src/shared/constants/functions';
import { serversActions } from 'src/features/servers/redux';
import ServersCustomToolbar from './ServersCustomToolbar';
import CreateServerModal from './CreateServerModal';

const useStyles = makeStyles(() => ({
  tableColumn: {
    textAlign: 'center'
  }
}));

const getTableData = (userServers) => {
  const data = [];

  if (userServers.length > 0) {
    userServers.forEach(server => {
      data.push({
        serverName: server.server.name,
        numberOfSecrets: server.secretsCount,
        numberOfUsers: server.usersCount,
        updatedAt: getDateFormatted(server.server.updatedAt)
      })
    });
  }

  return data;
};

const ServersTable = ({ userServers }) => {  
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    dispatch(serversActions.cleanCreateNewServer);
    setIsModalOpen(!isModalOpen);
  }

  const tableColumns = [
    {
      name: 'serverName',
      label: 'Nome',
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: 'numberOfSecrets',
      label: 'Secrets',
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
      name: 'numberOfUsers',
      label: 'Usuários',
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
  const tableData = getTableData(userServers);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const tableOptions = {
    download: false,
    print: false,
    filter: false,
    fixedHeader: true,
    selectableRowsHideCheckboxes: true,
    responsive: 'standard',
    tableBodyMaxHeight: '70vh',
    searchPlaceholder: 'Digite o nome do Server desejado',
    customToolbar: () => (<ServersCustomToolbar handleClickNewServer={handleOpenModal} />),
    textLabels: {
      body: {
        noMatch: "Nenhum Server encontrado. Você pode criar um cliando em 'Novo Server'."
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
    <>
      <MUIDataTable
        title="Servers"
        data={tableData}
        columns={tableColumns}
        options={tableOptions}
      />
      <CreateServerModal open={isModalOpen} onClose={handleCloseModal} />
    </>
  )
};

ServersTable.propTypes = {
  userServers: PropTypes.array
};

ServersTable.defaultProps = {
  userServers: []
};

export default ServersTable;
