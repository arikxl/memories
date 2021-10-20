import React, { useEffect, useState } from 'react';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core';

import Form from '../Form/Form'
import Posts from '../Posts/Posts'
import Paginate from '../Pagination/Pagination';
import useStyles from './styles';
import { getPosts, fetchPostsBySearch } from '../../redux/actions/postsActions';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    const [currentId, setCurrentId] = useState(null);
    const [searchWord, setSearchWord] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch]);

    const searchPost = () => {
        // if (searchWord.trim()) {
        //     dispatch(fetchPostsBySearch({ searchWord, tags: tags.join(',') }));
        // } else {
        //     history.push('/');
        // }
    };

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    return (

        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.gridContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch}
                            position="static" color="inherit">
                            <TextField name="search" variant="outlined"
                                label="search Memories" fullWidth
                                value={searchWord}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setSearchWord(e.target.value)} />
                            <ChipInput style={{ margin: '10px 0' }} value={tags}
                                label="Search Tags" variant="outlined"
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                            />
                            <Button className={classes.searchButton}
                                color="primary" variant="contained"
                                onClick={searchPost}>
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Paginate />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
};

export default Home;
