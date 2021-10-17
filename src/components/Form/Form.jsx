import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';


import useStyles from './styles';
import { createPost, updatePost } from '../../redux/actions/postsActions'

const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) => currentId
        ? state.posts.find((post) => post._id === currentId)
        : null);

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post])

    const classes = useStyles();
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!currentId) {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        } else {
            dispatch(updatePost(currentId, {...postData,  name: user?.result?.name}));
        }

        // if (currentId) {
        //     dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))  
        //     console.log('test') 
        // } else {
        //     dispatch(createPost({...postData, name: user?.result?.name}))
        // }
        clear()

    };

    const clear = () => {
        setCurrentId(null);
        setPostData({

            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like other's memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper
            className={classes.paper}
        >
            <form
                className={`${classes.root} ${classes.form}`}
                autoComplete="off" noValidate
                onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentId ? 'Edit' : 'Create'} a Memory
                </Typography>
                <TextField name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <div
                    className={classes.fileInput}
                >
                    <FileBase type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained" color="primary"
                    size="large" type="submit" fullWidth
                >Submit</Button>
                <Button
                    variant="contained" color="secondary"
                    size="small" fullWidth
                    onClick={clear}
                >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
