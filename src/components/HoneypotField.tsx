type HoneypotFieldProps = {
  id: string;
};

/** Off-screen field. Bots fill it; browsers do not autocomplete this name. */
export default function HoneypotField({ id }: HoneypotFieldProps) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      <label htmlFor={id}>Fax</label>
      <input
        type="text"
        id={id}
        name="zx_hp"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
