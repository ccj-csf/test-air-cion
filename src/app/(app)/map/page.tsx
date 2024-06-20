import Container from './components/Container';

export default async function Map() {
  return (
    <main
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/map-bg.png)',
      }}
    >
      <h1 className="font-700 text-center text-24">Air Drops Coming</h1>
      <Container></Container>
    </main>
  );
}
