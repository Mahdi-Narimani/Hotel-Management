import PropType from 'prop-types'

function Empty({ resource })
{
  return <p>No {resource} could be found.</p>;
}

Empty.propTypes = {
  resource: PropType.string
}

export default Empty;
