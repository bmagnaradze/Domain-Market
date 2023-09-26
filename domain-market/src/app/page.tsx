import { Domain } from 'domain';
import Banner from './components/banner/banner';
import Header from './components/header/header';
import Nav from './components/nav/nav-menu';
import DomainList from './containers/domainList/domainList';

export default function Home() {
  return (
    <div>
      <Header />
      <Nav />
      <Banner />
      <DomainList />
    </div>
  );
}
