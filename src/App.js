import BarraSuperior from './componentes/BarraSuperior';
import Cuadricula from './componentes/Cuadricula';
import {useSpring, animated} from 'react-spring'
import Tutorial from './componentes/Tutorial'

function App() {
    const animacion = useSpring({
        from: {opacity: 0},
        opacity: 1,
        config: {duration: 600}
    })
    return (
        <animated.div style = {animacion}>
            <div className='py-2'>
                <BarraSuperior></BarraSuperior>
            </div>
            <Cuadricula></Cuadricula>
            <Tutorial></Tutorial>
        </animated.div>
    );
}

export default App;
