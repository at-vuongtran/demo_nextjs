import express from 'express';
import * as bodyParser from 'body-parser';
import { connect } from './db/connection'
import { Movie } from './db/models/Movie.model';

const app = express();

app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
connect()

app.get('/movies', async (req, res) => {
  const movies = await Movie.find()
  res.send(movies)
})

app.get('/movies/:id', async (req,res) => {
  const movie = await Movie.findOne({
    where: {
      id: req.params.id
    }
  });
  if (movie){
    res.json(movie);
  } else {
    res.status(404).send({message: "Movie not found"})
  }
});

app.put('/movies/:id', async (req,res) => {
  const movie = await Movie.findOne({
    where: {
      id: req.params.id
    }
  });
  if (movie){
    if (req.body.title) {
      movie.title = req.body.title;
    }
    if (req.body.plot_summary){
      movie.plot_summary = req.body.plot_summary;
    }
    if (req.body.duration){
      movie.duration = req.body.duration;
    }
    await movie.save();
    res.send(movie);
  } else {
    res.status(404).send({message: "Movie not found"})
  }
});

// DELETE
app.delete('/movies/:id', async (req,res) => {
  const movie = await Movie.findOne({
    where: {
      id: req.params.id
    }
  });
  if (movie){
    await movie.remove();
    res.send({message: 'Movie deleted'});
  } else {
    res.status(404).send({message: "Movie not found"})
  }
});

app.post('/movies', async (req,res) => {
  const movie = new Movie();
  movie.title = req.body.title;
  movie.plot_summary = req.body.plot_summary;
  movie.duration = req.body.duration;
  await movie.save();
  res.send(movie);
});

app.get('/', (req, res) => res.send('Hello World!'));
export { app };