import Header from "./components/ui/header";
import TypingText from "./features/typingText";
export default function App() {
  return (
    <main className='px-4 md:px-8 lg:px-28'>
      <Header />
      <TypingText />
    </main>
  );
}
