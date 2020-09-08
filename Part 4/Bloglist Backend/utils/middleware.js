const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.info(error.message)

    if(error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        response.status(400).json({error: error.message})
    } else if(error.name === 'JsonWebTokenError') {
        response.status(401).json({ error: 'invalid token'})
    }


    next(error)
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7);
    }
  
    next();
  };
module.exports = {
    errorHandler, unknownEndpoint, tokenExtractor
}