import styles from './button.module.css'
import stylesScss from './button.module.scss'

export default function Button(props) {
  console.log(stylesScss)

  return (
    <>
      <button className={`${styles.btn} ${styles['btn-' + props.variant]}`}>{props.children ? props.children : "CSS Button"}</button>
      <button className={`${stylesScss.btn} ${stylesScss['btn-' + props.variant]}`}>{props.children ? props.children : "SCSS Button"}</button>
    </>
  )
}