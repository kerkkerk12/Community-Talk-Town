import React, { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from './Auth'
import CreatePost from './post/CreatePost'
// import RenderPost from './RenderPost'

import Post from './post/Post'

// Redux stuff
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";
import { refreshUserData } from "../redux/actions/userActions";
import Loading from './UI/Loading'
import { isEmpty } from 'lodash'


const Home = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.data);
    const UI = useSelector(state => state.UI);

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) {
            dispatch(refreshUserData());
            if (isEmpty(data.post)) {
                dispatch(getPosts());
            }
        }
    }, [])

    return (
        <>
            <div className="container mt-4" >
                <CreatePost />
                
                {!currentUser ? <Redirect to="/login" /> : 
                (UI.loading ? <Loading/> : 
                <> {data.posts && data.posts.map((data) => (<Post key={data.id} dataPost={data} />))}</>)
                }
            </div>
        </>
    )
}

export default Home;