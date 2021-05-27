import http from "../../utilities/http"
import { FETCH_POST_BY_ID_FAIL,
    FETCH_POSTS_FAIL,
    FETCH_POSTS_START,
    FETCH_POSTS_SUCCESS,
    CLEAR_CURRENT_POST,
    SET_CURRENT_POST
} from './actionTypes';
import { Post } from '../../pages';

export function fetchPosts() {
    return async (dispatch: any) => {
        dispatch(fetchPostsStart());
        try {
            const { data } = await http.get('posts');
            return dispatch(fetchPostsSuccess(data));
        } catch (err) {
            console.log(err);
            return dispatch(fetchPostsFail(err))
        }
    }
}

export function fetchPostById(id: number | string) {
    return async (dispatch: any) => {
        dispatch(fetchPostsStart());
        try {
            const { data } = await http.get(`posts/${id}`);
            return dispatch(fetchPostByIdSuccess(data));
        } catch (err) {
            console.log(err);
            return dispatch(fetchPostByIdFail(err))
        }
    }
}

export function fetchPostByIdSuccess(post: Post) {
    return {
        type: SET_CURRENT_POST,
        post,
    }
}

export function fetchPostsStart() {
    return {
        type: FETCH_POSTS_START,
    };
}

export function fetchPostsSuccess(posts: Post[]) {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts,
    };
}

export function fetchPostsFail(error: Error) {
    return {
        type: FETCH_POSTS_FAIL,
        error,
    };
}

export function fetchPostByIdFail(error: Error) {
    return {
        type: FETCH_POST_BY_ID_FAIL,
        error,
    };
}

export function clearCurrentPost() {
    return {
        type: CLEAR_CURRENT_POST,
    };
}
