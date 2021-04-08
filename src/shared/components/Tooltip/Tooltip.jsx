import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip as TooltipMui, InputAdornment, ClickAwayListener, Fade } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(() => ({
  tooltipIcon: {
    cursor: 'pointer',
    width: 22
  },
  tooltip: {
    width: 200,
    backgroundColor: '#393F4A',
    fontSize: 12,
    fontFamily: 'Poppins',
    padding: 15,
    fontWeight: 300,
    textAlign: 'center'
  },
  tooltipArrow: {
    color: '#393F4A'
  }
}));

export default function Tooltip({ title }) {
  const classes = useStyles();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleTooltipToggle = () => {
    setTooltipOpen((prevTooltipOpen) => !prevTooltipOpen);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <InputAdornment position="end">
        <TooltipMui
          open={tooltipOpen}
          onClose={handleTooltipClose}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={title}
          placement="top"
          arrow
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 300 }}
          classes={{ tooltip: classes.tooltip, arrow: classes.tooltipArrow }}
          data-testid="tooltip-component"
        >
          <HelpOutlineIcon
            aria-label="toggle tooltip"
            onClick={handleTooltipToggle}
            className={classes.tooltipIcon}
          />
        </TooltipMui>
      </InputAdornment>
    </ClickAwayListener>
  );
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired
};
