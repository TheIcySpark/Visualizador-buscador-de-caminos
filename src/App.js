import BarraSuperior from './componentes/BarraSuperior';
import Cuadricula from './componentes/Cuadricula';
import {useSpring, animated, config, useSprings} from 'react-spring'

function App() {
    const animacion = useSpring(
        {opacity: 1, from: {opacity: 0}}
    )
    return (
        <animated.div style = {animacion}>
            <animated.div className='py-2'>
                <BarraSuperior></BarraSuperior>
            </animated.div>
            <Cuadricula></Cuadricula>
        </animated.div>
    );
}

export default App;
