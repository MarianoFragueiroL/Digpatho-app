
import './Home.css';

const Home = () => {

    return (
      <>
      <div className='content-wrapper'>
        <div className='content-top'>
          <div className='content-top-text'>
            <div className='fluid-engine-top-text'>
              <div className='content-top-texttop'>
                <div className='c-top-text-top'>
                  <div className=''>
                      <h3 className='text1'> Experiencia e innovación: la IA como aliado en la guerra contra el cáncer</h3>
                  </div>
                </div>
              </div>
              <div className='content-top-textbottom'>
                <div className='c-top-text-middle'>
                  <div className=''>
                    <h4 className='text2'>
                    En Digpatho ofrecemos potentes herramientas para diagnóstico asistido mediante el análisis de imágenes microscópicas. En la búsqueda de perfeccionamiento permanente, 
                    a diario estamos trabajando en el desarrollo de funcionalidades basadas en IA, mediante un mecanismo de retroalimentación con nuestros colaboradores científicos, para que los resultados sean cada vez más precisos. 
                    </h4>
                  </div>
                </div>
              </div>
              <div className='content-top-button'>
                <div className='c-button-top'>
                  <a href="/quines-somos" className="botton-know-more" data-initialized="true">
                    Conoce más
                  </a>
                </div>
              </div>
            </div>
          </div>
        <div className='fluid-engine-top-image'>
          <div className='content-top-image'>
            <div className='c-top-image'>
                <img src="images/fondo.jpg" alt="Laboratorio" className='top-image'/>
            </div>
          </div>
        </div>
        </div>
        <button className='background-pause-button visible'></button>
        <button className='background-pause-button paused'></button>

      </div>
      </>
    );
  };
  
  export default Home;