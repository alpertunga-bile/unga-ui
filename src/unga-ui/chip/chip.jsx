export default function Chip(props) {
  return (
    <>
      <p className="chip" {...props}>{props.name}</p>
      {props.is_input && (
        <input
          className="hidden-input"
          name={props.form_name}
          value={props.name}
          autoComplete="off"
          type="text"
        />
      )}
    </>
  );
}
