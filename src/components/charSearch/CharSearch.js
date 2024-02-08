import {ErrorMessage, Field, Form, Formik} from "formik";
import './charSearch.sass';
import useMarvelService from "../../services/MarvelService";
import {useState} from "react";
import {Link} from "react-router-dom";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  return errors
}



const CharSearch = () => {
  const [char, setChar ] = useState(null);
  const {getCharacterByName} = useMarvelService();
  const loadCharacter = name => {
    getCharacterByName(name)
      .then(charContent)
      .catch(handleError)
  }

  const charContent = res => {
    setChar(
      <div className={'found'}>
        There is! Visit {res.name} page?
        <Link to={`/characters/${res.id}`} className="button button__main">
          <div className="inner">TO PAGE</div>
        </Link>
      </div>
    )
  }

  const handleError = (res) => {
    setChar(
      <div className="not_found">
        The character was not found. Check the name and try again
      </div>
    )
  }

  return (
    <Formik
      initialValues={{
        name: ''
      }}
      validate={validate}
      onSubmit={values => loadCharacter(values.name)}>
      <div className="find">
        <Form className={'find_form'}>
          <div className="find_header">Or find a character by name:</div>
          <Field
            name={'name'}
            className={'input'}
            placeholder={'Enter name'}
          />
          <button type={'submit'}>Find</button>
          <ErrorMessage className={'not_found'} name={'name'} component={'div'}/>
        </Form>
        {char}
      </div>
    </Formik>

  )
}

export default CharSearch