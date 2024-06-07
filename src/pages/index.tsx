
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
      </div>
      <div className='content-wrapper-info-about'>
        <div className='c-info-about-left'> 
          <h2>Sobre nosotros
          </h2>
        </div>
        <div className='c-info-about-mid'>
          <div className='col-9'>
            <h4 className='c-info-about-left-text'>Nuestro equipo trabaja en un espacio de generación de conocimiento multidisciplinario y multicultural. A partir de la colaboración entre
              expertos en Anatomía Patológica, Bioingeniería, gestión y análisis de imágenes microscópicas, se crean y estudian nuestros modelos, generando 
              las herramientas de diagnóstico basadas en IA.</h4>
            <h4 className='c-info-about-left-text'>A su vez, consideramos que es esencial la asistencia en la formación de nuevos especialistas médicos. Es por eso que nuestra suite de herramientas 
              cuenta con módulos de entrenamiento, en el cual los patólogos en formación pueden afianzar su experiencia diagnóstica a partir de los resultados 
              de nuestros modelos.</h4>
          </div>
        </div>
        <div className='c-info-about-right'>
          <div className=''>
            <h4 className='c-info-about-right-text'>
            Finalmente, en Digpatho creemos que la transparencia de los métodos utilizados en nuestros desarrollos debe estar disponible y sujeta a una revisión 
            constante por parte de la comunidad científica. 
            Es por ello que contamos con espacios mediante los cuales los usuarios pueden acceder al background de los modelos de IA que utilizan, al mismo tiempo 
            que divulgamos nuestros resultados en eventos y en publicaciones científicas reconocidas.
            </h4>
          </div>
        </div>
      </div>
      </>
    );
  };
  
  export default Home;