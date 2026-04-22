export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="ambient-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-bg__base" />
      <div className="ambient-bg__aurora ambient-bg__aurora--1" />
      <div className="ambient-bg__aurora ambient-bg__aurora--2" />
      <div className="ambient-bg__aurora ambient-bg__aurora--3" />
      <div className="ambient-bg__noise" />
      <div className="ambient-bg__vignette" />
    </div>
  );
}
