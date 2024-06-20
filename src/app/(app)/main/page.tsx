import Container from './components/Container';
import Header from './components/Header';
export default async function Main() {
  return (
    <main className="h-full w-full">
      <Header></Header>
      <Container></Container>
    </main>
  );
}
