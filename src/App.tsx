import Header from "./components/ui/header";
import TypingSpeedTestContainer from "./components/typingTestContainer";
export default function App() {
  return (
    <main className='px-4 md:px-8 lg:px-28'>
      <Header />
      <TypingSpeedTestContainer />
    </main>
  );
}
