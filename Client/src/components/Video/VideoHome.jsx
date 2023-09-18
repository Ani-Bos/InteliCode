import React, { Component } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import "./VideoHome.css";

class VideoHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
    };
  }
  handleChange = (e) => this.setState({ url: e.target.value });

  join = () => {
    if (this.state.url !== "") {
      var url = this.state.url.split("/");
      window.location.href = `/${url[url.length - 1]}`;
    } else {
      var url = Math.random().toString(36).substring(2, 7);
      window.location.href = `/${url}`;
    }
  };
  render() {
    return (
      <div className="container2">
        <div style={{ color: "white", textAlign: "center" }}>
          <p style={{ fontSize: "45px" }}>Intellicode Meetup</p>
          <p style={{ fontWeight: "200" }}>
            Start instant meeting with your peers to discuss
          </p>
        </div>

        <div
          style={{
            width: "",
            margin: "8rem auto",
          }}
        >
          <div>
            <p
              style={{
                margin: "auto",
                fontWeight: "bold",
                paddingRight: "50px",
                color: "white",
              }}
            >
              Start or join a meeting
            </p>
          </div>
          <div>
            <Input
              style={{
                border: "2px solid gray",
                borderRadius: "5px",
                padding: "5px",
                color: "white",
              }}
              placeholder="enter the link or code"
              onChange={(e) => this.handleChange(e)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.join}
              style={{ margin: "20px" }}
            >
              Go
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoHome;
