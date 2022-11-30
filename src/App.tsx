import {Canvas} from "@react-three/fiber"
import './App.css'
import Box from "./assets/Box";

function App() {

  return <Canvas style={{height:"100vh",width:"100vw"}}>
    <ambientLight />
    <Box />
  </Canvas>
}

export default App
