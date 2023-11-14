import { useStateContext } from "../components/Context.jsx";

export const Home = () => {
    const { user, checkLogin } = useStateContext();
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <button onClick={checkLogin}>Verify Login</button>
        </div>
    )
}

export default Home;