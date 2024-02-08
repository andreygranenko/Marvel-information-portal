import img from './error.gif';
import {Helmet} from "react-helmet";

const ErrorMessage = () => {
    return (
      <>
          <Helmet>
            <meta
              name="description"
              content="Error page"
            />
            <title>Error page</title>
          </Helmet>
          <img style={{display: "block", width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} src={img} alt="error git"/>
      </>
    )
}

export default ErrorMessage;