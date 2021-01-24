import BarraSuperior from './componentes/BarraSuperior';
import Cuadricula from './componentes/Cuadricula';
import {useSpring, animated, config, useSprings} from 'react-spring'

function App() {
    const props = useSpring(
        {opacity: 1, from: {opacity: 0},
        config: {duration: 1500}}
    )
    return (
        <animated.div style = {props}>
            <div className='py-2'>
                <BarraSuperior></BarraSuperior>
            </div>
            <Cuadricula></Cuadricula>
        </animated.div>
    );
}

export default App;
