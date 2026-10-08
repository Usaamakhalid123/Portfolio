import { Environment, Lightformer } from '@react-three/drei'

// Shared "photo studio" lighting: procedural environment (no HDR download)
// with warm and cool softboxes so chrome surfaces get coloured reflections.
export default function Studio() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 3, 4]} intensity={55} color="#ff8a55" />
      <pointLight position={[-5, -2, 3]} intensity={45} color="#6f7bff" />
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={3.5}
          position={[0, 5, -4]}
          scale={[10, 3, 1]}
        />
        <Lightformer
          form="ring"
          color="#ff8a55"
          intensity={7}
          position={[-5, 1, -1]}
          scale={4}
          rotation-y={Math.PI / 2}
        />
        <Lightformer
          form="rect"
          color="#6f7bff"
          intensity={6}
          position={[5, -1, -2]}
          scale={[3, 6, 1]}
          rotation-y={-Math.PI / 2}
        />
        <Lightformer
          form="circle"
          intensity={3}
          position={[0, -4, 2]}
          scale={5}
          rotation-x={Math.PI / 2}
        />
      </Environment>
    </>
  )
}
