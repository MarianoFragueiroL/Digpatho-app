import withAuth from "@/utils/auth/withAuth";

const Home = () => {
    return (
      <div>
        <h1>Bienvenidos a Dighpatho</h1>
      </div>
    );
  };
  
  export default withAuth(Home);