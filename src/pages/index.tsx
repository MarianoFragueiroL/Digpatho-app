
import styles from './Home.module.css';

const Home = () => {

    return (
      <>
      <div className={styles.hero_section}>
          <img src="images/fondo.jpg" alt="Laboratorio" className={styles.hero_image}/>
        <div className={styles.hero_text}>
          <h1>Detección temprana de cáncer con IA</h1>
          <p>Nuestra tecnología permite que la detección del cáncer sea más rápida y precisa. El futuro de la patología es ahora. Es con DigPatho.</p>
          <button className={styles.hero_button}>Conoce</button>
        </div>
      </div>
      </>
    );
  };
  
  export default Home;