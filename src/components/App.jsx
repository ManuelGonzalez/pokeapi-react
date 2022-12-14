import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import LoadingButton from '@mui/lab/LoadingButton';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Avatar, Box, Button, List, ListItem, ListItemText, Modal, Skeleton, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {getPokemons} from "../api";

const App = () => {

    const [pokemon, setPokemon] = useState([]);
    const [activePokemon, setActivePokemon] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        fetchValues();
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const fetchValues = async () => {

        setLoading(true);
        const responseValues = await getPokemons(
            page * 100,
            pokemon.length
        );
        if (pokemon.length < responseValues.count) {
            setPokemon([
                ...pokemon,
                ...responseValues.results
            ]);
            setPage(2);
        } else {
            setAllLoaded(true);
        }
        setLoading(false);

    };

    const getImageUrl = (value) => {
        return value.other.dream_world.front_default;
    }

    const getTypes = (values) => {
        debugger
        return (
            <Stack direction="row" spacing={2}>
                {values.map((value) => {
                    return (
                        <Typography key={value.slot}>
                            {value.type.name}
                        </Typography>
                    )
                })}
            </Stack>
        )
    }

    const getAbilities = (values) => {
        debugger
        return (
            <Stack direction="row" spacing={2}>
                {values.map((value) => {
                    return (
                        <Typography key={value.slot}>
                            {value.ability.name}
                        </Typography>
                    )
                })}
            </Stack>
        )
    }

    const handleOpen = (pokemon) => {
        setActivePokemon(pokemon)
        setOpen(true)
    };
    const handleClose = () => {
        setActivePokemon(null)
        setOpen(false)
    };

    const loadingComp = () => {
        return (
            <Stack direction="row" spacing={2}>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="rectangular" width={300} height={300} />
            </Stack>
        );
    }

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <CameraIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" color="inherit" noWrap>
                        PokeApi
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={2}>
                        {pokemon.length > 0 ? pokemon.map((pokemon) => (
                            <Grid item key={pokemon.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image={getImageUrl(pokemon.sprites)}
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {pokemon.name}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button onClick={() => handleOpen(pokemon)} size="small">View Detail</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )) : loadingComp()}
                        <Stack spacing={2} direction="row">
                            {!allLoaded && (
                                <LoadingButton
                                    onClick={() => fetchValues()}
                                    loading={loading}
                                    loadingPosition="start"
                                    variant="outlined"
                                >
                                    {loading ? "Loading..." : "Load more pokemons"}
                                </LoadingButton>
                            )}
                        </Stack>
                    </Grid>
                </Container>
            </main>
            {activePokemon && (
                <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                >
                    <Box sx={{ ...style }}>
                        <Stack direction="row" spacing={6}>
                            <div>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        image={getImageUrl(activePokemon.sprites)}
                                        alt={activePokemon.name}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                    </CardContent>
                                </Card>
                            </div>
                            <div>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <Stack direction="row" spacing={2}>
                                        <Avatar alt={activePokemon.name} src={activePokemon.sprites.front_default} size="sm" />
                                        {activePokemon.name}
                                    </Stack>
                                </Typography>
                                <Stack spacing={2}>
                                    <Typography>
                                        Weight: {activePokemon.weight}
                                    </Typography>
                                    <Typography>
                                        Types: {getTypes(activePokemon.types)}
                                    </Typography>
                                    <Typography>
                                        Abilities: {getAbilities(activePokemon.abilities)}
                                    </Typography>
                                </Stack>
                            </div>
                            <div>
                                <Button onClick={handleClose}>Close</Button>
                            </div>
                        </Stack>
                    </Box>
                </Modal>
            )}
        </>
    );
}

export default App;
