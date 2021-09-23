import { SET_POSTS, SET_POSTS_DATA } from '../types';
import { firestore } from '../../config'


export const getPosts = () => (dispatch) => {
    const postsRef = firestore.collection("Posts").orderBy("createAt", "desc");
    postsRef.onSnapshot(querySnapshot => {
        const List = [];
        const ListSnapshot = querySnapshot.docs;
        ListSnapshot.forEach(function (doc) {
            const data = doc.data()
            List.push(
                data
            );
        });
        dispatch({
            type: SET_POSTS,
            payload: List
        })
    }
    );
}

export const deletePost = (id) => (dispatch) => {
    const documentRef = firestore.doc("Posts/" + id);
    documentRef.delete();
}


export const getPost = (docId) => (dispatch) => {
    const documentRef = firestore.doc("Posts/" + docId);
    documentRef.get().then(documentSnapshot => {
        const data = documentSnapshot.data();
        console.log(data);
        dispatch({ type: SET_POSTS_DATA, payload: data });
    })
}
