import styles from './button.module.css'

export default function Button(props) {

  console.log(styles)
  console.log('btn-' + props.variant)

  return (
    <button className={`${styles.btn} ${styles['btn-' + props.variant]}`}>{props.children ? props.children : "Button Me"}</button>
  )
}