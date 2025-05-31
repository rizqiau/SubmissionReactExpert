import axios from "axios";

const BASE_URL = "https://forum-api.dicoding.dev/v1";

function putAccessToken(token) {
  localStorage.setItem("accessToken", token);
}

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

async function register({ name, email, password }) {
  try {
    const response = await api.post("/register", { name, email, password });
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function login({ email, password }) {
  try {
    const response = await api.post("/login", { email, password });
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function getOwnProfile() {
  try {
    const response = await api.get("/users/me");
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function getAllUsers() {
  try {
    const response = await api.get("/users");
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function getAllThreads() {
  try {
    const response = await api.get("/threads");
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function getDetailThread(threadId) {
  try {
    const response = await api.get(`/threads/${threadId}`);
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function createThread({ title, body, category = "" }) {
  try {
    const response = await api.post("/threads", { title, body, category });
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function createComment({ threadId, content }) {
  try {
    const response = await api.post(`/threads/${threadId}/comments`, {
      content,
    });
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function upVoteThread(threadId) {
  try {
    const response = await api.post(`/threads/${threadId}/up-vote`);
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function downVoteThread(threadId) {
  try {
    const response = await api.post(`/threads/${threadId}/down-vote`);
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function neutralizeThreadVote(threadId) {
  try {
    const response = await api.post(`/threads/${threadId}/neutral-vote`);
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function upVoteComment({ threadId, commentId }) {
  try {
    const response = await api.post(
      `/threads/${threadId}/comments/${commentId}/up-vote`
    );
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function downVoteComment({ threadId, commentId }) {
  try {
    const response = await api.post(
      `/threads/${threadId}/comments/${commentId}/down-vote`
    );
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function neutralizeCommentVote({ threadId, commentId }) {
  try {
    const response = await api.post(
      `/threads/${threadId}/comments/${commentId}/neutral-vote`
    );
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

async function getLeaderboards() {
  try {
    const response = await api.get("/leaderboards");
    return { error: false, data: response.data.data };
  } catch (caughtError) {
    return { error: true, message: caughtError.response.data.message };
  }
}

const apiService = {
  putAccessToken,
  getAccessToken,
  register,
  login,
  getOwnProfile,
  getAllUsers,
  getAllThreads,
  getDetailThread,
  createThread,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeThreadVote,
  upVoteComment,
  downVoteComment,
  neutralizeCommentVote,
  getLeaderboards,
};

export default apiService;
