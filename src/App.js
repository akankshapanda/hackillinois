import React from 'react';
import { ResponsiveDrawer } from "./components/ResponsiveDrawer";
import { Tab } from "./models/Tab";
import { Event } from "./models/Event";
import { List, Set } from 'immutable';
import { fetchEvents } from "./api/Ajax";
import {getFormattedDate, getFormattedTime} from "./utils/TimeUtils";
import { EventContainer } from "./components/event/EventContainer";
import { useSaveToFragment } from "./CustomHooks";
import './App.css';
import {getValueFromFragment} from "./utils/UrlUtils";

function App() {
  const [ events, setEvents ] = React.useState(List());
  const [ tabs, setTabs ] = React.useState(List());

  const serachValueFromUrl = getValueFromFragment('Search', window.location.hash);
  const [ searchValue, setSearchValue ] = React.useState(serachValueFromUrl || '');
  const [ error, setError ] = React.useState('');

  const tabIdFromUrl = getValueFromFragment('Tab', window.location.hash);
  const [ selectedTab, setSelectedTab ] = React.useState(new Tab(tabIdFromUrl, ''));

  const onUrlTabIdUpdate = React.useCallback(
    updatedTabId => {
      const newTab = tabs.find(tab => tab.id === updatedTabId);
      if (newTab) {
        setSelectedTab(newTab);
      }
    },
    [ tabs ],
  );

  useSaveToFragment(
    selectedTab.id,
    updatedId => onUrlTabIdUpdate(updatedId),
    'Tab',
  );

  useSaveToFragment(
    searchValue,
    setSearchValue,
    'Search',
  );


  React.useEffect(() => {
    const handleOnFetchEvents = response => {
      const events = List(response.data.events.map(Event.eventFromResponse));
      const uniqueDates = getUniqueDates(events);
      setEvents(events);
      const tabs = List(
        [new Tab('all-events', 'Schedule'), ...uniqueDates
          .sort()
          .map(uniqueDate => new Tab(
            getFormattedDate(uniqueDate, 'short').replace(' ', '-'),
            getFormattedDate(uniqueDate),
          ))]
      );
      setTabs(tabs);
      setSelectedTab(tabs.find(tab => tab.id === tabIdFromUrl) || tabs.get(0));
    };

    fetchEvents()
      .then(response => handleOnFetchEvents(response))
      .catch(setError);
  }, []);

  const getUniqueDates = events => {
    let uniqueDates = Set();
    let uniqueFormattedDates = Set();
    events.forEach(event => {
      const formattedDate = getFormattedDate(event.startTime);
      if (!uniqueFormattedDates.contains(formattedDate)) {
        uniqueFormattedDates = uniqueFormattedDates.add(formattedDate);
        uniqueDates = uniqueDates.add(event.startTime);
      }
    });

    return uniqueDates;
  };

  const handleOnClickFavorite = eventId => {
    setEvents(events.update(
      events.findIndex(event => event.id === eventId),
      event => event.toggleFavorite()),
    );
  };

  const caseInsensitiveIncludes = (a, b) =>
     a.toLowerCase().includes(b.toLowerCase());

  const filterSearchedEvents = events => {
    return events.filter(event =>  (
      caseInsensitiveIncludes(event.name, searchValue)
        || caseInsensitiveIncludes(event.type, searchValue)
        || caseInsensitiveIncludes(getFormattedTime(event.startTime), searchValue)
        || caseInsensitiveIncludes(getFormattedTime(event.endTime), searchValue)
      )
    );
  };

  const eventSortingMethod = (a, b) => {
    if (a.favorite && b.favorite) {
      return a.startTime - b.startTime;
    }
    if (a.favorite) {
      return -1;
    }
    return 1;
  };

  return (
    <ResponsiveDrawer
      tabs={tabs}
      selectedTab={selectedTab}
      onClickTab={setSelectedTab}
      searchValue={searchValue}
      onUpdateSearchValue={setSearchValue}
    >
      <EventContainer
        events={filterSearchedEvents(events)
        .filter(event => {
          if (selectedTab.id === 'all-events') {
            return true;
          }
          return getFormattedDate(event.startTime) === selectedTab.name
        })
        .sort(eventSortingMethod)
        }
        onClickFavorite={handleOnClickFavorite}
      />
    </ResponsiveDrawer>
  );
}

export default App;
