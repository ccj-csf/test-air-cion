import Boosters from './components/Boosters';
import Energy from './components/Energy';
import Turbo from './components/Turbo';

const Boosts = () => {
  return (
    <main className="px-4 py-7">
      <section className="grid  grid-cols-2 gap-x-4">
        <Energy></Energy>
        <Turbo></Turbo>
      </section>
      <Boosters></Boosters>
    </main>
  );
};

export default Boosts;
