# Three.js Scene Setup

Set up a Three.js / React Three Fiber 3D scene in the Enerium project.

## Stack
- `three` + `@react-three/fiber` + `@react-three/drei`
- Next.js dynamic import with `ssr: false` (required for Three.js)
- Framer Motion for DOM-level animations around the canvas
- TypeScript

## Task
$ARGUMENTS

## Steps
1. Check if `three`, `@react-three/fiber`, `@react-three/drei` are installed — if not, output install command:
   ```
   npm install three @react-three/fiber @react-three/drei
   ```
2. Create the scene component in `src/components/3d/`
3. Wrap with `dynamic(() => import(...), { ssr: false })` in the page
4. Use `<Canvas>` with `camera={{ position: [0, 0, 5], fov: 75 }}`
5. Add `OrbitControls` / `useFrame` for animation loop
6. Add post-processing if needed: `@react-three/postprocessing` (Bloom, DepthOfField)

## Scene defaults for Enerium dark theme
- Background: `#050505` or transparent canvas over dark bg
- Lighting: `ambientLight intensity={0.3}` + `pointLight position={[10,10,10]}`  
- Materials: `MeshStandardMaterial` with `metalness={0.8}` `roughness={0.2}`
- Bloom glow for glowing elements

## Output
- Scene component + page integration
- Performance: use `instancedMesh` for many objects, `useMemo` for geometries
