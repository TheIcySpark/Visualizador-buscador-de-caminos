import BarraSuperior from './componentes/BarraSuperior';
import Cuadricula from './componentes/Cuadricula';
function App() {
    return (
        <div>
            <div className='py-2'>
                <BarraSuperior></BarraSuperior>
            </div>
            <Cuadricula></Cuadricula>
        </div>
    );
}

export default App;
