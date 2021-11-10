import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import ChipInput from 'material-ui-chip-input';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { createPost, updatePost } from '../../redux/actions/postsActions'

const Form = ({ currentId, setCurrentId }) => {

    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const post = useSelector((state) => (currentId
        ? state.posts.posts.find((message) => message._id === currentId)
        : null));

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    useEffect(() => {
        if (!post?.title) clear();
        if (post) setPostData(post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ post]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentId) {
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        clear();
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
            <Paper className={classes.paper} elevation={6}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like other's memories
                </Typography>
            </Paper>
        );
    };

    const handleAddChip = (tag) => {
        setPostData({ ...postData, tags: [...postData.tags, tag] });
    };

    const handleDeleteChip = (chipToDelete) => {
        setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
    };

    return (
        <Paper className={classes.paper} elevation={6}>
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
                <div style={{ padding: '5px 0', width: '94%' }}>
                    <ChipInput
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={postData.tags}
                        onAdd={(chip) => handleAddChip(chip)}
                        onDelete={(chip) => handleDeleteChip(chip)}
                    />
                </div>
                <div className={classes.fileInput}>
                    <FileBase type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained" color="primary"
                    size="large" type="submit" fullWidth>
                    Submit
                </Button>
                <Button
                    variant="contained" color="secondary"
                    size="small" fullWidth
                    onClick={clear}>
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;