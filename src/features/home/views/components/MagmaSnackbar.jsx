import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { homeSelectors } from 'src/features/home/redux/homeSlice';
import { homeActions } from 'src/features/home/redux';
import { serversActions } from 'src/features/servers/redux';
import { StandardSnackbar } from 'src/shared/components';

const MagmaSnackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(homeSelectors.getMagmaSnackbar);

  const handleClose = () => {
    dispatch(homeActions.cleanMagmaSnackbar());
    dispatch(serversActions.cleanErrors());
  };

  if (!snackbar)
    return null;
  
  return (
    <StandardSnackbar
      open={snackbar !== null}
      message={snackbar.message}
      severity={snackbar.severity}
      handleClose={handleClose}
    />
  );
};

export default MagmaSnackbar;