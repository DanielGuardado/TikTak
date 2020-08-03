import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import UpdateVideoForm from "./update_video_form_container";
import CreateCommentForm from "./create_comment_form_container";

class VideoShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTrigger: false,
      description: this.props.video.description,
    };
  }
  componentDidMount() {
    debugger;
    this.props.fetchVideo(this.props.match.params.videoId);
  }

  btnTrigger = () => {
    this.setState({ editTrigger: true });
  };

  //REMEMBER  THIS!!!!!!!! HUGEEE!!!!!!
  //FLOW OF INFORMATION
  editDescrip = (description) => {
    this.setState({ description: description });
  };

  btnTriggerOff = () => {
    this.setState({ editTrigger: false });
  };

  vidShow() {
    return (
      <ReactPlayer
        playing={true}
        className="videoShowBox2"
        height={885}
        width={665}
        controls={true}
        volume={0}
        url={this.props.video.videoUrl}
      />
    );
  }

  deleteBtn() {
    if (
      JSON.stringify(this.props.currentUser.id) === this.props.video.uploader_id
    ) {
      return (
        <div>
          <button
            className="DelButton"
            onClick={() => this.props.deleteVideo(this.props.video.id)}
          >
            Delete Video
          </button>
        </div>
      );
    }
  }

  editTrig() {
    if (this.state.editTrigger) {
      return (
        <UpdateVideoForm
          btnTriggerOff={this.btnTriggerOff}
          video={this.props.video}
          updateVideo={this.props.updateVideo}
          editTrigger={this.editTrigger}
          editDescrip={this.editDescrip}
        />
      );
    }
  }
  commentForm() {
    return (
      <CreateCommentForm
        authorId={this.props.currentUser.id}
        videoId={this.props.video.id}
      />
    );
  }

  videoComments() {
    if (this.props.video.comments) {
      const comment = this.props.video.comments.map((comment, idx) => (
        <li key={idx}>{comment.body}</li>
      ));
      return <ul>{comment}</ul>;
    }
  }

  editBtn() {
    if (
      JSON.stringify(this.props.currentUser.id) === this.props.video.uploader_id
    ) {
      return (
        <div>
          <button onClick={this.btnTrigger}>Edit</button>
        </div>
      );
    }
  }

  render() {
    const { video } = this.props;

    return (
      <div>
        {this.deleteBtn()}
        <div className="show-container">
          <div className="background-show">{this.vidShow()}</div>
          <Link className="closeVid" to="/">
            X
          </Link>
          <div className="details">
            <h1 className="static-username">{video.username}</h1>
            <p className="desc">{this.state.description}</p>
            {this.editBtn()}
            {this.editTrig()}
            {this.commentForm()}
            {this.videoComments()}
          </div>
        </div>
      </div>
    );
  }
}

export default VideoShow;
