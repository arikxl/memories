import React, { useState } from 'react';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';

import useStyles from './styles';
import { deletePost, likePost } from '../../../redux/actions/postsActions';

const Post = ({ post, setCurrentId }) => {
    const [likes, setLikes] = useState(post?.likes)
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const userId = user?.result?.googleId || user?.result?._id;
    const hasLikedPost = post.likes.filter((like) => like === userId);

    const handleLike = async () => {
        dispatch(likePost(post._id));

        if(hasLikedPost){
            setLikes(post.likes.filter((id) => id !== userId));
        }else {
            setLikes([...post.likes, userId])
        }
    }


    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === userId)
                ? (
                    <>
                        <ThumbUpAltIcon fontSize="small" />
                        &nbsp;{post.likes.length > 2
                            ? `You and ${post.likes.length - 1} others`
                            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
                    </>
                ) : (
                    <>
                        <ThumbUpAltOutlined fontSize="small" />
                        &nbsp;{post.likes.length} {post.likes.length === 1
                            ? 'Like' : 'Likes'}
                    </>
                );
        }
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => history.push(`/posts/${post._id}`);

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
                className={classes.cardAction} onClick={openPost}>
                <CardMedia className={classes.media}
                    image={post.selectedFile ||
                        'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                />
                <div className={classes.overlay} >
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button onClick={() => setCurrentId(post._id)}
                            style={{ color: 'white' }} size="small">
                            <MoreHorizIcon fontSize="default" />
                        </Button>
                    </div>
                )}
                <div className={classes.details}>
                    <Typography variant="body2"
                        color="textSecondary">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </div>
                <Typography className={classes.title}
                    variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary"
                        component="p" >{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary"
                    disabled={!user?.result}
                    onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary"
                        disabled={!user?.result}
                        onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;
