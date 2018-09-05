import logger from '../logger';

const greeting = () => {
  logger.info('greeting fetched.');
  return 'Hello Graphwork!';
};

module.exports = {
  greeting,
};
