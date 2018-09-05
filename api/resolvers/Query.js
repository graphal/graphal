import logger from '../logger';

const greeting = () => {
  logger.info('greeting fetched.');
  return 'Hello Graphal!';
};

module.exports = {
  greeting,
};
