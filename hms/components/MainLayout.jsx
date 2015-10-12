MainLayout = React.createClass({
  render() {
    return (<div>
              <header>
                This is our header
              </header>
              <main>
                {this.props.content()}
              </main>
              <footer>
                This is our footer
              </footer>
            </div>);
  }
});

Home = React.createClass({
  render () {
    return (
      <div>
        <h1>This is the home page</h1>
        /* Rendering of material-ui components will work here */
      </div>
    );
  }
});
