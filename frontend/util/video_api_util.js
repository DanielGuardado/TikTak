export const fetchVideos = () =>
  $.ajax({
    url: "/api/videos",
  });

export const fetchVideo = (videoId) =>
  $.ajax({
    url: `/api/videos/${videoId}`,
  });

export const createVideo = (video) => (
  $.ajax({
    method: 'POST',
    url: `/api/videos`,
    data: video,
    contentType: false,
    processData: false 
  })
)

export const deleteVideo = (videoId) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/videos/${videoId}`
  })
)