import BarraSuperior from './componentes/BarraSuperior';
import Cuadricula from './componentes/Cuadricula';
import {useSpring, animated, config, useSprings} from 'react-spring'

function App() {
    const animacion = useSpring({
        from: {opacity: 0},
        opacity: 1,
        config: {duration: 500}
    })
    return (
        <animated.div style = {animacion}>
            <div className='py-2'>
                <BarraSuperior></BarraSuperior>
            </div>
            <Cuadricula></Cuadricula>
        </animated.div>
    );
}

export default App;
