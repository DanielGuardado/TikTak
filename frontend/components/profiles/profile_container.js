import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import { fetchVideos } from "../../actions/video_actions";
import Profile from "./profile";

const mapStateToProps = (state, ownProps) => {
  let videos;
  if (state.entities.videos) {
    videos = Object.values(state.entities.videos).filter((el) => {
      if (el.uploader_id === ownProps.match.params.id) {
        return el;
      }
    });
  }
  return {
    //video: state.entities.videos,
    currentUser: state.session.currentUser
      ? state.entities.users[state.session.currentUser.id]
      : {},
    user: state.entities.users[ownProps.match.params.id],
    videos: videos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUser: (userId) => dispatch(fetchUser(userId)),
  fetchVideos: () => dispatch(fetchVideos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
