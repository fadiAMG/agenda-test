import React, { Component } from "react";
import $ from "jquery";

class Talk_Agenda extends Component {
  
  render() {
    return (
      <div id="talk-item-id" className={this.props.class}>
        <ul className="talk-item-list">
          <li className="talk-item-type">{this.props.talkType}</li>
          <li className="talk-item-time">{this.props.talkTime} - {this.props.talkEnd} </li>
          <li className="talk-item-title">{this.props.talkTitle} </li>
          

          <li className="talk-item-speaker">
            {(() => {
              if (this.props.talkSpeakers) {
                return this.props.talkSpeakers.map((speaker, index) => {
                  if (!speaker) return "BUG FOUND";
                  if (this.props.talkSpeakers.length === 1)
                    return `${speaker.fname} ${speaker.lname}`;
                  if (this.props.talkSpeakers.length === index + 1) {
                    return ` & ${speaker.fname} ${speaker.lname}`;
                  } else if (index === 0) {
                    return `${speaker.fname} ${speaker.lname}`;
                  } else {
                    return `, ${speaker.fname} ${speaker.lname}`;
                  }
                });
              } 
            })()}
          </li>
        </ul>
      </div>
    );
  }
}

export default Talk_Agenda;
