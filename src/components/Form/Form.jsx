import React, { useState } from 'react';
import FileBase from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import useStyles from './styles';


const Form = () => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    const classes = useStyles();

    const handleSubmit = () => {

    }
    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <Form className={`${classes.root} ${classes.form}`}
                autoComplete="off" noValidate
                onSubmit={handleSubmit}>
                <Typography variant="h6">
                    Create a Memory
                </Typography>
                <TextField name="creator"
                    variant="outlined"
                    label="Creator"
                    fillWidth
                    value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/>
                <TextField name="title"
                    variant="outlined"
                    label="Title"
                    fillWidth
                    value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                <TextField name="message"
                    variant="outlined"
                    label="Message"
                    fillWidth
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                />
                <TextField name="tags"
                    variant="outlined"
                    label="Tags"
                    fillWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })}/>
                <div className={classes.fileInput} >
                    <FileBase type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit}
                    variant="contained" color="primary"
                    size="large" type="submit" fillWidth
                >Submit</Button>
                <Button
                    variant="contained" color="secondary"
                    size="small" fillWidth
                    onClick={clear}
                >Clear</Button>
            </Form>
        </Paper>
    )
}

export default Form
