SimpleSelect = React.createFactory(ReactSelectize.SimpleSelect);
MultiSelect = React.createFactory(ReactSelectize.MultiSelect);

Checkin = React.createClass({
  render() {
    var groups = [{
                groupId: "asia",
                title: "Asia"
            }, {
                groupId: "africa",
                title: "Africa"
            }, {
                groupId: "europe",
                title: "Europe"
            }],
            countries = [
                ["asia", "china"],
                ["asia", "korea"],
                ["asia", "japan"],
                ["africa", "nigeria"],
                ["africa", "congo"],
                ["africa", "zimbabwe"],
                ["europe", "germany"],
                ["europe", "poland"],
                ["europe", "spain"],
            ];
    return (
      <div className="ui container">
        <MultiSelect
            groups = {groups}
            groupsAsColumns = {true}
            options = {countries.map(function(item){
                return {
                    groupId: item[0],
                    label: item[1],
                    value: item[1]
                };
            })}
            placeholder = "Select countries"
        />
      </div>
    );
  },
  componentDidMount: function() {
    // var searchNode = this.refs.search.getDOMNode();
    // $(searchNode).find(".ui.search").search({
    //   type: 'category',
    //   minCharacters: 1,
    //   mockResponseAsync(settings, callback) {
    //     return {
    //       "results": {
    //         "hackers": {
    //           "name": "hackers",
    //           "results": [
    //             {
    //               title: "Chen Ye",
    //               description: "cye@brown.edu"
    //             }
    //           ]
    //         }
    //       }
    //     };
    //   }
    // }).api({
    //   mockResponseAsync(settings, callback) {
    //     return {
    //       "results": {
    //         "hackers": {
    //           "name": "hackers",
    //           "results": [
    //             {
    //               title: "Chen Ye",
    //               description: "cye@brown.edu"
    //             }
    //           ]
    //         }
    //       }
    //     };
    //   }
    // });
  }

});
