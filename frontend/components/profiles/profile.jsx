import React from "react";
import ProfileItem from "./profile_item";
import NavBar from "../navbar/navbar_conatiner";
import SideBar from "../sidebar/sidebar_container";
import { storage } from "./firebase";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bioEdit: false, picEdit: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProPicSubmit = this.handleProPicSubmit.bind(this);
  }
  componentWillMount() {
    this.props.fetchUser(this.props.match.params.id);
    this.props.fetchVideos();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        bio: this.props.user.bio,
        pro_pic: this.props.user.pro_pic,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateUser({ id: this.props.user.id, bio: this.state.bio });
    this.setState({ bioEdit: false });
  }

  handleProPicSubmit(url) {
    this.props.updateUser({
      id: this.props.user.id,
      pro_pic: url,
    });
  }

  update(field) {
    return (e) => this.setState({ [field]: e.currentTarget.value });
  }

  handleChange = (e) => {
    let image;
    if (e.target.files[0]) {
      image = e.target.files[0];
      // this.setState({ image: image });
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on("state_changed", () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ pro_pic: url }), this.handleProPicSubmit(url);
          });
      });
    }
    this.setState({ picEdit: false });
  };

  user() {
    const { user } = this.state;
    if (this.state.pro_pic) {
      return (
        <div className="container profile-name">
          <div className="row d-flex">
            <div className="col-1 col-md-2 col-lg-2 ml-5">
              <img
                id="profile-img"
                src={this.state.pro_pic}
                className="p-1 rounded-circle img-thumbnail-p"
              />
            </div>
            <div className="col-4 col-md-6">
              <div className="d-flex mb-3">
                <h3 className="pr-5">{this.props.user.username}</h3>
              </div>
              <div className="d-flex mb-3">
                <button className="FollowButton">Follow</button>
              </div>
            </div>
            <p className="text-left p-left-profile pro-color">
              <span className="mr-5 p-sizing">
                <strong className="font-weight-bold">9</strong> Following
              </span>
              <span>
                <strong className="font-weight-bold">16.1k</strong> Followers
              </span>
              <span className="ml-5">
                <strong className="font-weight-bold">840</strong> Likes
              </span>
            </p>
          </div>
          {this.bio()}
          {/* <div className="text-left bio">{this.state.bio}</div>
          <label>
            <textarea
              className="edit-imp"
              type="text"
              value={this.state.bio}
              onChange={this.update("bio")}
            />
          </label> */}
          {this.proPic()}
        </div>
      );
    }
  }
  proPic() {
    if (this.props.user.id === this.props.currentUser.id) {
      if (!this.state.picEdit) {
        return (
          <button onClick={() => this.setState({ picEdit: true })}>
            {" "}
            Edit Pic
          </button>
        );
      } else {
        return (
          <div>
            <input
              className="file-upload"
              type="file"
              onChange={this.handleChange}
            />
          </div>
        );
      }
    }
  }
  bio() {
    if (!this.state.bioEdit) {
      if (
        this.state.bio === "" &&
        this.props.user.id === this.props.currentUser.id
      ) {
        return (
          <>
            <div className="text-left bio">No bio yet.</div>
            <button onClick={() => this.setState({ bioEdit: true })}>
              Edit Bio|
            </button>
          </>
        );
      } else if (this.props.user.id === this.props.currentUser.id) {
        return (
          <>
            <div className="text-left bio">{this.state.bio}</div>
            <button onClick={() => this.setState({ bioEdit: true })}>
              Edit Bio|
            </button>
          </>
        );
      } else if (this.state.bio === "") {
        return <div className="text-left bio">No bio yet.</div>;
      } else {
        return <div className="text-left bio">{this.state.bio}</div>;
      }
    } else {
      return (
        <div className="">
          <form className="" onSubmit={this.handleSubmit}>
            <label>
              <textarea
                className="bio-pro"
                type="text"
                value={this.state.bio}
                onChange={this.update("bio")}
              />
            </label>
            <button className="" type="submit">
              Submit
            </button>
          </form>
        </div>
      );
    }
  }
  vids() {
    const vid = this.props.videos.map((video, idx) => (
      <ProfileItem key={idx} video={video} />
    ));
    return <div className="row">{vid}</div>;
  }

  render() {
    return (
      <div>
        <NavBar />
        <SideBar />
        {this.user()}
        <div className="container vids1">{this.vids()}</div>
      </div>
    );
  }
}
export default Profile;
