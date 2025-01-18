import PropTypes from 'prop-types';

function Error({ error }) {
  return (
    <h2 className='font-serif text-xl text-center pt-6'>{error}</h2>
  )
}

Error.propTypes = {
  error: PropTypes.string.isRequired,
};

export default Error;