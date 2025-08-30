export default function Chip(props) {
  return (
    <>
      <p className="chip" {...props}>{props.name}</p>
    </>
  );
}
