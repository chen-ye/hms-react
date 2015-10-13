FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
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
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return <Checkin />;
      }
    });
  }
});

FlowRouter.route('/dashboard/debug', {
  name: 'debug',
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return <DebugView />;
      }
    });
  }
});
