import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Tab } from "../models/Tab";
import { Sidebar } from "./Sidebar";
import { TabList } from "./TabList";
import { HeaderAppBar } from "./header/HeaderAppBar";
import { ContentContainer } from "./ContentContainer";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

export const ResponsiveDrawer = props => {
  const { tabs, searchValue, selectedTab, children, onClickTab, onUpdateSearchValue } = props;

  const classes = useStyles();
  const [ mobileOpen, setMobileOpen ] = React.useState(false);

  const handleOnDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderAppBar
        title={selectedTab.name}
        onDrawerToggle={handleOnDrawerToggle}
        searchValue={searchValue}
        onUpdateSearchValue={onUpdateSearchValue}
      />
      <Sidebar open={mobileOpen} onClose={handleOnDrawerToggle}>
        <TabList tabs={tabs} selectedTab={selectedTab} onClickTab={onClickTab}/>
      </Sidebar>
      <ContentContainer>
        {children}
      </ContentContainer>
    </div>
  );
};

ResponsiveDrawer.propTypes = {
  tabs: ImmutablePropTypes.listOf(PropTypes.instanceOf(Tab)).isRequired,
  searchValue: PropTypes.string.isRequired,
  selectedTab: PropTypes.instanceOf(Tab),
  children: PropTypes.node.isRequired,
  onClickTab: PropTypes.func.isRequired,
  onUpdateSearchValue: PropTypes.func.isRequired,
};
