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
