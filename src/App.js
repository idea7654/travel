import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Three from './components/Section/Three';
import Kagawa from './components/Section/Kagawa';
import Main from './components/Section/Main';
import Tokyo from './components/Section/Tokyo';
import { useHistory, withRouter, Route } from 'react-router-dom';

const App = () => {
  const [Selected, setSelected] = useState('');
  const history = useHistory();
  const handleSelect = (object) => {
    setSelected(object);
    history.push(`/${object}`);
  }
  return (
    <div>
      <Navbar />
      <Three onSelect={handleSelect} />
      <Route path="/" component={Main} exact />
      <Route path="/kagawa" component={Kagawa} />
      <Route path="/tokyo" component={Tokyo} />
      <Footer />
    </div>
  );
}

export default withRouter(App);

