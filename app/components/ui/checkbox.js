import styles from './checkbox.module.css';

function Checkbox({ label, name }) {
  return (
    <label className={styles['ckb-wrapper']}>
      {label}
      <input type="checkbox" name={name} />
      <span className={styles.checkmark}></span>
    </label>
  );
}
export default Checkbox;
