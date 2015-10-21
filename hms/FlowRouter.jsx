FlowRouter.route('/', {
  name: 'home',
  action(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return <Home />;
      }
    });
  }
});

FlowRouter.route('/dashboard/event/checkin', {
  name: 'checkin',
  action(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return (
          <div>
            <Helmet title="Check-in | HMS" />
            <Checkin />
          </div>
        );
      }
    });
  }
});

FlowRouter.route('/dashboard/debug', {
  name: 'debug',
  action(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return (
          <div>
            <Helmet title="Debug | HMS" />
            <DebugView />
          </div>
        );
      }
    });
  }
});
