import styles from '../styles/BigImage.module.css';

export default function BigImage() {
  const image = {
    alt_description: "A beautiful landscape",
    user: {
      name: "John Doe",
    },
    img: "https://source.unsplash.com/random/nature",
  };
  return (
    <div className={styles.container}>
      <img src={image.img} alt={image.alt_description} className={styles.image}/>
    </div>
  );
}
