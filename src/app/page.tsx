import Navbar from "./components/navbar";
import AuthSession from "./components/authSession";
import ListRouter from "./(pages)/router-list/listRouter";

export default function Home() {
  return (
    <AuthSession>
      <Navbar title="Router List">
        <ListRouter />
      </Navbar>
    </AuthSession>
  );
}
