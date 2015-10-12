MainLayout = React.createClass({
  //
  // // This mixin makes the getMeteorData method work
  // mixins: [ReactMeteorData],
  //
  // // Loads items from the Tasks collection and puts them on this.data.tasks
  // getMeteorData() {
  //   return {
  //     currentUser: Meteor.user()
  //   };
  // },

  render() {
    return (
      <div>
        <TopNav />
        <main>
          {this.props.content()}
        </main>
        <footer></footer>
      </div>
    );
  }
});
