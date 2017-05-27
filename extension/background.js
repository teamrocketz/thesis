console.log('hello planet, from background script');

// handles url's from navigating within a site
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url && !changeInfo.url.match('chrome\:\/\/')) {
    console.log(changeInfo.url);
    console.log(changeInfo);
    console.log(changeInfo.title);
    console.log(tab.title);
    // chrome.history.deleteUrl({url: changeInfo.url}, (x) => {
    //   console.log('url removed');
    //   console.log(x);
    // });

    setTimeout( () => {
      chrome.history.deleteRange({startTime: new Date().getTime() - 15000, endTime: new Date().getTime() + 10000}, x => {
        console.log('removed some history');
        console.log(x);
      });
    }, 5000);
  }
}); 

// handles when a tab is closed
chrome.tabs.onRemoved.addListener(e => {
  console.log('A tab has been closed');
  console.log(e);
});

// lets us know a history item has been removed
chrome.history.onVisitRemoved.addListener(e => {
  console.log('Item has been removed from history successfully');
  console.log(e);
});

/*
"https://clients5.google.com/pagead/drt/dn/"
"https://notifications.google.com/u/0/widget?sourceid=243&hl=en&origin=https%3A%2F%2Fwww.google.com&uc=1&usegapi=1&jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.gapi.en.DTPeBB_SvOA.O%2Fm%3D__features__%2Frt%3Dj%2Fd%3D1%2Frs%3DAHpOoo-J3J0yqNDMPVrmQT6j-SBFfGx8oA#pid=243&_methods=onError%2ConInfo%2ChideNotificationWidget%2CpostSharedMessage%2Creauth%2CsetNotificationWidgetHeight%2CsetNotificationWidgetSize%2CswitchTo%2CnavigateTo%2CsetNotificationText%2CsetNotificationAnimation%2CgetNotificationText%2CvalidateUser%2C_ready&id=I0_1495824120490&parent=https%3A%2F%2Fwww.google.com&pfname=&rpctoken=39653305"
about:...
frameId === 0 
"https://www.google.com/_/chrome/newtab?espv=2&ie=UTF-8"
*/