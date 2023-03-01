import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Header from './components/Header'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import './App.css'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/shelf" component={Bookshelves} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute path="/books/:id" component={BookDetails} />
    <Route component={NotFound} />
    <Header />
  </Switch>
)

export default App
