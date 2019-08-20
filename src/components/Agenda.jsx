import React, { Component } from "react";
import Talk_Agenda from "./talk_item";
import sort_o from "./sort";
import $ from "jquery";

class Agenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      talk_item: null,
      times: { day1: {}, day2: {}, day3: {} },
      cu_day: "day1",
      dayBanner: "DAY ONE - DEC 7",
      stype: ""
    };
  }

  async componentDidMount() {
    const URL =
      "https://dashboard.riseupsummit.com/api/newsessionsdata/agendaview";
    const response = await fetch(URL);
    const data = await response.json();
    let dic = {};
    const days = ["day1", "day2", "day3"];
    days.map(val => {
      data.items[val].map(session => {
        let stage;
        if (
          !session.not_general_agenda &&
          !session.other_activities &&
          !session.session_101
        ) {
          if (session.talk) {
            session.stype = "TALK";
          } else if (session.panel) {
            session.stype = "PANEL";
          } else if (session.launchpad) {
            session.stype = "LAUANCHPAD";
          } else if (session.opening_ceremony) {
            session.stype = "OPENING CEREMONY";
          } else if (session.fireside_chat) {
            session.stype = "FIRSIDE CHAT";
          } else if (session.session_break) {
            session.stype = "BREAK";
          }

          if (dic[session.start_time]) {
            if (session.venue.includes("Creative Stage")) {
              dic[session.start_time].cs = session;
            }
            if (session.venue.includes("Tech Stage")) {
              dic[session.start_time].ts = session;
            }
            if (session.venue.includes("Capital Stage")) {
              dic[session.start_time].cas = session;
            }
          } else {
            dic[session.start_time] = { cs: {}, ts: {}, cas: {} };
            if (session.venue.includes("Creative Stage")) {
              dic[session.start_time].cs = session;
            }
            if (session.venue.includes("Tech Stage")) {
              dic[session.start_time].ts = session;
            }
            if (session.venue.includes("Capital Stage")) {
              dic[session.start_time].cas = session;
            }
          }
          console.log(dic[session.start_time]);
          // dic[session.start_time][stage]
        }
      });
      let dict = sort_o(dic);
      // console.log(dic);
      this.setState(prevState => ({
        times: {
          ...prevState.times,
          [val]: dict
        }
      }));
      dic = {};
    });
    // console.log(this.state.times);
    this.setState({
      talk_item: data.items[this.state.cu_day],
      loading: false
    });

    $(function() {
      $(document).scroll(function() {
        var $nav = $(".venus");
        $nav.toggleClass("fixed", $(this).scrollTop() > $nav.height());
      });
    });

  }

  changeDayBanner = sel => {
    switch (sel) {
      case "day1":
        this.setState({ dayBanner: "DAY ONE - DEC 7" });
        break;
      case "day2":
        this.setState({ dayBanner: "DAY TWO - DEC 8" });
        break;
      case "day3":
        this.setState({ dayBanner: "DAY THREE - DEC 9" });
        break;
      default:
        this.setState({ dayBanner: "DAY ONE - DEC 7" });
    }
  };

  selectDay = selectedDay => {
    this.setState({ cu_day: selectedDay });
    this.changeDayBanner(selectedDay);
    this.componentDidMount();
  };

  render() {
    var x = this;
    return (
      <React.Fragment>
        <div className="select-day-btns">
          <ul className="btn-list">
            <li>
              <button
                type="button"
                className="btn btn-lg btn-primary"
                id="one"
                onClick={() => this.selectDay("day1")}
              >
                1<sup>st</sup> Day
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-lg btn-primary"
                id="two"
                onClick={() => this.selectDay("day2")}
              >
                2<sup>nd</sup> Day
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn btn-lg btn-primary"
                id="three"
                onClick={() => this.selectDay("day3")}
              >
                3<sup>rd</sup> Day
              </button>
            </li>
          </ul>
        </div>
        <div className="selected-day">
          <h1 className="agenda-day">{this.state.dayBanner}</h1>
        </div>

        <div className="venus">
          <div className="col">
            <h5>Greek Campus</h5>
            <h4>CAPITAL STAGE</h4>
          </div>
          <div className="col">
            <h5>AUC CAMPUS</h5>
            <h4>CREATIVE STAGE</h4>
          </div>
          <div className="col">
            <h5>AUC CAMPUS</h5>
            <h4>TECH STAGE</h4>
          </div>
        </div>

        {this.state.loading || !this.state.times[this.state.cu_day] ? (
          <div>
            <h1>Loading..</h1>
          </div>
        ) : (
          <div className="card-wrapper">
            {Object.keys(this.state.times[this.state.cu_day]).map(function(
              key
            ) {
              return (
                <div className="general-Agenda-Table">
                  <div className="stages-table">
                    <Talk_Agenda
                      talkType={x.state.times[x.state.cu_day][key].cas.stype}
                      talkTitle={x.state.times[x.state.cu_day][key].cas.title}
                      talkTime={
                        x.state.times[x.state.cu_day][key].cas.start_time
                      }
                      talkEnd={x.state.times[x.state.cu_day][key].cas.end_time}
                      talkSpeakers={
                        x.state.times[x.state.cu_day][key].cas.speakersData
                      }
                      class={
                        x.state.times[x.state.cu_day][key].cas.speakersData
                          ? "talk-item"
                          : "talk-item hide-talk-item"
                      }
                    />
                  </div>
                  <div className="stages-table">
                    <Talk_Agenda
                      talkType={x.state.times[x.state.cu_day][key].cs.stype}
                      talkTitle={x.state.times[x.state.cu_day][key].cs.title}
                      talkTime={
                        x.state.times[x.state.cu_day][key].cs.start_time
                      }
                      talkEnd={x.state.times[x.state.cu_day][key].cs.end_time}
                      talkSpeakers={
                        x.state.times[x.state.cu_day][key].cs.speakersData
                      }
                      class={
                        x.state.times[x.state.cu_day][key].cs.speakersData
                          ? "talk-item"
                          : "talk-item hide-talk-item"
                      }
                    />
                  </div>
                  <div className="stages-table">
                    <Talk_Agenda
                      talkType={x.state.times[x.state.cu_day][key].ts.stype}
                      talkTitle={x.state.times[x.state.cu_day][key].ts.title}
                      talkTime={
                        x.state.times[x.state.cu_day][key].ts.start_time
                      }
                      talkEnd={x.state.times[x.state.cu_day][key].ts.end_time}
                      talkSpeakers={
                        x.state.times[x.state.cu_day][key].ts.speakersData
                      }
                      class={
                        x.state.times[x.state.cu_day][key].ts.speakersData
                          ? "talk-item"
                          : "talk-item hide-talk-item"
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Agenda;
