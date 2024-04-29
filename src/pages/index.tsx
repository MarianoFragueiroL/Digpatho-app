import loginAuth from "@/utils/auth/loginAuth";

const Home = () => {
    return (
      <div>
        <h1>Bienvenidos a Dighpatho</h1>
      </div>
    );
  };
  
  export default loginAuth(Home);