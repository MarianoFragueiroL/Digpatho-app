
import styles from './Home.module.css';

const Home = () => {

    return (
      <>
        <div className={styles.c_title}>
          <div className={styles.title_left}>
            <div >
              <h1>Detección temprana de cancer con IA</h1>
            </div>
            <div >
              <h1>Nuestra tecnología permite que la detección del cancer sea más rápida y precisa. El futuro de la patología es ahora. Es con DigPatho. </h1>
            </div>
          </div>
          <div className={styles.title_right}>
            <div className="title-c-image">
              <img src="/images/fondo.jpg" alt="IMG"/>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Home;